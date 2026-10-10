---
source: "bd mol squash --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "c03b48990af99fc28e0c7708c021e30e978922ba5eb4ef539ba084d2e935588e"
---

Squash a molecule's ephemeral children into a single digest issue.

This command collects all ephemeral child issues of a molecule (Ephemeral=true),
generates a summary digest, and promotes the wisps to persistent by
clearing their Wisp flag (or optionally deletes them).

The squash operation:
  1. Loads the molecule and all its children
  2. Filters to only wisps (ephemeral issues with Ephemeral=true)
  3. Generates a digest (summary of work done)
  4. Creates a permanent digest issue (Ephemeral=false)
  5. Clears Wisp flag on children (promotes to persistent)
     OR keeps them with --keep-children (default: delete)

AGENT INTEGRATION:
Use --summary to provide an AI-generated summary. This keeps bd as a pure
tool - the calling agent (orchestrator worker, Claude Code, etc.) is responsible
for generating intelligent summaries. Without --summary, a basic concatenation
of child issue content is used.

This is part of the wisp workflow: spawn creates wisps,
execution happens, squash compresses the trace into an outcome (digest).

Example:
  bd mol squash bd-abc123                    # Squash and promote children
  bd mol squash bd-abc123 --dry-run          # Preview what would be squashed
  bd mol squash bd-abc123 --keep-children    # Keep wisps after digest
  bd mol squash bd-abc123 --summary "Agent-generated summary of work done"

Usage:
  bd mol squash <molecule-id> [flags]

Flags:
      --dry-run          Preview what would be squashed
  -h, --help             help for squash
      --keep-children    Don't delete ephemeral children after squash
      --summary string   Agent-provided summary (bypasses auto-generation)

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
