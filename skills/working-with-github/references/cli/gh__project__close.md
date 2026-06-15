---
source: "gh project close --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "8cc2eb373cae90a853200d744b70677d29529335c47f80579924f812a096304c"
---

Close a project

For more information about output formatting flags, see `gh help formatting`.

USAGE
  gh project close [<number>] [flags]

FLAGS
      --format string     Output format: {json}
  -q, --jq expression     Filter JSON output using a jq expression
      --owner string      Login of the owner. Use "@me" for the current user.
  -t, --template string   Format JSON output using a Go template; see "gh help formatting"
      --undo              Reopen a closed project

INHERITED FLAGS
  --help   Show help for command

EXAMPLES
  # Close project "1" owned by monalisa
  $ gh project close 1 --owner monalisa
  
  # Reopen closed project "1" owned by github
  $ gh project close 1 --owner github --undo

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

