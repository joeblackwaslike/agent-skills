---
title: Deploying Nx to Vercel
product: vercel
url: /docs/monorepos/nx
canonical_url: "https://vercel.com/docs/monorepos/nx"
last_updated: 2026-08-11
type: tutorial
prerequisites:
  - /docs/monorepos
related:
  - /docs/projects/managing-projects
  - /docs/getting-started-with-vercel
  - /docs/builds/configure-a-build
  - /docs/project-configuration/project-settings
  - /docs/environment-variables
summary: Nx is an extensible build system with support for monorepos, integrations, and Remote Caching on Vercel. Learn how to deploy Nx to Vercel with this...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/monorepos/nx.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "0ac928abd28d351e2a1b224a8fe906b1465e9c5a5770bf54053364377752eef0"
---

# Deploying Nx to Vercel

Nx is an extensible build system with support for monorepos, integrations, and Remote Caching on Vercel.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to ship a Nitro app on Vercel](https://vercel.com/kb/guide/ship-a-nitro-app-on-vercel) — Deploy a Nitro app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and con
- [Migrate to Vercel from Netlify](https://vercel.com/kb/guide/migrate-to-vercel-from-netlify) — Migrate your website's configuration from Netlify to Vercel
- [Monorepos FAQ](https://vercel.com/docs/monorepos/monorepo-faq) — Learn the answer to common questions about deploying monorepos on Vercel.
- [Builds](https://vercel.com/docs/builds) — Understand how the build step works when creating a Vercel Deployment.
- [Nitro on Vercel](https://vercel.com/docs/frameworks/backend/nitro) — Deploy Nitro applications to Vercel with zero configuration. Learn about observability, ISR, and custom build configurat
- [Remote Caching](https://vercel.com/docs/monorepos/remote-caching) — Vercel Remote Cache allows you to share build outputs and artifacts across distributed teams.
- [Diagnosing and fixing cache issues](https://vercel.com/docs/caching/cdn-cache/debug-cache-issues) — Diagnose stale content and fix CDN cache, data cache, and build cache issues using the CLI.

Full cross-link map for this page: [/docs/monorepos/nx.graph.md](/docs/monorepos/nx.graph.md)
<!-- /docsgraph:related -->

Read the [Intro to Nx](https://nx.dev/docs/getting-started/intro) docs to learn about the benefits of using Nx to manage your monorepos.

## Deploy Nx to Vercel

- ### Ensure your Nx project is configured correctly
  If you haven't already connected your monorepo to Nx, you can follow the [Getting Started](https://nx.dev/docs/guides/adopting-nx/adding-to-monorepo) on the Nx docs to do so.

  To ensure the best experience using Nx with Vercel, use `nx` version `17` or later.
  There are also additional settings if you are [using Remote Caching](/docs/monorepos/nx#setup-remote-caching-for-nx-on-vercel).

  > **💡 Note:** All Nx starters and examples are preconfigured with these settings.

- ### Import your project
  [Create a new Project](/docs/projects/managing-projects#creating-a-project) on the Vercel dashboard and [import](/docs/getting-started-with-vercel) your monorepo project.

  Vercel handles all aspects of configuring your monorepo, including setting [build commands](/docs/builds/configure-a-build#build-command), the [Root Directory](/docs/builds/configure-a-build#root-directory), the correct directory for npm workspaces, and the [ignored build step](/docs/project-configuration/project-settings#ignored-build-step).

- ### Next steps
  Your Nx monorepo is now configured and ready to be used with Vercel!

  You can now [setup Remote Caching for Nx on Vercel](#setup-remote-caching-for-nx-on-vercel) or configure additional deployment options, such as [environment variables](/docs/environment-variables).

## Using `nx-ignore`

`nx-ignore` provides a way for you to tell Vercel if a build should continue or not. For more details and information on how to use `nx-ignore`, see the [documentation](https://github.com/nrwl/nx-labs/tree/main/packages/nx-ignore).

## Setup Remote Caching for Nx on Vercel

Before using remote caching with Nx, ensure the `NX_CACHE_DIRECTORY` environment variable is set to `/tmp/nx-cache`.

To configure Remote Caching for your Nx project on Vercel, use the [`@vercel/remote-nx`](https://github.com/vercel/remote-cache/tree/main/packages/remote-nx) plugin.

> **💡 Note:** `@vercel/remote-nx` uses the custom task runner API, which Nx deprecated in v20 and removed in v21. If you're on Nx 20+, see the [Nx 20+ section below](#nx-20-and-later).

### Nx 17 to 19

- #### Install the `@vercel/remote-nx` plugin
  **pnpm**
  ```bash
  pnpm i @vercel/remote-nx
  ```
  **yarn**
  ```bash
  yarn add @vercel/remote-nx
  ```
  **npm**
  ```bash
  npm i @vercel/remote-nx
  ```
  **bun**
  ```bash
  bun add @vercel/remote-nx
  ```

- #### Configure the `@vercel/remote-nx` runner
  In your `nx.json` file, add the `@vercel/remote-nx` runner to `tasksRunnerOptions`:
  ```json filename="nx.json"
  {
    "tasksRunnerOptions": {
      "default": {
        "runner": "@vercel/remote-nx",
        "options": {
          "token": "<token>",
          "teamId": "<teamId>"
        }
      }
    }
  }
  ```
  You can specify your `token` and `teamId` in your `nx.json` or set them as environment variables.

  | Parameter                                                     | Description                                           | Environment Variable / .env    | `nx.json` |
  | ------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------ | --------- |
  | Vercel Access Token                                           | Vercel access token with access to the provided team  | `NX_VERCEL_REMOTE_CACHE_TOKEN` | `token`   |
  | Vercel [Team ID](/docs/accounts#find-your-team-id) (optional) | The Vercel Team ID that should share the Remote Cache | `NX_VERCEL_REMOTE_CACHE_TEAM`  | `teamId`  |
  > **💡 Note:** When deploying on Vercel, these variables will be automatically set for you.

- #### Clear cache and run
  Clear your local cache and rebuild your project.

  **pnpm**
  ```bash
  pnpm dlx nx reset
  ```
  **yarn**
  ```bash
  yarn dlx nx reset
  ```
  **npm**
  ```bash
  npx nx reset
  ```
  **bun**
  ```bash
  bunx nx reset
  ```
  **pnpm**
  ```bash
  pnpm dlx nx build
  ```
  **yarn**
  ```bash
  yarn dlx nx build
  ```
  **npm**
  ```bash
  npx nx build
  ```
  **bun**
  ```bash
  bunx nx build
  ```

### Nx 20 and later

Nx 20+ deprecated custom task runners. Remote caching now uses an [HTTP-based API](https://nx.dev/docs/guides/tasks--caching/self-hosted-caching) instead of npm packages. The `@vercel/remote-nx` package is not compatible with Nx 20+.

For remote caching on Nx 20+, consider the following options:

- **[Turborepo](/docs/monorepos/turborepo)**: Vercel's build system with built-in remote caching support. If you're evaluating build tools, Turborepo offers the most seamless experience on Vercel.
- **[Self-hosted remote cache](https://nx.dev/docs/guides/tasks--caching/self-hosted-caching#self-hosted-cache)**: Build a custom cache server using the Nx OpenAPI specification (Nx 20.8+)

## Troubleshooting

### Build outputs cannot be found on cache hit

When Nx restores a build task from its cache, it restores only the files listed in that task's `outputs`. If the framework's build directory isn't listed, the deployment fails with one of these errors:

```txt
The file "/vercel/path0/apps/web/.next/routes-manifest.json" couldn't be found.
```

```txt
No Output Directory named "dist" found after the Build completed.
```

The path and directory name in the error depend on your project. To confirm that the cache is the cause, [redeploy without the Build Cache](/docs/deployments/troubleshoot-a-build#managing-build-cache), which also skips the Remote Cache. If that deployment succeeds, the cached task is missing its outputs.

To fix it, add the directory your framework builds into to the `outputs` of the build target. For a Next.js app, that's the `.next` directory:

```json filename="apps/web/project.json"
{
  "targets": {
    "build": {
      "outputs": ["{projectRoot}/.next"]
    }
  }
}
```

Make sure the directory matches the [Output Directory](/docs/builds/configure-a-build#output-directory) in your project settings. See [Configure outputs](https://nx.dev/docs/kb/configure-outputs) in the Nx documentation for the full `outputs` syntax.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
