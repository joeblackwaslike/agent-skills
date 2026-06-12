---
source: "bd todo add --help @ 1.0.5"
fetched_at: "2026-06-12T18:59:04.430Z"
sha256: "90f7b7e245fc89b13b4f197d5a1010b8515414f339f0a22061e064ce1f5f7324"
---

Add a new TODO item

Usage:
  bd todo add <title> [flags]

Flags:
  -d, --description string   Description
  -h, --help                 help for add
  -p, --priority int         Priority (0-4, default 2) (default 2)

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
