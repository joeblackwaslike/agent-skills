---
source: "gh pr status --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "20c2404d73e83375eeb21d90819a69c008aab6a147755fb30c052c9a1de2f362"
---

Show status of relevant pull requests.

The status shows a summary of pull requests that includes information such as
pull request number, title, CI checks, reviews, etc.

To see more details of CI checks, run `gh pr checks`.

For more information about output formatting flags, see `gh help formatting`.

USAGE
  gh pr status [flags]

FLAGS
  -c, --conflict-status   Display the merge conflict status of each pull request
  -q, --jq expression     Filter JSON output using a jq expression
      --json fields       Output JSON with the specified fields
  -t, --template string   Format JSON output using a Go template; see "gh help formatting"

INHERITED FLAGS
      --help                     Show help for command
  -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format

JSON FIELDS
  additions, assignees, author, autoMergeRequest, baseRefName, baseRefOid, body,
  changedFiles, closed, closedAt, closingIssuesReferences, comments, commits,
  createdAt, deletions, files, fullDatabaseId, headRefName, headRefOid,
  headRepository, headRepositoryOwner, id, isCrossRepository, isDraft, labels,
  latestReviews, maintainerCanModify, mergeCommit, mergeStateStatus, mergeable,
  mergedAt, mergedBy, milestone, number, potentialMergeCommit, projectCards,
  projectItems, reactionGroups, reviewDecision, reviewRequests, reviews, state,
  statusCheckRollup, title, updatedAt, url

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

