---
title: Deploying Nx to Vercel
product: vercel
url: /docs/monorepos/nx
canonical_url: "https://vercel.com/docs/monorepos/nx"
last_updated: 2026-03-11
type: tutorial
prerequisites:
  - /docs/monorepos
related:
  - /docs/projects
  - /docs/getting-started-with-vercel
  - /docs/builds/configure-a-build
  - /docs/project-configuration/project-settings
  - /docs/environment-variables
summary: Nx is an extensible build system with support for monorepos, integrations, and Remote Caching on Vercel. Learn how to deploy Nx to Vercel with this...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/monorepos/nx.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "16b3d6922fa76c172bcc446811a506bdf725fa8ea6c4d47ba77c1968cc88a1bf"
---

# Deploying Nx to Vercel

Nx is an extensible build system with support for monorepos, integrations, and Remote Caching on Vercel.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Missing routes-manifest.json file or No Output Directory when using Turborepo or NX](https://vercel.com/kb/guide/missing-routes-manifest-or-output-turborepo-nx?from=related) — How to solve the error \`The file "/vercel/path0/apps/web/.next/routes-manifest.json" couldn't be found\` or \`No Output
- [How to ship a Nitro app on Vercel](https://vercel.com/kb/guide/ship-a-nitro-app-on-vercel?from=related) — Deploy a Nitro app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and con
- [Vercel](https://turborepo.dev/docs/guides/ci-vendors/vercel?from=related) — Deploy your Turborepo on Vercel with zero-config Remote Caching.
- [Migrate a TanStack Start app from Netlify to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-netlify-to-vercel?from=related) — Move your TanStack Start app off Netlify and onto Vercel Functions, where Fluid compute scales it automatically. Swap to
- [Migrate a TanStack Start app from Cloudflare to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-cloudflare-to-vercel?from=related) — Move your TanStack Start app off Cloudflare Workers and onto Vercel Functions, where Fluid compute scales it automatical
- [Deploy a TanStack Start app to Vercel](https://vercel.com/kb/guide/deploy-a-tanstack-start-app-to-vercel?from=related) — Learn how to deploy a TanStack Start app to Vercel using the Nitro Vite plugin. Covers framework setup, Git and CLI depl
- [Monorepos FAQ](https://vercel.com/docs/monorepos/monorepo-faq?from=related) — Learn the answer to common questions about deploying monorepos on Vercel.
- [Remote Caching](https://vercel.com/docs/monorepos/remote-caching?from=related) — Vercel Remote Cache allows you to share build outputs and artifacts across distributed teams.
- [Troubleshoot Build Errors](https://vercel.com/docs/deployments/troubleshoot-a-build?from=related) — Learn how to resolve common scenarios you may encounter during the Build step, including build errors that cancel a depl
- [NestJS](https://vercel.com/docs/frameworks/backend/nestjs?from=related) — Deploy NestJS applications to Vercel with zero configuration.
- [xmcp](https://vercel.com/docs/frameworks/backend/xmcp?from=related) — Build MCP-compatible backends with xmcp and deploy to Vercel. Learn the project structure, tool format, middleware, and

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
  [Create a new Project](/docs/projects#creating-a-project) on the Vercel dashboard and [import](/docs/getting-started-with-vercel) your monorepo project.

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
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i @vercel/remote-nx
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i @vercel/remote-nx
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i @vercel/remote-nx
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i @vercel/remote-nx
      ```
    </Code>
  </CodeBlock>

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
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i 
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i 
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i 
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i 
      ```
    </Code>
  </CodeBlock>
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i 
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i 
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i 
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i 
      ```
    </Code>
  </CodeBlock>

### Nx 20 and later

Nx 20+ deprecated custom task runners. Remote caching now uses an [HTTP-based API](https://nx.dev/docs/guides/tasks--caching/self-hosted-caching) instead of npm packages. The `@vercel/remote-nx` package is not compatible with Nx 20+.

For remote caching on Nx 20+, consider the following options:

- **[Turborepo](/docs/monorepos/turborepo)**: Vercel's build system with built-in remote caching support. If you're evaluating build tools, Turborepo offers the most seamless experience on Vercel.
- **[Self-hosted remote cache](https://nx.dev/docs/guides/tasks--caching/self-hosted-caching#self-hosted-cache)**: Build a custom cache server using the Nx OpenAPI specification (Nx 20.8+)


---

[View full sitemap](/docs/sitemap)
