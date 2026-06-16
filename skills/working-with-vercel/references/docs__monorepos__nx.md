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
  - /docs/projects/overview
  - /docs/getting-started-with-vercel/import
  - /docs/deployments/configure-a-build
  - /docs/project-configuration/project-settings
  - /docs/environment-variables
summary: Nx is an extensible build system with support for monorepos, integrations, and Remote Caching on Vercel. Learn how to deploy Nx to Vercel with this...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/monorepos/nx.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "52c5dd7dc812dd2dd179d18d4dc80f8001a37444242311289c595ca284fbc391"
---

# Deploying Nx to Vercel

Nx is an extensible build system with support for monorepos, integrations, and Remote Caching on Vercel.

Read the [Intro to Nx](https://nx.dev/docs/getting-started/intro) docs to learn about the benefits of using Nx to manage your monorepos.

## Deploy Nx to Vercel

- ### Ensure your Nx project is configured correctly
  If you haven't already connected your monorepo to Nx, you can follow the [Getting Started](https://nx.dev/docs/guides/adopting-nx/adding-to-monorepo) on the Nx docs to do so.

  To ensure the best experience using Nx with Vercel, use `nx` version `17` or later.
  There are also additional settings if you are [using Remote Caching](/docs/monorepos/nx#setup-remote-caching-for-nx-on-vercel).

  > **💡 Note:** All Nx starters and examples are preconfigured with these settings.

- ### Import your project
  [Create a new Project](/docs/projects/overview#creating-a-project) on the Vercel dashboard and [import](/docs/getting-started-with-vercel/import) your monorepo project.

  Vercel handles all aspects of configuring your monorepo, including setting [build commands](/docs/deployments/configure-a-build#build-command), the [Root Directory](/docs/deployments/configure-a-build#root-directory), the correct directory for npm workspaces, and the [ignored build step](/docs/project-configuration/project-settings#ignored-build-step).

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
