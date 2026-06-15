---
source: "gh project item-edit --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "4638b1502317234627bd71563a3dfae4f3fb2923b02dfb9770af8568c802e3ce"
---

Edit either a draft issue or a project item. Both usages require the ID of the item to edit.

For non-draft issues, the ID of the project is also required, and only a single field value can be updated per invocation.

Remove project item field value using `--clear` flag.

For more information about output formatting flags, see `gh help formatting`.

USAGE
  gh project item-edit [flags]

FLAGS
      --body string                      Body of the draft issue item
      --clear                            Remove field value
      --date string                      Date value for the field (YYYY-MM-DD)
      --field-id string                  ID of the field to update
      --format string                    Output format: {json}
      --id string                        ID of the item to edit
      --iteration-id string              ID of the iteration value to set on the field
  -q, --jq expression                    Filter JSON output using a jq expression
      --number float                     Number value for the field
      --project-id string                ID of the project to which the field belongs to
      --single-select-option-id string   ID of the single select option value to set on the field
  -t, --template string                  Format JSON output using a Go template; see "gh help formatting"
      --text string                      Text value for the field
      --title string                     Title of the draft issue item

INHERITED FLAGS
  --help   Show help for command

EXAMPLES
  # Edit an item's text field value
  $ gh project item-edit --id <item-id> --field-id <field-id> --project-id <project-id> --text "new text"
  
  # Clear an item's field value
  $ gh project item-edit --id <item-id> --field-id <field-id> --project-id <project-id> --clear

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

