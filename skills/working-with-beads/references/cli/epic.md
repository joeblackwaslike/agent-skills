---
source: "bd epic --help @ 1.0.5"
fetched_at: "2026-06-12T18:59:04.430Z"
sha256: "0fd13a3dad269c854a69a9346163a1b25802bc42b8e2521da0994648c6fda892"
---

Epic management commands

Usage:
  bd epic [command]

Available Commands:
  close-eligible Close epics where all children are complete
  status         Show epic completion status

Flags:
  -h, --help   help for epic

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

Use "bd epic [command] --help" for more information about a command.
