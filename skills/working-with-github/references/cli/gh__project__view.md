---
source: "gh project view --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "ab246200052dcac041bf1db7da86f8e825b2b2ea9c20bccc5468a42a7866d4aa"
---

View a project

For more information about output formatting flags, see `gh help formatting`.

USAGE
  gh project view [<number>] [flags]

FLAGS
      --format string     Output format: {json}
  -q, --jq expression     Filter JSON output using a jq expression
      --owner string      Login of the owner. Use "@me" for the current user.
  -t, --template string   Format JSON output using a Go template; see "gh help formatting"
  -w, --web               Open a project in the browser

INHERITED FLAGS
  --help   Show help for command

EXAMPLES
  # View the current user's project "1"
  $ gh project view 1
  
  # Open user monalisa's project "1" in the browser
  $ gh project view 1 --owner monalisa --web

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

