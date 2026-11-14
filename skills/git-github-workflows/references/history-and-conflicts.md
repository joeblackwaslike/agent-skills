# History, Conflicts and Forks

Which way to integrate a branch, what to do when it conflicts, and how to keep a fork current. For the flags behind each command, read `agent-skills:working-with-git` (`references/howto/merging-and-conflicts.md`).

## Merge or rebase

| Situation | Do |
| --- | --- |
| Your own PR branch is behind `main` (no bot commits on the remote) | `git fetch && git rebase origin/main`, then `git push --force-with-lease` |
| Landing a PR on `main` | Squash-merge (`gh pr merge --squash --delete-branch`) |
| Pulling `main` into the main checkout after a merge | `git pull --ff-only` |
| Someone else pushed to your branch | Merge or pull. Never rebase over their commits |
| A bot pushed a suggestion commit | `git pull --rebase` so the bot commit survives, then `git rebase origin/main` if still behind, then `--force-with-lease` (a bare fetch lets the lease pass and a rebase would drop the commit) |

Before any force push, run `git log HEAD..origin/<branch>`. Anything it lists is a remote commit (a bot suggestion, a collaborator) that the rebase would drop, so pull it in first. The lease alone can't help once a fetch has updated your remote-tracking ref.

Never rebase `main`, a protected branch, a branch that already merged, or a branch another person has built on. Rebase rewrites commits, so anyone holding the old ones ends up with duplicates and conflicts.

When the branch lives in a worktree, rebase there (`git fetch && git rebase origin/main`), fast-forward the main checkout, then push. Don't run `git pull --rebase` in the main checkout after the merge: it rewrites the landed commit and leaves the worktree branch on the old hash, so the branch looks unmerged to `wt-reap`, the worktree reaper (see `commands/git-cleanup.md`).

## Resolving a conflict

1. `git status` lists the conflicted files. Open each one and decide what the code should do, not which side to keep.
2. Edit out the markers. During a rebase `--ours` is the branch you are rebasing onto and `--theirs` is your own commit, the reverse of a merge (`working-with-git/references/howto/merging-and-conflicts.md`).
3. Run the repo's tests and linter. A clean merge can still break the build.
4. `git add` the files, then `git rebase --continue` (or `git commit` for a merge). To back out, `git rebase --abort` or `git merge --abort`.

To avoid conflicts, keep branches to days, rebase onto `main` often, put unfinished work behind a flag instead of on a long branch, and merge reviewed PRs promptly. Two agents or people editing the same file is the usual cause, so check before touching a shared file.

## Syncing a fork

```bash
git remote add upstream https://github.com/OWNER/REPO.git   # once
git fetch upstream
git switch main
git merge --ff-only upstream/main
git push origin main
```

`--ff-only` rejects diverged history, but it succeeds as a no-op when your `main` is simply ahead of `upstream/main`, and the push then publishes those commits. Run `git log upstream/main..main` first; if it lists anything, move those commits to a branch. Before running any `gh` command against a fork, pin the repo as in step 0 of `pull-requests/driving-a-pr-to-approval.md`.

## Undoing a mistake

| You want to | Go to |
| --- | --- |
| Unstage, discard, or un-commit locally | `working-with-git/references/howto/fixing-mistakes.md` |
| Undo a commit that is already pushed | `git revert`, never a force push to `main` |
| Recover lost commits | reflog, same page |
| Rewrite local history before the PR | `working-with-git/references/howto/rewriting-history.md` |

`git reset --hard` and `git checkout -- <file>` destroy uncommitted work. Check `git status` first.
