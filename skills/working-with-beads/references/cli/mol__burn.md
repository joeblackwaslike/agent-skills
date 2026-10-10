---
source: "bd mol burn --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "29036e9e96426041ef145c8add796adada36cfd167b1be8f6bcadae68ab179ef"
---

Burn a molecule, deleting it without creating a digest.

Unlike squash (which creates a permanent digest before deletion), burn
completely removes the molecule with no trace. Use this for:
  - Abandoned patrol cycles
  - Crashed or failed workflows
  - Test/debug molecules you don't want to preserve

The burn operation differs based on molecule phase:
  - Wisp (ephemeral): Direct delete
  - Mol (persistent): Cascade delete (syncs to remotes)

CAUTION: This is a destructive operation. The molecule's data will be
permanently lost. If you want to preserve a summary, use 'bd mol squash'.

Example:
  bd mol burn bd-abc123              # Delete molecule with no trace
  bd mol burn bd-abc123 --dry-run    # Preview what would be deleted
  bd mol burn bd-abc123 --force      # Skip confirmation
  bd mol burn bd-a1 bd-b2 bd-c3      # Batch delete multiple wisps

Usage:
  bd mol burn <molecule-id> [molecule-id...] [flags]

Flags:
      --dry-run   Preview what would be deleted
      --force     Skip confirmation prompt
  -h, --help      help for burn

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
