---
source: "gh project delete --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "2342c63aafe7c19ccc2057ea3b01a899f0cc529c9044525199aa123e7d01b35a"
---

Delete a project

For more information about output formatting flags, see `gh help formatting`.

USAGE
  gh project delete [<number>] [flags]

FLAGS
      --format string     Output format: {json}
  -q, --jq expression     Filter JSON output using a jq expression
      --owner string      Login of the owner. Use "@me" for the current user.
  -t, --template string   Format JSON output using a Go template; see "gh help formatting"

INHERITED FLAGS
  --help   Show help for command

EXAMPLES
  # Delete the current user's project "1"
  $ gh project delete 1 --owner "@me"

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

