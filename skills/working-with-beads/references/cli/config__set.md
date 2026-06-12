---
source: "bd config set --help @ 1.0.5"
fetched_at: "2026-06-12T18:59:04.430Z"
sha256: "7cc64563442e6eb87b71456772e732b4ed912a242c54b78dcea3cc43a2c6a490"
---

Set a configuration value

Usage:
  bd config set <key> <value> [flags]

Flags:
      --force-git-tracked   Allow writing secret keys to git-tracked config files (use with caution)
  -h, --help                help for set

Global Flags:
      --actor string              Actor name for audit trail (default: $BEADS_ACTOR, git user.name, $USER)
      --db string                 Database path (default: auto-discover .beads/*.db)
  -C, --directory string          Change to this directory before running the command (like git -C)
      --dolt-auto-commit string   Dolt auto-commit policy (off|on|batch). 'on': commit after each write. 'batch': defer commits to bd dolt commit; uncommitted changes persist in the working set until then. SIGTERM/SIGHUP flush pending batch commits. Default: off. Override via config key dolt.auto-commit
      --global                    Use the global shared-server database (beads_global)
      --ignore-schema-skew        Proceed despite forward schema drift (some queries may fail)
      --json                      Output in JSON format
      --profile                   Generate CPU profile for performance analysis
  -q, --quiet                     Suppress non-essential output (errors only)
      --readonly                  Read-only mode: block write operations (for worker sandboxes)
      --sandbox                   Sandbox mode: disables Dolt auto-push
  -v, --verbose                   Enable verbose/debug output
