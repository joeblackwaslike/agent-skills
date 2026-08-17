---
title: Package Managers
product: vercel
url: /docs/package-managers
canonical_url: "https://vercel.com/docs/package-managers"
last_updated: 2026-07-01
type: reference
prerequisites:
  []
related:
  - /docs/builds
  - /docs/builds/configure-a-build
  - /docs/deployments/logs
  - /docs/project-configuration/vercel-json
summary: Discover the package managers supported by Vercel for dependency management. Learn how Vercel detects and uses npm, Yarn, pnpm, and Bun for optimal...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/package-managers.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "3e4053245d2dac6aeb059496cb7faa121bcb1f4824ff3a06e986fee7c287b782"
---

# Package Managers

Vercel will automatically detect the package manager used in your project and install the dependencies when you [create a deployment](/docs/builds#build-process). It does this by looking at the lock file in your project and inferring the correct package manager to use.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Dependencies from package.json are missing after install](https://vercel.com/kb/guide/dependencies-from-package-json-missing-after-install?from=related) — Understand why dependencies may not being installed during a build and how to fix.
- [How do I use the latest npm version for my Vercel Deployment?](https://vercel.com/kb/guide/how-do-i-use-the-latest-npm-version-for-my-vercel-deployment?from=related) — Learn how to use the latest npm version for Vercel deployments.
- [How do I use private dependencies with Vercel?](https://vercel.com/kb/guide/using-private-dependencies-with-vercel?from=related) — Information on how to use private dependencies with a Vercel deployment.
- [Build Features](https://vercel.com/docs/builds/build-features?from=related) — Learn how to customize your deployments using Vercel's build features.
- [Supported Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions?from=related) — Learn about the supported Node.js versions on Vercel.
- [Deployments](https://vercel.com/docs/deployments?from=related) — Learn how to create and manage deployments on Vercel.
- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [Project Configuration](https://vercel.com/docs/project-configuration?from=related) — Learn how to configure your Vercel projects using vercel.json, vercel.ts, or the dashboard to control builds, routing, f

Full cross-link map for this page: [/docs/package-managers.graph.md](/docs/package-managers.graph.md)
<!-- /docsgraph:related -->

If you are using [Corepack](/docs/builds/configure-a-build#corepack), Vercel will use the package manager specified in the `package.json` file's `packageManager` field instead.

## Supported package managers

The following table lists the package managers supported by Vercel, with their install commands and versions:

| Package Manager                                                                                                                   | Lock File                                                                                                                     | Install Command                                                         | Supported Versions |
| --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------ |
| Yarn                                                                                                                              | [`yarn.lock`](https://classic.yarnpkg.com/lang/en/docs/yarn-lock/)                                                            | [`yarn install`](https://classic.yarnpkg.com/lang/en/docs/cli/install/) | 1, 2, 3            |
| npm                                                                                                                               | [`package-lock.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json)                                       | [`npm install`](https://docs.npmjs.com/cli/v8/commands/npm-install)     | 8, 9, 10           |
| pnpm                                                                                                                              | [`pnpm-lock.yaml`](https://pnpm.io/git)                                                                                       | [`pnpm install`](https://pnpm.io/cli/install)                           | 6, 7, 8, 9, 10     |
| Bun 1                                                                                                                             | [`bun.lockb`](https://bun.sh/docs/install/lockfile) or [`bun.lock`](https://bun.sh/docs/install/lockfile#text-based-lockfile) | [`bun install`](https://bun.sh/docs/cli/install)                        | 1                  |
| Vlt  | `vlt-lock.json`                                                                                                               | [`vlt install`](https://docs.vlt.sh/)                                   | 0.x                |

While Vercel automatically selects the package manager based on the lock file present in your project, the specific version of that package manager is determined by the version information in the lock file or associated configuration files.

The npm and pnpm package managers create a `lockfileVersion` property when they generate a lock file. This property specifies the lock file's format version, ensuring proper processing and compatibility. For example, a `pnpm-lock.yaml` file with `lockfileVersion: 9.0` will be interpreted by pnpm 9, while a `pnpm-lock.yaml` file with `lockfileVersion: 5.4` will be interpreted by pnpm 7.

| Package Manager | Condition                    | Install Command                    | Version Used   |
| --------------- | ---------------------------- | ---------------------------------- | -------------- |
| pnpm            | `pnpm-lock.yaml`: present    | `pnpm install`                     | Varies         |
|                 | `lockfileVersion`: 9.0       | -                                  | pnpm 9 or 10\* |
|                 | `lockfileVersion`: 7.0       | -                                  | pnpm 9         |
|                 | `lockfileVersion`: 6.0/6.1   | -                                  | pnpm 8         |
|                 | `lockfileVersion`: 5.3/5.4   | -                                  | pnpm 7         |
|                 | Otherwise                    | -                                  | pnpm 6         |
| npm             | `package-lock.json`: present | `npm install`                      | Varies         |
|                 | `lockfileVersion`: 2         | -                                  | npm 8          |
|                 | Node 20                      | -                                  | npm 10         |
|                 | Node 22                      | -                                  | npm 10         |
| Bun             | `bun.lockb`: present         | `bun install`                      | Bun <1.2      |
|                 | `bun.lock`: present          | `bun install --save-text-lockfile` | Bun 1          |
|                 | `bun.lock`: present          | `bun install`                      | Bun >=1.2      |
| Yarn            | `yarn.lock`: present         | `yarn install`                     | Yarn 1         |
| Vlt             | `vlt-lock.json`: present     | `vlt install`                      | Vlt 0.x        |

> **💡 Note:** `pnpm-lock.yaml` version 9.0 can be generated by pnpm 9 or 10. Newer projects
> will prefer 10, while older prefer 9. Check [build
> logs](/docs/deployments/logs) to see which version is used for your project.

When no lock file exists, Vercel uses npm by default. Npm's default version aligns with the Node.js version as described in the table above. Defaults can be overridden using [`installCommand`](/docs/project-configuration/vercel-json#installcommand) or [Corepack](/docs/builds/configure-a-build#corepack) for specific package manager versions.

## Manually specifying a package manager

You can manually specify a package manager to use on a per-project, or per-deployment basis.

### Project override

To specify a package manager for all deployments in your project, use the **Override** setting in your project's [**Build & Development Settings**](/docs/builds/configure-a-build#build-and-development-settings):

1. Navigate to your [dashboard](/dashboard) and select your project
2. Open **Settings** in the sidebar and select [**General**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fgeneral\&title=Go+to+General+settings)
3. Enable the **Override** toggle in the [**Build & Development Settings**](/docs/builds/configure-a-build#build-and-development-settings) section and add your install command. Once you save, it will be applied on your next deployment

> **💡 Note:** When using an override install command like
> `pnpm install`, Vercel will use the oldest version of
> the specified package manager available in the build container. For example,
> if you specify `pnpm install` as your override install
> command, Vercel will use pnpm 6.

### Deployment override

To specify a package manager for a deployment, use the [`installCommand`](/docs/project-configuration/vercel-json#installcommand) property in your projects `vercel.json`.

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "installCommand": "pnpm install"
}
```


---

[View full sitemap](/docs/sitemap)
