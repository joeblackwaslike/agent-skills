---
title: Slack
product: vercel
url: /docs/agent/chat/slack
canonical_url: "https://vercel.com/docs/agent/chat/slack"
last_updated: 2026-08-20
type: conceptual
prerequisites:
  - /docs/agent/chat
  - /docs/agent
related:
  - /docs/plans/pro
  - /docs/plans/enterprise
  - /docs/agent/pricing
  - /docs/agent/chat/dashboard
  - /docs/agent/chat/permissions
summary: Use Vercel Agent in Slack by mentioning @Vercel in a supported channel or thread
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent/chat/slack.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "5e4a545a2cad78d7de5ec9e909b4af94daa1fa579ad25024554e0d87deef26bf"
---

# Slack

> **🔒 Permissions Required**: Vercel Agent in Slack

Mention `@Vercel` in a Slack channel or thread to investigate deployments, review pull requests, or turn a discussion into code changes and open a pull request after you approve the proposed work. Vercel Agent uses the surrounding discussion to understand your request and provide relevant context.

Vercel Agent in Slack is available in beta on [Pro](/docs/plans/pro) and [Enterprise](/docs/plans/enterprise) plans. See [Vercel Agent pricing](/docs/agent/pricing) for details.

## Getting started

### Install the Slack integration

To use Vercel Agent in Slack, first install the integration:

1. Open the [Vercel app in the Slack Marketplace](https://slack.com/marketplace/A024HTHQZ47-vercel).
2. Click **Connect Account**.
3. Choose the Slack workspace to connect.
4. Click **Allow**.

After installation, you can mention `@Vercel` in any channel or thread the app has been added to. Vercel Agent does not respond in externally shared (Slack Connect) channels, even if the app is otherwise installed in the workspace.

### Sign in with Vercel

Working in Slack requires that Vercel Agent knows which Vercel user is making the request, so it can operate within your permissions.

When you first mention `@Vercel`, if Vercel Agent needs to identify you, it presents **Sign in with Vercel**. You complete Vercel login and OAuth consent, return to Slack, and the request that was waiting resumes automatically.

> **💡 Note:** Sign in with Vercel is managed through Vercel Connect. To sign out, send `@Vercel signout` in Slack.

## Using Vercel Agent in Slack

### How to interact with Vercel Agent

To start a request, send a new message that mentions `@Vercel`. The thread you're in informs what Vercel Agent does, so a conversation about an incident or a pull request can turn directly into investigation and a fix.

> **💡 Note:** If you edit an existing message to add an `@Vercel` mention, it does not start a request. Send a new message with the mention instead.

### Thread context and team scoping

Vercel Agent reads the context of the Slack thread it's mentioned in. A discussion about a failing deploy, a customer report, or a pull request gives Vercel Agent the background it needs, so you can move from conversation to investigation and a fix within the same thread.

Slack thread context can include messages from multiple people. Vercel Agent treats those messages as context, not authorization. Only the person who started the request or another member of the selected Vercel team can approve a plan for sensitive reads or writes.

**Team selection rules:**

- A Slack workspace can be connected to multiple Vercel teams.
- Each Slack thread is scoped to one Vercel team for its lifetime.
- You cannot switch the team for an existing thread.
- In channel threads, the ephemeral team selector sets which team new threads use by default — it does not change the team for the thread you're already in.
- In direct messages, selecting a team switches the current conversation immediately.
- When starting a new thread, name an eligible Vercel team in your first message to route the session to that team. If the team name is ambiguous or cannot be matched, use the team selector instead.
- Do not ask Vercel Agent to switch teams mid-conversation.

### What you can do

In Slack, Vercel Agent supports the same scenarios as the dashboard, informed by the surrounding thread context:

- Investigate deployments and logs.
- Manage and review pull requests.
- Take approved actions on your behalf.
- Ask about build or incident status.
- Turn a team thread into an implementation and a pull request.
- Review a pull request in the thread.
- Fix failing CI.
- Query code paths.
- Diagnose a slow route using function durations, external API latency, and Core Web Vitals, then open a tested pull request.

### Example prompts

Mention `@Vercel` to start a request:

**Review a pull request**

- "@Vercel, review github.com/vercel/agents/pull/2727"

**Investigate a regression**

- "@Vercel, why did p75 on /api/checkout jump after yesterday's deploy?"
- In the same thread, follow up: "Add a test and open a PR."

## Slack Code

Vercel Agent integrates with [Slack Code](https://slack.com/features/code-channels), a new type of Slack channel for focused, collaborative work. Slack Code lets you create Code Channels that give each task its own shared Vercel Agent session for follow-up requests, status updates, and code review.

To create a Code Channel, just mention `@Vercel` with a request and ask it to create a Code Channel.

Alternatively, you can create one manually:

1. In the Slack sidebar, find **Code channels**.
2. Select **More actions**, then **Create a code channel**.
3. Select **Vercel** as the agent.

The originating conversation shows a card linking to the Code Channel. Vercel Agent starts a new session with relevant context from the conversation.

## Authorization and permissions

Vercel Agent in Slack uses the same authorization model as [Dashboard chat](/docs/agent/chat/dashboard). It operates within your existing permissions and asks for approval before it reads sensitive resources or performs any write.

### Authorization model

Vercel Agent accesses only data you can access on the currently selected team. See [Vercel Agent permissions](/docs/agent/chat/permissions) for the complete model.

| Operation                                                      | Authorization |
| -------------------------------------------------------------- | ------------- |
| Reads on non-sensitive resources (projects, deployments, logs, domains) | Auto-approved |
| Reads on sensitive resources (environment variables, tokens)   | Requires approval |
| All write operations                                           | Requires approval |

### Approval process

Before performing sensitive reads or any write, Vercel Agent presents a plan listing the tasks it intends to perform and the permissions it requests. You review the plan and the requested permissions before any action is taken.

- Approval requests expire. If you do not approve or cancel a plan before it expires, Vercel Agent cancels the plan and posts a timeout message.
- You can approve or cancel a plan only once. After a decision is made, its approval controls are disabled.
- When Vercel Agent resumes an approved plan, it uses the exact approved plan and any in-scope steering from the verified approver.
- A reply that broadens the target, operation, required scope, or risk starts a new approval flow.
- Vercel Agent does not execute a follow-up that changes an approved plan's target, operation, scopes, or risk. It proposes a replacement plan for approval instead.

### GitHub operations

GitHub write operations require explicit authorization. Commits and pull requests are created and signed by the Vercel Agent GitHub App, with you added as a git co-author. For the permissions that back these operations, see [repository permissions](/docs/git/vercel-for-github#repository-permissions).

## Troubleshooting

### Signing out

Use either `@Vercel signout` or `@Vercel logout` to revoke your Vercel authorization for the Slack workspace. If you were not signed in, Vercel Agent tells you that no authorization was active.

### Common issues

**Authorization expiration**: If the Slack connection needs authorization, Vercel Agent starts Sign in with Vercel and resumes the waiting request after you finish. To authorize again after access expires, start a new mention and complete the flow.

**Missing scope**: If Slack reports a missing scope, Vercel Agent clears the thread status and posts a prompt to reinstall the app.

**Revoked token**: If Slack reports a revoked token, Vercel Agent can no longer post to Slack at all; reinstall the integration from the Vercel dashboard, then send a new mention.

**Interrupting work**: You can interrupt Vercel Agent at any time by sending `@Vercel stop`. Send a new mention to start a new request.

### Response behavior

- Vercel Agent posts a working status while a request runs and keeps Slack responses concise.
- Long results may be split across multiple Slack messages.
- After the response finishes, Vercel Agent may post additional items, such as charts, log tables, or a pull request diff view, as separate messages in the thread.
- If a request fails before a result is posted, retry with a new mention after fixing the reported authorization or integration issue.

### Security notes

- Keep tokens, passwords, and private keys out of Slack threads.
- Do not paste replacement Slack or Vercel credentials into the thread.

## Related

- [Dashboard chat](/docs/agent/chat/dashboard) runs the same Vercel Agent in the Vercel dashboard, with the full authorization model.
- [Repository permissions for Vercel for GitHub](/docs/git/vercel-for-github#repository-permissions) covers the GitHub permissions behind attributed write operations.


---

[View full sitemap](/docs/sitemap)
