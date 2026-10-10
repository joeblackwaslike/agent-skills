---
source: "bd mol pour --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "ace64b13a594369b3b579e0ab07e551a748f3c731700f6d1f03d5983adbf2c77"
---

Pour a proto into a persistent mol - like pouring molten metal into a mold.

This is the chemistry-inspired command for creating PERSISTENT work from templates.
The resulting mol is stored as persistent beads in the issue database and
syncs like any other bead (bd dolt push / pull).

Phase transition: Proto (solid) -> pour -> Mol (liquid)

WHEN TO USE POUR vs WISP:
  pour (liquid): Persistent work that needs audit trail
    - Feature implementations spanning multiple sessions
    - Work you may need to reference later
    - Anything worth preserving in git history

  wisp (vapor): Ephemeral work that auto-cleans up
    - Release workflows (one-time execution)
    - Operational loops and recurring cycles
    - Health checks and diagnostics
    - Any operational workflow without audit value

TIP: Formulas can specify phase:"vapor" to recommend wisp usage.
     If you pour a vapor-phase formula, you'll get a warning.

Examples:
  bd mol pour mol-feature --var name=auth    # Persistent feature work
  bd mol pour mol-review --var pr=123        # Persistent code review

Usage:
  bd mol pour <proto-id> [flags]

Flags:
      --assignee string      Assign the root issue to this agent/user
      --attach strings       Proto to attach after spawning (repeatable)
      --attach-type string   Bond type for attachments: sequential, parallel, or conditional (default "sequential")
      --dry-run              Preview what would be created
  -h, --help                 help for pour
      --var stringArray      Variable substitution (key=value)

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
