# Rewriting History

Editing commits that already exist — reordering, squashing, fixing messages, splitting, or scrubbing files from the entire repo. Everything here *rewrites* commits, which means new SHAs. Read the safety section before doing any of it on a branch anyone else has pulled.

## Golden rule

**Never rewrite public/shared history.** Once commits are pushed to a branch other people build on (`main`, a shared release branch), rewriting them forces everyone downstream into a painful re-sync and can silently drop their work. Rewrite freely on your own local/feature branches *before* they're merged; leave merged/shared history alone and fix forward with `git revert` instead.

## Amending the last commit

```bash
# Change the message and/or fold staged changes into the last commit
git commit --amend

# Fold staged changes in but keep the existing message verbatim
git add forgotten-file.ts
git commit --amend --no-edit
```

`--amend` replaces the tip commit with a new one (new SHA). If the old tip was already pushed, you'll need `--force-with-lease` to update the remote (see below).

## Interactive rebase

`git rebase -i <base>` opens an editor listing every commit *after* `<base>`, oldest at the top, each prefixed with a command you can change:

```
pick   a1b2c3d Add parser
pick   d4e5f6a Fix typo in parser
pick   7g8h9i0 Wire parser into CLI
```

Common bases: `git rebase -i HEAD~3` (last 3 commits), `git rebase -i main` (everything since you branched), `git rebase -i <sha>` (everything after that commit).

The command keywords:

| Keyword          | Effect                                                              |
| ---------------- | ------------------------------------------------------------------- |
| `pick` (`p`)     | Keep the commit as-is                                               |
| `reword` (`r`)   | Keep changes, re-edit the message                                   |
| `edit` (`e`)     | Pause at this commit so you can amend it or split it                |
| `squash` (`s`)   | Meld into the previous commit, combine both messages                |
| `fixup` (`f`)    | Like squash but discard this commit's message                       |
| `drop` (`d`)     | Delete the commit entirely                                          |
| `reorder`        | Just move the line — order in the file is the new commit order      |

Save and close to run. Resolve any conflicts, then `git rebase --continue`; bail out with `git rebase --abort` (returns you to exactly where you started).

### Reword just a message

```bash
git rebase -i HEAD~3   # change `pick` -> `reword` on the target line
```

For *only* the most recent commit, skip rebase and use `git commit --amend`.

## The autosquash workflow (the good way to fix earlier commits)

Instead of hand-editing the rebase todo, mark fixups at commit time and let `--autosquash` arrange them:

```bash
# You spot a bug that belongs in an earlier commit <sha>
git add fix.ts
git commit --fixup <sha>        # creates "fixup! <original subject>"
# ...keep working, maybe more fixups...

git rebase -i --autosquash <base>
```

`--autosquash` auto-reorders each `fixup!`/`squash!` commit directly beneath its target and pre-sets the right keyword — you just save and close. Use `commit --squash <sha>` instead of `--fixup` when you want to merge the messages too. Set it as default with `git config --global rebase.autosquash true`.

## Editing a commit deep in history

```bash
git rebase -i <sha>^          # note the ^ — base must be the PARENT of the commit you want to edit
# mark the target line `edit`, save
# rebase stops with that commit checked out:
#   make changes...
git add .
git commit --amend
git rebase --continue
```

## Splitting one commit into two

```bash
git rebase -i <sha>^          # mark the target `edit`
git reset HEAD^               # un-commit it, leaving changes in the worktree (mixed reset)
git add -p                    # stage the first logical chunk
git commit -m "First half"
git add .
git commit -m "Second half"
git rebase --continue
```

## Scrubbing files/secrets from ALL history

A leaked key or a giant binary lives in every commit that ever touched it — amending the tip does nothing. Use **`git filter-repo`** (the modern, fast, recommended tool; install via `pip install git-filter-repo` or your package manager):

```bash
# Remove a file from the entire history
git filter-repo --path config/secrets.yml --invert-paths

# Remove every file matching a glob
git filter-repo --path-glob '*.pem' --invert-paths

# Replace secret strings with ***REMOVED*** everywhere (literal:..., regex:..., or a file)
git filter-repo --replace-text secrets.txt
```

`filter-repo` rewrites every affected commit (new SHAs throughout) and, by design, removes the `origin` remote so you don't accidentally push a half-rewritten repo. Re-add it and force-push when ready:

```bash
git remote add origin <url>
git push --force-with-lease --all
git push --force-with-lease --tags
```

Notes:
- **`git filter-branch` is deprecated** — it's slow, has dangerous default behaviors, and the Git docs explicitly steer you to `filter-repo`. Don't reach for it.
- BFG Repo-Cleaner is the older alternative; `filter-repo` is faster and more general — prefer it.
- **A rotated secret is the only real fix.** Rewriting history doesn't un-leak a key that was already pushed to a forge — caches, forks, and clones persist. Rewrite *and* rotate the credential.

## Safety: never bare `--force`

```bash
# DON'T:
git push --force            # clobbers the remote even if someone pushed since you last fetched

# DO:
git push --force-with-lease
```

`--force-with-lease` refuses the push if the remote ref has moved since your last fetch — it protects against overwriting a teammate's commit that landed while you were rebasing. Plain `--force` overwrites unconditionally and is how shared work gets silently destroyed.

On shared branches, coordinate first (tell people, or just don't rewrite). If you must, everyone else has to `git fetch` then `git reset --hard origin/<branch>` (losing local divergence) or rebase their work onto the new history.

## Recovery: undo a botched rebase

Every position HEAD has held is in the reflog, even commits "lost" by a rebase. To get back to where you were before a rebase went wrong:

```bash
git reflog                       # find the entry just before the rebase, e.g. "HEAD@{7}: checkout..."
git reset --hard HEAD@{7}         # or use the raw SHA shown
```

The reflog is local and time-limited (defaults: 90 days for reachable, 30 for unreachable) but in practice it's your safety net for nearly any history operation. `git reset --hard <reflog-sha>` puts the branch tip exactly back. See also `references/howto/fixing-mistakes.md`.
