---
source: "bd gate check --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "7278ebe276072e4f5f24a8ed6c54b96649b5d99f4a6dd6a8ca25c1b8d23d8cb9"
---

Evaluate gate conditions and automatically close resolved gates.

By default, checks all open gates. Use --type to filter by gate type.

Gate types:
  gh       - Check all GitHub gates (gh:run and gh:pr)
  gh:run   - Check GitHub Actions workflow runs
  gh:pr    - Check pull request merge status
  timer    - Check timer gates (auto-expire based on timeout)
  bead     - Check cross-rig bead gates
  all      - Check all gate types

GitHub gates use the 'gh' CLI to query status:
  - gh:run checks 'gh run view <id> --json status,conclusion'
  - gh:pr checks 'gh pr view <id> --json state,title'

A gate is resolved when:
  - gh:run: status=completed AND conclusion=success
  - gh:pr: state=MERGED
  - timer: current time > created_at + timeout
  - bead: target bead status=closed

A gate is escalated when:
  - gh:run: status=completed AND conclusion in (failure, canceled)
  - gh:pr: state=CLOSED

Examples:
  bd gate check              # Check all gates
  bd gate check --type=gh    # Check only GitHub gates
  bd gate check --type=gh:run # Check only workflow run gates
  bd gate check --type=timer # Check only timer gates
  bd gate check --type=bead  # Check only cross-rig bead gates
  bd gate check --dry-run    # Show what would happen without changes
  bd gate check --escalate   # Escalate expired/failed gates

Usage:
  bd gate check [flags]

Flags:
      --dry-run       Show what would happen without making changes
  -e, --escalate      Escalate failed/expired gates
  -h, --help          help for check
  -l, --limit int     Limit results (default 100) (default 100)
  -t, --type string   Gate type to check (gh, gh:run, gh:pr, timer, bead, all)

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
