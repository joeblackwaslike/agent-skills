---
source: "gh pr review --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "2206514450875b7d549831ab08162ae0e54baaa3c3c8a02f94902a29d9774bcf"
---

Add a review to a pull request.

Without an argument, the pull request that belongs to the current branch is reviewed.


USAGE
  gh pr review [<number> | <url> | <branch>] [flags]

FLAGS
  -a, --approve           Approve pull request
  -b, --body string       Specify the body of a review
  -F, --body-file file    Read body text from file (use "-" to read from standard input)
  -c, --comment           Comment on a pull request
  -r, --request-changes   Request changes on a pull request

INHERITED FLAGS
      --help                     Show help for command
  -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format

EXAMPLES
  # Approve the pull request of the current branch
  $ gh pr review --approve
  
  # Leave a review comment for the current branch
  $ gh pr review --comment -b "interesting"
  
  # Add a review for a specific pull request
  $ gh pr review 123
  
  # Request changes on a specific pull request
  $ gh pr review 123 -r -b "needs more ASCII art"

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

