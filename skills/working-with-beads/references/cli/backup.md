---
source: "bd backup --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "eba26560b210a315a39826fb9aa988fa01557a2181001c1840771ac96a9505fb"
---

Back up your beads database for off-machine recovery.

This is a Dolt-native database backup. It preserves the database state,
including tables, branches, commit history, and working-set data. This is
different from 'bd export', which writes issue records to JSONL for migration
and interoperability.

Commands:
  bd backup init <path>    Set up a backup destination (filesystem or DoltHub)
  bd backup sync           Push to configured backup destination
  bd backup restore [path] Restore from a backup directory
  bd backup remove         Remove backup destination
  bd backup status         Show backup status

DoltHub is recommended for cloud backup:
  bd backup init https://doltremoteapi.dolthub.com/<user>/<repo>
  Set DOLT_REMOTE_USER and DOLT_REMOTE_PASSWORD for authentication.

Auto-backup default:
  When backup.enabled is unset, auto-backup turns ON in embedded mode if a
  git remote exists, and stays OFF in sql-server / shared-server mode. In
  server mode many bd clients share one Dolt server, and each would register
  a server-side backup remote under the same name pointing at its own local
  dir and full-sync the whole database — a self-amplifying storm. To back up
  a shared server, run 'bd backup' explicitly (or set backup.enabled=true and
  coordinate destinations). 'bd config get backup.enabled' shows the effective
  value and its source.

  A proxied-server workspace is server mode too: auto-backup is OFF by
  default and backup.enabled=true opts in. Both the opt-in and the five
  backup verbs above are honored only on a managed-local proxied server —
  one bd started itself; on a Dolt server bd does not own they are refused.

Usage:
  bd backup [command]

Available Commands:
  init        Set up a Dolt backup destination
  remove      Remove the configured backup destination
  restore     Restore database from a Dolt backup
  status      Show last backup status
  sync        Push database to configured Dolt backup

Flags:
  -h, --help   help for backup

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

Use "bd backup [command] --help" for more information about a command.
