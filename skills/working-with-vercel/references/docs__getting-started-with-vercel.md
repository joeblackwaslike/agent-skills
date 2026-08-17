---
title: Getting started with Vercel
product: vercel
url: /docs/getting-started-with-vercel
canonical_url: "https://vercel.com/docs/getting-started-with-vercel"
last_updated: 2026-06-16
type: how-to
prerequisites:
  []
related:
  - /docs/cli
  - /docs/agent-resources/vercel-plugin
  - /docs/agent-resources/skills
  - /docs/cli/install
  - /docs/cli/integration
summary: Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/getting-started-with-vercel.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "1c334b5ac7c3f639feafc7e1174737cf05345be7f54c54435e1516915f7f818e"
---

# Getting started with Vercel

Deploy your app on Vercel in three steps: install the CLI, add agent support if you use an AI coding agent, and deploy.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Vercel as a Standalone CDN](https://vercel.com/kb/guide/using_vercel_as_a_cdn?from=related) — Use Vercel's external rewrites to proxy and cache content from external websites or APIs through Vercel's global edge ne
- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations?from=related) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Migrate a TanStack Start app from Cloudflare to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-cloudflare-to-vercel?from=related) — Move your TanStack Start app off Cloudflare Workers and onto Vercel Functions, where Fluid compute scales it automatical
- [Deploy a TanStack Start app to Vercel](https://vercel.com/kb/guide/deploy-a-tanstack-start-app-to-vercel?from=related) — Learn how to deploy a TanStack Start app to Vercel using the Nitro Vite plugin. Covers framework setup, Git and CLI depl
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel?from=related) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [Migrate a TanStack Start app from Netlify to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-netlify-to-vercel?from=related) — Move your TanStack Start app off Netlify and onto Vercel Functions, where Fluid compute scales it automatically. Swap to
- [Deployments](https://vercel.com/docs/deployments?from=related) — Learn how to create and manage deployments on Vercel.
- [Deploy from CLI](https://vercel.com/docs/projects/deploy-from-cli?from=related) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Build System](https://vercel.com/docs/fundamentals/builds?from=related) — Learn how Vercel transforms your source code into optimized assets ready to serve globally.
- [Project Settings](https://vercel.com/docs/project-configuration/project-settings?from=related) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,
- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.

Full cross-link map for this page: [/docs/getting-started-with-vercel.graph.md](/docs/getting-started-with-vercel.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

- A [Vercel account](/signup)
- [Node.js 18+](https://nodejs.org/)

## Install the Vercel CLI

Every Vercel workflow starts with the CLI. Install it whether or not you use an AI coding agent. Agents that can run terminal commands use the CLI to deploy, pull environment variables, and manage projects.

- ### Install Vercel CLI
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i vercel
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i vercel
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i vercel
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i vercel
      ```
    </Code>
  </CodeBlock>

- ### Log in to Vercel
  ```bash
  vercel login
  ```
  Follow the prompts to authenticate with your Vercel account.

- ### Deploy your project
  Navigate to your project directory and run:
  ```bash
  vercel
  ```
  The CLI detects your framework, builds your project, and deploys it. To deploy to production:
  ```bash
  vercel --prod
  ```

See the [CLI documentation](/docs/cli) for the full command reference.

## Install the Vercel Plugin

If you use [Claude Code](https://docs.anthropic.com/en/docs/claude-code) or [Cursor](https://www.cursor.com), install the [Vercel Plugin](https://github.com/vercel/vercel-plugin). It gives your agent deployment skills, framework best practices, and slash commands like `/vercel-plugin:deploy prod` and `/vercel-plugin:env`.

```bash
npx plugins add vercel/vercel-plugin
```

The plugin activates automatically. No configuration needed.

See the [Vercel Plugin documentation](/docs/agent-resources/vercel-plugin) for the full list of skills, specialist agents, and slash commands.

## Install Vercel Skills for other agents

If you use Cline, Windsurf, GitHub Copilot, or any of the 18+ agents supported by [Skills.sh](https://skills.sh), install Vercel Skills instead. Skills give your agent the same deployment and framework expertise in a format compatible with your tool.

```bash
npx skills add vercel-labs/agent-skills
```

To install a specific skill:

```bash
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices
```

See [Agent Skills](/docs/agent-resources/skills) for the full list.

## Add a database or other storage

If your project needs a database, blob storage, or another backing service, you can provision one from the CLI and have Vercel wire the credentials into your project automatically.

Run [`vercel install`](/docs/cli/install) (alias for [`vercel integration add`](/docs/cli/integration#vercel-integration-add)) to install a Marketplace integration, provision a resource, connect it to the currently linked project, and sync environment variables into `.env.local`:

```bash
vercel install neon
vercel install upstash
vercel install supabase
```

Add `--help` to any command to see integration-specific products, metadata options, and billing plans. For non-interactive flows, pass options as flags:

```bash
vercel install neon --name my-database --plan free -e production -e preview
```

See [Storage on Vercel Marketplace](/docs/marketplace-storage) for the full list of storage integrations.

## Deploy from the dashboard

You can also deploy without the CLI. Go to the [New Project](/new) page, connect your [GitHub](/docs/git/vercel-for-github), [GitLab](/docs/git/vercel-for-gitlab), or [Bitbucket](/docs/git/vercel-for-bitbucket) account, select a repo, and click **Deploy**. Every push to your connected branch triggers a new deployment automatically.

## Next steps

- [Fundamental concepts](/docs/fundamentals) – How requests, builds, and compute work on Vercel
- [Explore Vercel products](/docs/products) – Browse the full catalog of Vercel products and capabilities
- [Set up environment variables](/docs/environment-variables)
- [Add a custom domain](/docs/domains/set-up-custom-domain)
- [Explore supported frameworks](/docs/frameworks)
- [Vercel Functions](/docs/functions) – Run server-side code on demand
- [Storage on Vercel Marketplace](/docs/marketplace-storage) – Provision Postgres, Redis, NoSQL, and more with `vercel install`
- [Connect the Vercel MCP server](/docs/agent-resources/vercel-mcp) – Give AI agents direct access to your Vercel account
- [Agent resources](/docs/agent-resources) – Documentation access, skills, and CLI workflows for AI agents


---

[View full sitemap](/docs/sitemap)
