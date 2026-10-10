---
source: "bd gitlab sync --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "8559877b2ca6e4c920ce41c4961e39d635e6fe29b5cf2a2e8dd273a787dc781b"
---

Synchronize issues between beads and GitLab.

By default, performs bidirectional sync:
- Pulls new/updated issues from GitLab to beads
- Pushes local beads issues to GitLab

Use --pull-only or --push-only to limit direction.

Usage:
  bd gitlab sync [flags]

Flags:
      --assignee string       Filter by assignee username
      --dry-run               Show what would be synced without making changes
      --exclude-type string   Exclude these issue types from sync (comma-separated)
  -h, --help                  help for sync
      --issues string         Comma-separated bead IDs to sync selectively (e.g., bd-abc,bd-def). Mutually exclusive with --parent.
      --label string          Filter by labels (comma-separated, AND logic)
      --milestone string      Filter by milestone title
      --no-ephemeral          Exclude ephemeral/wisp issues from push (default: true) (default true)
      --parent string         Limit push to this bead and its descendants (push only). Mutually exclusive with --issues.
      --prefer-gitlab         On conflict, use GitLab version
      --prefer-local          On conflict, keep local beads version
      --prefer-newer          On conflict, use most recent version (default)
      --project string        Filter to issues from this project ID (group mode)
      --pull-only             Only pull issues from GitLab
      --push-only             Only push issues to GitLab
      --type string           Only sync these issue types (comma-separated, e.g. 'epic,feature,task')

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
