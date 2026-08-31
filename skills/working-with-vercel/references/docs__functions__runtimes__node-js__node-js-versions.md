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
  []
summary: Learn about the supported Node.js versions on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/runtimes/node-js/node-js-versions.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "f13fc3d6a163b9229d71aab76c03c2c369604fa493b685389778607e7fc8347e"
---

# Supported Node.js versions

## Default and available versions


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Bulk upgrade deprecated Node.js versions](https://vercel.com/changelog/bulk-upgrade-deprecated-node-js-versions?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fnode-js%2Fnode-js-versions&source_site=vercel-docs&relationship=related)
- [Legacy build image is being deprecated on September 1, 2025](https://vercel.com/changelog/legacy-build-image-is-being-deprecated?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fnode-js%2Fnode-js-versions&source_site=vercel-docs&relationship=related)
- [Node.js 20 is being deprecated on October 1, 2026](https://vercel.com/changelog/node-js-20-is-being-deprecated?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fnode-js%2Fnode-js-versions&source_site=vercel-docs&relationship=related)
- [One-click upgrade for deprecated Node.js versions](https://vercel.com/changelog/one-click-upgrade-for-deprecated-node-js-versions?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fnode-js%2Fnode-js-versions&source_site=vercel-docs&relationship=related)
- [Node.js v20 LTS is now generally available](https://vercel.com/changelog/node-js-v20-lts-is-now-generally-available?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fnode-js%2Fnode-js-versions&source_site=vercel-docs&relationship=related)
- [How do I use the latest npm version for my Vercel Deployment?](https://vercel.com/kb/guide/how-do-i-use-the-latest-npm-version-for-my-vercel-deployment?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fnode-js%2Fnode-js-versions&source_site=vercel-docs&relationship=related) — Learn how to use the latest npm version for Vercel deployments.
- [Node.js 10 is Now Available](https://vercel.com/blog/node-10?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fnode-js%2Fnode-js-versions&source_site=vercel-docs&relationship=related)
- [Advanced Node.js Usage](https://vercel.com/docs/functions/runtimes/node-js/advanced-node-configuration?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fnode-js%2Fnode-js-versions&source_site=vercel-docs&relationship=related) — Learn about advanced configurations for Vercel functions on Vercel.
- [Package Managers](https://vercel.com/docs/package-managers?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fnode-js%2Fnode-js-versions&source_site=vercel-docs&relationship=related) — Discover the package managers supported by Vercel for dependency management. Learn how Vercel detects and uses npm, Yarn
- [Set the Python version for your Vercel project](https://vercel.com/docs/functions/runtimes/python/python-version?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fnode-js%2Fnode-js-versions&source_site=vercel-docs&relationship=related) — Set the Python version for your Vercel project with pyproject.toml, .python-version, or Pipfile.lock.
- [Configuring a Build](https://vercel.com/docs/builds/configure-a-build?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fnode-js%2Fnode-js-versions&source_site=vercel-docs&relationship=related) — Vercel automatically configures the build settings for many front-end frameworks, but you can also customize the build a
- [Fluid compute](https://vercel.com/docs/fluid-compute?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fnode-js%2Fnode-js-versions&source_site=vercel-docs&relationship=related) — Learn about fluid compute, an execution model for Vercel Functions that provides a more flexible and efficient way to ru

Full cross-link map for this page: [/docs/functions/runtimes/node-js/node-js-versions.graph.md](/docs/functions/runtimes/node-js/node-js-versions.graph.md?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fnode-js%2Fnode-js-versions&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

By default, a new project uses the latest Node.js LTS version available on Vercel.

Current available versions are:

- **24.x** (default)
- **22.x**
- **20.x**

Only major versions are available. Vercel automatically rolls out minor and patch updates when needed, such as to fix a security issue.

## Setting the Node.js version in project settings

To override the [default](#default-and-available-versions) version and set a different Node.js version for new deployments:

1. From your [dashboard](/dashboard), select your project.
2. Open **Settings** in the sidebar.
3. On the [**Build and Deployment**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fbuild-and-deployment\&title=Go+to+Build+Settings) page, navigate to the **Node.js Version** section.
4. Select the version you want to use from the dropdown. This Node.js version will be used for new deployments.

![Image](`/front/docs/functions/node-version-light.png`)

## Version overrides in `package.json`

You can define the major Node.js version in the `engines#node` section of the `package.json` to override the one you have selected in the [Project Settings](#setting-the-node.js-version-in-project-settings):

```json filename="package.json"
{
  "engines": {
    "node": "24.x"
  }
}
```

For instance, when you set the Node.js version to **20.x** in the **Project Settings** and you specify a valid [semver range](https://semver.org/) for **Node.js 24** (e.g. `24.x`) in `package.json`, your project will be deployed with the **latest 24.x** version of Node.js.

The following table lists some example version ranges and the available Node.js version they map to:

| Version in `package.json`               | Version deployed        |
| --------------------------------------- | ----------------------- |
| `24.x` `^24.0.0` `>=20.0.0` | latest **24.x** version |
| `22.x` `^22.0.0`                  | latest **22.x** version |
| `20.x` `^20.0.0`                  | latest **20.x** version |

## Checking your deployment's Node.js version

To verify the Node.js version your Deployment is using, either run `node -v` in the Build Command or log `process.version`.


---

[View full sitemap](/docs/sitemap)
