---
title: GitHub Operations
product: vercel
url: /docs/agent/chat/github
canonical_url: "https://vercel.com/docs/agent/chat/github"
last_updated: 2026-09-18
type: reference
prerequisites:
  - /docs/agent/chat
  - /docs/agent
related:
  - /docs/agent/chat/permissions
  - /docs/agent/pr-review
summary: Understand how Vercel Agent reads linked GitHub repositories and creates pull requests.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent/chat/github.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "8515e21788abbe5ad1f13aa75cf8a6d9570af0896ae6e8b67ae5842688506836"
---

# GitHub Operations

> Vercel Agent GitHub operations are available in Public Beta on Enterprise and Pro plans

Vercel Agent can read and update GitHub repositories linked to projects in your selected Vercel team. It uses a secure sandbox for repository work and can create or update pull requests without plan approval.

## Requirements

Before Vercel Agent can work with a linked repository:

1. Connect the GitHub repository to a Vercel project.
2. Make sure the project belongs to the selected Vercel team.
3. Confirm that the Vercel GitHub App is installed for the repository's owner.
4. Give the GitHub App the repository permissions required by the operation.

Vercel Agent does not check your own GitHub role on the repository. Access comes from the project link and the Vercel GitHub App installation. A repository can be visible to your GitHub account but unavailable to Vercel Agent if it is not linked to an accessible Vercel project. Vercel Agent can clone a public repository that no accessible project links, without the Vercel GitHub App, but other operations, such as reading or creating pull requests, require a linked repository.

## Read a repository or pull request

Vercel Agent can perform these read operations on an authorized repository:

- Clone a repository at a branch or tag. Clones are shallow by default; request full history for historical analysis or blame.
- List open, closed, or all pull requests.
- Read pull request metadata, changed files, reviews, and comments.
- Read CI check results and save a check-job log for inspection.
- Search and inspect the cloned source in the secure sandbox.

Repository clones are read-only from GitHub's perspective. Vercel Agent does not use `git push`, `gh`, or copied GitHub credentials from a shell command.

## Create or update a pull request

When a task needs a code change, Vercel Agent can edit and test files in the sandbox, then create a pull request. Pull request writes do not need plan approval. Vercel Agent is designed to create or update a pull request only when you ask for a fix or a pull request, or accept its offer to open one. It is not designed to open one for a request to review, diagnose, or explain code.

Vercel Agent pull requests:

- Start from a committed local branch in the cloned repository.
- Publish the changes to a new branch in the repository.
- Target the linked Vercel project's production branch unless you specify another base branch. When several linked projects share the repository and you name only the repository, Vercel Agent uses the production branch of the first accessible linked project it finds, so name the project or the base branch when it matters.
- Can be drafts when the request specifies a draft pull request.
- Include a title and body that describe the change.
- Return a pull request link and number when creation succeeds.

Vercel Agent can update an open pull request by pull request number or branch name when the pull request's head branch is in the same repository. Updates can change the title or body, close the pull request, or publish a committed local branch to the existing pull request. An update can also replace the pull request branch's existing commits with a single commit on the latest base branch. That update fails if the branch no longer matches the head commit Vercel Agent supplies. Vercel Agent cannot update pull requests from forks.

Creating or updating a pull request requires the GitHub App installation to grant Contents and Pull requests write access. If the installation has not accepted these permissions, an owner of the GitHub account must approve them in the installation settings.

## Common failures

| Error | Meaning | What to do |
| --- | --- | --- |
| `github_not_connected` | The Vercel GitHub connection is unavailable | Reconnect GitHub, then retry |
| `repo_not_allowed` | The repository is outside the allowed project/team scope | Link it to an accessible project or select the correct team |
| `project_not_found` | Vercel Agent cannot find the target Vercel project | Check the project name and team |
| `project_not_linked` | The project is not linked to the repository | Link the repository in Project Settings |
| `project_ambiguous` | More than one project matches the target | Select a project explicitly |
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
| `pull_request_not_found` or `pull_request_closed` | The requested pull request is unavailable for update | Open a new request or use an open pull request from the same repository |
| `commit_not_verified` | The source commit could not be verified | Retry after Vercel Agent inspects and commits the local branch |
| `non_fast_forward` | The remote branch changed since the local checkout | Refresh the branch and review the diff before retrying |

GitHub App installation errors can also report missing repository permissions or SAML authorization requirements. An organization administrator may need to update the GitHub App installation or complete SAML reauthentication.

## Attribution and security

The Vercel Agent GitHub App creates each commit, and GitHub signs it. When you have connected GitHub as a Vercel login connection, Vercel Agent tries to add you as a git co-author and to open the pull request as you. If the co-author step fails, Vercel Agent publishes the commit without adding you as a co-author. If it can't open the pull request as you, it tries to open it with the Vercel Agent GitHub App instead, and if that also fails, the published branch can remain without a pull request. Vercel Agent uses short-lived repository credentials during authorized operations. Do not paste GitHub tokens into Chat or Slack.

For the full Chat approval model, see [Vercel Agent Permissions](/docs/agent/chat/permissions). For automatic pull request reviews, see [Code Review](/docs/agent/pr-review).

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
