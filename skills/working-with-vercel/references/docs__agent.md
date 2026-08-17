---
title: Vercel Agent
product: vercel
url: /docs/agent
canonical_url: "https://vercel.com/docs/agent"
last_updated: 2026-06-30
type: conceptual
prerequisites:
  []
related:
  - /docs/agent/pr-review
  - /docs/agent/investigation
  - /docs/analytics
  - /docs/speed-insights
  - /docs/agent/installation
summary: Use Vercel Agent to chat with your dashboard, investigate production issues, review code, and approve actions
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "d7be0a5bf605c43909a06b7145c209f5ab2bb89c54de70730e6b79826c0d3bcb"
---

# Vercel Agent

> **🔒 Permissions Required**: Vercel Agent


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Agent](https://vercel.com/kb/guide/vercel-agent?from=related) — Learn what Vercel Agent does, how to set up Code Review, Investigation, Chat, and Installation, and what each feature co
- [Using Vercel Agent to review pull requests](https://vercel.com/kb/guide/vercel-agent-code-review?from=related) — Set up Vercel Agent Code Review to automatically review pull requests, apply validated fixes, request reviews with @verc
- [Vercel vs Akamai](https://vercel.com/kb/guide/vercel-vs-akamai?from=related) — A detailed guide to Vercel vs Akamai: compute models, AI infrastructure, framework support, media streaming, CDN capabil
- [Vercel vs Fastly](https://vercel.com/kb/guide/vercel-vs-fastly?from=related) — A detailed guide to Vercel vs Fastly: full-stack application platform vs edge infrastructure layer, covering framework s
- [Vercel vs Netlify](https://vercel.com/kb/guide/vercel-vs-netlify?from=related) — A detailed guide to Vercel vs Netlify: runtimes, compute architecture, AI infrastructure, security, and when to choose e
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel?from=related) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [Integrations for Agents](https://vercel.com/docs/agent-resources/integrations-for-agents?from=related) — Install AI agents and services through the Vercel Marketplace to automate workflows and build custom AI systems.
- [Agent Tools](https://vercel.com/docs/integrations/install-an-integration/agent-tools?from=related) — Use Agent Tools to query, debug, and manage your installed integrations through a chat interface with natural language.
- [Getting Started](https://vercel.com/docs/getting-started-with-vercel?from=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [Agent Resources](https://vercel.com/docs/agent-resources?from=related) — Resources for building with AI on Vercel, including documentation access, MCP servers, and agent skills.
- [Tools](https://vercel.com/docs/agent-resources/vercel-mcp/tools?from=related) — Available tools in Vercel MCP for searching docs, managing teams, projects, deployments, Web Analytics, runtime logs and

Full cross-link map for this page: [/docs/agent.graph.md](/docs/agent.graph.md)
<!-- /docsgraph:related -->

Vercel Agent lives in your dashboard and can investigate what's happening in production, answer questions about your projects, and take action on your behalf.

Because Agent is built into Vercel's platform that deploys and serves your app, it can read the signals around it: deployments, logs, metrics, project configuration, usage, and connected repositories. That context is what turns a question into an answer and a problem into a fix.

Vercel Agent runs on [Vercel's AI Cloud](https://vercel.com/ai). It can use secure sandboxes to reproduce issues, validate generated code, and run checks before suggested changes reach production.

## Availability

Dashboard chat, investigations, and approved actions are in public beta for Pro and Enterprise teams. Rollout will be gradual. If you don't have access yet, you can [request access](/products/early-access).

## Features

### Code Review

Get automatic code reviews on every pull request. Code Review gives you Sandbox-validated suggestions on your pull requests as one capability within the broader Vercel Agent.

What it does:

- Performs multi-step reasoning to identify security vulnerabilities, logic errors, and performance issues
- Generates patches and runs them in secure sandboxes with your real builds, tests, and linters
- Only suggests fixes that pass validation checks, allowing you to apply specific code changes with one click

You can also mention `@vercel` in any pull request comment. The agent will read your message and either propose a fix for you to review and apply, or respond directly to your question in the same thread.

Learn more in the [Code Review docs](/docs/agent/pr-review).

### Investigation

When anomaly alerts fire, Vercel Agent Investigations can analyze what is happening in production. Point Agent at a failed deploy, a runtime error, or a cost spike, and it traces the cause and recommends a fix.

What it does:

- Queries logs and metrics around the time of the alert
- Looks for patterns and correlations that might explain the problem
- Provides insights about potential root causes

Learn more in the [Agent Investigation docs](/docs/agent/investigation).

### Approved actions

When a task requires write access, Vercel Agent presents a scoped plan and waits for your approval. With your sign-off, Agent can open a pull request, roll back, or update a config to remediate an issue.

Agent is read-only by default and cannot make changes until you approve the plan.

### Installation

Add [Web Analytics](/docs/analytics) and [Speed Insights](/docs/speed-insights) to your project using Vercel Agent. Instead of manually installing and writing integration code, Vercel Agent analyzes your repository, installs dependencies, writes integration code, and creates a pull request. All you need to do is review and merge.

Learn more in the [Agent Installation docs](/docs/agent/installation).

## Control and permissions

Vercel Agent runs under its own identity and is bounded by the requesting user's permissions. It is read-only by default.

When Agent needs elevated access, it requests a scoped plan and makes no changes until you approve it. Generated code runs in Vercel Sandbox before it reaches production, and elevated actions are attributed to Agent, the requester, and the approver.

## Getting started

You can enable Vercel Agent in the [Agent section in the sidebar](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fvercel-agent\&title=Open+Vercel+Agent) of your dashboard. Setup varies by feature:

- **Code Review**: You'll need to configure which repositories to review and whether to review draft PRs. See [Code Review setup](/docs/agent/pr-review#how-to-set-up-code-review) for details.
- **Agent Investigation**: This requires [Observability Plus](/docs/observability/observability-plus) and in order to run investigations automatically, you'll need to enable Vercel Agent Investigations. See [Investigation setup](/docs/agent/investigation#how-to-enable-agent-investigation) to get started.
- **Installation**: See [Installation docs](/docs/agent/installation#getting-started) for details.

## Pricing

Vercel Agent uses a credit-based system. Each review or investigation costs a fixed $0.30 USD plus token costs billed at the Agent's underlying AI provider's rate, with no additional markup. Agent Installation is free for all teams.

You can [purchase credits and enable auto-reload](/docs/agent/pricing#adding-credits) in the Agent section in the sidebar of your dashboard. For complete pricing details, credit management, and cost tracking information, see [Vercel Agent Pricing](/docs/agent/pricing).

## Privacy

Vercel Agent never trains on customer code if your Vercel team's [data preferences setting](https://vercel.fyi/team-data-preferences) is "off" or you are on an [Enterprise plan](/docs/plans/enterprise).


---

[View full sitemap](/docs/sitemap)
