---
source: "gh project edit --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "dd55d25620b9030c2e1a5aeaa9c4a7b010da5d1b30a25c20ba751bcd19ffeab6"
---

Edit a project

For more information about output formatting flags, see `gh help formatting`.

USAGE
  gh project edit [<number>] [flags]

FLAGS
  -d, --description string   New description of the project
      --format string        Output format: {json}
  -q, --jq expression        Filter JSON output using a jq expression
      --owner string         Login of the owner. Use "@me" for the current user.
      --readme string        New readme for the project
  -t, --template string      Format JSON output using a Go template; see "gh help formatting"
      --title string         New title for the project
      --visibility string    Change project visibility: {PUBLIC|PRIVATE}

INHERITED FLAGS
  --help   Show help for command

EXAMPLES
  # Edit the title of monalisa's project "1"
  $ gh project edit 1 --owner monalisa --title "New title"

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

