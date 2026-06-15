# Merging and Resolving Conflicts

How to combine branches, when to merge vs. rebase, and how to get through conflicts without losing work or guessing.

## Merge vs. rebase

Both integrate one branch's work into another; they differ in the history they produce.

- **Merge** (`git merge feature`) creates a merge commit tying two histories together. History is truthful (shows what actually happened, when) but non-linear. Safe on shared branches because it doesn't rewrite anything.
- **Rebase** (`git rebase main` from your feature branch) replays your commits on top of the target, producing a linear history with no merge commits. Cleaner log, easier to bisect — but it *rewrites* your commits (new SHAs).

When to use which:

- **Rebase your own feature branch onto `main`** before merging, to get a clean linear history and resolve conflicts incrementally.
- **Merge to integrate** a finished feature into a shared branch, especially when you want a record of the integration.
- **Never rebase commits that others have pulled.** Rewriting shared history forces everyone downstream into a painful re-sync (same golden rule as `rewriting-history.md`). Rebase only commits that live solely in your local/unmerged branch.

## Fast-forward vs. `--no-ff` vs. squash

```bash
git merge feature              # fast-forwards if possible (just moves the pointer, no merge commit)
git merge --no-ff feature      # always create a merge commit, even when FF was possible
git merge --squash feature     # collapse feature into staged changes; you commit once, no merge link
git merge --ff-only feature    # refuse unless a clean fast-forward is possible (good in scripts/CI)
```

`--no-ff` keeps a visible "this was a feature branch" bubble in history. `--squash` gives a single tidy commit but loses the branch's individual commits and the merge relationship.

## Anatomy of a conflict

When Git can't auto-merge a region, it writes both sides into the file with markers:

```
<<<<<<< HEAD
const timeout = 30;          # your side (current branch / "ours")
=======
const timeout = 60;          # incoming side ("theirs")
>>>>>>> feature/long-timeout
```

You edit the region to the correct final content (deleting all three markers), then stage it.

### Use a 3-way conflict style — it shows the common ancestor

The default `merge` style hides *why* the two sides diverged. Turn on `zdiff3` to also show the original:

```bash
git config --global merge.conflictStyle zdiff3
```

```
<<<<<<< HEAD
const timeout = 30;
||||||| base                 # the common-ancestor version — what BOTH started from
const timeout = 45;
=======
const timeout = 60;
>>>>>>> feature/long-timeout
```

Seeing the base makes it obvious which side actually changed what. `zdiff3` is the improved version of `diff3` (it pulls common lines out of the conflicted hunk); use `zdiff3` on modern Git.

## Resolving the conflict

```bash
git status                     # lists "both modified" files
$EDITOR conflicted-file.ts     # fix each region, remove all markers
git add conflicted-file.ts     # marks it resolved

# Then finish the operation you were in the middle of:
git merge --continue           # (during a merge)
git rebase --continue          # (during a rebase)

# Or bail out and return to the pre-operation state:
git merge --abort
git rebase --abort
```

## `--ours` / `--theirs` (and the rebase gotcha)

To take one whole side of a conflicting file instead of hand-editing:

```bash
git checkout --ours  file.ts   # keep our version
git checkout --theirs file.ts  # keep their version
git add file.ts
# (modern equivalent: git restore --ours / --theirs file.ts)
```

**The rebase inversion gotcha:** during a *merge*, "ours" = the branch you're on. During a *rebase*, the meanings **swap** — rebase replays your commits *onto* the target, so Git treats the target (the branch you're rebasing onto) as "ours" and your replayed commits as "theirs." So mid-rebase, `--theirs` is *your* work and `--ours` is the upstream you're landing on. Get this backwards and you'll discard exactly the side you meant to keep. When unsure, open the file and look at the markers rather than trusting the label.

## `rerere` — reuse recorded resolution

If you resolve the same conflict repeatedly (long-lived branch, repeated rebases, conflicting cherry-picks), enable rerere so Git records how you resolved a given conflict and **auto-replays that resolution** next time the identical conflict appears:

```bash
git config --global rerere.enabled true
```

After that, you resolve a conflict once; the next time the same hunk conflicts, Git applies your prior resolution automatically and just asks you to confirm with `git add`. It's a pure win for rebase-heavy workflows — turn it on globally.

## Merge strategies and options

The default strategy is **`ort`** ("Ostensibly Recursive's Twin," replaced the old `recursive` strategy years ago) — faster and correct on tricky rename/criss-cross merges. You rarely name it explicitly. What you *do* reach for are the `-X` strategy *options* to bias auto-resolution:

```bash
git merge -X ours   feature    # on conflict, prefer OUR side (per-hunk, not whole files)
git merge -X theirs feature    # on conflict, prefer THEIR side
git merge -X ignore-all-space feature   # ignore whitespace-only conflicts
```

Note `-X ours` (an *option*, resolves conflicts in our favor) is different from the `-s ours` *strategy* (which discards the other branch's content entirely while still recording the merge).

## Custom merge drivers via `.gitattributes`

For files that should never be line-merged (lockfiles, generated assets, binary docs), define a merge driver or force a side in `.gitattributes`:

```gitattributes
package-lock.json merge=ours        # keep our version on conflict (needs a configured driver)
*.bin             -merge            # don't attempt a textual merge at all
```

A custom driver is wired in `git config merge.<name>.driver "<cmd>"`. Keep this brief — most teams only need it for lockfiles and binaries.

## `git mergetool`

To resolve conflicts in a visual 3-way tool instead of by hand:

```bash
git mergetool                  # launches your configured tool for each conflicted file
git config --global merge.tool vimdiff   # or vscode, meld, kdiff3, etc.
```

After the tool exits cleanly, the file is staged. Combine with `rerere` so repeated conflicts don't need the tool again.
