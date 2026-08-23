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

## Exception — a repo that IS the running session's live config

Work directly on `main` (no worktree) in a repo whose working tree is symlinked into the
config of the tool currently executing — e.g. an agent-instructions repo whose `AGENTS.md` or
skill/command files resolve into `~/.claude`, `~/.codex`, or `~/.gemini` by symlink. The files
in that repo are not a copy of the live config — they *are* it. (Reference case: Joe's
`agent-harness` repo, where `dist/AGENTS.md`, `commands/`, and `agents/` are symlink targets.)

Both halves of the usual worktree benefit invert:

- **A branch switch mutates the running agent.** `git checkout` in this tree swaps
  `AGENTS.md` and every command out from under a session that has already loaded them,
  mid-task. The isolation a worktree normally provides is precisely what breaks here.
- **A worktree's copy of a live-config file is a separate filesystem object, so nothing in it
  is testable.** The external symlinks (`~/.claude/AGENTS.md` and siblings) resolve to an
  absolute path in the *main* checkout, not to whichever worktree happens to exist — so even
  in a repo whose own tracked files are symlinks, a new worktree's copy is a distinct object at
  a different path and never becomes the live file. Changes made there are inert until merged,
  which means the edit-verify loop that catches a broken symlink or a bad render cannot run at
  all. Verification is the reason the worktree rule exists; here it defeats it.

The MANDATORY half still holds without modification: never run concurrent agents against a
live-config repo's tree. Serialize instead — the exception is about a single agent forgoing
worktree isolation, not about making a shared tree safe for parallel work.
