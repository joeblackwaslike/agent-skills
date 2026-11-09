---
title: Package Managers
product: vercel
url: /docs/package-managers
canonical_url: "https://vercel.com/docs/package-managers"
last_updated: 2026-08-11
type: reference
prerequisites:
  []
related:
  - /docs/builds
  - /docs/builds/configure-a-build
  - /docs/functions/runtimes/node-js/node-js-versions
  - /docs/deployments/logs
  - /docs/project-configuration/vercel-json
summary: Discover the package managers supported by Vercel for dependency management. Learn how Vercel detects and uses npm, Yarn, pnpm, and Bun for optimal...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/package-managers.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "abd4d2b738ed123ad013da5a412c90a55608c53ad4d702d446c8c5bf54bf0401"
---

# Package Managers

Vercel will automatically detect the package manager used in your project and install the dependencies when you [create a deployment](/docs/builds#build-infrastructure). It does this by looking at the lock file in your project and inferring the correct package manager to use.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vlt is now available in builds via zero configuration](https://vercel.com/changelog/vlt-is-now-available-in-builds-via-zero-configuration)
- [Dependencies from package.json are missing after install](https://vercel.com/kb/guide/dependencies-from-package-json-missing-after-install) — Understand why dependencies may not being installed during a build and how to fix.
- [Does Vercel Support Yarn? \\(Versions 2, 3, and 4\\)](https://vercel.com/kb/guide/does-vercel-support-yarn-4) — Vercel supports Yarn 1, 2, 3, and 4. Learn which version your build uses by default, and how to pin Yarn 4 with Corepack
- [Projects using pnpm can now be deployed with zero configuration](https://vercel.com/changelog/projects-using-pnpm-can-now-be-deployed-with-zero-configuration)
- [How do I use private dependencies with Vercel?](https://vercel.com/kb/guide/using-private-dependencies-with-vercel) — Information on how to use private dependencies with a Vercel deployment.
- [Version 7 of npm is now supported](https://vercel.com/changelog/version-7-of-npm-is-now-supported)
- [Customizing the Install Command while creating Projects](https://vercel.com/changelog/customizing-the-install-command-while-creating-projects)
- [Automatic pnpm v8 support](https://vercel.com/changelog/automatic-pnpm-v8-support)
- [Conditional Build Commands: Environment, Branch, and Custom Workflows](https://vercel.com/kb/guide/dynamic-build-commands) — Run a different Vercel build command for each environment or Git branch using a shell script, vercel.json, or vercel.ts,
- [Build Features for Customizing Deployments](https://vercel.com/docs/builds/build-features) — Learn how to customize your deployments using Vercel's build features.
- [Project settings](https://vercel.com/docs/project-configuration/project-settings) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,
- [Deploying to Vercel](https://vercel.com/docs/deployments) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.

Full cross-link map for this page: [/docs/package-managers.graph.md](/docs/package-managers.graph.md)
<!-- /docsgraph:related -->

If you are using [Corepack](/docs/builds/configure-a-build#corepack), Vercel will use the package manager specified in the `package.json` file's `packageManager` field instead.

## Supported package managers

The following table lists the package managers supported by Vercel, with their install commands and versions:

| Package Manager                                                                                                                   | Lock File                                                                                                                     | Install Command                                                         | Supported Versions |
| --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------ |
| Yarn                                                                                                                              | [`yarn.lock`](https://classic.yarnpkg.com/lang/en/docs/yarn-lock/)                                                            | [`yarn install`](https://classic.yarnpkg.com/lang/en/docs/cli/install/) | 1, 2, 3, 4         |
| npm                                                                                                                               | [`package-lock.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json)                                       | [`npm install`](https://docs.npmjs.com/cli/v8/commands/npm-install)     | 8, 9, 10, 11       |
| pnpm                                                                                                                              | [`pnpm-lock.yaml`](https://pnpm.io/git)                                                                                       | [`pnpm install`](https://pnpm.io/cli/install)                           | 6, 7, 8, 9, 10, 11, 12 |
| Bun 1                                                                                                                             | [`bun.lockb`](https://bun.sh/docs/install/lockfile) or [`bun.lock`](https://bun.sh/docs/install/lockfile#text-based-lockfile) | [`bun install`](https://bun.sh/docs/cli/install)                        | 1                  |
| Vlt Beta | `vlt-lock.json`                                                                                                               | [`vlt install`](https://docs.vlt.sh/)                                   | 0.x                |

While Vercel automatically selects the package manager based on the lock file present in your project, the specific version of that package manager is determined by the version information in the lock file or associated configuration files.

The pnpm package manager creates a `lockfileVersion` property when it generates a lock file. This property specifies the lock file's format version, ensuring proper processing and compatibility. For example, a `pnpm-lock.yaml` file with `lockfileVersion: 9.0` will be interpreted by pnpm 9 or 10, while a `pnpm-lock.yaml` file with `lockfileVersion: 5.4` will be interpreted by pnpm 7.

For npm, Vercel does not select the version from the lock file. Your build uses the npm version that comes with your project's [Node.js version](/docs/functions/runtimes/node-js/node-js-versions).

| Package Manager | Condition                    | Install Command                    | Version Used   |
| --------------- | ---------------------------- | ---------------------------------- | -------------- |
| pnpm            | `pnpm-lock.yaml`: present    | `pnpm install`                     | Varies         |
|                 | `lockfileVersion`: 9.0       | -                                  | pnpm 9 or 10\* |
|                 | `lockfileVersion`: 7.0       | -                                  | pnpm 9         |
|                 | `lockfileVersion`: 6.0/6.1   | -                                  | pnpm 8         |
|                 | `lockfileVersion`: 5.4       | -                                  | pnpm 7         |
|                 | Otherwise                    | -                                  | pnpm 6         |
| npm             | `package-lock.json`: present | `npm install`                      | Varies         |
|                 | Node 22                      | -                                  | npm 10         |
|                 | Node 24                      | -                                  | npm 11         |
|                 | Node 26                      | -                                  | npm 11         |
| Bun             | `bun.lockb`: present         | `bun install`                      | Bun 1          |
|                 | `bun.lock`: present          | `bun install`                      | Bun 1          |
| Yarn            | `yarn.lock`: present         | `yarn install`                     | Yarn 1         |
| Vlt             | `vlt-lock.json`: present     | `vlt install`                      | Vlt 0.x        |

> **💡 Note:** `pnpm-lock.yaml` version 9.0 can be generated by pnpm 9 or 10. Newer projects
> will prefer 10, while older prefer 9. Check [build
> logs](/docs/deployments/logs) to see which version is used for your project.

When no lock file exists, Vercel uses npm by default. Npm's default version aligns with the Node.js version as described in the table above. Defaults can be overridden using [`installCommand`](/docs/project-configuration/vercel-json#installcommand) or [Corepack](/docs/builds/configure-a-build#corepack) for specific package manager versions.

## Manually specifying a package manager

You can manually specify a package manager to use on a per-project, or per-deployment basis.

### Project override

To specify a package manager for all deployments in your project, use the **Override** setting in your project's [**Framework Settings**](/docs/builds/configure-a-build#framework-settings):

1. Navigate to your [dashboard](/dashboard) and select your project
2. Open **Settings** in the sidebar and select [**Build and Deployment**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fbuild-and-deployment\&title=Go+to+Build+and+Deployment+Settings)
3. Enable the **Override** toggle for the Install Command in the [**Framework Settings**](/docs/builds/configure-a-build#framework-settings) section and add your install command. Once you save, it will be applied on your next deployment

> **💡 Note:** When you use an override install command like `pnpm install`, Vercel still
> selects the package manager version from the lock file in your project, as
> described in [Supported package managers](#supported-package-managers). If
> your project has no lock file for that package manager, Vercel uses the
> oldest version available in the build container. For example, `pnpm install`
> without a `pnpm-lock.yaml` file uses pnpm 6.

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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
