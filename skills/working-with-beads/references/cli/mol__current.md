---
source: "bd mol current --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "4247cd71cb5258be292033cd2f181f6097074e6a19e2a11c83bd4fc259fc7379"
---

Show where you are in a molecule workflow.

If molecule-id is given, show status for that molecule.
If not given, infer from in_progress issues assigned to current agent.

The output shows all steps with status indicators:
  [done]     - Step is complete (closed)
  [current]  - Step is in_progress (you are here)
  [ready]    - Step is ready to start (unblocked)
  [blocked]  - Step is blocked by dependencies
  [pending]  - Step is waiting

For large molecules (>100 steps), a summary is shown instead.
Use --limit or --range to view specific steps:
  bd mol current <id> --limit 50       # Show first 50 steps
  bd mol current <id> --range 100-150  # Show steps 100-150

Usage:
  bd mol current [molecule-id] [flags]

Flags:
      --for string     Show molecules for a specific agent/assignee
  -h, --help           help for current
      --limit int      Maximum number of steps to display (0 = auto, use 'all' threshold)
      --range string   Display specific step range (e.g., '1-50', '100-150')

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
