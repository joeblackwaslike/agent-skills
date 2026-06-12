---
source: "bd help --help @ 1.0.5"
fetched_at: "2026-06-12T18:59:04.430Z"
sha256: "3e362e76b254fda52be9dc988fa354700370ebf7a7bcf5211c6fbcd7edb556f3"
---

Help provides help for any command in the application.
Simply type bd help [path to command] for full details.

Usage:
  bd help [command] [flags]

Flags:
      --all          Show help for all commands in a single document
      --doc string   Generate markdown docs for a single command
  -h, --help         help for help
      --list         List all available commands

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
