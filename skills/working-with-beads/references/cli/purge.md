---
source: "bd purge --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "3583fba0c8b6690de0ba278e78150545954322629b4bee1370a4ddc38e5725de"
---

Permanently delete closed ephemeral beads and their associated data.

Closed ephemeral beads (wisps, transient molecules) accumulate rapidly and
have no value once closed. This command removes them to reclaim storage.

Deletes: issues, dependencies, labels, events, and comments for matching beads.
Skips: pinned beads, and closed beads a live bead still depends on through a
parent-child, tracks or blocks edge (a closed molecule root whose step is open,
a closed bead a live convoy tracks). Live means any status that is not done.

--wisps-plane selects by storage plane instead: every closed row stored in the
wisps table, including --no-history beads, which the default ephemeral
selection leaves to `bd prune`. It reaches durable-tier rows, so it requires
--older-than or --pattern, like `bd prune`.

--limit N caps one run at N beads, oldest-closed first, so a large backlog can
be drained in bounded transactions; --json then reports "remaining" and
"has_more". Loop while has_more is true.

--older-than takes days (7, 7d), weeks (2w) or a duration with hour precision
(36h, 168h, 90m).

To delete closed non-ephemeral beads (regular tasks, features, bugs, etc.)
use `bd prune` instead.

For full Dolt storage reclaim after deleting many rows, follow with `bd flatten`
so history can be collapsed and old chunks can be garbage-collected.

EXAMPLES:
  bd purge                           # Preview what would be purged
  bd purge --force                   # Delete all closed ephemeral beads
  bd purge --older-than 7d --force   # Only purge items closed 7+ days ago
  bd purge --pattern "*-wisp-*"      # Only purge matching ID pattern
  bd purge --older-than 36h --force  # Hour precision: closed 36+ hours ago
  bd purge --wisps-plane --older-than 168h --force
                                     # Every closed wisps-table row, incl. no-history
  bd purge --dry-run                 # Detailed preview with stats

Usage:
  bd purge [flags]

Flags:
      --dry-run             Preview what would be purged with stats
  -f, --force               Actually purge (without this, shows preview)
  -h, --help                help for purge
      --limit int           Purge at most N beads this run, oldest-closed first (0 = no limit); --json reports remaining/has_more
      --older-than string   Only purge beads closed more than N ago (e.g., 7d, 2w, 30, 36h)
      --pattern string      Only purge beads matching ID glob pattern (e.g., *-wisp-*)
      --wisps-plane         Select every closed row in the wisps table, including --no-history beads (requires --older-than or --pattern)

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
