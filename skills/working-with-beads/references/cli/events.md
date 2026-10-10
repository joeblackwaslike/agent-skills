---
source: "bd events --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "ee8624f8746d6659f2e86672bf5a1197e171648415b02b5db7a298c29b756425"
---

Read and manage the durable events journal (bd_events_journal).

The journal records every committed issue mutation as an ordered, replayable
row. Enable it with 'bd config set events-journal true' (or
BD_EVENTS_JOURNAL=1). Records are emitted only while it is enabled.

Retention is automatic: an enabled journal is bounded to the retention floors
(events-journal-retain-days / -rows, 7 days / 100k rows by default) without
anyone running a command. Disable both floors for an unbounded ledger, or
events-journal-auto-prune for manual control; 'bd events prune' remains for an
earlier, on-demand cut below the floors.

Coverage and scope:
  - Every mutation through bd's normal write paths (create, update, close,
    reopen, delete, claim, dependency add/remove, label add/remove, comment) is
    journaled in the same transaction as the change. Raw DML run through
    'bd sql' bypasses those paths and is NOT journaled — a known non-coverage.
  - The journal is per-branch working-set state (dolt_ignored): it records the
    mutations committed on the writer's active branch. Rows arrive by direct
    write, not by merge, so a consumer must read the journal on the same branch
    the writer commits to; a branch checkout or merge does not carry journal
    rows across branches.
  - For the same reason the journal is per REPLICA. 'bd dolt pull' and the
    changes a merge settles into this clone are not journaled: those rows
    arrived as data, not as local mutations, and nothing on this clone wrote
    them through the mutation seam. A consumer that mirrors a synced workspace
    must re-baseline (a fresh export or a full re-read) after a sync, because
    the journal describes only what THIS clone mutated.
    Each replica also has its OWN seq space, counted from its own first
    mutation. A checkpoint taken against one replica is meaningless against
    another — the same seq names a different record, and a seq above the other
    replica's head reads as "caught up" and stalls forever. Track a checkpoint
    per replica, and re-baseline rather than carry one across.
  - A few writes that happen while a store is being OPENED are unjournaled by
    design: schema migrations and the version reconciliation that runs before
    the workspace's configuration has been applied to the store. They touch
    schema and clone-local metadata, never a bead, so a replaying consumer has
    nothing to apply them to.
  - Dependency records are not symmetric, in two ways.
    Count: a dep_add is emitted for every accepted add, INCLUDING an idempotent
    same-type re-add that only refreshes the edge's metadata. The audit 'events'
    table deduplicates that case and writes nothing; the journal does not. Treat
    dep_add as an upsert of the edge, not as proof the edge is new. A dep_remove
    naming an edge that is already gone emits nothing at all.
    Payload: dep.metadata differs in provenance between the two ops. On dep_add
    it is the value being written, as the caller supplied it; on dep_remove it is
    the raw stored column read back just before the delete. The two can differ
    byte for byte while meaning the same thing, so compare parsed values.

Structural dependency edits — the ones bd wires up itself rather than a 'bd dep'
verb — write no audit event but DO journal, by design: a replaying consumer
needs the edge either way.

Usage:
  bd events [command]

Available Commands:
  export      Print the entire journal from the beginning (JSON lines)
  prune       Delete journal records below a sequence number (retention)
  tail        Print journal records after a sequence number (JSON lines)

Flags:
  -h, --help   help for events

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

Use "bd events [command] --help" for more information about a command.
