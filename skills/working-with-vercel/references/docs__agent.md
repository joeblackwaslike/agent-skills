---
title: Vercel Agent
product: vercel
url: /docs/agent
canonical_url: "https://vercel.com/docs/agent"
last_updated: 2026-08-18
type: integration
prerequisites:
  []
related:
  - /docs/agent/pr-review
  - /docs/agent/investigation
  - /docs/agent/installation
  - /docs/agent/chat/permissions
  - /docs/agent/chat/github
summary: Use Vercel Agent to investigate production issues, review code, and take approved actions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent.md"
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "90aedb11ffc7cc1c24f8961d03a3f376617fce28f2bfa74a9276821c6f9f936f"
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
- [Pre-installed Agents](https://v0.app/docs/pre-installed-agents?from=related) — Use pre-installed coding agents like Claude Code directly in the v0 terminal.
- [Integrations for Agents](https://vercel.com/docs/agent-resources/integrations-for-agents?from=related) — Install AI agents and services through the Vercel Marketplace to automate workflows and build custom AI systems.
- [Agent Tools](https://vercel.com/docs/integrations/install-an-integration/agent-tools?from=related) — Use Agent Tools to query, debug, and manage your installed integrations through a chat interface with natural language.
- [Getting Started](https://vercel.com/docs/getting-started-with-vercel?from=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [Agent Resources](https://vercel.com/docs/agent-resources?from=related) — Resources for building with AI on Vercel, including documentation access, MCP servers, and agent skills.
- [Tools](https://vercel.com/docs/agent-resources/vercel-mcp/tools?from=related) — Available tools in Vercel MCP for searching docs, managing teams, projects, deployments, Web Analytics, runtime logs and

Full cross-link map for this page: [/docs/agent.graph.md](/docs/agent.graph.md)
<!-- /docsgraph:related -->

Vercel Agent is an AI assistant built into Vercel. Use it to understand your projects, investigate production issues, review code, and take approved actions.

Vercel Agent uses context from your Vercel projects, deployments, logs, metrics, configuration, usage, and connected repositories. It can use secure sandboxes to reproduce issues, validate generated code, and run checks before suggested changes reach production.

## Availability

Chat in Slack, dashboard chat, Investigations, and Code Review are in public beta for Pro and Enterprise teams.

## Explore Vercel Agent

### Chat

### Code Review

Get Sandbox-validated suggestions on your pull requests. Code Review can identify security vulnerabilities, logic errors, and performance issues, then validate proposed fixes with your builds, tests, and linters.

Learn more in the [Code Review docs](/docs/agent/pr-review).

### Investigations

Use Vercel Agent Investigations to analyze anomaly alerts, failed deployments, runtime errors, and cost or performance issues. Vercel Agent queries relevant logs and metrics, identifies possible causes, and summarizes its findings.

Learn more in the [Investigation docs](/docs/agent/investigation).

### Installation

Use Vercel Agent Installation to add supported Vercel products to a GitHub-connected project. Vercel Agent analyzes your repository, installs dependencies, writes integration code, and opens a pull request for your review.

Learn more in the [Installation docs](/docs/agent/installation).

## Approved actions

Vercel Agent is read-only by default. When a task requires write access, it presents a scoped plan and waits for your approval. With your approval, Vercel Agent can make changes directly or open a pull request, depending on the task.

Learn more about [Vercel Agent Permissions](/docs/agent/chat/permissions) and [GitHub Operations](/docs/agent/chat/github).

## Get started

Select **Agent** in the top-right corner of the dashboard to start a dashboard chat conversation or configure other Vercel Agent capabilities:

- [Dashboard chat](/docs/agent/chat/dashboard): Ask questions and investigate issues from your dashboard.
- [Slack](/docs/agent/chat/slack): Work with Vercel Agent from a supported Slack conversation.
- [Code Review](/docs/agent/pr-review#how-to-set-up-code-review): Configure automatic pull request reviews.
- [Investigations](/docs/agent/investigation#enable-vercel-agent-investigations): Enable automatic alert investigations.
- [Installation](/docs/agent/installation#getting-started): Install supported Vercel products through a pull request.

## Pricing and privacy

Vercel Agent charges for paid work based on the tokens used. See [Vercel Agent pricing](/docs/agent/pricing) for included usage, rates, and cost tracking.

For information about data access, staff review, product improvement, retention, and deletion, see the [Chat](/docs/agent/chat), [Vercel Agent Permissions](/docs/agent/chat/permissions), and [Privacy Notice](/legal/privacy-policy) documentation.


---

[View full sitemap](/docs/sitemap)
