---
source: "bd gate --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "0bfc8a756cdbc63633fced4c4b19911a3f97e0f7d0a3948eab0dabdcfbad1760"
---

Gates are async wait conditions that block workflow steps.

Gates are created automatically when a formula step has a gate field.
They must be closed (manually or via watchers) for the blocked step to proceed.

Gate types:
  human   - Requires manual bd close (Phase 1)
  timer   - Expires after timeout (Phase 2)
  gh:run  - Waits for GitHub workflow (Phase 3)
  gh:pr   - Waits for PR merge (Phase 3)
  bead    - Waits for another bead to close (Phase 4)

For bead gates, await_id may be a bead ID in this rig's database (e.g.,
"bd-abc123") or the historical cross-rig form <rig>:<bead-id>. Cross-rig
targets resolve through the bead ID's prefix route in routes.jsonl.

Examples:
  bd gate list           # Show all open gates
  bd gate list --all     # Show all gates including closed
  bd gate check          # Evaluate all open gates
  bd gate check --type=bead  # Evaluate only bead gates
  bd gate resolve <id>   # Close a gate manually

Usage:
  bd gate [command]

Available Commands:
  add-waiter  Add a waiter to a gate
  check       Evaluate gates and close resolved ones
  create      Create a gate that blocks an issue
  discover    Discover await_id for gh:run gates
  list        List gate issues
  resolve     Manually resolve (close) a gate
  show        Show a gate issue

Flags:
  -h, --help   help for gate

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

Use "bd gate [command] --help" for more information about a command.
