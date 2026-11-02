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
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "01c9dcc8b6fa8778fc57a7960db2a3ac4f103af98a1db5feab8668e4525db9d6"
---

# Advanced Node.js Usage

To use Node.js, create a file inside your project's `api` directory. No additional configuration is needed.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Node.js 26 LTS is now Generally Available on Vercel](https://vercel.com/changelog/node-js-26-lts-is-now-generally-available-on-vercel)
- [What can I do when I run into build output limits with Next.js on Vercel?](https://vercel.com/kb/guide/what-can-i-do-when-i-run-into-build-output-limits-with-next-js-on-vercel) — Learn how to work with build output limits for Next.js on Vercel.
- [How can I use files in Vercel Functions?](https://vercel.com/kb/guide/how-can-i-use-files-in-serverless-functions) — Learn how to import files inside Serverless Functions on Vercel.
- [Advanced Configuration](https://vercel.com/docs/functions/configuring-functions/advanced-configuration) — Learn how to add utility files to the /api directory, and bundle Vercel Functions.
- [Supported Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions) — Learn about the supported Node.js versions on Vercel.
- [Features](https://vercel.com/docs/build-output-api/features) — Learn how to implement common Vercel platform features through the Build Output API.
- [Build Features for Customizing Deployments](https://vercel.com/docs/builds/build-features) — Learn how to customize your deployments using Vercel's build features.
- [Project settings](https://vercel.com/docs/project-configuration/project-settings) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,

Full cross-link map for this page: [/docs/functions/runtimes/node-js/advanced-node-configuration.graph.md](/docs/functions/runtimes/node-js/advanced-node-configuration.graph.md)
<!-- /docsgraph:related -->

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

### HTTP/2 for `fetch` on Node.js 26

On Node.js 26, the built-in `fetch` negotiates HTTP/2 with servers that support it. For HTTP/2 responses, `response.statusText` is empty. Use `response.status` to check the HTTP status code.

To keep HTTP/1.1 for the built-in `fetch` in Vercel Functions, set the [environment variable](/docs/environment-variables/managing-environment-variables) `VERCEL_FETCH_DISABLE_H2` to `1` for the relevant environments and redeploy. This setting applies to Vercel Functions on Node.js 26. It doesn't change `fetch` during builds. A custom dispatcher set with `setGlobalDispatcher`, or a `dispatcher` passed to `fetch`, takes precedence.

### Experimental Node.js require() of ES Module

By default, we disable experimental support for [requiring ES Modules](https://nodejs.org/docs/latest-v24.x/api/modules.html#loading-ecmascript-modules-using-require). You can enable it by setting the following [Environment Variable](/docs/environment-variables/managing-environment-variables) in your project settings:

- `NODE_OPTIONS=--experimental-require-module`


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
