---
source: "gh codespace ports --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "9a3b9e4472ebf21bbc9a5cda345eb8c94a9af9dff9150e6ef87cd6549a8ecdff"
---

List ports in a codespace

For more information about output formatting flags, see `gh help formatting`.

USAGE
  gh codespace ports [flags]

AVAILABLE COMMANDS
  forward:       Forward ports
  visibility:    Change the visibility of the forwarded port

FLAGS
  -c, --codespace string    Name of the codespace
  -q, --jq expression       Filter JSON output using a jq expression
      --json fields         Output JSON with the specified fields
  -R, --repo string         Filter codespace selection by repository name (user/repo)
      --repo-owner string   Filter codespace selection by repository owner (username or org)
  -t, --template string     Format JSON output using a Go template; see "gh help formatting"

INHERITED FLAGS
  --help   Show help for command

JSON FIELDS
  browseUrl, label, sourcePort, visibility

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

