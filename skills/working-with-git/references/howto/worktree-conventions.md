# Worktree Conventions for Feature and Parallel-Agent Work

Joe's standing overrides on top of `superpowers:using-git-worktrees` (the generic skill).
Default for feature work; MANDATORY whenever running parallel agents/subagents against one
repo.

## Standing consent — never ask whether to create the worktree

`using-git-worktrees` Step 0 asks "Would you like me to set up an isolated worktree?" unless
the user "has already indicated their worktree preference in your instructions." This file is
that indication: consent is granted for every repo, permanently. Skip straight to Step 1.

Note the skill treats Step 0 consent and the Step 1b *directory* preference as two separate
branches — the `.worktrees/` default below answers only the second, so it does not suppress
the consent question on its own. Gap found 2026-08-18 auditing a superpowers upgrade; the
consent gate was added in v5.1.0 (issue #991) and earlier guidance here only ever addressed
directory selection.

## Default worktree directory: `.worktrees/`

Project-local, hidden, in every repo — unless that repo already has an established
`worktrees/` convention (use it instead) or a CLAUDE.md/AGENTS.md preference says otherwise.

- Add `.worktrees/` to `.gitignore` on first use in a repo if not already present.
- Verify with `git check-ignore -v .worktrees/<name>` against an actual created worktree
  path — checking the bare `.worktrees` directory before it exists returns a false negative
  for a trailing-slash pattern.

As of superpowers v6.0.0 the skill defaults to project-local `.worktrees/` too (the old global
`~/.config/superpowers/worktrees/` is gone), so this is agreement rather than override — still
worth stating explicitly, since the skill's priority order puts an explicit instruction above
its own default and above observed filesystem state.

## Never share a working tree across concurrent agents

NEVER run concurrent agents/subagents against the same working tree. Each gets its own
worktree so edits/stashes/resets cannot clobber each other. (A stray `git stash` from one
shared-tree agent once silently wiped a large multi-file refactor — worktrees prevent this.)

Pass this instruction to every concurrently-launched subagent: "work in your own worktree,
commit there, do not touch the parent checkout."
