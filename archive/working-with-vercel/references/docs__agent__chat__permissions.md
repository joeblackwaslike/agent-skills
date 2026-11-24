---
title: Vercel Agent Permissions
product: vercel
url: /docs/agent/chat/permissions
canonical_url: "https://vercel.com/docs/agent/chat/permissions"
last_updated: 2026-09-18
type: reference
prerequisites:
  - /docs/agent/chat
  - /docs/agent
related:
  - /docs/agent/private-dependencies
  - /docs/activity-log
  - /docs/agent/chat/github
summary: Understand how Vercel Agent scopes access, requests approval, and attributes changes.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent/chat/permissions.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "f860ed28f49052a2f1e199ae85286cadd6b9b27bca7b179473c1548bb8994951"
---

# Vercel Agent Permissions

> Vercel Agent is available in Public Beta on Enterprise and Pro plans

Vercel Agent uses your existing Vercel permissions. For GitHub, it uses the Vercel GitHub App installation's access to repositories linked to projects in the selected team, not your own GitHub repository role. It limits each request to the selected team and project context. Vercel Agent is read-only by default.

## Authorization levels

| Operation | Authorization | Examples |
| --- | --- | --- |
| Read Vercel data | Auto-approved | Projects, deployments, domains, logs, metrics, traffic data, and environment variables |
| Read data that no read scope covers | Plan approval | Reads that need a `read-write:*`, `use:*`, or `manage:*` scope |
| Change Vercel resources | Plan approval | Updating configuration, environment variables, alerts, storage, or deployments |
| Change GitHub resources | No plan approval | Creating, updating, or closing a pull request |
| Local sandbox work | Depends on the plan | Reading, editing, and running commands in the session workspace |

Reading a repository linked to an accessible project, including a private repository, needs no plan approval. Installing [private npm dependencies](/docs/agent/private-dependencies) also needs no plan: Vercel Agent uses your Vercel access to fetch the team's configured registry credentials. Vercel Agent is designed to create or update a pull request only when you ask for a fix or a pull request, or accept its offer to open one. When Vercel Agent opens a protected preview deployment in its browser, it can create a temporary share link without a plan. It revokes the link when it finishes. If revocation fails, the link expires 15 minutes after creation. Other Vercel changes require plan approval.

The exact operation and resource are shown in the plan before Vercel Agent requests approval. If a request needs more access than the active plan allows, Vercel Agent stops and asks for a new plan.

## Plans and approvals

A plan is a discrete unit of work. It lists the tasks Vercel Agent intends to perform and the scopes each task requires.

- A simple read-only request may run without a plan approval step.
- A multi-step request can show a plan even when it needs no elevated scope.
- A plan that requires elevated access pauses until an authorized user approves or rejects it.
- Approval applies only to the listed targets, operations, scopes, and risk.
- A new plan requires new approval. Approval does not grant a session-wide permission.
- Rejecting or cancelling a plan prevents the planned writes from running.
- Vercel Agent does not expand an approved plan when a follow-up changes the target or operation. It proposes a replacement plan instead.

Permissions expire when the plan completes or is cancelled. Vercel records Vercel Agent events in the team's [Activity Log](/docs/activity-log) when a session starts, when a plan requests elevated permissions, and when you approve a plan in the dashboard. The session and approval events name the user. The permission request event is recorded as a system event.

## Team and project scope

Vercel Agent only accesses the team you currently have selected. To work with another team, switch to that team. In Slack, selecting another team applies only to new threads and does not change the team for an existing thread. For project operations, select the project explicitly when the request could apply to more than one project.

GitHub repository operations require the repository to be linked to an accessible Vercel project in the selected team. Cloning a public repository is the only exception. See [GitHub operations](/docs/agent/chat/github) for repository-specific requirements.

## Sensitive data

Vercel Agent must not repeat secrets in its response, even when it can read them. It refers to credentials by their variable or resource name instead. Do not paste tokens, passwords, or private keys into a prompt or Slack thread.

## Writes and attribution

Vercel Agent can either change a Vercel resource directly or prepare a GitHub pull request, depending on the operation. For a Vercel change, the plan is designed to identify the intended destination before execution.

GitHub writes do not require plan approval. They require the GitHub App installation to grant Contents and Pull requests write access. Vercel writes are attributed to you via Vercel Agent. The Vercel Agent GitHub App creates each GitHub commit, and GitHub signs it. When you have connected GitHub as a Vercel login connection, Vercel Agent tries to add you as a git co-author and to open the pull request as you. If the co-author step fails, Vercel Agent publishes the commit without adding you as a co-author. If it can't open the pull request as you, it tries to open it with the Vercel Agent GitHub App instead, and if that also fails, the published branch can remain without a pull request.

## When an operation is unavailable

Vercel Agent can refuse an operation when:

- You do not have permission to access the selected team or project.
- The Vercel GitHub App installation cannot access the repository or has not accepted a required permission.
- The project does not link to the requested GitHub repository.
- The requested resource is outside the active plan.
- The operation is not supported by scoped authorization.
- The team or feature is not eligible for Vercel Agent.

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
