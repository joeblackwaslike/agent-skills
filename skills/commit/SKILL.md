---
name: commit
description: Use when staging and committing changes as Conventional Commits, "commit this", "commit my changes", or before pushing. Splits the diff into atomic commits when warranted.
argument-hint: "[--no-verify] [--style=simple|full] [--type=<type>]"
---

Stage the appropriate files and create one or more Conventional Commits for the current changes.

**Follow the house commit style in the `joe-stack-preferences` skill —
`references/release-management.md`, "Writing the message".** It is the single source of truth for
the format, the emoji-and-type table, scope, body and footer construction, and when to split a
diff into atomic commits. Those rules apply to every commit, not only ones made through this
command, so this file does not restate them.

## Invocation contract

- **`--no-verify`** — skip the repo's pre-commit gate. Otherwise run it (`pnpm lint && pnpm build`,
  or the project's justfile / pre-commit equivalent) and repair failures before committing. Verify
  by exit code, not by grepping output for "error".
- **`--style=simple|full`** — `simple` is the default; `full` adds body and footer. Use `full` for
  breaking changes, complex features, and fixes that need explaining.
- **`--type=<type>`** — override the auto-detected type.
- With nothing staged, stage the modified and new files. Read `git diff --cached` before composing,
  and split into atomic commits when the diff warrants it.
- **Reports:** what was committed, and why it was split if it was.
