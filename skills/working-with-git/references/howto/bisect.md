# Bisecting to Find a Bad Commit

`git bisect` binary-searches your history to pinpoint the exact commit that introduced a regression. Given one known-bad and one known-good commit, it checks out the midpoint, you (or a script) judge it, and it halves the remaining range each round — log2(N) tests instead of N.

## Manual bisect

```bash
git bisect start
git bisect bad                  # current HEAD is broken
git bisect good v2.3.0          # this tag/sha was known good

# Git checks out the midpoint and prints "Bisecting: 337 revisions left..."
# Build/test the checked-out tree, then mark it:
git bisect good                 # this revision works
#   ...or...
git bisect bad                  # this revision is broken

# Repeat until Git prints "<sha> is the first bad commit"
git bisect reset                # ALWAYS finish with this — returns you to your original HEAD
```

`git bisect reset` restores the commit you were on before `start`. Forgetting it leaves you in a detached, mid-bisection state. To land somewhere specific: `git bisect reset <commit>`.

## Automated bisect with a script

If a command can decide good vs. bad, let Git drive the whole thing:

```bash
git bisect start HEAD v2.3.0 --   # bad=HEAD, good=v2.3.0, in one line
git bisect run npm test           # or: make, ./test.sh, pytest -q, cargo test...
git bisect reset
```

`git bisect run` invokes the command at each step and reads its **exit code**:

| Exit code        | Meaning                                                            |
| ---------------- | ------------------------------------------------------------------ |
| `0`              | good / old                                                         |
| `1`–`127` (except `125`) | bad / new                                                  |
| `125`            | **untestable — skip this commit** (e.g. it doesn't build)          |
| `126`, `127`     | shell "not executable" / "command not found" — treated as bad (1–127) but usually signal a broken invocation |
| anything else (`128`–`255`) | **abort** the whole bisect (e.g. `exit -1` becomes 255) |

So a plain test runner already works: it exits 0 on pass, non-zero on fail. The thing to get right is the `125` skip code for commits that can't even be evaluated.

### A robust runner script

```bash
#!/usr/bin/env bash
# bisect-run.sh — exit 125 if we can't build, 0 if the bug is absent, 1 if present
set -u

# Skip commits that don't even compile/install
npm ci --silent || exit 125
npm run build --silent || exit 125

# The actual judgment: 0 = good, 1 = bad
npm test --silent -- path/to/regression.test.ts
```

```bash
git bisect start HEAD v2.3.0 --
git bisect run ./bisect-run.sh
git bisect reset
```

Tip — you can inline a single command without a script file:

```bash
git bisect run sh -c '! grep -q "panic" <(./run-once 2>&1)'
```

## Skipping untestable commits

When a midpoint can't be judged (won't build, unrelated breakage), skip it manually:

```bash
git bisect skip                 # skip the current commit
git bisect skip v2.5..v2.6      # skip a whole range
```

Git picks a nearby commit instead. Caveat: if you skip a commit *adjacent* to the culprit, the final answer may be "one of these commits" rather than a single SHA.

## Custom terms (old/new) for non-bug searches

Bisect isn't only for breakage — use it to find when *any* property changed (a perf regression, a behavior that appeared). "good/bad" gets confusing then, so rename the endpoints:

```bash
git bisect start --term-old fast --term-new slow
git bisect slow                 # current is slow
git bisect fast v2.3.0          # this one was fast
# or the built-in old/new aliases:
git bisect old <rev>            # state before the change
git bisect new <rev>            # state after the change

git bisect terms                # remind yourself which term means what
```

You can't mix good/bad with old/new in one session.

## Narrowing and resuming

```bash
# Restrict the search to commits touching certain paths — fewer steps
git bisect start HEAD v2.3.0 -- src/parser/ include/parser.h

# Follow only the first parent (treats a merged branch's internals as one unit)
git bisect start --first-parent HEAD v2.3.0
```

## Reviewing, undoing, and replaying

```bash
git bisect visualize            # view remaining suspects (gitk if GUI available, else git log)
git bisect log                  # show every good/bad decision so far
```

If you mislabeled a commit, don't start over — edit the log and replay:

```bash
git bisect log > bisect.log     # save the decisions
$EDITOR bisect.log              # delete the wrong line(s)
git bisect reset
git bisect replay bisect.log    # re-run from the corrected record
```

`git bisect replay` also lets you reproduce or share a bisection session deterministically.
