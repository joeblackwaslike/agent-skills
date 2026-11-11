---
name: git-github-workflows
description: "Use when committing, opening a PR, driving it to merge, answering reviewer or AI-bot feedback, working in a worktree, cutting a release, or cleaning up branches. Not for command flags (git worktree, gh pr: working-with-git, working-with-github), CI workflow YAML (working-with-github-actions), or GitHub Apps (developing-for-github)."
metadata:
  last_updated: "2026-11-10"
---

# Git & GitHub Workflows

This skill owns every process for getting work done with git and GitHub: the commands, the runbooks, and the order to do things in. Open the matching runbook and follow it. Don't ask which one to use.

## What this skill is not

- **Not the git manual.** What a git command does, its flags, how rebase or bisect works: `agent-skills:working-with-git`.
- **Not the GitHub manual.** What a `gh` command does, REST and GraphQL calls, rate limits, tokens, branch protection settings: `agent-skills:working-with-github`.
- **Not CI.** Workflow YAML, Actions, OIDC deploys, fixing a red check: `agent-skills:working-with-github-actions`.
- **Not app development.** GitHub Apps, OAuth apps, webhook consumers, Octokit bots: `agent-skills:developing-for-github`.

The two reference skills answer "how does this tool work". This one answers "what do we do, and in what order".

## Commands

Run these instead of improvising the sequence.

| Operation | Command |
|---|---|
| Stage and commit changes | `agent-skills:commit` |
| Verify, commit, self-review, push, open the PR, start the review loop | `agent-skills:commit-push-pr` |
| Remove landed worktrees and merged branches, prune stale refs | `agent-skills:git-cleanup` |

## Runbooks

| Situation | Read |
|---|---|
| A PR is open and needs to reach approval and merge: review threads, required reviewers, the merge gate | [references/pull-requests/driving-a-pr-to-approval.md](references/pull-requests/driving-a-pr-to-approval.md) |
| Reply to, react to, or resolve reviewer comments | the same runbook (steps 6 to 9), plus `superpowers:receiving-code-review` to judge whether a finding is real |
| Rate an AI reviewer's findings (👍, 👎, 😕) | [references/pull-requests/giving-feedback-on-ai-reviews.md](references/pull-requests/giving-feedback-on-ai-reviews.md) |
| Read that feedback and tune the reviewer | [references/pull-requests/tuning-the-ai-reviewer.md](references/pull-requests/tuning-the-ai-reviewer.md) |
| Post reviews, inline comments, suggestions or check results through the API | [references/pull-requests/code-review-via-api.md](references/pull-requests/code-review-via-api.md) |
| Feature work in an isolated worktree, parallel or subagent work, removing a worktree | [references/worktree-conventions.md](references/worktree-conventions.md) |
| Which branching model to use; the branch, PR, merge loop in general | [references/github-flow.md](references/github-flow.md) |
| Drive a PR through review, merge and release | [references/releases/pr-to-release.md](references/releases/pr-to-release.md) |
| Cut a release, upload assets, write the changelog | [references/releases/releases-and-assets.md](references/releases/releases-and-assets.md) |
| Release from several branches with environments | [references/releases/multi-branch-release.md](references/releases/multi-branch-release.md) |

Evaluating a review comment and acting on it are two jobs. `superpowers:receiving-code-review` covers evaluation only. It says nothing about which reviewers gate the merge, where to reply, how to resolve a thread, or how to leave the reaction an internal review bot learns from. Use it together with the pull-requests runbook, or an agent triages correctly and then merges past a required reviewer it never counted.

## Reference skills

Reach for these when you need the tool's own behavior, not a process.

| Question | Skill |
|---|---|
| A git command or flag, history rewriting, bisect, reflog recovery, merges and conflicts, git servers | `agent-skills:working-with-git` |
| A `gh` command or flag, REST or GraphQL, rate limits, tokens, rulesets, issues, Dependabot and CodeQL config | `agent-skills:working-with-github` |
| Workflow YAML, Actions, runners, OIDC cloud deploys, release-please wiring | `agent-skills:working-with-github-actions` |
| A GitHub App, OAuth app, webhook consumer or Octokit bot | `agent-skills:developing-for-github` |
