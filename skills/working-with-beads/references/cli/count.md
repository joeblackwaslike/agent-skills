---
source: "bd count --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "3c23f1093f9cba91479f9ca5a4ddf99a5c1e7b8711bd70e7f16b5f3ce251f322"
---

Count issues matching the specified filters.

By default, returns the total count of issues matching the filters.
Use --by-* flags to group counts by different attributes.

Examples:
  bd count                          # Count all issues
  bd count --status open            # Count open issues
  bd count --by-status              # Group count by status
  bd count --by-priority            # Group count by priority
  bd count --by-type                # Group count by issue type
  bd count --by-assignee            # Group count by assignee
  bd count --by-label               # Group count by label
  bd count --assignee alice --by-status  # Count alice's issues by status
  bd count --include-infra          # Count issues + wisps tier (matches 'bd list --include-infra --all' cardinality)


Usage:
  bd count [flags]

Flags:
  -a, --assignee string         Filter by assignee
      --by-assignee             Group count by assignee
      --by-label                Group count by label
      --by-priority             Group count by priority
      --by-status               Group count by status
      --by-type                 Group count by issue type
      --closed-after string     Filter issues closed after date (YYYY-MM-DD or RFC3339)
      --closed-before string    Filter issues closed before date (YYYY-MM-DD or RFC3339)
      --created-after string    Filter issues created after date (YYYY-MM-DD or RFC3339)
      --created-before string   Filter issues created before date (YYYY-MM-DD or RFC3339)
      --desc-contains string    Filter by description substring
      --empty-description       Filter issues with empty description
  -h, --help                    help for count
      --id string               Filter by specific issue IDs (comma-separated)
      --include-infra           Include infrastructure beads and the wisps tier (matches 'bd list --include-infra --all' cardinality)
  -l, --label strings           Filter by labels (AND: must have ALL)
      --label-any strings       Filter by labels (OR: must have AT LEAST ONE)
      --no-assignee             Filter issues with no assignee
      --no-labels               Filter issues with no labels
      --notes-contains string   Filter by notes substring
  -p, --priority int            Filter by priority (0-4: 0=critical, 1=high, 2=medium, 3=low, 4=backlog)
      --priority-max int        Filter by maximum priority (inclusive)
      --priority-min int        Filter by minimum priority (inclusive)
  -s, --status string           Filter by stored status (open, in_progress, blocked, deferred, closed). Note: dependency-blocked issues use 'bd blocked'
      --title string            Filter by title text (case-insensitive substring match)
      --title-contains string   Filter by title substring
  -t, --type string             Filter by type (bug, feature, task, epic, chore, decision, merge-request, molecule, gate)
      --updated-after string    Filter issues updated after date (YYYY-MM-DD or RFC3339)
      --updated-before string   Filter issues updated before date (YYYY-MM-DD or RFC3339)

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
