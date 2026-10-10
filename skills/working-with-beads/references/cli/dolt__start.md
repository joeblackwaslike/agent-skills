---
source: "bd dolt start --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "858027b6c78f29f52a95342ad50707a590978f8b587096c0078bf10442827328"
---

Start a dolt sql-server for the current beads project.

The server runs in the background on a per-project port derived from the
project path. PID and logs are stored in .beads/.

The server auto-starts transparently when needed, so manual start is rarely
required. Use this command for explicit control or diagnostics.

Not available in proxied-server mode: there the proxy owns its dolt backend's
lifecycle and starts it on demand, so a server started here would be a second,
unsupervised one over the same data directory. Use 'bd dolt status' to see what
is running and 'bd dolt stop' to shut it down.

Usage:
  bd dolt start [flags]

Flags:
  -h, --help   help for start

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
