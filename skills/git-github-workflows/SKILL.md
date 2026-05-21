---
name: git-github-workflows
description: Git and GitHub workflow router. Selects the right skill for any git or GitHub operation — committing, PR creation, CI debugging, review comment handling, and more. Invoke at the start of any git/GitHub task.
---

# Git & GitHub Workflows

Identify the current operation and invoke the appropriate skill. Never ask the user which skill to use — routing is automatic.

## Routing Table

| Operation | Skill |
|---|---|
| Stage and commit changes | `commit-commands:commit` |
| Commit → push → open PR | `commit-commands:commit-push-pr` |
| Prune merged/deleted branches | `commit-commands:clean_gone` |
| Branch strategy, PR creation, merge flow | `git-pr-workflows:git-workflow` |
| Failing CI / GitHub Actions checks | `gh-fix-ci` |
| Addressing comments on an open PR | `gh-address-comments` |
| Processing and responding to received review feedback | `superpowers:receiving-code-review` |

## Routing Details

### Committing

Staging files and generating a well-formed commit message from the diff. Invoke `commit-commands:commit`.

### Commit → Push → PR

Full flow from staged changes to an open pull request. Invoke `commit-commands:commit-push-pr`.

### Clean Merged Branches

Prune local branches whose remote tracking ref is gone (merged and deleted upstream). Invoke `commit-commands:clean_gone`.

### PR Creation and Branch Strategy

Planning a pull request — base branch selection, PR description, reviewer assignment, branch naming. Invoke `git-pr-workflows:git-workflow`.

### Failing CI

GitHub Actions checks are failing. Fetch logs, diagnose the failure, plan and implement a fix. Invoke `gh-fix-ci`.

### Addressing Review Comments

A reviewer has left comments on an open PR that need to be addressed or resolved. Invoke `gh-address-comments`.

### Responding to Review Feedback

You have received a code review and need to process the feedback, decide what to apply, and respond thoughtfully. Invoke `superpowers:receiving-code-review`.
