---
title: Getting started with Vercel
product: vercel
url: /docs/getting-started-with-vercel
canonical_url: "https://vercel.com/docs/getting-started-with-vercel"
last_updated: 2026-08-11
type: how-to
prerequisites:
  []
related:
  - /docs/cli
  - /docs/agent-resources/vercel-plugin
  - /docs/agent-resources/skills
  - /docs/agent-resources/vercel-mcp
  - /docs/cli/install
summary: Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/getting-started-with-vercel.md"
fetched_at: "2026-10-12T11:51:15.124Z"
sha256: "f953840f8c1d07880e66ac2cb948f4f35460bd8aa65e1369503abd04a8cfb966"
---

# Getting started with Vercel

Install the Vercel CLI and deploy your app. If you use an AI coding agent, add agent support and connect Vercel MCP so it can work with your Vercel account.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Vercel as a Standalone CDN](https://vercel.com/kb/guide/using_vercel_as_a_cdn?from=related&source_path=%2Fdocs%2Fgetting-started-with-vercel&source_site=vercel-docs&relationship=related) — Use Vercel's external rewrites to proxy and cache content from external websites or APIs through Vercel's global edge ne
- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations?from=related&source_path=%2Fdocs%2Fgetting-started-with-vercel&source_site=vercel-docs&relationship=related) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel?from=related&source_path=%2Fdocs%2Fgetting-started-with-vercel&source_site=vercel-docs&relationship=related) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [Vercel Deployment Guide](https://ai-sdk.dev/docs/advanced/vercel-deployment-guide?from=related&source_path=%2Fdocs%2Fgetting-started-with-vercel&source_site=vercel-docs&relationship=related) — Learn how to deploy an AI application to production on Vercel
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli?from=related&source_path=%2Fdocs%2Fgetting-started-with-vercel&source_site=vercel-docs&relationship=related) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Deploying to Vercel](https://vercel.com/docs/deployments?from=related&source_path=%2Fdocs%2Fgetting-started-with-vercel&source_site=vercel-docs&relationship=related) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.
- [Projects overview](https://vercel.com/docs/projects?from=related&source_path=%2Fdocs%2Fgetting-started-with-vercel&source_site=vercel-docs&relationship=related) — A project is where you deploy and operate frontend apps, APIs, backends, containers, and agent workloads on Vercel.
- [Documentation and CLI](https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation?from=related&source_path=%2Fdocs%2Fgetting-started-with-vercel&source_site=vercel-docs&relationship=related) — Vercel MCP tools for documentation and cli.
- [Project settings](https://vercel.com/docs/project-configuration/project-settings?from=related&source_path=%2Fdocs%2Fgetting-started-with-vercel&source_site=vercel-docs&relationship=related) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,

Full cross-link map for this page: [/docs/getting-started-with-vercel.graph.md](/docs/getting-started-with-vercel.graph.md?from=related&source_path=%2Fdocs%2Fgetting-started-with-vercel&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

**Agent prompt**

```text
Help me get set up with Vercel. Based on my project, do the following: 1. Install the Vercel CLI globally (`npm i -g vercel`) and log in with `vercel login`. 2. If you are Claude Code, OpenAI Codex, Grok Build, Cursor, GitHub Copilot, or Kimi Code, install the Vercel Plugin with `npx plugins add vercel/vercel-plugin`. If you are OpenCode, install it with `opencode plugin add github:vercel/vercel-plugin`. Otherwise, install Vercel Skills with `npx skills add vercel-labs/agent-skills`. 3. Connect the Vercel MCP server with `npx -y add-mcp https://mcp.vercel.com -g`. 4. Deploy with `vercel` and share the preview URL. 5. Suggest next steps based on my project, such as adding a custom domain, setting environment variables, or configuring Vercel Functions.
```

## Prerequisites

- A [Vercel account](/signup)
- [Node.js 18+](https://nodejs.org/)

## Install the Vercel CLI

Every Vercel workflow starts with the CLI. Install it whether or not you use an AI coding agent. Agents that can run terminal commands use the CLI to deploy, pull environment variables, and manage projects.

- ### Install Vercel CLI
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i -g vercel
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn global add vercel
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i -g vercel
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun add -g vercel
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

If you use [Claude Code](https://docs.anthropic.com/en/docs/claude-code), [OpenAI Codex](https://openai.com/codex), [Grok Build](https://x.ai/news/grok-build-cli), [Cursor](https://www.cursor.com), [GitHub Copilot](https://github.com/features/copilot), or [Kimi Code](https://kimi.com), install the [Vercel Plugin](https://github.com/vercel/vercel-plugin). It gives your agent deployment skills, framework best practices, and slash commands like `/vercel-plugin:deploy prod` and `/vercel-plugin:env`.

```bash
npx plugins add vercel/vercel-plugin
```

In [OpenCode](https://opencode.ai), install it with OpenCode's plugin command instead:

```bash
opencode plugin add github:vercel/vercel-plugin
```

The plugin activates automatically. No configuration needed.

See the [Vercel Plugin documentation](/docs/agent-resources/vercel-plugin) for the full list of skills, specialist agents, and slash commands.

## Install Vercel Skills for other agents

If your agent is not in the plugin list above, install Vercel Skills instead. Skills give your agent deployment and framework guidance in a format compatible with [Skills.sh](https://skills.sh).

```bash
npx skills add vercel-labs/agent-skills
```

To install a specific skill:

```bash
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices
```

See [Agent Skills](/docs/agent-resources/skills) for the full list.

## Connect the Vercel MCP server

Connect the Vercel MCP server so your agent can search the docs, manage projects and deployments, and query Web Analytics.

```bash
npx -y add-mcp https://mcp.vercel.com -g
```

See [Vercel MCP](/docs/agent-resources/vercel-mcp) for client-specific setup.

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
- [Agent resources](/docs/agent-resources) – Documentation access, skills, and CLI workflows for AI agents


---

[View full sitemap](/docs/sitemap)
