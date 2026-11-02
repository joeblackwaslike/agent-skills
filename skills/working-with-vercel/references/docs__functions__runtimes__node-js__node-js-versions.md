---
title: Supported Node.js versions
product: vercel
url: /docs/functions/runtimes/node-js/node-js-versions
canonical_url: "https://vercel.com/docs/functions/runtimes/node-js/node-js-versions"
last_updated: 2026-02-27
type: reference
prerequisites:
  - /docs/functions/runtimes/node-js
  - /docs/functions/runtimes
related:
  - /docs/functions/runtimes/node-js/advanced-node-configuration
summary: Learn about the supported Node.js versions on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/runtimes/node-js/node-js-versions.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "0e6d79d701d58d194af1451cac9d69c57ab3a5cbaf7dff83220130c50b3cc5a2"
---

# Supported Node.js versions

## Default and available versions

By default, a new project uses the latest Node.js LTS version available on Vercel.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Bulk upgrade deprecated Node.js versions](https://vercel.com/changelog/bulk-upgrade-deprecated-node-js-versions)
- [Legacy build image is being deprecated on September 1, 2025](https://vercel.com/changelog/legacy-build-image-is-being-deprecated)
- [Node.js 20 is being deprecated on October 1, 2026](https://vercel.com/changelog/node-js-20-is-being-deprecated)
- [Node.js 26 LTS is now Generally Available on Vercel](https://vercel.com/changelog/node-js-26-lts-is-now-generally-available-on-vercel)
- [One-click upgrade for deprecated Node.js versions](https://vercel.com/changelog/one-click-upgrade-for-deprecated-node-js-versions)
- [Node.js 10 is Now Available](https://vercel.com/blog/node-10)
- [Package Managers](https://vercel.com/docs/package-managers) — Discover the package managers supported by Vercel for dependency management. Learn how Vercel detects and uses npm, Yarn
- [Configuring a Build](https://vercel.com/docs/builds/configure-a-build) — Vercel automatically configures the build settings for many front-end frameworks, but you can also customize the build a
- [Fluid compute](https://vercel.com/docs/fluid-compute) — Learn about fluid compute, an execution model for Vercel Functions that provides a more flexible and efficient way to ru
- [General settings](https://vercel.com/docs/project-configuration/general-settings) — Configure basic settings for your Vercel project, including the project name, build and development settings, root direc
- [Project settings](https://vercel.com/docs/project-configuration/project-settings) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,

Full cross-link map for this page: [/docs/functions/runtimes/node-js/node-js-versions.graph.md](/docs/functions/runtimes/node-js/node-js-versions.graph.md)
<!-- /docsgraph:related -->

Current available versions are:

- **26.x** (default)
- **24.x**
- **22.x**

Only major versions are available. Vercel automatically rolls out minor and patch updates when needed, such as to fix a security issue. These updates apply to builds and Vercel Functions. The exact minor version can differ between the build and the function runtime.

## Setting the Node.js version in project settings

To override the [default](#default-and-available-versions) version and set a different Node.js version for new deployments:

1. From your [dashboard](/dashboard), select your project.
2. Open **Settings** in the sidebar.
3. On the [**Build and Deployment**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fbuild-and-deployment\&title=Go+to+Build+Settings) page, navigate to the **Node.js Version** section.
4. Select the version you want to use from the dropdown. This Node.js version will be used for new deployments.

![Select your Node.js version in Project Settings.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/functions/node-version-light.png)

## Version overrides in `package.json`

You can define the major Node.js version in the `engines#node` section of the `package.json` to override the one you have selected in the [Project Settings](#setting-the-node.js-version-in-project-settings):

```json filename="package.json"
{
  "engines": {
    "node": "26.x"
  }
}
```

For instance, when you set the Node.js version to **24.x** in the **Project Settings** and you specify a valid [semver range](https://semver.org/) for **Node.js 26** (e.g. `26.x`) in `package.json`, Vercel deploys your project with the **latest 26.x** version of Node.js.

The following table lists some example version ranges and the available Node.js version they map to:

| Version in `package.json`               | Version deployed        |
| --------------------------------------- | ----------------------- |
| `26.x`<br /> `^26.0.0`<br /> `>=22.0.0` | latest **26.x** version |
| `24.x`<br /> `^24.0.0`                  | latest **24.x** version |
| `22.x`<br /> `^22.0.0`                  | latest **22.x** version |

For Node.js 26 `fetch` behavior and the HTTP/1.1 opt-out, see [Advanced Node.js Usage](/docs/functions/runtimes/node-js/advanced-node-configuration).

## Checking your deployment's Node.js version

To check the build's Node.js version, run `node -v` in the Build Command. To check a function's Node.js version, log `process.version` inside the function.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
