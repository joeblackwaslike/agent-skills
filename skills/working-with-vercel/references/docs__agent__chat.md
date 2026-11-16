---
title: Chat
product: vercel
url: /docs/agent/chat
canonical_url: "https://vercel.com/docs/agent/chat"
last_updated: 2026-09-18
type: conceptual
prerequisites:
  - /docs/agent
related:
  - /docs/agent/chat/dashboard
  - /docs/agent/chat/slack
  - /docs/agent/chat/permissions
  - /docs/agent
summary: Use Vercel Agent from your dashboard or Slack
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent/chat.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "fe1a94eb64d3fa65cf915cc1998200690f63d836513531f059398187d811d6d4"
---

# Chat

> Vercel Agent Chat is available in Public Beta on Enterprise and Pro plans

Use Vercel Agent to ask questions, investigate production issues, and take action on your behalf. You can use the same Vercel Agent from the Vercel dashboard or from Slack.

## Choose where to chat

- [Dashboard](/docs/agent/chat/dashboard): Start a private session with project and dashboard context. You can review session history, attach files, and approve plans in the dashboard.
- [Slack](/docs/agent/chat/slack): Mention `@Vercel` in a supported Slack conversation to work with Vercel Agent in the context of your team's discussion.

Both surfaces use the same team-scoped authorization model. Vercel Agent operates within your existing permissions and asks for approval before it reads sensitive resources or performs a write. See [Vercel Agent permissions](/docs/agent/chat/permissions) for details.

## What Vercel Agent can do

Vercel Agent can answer questions about your projects, investigate deployments and production behavior, and propose or perform approved actions. The available capabilities depend on your team, project, permissions, and feature rollout.

- Ask questions grounded in your project and deployment data
- Investigate failed deployments, runtime errors, and cost or performance issues
- Read linked repositories and pull requests
- Propose changes for your approval

The two chat surfaces have different context and interaction behavior. Read the documentation for the surface you plan to use before sharing sensitive information or approving a plan.

## Data and privacy

Chat requests can include conversation context, project and team data, and files you attach. Dashboard chat can also include the current dashboard page context when that feature is enabled. Slack requests can include relevant messages from the Slack thread.

For information about stored content, staff review, product improvement, retention, and deletion, see the [Vercel Agent privacy and data-use guidance](/docs/agent#pricing-and-privacy).

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
