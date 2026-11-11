---
description: Verify, commit, review locally, push, and open a PR from the repo's template, then hand it to /pr-loop
argument-hint: "[--draft] [--base <branch>] [--bd <id>] [--no-verify] [--no-review] [--no-loop] [--direct]"
allowed-tools: Bash(git:*), Bash(gh:*), Bash(bd:*), Bash(ai-review:*), Bash(bash gates/verify.sh:*), Bash(jq:*), Bash(wc:*)
---

Take the current changes from working tree to an open PR, then start the review loop. Run it
start to finish without check-ins. Stop only where a step below says to.

## Context

- Status: !`git status --short`
- Branch: !`git branch --show-current`
- Default branch: !`gh repo view --json defaultBranchRef -q .defaultBranchRef.name`
- Template: !`ls .github/pull_request_template.md 2>&1`
- Gate script: !`ls gates/verify.sh 2>&1`

## Flags

- `--draft` opens the PR as a draft.
- `--base <branch>` targets that branch instead of the default (release branches, stacked PRs).
- `--bd <id>` is the beads issue this PR closes. Without it, use the id in the branch name or commit messages if there is one.
- `--no-verify` skips the gate in step 2. Say so in the Test plan.
- `--no-review` skips the local AI review in step 5. Say so in the Test plan.
- `--no-loop` stops after the PR is open instead of starting `/pr-loop`.
- `--direct` is for a repo whose convention is committing straight to its default branch, with no PRs: run steps 1 to 4, push to the default branch, and stop.

## 1. Branch and surroundings

1. On a fork, pin the repo first: `GH_REPO=$(git remote get-url origin | sed -E 's|.*github\.com[:/]||; s|\.git$||')`, and pass `--repo "$GH_REPO"` to every `gh` call. Unpinned, `gh` reads and writes the upstream.
2. If the branch is the default branch, create `<type>/<slug>` first (`git switch -c`). Never commit to the default branch unless `--direct`. For new feature work, do it in `.worktrees/<branch>` (standing consent, don't ask).
3. Look before you mutate. If there are uncommitted changes you didn't make, or commits on the branch you didn't author, another agent may be working here. Stop and report them.
4. Spec, plan, and code go in one branch and one PR. Make the spec the first commit. Never split them into separate PRs.

## 2. Verify

Run `bash gates/verify.sh`, or the project's lint and test commands if it has no gate. Judge by exit code, never by grepping output for "error". A change that only passes static checks isn't done.

For a bug fix or a new behavior, the test must have failed before the fix. If the fix already exists, revert it, confirm the test goes red, restore it, and keep the red output for the Test plan. Green alone proves nothing.

Don't commit code that fails the gate. Three failed fixes in a row: stop and name the assumption that looks wrong.

## 3. Commit

Follow `personal-agent-skills:joe-stack-preferences`, `references/release-management.md`, "Writing the message". It owns the format, type table, scope, body, footer, and when to split. This command doesn't restate it. Two additions:

- Match the repo. Run `git log --format=%s -10`: if recent subjects have no emoji, use none, whatever the table says.
- Run the `humanizer` skill in embedded mode on any commit body before committing. Subjects don't need it.

Mechanics:

1. Stage by path. Read `git diff --cached` first. Split into atomic commits when the diff mixes types, concerns, or dependency bumps with features.
2. No secrets or personal data in the diff. Check for `.env`, key files, tokens.
3. Don't stage generated review reports (`docs/code-reviews/*`) or tool state unless the repo tracks them.
4. After every commit, run `git show --stat HEAD`. If it lists deletions or files you didn't touch, the index was stale: `git reset -q`, restage by path, and recommit before anything is pushed. Wrong: a commit made right after `ai-review` deleted nine files from the PR branch and was pushed before anyone looked.

## 4. Size the branch

```bash
git fetch origin <base>
git diff --shortstat origin/<base>...HEAD
git diff origin/<base>...HEAD -- . ':(exclude)*.lock' ':(exclude)*-lock.*' | wc -c
```

If the diff passes 200,000 characters (the review bot's `REVIEW_DIFF_BUDGET_CHARS`) or about 400 changed lines of hand-written code, don't open it as one PR. Split along seams into stacked PRs, lowest first, each branched off the previous with `--base` set to it, per the runbook's size gate. One file over the budget can't be split by path: say so in the PR body and freeze it. A mechanical change (formatter, rename, codemod) gets its own PR.

## 5. Review locally, twice at most

Skip with `--no-review`.

1. Run `ai-review review --full` once before the first push. Check each finding against the code before acting: the bot re-raises declined findings and is often wrong (Anthropic-side findings were right 9 of 42 times, OpenAI-side 39 of 47). Fix the real ones.
2. If the branch fetches URLs or handles secrets, also run the `typescript-reviewer` and `security-reviewer` agents in parallel, each with an explicit `model: sonnet`.
3. Run `ai-review review --full` once more on the fix batch, passing what you decided via `--extra`. Then stop. It never goes quiet, so don't loop until it does.
4. Re-run step 3's `git show --stat HEAD` check and the step 2 gate after the fixes.

## 6. Push

```bash
git push -u origin HEAD
```

After a rebase or amend, use `git push --force-with-lease`. Never bare `--force`. Don't run `/no-mistakes` or `no-mistakes axi`; it is retired, and a leftover `no-mistakes` remote is inert.

If `--direct`: this is the end. Push to the default branch and report.

## 7. Open the PR

Fill `.github/pull_request_template.md` (Context, Summary, Test plan). Delete the `Filling agent` comments. Draft the body to a file in the scratchpad so shell quoting can't mangle it.

- **Title:** `type(scope): description`, 72 characters or fewer, describing the whole PR. Not the latest fix.
- **Context:** why the change exists. For bd-tracked work, run `bd show <id> --long --json` and distill it. The bead is invisible to outside readers and to the review bots, so the why must be in the body. Write the id as plain text, never a link. Distill `notes`, don't paste them.
- **Summary:** what it does and why this approach, then 3 to 5 bullets of what's included. Describe the diff as it stands, not the history.
- **Test plan:** only what you ran, with results, and what you didn't run, stated plainly. Never invent a check. Include the red output from step 2 when it applies.
- **Hand-offs:** don't write work for the reviewer into the body ("please verify", "Joe to spot-check"). If only a human can do something (a login, an owner-only action, a product call), say which.
- **Link issues** with `Fixes #123` where they exist.

Run the `humanizer` skill in embedded mode on the body before posting. Not `no-ai-slop`.

```bash
gh pr create --base <base> --assignee @me --title "<title>" --body-file <file> [--draft]
```

Set the assignee. A PR with no assignee is in nobody's queue. Don't add the internal review bots by hand; they trigger on their own.

## 8. Hand off

1. If `--no-loop` wasn't passed, run `/pr-loop <number>` now. Load `agent-skills:working-with-github`, `references/howto/driving-a-pr-to-approval.md`, first. It owns thread triage, replies, reactions, resolution, the merge gate, and merge. This command doesn't restate it.
2. After the PR merges, remove the worktree in the same turn with `wt-reap <name>` from the main checkout, and refresh the plugin cache if the repo ships as a plugin.
3. Report: PR URL and number, what's included, what the gate and the local review found, and what wasn't run.
