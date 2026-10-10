---
source: "bd graph --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "6582c54cb1a6ed5eecb136a8f9e53fd6027b136edf0526b2e9d06181a5638f6f"
---

Display a visualization of an issue's dependency graph.

For epics, shows all children and their dependencies.
For regular issues, shows the issue and its direct dependencies.

With --all, shows all open issues grouped by connected component.
With --open, filters to only open/actionable issues (compact layer format).

Display formats:
  (default)        DAG with columns and box-drawing edges (terminal-native)
  --box            ASCII boxes showing layers, more detailed
  --compact        Tree format, one line per issue, more scannable
  --dot            Graphviz DOT format (pipe to dot -Tsvg > graph.svg)
  --html           Self-contained interactive HTML with D3.js visualization
  --open           Open issues only, compact layers (LLM-friendly)

The graph shows execution order:
- Layer 0 / leftmost = no dependencies (can start immediately)
- Higher layers depend on lower layers
- Nodes in the same layer can run in parallel

Status icons: ○ open  ◐ in_progress  ● blocked  ✓ closed  ❄ deferred

Examples:
  bd graph issue-id              # Terminal DAG visualization (default)
  bd graph --box issue-id        # ASCII boxes with layer grouping
  bd graph --dot issue-id | dot -Tsvg > graph.svg  # SVG via Graphviz
  bd graph --dot issue-id | dot -Tpng > graph.png  # PNG via Graphviz
  bd graph --html issue-id > graph.html  # Interactive browser view
  bd graph --all --html > all.html       # All issues, interactive
  bd graph --open issue-id       # Open issues only, layered by blocking order
  bd graph --all --open          # All open issues, compact layers

--max-rows / BEADS_MAX_ROWS caveat: the cap is checked differently per mode.
Single-issue graphs (no --all) check the connected-component node count
after the BFS traversal completes — the whole subgraph is always walked
first, then rejected if it's over cap. --all checks each status
(open/in_progress/blocked) independently, so up to 3x the cap can be loaded
in total before any individual status trips it.

Usage:
  bd graph [issue-id] [flags]
  bd graph [command]

Available Commands:
  check       Check dependency graph integrity

Flags:
      --all            Show graph for all open issues
      --box            ASCII boxes showing layers
      --compact        Tree format, one line per issue, more scannable
      --dot            Output Graphviz DOT format (pipe to: dot -Tsvg > graph.svg)
  -h, --help           help for graph
      --html           Output self-contained interactive HTML (redirect to file)
      --max-rows int   Hard upper bound on rows fetched from storage. Returns a non-zero exit (code 2) and an error to stderr if exceeded. 0 disables (the default). Overrides BEADS_MAX_ROWS for this invocation. Useful in CI/agent rigs that want a circuit breaker against pathological queries. Not supported under --proxied-server: an explicit --max-rows or BEADS_MAX_ROWS cap errors out rather than silently going unenforced.
      --open           Show only open issues (filters out closed/deferred), forces compact layer format

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

Use "bd graph [command] --help" for more information about a command.
