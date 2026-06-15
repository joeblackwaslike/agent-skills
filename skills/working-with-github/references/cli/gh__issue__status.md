---
source: "gh issue status --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "f5b9b9ae1554ea3a424b57e4c7efa6cf71f2cea0ed311529380c027bb5be0fa7"
---

Show status of relevant issues

For more information about output formatting flags, see `gh help formatting`.

USAGE
  gh issue status [flags]

FLAGS
  -q, --jq expression     Filter JSON output using a jq expression
      --json fields       Output JSON with the specified fields
  -t, --template string   Format JSON output using a Go template; see "gh help formatting"

INHERITED FLAGS
      --help                     Show help for command
  -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format

JSON FIELDS
  assignees, author, blockedBy, blocking, body, closed, closedAt,
  closedByPullRequestsReferences, comments, createdAt, id, isPinned, issueType,
  labels, milestone, number, parent, projectCards, projectItems, reactionGroups,
  state, stateReason, subIssues, subIssuesSummary, title, updatedAt, url

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

