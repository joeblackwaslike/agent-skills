---
name: git-cleanup
description: Remove landed worktrees and merged local branches, prune stale refs
argument-hint: "[--dry-run]"
---

Routine git housekeeping. Run it from the **main checkout**, never from inside a worktree.

**Follow the `working-with-git` skill's `references/howto/worktree-conventions.md`.** It defines
what "landed" means (the PR is `MERGED`, not "ancestor of main", because squash merges never
make the branch an ancestor), and the `wt-reap` classes. This file only sequences those rules.
Never use `--force` on a worktree and never delete anything the steps below classify as
unfinished.

With `--dry-run`, classify and report only: pass `--dry-run` to `wt-reap` and skip every delete.

## Steps

1. **Prune stale refs.** `git fetch --prune`, then `git worktree prune`.
2. **Worktrees.** `wt-reap --scan`, then `wt-reap <name>` for each `REAPABLE` one. Handle
   `TOOLSTATE` as the runbook says (the printed `git restore` from inside the worktree, then
   re-run `wt-reap` from here). Report `WORK` and `UNMERGED`, do not touch them.
3. **Branches with no worktree.** For each local branch other than the current and default
   branch, `gh pr list --head <branch> --state merged --json headRefOid`. It is landed only if
   a returned PR head is the local tip or a descendant of it; then `git branch -D <branch>`.
   A branch with no merged PR, or with local commits past the PR head, is reported, not deleted.
4. **Orphan directories.** List entries under `.worktrees/` that `git worktree list` does not
   show. Remove one only if it is empty or holds nothing but `.beads/`, `.serena/`, `.clawhip/`;
   report the rest.
5. **Report.** What was removed, then what was left and why (the class for each).

Never touch stashes or remote branches.
