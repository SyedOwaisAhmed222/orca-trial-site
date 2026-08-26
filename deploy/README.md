# Deploying the marketing site

Target: **https://web.orcatrial.net** on the shared dev box, alongside the CRM.

Same shape as `orca-trial-frontend`: GitHub Actions builds, rsyncs
`.next/standalone` to the server, pm2 runs it, nginx proxies to it. Nothing
compiles on the box.

## Port and directory

Taken already: `3001` dev-api, `3002` uat-api, `4000` dev-web, `4001` uat-web.
This app uses the next free one.

| Deploy dir | pm2 app | Port |
| ---------- | ------- | ---- |
| `~/dev-site` | `orca-dev-site` | 4002 |
| `~/uat-site` | `orca-uat-site` | 4003 |
| `~/site` | `orca-prod-site` | 4002 |

`ecosystem.config.js` reads the directory basename to pick these, and throws if
the directory is not one of the three — so a wrong `REMOTE_DIR` fails the deploy
instead of hijacking another environment's port.

## One-time: on the server

```bash
mkdir -p ~/dev-site

sudo cp deploy/web.orcatrial.net.conf /etc/nginx/sites-available/orca-site
sudo ln -s /etc/nginx/sites-available/orca-site /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## One-time: DNS

`A` record `web` → the dev box's public IP. Confirm before running certbot:

```bash
dig +short web.orcatrial.net
```

## One-time: TLS

```bash
sudo certbot --nginx -d web.orcatrial.net
```

Certbot edits `orca-site` in place, adding the 443 block and the 80→443
redirect.

## One-time: GitHub

Push this repo to GitHub, then under **Settings → Environments → dev**:

| Kind | Name | Value |
| ---- | ---- | ----- |
| Variable | `SSH_HOST` | dev box IP |
| Variable | `SSH_USER` | `deploy` |
| Variable | `REMOTE_DIR` | `/home/deploy/dev-site` |
| Variable | `REGISTRATION_NOTIFY_EMAIL` | `info@orcatrial.net` |
| Secret | `SSH_KEY` | the CI private key already used by the other repos |
| Secret | `REGISTRATION_WEBHOOK_URL` | where enquiries go — **see below** |

The CI key's public half is already in `~/.ssh/authorized_keys` on the box, so
reusing it needs no server change.

## Deploying

Push to `dev`. That is the whole process.

## Enquiries are not stored yet

`REGISTRATION_WEBHOOK_URL` is the only thing that saves a submission. With it
unset the API validates the enquiry, returns success to the visitor, and writes
it to the pm2 log — where it is lost on the next restart.

The deploy warns about this, but it will not stop. **Set it before the site
takes real traffic**, or replace the webhook with SMTP/database delivery in
`app/api/register/route.ts`.

## Checking a deploy

```bash
pm2 list                       # orca-dev-site should be online
pm2 logs orca-dev-site --lines 40 --nostream
curl -I https://web.orcatrial.net
```

502 means nginx is up but the app is not: check `pm2 list` first.
