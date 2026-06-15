---
source: "gh variable delete --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "913670014013bd00051347556785e1ae2912f657cf8faa50f6a5b918542435e0"
---

Delete a variable on one of the following levels:
- repository (default): available to GitHub Actions runs or Dependabot in a repository
- environment: available to GitHub Actions runs for a deployment environment in a repository
- organization: available to GitHub Actions runs or Dependabot within an organization


USAGE
  gh variable delete <variable-name> [flags]

ALIASES
  gh variable remove

FLAGS
  -e, --env string   Delete a variable for an environment
  -o, --org string   Delete a variable for an organization

INHERITED FLAGS
      --help                     Show help for command
  -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

