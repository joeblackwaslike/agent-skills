---
source: "gh secret delete --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "c0ee676e0d12f71b2e0930d748e92da3237c314b5c75e78b492e9b7eb76341e3"
---

Delete a secret on one of the following levels:
- repository (default): available to GitHub Actions runs, Agents sessions, or Dependabot in a repository
- environment: available to GitHub Actions runs for a deployment environment in a repository
- organization: available to GitHub Actions runs, Agents sessions, Dependabot, or Codespaces within an organization
- user: available to Codespaces for your user


USAGE
  gh secret delete <secret-name> [flags]

ALIASES
  gh secret remove

FLAGS
  -a, --app string   Delete a secret for a specific application: {actions|agents|codespaces|dependabot}
  -e, --env string   Delete a secret for an environment
  -o, --org string   Delete a secret for an organization
  -u, --user         Delete a secret for your user

INHERITED FLAGS
      --help                     Show help for command
  -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

