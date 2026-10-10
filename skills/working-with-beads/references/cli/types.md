---
source: "bd types --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "58fcd25281d26c3e138d42f8f78536fd3edada5816f9bb06bf3f8e4135e2456e"
---

List all valid issue types that can be used with bd create --type.

Core work types (bug, task, feature, chore, epic, decision, spike, story, milestone)
and system types (message, molecule, gate, event) are always valid.
Custom types are registered with 'bd config set types.custom' or declared under
types.custom in .beads/config.yaml; the list shown is exactly the set that
bd create --type accepts.

Examples:
  bd types              # List all types with descriptions
  bd types --sections   # List required sections for each type
  bd types --json       # Output as JSON


Usage:
  bd types [flags]

Flags:
  -h, --help       help for types
      --sections   Show required sections for each issue type

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
