---
source: "gh repo autolink list --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "99805d0e02634f2921ddbb2ed576219475982a2e0d272cbc7553267026cd0466"
---

Gets all autolink references that are configured for a repository.

Information about autolinks is only available to repository administrators.

For more information about output formatting flags, see `gh help formatting`.

USAGE
  gh repo autolink list [flags]

ALIASES
  gh repo autolink ls

FLAGS
  -q, --jq expression     Filter JSON output using a jq expression
      --json fields       Output JSON with the specified fields
  -t, --template string   Format JSON output using a Go template; see "gh help formatting"
  -w, --web               List autolink references in the web browser

INHERITED FLAGS
      --help                     Show help for command
  -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format

JSON FIELDS
  id, isAlphanumeric, keyPrefix, urlTemplate

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

