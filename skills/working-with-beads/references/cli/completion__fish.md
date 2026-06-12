---
source: "bd completion fish --help @ 1.0.5"
fetched_at: "2026-06-12T18:59:04.430Z"
sha256: "a5ab6112c8224b9bf6c1f1b795033b4e5ddea36c6c2db5b0c208aa4ac130cfd8"
---

Generate the autocompletion script for the fish shell.

To load completions in your current shell session:
	bd completion fish | source

To load completions for every new session, execute once:

	bd completion fish > ~/.config/fish/completions/bd.fish

You will need to start a new shell for this setup to take effect.


Usage:
  bd completion fish [flags]

Flags:
  -h, --help              help for fish
      --no-descriptions   disable completion descriptions

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
