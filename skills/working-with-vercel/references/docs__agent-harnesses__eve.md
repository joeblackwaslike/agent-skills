---
title: Running eve Agents Durably on Vercel
product: vercel
url: /docs/agent-harnesses/eve
canonical_url: "https://vercel.com/docs/agent-harnesses/eve"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/agent-harnesses
related:
  - /docs/eve
  - /docs/agent-harnesses
  - /docs/eve/getting-started
  - /docs/eve/authentication
  - /docs/eve/deploying
summary: eve agents are durable out of the box on Vercel, with no extra configuration.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-harnesses/eve.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "b668d6867f608f1a09892b0be0209c035c9efbab8aba502a7d13af4f1e314df0"
---

# Running eve Agents Durably on Vercel

[eve](/docs/eve) is Vercel's framework for durable AI agents. Every eve session already runs as a durable workflow on the [Workflow SDK](https://workflow-sdk.dev) and its Worlds, the same foundation as the other harnesses in these guides. A crash, a function timeout, or a redeploy resumes the session from its last completed step.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [How to build a GitHub agent with eve and GitHub Tools](https://vercel.com/kb/guide/github-agent-eve) — Build a GitHub agent with eve, GitHub Tools, and Vercel Connect. Register AI-callable GitHub tools, gate writes behind d
- [Self-Host eve](https://eve.dev/docs/guides/deployment/self-hosting) — Run an eve agent as a Node service with your own workflow storage, sandbox provider, and routing.
- [Give your eve agent secure access to your private AWS RDS database](https://vercel.com/kb/guide/give-eve-agent-secure-access-to-aws-rds-database) — Connect an eve agent to a private AWS RDS database using Vercel Secure Compute and VPC peering, with a read-only query t
- [Build your first Slack agent with eve](https://vercel.com/kb/guide/eve-slack-agent-starter) — Deploy the eve Slack agent template: a starter Slack bot built on the eve framework with an example tool and skill.
- [Deployment](https://eve.dev/docs/guides/deployment/overview) — Choose a deployment strategy and prepare an eve agent for production.
- [Introducing eve, an open-source agent framework](https://vercel.com/changelog/introducing-eve-an-open-source-agent-framework)
- [How to add tools to your eve agent](https://vercel.com/kb/guide/how-to-add-eve-tools) — Add tools to an eve agent by creating a TypeScript file under agent/tools/ with defineTool, and gate sensitive ones on h
- [Build and deploy eve agents from the Vercel dashboard](https://vercel.com/changelog/build-and-deploy-eve-agents-from-the-vercel-dashboard)
- [How to add skills to your eve agent](https://vercel.com/kb/guide/how-to-add-eve-skills) — Add skills to an eve agent by creating a file under agent/skills/ or installing a published skill with the npx skills ad
- [Agent Harnesses You Can Run Durably on Vercel](https://vercel.com/docs/agent-harnesses/harnesses) — Guides for running Pi, fx, OpenCode, eve, Claude Code, and Codex durably on Vercel, so a crash or a timeout resumes the
- [Coding Agents and Chat Platforms with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents) — Connect coding agents and chat platforms to AI Gateway. Configure Claude Code, Codex, Chatbox, Open WebUI, and more.

Full cross-link map for this page: [/docs/agent-harnesses/eve.graph.md](/docs/agent-harnesses/eve.graph.md)
<!-- /docsgraph:related -->

There's nothing to add: you don't install `durable-harness`, write a flow route, or configure a queue. To learn how durability works, see [Running Agent Harnesses Durably](/docs/agent-harnesses).

## Get started

- ### Create an agent
  The eve CLI scaffolds a new agent project, installs its dependencies, and opens the terminal UI:
  ```bash
  npx eve@latest init my-agent
  ```
  To add eve to an existing app, follow the [eve quickstart](/docs/eve/getting-started#initialize-the-project).

- ### Deploy
  Configure [authentication](/docs/eve/authentication) for your callers, then deploy to Production from the new project:
  ```bash
  cd my-agent
  npx eve deploy
  ```
  See [Deploying eve to Vercel](/docs/eve/deploying) for project linking, credentials, and deployment checks.

For agents, tools, channels, and everything else, see the [eve documentation](https://eve.dev/docs) and [eve on Vercel](/docs/eve).


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
