---
source: "gh discussion --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "7669126039e0a35a66d2814c858507a1bbcf6694f7a0216841041551a3b0451d"
---

Working with discussions in the GitHub CLI is in preview and subject to change without notice.


USAGE
  gh discussion <command> [flags]

GENERAL COMMANDS
  create:        Create a new discussion (preview)
  list:          List discussions in a repository (preview)

TARGETED COMMANDS
  comment:       Add, edit, or delete a comment or a reply on a discussion (preview)
  edit:          Edit a discussion (preview)
  view:          View a discussion (preview)

FLAGS
  -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format

INHERITED FLAGS
  --help   Show help for command

ARGUMENTS
  A discussion can be supplied as argument in any of the following formats:
  - by number, e.g. "123"; or
  - by URL, e.g. "https://github.com/OWNER/REPO/discussions/123".

EXAMPLES
  $ gh discussion list
  $ gh discussion create --category "General" --title "Hello"
  $ gh discussion view 123

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

