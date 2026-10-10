---
source: "bd compact --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "28dac0218856466fa645dfa57e2cb91c1a7b29331e907d03949da5211e5601ac"
---

Squash Dolt commits older than N days into a single commit.

Recent commits (within the retention window) are preserved via cherry-pick.
This reduces Dolt storage overhead from auto-commit history while keeping
recent change tracking intact.

For semantic issue compaction (summarizing closed issues), use 'bd admin compact'.
For full history squash, use 'bd flatten'.

How it works:
  1. Identifies commits older than --days threshold
  2. Creates a squashed base commit from all old history
  3. Cherry-picks recent commits on top
  4. Swaps main branch to the compacted version
  5. Prunes remote-tracking refs (they would keep the old history alive;
     the next push or fetch re-creates them at the new tip)
  6. Runs a full Dolt GC (all storage generations) to reclaim the old history

The GC pass is a full collection: Dolt storage is generational, and a default
GC never revisits data an earlier GC moved to the old generation. On any store
that has been GC'd before (bd gc, or a previous flatten or compact), only a
full collection reclaims the squashed history. A full GC can take minutes on
multi-gigabyte stores.

Examples:
  bd compact --dry-run               # Preview: show commit breakdown
  bd compact --force                 # Squash commits older than 30 days
  bd compact --days 7 --force        # Keep only last 7 days of history
  bd compact --days 90 --force       # Conservative: squash 90+ day old commits

Usage:
  bd compact [flags]

Flags:
      --days int   Keep commits newer than N days (default 30)
      --dry-run    Preview without making changes
  -f, --force      Confirm commit squash
  -h, --help       help for compact

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
