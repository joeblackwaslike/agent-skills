---
source: "gh extension create --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "e38043b486135d68a4a86949009f988492e8e41f642a3412196d36631be9ff0a"
---

Create a new extension

USAGE
  gh extension create [<name>] [flags]

FLAGS
  --precompiled string   Create a precompiled extension. Possible values: go, other

INHERITED FLAGS
  --help   Show help for command

EXAMPLES
  # Use interactively
  $ gh extension create
  
  # Create a script-based extension
  $ gh extension create foobar
  
  # Create a Go extension
  $ gh extension create --precompiled=go foobar
  
  # Create a non-Go precompiled extension
  $ gh extension create --precompiled=other foobar

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

