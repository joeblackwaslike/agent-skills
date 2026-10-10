---
source: "bd formula schema --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "70203d91b6a06fe1999a8b67ddd6ad02ac1dec55b48b5e6f05f0dccba73fef2b"
---

Show the formula schema index: every exported struct declared
in a .formula.toml/.formula.json, with field names, types, and tags.

The index is generated from internal/formula/types.go via go:generate; the
struct definitions are the source of truth, so this list cannot drift. It is
structural reference, not proof that every declared runtime behavior is wired.

Examples:
  bd formula schema                 # list every declared schema struct
  bd formula schema loop            # show LoopSpec fields
  bd formula primitives gate        # alias; shows Gate fields
  bd formula schema --json          # machine-readable index

Curated smoke-tested fixtures for wired primitives live in
examples/formulas/primitives/ (with a smoke harness that proves they work).

Usage:
  bd formula schema [primitive] [flags]

Aliases:
  schema, primitives

Flags:
  -h, --help   help for schema

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
