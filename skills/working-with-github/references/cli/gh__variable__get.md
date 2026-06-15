---
source: "gh variable get --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "ffd1c40becc33e973a00ce523981c82767e4f01fbe51bd007f00f55601ed976a"
---

Get a variable on one of the following levels:
- repository (default): available to GitHub Actions runs or Dependabot in a repository
- environment: available to GitHub Actions runs for a deployment environment in a repository
- organization: available to GitHub Actions runs or Dependabot within an organization

For more information about output formatting flags, see `gh help formatting`.

USAGE
  gh variable get <variable-name> [flags]

FLAGS
  -e, --env string        Get a variable for an environment
  -q, --jq expression     Filter JSON output using a jq expression
      --json fields       Output JSON with the specified fields
  -o, --org string        Get a variable for an organization
  -t, --template string   Format JSON output using a Go template; see "gh help formatting"

INHERITED FLAGS
      --help                     Show help for command
  -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format

JSON FIELDS
  createdAt, name, numSelectedRepos, selectedReposURL, updatedAt, value,
  visibility

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

