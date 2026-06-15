---
source: "gh issue comment --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "8a38d714cd7a21695081e20456421d202948b8e3317219258356adbb8ce26e78"
---

Add a comment to a GitHub issue.

Without the body text supplied through flags, the command will interactively
prompt for the comment text.


USAGE
  gh issue comment {<number> | <url>} [flags]

FLAGS
  -b, --body text        The comment body text
  -F, --body-file file   Read body text from file (use "-" to read from standard input)
      --create-if-none   Create a new comment if no comments are found. Can be used only with --edit-last
      --delete-last      Delete the last comment of the current user
      --edit-last        Edit the last comment of the current user
  -e, --editor           Skip prompts and open the text editor to write the body in
  -w, --web              Open the web browser to write the comment
      --yes              Skip the delete confirmation prompt when --delete-last is provided

INHERITED FLAGS
      --help                     Show help for command
  -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format

EXAMPLES
  $ gh issue comment 12 --body "Hi from GitHub CLI"

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

