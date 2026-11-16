---
title: Getting started with Vercel
product: vercel
url: /docs/getting-started-with-vercel
canonical_url: "https://vercel.com/docs/getting-started-with-vercel"
last_updated: 2026-11-14
type: how-to
prerequisites:
  []
related:
  - /docs/deployments/deploy-without-logging-in
  - /docs/cli
  - /docs/agent-resources/vercel-plugin
  - /docs/agent-resources/skills
  - /docs/agent-resources/vercel-mcp
summary: Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/getting-started-with-vercel.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "d5f9b88cf4dab49c5003263ea3eb8b7272b456971fdd8ec0bbc948041f7beef6"
---

# Getting started with Vercel

Install the Vercel CLI and deploy your app. If you use an AI coding agent, add agent support and connect Vercel MCP so it can work with your Vercel account.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Can you deploy based on tags/releases on Vercel?](https://vercel.com/kb/guide/can-you-deploy-based-on-tags-releases-on-vercel) — Learn how to deploy based on tags/releases on Vercel.
- [How can I use CircleCI with Vercel?](https://vercel.com/kb/guide/how-can-i-use-circleci-with-vercel) — Learn how to use CircleCI to deploy to Vercel with custom CI/CD.
- [Using Vercel as a Standalone CDN](https://vercel.com/kb/guide/using_vercel_as_a_cdn) — Use Vercel's external rewrites to proxy and cache content from external websites or APIs through Vercel's global edge ne
- [How can I use the Vercel CLI for custom workflows?](https://vercel.com/kb/guide/using-vercel-cli-for-custom-workflows) — You can use the Vercel CLI to deploy any application, including custom git providers and restricted source code.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [vercel setup](https://vercel.com/docs/cli/setup) — Set up coding agents for Vercel with one command: install the Vercel plugin for Claude Code, Codex, and OpenCode, and co
- [Projects overview](https://vercel.com/docs/projects) — A project is where you deploy and operate frontend apps, APIs, backends, containers, and agent workloads on Vercel.
- [Deploying with BYOC Using the Vercel CLI](https://vercel.com/docs/networking/bring-your-own-cloud/deploy-with-cli) — Build a project, provision its functions in your AWS account, and complete a Bring Your Own Cloud \\(BYOC\\) deployment wi
- [vercel deploy](https://vercel.com/docs/cli/deploy) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.

Full cross-link map for this page: [/docs/getting-started-with-vercel.graph.md](/docs/getting-started-with-vercel.graph.md)
<!-- /docsgraph:related -->

**Agent prompt**

```text
Help me get set up with Vercel. Based on my project, do the following: 1. Install the Vercel CLI globally (`npm i -g vercel`) and log in with `vercel login`. 2. If you are Claude Code, OpenAI Codex, Grok Build, Cursor, GitHub Copilot, or Kimi Code, install the Vercel Plugin with `npx plugins add vercel/vercel-plugin`. If you are OpenCode, install it with `opencode plugin add github:vercel/vercel-plugin`. Otherwise, install Vercel Skills with `npx skills add vercel-labs/agent-skills`. 3. Connect the Vercel MCP server with `npx -y add-mcp https://mcp.vercel.com -g`. 4. Deploy with `vercel` and share the preview URL. 5. Suggest next steps based on my project, such as adding a custom domain, setting environment variables, or configuring Vercel Functions.
```

## Prerequisites

- A [Vercel account](/signup). Your first deploy doesn't need one: see [Deploying without logging in](/docs/deployments/deploy-without-logging-in).
- [Node.js 20+](https://nodejs.org/)

## Install the Vercel CLI

Every Vercel workflow starts with the CLI. Install it whether or not you use an AI coding agent. Agents that can run terminal commands use the CLI to deploy, pull environment variables, and manage projects.

- ### Install Vercel CLI
  **pnpm**
  ```bash
  pnpm i -g vercel
  ```
  **yarn**
  ```bash
  yarn global add vercel
  ```
  **npm**
  ```bash
  npm i -g vercel
  ```
  **bun**
  ```bash
  bun add -g vercel
  ```

- ### Log in to Vercel
  ```bash
  vercel login
  ```
  Follow the prompts to authenticate with your Vercel account.

  To deploy before you create an account, skip this step and run `vercel deploy --temporary` in the next step. The CLI prints a claim URL that you use to keep the project.

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
vercel install neon --name my-database --billing-plan free -e production -e preview
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
- [Explore reference architectures](/kb/architecture): Choose a stack and plan how your application uses Vercel services
- [Vercel Functions](/docs/functions) – Run server-side code on demand
- [Storage on Vercel Marketplace](/docs/marketplace-storage) – Provision Postgres, Redis, NoSQL, and more with `vercel install`
- [Agent resources](/docs/agent-resources) – Documentation access, skills, and CLI workflows for AI agents
- [Build with prompts](/kb/prompts): Build an app, extend an agent, or improve your project with a coding agent

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
