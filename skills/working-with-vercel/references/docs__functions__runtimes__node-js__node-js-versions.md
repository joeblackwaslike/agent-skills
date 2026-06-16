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
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "bc07fbf26d67c97368e94d613d052303eedda3ac69ffac0d595cb3f4a7c23c01"
---

# Supported Node.js versions

## Default and available versions

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
