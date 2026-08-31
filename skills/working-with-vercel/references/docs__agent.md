---
title: Vercel Agent
product: vercel
url: /docs/agent
canonical_url: "https://vercel.com/docs/agent"
last_updated: 2026-08-19
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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "6ca4a85eb5f202cdead79d3ba99650ef92d495b71dd14a6a99ea7f419aab31cb"
---

# Vercel Agent

> **🔒 Permissions Required**: Vercel Agent


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Agent](https://vercel.com/kb/guide/vercel-agent?from=related&source_path=%2Fdocs%2Fagent&source_site=vercel-docs&relationship=related) — Learn what Vercel Agent does, how to set up Code Review, Investigation, Chat, and Installation, and what each feature co
- [An expanded Vercel Agent: chat, investigations, and approved actions, now in public beta](https://vercel.com/changelog/an-expanded-vercel-agent-chat-investigations-and-approved-actions-now-in-public-beta?from=related&source_path=%2Fdocs%2Fagent&source_site=vercel-docs&relationship=related)
- [Apply code suggestions from Vercel Agent with one click](https://vercel.com/changelog/apply-code-suggestions-from-vercel-agent-with-one-click?from=related&source_path=%2Fdocs%2Fagent&source_site=vercel-docs&relationship=related)
- [Automatic build fix suggestions with Vercel Agent](https://vercel.com/changelog/automatic-build-fix-suggestions-with-vercel-agent?from=related&source_path=%2Fdocs%2Fagent&source_site=vercel-docs&relationship=related)
- [Native Deployment Checks are now available](https://vercel.com/changelog/native-deployment-checks?from=related&source_path=%2Fdocs%2Fagent&source_site=vercel-docs&relationship=related)
- [On-demand Vercel Agent code reviews](https://vercel.com/changelog/on-demand-vercel-agent-code-reviews?from=related&source_path=%2Fdocs%2Fagent&source_site=vercel-docs&relationship=related)
- [Vercel vs Akamai](https://vercel.com/kb/guide/vercel-vs-akamai?from=related&source_path=%2Fdocs%2Fagent&source_site=vercel-docs&relationship=related) — A detailed guide to Vercel vs Akamai: compute models, AI infrastructure, framework support, media streaming, CDN capabil
- [Vercel vs Fastly](https://vercel.com/kb/guide/vercel-vs-fastly?from=related&source_path=%2Fdocs%2Fagent&source_site=vercel-docs&relationship=related) — A detailed guide to Vercel vs Fastly: full-stack application platform vs edge infrastructure layer, covering framework s
- [Vercel vs Netlify](https://vercel.com/kb/guide/vercel-vs-netlify?from=related&source_path=%2Fdocs%2Fagent&source_site=vercel-docs&relationship=related) — A detailed guide to Vercel vs Netlify: runtimes, compute architecture, AI infrastructure, security, and when to choose e
- [Vercel vs Northflank](https://vercel.com/kb/guide/vercel-vs-northflank?from=related&source_path=%2Fdocs%2Fagent&source_site=vercel-docs&relationship=related) — A detailed guide to Vercel vs Northflank: Fluid compute, CDN and caching, security defaults, AI infrastructure, GPU comp
- [Introducing Vercel for Slack](https://vercel.com/blog/introducing-vercel-for-slack?from=related&source_path=%2Fdocs%2Fagent&source_site=vercel-docs&relationship=related)
- [Build with AI agents on Vercel](https://vercel.com/docs/agent-resources/integrations-for-agents?from=related&source_path=%2Fdocs%2Fagent&source_site=vercel-docs&relationship=related) — Install AI agents and services through the Vercel Marketplace to automate workflows and build custom AI systems.

Full cross-link map for this page: [/docs/agent.graph.md](/docs/agent.graph.md?from=related&source_path=%2Fdocs%2Fagent&source_site=vercel-docs&relationship=graph)
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
