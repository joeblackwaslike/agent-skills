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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "9f760218e4c4efa23f5c9586d30cd978c7ea04f54a270aa119f4569c9e6f9052"
---

# Vercel Agent

> Vercel Agent is available in Public Beta on Enterprise and Pro plans

Vercel Agent is an AI assistant built into Vercel. Use it to understand your projects, investigate production issues, review code, and take approved actions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [An expanded Vercel Agent: chat, investigations, and approved actions, now in public beta](https://vercel.com/changelog/an-expanded-vercel-agent-chat-investigations-and-approved-actions-now-in-public-beta)
- [Introducing the new Vercel Agent](https://vercel.com/blog/vercel-agent)
- [Apply code suggestions from Vercel Agent with one click](https://vercel.com/changelog/apply-code-suggestions-from-vercel-agent-with-one-click)
- [Automatic build fix suggestions with Vercel Agent](https://vercel.com/changelog/automatic-build-fix-suggestions-with-vercel-agent)
- [Native Deployment Checks are now available](https://vercel.com/changelog/native-deployment-checks)
- [On-demand Vercel Agent code reviews](https://vercel.com/changelog/on-demand-vercel-agent-code-reviews)
- [Vercel vs Akamai](https://vercel.com/kb/guide/vercel-vs-akamai) — A detailed guide to Vercel vs Akamai: compute models, AI infrastructure, framework support, media streaming, CDN capabil
- [Vercel vs Fastly](https://vercel.com/kb/guide/vercel-vs-fastly) — A detailed guide to Vercel vs Fastly: full-stack application platform vs CDN infrastructure layer, covering framework su
- [Vercel vs Netlify](https://vercel.com/kb/guide/vercel-vs-netlify) — A detailed guide to Vercel vs Netlify: runtimes, compute architecture, AI infrastructure, security, and when to choose e
- [Vercel vs Northflank](https://vercel.com/kb/guide/vercel-vs-northflank) — A detailed guide to Vercel vs Northflank: Fluid compute, CDN and caching, container image functions, security defaults,
- [Vercel vs Railway](https://vercel.com/kb/guide/vercel-vs-railway) — A detailed guide to Vercel vs Railway: serverless vs always-on containers, container images from a Dockerfile, framework
- [Introducing Vercel Security Review](https://vercel.com/blog/vercel-security-review)

Full cross-link map for this page: [/docs/agent.graph.md](/docs/agent.graph.md)
<!-- /docsgraph:related -->

Vercel Agent uses context from your Vercel projects, deployments, logs, metrics, configuration, usage, and connected repositories. It can use secure sandboxes to reproduce issues, validate generated code, and run checks before suggested changes reach production.

For repositories with private npm packages, [configure shared registry credentials](/docs/agent/private-dependencies) so Vercel Agent can install dependencies during these workflows.

## Availability

Chat in Slack, dashboard chat, Investigations, Code Review, and Security Review are in public beta for Pro and Enterprise teams.

## Explore Vercel Agent

### Chat

Ask questions about your projects, investigate what is happening in production, and take approved actions. Use chat from the [dashboard](/docs/agent/chat/dashboard) or [Slack](/docs/agent/chat/slack).

Learn more in the [Chat overview](/docs/agent/chat).

### Code Review

Get Sandbox-validated suggestions on your pull requests. Code Review can identify security vulnerabilities, logic errors, and performance issues, then validate proposed fixes with your builds, tests, and linters.

Learn more in the [Code Review docs](/docs/agent/pr-review).

### Security Review

Scan your code for security vulnerabilities and track what it finds in the Vulnerabilities dashboard. Because Security Review starts from push events rather than pull requests, it also covers direct pushes and force pushes to your production branch.

Learn more in the [Security Review docs](/docs/agent/security-review).

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
