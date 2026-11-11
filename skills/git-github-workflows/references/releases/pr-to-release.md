# PR to Release: the end-to-end flow

Branch → PR → CI → review → merge → tag → release, entirely from the `gh` CLI (v2.94.0).

## The flow

### 1. Branch and push

```bash
git switch -c feat/widget-export
# ... commit work (Conventional Commits if you want automated changelogs later) ...
git push -u origin feat/widget-export
```

### 2. Open the PR

```bash
# --fill reuses your commit title/body so you don't retype it
gh pr create --fill --base main --reviewer alice,bob

# Draft until it's ready for eyes; assign yourself; add labels
gh pr create --fill --draft --base main --assignee @me --label feature
```

Useful `gh pr create` flags: `-f/--fill` (commit info), `--fill-first` (first commit only), `-B/--base` (target branch), `-d/--draft`, `-r/--reviewer` (users **or** teams), `-a/--assignee` (`@me` self-assigns), `-l/--label`, `-t/--title`, `-b/--body`, `-w/--web` to finish in the browser.

### 3. Watch CI

```bash
gh pr checks --watch              # live status until checks finish
gh pr checks --watch --fail-fast  # bail on first failure
gh pr checks --required           # only the checks that gate merge
```

`gh pr status` gives a dashboard of *your* PRs (created, assigned, requesting review) with their check rollups. `gh pr view --web` opens the PR page.

### 4. Review

```bash
gh pr review 42 --approve
gh pr review 42 --request-changes --body "Lock the mutex before the early return"
gh pr review 42 --comment --body "Mostly LGTM, one nit inline"
```

Addressing feedback: push fixes to the same branch (the PR updates automatically and re-runs CI), reply to threads in the web UI, then re-request review:

```bash
git push                          # CI re-runs, reviewers notified of new commits
gh pr ready 42                    # flip a draft to ready-for-review
```

### 5. Merge

```bash
# Squash (clean linear history — pairs well with Conventional Commits)
gh pr merge 42 --squash --delete-branch

# Or a merge commit / rebase
gh pr merge 42 --merge --delete-branch
gh pr merge 42 --rebase --delete-branch
```

Pick exactly one of `-s/--squash`, `-m/--merge`, `-r/--rebase`. `-d/--delete-branch` cleans up local + remote. `--admin` overrides failing requirements (use sparingly). `-t/--subject` / `-b/--body` set the merge commit message.

### 6. Tag and release

Once `main` has the merge:

```bash
git switch main && git pull
gh release create v1.2.3 --generate-notes
```

`--generate-notes` auto-builds the body from merged PRs (categorized via `.github/release.yml`). See `releases-and-assets.md` for assets, drafts, and annotated tags.

## Auto-merge with required checks

Don't babysit a green build — queue the merge and let it fire when requirements pass:

```bash
gh pr merge 42 --squash --auto --delete-branch
gh pr merge 42 --disable-auto              # cancel it
```

`--auto` requires auto-merge to be enabled on the repo and the PR to have required checks/reviews configured — it merges the moment those go green, with no further action from you.

## Merge queue (brief)

For busy `main` branches where PRs that pass CI individually can still break when combined, enable a **merge queue** (repo setting / ruleset). The queue serially re-tests each PR against the latest target before merging, so you get "always-green main" without serializing developers. With a queue enabled, `--auto` adds the PR to the queue rather than merging directly. See `pr-merge-queue.md` in this skill's references.

## Scaling up: Conventional Commits → automated versioning

The manual `tag + gh release create` step is the thing you automate first. With **Conventional Commits** (`feat:`, `fix:`, `feat!:`/`BREAKING CHANGE:`), **release-please** opens a "release PR" that maintains `CHANGELOG.md` and bumps the version; merging that PR cuts the tag and release for you. This turns the whole tail of this flow (steps 6 onward) into "merge the release PR." Wire it in Actions — see the `working-with-github-actions` skill for the workflow.
