---
source: "bd worktree remove --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "65db8c469ab6a9e366b6e73258d6755c73fbce183e17f9ae6fd791daf3479d4b"
---

Remove a registered git worktree with fail-closed safety checks.

Without --force, the target must be clean and its pinned HEAD must be contained
in either the configured upstream or the single comparator selected by
--merged-into. Comparators may be full refs, unambiguous short ref names, or
full commit object IDs. Revision expressions and worktree-local pseudorefs such
as HEAD and ORIG_HEAD are rejected.

--force skips cleanliness and containment requirements, but it does not skip
registered-identity and concurrent-change checks. --force and --merged-into
are mutually exclusive, and each flag may be specified at most once.

Worktree removal and .gitignore cleanup are not atomic. If removal succeeds but
cleanup fails, this command returns an error that explicitly reports the
worktree as removed; it does not claim or attempt a rollback.

Examples:
  bd worktree remove feature-auth                    # Check the configured upstream
  bd worktree remove feature-auth --merged-into main # Check containment in main
  bd worktree remove feature-auth --force            # Skip clean/containment checks

Usage:
  bd worktree remove <name> [flags]

Flags:
      --force                Skip cleanliness and containment checks
  -h, --help                 help for remove
      --merged-into string   Require worktree HEAD to be contained in this ref

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
