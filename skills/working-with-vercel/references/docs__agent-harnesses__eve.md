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
  - /docs/frameworks/agents/eve
  - /docs/agent-harnesses
  - /docs/queues
  - /docs/daemons
summary: eve agents are durable out of the box on Vercel, with no extra configuration.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-harnesses/eve.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "c70f621fe6a804f615ac3c30466fcd931d4b662d68b95bf94d1c7deb27306ac2"
---

# Running eve Agents Durably on Vercel

[eve](/docs/frameworks/agents/eve) is Vercel's framework for durable AI agents. Every eve session already runs as a durable workflow on the [Workflow SDK](https://workflow-sdk.dev) and its Worlds, the same foundation as the other harnesses in these guides. A crash, a function timeout, or a redeploy resumes the session from its last completed step.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [Deployment](https://eve.dev/docs/guides/deployment) — How an eve agent runs in production, and the backends you choose on Vercel or your own infrastructure.
- [How to build a GitHub agent with eve and GitHub Tools](https://vercel.com/kb/guide/github-agent-eve) — Build a GitHub agent with eve, GitHub Tools, and Vercel Connect. Register AI-callable GitHub tools, gate writes behind d
- [Introducing eve, an open-source agent framework](https://vercel.com/changelog/introducing-eve-an-open-source-agent-framework)
- [Give your eve agent secure access to your private AWS RDS database](https://vercel.com/kb/guide/give-eve-agent-secure-access-to-aws-rds-database) — Connect an eve agent to a private AWS RDS database using Vercel Secure Compute and VPC peering, with a read-only query t
- [How to add tools to your eve agent](https://vercel.com/kb/guide/how-to-add-eve-tools) — Add tools to an eve agent by creating a TypeScript file under agent/tools/ with defineTool, and gate sensitive ones on h
- [Self-Host eve](https://eve.dev/docs/guides/deployment/self-hosting) — Run an eve agent as a Node service on your own infrastructure, and choose the Workflow world and sandbox it uses.
- [Build and deploy eve agents from the Vercel dashboard](https://vercel.com/changelog/build-and-deploy-eve-agents-from-the-vercel-dashboard)
- [Give your eve agent an email inbox with Resend](https://vercel.com/kb/guide/eve-agent-with-resend) — Connect an eve agent to email using the Chat SDK channel and the Resend adapter. Handle inbound email, threaded replies,
- [Agent Harnesses You Can Run Durably on Vercel](https://vercel.com/docs/agent-harnesses/harnesses) — Guides for running Pi, fx, OpenCode, eve, Claude Code, and Codex durably on Vercel, so a crash or a timeout resumes the
- [Agent Frameworks on Vercel](https://vercel.com/docs/frameworks/agents) — Build AI agents with eve, Mastra, Flue, and Vercel. Learn how each framework connects to Vercel compute, models, and sto
- [Self-Hosting Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/self-hosting) — Keep durable agent harness sessions in another World, such as Postgres, and run Pi, Claude Code, Codex, OpenCode, and fx

Full cross-link map for this page: [/docs/agent-harnesses/eve.graph.md](/docs/agent-harnesses/eve.graph.md)
<!-- /docsgraph:related -->

There's nothing to add: you don't install `durable-harness`, write a flow route, or configure a queue. To learn how durability works, see [Running Agent Harnesses Durably](/docs/agent-harnesses).

## Get started

- ### Create an agent
  The eve CLI scaffolds a new agent project, installs its dependencies, and opens the terminal UI:
  ```bash
  npx eve@latest init my-agent
  ```
  To add eve to an existing app, follow the [eve framework guide](/docs/frameworks/agents/eve#create-an-agent).

- ### Deploy
  Configure [authentication](/docs/frameworks/agents/eve#configure-who-can-call-the-agent) for your callers, then deploy to Production from the new project:
  ```bash
  cd my-agent
  npx eve deploy
  ```
  See [Deploying eve to Vercel](/docs/frameworks/agents/eve#deploy-to-vercel) for project linking, credentials, and deployment checks.

## Offload work to a daemon

For tools that need system binaries or CPU-heavy processing, publish a job to [Vercel Queues](/docs/queues) and let a [Vercel Daemon](/docs/daemons) process it. The eve session can wait without holding compute until the worker returns the result through the session API. eve manages session durability; make the worker's jobs safe to retry.

Follow [Use Vercel Daemons with eve agents](/kb/guide/vercel-daemons-eve-agents) for the implementation.

For agents, tools, channels, and everything else, see the [eve documentation](https://eve.dev/docs) and [eve on Vercel](/docs/frameworks/agents/eve).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
