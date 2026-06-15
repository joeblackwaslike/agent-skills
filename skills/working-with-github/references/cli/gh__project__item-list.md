---
source: "gh project item-list --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "a17b97d1383e02580f8d5e5628224907890ff6323c97949b6ccd29eece757361"
---

List the items in a project.

If supported by the API host (github.com and GHES 3.20+), the --query option can
be used to perform advanced search. For the full syntax, see:
https://docs.github.com/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/filtering-projects

For more information about output formatting flags, see `gh help formatting`.

USAGE
  gh project item-list [<number>] [flags]

FLAGS
      --format string     Output format: {json}
  -q, --jq expression     Filter JSON output using a jq expression
  -L, --limit int         Maximum number of items to fetch (default 30)
      --owner string      Login of the owner. Use "@me" for the current user
      --query string      Filter items using the Projects filter syntax, e.g. "assignee:octocat -status:Done"
  -t, --template string   Format JSON output using a Go template; see "gh help formatting"

INHERITED FLAGS
  --help   Show help for command

EXAMPLES
  # List the items in the current users's project "1"
  $ gh project item-list 1 --owner "@me"
  
  # List items assigned to a specific user
  $ gh project item-list 1 --owner "@me" --query "assignee:monalisa"
  
  # List open issues assigned to yourself
  $ gh project item-list 1 --owner "@me" --query "assignee:@me is:issue is:open"
  
  # List items with the "bug" label that are not done
  $ gh project item-list 1 --owner "@me" --query "label:bug -status:Done"

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

