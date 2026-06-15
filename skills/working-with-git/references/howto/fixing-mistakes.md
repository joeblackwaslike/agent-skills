# Fixing Mistakes

The "I did the wrong thing, how do I undo it" playbook. The core confusion is `reset` vs `revert` vs `restore` vs `checkout` — they touch different things and one of them (`reset --hard`) destroys work. Pick from the matrix first, then read the recipe.

## Decision matrix

Git has three places state lives: **HEAD** (the commit your branch points at), the **index** (staging area), and the **working tree** (your files on disk).

| Command                  | Moves HEAD | Changes index | Changes worktree | Use it to…                                          |
| ------------------------ | :--------: | :-----------: | :--------------: | --------------------------------------------------- |
| `git reset --soft <ref>` | yes        | no            | no               | Un-commit but keep everything staged                |
| `git reset --mixed <ref>`| yes        | yes           | no               | Un-commit and unstage; keep file edits (default)    |
| `git reset --hard <ref>` | yes        | yes           | **yes (destroys)**| Throw the branch + all changes back to `<ref>`      |
| `git restore <path>`     | no         | no            | yes              | Discard working-tree edits to a file                |
| `git restore --staged <path>` | no    | yes           | no               | Unstage a file (keep the edits)                     |
| `git revert <sha>`       | adds commit| —             | —                | Undo a commit by making a *new* inverse commit      |
| `git checkout <branch>`  | yes        | yes           | yes              | Switch branches (use `git switch` now)              |

Rule of thumb: **`reset`/`restore` rewrite local state, `revert` is the only safe undo for shared/pushed history.**

## Modern unstage / discard (use `git restore`)

`git restore` and `git switch` (Git 2.23+) split the overloaded `git checkout` into two clear verbs. Prefer them.

```bash
# Unstage a file (was: git reset HEAD <file>)
git restore --staged file.ts

# Discard working-tree changes to a file (was: git checkout -- file.ts) — DESTRUCTIVE
git restore file.ts

# Both: unstage AND discard the working copy, restoring from HEAD
git restore --staged --worktree file.ts

# Restore a file's contents from another commit
git restore --source=HEAD~2 file.ts
```

`git restore file.ts` permanently drops uncommitted edits — there's no reflog for un-added working-tree changes. Double-check before running it.

## Common un-do recipes

```bash
# Un-commit the last commit but KEEP the changes staged
git reset --soft HEAD~1

# Un-commit AND unstage, keeping the file edits in the worktree
git reset --mixed HEAD~1        # (--mixed is the default)

# Nuke the last commit and all its changes entirely
git reset --hard HEAD~1         # destructive — changes gone unless committed/stashed

# Unstage everything
git restore --staged .

# Discard ALL local working-tree changes (destructive)
git restore .
```

## Undo a PUSHED commit safely — use revert

Never `reset --hard` a branch others have pulled. Instead create an inverse commit and push it normally:

```bash
git revert <sha>                # makes a new commit that undoes <sha>
git revert <oldsha>..<newsha>   # revert a range
git revert -m 1 <merge-sha>     # revert a merge, keeping mainline parent #1
git push
```

History stays linear and intact; nobody downstream has to re-sync.

## `git stash` silently drops untracked files

**This is a data-loss footgun.** Plain `git stash` only stashes *tracked* changes — new files Git isn't tracking yet are left in your worktree, and if you then `git checkout`/`clean`/`reset` you can lose them. To include them:

```bash
git stash -u                    # --include-untracked: stash tracked + untracked
git stash -a                    # --all: also include ignored files
```

Always reach for `git stash -u` unless you specifically want to leave new files in place.

## Recovering lost commits via reflog

The reflog records every position HEAD has held — commits orphaned by a bad reset, rebase, or amend are still there for ~30–90 days.

```bash
git reflog                      # find the SHA you want back, e.g. HEAD@{4}
git reset --hard HEAD@{4}       # move the current branch back to it
# or, to inspect without moving your branch:
git branch recovered HEAD@{4}   # save the lost commit onto a new branch
```

## Recovering a dropped stash

`git stash drop` or `git stash pop` (after a conflict) can lose a stash entry that's no longer in `git stash list`. Stashes are commits, so `fsck` finds the dangling ones:

```bash
git fsck --no-reflog | grep commit
# inspect candidates:
git show <dangling-sha>
# bring it back as a stash entry, or just apply it:
git stash apply <dangling-sha>
```

## Recover a deleted branch

A branch is just a pointer; deleting it leaves the commits reachable from the reflog.

```bash
git reflog                          # find the tip SHA the branch pointed at
git branch <name> <sha>             # recreate it
# Git often hints the SHA in the deletion message:
#   "Deleted branch feature/x (was a1b2c3d)."
git checkout -b feature/x a1b2c3d
```

## Detached HEAD recovery

You're in "detached HEAD" when HEAD points at a commit instead of a branch (e.g. after `git checkout <sha>`). Commits you make there aren't on any branch and get garbage-collected eventually. Pin them before switching away:

```bash
git switch -c rescue-branch     # create a branch at the current detached commit
```

If you already left and lost the work:

```bash
git reflog                      # find the detached commit's SHA
git branch rescue-branch <sha>
```

To intentionally leave detached HEAD without saving anything, just `git switch -` or `git checkout <branch>`.
