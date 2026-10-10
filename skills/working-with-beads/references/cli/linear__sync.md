---
source: "bd linear sync --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "bf40aae8550fc4db1f19a6b79bccc155ee147ca267bf3fb0d277e4260c2171e2"
---

Synchronize issues between beads and Linear.

Modes:
  --pull              Import issues from Linear into beads
  --push              Export issues from beads to Linear
  --pull-if-stale     Pull only if data is stale (skip if fresh)
  (no flags)          Bidirectional sync: pull then push, with conflict resolution

Staleness (--pull-if-stale):
  --threshold 20m     How old data must be before pulling (default 20m)
  A 5-minute debounce prevents agent loops: if a pull completed within 5 minutes,
  data is always treated as fresh regardless of the threshold.

Team Selection:
  --team ID1,ID2  Override configured team IDs for this sync
  Multiple teams can be configured via linear.team_ids (comma-separated).
  Falls back to linear.team_id for backward compatibility.
  Push requires explicit --team when multiple teams are configured.

Pull Options:
  --milestones       Reconstruct Linear project milestones as local epic parents

Type Filtering (--push only):
  --type task,feature       Only sync issues of these types
  --exclude-type wisp       Exclude issues of these types
  --include-ephemeral       Include ephemeral issues (wisps, etc.); default is to exclude
  --parent TICKET           Only push this ticket and its descendants
  --relations               Import Linear relations as bd dependencies on pull

Persistent push-direction ID filters (workflow artifacts, sandbox beads, etc.):
  bd config set linear.exclude_id_prefix "hw-mol-"
  bd config set linear.exclude_id_patterns "-wisp-,sandbox-,scratch-"

  exclude_id_prefix is a single case-sensitive prefix on the bead ID.
  exclude_id_patterns is a comma-separated list of case-sensitive substrings
  (matched anywhere in the ID). Both are combined as a union: a bead
  matching either rule is skipped from push (no create, no update). Beads
  with an existing external_ref that NOW match are silently skipped on
  future syncs; the Linear-side issue persists — archive/delete it manually
  if desired.

Conflict Resolution:
  By default, newer timestamp wins. Override with:
  --prefer-local    Always prefer local beads version
  --prefer-linear   Always prefer Linear version

Examples:
  bd linear sync --pull                         # Import from Linear
  bd linear sync --pull-if-stale                # Pull only if data is stale
  bd linear sync --pull-if-stale --threshold 5m # Pull if older than 5 minutes
  bd linear sync --pull --relations             # Import Linear blocking relations as bd deps
  bd linear sync --push --create-only           # Push new issues only
  bd linear sync --push --type=task,feature     # Push only tasks and features
  bd linear sync --push --exclude-type=wisp     # Push all except wisps
  bd linear sync --push --parent=bd-abc123      # Push one ticket tree
  bd linear sync --dry-run                      # Preview without changes
  bd linear sync --prefer-local                 # Bidirectional, local wins

Usage:
  bd linear sync [flags]

Flags:
      --create-only            Only create new issues, don't update existing
      --dry-run                Preview sync without making changes
      --exclude-type strings   Exclude issues of these types (can be repeated)
  -h, --help                   help for sync
      --include-ephemeral      Include ephemeral issues (wisps, etc.) when pushing to Linear
      --issues string          Comma-separated bead IDs to sync selectively (e.g., bd-abc,bd-def). Mutually exclusive with --parent.
      --milestones             Reconstruct Linear project milestones as local epic parents when pulling
      --no-wait                Fail immediately if another sync is running instead of waiting
      --parent string          Limit push to this beads ticket and its descendants
      --prefer-linear          Prefer Linear version on conflicts
      --prefer-local           Prefer local version on conflicts
      --pull                   Pull issues from Linear
      --pull-if-stale          Pull only if Linear data is stale (skip if fresh)
      --push                   Push issues to Linear
      --relations              Import Linear relations as bd dependencies when pulling
      --state string           Issue state to sync: open, closed, all (default "all")
      --team strings           Team ID(s) to sync (overrides configured team_id/team_ids)
      --threshold duration     Staleness threshold for --pull-if-stale (default 20m) (default 20m0s)
      --type strings           Only sync issues of these types (can be repeated)
      --update-refs            Update external_ref after creating Linear issues (default true)

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
