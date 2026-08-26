// PM2 process definition for the Orca Trial marketing site (Next.js standalone).
//
// Same convention as orca-trial-frontend: identity comes from the directory CI
// rsyncs this file into, so one committed file serves every environment.
//
//   deploy dir        pm2 app name       PORT
//   ~/dev-site        orca-dev-site      4002
//   ~/uat-site        orca-uat-site      4003
//   ~/site            orca-prod-site     4002
//
// 4002 is the first free port on the shared dev box: 3001 dev-api, 3002
// uat-api, 4000 dev-web, 4001 uat-web are already taken.

const path = require('path');

const TARGETS = {
  'dev-site': { name: 'orca-dev-site', port: 4002 },
  'uat-site': { name: 'orca-uat-site', port: 4003 },
  site: { name: 'orca-prod-site', port: 4002 },
};

const deployDir = path.basename(__dirname);
const target = TARGETS[deployDir];

if (!target) {
  // Fail loudly rather than guess. A wrong guess on the shared box binds a
  // port another environment owns and reloads the wrong pm2 app.
  throw new Error(
    [
      'ecosystem.config.js: cannot identify the environment.',
      `Deploy directory basename is "${deployDir}" (full path: ${__dirname}).`,
      `Expected one of: ${Object.keys(TARGETS).join(', ')}.`,
      'Fix: rsync into one of those directories, or add the new directory to TARGETS.',
    ].join(' '),
  );
}

module.exports = {
  apps: [
    {
      name: target.name,
      // Entrypoint produced by output: 'standalone' in next.config.mjs.
      script: 'server.js',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '384M',
      time: true,
      env: {
        NODE_ENV: 'production',
        PORT: target.port,
        HOSTNAME: '0.0.0.0',
      },
    },
  ],
};
