---
source: "bd orphans --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "3d2b1b6e669a3d04d99ec2dd60ff441421c03986aa255179bc42c5da965a89d5"
---

Identify orphaned issues - issues that are referenced in commit messages but remain open or in_progress in the database.

This helps identify work that has been implemented but not formally closed.

Examples:
  bd orphans              # Show orphaned issues
  bd orphans --json       # Machine-readable output
  bd orphans --details    # Show full commit information
  bd orphans --fix        # Close orphaned issues with confirmation
  bd orphans --label theme:personal             # Only orphans with this label
  bd orphans --label-any theme:personal,theme:ventures  # Orphans with either label

Usage:
  bd orphans [flags]

Flags:
      --details             Show full commit information
  -f, --fix                 Close orphaned issues with confirmation
  -h, --help                help for orphans
  -l, --label strings       Filter by labels (AND: must have ALL). Can combine with --label-any
      --label-any strings   Filter by labels (OR: must have AT LEAST ONE). Can combine with --label

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
