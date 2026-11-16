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
  - /docs/workflows
summary: eve agents are durable out of the box on Vercel, with no extra configuration.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-harnesses/eve.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "d479ac15006e6b8f6ed75e1deacf9e6e7550592b2a6f4092f8079a6bee7ed975"
---

# Running eve Agents Durably on Vercel

[eve](/docs/frameworks/agents/eve) is Vercel's framework for durable AI agents. Every eve session already runs as a durable workflow on the [Workflow SDK](https://workflow-sdk.dev) and its Worlds, the same foundation as the other harnesses in these guides. A crash, a function timeout, or a redeploy resumes the session from its last completed step.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Workflow SDK 5: built for production](https://vercel.com/blog/workflow-sdk-5)
- [Choosing between eve, AI SDK agents, and \\`WorkflowAgent\\`](https://vercel.com/kb/guide/eve-vs-ai-sdk-agents-vs-workflowagent) — Compare eve, \\`ToolLoopAgent\\`, and \\`WorkflowAgent\\` by durability, approvals, channels, and setup to choose an agent f
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel) — Deploy an eve agent with Vercel Workflow, Sandbox, Schedules, and project credentials.
- [Introducing eve, an open-source agent framework](https://vercel.com/changelog/introducing-eve-an-open-source-agent-framework)
- [Deployment](https://eve.dev/docs/guides/deployment) — How an eve agent runs in production, and the backends you choose on Vercel or your own infrastructure.
- [Trace and debug eve agent sessions with Vercel Observability](https://vercel.com/changelog/eve-agent-observability)
- [Give your eve agent secure access to your private AWS RDS database](https://vercel.com/kb/guide/give-eve-agent-secure-access-to-aws-rds-database) — Connect an eve agent to a private AWS RDS database using Vercel Secure Compute and VPC peering, with a read-only query t
- [Agent Harnesses You Can Run Durably on Vercel](https://vercel.com/docs/agent-harnesses/harnesses) — Guides for running Pi, fx, OpenCode, eve, Claude Code, and Codex durably on Vercel, so a crash or a timeout resumes the
- [Agent Frameworks on Vercel](https://vercel.com/docs/frameworks/agents) — Build AI agents with eve, Mastra, Flue, and Vercel. Learn how each framework connects to Vercel compute, models, and sto
- [Tools, Files, and Documents in Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/tools) — What tools do when a durable agent harness resumes after a crash, where its files live, and how to keep typed state with
- [Scheduling Work for Agents](https://vercel.com/docs/schedules/agents) — Give an agent a tool that creates dynamic schedules, so it can do work for a user later or on a recurring basis.
- [Observability for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/observability) — See each durable agent session in Vercel Agent Runs, with its turns, model and tool calls, timing, and token usage, and

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

## Frequently asked questions

### Are eve agents durable by default on Vercel?

Yes. On Vercel, each eve session runs on [Vercel Workflows](/docs/workflows), with no extra configuration. eve checkpoints progress between steps, resumes pending work after a crash, a function timeout, or a redeploy, and suspends the session while it waits for approval or user input. You don't add a workflow wrapper or configure a separate database or queue. See [Run durable sessions with Vercel Workflows](/docs/frameworks/agents/eve#run-durable-sessions-with-vercel-workflows).

### Do I need `durable-harness` to run an eve agent durably?

No. `durable-harness` makes other harnesses, such as Pi, OpenCode, Claude Code, and Codex, durable on a Workflow SDK World. eve already runs every session as a durable workflow on the same foundation, so you don't install `durable-harness`, write a queue route, or configure a queue. Create the agent with `npx eve@latest init` and deploy it with `npx eve deploy`.

### Can an eve tool run twice after a crash?

It can. Completed steps reuse their recorded results, but a step that a crash interrupts can execute again. Make tool actions that send emails, create records, or charge customers idempotent, for example by passing the system you call an idempotency key, so a retry doesn't repeat the external action. For work you hand to a [Vercel Daemon](/docs/daemons), make the worker's jobs safe to retry too.

### Do I need a provider API key for an eve agent's model calls?

No. The model string in `agent/agent.ts` routes requests through [AI Gateway](/docs/ai-gateway), and on Vercel eve authenticates with the project's [OIDC token](/docs/oidc). To use API credits from an eligible ChatGPT or Claude subscription, add that organization's key to [AI Gateway Bring Your Own Key (BYOK)](/docs/ai-gateway/authentication-and-byok/byok). Your deployed agent keeps authenticating to AI Gateway with OIDC. See [Use ChatGPT or Claude API credits for your agent](/docs/frameworks/agents/eve#use-chatgpt-or-claude-api-credits-for-your-agent).

### How much does it cost to run an eve agent on Vercel?

eve uses the billing and limits of the Vercel resources your agent consumes. These include [Vercel Functions](/docs/functions/usage-and-pricing) for agent routes and tools, [Vercel Workflows](/docs/workflows/pricing) for durable sessions, [Vercel Sandbox](/docs/sandbox/pricing) for isolated code execution, [AI Gateway](/docs/ai-gateway/pricing) for model calls, and [Tracing](/docs/tracing/configure-tracing#usage-and-pricing) for Agent Runs spans. Use [Agent Runs](/docs/agent-runs) to inspect a representative task's model and tool calls, and set up [Spend Management](/docs/spend-management) for your team.

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
