---
title: Vercel Agent Permissions
product: vercel
url: /docs/agent/chat/permissions
canonical_url: "https://vercel.com/docs/agent/chat/permissions"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent/chat
  - /docs/agent
related:
  - /docs/agent/chat/github
summary: Understand how Vercel Agent scopes access, requests approval, and attributes changes.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent/chat/permissions.md"
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "44a638dd0f88025b2ecb65e90deacfa7d7eb83fbc673ce7478c0888383e7b01f"
---

# Vercel Agent Permissions

> **🔒 Permissions Required**: Vercel Agent

Vercel Agent uses your existing Vercel and GitHub permissions. It limits each request to the selected team and project context. Vercel Agent is read-only by default.

## Authorization levels

| Operation | Authorization | Examples |
| --- | --- | --- |
| Read non-sensitive Vercel data | Auto-approved | Projects, deployments, domains, logs, metrics, and traffic data |
| Read sensitive data | Plan approval | Environment variables, tokens, credentials, or private repository data |
| Change Vercel resources | Plan approval | Updating configuration, environment variables, alerts, storage, or deployments |
| Change GitHub resources | Plan approval | Creating a pull request, updating a Vercel Agent-owned pull request, or writing a review comment |
| Local sandbox work | Depends on the plan | Reading, editing, and running commands in the session workspace |

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

Permissions expire when the plan completes or is cancelled. All authorization and write events are attributed to the requesting user and recorded in the team's activity history.

## Team and project scope

Vercel Agent only accesses the team you currently have selected. To work with another team, switch to that team. In Slack, selecting another team applies only to new threads and does not change the team for an existing thread. For project operations, select the project explicitly when the request could apply to more than one project.

GitHub repository operations require the repository to be linked to an accessible Vercel project in the selected team. See [GitHub operations](/docs/agent/chat/github) for repository-specific requirements.

## Sensitive data

Vercel Agent must not repeat secrets in its response, even when it can read them. It refers to credentials by their variable or resource name instead. Do not paste tokens, passwords, or private keys into a prompt or Slack thread.

## Writes and attribution

Vercel Agent can either change a Vercel resource directly or prepare a GitHub pull request, depending on the operation. The plan identifies the intended destination before execution.

GitHub writes use Vercel Agent-owned branches and require an approved repository-specific write scope. Vercel writes are attributed to you via Vercel Agent. GitHub commits and pull requests are created and signed by the Vercel Agent GitHub App, with you added as a git co-author.

## When an operation is unavailable

Vercel Agent can refuse an operation when:

- You do not have permission to access the selected team, project, or repository.
- The project does not link to the requested GitHub repository.
- The requested resource is outside the active plan.
- The operation is not supported by scoped authorization.
- The team or feature is not eligible for Vercel Agent.


---

[View full sitemap](/docs/sitemap)
