---
source: "bd formula --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "91c3564fcb99e9af2b8e8c82920efb78f47d06e1bc602bc5732f0c6a9b0dca15"
---

Manage workflow formulas - the source layer for molecule templates.

Formulas are TOML/JSON files that define workflows with composition rules.
Define formulas, cook them into protos, then pour or wisp them into work.

Search paths (in order):
  1. <resolved-beads-dir>/formulas/ (active project)
  2. <checkout-root>/.beads/formulas/ (repo-local formulas)
  3. ~/.beads/formulas/ (user)
  4. $GT_ROOT/.beads/formulas/ (shared workspace root, if GT_ROOT set)

Commands:
  list    List available formulas from all search paths
  show    Show formula details, steps, and composition rules
  schema  Show the formula schema index (alias: primitives)

Discovering primitives:
  bd formula schema                 # list every declared formula struct
  bd formula schema loop            # show LoopSpec fields, types, and tags
  bd formula primitives gate        # alias; same handler as 'schema'
  examples/formulas/primitives/     # curated, smoke-tested wired fixtures
  docs/workflows/formulas.md          # narrative reference

Usage:
  bd formula [command]

Available Commands:
  convert     Convert formula from JSON to TOML
  list        List available formulas
  schema      Show the formula schema index (every exported struct in types.go)
  show        Show formula details

Flags:
  -h, --help   help for formula

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

Use "bd formula [command] --help" for more information about a command.
