# Shell scripts (Bash and zsh)

> Use when the diff: Changes scripts, container images, Terraform, Kubernetes, Compose, CI or application config

*Leans on: Fail Fast, KISS, least privilege, explicit over implicit.*

Shell scripts run with full user privileges, often unattended, and fail in quiet ways. The `engineering-principles` skill's `language-notes.md` covers shell idioms and the differences between Bash and zsh; this is the review pass.

- **Should it be shell?** Glue around commands is fine. Past roughly a hundred lines, or once it needs data structures, JSON handling beyond `jq` one-liners, or careful error recovery, ask for Python or TypeScript.
- **Interpreter and strict mode.** A shebang for the shell the script is written for (`#!/usr/bin/env bash`, `#!/bin/zsh`), and strict mode at the top (`set -euo pipefail`). Know its gaps: `set -e` is ignored inside a function called from `if`, `&&` or `||`, and `local x=$(cmd)` hides a failed command.
- **Linted.** ShellCheck passes for Bash and POSIX sh, with each disabled check justified inline. ShellCheck doesn't support zsh, so zsh scripts get `zsh -n` and a closer read.
- **Quoting.** Every expansion quoted (`"$var"`, `"$@"`, `"${arr[@]}"`) unless splitting is intended and commented. An unquoted variable in `rm`, `mv` or `cp` is a blocker.
- **Destructive commands.** `rm -rf` guarded against empty or unset variables (`"${dir:?}"`), `--` before arguments that could start with a dash, and a dry-run mode for anything that deletes or rewrites many files.
- **Inputs and environment.** Arguments validated, with a usage message and a non-zero exit. Required environment variables checked up front. Scripts run by cron, launchd, systemd or CI don't get your interactive shell: `PATH`, `HOME` and tool locations are set explicitly.
- **Temp files and cleanup.** `mktemp` instead of fixed paths in `/tmp`, removed by `trap ... EXIT`.
- **Idempotent.** Running twice is safe: `mkdir -p`, `ln -sfn`, checks before creating, and appends that don't duplicate lines.
- **Structured data.** `jq` for JSON, never `grep`, `sed` or `awk` over JSON text, and no inline Python one-liners to parse it.
- **Secrets.** Not passed as command-line arguments (visible in `ps`), not echoed, not logged, and `set -x` is off around them.
- **Downloads.** No `curl ... | sh`. Download, verify a checksum or signature, then run.
- **Output and exit codes.** Diagnostics to stderr, data to stdout, meaningful exit codes, `--help`, and a `main` function for anything longer than a screen.
- **Tested.** Non-trivial scripts have Bats tests, or at least a CI job that runs them against a fixture.
