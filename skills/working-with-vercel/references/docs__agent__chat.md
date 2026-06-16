---
title: Chat
product: vercel
url: /docs/agent/chat
canonical_url: "https://vercel.com/docs/agent/chat"
last_updated: 2026-05-27
type: conceptual
prerequisites:
  - /docs/agent
related:
  - /docs/git/vercel-for-github
  - /docs/activity-log
  - /docs/audit-log
  - /docs/plans/enterprise
summary: Manage your Vercel infrastructure through conversation with Vercel Agent
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent/chat.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "3afcfd1fddb4681326dc693b834bc34b8528c41b3962179e13e098cea1e421a2"
---

# Chat

> **🔒 Permissions Required**: Vercel Agent Chat

Click **New Chat** in your dashboard to start a conversation. Vercel Agent can answer questions about your projects, help troubleshoot issues, and make configuration changes on your behalf.

The Vercel Agent can only access the data you can access on the currently selected team, including all projects for that team. Vercel Agent cannot access other teams, and their projects, even if you're a member of multiple teams.

## What you can do with Vercel Agent

- Ask questions about deployments, projects, domains, and logs
- Investigate issues across your linked repositories
- Create, update, and delete environment variables
- Trigger deployments, rollbacks, and redeployments
- Configure observability alerts and dashboards
- Create, update, and delete storage resources (Blob, Redis, Edge Config)

### Repository access

The Vercel Agent can read public and private repositories that you have access to and that are linked to Vercel projects. It may read from multiple repositories when investigating issues.

All GitHub write operations require your explicit authorization. This includes creating or updating pull requests, writing comments, and pushing commits. These operations are attributed to you, with commits listing Vercel Agent as a co-author. See [Vercel for GitHub permissions](/docs/git/vercel-for-github#repository-permissions) for details.

## What Vercel Agent can access

When you chat with Vercel Agent, it may access information from your active team, including:

- Your Vercel and GitHub profile information (name, email, username)
- Team memberships and billing details
- Project and deployment configurations
- Runtime and build logs
- Usage metrics and traffic analytics
- Private repositories linked to your Vercel projects

## Authorization

### What requires approval

Breakdown of operations and whether user approval is required to perform them.

| Operation                                                                | Authorization     |
| ------------------------------------------------------------------------ | ----------------- |
| Reads on non-sensitive resources (projects, deployments, logs, domains)  | Auto-approved     |
| Reads on sensitive resources (environment variables, tokens)             | Requires approval |
| All write operations                                                     | Requires approval |

When approval is required, Vercel Agent presents a plan listing the tasks it intends to perform and requests your authorization to proceed. You can review the plan and requested permissions before any action is taken.

Vercel Agent operates within your existing permissions. It cannot approve or execute actions that you don't have permission to perform.

### Permission duration

Authorization is plan-based, not session-based. Each plan represents a discrete unit of work with specific permissions. A new plan requires new authorization, even within the same chat session. Permissions expire when the plan completes or is cancelled.

## Activity attribution

All authorization events and write operations are recorded in your team's [Activity Log](/docs/activity-log). This includes who approved each plan, what tasks were authorized, and when. Enterprise customers can also view these events in the [Audit Log](/docs/audit-log).

Write operations to your Vercel account and projects appear as performed by you "via Vercel Agent."

## Disabling Vercel Agent

Team Owners and Admins can disable Vercel Agent from [Team Settings > Agent](https://vercel.com/d?to=%2Fteams%2F%5Bteam%5D%2Fsettings\&title=Go+to+Settings). Disabling Vercel Agent immediately terminates all ongoing chat sessions, revokes all agent permissions for in-progress tasks, and prevents team members from starting new chats.

To re-enable, return to **Team Settings > Agent** and toggle the setting back on.

## Chat history

Team Owners and Admins can view all chat sessions for their team in the [Agent > Chats](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fvercel-agent\&title=Open+Vercel+Agent) tab. Other members can only view chats they participated in. You can access your chat history from the sidebar dropdown or the Chats tab.

> **💡 Note:** During the beta release, chat transcripts may be reviewed by Vercel staff for Vercel Agent improvement purposes.

## Example prompts

**Debugging and performance**

- "Fix my 500 errors"
- "How do I improve the Core Web Vitals of my site?"
- "Has there been any spikes in TTFB lately?"
- "How's my build performance?"

**Cost and billing**

- "Where can I add caching to reduce my bill?"
- "Why did I get charged more this month compared to last?"
- "Which projects generated the highest Function Duration usage?"

**Traffic and analytics**

- "Are traffic patterns different compared to last week?"
- "What pages are bots interacting with most?"
- "How many workflow runs have we done in the last 3 days?"

**Configuration**

- "Configure bot protection for my project"
- "List environment variables and who created them"
- "What's the best way to deploy an agent to Vercel?"

## Privacy

Chat transcripts may be reviewed by Vercel to improve Vercel Agent, in accordance with Vercel's [Privacy Notice](https://vercel.com/legal/privacy-policy). Vercel does not train on customer source code or chat transcripts if your team's [data preferences setting](https://vercel.fyi/team-data-preferences) is "off" or you are on an [Enterprise plan](/docs/plans/enterprise).


---

[View full sitemap](/docs/sitemap)
