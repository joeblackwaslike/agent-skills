---
source: "bd init-safety --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "47e35a34efb94264ec9fb5802bfdeb2568e15cd017f09afa602a032362b0c232"
---

bd init flag safety contract.

Every bd init invocation resolves project_id from exactly one explicitly
named source (local reinit, remote adoption, or a fresh mint). When the
source is ambiguous, bd init refuses.

FLAG SURFACE

  bd init                       Mint a new identity. Bootstraps from
                                origin if it has refs/dolt/data.

  bd init --reinit-local        Re-initialize local .beads/ over existing
                                local data. Does NOT authorize discarding
                                remote history. If origin has Dolt data
                                this will refuse — pair with
                                --discard-remote to override.

  bd init --reinit-local \      Discard the remote's Dolt history and
      --discard-remote          replace it with the local reinit. First
                                bd dolt push after this will be a
                                history-replacing force-push.

  bd init --force               Deprecated alias for --reinit-local.
                                Kept working for ≥2 releases.

  bd init --from-jsonl          Import from configured import.path. If
                                origin has Dolt data, this refuses unless
                                --discard-remote authorizes replacing that
                                remote history.

ADOPTING A REMOTE

  If you want to use the remote's existing history, use:

      bd bootstrap

  bd init will automatically suggest this when a remote is detected.

DESTROY-TOKEN (non-interactive only)

  When running with no TTY (CI, agents, piped input), a destructive
  re-init requires an explicit --destroy-token value. That covers both
  --discard-remote and --reinit-local over existing issues. The token
  format is:

      DESTROY-<issue-prefix>

  For example, if your issue prefix is "bd", the token is "DESTROY-bd":

      bd init --reinit-local --discard-remote --destroy-token=DESTROY-bd

  In interactive (TTY) mode you confirm via a typed prompt instead. The
  token is not echoed by bd's runtime error messages — this is a
  deliberate guard against pattern-matched one-liners (see
  engdocs/adr/0002-init-safety-invariants.md).

EXIT CODES

  10    refused: remote has Dolt history and you selected local history
        without --discard-remote
  11    refused: existing local data and you declined the destroy confirm
        (interactive mode only)
  12    refused: destructive re-init (--discard-remote, or --reinit-local
        over existing issues) without a valid --destroy-token
        (non-interactive mode); also returned when the interactive
        --discard-remote typed-token confirmation is declined

RECOVERY

  If you hit a refusal, see docs/recovery/init-safety.md for step-by-step recovery
  playbooks for each exit code.


Usage:
  bd init-safety [flags]

Flags:
  -h, --help   help for init-safety

Global Flags:
      --actor string              Actor name for audit trail (default: $BEADS_ACTOR, git user.name, $USER)
      --cpu-profile               Generate CPU profile for performance analysis
      --database string           Run against a different server database for this invocation, without changing the project's configured database (proxied-server mode only)
      --db string                 Database path (default: auto-discover .beads/*.db). In proxied-server mode, a value that isn't an existing path is treated as a database name override (see --database)
  -C, --directory string          Change to this directory before running the command (like git -C)
      --dolt-auto-commit string   Dolt auto-commit policy (off|on|batch). 'on': commit after each write. 'batch': defer commits to bd dolt commit; uncommitted changes persist in the working set until then (a live batch-mode bd process also flushes on SIGTERM/SIGHUP, except in proxied-server mode, where bd dolt commit is the only flush point). In proxied-server mode the deferral covers the writes the CLI makes on that route, including config and version metadata; explicit commit points (bd batch, bd mol bond/pour/squash, bd mol wisp create, and the wisp half of bd mol burn) still commit, and a bd serve process on the same database is unaffected. Default: on. Override via config key dolt.auto-commit
      --global                    Use the global shared-server database (beads_global)
      --ignore-schema-skew        Proceed despite forward schema drift (some queries may fail)
      --json                      Output in JSON format
      --mem-profile string        Write heap profile to FILE on exit (also respects BEADS_MEM_PROFILE)
      --no-color                  Disable color output (also: NO_COLOR=1 or CLICOLOR=0)
  -q, --quiet                     Suppress non-essential output (errors only)
      --readonly                  Read-only mode: block write operations (for worker sandboxes)
      --sandbox                   Sandbox mode: disables Dolt auto-push
  -v, --verbose                   Enable verbose/debug output
