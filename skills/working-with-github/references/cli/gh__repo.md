---
source: "gh repo --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "adc801a6f9cc5c7be0332fe9c4077017c8b7b97f122d65d3542eda481ebe1fb3"
---

Work with GitHub repositories.

USAGE
  gh repo <command> [flags]

GENERAL COMMANDS
  create:        Create a new repository
  list:          List repositories owned by user or organization

TARGETED COMMANDS
  archive:       Archive a repository
  autolink:      Manage autolink references
  clone:         Clone a repository locally
  delete:        Delete a repository
  deploy-key:    Manage deploy keys in a repository
  edit:          Edit repository settings
  fork:          Create a fork of a repository
  gitignore:     List and view available repository gitignore templates
  license:       Explore repository licenses
  rename:        Rename a repository
  set-default:   Configure default repository for this directory
  sync:          Sync a repository
  unarchive:     Unarchive a repository
  view:          View a repository

INHERITED FLAGS
  --help   Show help for command

ARGUMENTS
  A repository can be supplied as an argument in any of the following formats:
  - "OWNER/REPO"
  - by URL, e.g. "https://github.com/OWNER/REPO"

EXAMPLES
  $ gh repo create
  $ gh repo clone cli/cli
  $ gh repo view --web

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

