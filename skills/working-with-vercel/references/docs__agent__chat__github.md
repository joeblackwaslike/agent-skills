---
title: GitHub Operations
product: vercel
url: /docs/agent/chat/github
canonical_url: "https://vercel.com/docs/agent/chat/github"
last_updated: 2026-08-19
type: reference
prerequisites:
  - /docs/agent/chat
  - /docs/agent
related:
  - /docs/agent/chat/permissions
  - /docs/agent/pr-review
summary: Understand how Vercel Agent reads linked GitHub repositories and creates pull requests.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent/chat/github.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "d080c1736011973ee98d88f2a36dbb6052963e3c3f16568f1727961a370e66ba"
---

# GitHub Operations

> **🔒 Permissions Required**: Vercel Agent GitHub operations

Vercel Agent can read and update GitHub repositories linked to projects in your selected Vercel team. It uses a secure sandbox for repository work and requires your approval before it writes to GitHub.

## Requirements

Before Vercel Agent can access a repository:

1. Connect the GitHub repository to a Vercel project.
2. Make sure the project belongs to the selected Vercel team.
3. Confirm that the Vercel GitHub App is installed for the repository's owner.
4. Give the GitHub App the repository permissions required by the operation.

A repository can be visible to your GitHub account but unavailable to Vercel Agent if it is not linked to an accessible Vercel project.

## Read a repository or pull request

Vercel Agent can perform these read operations on an authorized repository:

- Clone a repository at a branch or tag. Clones are shallow by default; request full history for historical analysis or blame.
- List open, closed, or all pull requests.
- Read pull request metadata, changed files, reviews, and comments.
- Read CI check results and save a check-job log for inspection.
- Search and inspect the cloned source in the secure sandbox.

Repository clones are read-only from GitHub's perspective. Vercel Agent does not use `git push`, `gh`, or copied GitHub credentials from a shell command.

## Create or update a pull request

When a task needs a code change, Vercel Agent can edit and test files in the sandbox, then create a pull request after you approve the plan.

Vercel Agent pull requests:

- Start from a committed local branch in the cloned repository.
- Use a Vercel Agent-owned branch beginning with `vercel-agent/`.
- Target the repository's default branch unless you specify another base branch.
- Can be drafts when the request specifies a draft pull request.
- Include the title and body shown in the approved plan or request.
- Return a pull request link and number when creation succeeds.

Vercel Agent can update an existing open Vercel Agent-owned pull request by pull request number or branch name. Updates can change the title or body and publish a committed local branch to the existing pull request. Vercel Agent cannot update arbitrary pull requests or branches owned by someone else.

GitHub pull request writes require an approved plan scope exactly matching:

```text
@github:repo/<owner>/<repo> pull_requests:write
```

The scope is repository-specific. Approving a write for one repository does not authorize a different repository.

## Common failures

| Error | Meaning | What to do |
| --- | --- | --- |
| `github_not_connected` | The Vercel GitHub connection is unavailable | Reconnect GitHub, then retry |
| `repo_not_allowed` | The repository is outside the allowed project/team scope | Link it to an accessible project or select the correct team |
| `project_not_found` | Vercel Agent cannot find the target Vercel project | Check the project name and team |
| `project_not_linked` | The project is not linked to the repository | Link the repository in Project Settings |
| `project_ambiguous` | More than one project matches the target | Select a project explicitly |
| `missing_approval` | The active plan does not include the repository write scope | Reject the stale request and approve a new plan |
| `clone_failed` | The sandbox could not clone the repository | Start a new request; do not use shell GitHub credentials |
| `sandbox_unavailable` | The workspace could not be prepared | Retry in a new message |
| `dirty_worktree` | The local checkout contains unexpected changes | Ask Vercel Agent to inspect the checkout before continuing |
| `invalid_branch` or `branch_not_found` | The requested branch is invalid or unavailable | Use an existing branch or let Vercel Agent use the default branch |
| `empty_diff` | There are no changes to publish | Make a relevant change or stop the request |
| `merge_conflict` | The requested change conflicts with the target branch | Resolve the conflict in a new request |
| `unsupported_change` | The requested change cannot be represented by the supported GitHub operation | Ask Vercel Agent for a different workflow |
| `change_too_large` | The change exceeds the supported size | Split the work into smaller pull requests |
| `branch_exists` | The requested Vercel Agent branch already exists | Update the existing pull request or choose another branch |
| `pull_request_exists` | An open pull request already exists for the branch | Ask Vercel Agent to update it instead |
| `pull_request_not_found` or `pull_request_closed` | The requested pull request is unavailable for update | Open a new request or use an open Vercel Agent-owned pull request |
| `commit_not_verified` | The source commit could not be verified | Retry after Vercel Agent inspects and commits the local branch |
| `non_fast_forward` | The remote branch changed since the local checkout | Refresh the branch and review the diff before retrying |

GitHub App installation errors can also report missing repository permissions or SAML authorization requirements. An organization administrator may need to update the GitHub App installation or complete SAML reauthentication.

## Attribution and security

GitHub writes are authorized by you. Commits and pull requests are created and signed by the Vercel Agent GitHub App, with you added as a git co-author, and the write is recorded in your team's activity history. Vercel Agent uses short-lived repository credentials during authorized operations. Do not paste GitHub tokens into Chat or Slack.

For the full Chat approval model, see [Vercel Agent Permissions](/docs/agent/chat/permissions). For automatic reviews and `@vercel` commands in pull request comments, see [Code Review](/docs/agent/pr-review).


---

[View full sitemap](/docs/sitemap)
