---
source: "bd sql --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "392fb2b6d30ca674f28199b50f5b60edb11c6a7dbc013ab5cf986205f454e131"
---

Execute a raw SQL query against the underlying database (Dolt).

Useful for debugging, maintenance, and working around bugs in higher-level commands.

Examples:
  bd sql 'SELECT COUNT(*) FROM issues'
  bd sql 'SELECT id, title FROM issues WHERE status = "open" LIMIT 5'
  bd sql 'DELETE FROM dirty_issues WHERE issue_id = "bd-abc123"'
  bd sql --csv 'SELECT id, title, status FROM issues'

The query is passed directly to the database. Reads (SELECT, WITH ... SELECT,
SHOW, EXPLAIN) return results as a table (or JSON/CSV with --json/--csv). Writes
(INSERT, UPDATE, DELETE, DDL) report the number of rows affected. Statements
that may both write and return rows, such as CALL, are committed and print any
rows they return (or "OK").

In proxied-server mode, multiple statements separated by ';' run as a single
committed batch and report "OK", and --database runs the query against a
different server database (equivalent to a session USE) without changing the
project's configured database.

WARNING: Direct database access bypasses the storage layer. Use with caution.

Usage:
  bd sql <query> [flags]

Flags:
      --csv    Output results in CSV format
  -h, --help   help for sql

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
