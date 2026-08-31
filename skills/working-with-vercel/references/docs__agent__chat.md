---
title: Chat
product: vercel
url: /docs/agent/chat
canonical_url: "https://vercel.com/docs/agent/chat"
last_updated: 2026-08-19
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
source: "https://vercel.com/docs/agent/chat.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "bb2f6720a787326102629fe73a3f84ada1d4f5b858557a35e1f30d1eca5eba32"
---

# Chat

> **🔒 Permissions Required**: Vercel Agent Chat

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


---

[View full sitemap](/docs/sitemap)
