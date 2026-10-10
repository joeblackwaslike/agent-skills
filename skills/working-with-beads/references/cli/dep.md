---
source: "bd dep --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "eb0c228b258fd5586976788f03af4fd108fd437595f495486ce2952ced32ec05"
---

Manage dependencies between issues.

When called with an issue ID and --blocks flag, creates a blocking dependency:
  bd dep <blocker-id> --blocks <blocked-id>

This is equivalent to:
  bd dep add <blocked-id> <blocker-id>

Examples:
  bd dep bd-xyz --blocks bd-abc    # bd-xyz blocks bd-abc
  bd dep add bd-abc bd-xyz         # Same as above (bd-abc depends on bd-xyz)

Usage:
  bd dep [issue-id] [flags]
  bd dep [command]

Available Commands:
  add         Add a dependency
  cycles      Detect dependency cycles
  list        List dependencies or dependents of one or more issues
  relate      Create a bidirectional relates_to link between issues
  remove      Remove a dependency
  tree        Show dependency tree
  unrelate    Remove a relates_to link between issues

Flags:
  -b, --blocks string    Issue ID that this issue blocks (shorthand for: bd dep add <blocked> <blocker>)
  -h, --help             help for dep
      --no-cycle-check   Skip per-edge cycle checks for speed (bulk wiring); bulk --file adds still run one final whole-graph check before commit

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

Use "bd dep [command] --help" for more information about a command.
