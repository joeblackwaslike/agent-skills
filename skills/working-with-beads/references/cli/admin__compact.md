---
source: "bd admin compact --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "40efa3ff89055e52827f8ef77ee612b040d0784b0eb87ed8998f448b8fe99d18"
---

Compact old closed issues using semantic summarization.

Compaction reduces database size by summarizing closed issues that are no longer
actively referenced. This is permanent graceful decay - original content is discarded.

Modes:
  - Analyze: Export candidates for agent review (no API key needed)
  - Apply: Accept agent-provided summary (no API key needed)
  - Auto: AI-powered compaction (requires ANTHROPIC_API_KEY, MINIMAX_API_KEY, or ai.api_key)
  - Dolt: Run Dolt garbage collection (for Dolt-backend repositories)

Tiers:
  - Tier 1: Semantic compression (30 days closed, 70% reduction)
  - Tier 2: Ultra compression (90 days closed) - planned, not yet implemented

Dolt Garbage Collection:
  With auto-commit per mutation, Dolt commit history grows over time. Use
  --dolt to run Dolt garbage collection and reclaim disk space.

  --dolt: Run Dolt GC on .beads/dolt directory to free disk space.
          This removes unreachable commits and compacts storage.

Examples:
  # Dolt garbage collection
  bd compact --dolt                        # Run Dolt GC
  bd compact --dolt --dry-run              # Preview without running GC

  # Agent-driven workflow (recommended)
  bd compact --analyze --json              # Get candidates with full content
  bd compact --apply --id bd-42 --summary summary.txt
  bd compact --apply --id bd-42 --summary - < summary.txt

  # AI-powered workflow
  bd compact --auto --dry-run              # Preview candidates
  bd compact --auto --all                  # Compact all eligible issues
  bd compact --auto --id bd-42             # Compact specific issue
  MINIMAX_API_KEY=... bd compact --auto --all

  # Statistics
  bd compact --stats                       # Show statistics


Usage:
  bd admin compact [flags]

Flags:
      --actor string     Actor name for audit trail (default "agent")
      --all              Process all candidates
      --analyze          Analyze mode: export candidates for agent review
      --apply            Apply mode: accept agent-provided summary
      --auto             Auto mode: AI-powered compaction
      --batch-size int   Issues per batch (default 10)
      --dolt             Dolt mode: run Dolt garbage collection on .beads/dolt
      --dry-run          Preview without compacting
      --force            Force compact (bypass checks, requires --id)
  -h, --help             help for compact
      --id string        Compact specific issue
      --json             Output JSON format
      --limit int        Limit number of candidates (0 = no limit)
      --stats            Show compaction statistics
      --summary string   Path to summary file (use '-' for stdin)
      --tier int         Compaction tier (only tier 1 is implemented) (default 1)
      --workers int      Parallel workers (default 5)

Global Flags:
      --cpu-profile               Generate CPU profile for performance analysis
      --database string           Run against a different server database for this invocation, without changing the project's configured database (proxied-server mode only)
      --db string                 Database path (default: auto-discover .beads/*.db). In proxied-server mode, a value that isn't an existing path is treated as a database name override (see --database)
  -C, --directory string          Change to this directory before running the command (like git -C)
      --dolt-auto-commit string   Dolt auto-commit policy (off|on|batch). 'on': commit after each write. 'batch': defer commits to bd dolt commit; uncommitted changes persist in the working set until then (a live batch-mode bd process also flushes on SIGTERM/SIGHUP, except in proxied-server mode, where bd dolt commit is the only flush point). In proxied-server mode the deferral covers the writes the CLI makes on that route, including config and version metadata; explicit commit points (bd batch, bd mol bond/pour/squash, bd mol wisp create, and the wisp half of bd mol burn) still commit, and a bd serve process on the same database is unaffected. Default: on. Override via config key dolt.auto-commit
      --global                    Use the global shared-server database (beads_global)
      --ignore-schema-skew        Proceed despite forward schema drift (some queries may fail)
      --mem-profile string        Write heap profile to FILE on exit (also respects BEADS_MEM_PROFILE)
      --no-color                  Disable color output (also: NO_COLOR=1 or CLICOLOR=0)
  -q, --quiet                     Suppress non-essential output (errors only)
      --readonly                  Read-only mode: block write operations (for worker sandboxes)
      --sandbox                   Sandbox mode: disables Dolt auto-push
  -v, --verbose                   Enable verbose/debug output
