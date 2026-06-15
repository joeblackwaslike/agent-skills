---
source: "gh gist delete --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "a51debc3709217cf92d28bef1517009359afd2fd2e1fd016dd7077fc1eb6f16e"
---

Delete a GitHub gist.

To delete a gist interactively, use `gh gist delete` with no arguments.

To delete a gist non-interactively, supply the gist id or url.


USAGE
  gh gist delete {<id> | <url>} [flags]

FLAGS
  --yes   Confirm deletion without prompting

INHERITED FLAGS
  --help   Show help for command

EXAMPLES
  # Delete a gist interactively
  $ gh gist delete
  
  # Delete a gist non-interactively
  $ gh gist delete 1234

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

