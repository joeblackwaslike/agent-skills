---
source: "gh gist edit --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "986f44b5fa2a6a4c10fcc65d82b0a24d8318f56a2b76611c2c640b28e93c183f"
---

Edit one of your gists

USAGE
  gh gist edit {<id> | <url>} [<filename>] [flags]

FLAGS
  -a, --add string        Add a new file to the gist
  -d, --desc string       New description for the gist
  -f, --filename string   Select a file to edit
  -r, --remove string     Remove a file from the gist

INHERITED FLAGS
  --help   Show help for command

EXAMPLES
  # Select a gist to edit interactively
  $ gh gist edit
  
  # Edit a gist file in the default editor
  $ gh gist edit 1234567890abcdef1234567890abcdef
  
  # Edit a specific file in the gist
  $ gh gist edit 1234567890abcdef1234567890abcdef --filename hello.py
  
  # Replace a gist file with content from a local file
  $ gh gist edit 1234567890abcdef1234567890abcdef --filename hello.py hello.py
  
  # Add a new file to the gist
  $ gh gist edit 1234567890abcdef1234567890abcdef --add newfile.py
  
  # Change the description of the gist
  $ gh gist edit 1234567890abcdef1234567890abcdef --desc "new description"
  
  # Remove a file from the gist
  $ gh gist edit 1234567890abcdef1234567890abcdef --remove hello.py

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

