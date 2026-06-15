---
source: "gh skill --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "6ef4d9fb2183c032e8914cc3f0f6aa3174ee64785d7ee4cc8a9a4b8df0c304b3"
---

Install and manage agent skills from GitHub repositories.

Working with agent skills in the GitHub CLI is in preview and
subject to change without notice.


USAGE
  gh skill <command> [flags]

ALIASES
  gh skills

AVAILABLE COMMANDS
  install:       Install agent skills from a GitHub repository (preview)
  list:          List installed skills (preview)
  preview:       Preview a skill from a GitHub repository (preview)
  publish:       Validate and publish skills to a GitHub repository (preview)
  search:        Search for skills across GitHub (preview)
  update:        Update installed skills to their latest versions (preview)

INHERITED FLAGS
  --help   Show help for command

EXAMPLES
  # Search for skills
  $ gh skill search terraform
  
  # Install a skill
  $ gh skill install github/awesome-copilot documentation-writer
  
  # List installed skills
  $ gh skill list
  
  # Preview a skill before installing
  $ gh skill preview github/awesome-copilot documentation-writer
  
  # Update all installed skills
  $ gh skill update --all
  
  # Validate skills for publishing
  $ gh skill publish --dry-run

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

