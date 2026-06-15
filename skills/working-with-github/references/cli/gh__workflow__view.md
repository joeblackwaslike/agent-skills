---
source: "gh workflow view --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "2fc66c98ff7f2f4914926c772aaabc98b1234889e50bfa656837cdd094cd6044"
---

View the summary of a workflow

USAGE
  gh workflow view [<workflow-id> | <workflow-name> | <filename>] [flags]

FLAGS
  -r, --ref string   The branch or tag name which contains the version of the workflow file you'd like to view
  -w, --web          Open workflow in the browser
  -y, --yaml         View the workflow yaml file

INHERITED FLAGS
      --help                     Show help for command
  -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format

EXAMPLES
  # Interactively select a workflow to view
  $ gh workflow view
  
  # View a specific workflow
  $ gh workflow view 0451

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

