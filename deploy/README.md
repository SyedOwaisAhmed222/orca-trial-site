# Deploying to web.orcatrial.net

Target: the shared **dev box** (Hetzner `orca-dev-server`, `167.233.116.149`),
alongside the CRM's dev and uat environments.

Same shape as `orca-trial-frontend`: GitHub Actions builds, rsyncs
`.next/standalone` to the server, pm2 runs it, nginx terminates TLS and proxies
to it. Nothing compiles on the box.

## Slot

Already in use on that box: `3001` dev-api, `3002` uat-api, `4000` dev-web,
`4001` uat-web. This app takes the next free port.

| Deploy dir | pm2 app | Port | Domain |
| ---------- | ------- | ---- | ------ |
| `/home/deploy/dev-site` | `orca-dev-site` | 4002 | web.orcatrial.net |
| `/home/deploy/uat-site` | `orca-uat-site` | 4003 | — |
| `/home/deploy/site` | `orca-prod-site` | 4002 | — |

`ecosystem.config.js` derives the pm2 name and port from the directory
basename, and throws if the directory is not one of those three — a wrong
`REMOTE_DIR` fails the deploy instead of hijacking another environment's port.

Port 4002 is never exposed publicly: the Hetzner firewall allows only 22/80/443,
so nginx is the only way in.

---

## Step 1 — DNS

Add an `A` record for `web` pointing at the dev box.

| Type | Name | Value |
| ---- | ---- | ----- |
| A | `web` | `167.233.116.149` |

Wait for it to resolve before going near certbot — certbot proves domain
ownership over HTTP and fails if DNS has not propagated:

```bash
dig +short web.orcatrial.net      # must print 167.233.116.149
```

## Step 2 — create the deploy directory

SSH in as `deploy` and make the directory CI will rsync into. It must exist
first; rsync will not create a missing parent.

```bash
ssh deploy@167.233.116.149
mkdir -p ~/dev-site
```

## Step 3 — nginx

Still on the server. Write the vhost:

```bash
sudo tee /etc/nginx/sites-available/orca-site > /dev/null <<'CONF'
server {
    listen 80;
    server_name web.orcatrial.net;

    client_max_body_size 1M;

    location /_next/static/ {
        proxy_pass http://127.0.0.1:4002;
        proxy_set_header Host $host;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location / {
        proxy_pass http://127.0.0.1:4002;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
CONF

sudo ln -s /etc/nginx/sites-available/orca-site /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

`nginx -t` must print `syntax is ok` / `test is successful`. If it does not,
**do not reload** — fix it first, or the CRM vhosts on this box go down too.

`X-Forwarded-For` matters: `/api/register` rate-limits per IP, and without it
every submission looks like it came from nginx.

## Step 4 — TLS

```bash
sudo certbot --nginx -d web.orcatrial.net
```

Certbot edits `orca-site` in place, adding the 443 server block and the 80→443
redirect. Renewal is already on a timer from the CRM's setup — nothing to add.

## Step 5 — GitHub environment

The repo is `SyedOwaisAhmed222/orca-trial-site`. Go to
**Settings → Environments → New environment**, name it exactly **`dev`** (it has
to match the branch name — the workflow does `environment: ${{ github.ref_name }}`).

Add these:

| Kind | Name | Value |
| ---- | ---- | ----- |
| Variable | `SSH_HOST` | `167.233.116.149` |
| Variable | `SSH_USER` | `deploy` |
| Variable | `REMOTE_DIR` | `/home/deploy/dev-site` |
| Variable | `REGISTRATION_NOTIFY_EMAIL` | `info@orcatrial.net` |
| Secret | `SSH_KEY` | contents of `~/.ssh/gha_deploy` on the server |
| Secret | `REGISTRATION_WEBHOOK_URL` | where enquiries go — **see the warning below** |

`SSH_KEY` is the same CI key the CRM repos use. Its public half is already in
`/home/deploy/.ssh/authorized_keys`, so the server needs no change. To read it
again:

```bash
cat ~/.ssh/gha_deploy      # include the -----BEGIN/-----END lines
```

Then set **Deployment branches and tags → Selected branches → `dev`**. The
default is "All branches", which would let any branch read these secrets.

## Step 6 — deploy

```bash
git push origin dev
```

That is the whole deploy. Watch it under the repo's **Actions** tab.

## Step 7 — verify

```bash
ssh deploy@167.233.116.149
pm2 list                                   # orca-dev-site => online
pm2 logs orca-dev-site --lines 40 --nostream
curl -I http://127.0.0.1:4002              # 200 from the app itself
```

From anywhere:

```bash
curl -I https://web.orcatrial.net
```

---

## Enquiries are not stored yet

`REGISTRATION_WEBHOOK_URL` is the only thing that persists a submission. With it
unset, `/api/register` validates the enquiry, returns success to the visitor,
and writes it to the pm2 log — where it is lost on the next restart.

The deploy prints a warning but does not stop. **Set it before the site takes
real traffic**, or replace webhook delivery with SMTP or a database in
`app/api/register/route.ts`.

## Troubleshooting

**502 Bad Gateway** — nginx is up, the app is not. `pm2 list`. If the process is
missing, `cd ~/dev-site && pm2 start ecosystem.config.js && pm2 save`.

**Deploy fails at "Check this environment is configured"** — a variable is
empty, or `REMOTE_DIR`'s basename is not `dev-site`/`uat-site`/`site`. The error
names the offender.

**Deploy fails at rsync with "Permission denied"** — `SSH_KEY` does not match
anything in `/home/deploy/.ssh/authorized_keys`.

**pm2 throws "cannot identify the environment"** — `REMOTE_DIR` points somewhere
whose basename is not in `TARGETS` in `ecosystem.config.js`.

**Site loads but has no styling** — the "Assemble standalone output" step did not
copy `.next/static`. Re-run the workflow.

**Nothing survives a reboot** — `pm2 save` was never run, or pm2's boot service
is not enabled. Check `systemctl is-enabled pm2-deploy`.
