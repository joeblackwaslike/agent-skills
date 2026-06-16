---
title: Advanced Node.js Usage
product: vercel
url: /docs/functions/runtimes/node-js/advanced-node-configuration
canonical_url: "https://vercel.com/docs/functions/runtimes/node-js/advanced-node-configuration"
last_updated: 2026-04-27
type: how-to
prerequisites:
  - /docs/functions/runtimes/node-js
  - /docs/functions/runtimes
related:
  - /docs/functions/runtimes/node-js
  - /docs/cli/env
  - /docs/environment-variables
  - /docs/environment-variables/managing-environment-variables
summary: Learn about advanced configurations for Vercel functions on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/runtimes/node-js/advanced-node-configuration.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "1fb91800b7474e781b4203b6f07e10e43755e4defbeb5782800d610aa423487d"
---

# Advanced Node.js Usage

To use Node.js, create a file inside your project's `api` directory. No additional configuration is needed.

**The entry point for `src` must be a glob matching `.js`, `.mjs`, or `.ts` files** that export a default function.

### Disabling helpers for Node.js

To disable [helpers](/docs/functions/runtimes/node-js#node.js-helpers):

1. From the [dashboard](/dashboard), select your project.
2. Select [**Environment Variables**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fenvironment-variables\&title=Go+to+Environment+Variables) in the sidebar.
3. Add a new environment variable with the **Key**: `NODEJS_HELPERS` and the **Value**: `0`. You should ensure this is set for all environments you want to disable helpers for.
4. Pull your env vars into your local project with the [following command](/docs/cli/env):
   ```bash filename="terminal"
   vercel env pull
   ```

For more information, see [Environment Variables](/docs/environment-variables).

### Private npm modules for Node.js

To install private npm modules:

1. From the [dashboard](/dashboard), select your project.
2. Select [**Environment Variables**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fenvironment-variables\&title=Go+to+Environment+Variables) in the sidebar.
3. Add a new environment variable with the **Key**: `NPM_TOKEN` and enter your [npm token](https://docs.npmjs.com/about-access-tokens) as the value. Alternatively, define `NPM_RC` as an [Environment Variable](/docs/environment-variables) with the contents of `~/.npmrc`.
4. Pull your env vars into your local project with the [following command](/docs/cli/env):
   ```bash filename="terminal"
   vercel env pull
   ```

For more information, see [Environment Variables](/docs/environment-variables).

### Custom build step for Node.js

In some cases, you may wish to include build outputs inside your Vercel Function. To do this:

1. Add a `vercel-build` script within your `package.json` file, in the same directory as your Vercel Function or any parent directory. The `package.json` nearest to the Vercel Function will be preferred and used for both installing and building:

```json filename="package.json"
{
  "scripts": {
    "vercel-build": "node ./build.js"
  }
}
```

2. Create the build script named `build.js`:

```javascript filename="build.js"
const fs = require('fs');
fs.writeFile('built-time.js', `module.exports = '${new Date()}'`, (err) => {
  if (err) throw err;
  console.log('Build time file created successfully!');
});
```

3. Finally, create a `.js` file for the built Vercel functions, `index.js` inside the `/api` directory:

```javascript filename="api/index.js"
const BuiltTime = require('./built-time');
module.exports = (request, response) => {
  response.setHeader('content-type', 'text/plain');
  response.send(`
    This Vercel Function was built at ${new Date(BuiltTime)}.
    The current time is ${new Date()}
  `);
};
```

### Experimental Node.js require() of ES Module

By default, we disable experimental support for [requiring ES Modules](https://nodejs.org/docs/latest-v24.x/api/modules.html#loading-ecmascript-modules-using-require). You can enable it by setting the following [Environment Variable](/docs/environment-variables/managing-environment-variables) in your project settings:

- `NODE_OPTIONS=--experimental-require-module`


---

[View full sitemap](/docs/sitemap)
