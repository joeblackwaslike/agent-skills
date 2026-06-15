---
source: "gh project item-archive --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "df25987d4dda480ccb9ffeb54a7ad6ecdd6617815e4f9af0654c51ff904e6fe3"
---

Archive an item in a project

For more information about output formatting flags, see `gh help formatting`.

USAGE
  gh project item-archive [<number>] [flags]

FLAGS
      --format string     Output format: {json}
      --id string         ID of the item to archive
  -q, --jq expression     Filter JSON output using a jq expression
      --owner string      Login of the owner. Use "@me" for the current user.
  -t, --template string   Format JSON output using a Go template; see "gh help formatting"
      --undo              Unarchive an item

INHERITED FLAGS
  --help   Show help for command

EXAMPLES
  # Archive an item in the current user's project "1"
  $ gh project item-archive 1 --owner "@me" --id <item-ID>

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

