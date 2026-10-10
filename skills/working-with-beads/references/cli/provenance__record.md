---
source: "bd provenance record --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "6b169188f168e33d7eb6f16a679f4f6090c96b18324108d33c9e2a6cb9d3a96c"
---

Record a provenance event. The event is appended idempotently: a
deterministic id is computed from source:issue:kind:(ref or --at), so re-running
the same record is a no-op.

An event recorded without --ref requires --at so the id is caller-owned.

Usage:
  bd provenance record --issue <id> --kind <k> --source <s> [flags]

Flags:
      --actor string      opaque actor identifier (optional)
      --at string         event-time as RFC3339 (required for ref-less kinds)
  -h, --help              help for record
      --issue string      issue id (required)
      --kind string       event kind: cut|claim|suspend|resume|handoff|commit|land|used (required)
      --payload string    opaque payload, e.g. JSON (optional)
      --ref string        opaque external reference, e.g. a SHA or PR url (optional)
      --ref-kind string   ref kind: git-sha|pr|work-id|transcript|branch (optional)
      --source string     producer of the event, e.g. git-hook, orchestrator (required)

Global Flags:
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
