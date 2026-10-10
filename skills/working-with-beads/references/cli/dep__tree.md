---
source: "bd dep tree --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "1f0430416451f01054b20d2f862992e65fe9c4365c5b1988a3ddd3f8edb54c29"
---

Show dependency tree rooted at the given issue.

By default, shows dependencies (what blocks this issue). Use --direction to control:
  - down: Show dependencies (what blocks this issue) - default
  - up:   Show dependents (what this issue blocks)
  - both: Show full graph in both directions

Examples:
  bd dep tree gt-0iqq                    # Show what blocks gt-0iqq
  bd dep tree gt-0iqq --direction=up     # Show what gt-0iqq blocks
  bd dep tree gt-0iqq --status=open      # Only show open issues
  bd dep tree gt-0iqq --depth=3          # Limit to 3 levels deep

A node reached by two paths is shown ONCE, under the first path that got
there, and a cycle simply ends the descent. --show-all-paths is a deprecated
no-op; use 'bd dep cycles' to find circular dependencies.

--max-rows / BEADS_MAX_ROWS caveat: the tree walk has no query filter to
thread the cap through, so the full tree is always built first and the
node count is checked afterward (post-hoc), not during the walk. The cap is
honored on the --proxied-server route too, which it was not before.

Usage:
  bd dep tree [issue-id] [flags]

Flags:
      --direction string   Tree direction: 'down' (dependencies), 'up' (dependents), or 'both'
      --format string      Output format: 'mermaid' for Mermaid.js flowchart
  -h, --help               help for tree
  -d, --max-depth int      Maximum tree depth to display (safety limit) (default 50)
      --max-rows int       Hard upper bound on rows returned. Returns a non-zero exit (code 2) and an error to stderr if exceeded. 0 disables (the default). Overrides BEADS_MAX_ROWS for this invocation. Useful in CI/agent rigs that want a circuit breaker against pathological queries. Honored on both the direct and the --proxied-server route.
      --reverse            Show dependent tree (deprecated: use --direction=up)
      --show-all-paths     Deprecated no-op: accepted and ignored. A node reached by two paths is shown once, under the first.
      --status string      Filter to only show issues with this status (open, in_progress, blocked, deferred, closed)

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
