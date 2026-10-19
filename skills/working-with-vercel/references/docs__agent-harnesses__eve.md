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
summary: eve agents are durable out of the box on Vercel, with no extra configuration.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-harnesses/eve.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "b43afa4956cafc5ea8b74f6585a78222b441f83e43c3e3d4efeee7182b5071e2"
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
- [Introducing eve, an open-source agent framework](https://vercel.com/changelog/introducing-eve-an-open-source-agent-framework)
- [Deployment](https://eve.dev/docs/guides/deployment/overview) — Choose a deployment strategy and prepare an eve agent for production.
- [Build and deploy eve agents from the Vercel dashboard](https://vercel.com/changelog/build-and-deploy-eve-agents-from-the-vercel-dashboard)
- [Give your eve agent an email inbox with Resend](https://vercel.com/kb/guide/eve-agent-with-resend) — Connect an eve agent to email using the Chat SDK channel and the Resend adapter. Handle inbound email, threaded replies,
- [Running Durable Agents on Vercel](https://vercel.com/kb/guide/durable-ai-agents) — Design durable AI agents on Vercel with patterns for execution recovery, human approval, safe retries, deployment change
- [Agent Harnesses You Can Run Durably on Vercel](https://vercel.com/docs/agent-harnesses/harnesses) — Guides for running Pi, fx, OpenCode, eve, Claude Code, and Codex durably on Vercel, so a crash or a timeout resumes the
- [Concepts](https://vercel.com/docs/eve/concepts) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.

Full cross-link map for this page: [/docs/agent-harnesses/eve.graph.md](/docs/agent-harnesses/eve.graph.md)
<!-- /docsgraph:related -->

There's nothing to add: you don't install `durable-harness`, write a flow route, or configure a queue. To learn how durability works, see [Running Agent Harnesses Durably](/docs/agent-harnesses).

## Get started

- ### Create an agent
  The eve CLI scaffolds a new agent project, installs its dependencies, and starts the development server:
  ```bash
  npx eve@latest init my-agent
  ```
  To add eve to an existing app, follow the [eve quickstart](https://eve.dev/docs/getting-started#install-manually).

- ### Deploy
  From the new project:
  ```bash
  cd my-agent
  vercel deploy
  ```

For agents, tools, channels, and everything else, see the [eve documentation](https://eve.dev/docs) and [eve on Vercel](/docs/eve).


---

[View full sitemap](/docs/sitemap)
