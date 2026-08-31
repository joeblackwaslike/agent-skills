---
title: Dashboard
product: vercel
url: /docs/agent/chat/dashboard
canonical_url: "https://vercel.com/docs/agent/chat/dashboard"
last_updated: 2026-08-19
type: how-to
prerequisites:
  - /docs/agent/chat
  - /docs/agent
related:
  - /docs/agent/chat/permissions
  - /docs/agent/chat/github
  - /docs/agent/chat
  - /docs/agent/pricing
summary: Use Vercel Agent from your Vercel dashboard
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent/chat/dashboard.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "1191aec0d7d319e010a14f91bc88a26a9bfc2a8e71aab05a36da89ec2c31937c"
---

# Dashboard

Vercel Agent can answer questions about your projects, investigate production issues, and take approved actions from the dashboard. Vercel Agent operates within your existing permissions and the currently selected team.

## Start a conversation

1. Select **Agent** in the top-right corner of the dashboard to open the Vercel Agent panel.
2. Enter your request in the **Ask anything…** field.
3. Select **Send message**.
4. To start another conversation, select **New Chat**.

![Image](https://vercel.com/front/docs/agent/dashboard-chat-light.png)

## Provide context and attachments

Vercel Agent uses context from the dashboard page you are viewing to understand your request and provide a relevant response. This context can include the selected team, project, deployment, and information displayed on the page when you send your message.

You can attach up to five files to a message. Each file can be up to 5 MB, and the combined size of all attachments can be up to 10 MB.

Supported attachments include:

- Images
- PDF files
- Text and common code files, including JSON, XML, JavaScript, TypeScript, YAML, TOML, Markdown, CSV, log, and environment files

Images may be optimized before they are sent.

When you paste more than 10,000 characters into the composer, Vercel Agent adds the pasted content as a text-file attachment. Pasted text cannot exceed 5 MB.

> **💡 Note:** Messages and attachments become part of the conversation and may appear in its
> history. Do not include passwords, tokens, private keys, or other credentials.
> Add credentials as project environment variables, then refer to them by
> variable name in your message.

## Approve an action

Vercel Agent is read-only by default. When a request requires sensitive access or a write operation, Vercel Agent presents a plan describing the tasks and requested permissions.

1. Review the tasks and permissions in the plan.
2. Select **Approve** to authorize the plan or **Cancel** to stop it.

Approval applies only to that plan's targets and scopes. A new plan requires new approval, even in the same conversation. See [Vercel Agent permissions](/docs/agent/chat/permissions) for the complete authorization model.

Only the session owner can approve a plan. Other viewers see **Read-only session** and can read the conversation without authorizing the proposed work.

For repository writes, Vercel Agent can create or update a pull request after approval. See [GitHub operations](/docs/agent/chat/github) for requirements and attribution.

## View previous conversations

Open the **New Chat** menu in the Vercel Agent panel, then select a conversation from the history list.

## Enable or disable dashboard chat

> **🔒 Permissions Required**: Managing Vercel Agent chat

Dashboard chat is available to eligible Pro and Enterprise teams. Hobby and Pro trial teams are not eligible.

To change the team setting:

1. Open [**Settings**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fagent%23omniagent\&title=Go+to+Vercel+Agent+Settings) in the dashboard sidebar.
2. Select **Agent**.
3. Turn **Enable Chat** on or off.

Only a team Owner or Billing member can change this setting. Other members can ask one of those roles to enable Vercel Agent.

## Troubleshoot dashboard chat

- **Read-only session**: Only the session owner can send messages or approve a plan. Start your own conversation to work with Vercel Agent.
- **Failed to generate a response**: Send a new message to continue.
- **Failed to load session messages**: Reload the page or reopen the conversation from the **New Chat** menu.
- **Vercel Agent is not enabled**: Ask a team Owner or Billing member to enable it from the team settings.
- **Paid usage is unavailable**: Ask a team Owner or Billing member to enable Vercel Agent billing.

## Related documentation

- [Chat](/docs/agent/chat) explains the capabilities shared by dashboard chat and Slack.
- [Vercel Agent permissions](/docs/agent/chat/permissions) describes plans, approval, and access boundaries.
- [GitHub operations](/docs/agent/chat/github) describes repository access and pull requests.
- [Vercel Agent pricing](/docs/agent/pricing) explains included usage, rates, and cost tracking.
- [Vercel Privacy Notice](https://vercel.com/legal/privacy-policy) explains how Vercel handles personal information.


---

[View full sitemap](/docs/sitemap)
