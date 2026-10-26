---
title: Vercel Agent
product: vercel
url: /docs/agent
canonical_url: "https://vercel.com/docs/agent"
last_updated: 2026-09-18
type: integration
prerequisites:
  []
related:
  - /docs/agent/private-dependencies
  - /docs/agent/chat/dashboard
  - /docs/agent/chat/slack
  - /docs/agent/chat
  - /docs/agent/pr-review
summary: Use Vercel Agent to investigate production issues, review code, and take approved actions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "aa11babea0eeb089e7a78ca4880397162679ce2c2d3879aadc43ea58dc542f45"
---

# Vercel Agent

> Vercel Agent is available in Public Beta on Enterprise and Pro plans

Vercel Agent is an AI assistant built into Vercel. Use it to understand your projects, investigate production issues, review code, and take approved actions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [An expanded Vercel Agent: chat, investigations, and approved actions, now in public beta](https://vercel.com/changelog/an-expanded-vercel-agent-chat-investigations-and-approved-actions-now-in-public-beta)
- [Apply code suggestions from Vercel Agent with one click](https://vercel.com/changelog/apply-code-suggestions-from-vercel-agent-with-one-click)
- [Automatic build fix suggestions with Vercel Agent](https://vercel.com/changelog/automatic-build-fix-suggestions-with-vercel-agent)
- [Native Deployment Checks are now available](https://vercel.com/changelog/native-deployment-checks)
- [On-demand Vercel Agent code reviews](https://vercel.com/changelog/on-demand-vercel-agent-code-reviews)
- [Using Vercel Agent to review pull requests](https://vercel.com/kb/guide/vercel-agent-code-review) — Set up Vercel Agent Code Review to automatically review pull requests, apply validated fixes, request reviews with @verc
- [Vercel vs Akamai](https://vercel.com/kb/guide/vercel-vs-akamai) — A detailed guide to Vercel vs Akamai: compute models, AI infrastructure, framework support, media streaming, CDN capabil
- [Vercel vs Fastly](https://vercel.com/kb/guide/vercel-vs-fastly) — A detailed guide to Vercel vs Fastly: full-stack application platform vs CDN infrastructure layer, covering framework su
- [Vercel vs Netlify](https://vercel.com/kb/guide/vercel-vs-netlify) — A detailed guide to Vercel vs Netlify: runtimes, compute architecture, AI infrastructure, security, and when to choose e
- [Vercel vs Northflank](https://vercel.com/kb/guide/vercel-vs-northflank) — A detailed guide to Vercel vs Northflank: Fluid compute, CDN and caching, container image functions, security defaults,
- [Build with AI agents on Vercel](https://vercel.com/docs/agent-resources/integrations-for-agents) — Install AI agents and services through the Vercel Marketplace to automate workflows and build custom AI systems.
- [Glossary](https://vercel.com/docs/glossary) — Learn about the terms and concepts used in Vercel's products and documentation.

Full cross-link map for this page: [/docs/agent.graph.md](/docs/agent.graph.md)
<!-- /docsgraph:related -->

Vercel Agent uses context from your Vercel projects, deployments, logs, metrics, configuration, usage, and connected repositories. It can use secure sandboxes to reproduce issues, validate generated code, and run checks before suggested changes reach production.

For repositories with private npm packages, [configure shared registry credentials](/docs/agent/private-dependencies) so Vercel Agent can install dependencies during these workflows.

## Availability

Chat in Slack, dashboard chat, Investigations, and Code Review are in public beta for Pro and Enterprise teams.

## Explore Vercel Agent

### Chat

Ask questions about your projects, investigate what is happening in production, and take approved actions. Use chat from the [dashboard](/docs/agent/chat/dashboard) or [Slack](/docs/agent/chat/slack).

Learn more in the [Chat overview](/docs/agent/chat).

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
