---
source: "bd events prune --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "a3b4c7c31667ff25107c57997a176b6f7d31f48244b5c2144a15965eaae95ba8"
---

Delete events journal records with seq less than --before.

Retention is already enforced automatically: after a mutating command commits,
and on a timer in 'bd serve', bd deletes everything the floors below do not
protect. This command is for an EARLIER, on-demand cut BELOW the floors — after
a consumer has durably processed a span you do not want to wait out. It cannot
cut deeper than the floors: shrinking the retained window itself means lowering
them. The journal is clone-local operational state, so pruning never affects
issue data.

Two retention floors compose onto --before and can only reduce what a prune
removes. They bound the automatic prune and this one identically:
  events-journal-retain-days   keep every row younger than N days (default 7)
  events-journal-retain-rows   always keep the newest N rows (default 100000)

Set BOTH floors to 0 for an unbounded ledger: automatic pruning then does
nothing, and this command becomes the only thing that deletes a record. To keep
the floors but own deletion yourself, set events-journal-auto-prune false.

Note the floors are time-based and count-based — they are NOT a consumer
watermark. They protect only the recent window; a consumer that has fallen
further behind than both floors allow will be pruned past and lose records.
Consumers are responsible for tracking their own watermark (the highest seq they
have durably processed) and for sizing the floors to the longest outage they
intend to survive. Pruned history cannot be recovered from the workspace — the
journal is the only local copy. Pruning frees rows, not disk: pair it with
'dolt gc' to reclaim the space, since the table is working-set (dolt_ignored)
state that ordinary Dolt commits never garbage-collect.

Usage:
  bd events prune [flags]

Flags:
      --before int   delete records with seq less than this value
  -h, --help         help for prune

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
