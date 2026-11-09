---
title: Agent Frameworks on Vercel
product: vercel
url: /docs/frameworks/agents
canonical_url: "https://vercel.com/docs/frameworks/agents"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/frameworks
related:
  - /docs/ai-gateway
  - /docs/sandbox
  - /docs/frameworks/agents/eve
  - /docs/frameworks/agents/mastra
  - /docs/frameworks/agents/flue
summary: Build AI agents with eve, Mastra, Flue, and Vercel. Learn how each framework connects to Vercel compute, models, and storage.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/agents.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "3c474a96faa426955eb33cc7a8b2fd42d46eae28e86c55f68591f0e80f8bb834"
---

# Agent Frameworks on Vercel

Agent frameworks coordinate model calls, tools, and application state. You can use them with Vercel to serve agent requests, access models through [AI Gateway](/docs/ai-gateway), and run isolated code with [Vercel Sandbox](/docs/sandbox).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Agent Stack](https://vercel.com/blog/agent-stack)
- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [Give your eve agent secure access to your private AWS RDS database](https://vercel.com/kb/guide/give-eve-agent-secure-access-to-aws-rds-database) — Connect an eve agent to a private AWS RDS database using Vercel Secure Compute and VPC peering, with a read-only query t
- [Introducing eve, an open-source agent framework](https://vercel.com/changelog/introducing-eve-an-open-source-agent-framework)
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [AI agents and services on the Vercel Marketplace](https://vercel.com/blog/ai-agents-and-services-on-the-vercel-marketplace)
- [Build and deploy eve agents from the Vercel dashboard](https://vercel.com/changelog/build-and-deploy-eve-agents-from-the-vercel-dashboard)
- [Running eve Agents Durably on Vercel](https://vercel.com/docs/agent-harnesses/eve) — eve agents are durable out of the box on Vercel, with no extra configuration.
- [Agent Resources](https://vercel.com/docs/agent-resources) — Set up AI coding tools with Vercel documentation, reusable skills, and secure access to projects, deployments, and logs.

Full cross-link map for this page: [/docs/frameworks/agents.graph.md](/docs/frameworks/agents.graph.md)
<!-- /docsgraph:related -->

Choose a framework guide to set up a project and run it locally. Each guide explains its Vercel integrations and hosting requirements, including deployment steps where the framework supports running on Vercel.

| Framework | Guide |
| --- | --- |
| [eve](/docs/frameworks/agents/eve) | Build a durable agent with Vercel-native deployment and session state. |
| [Mastra](/docs/frameworks/agents/mastra) | Deploy an agent API with Mastra's Vercel deployer and connect it to AI Gateway. |
| [Flue](/docs/frameworks/agents/flue) | Run an agent with Flue and connect its model calls and code execution to Vercel. |

If you're choosing between eve and building an agent directly with AI SDK, see [Choosing between eve, AI SDK agents, and `WorkflowAgent`](/kb/guide/eve-vs-ai-sdk-agents-vs-workflowagent). Compare execution state, approvals, and channels to decide how much your application needs to manage.

Use the [agent stack reference architecture](/kb/architecture/agents) to plan how your framework connects to models, tools, and durable workflows, and prepare your agent for production.

## Vercel services for agents

Your framework determines how an agent runs and manages its state. Vercel provides the infrastructure you can connect to it:

- [Vercel Functions](/docs/functions) handle incoming requests and scale with traffic. Agent work running inside a function must fit within its [duration limit](/docs/functions/limitations#max-duration).
- [AI Gateway](/docs/ai-gateway) routes model requests through a single endpoint with usage tracking and provider fallbacks.
- [Vercel Sandbox](/docs/sandbox) isolates generated code and command execution from your application.
- [Vercel Daemons](/docs/daemons) run background workers that continuously pull jobs from a queue or workflow engine. See the framework guide for worker requirements.
- [Vercel Passport](/docs/passport) protects internal web applications with your identity provider. Use verified visitor identity to authorize agent requests and access to conversation history.

## Persist execution, workspaces, and files

Choose persistence based on what your agent needs to retain:

| Need | Vercel service | Example |
| --- | --- | --- |
| Resume multi-step work after interruptions | [Vercel Workflows](/docs/workflows) | Run an agent, wait for approval, then publish its result. eve uses Workflows for session execution on Vercel. |
| Reuse a working directory across sandbox runs | [Vercel Drives](/docs/sandbox/concepts/drives) | Keep source files, datasets, or a dependency cache and mount them in a later sandbox. |
| Store and serve files outside the sandbox | [Vercel Blob](/docs/vercel-blob) | Save uploaded documents or generated reports. eve's file memory provider also uses a private Blob store. |

These services can work together: a workflow coordinates an agent that edits files on a Drive and saves its finished report to Blob. Drives mount inside Vercel Sandbox; Blob exposes files through its SDK and HTTP delivery.

Framework-specific conversation history and execution state can require a separate database. Follow each framework guide's storage requirements and use [Marketplace storage integrations](/marketplace/category/storage) when you need a remote database.

For agents that connect to external services or chat platforms, see [Vercel Connect](/connect) and [Chat SDK](/docs/chat-sdk).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
