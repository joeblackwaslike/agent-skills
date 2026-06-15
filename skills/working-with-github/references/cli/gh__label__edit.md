---
source: "gh label edit --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "189d11d7ca05b29738600a868508a45de66d8fa7b3f7c1232c5d0e50973f6d7f"
---

Update a label on GitHub.

A label can be renamed using the `--name` flag.

The label color needs to be 6 character hex value.


USAGE
  gh label edit <name> [flags]

FLAGS
  -c, --color string         Color of the label
  -d, --description string   Description of the label
  -n, --name string          New name of the label

INHERITED FLAGS
      --help                     Show help for command
  -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format

EXAMPLES
  # Update the color of the bug label
  $ gh label edit bug --color FF0000
  
  # Rename and edit the description of the bug label
  $ gh label edit bug --name big-bug --description "Bigger than normal bug"

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

