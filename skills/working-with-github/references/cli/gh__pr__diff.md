---
source: "gh pr diff --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "e28c76f489e77d877b9c1a88e0d9e3ac77d432e556133d0d758c30c55284a8ec"
---

View changes in a pull request.

Without an argument, the pull request that belongs to the current branch
is selected.

With `--web` flag, open the pull request diff in a web browser instead.

Use `--exclude` to filter out files matching a glob pattern. The pattern
uses forward slashes as path separators on all platforms. You can repeat
the flag to exclude multiple patterns.


USAGE
  gh pr diff [<number> | <url> | <branch>] [flags]

FLAGS
      --color string       Use color in diff output: {always|never|auto} (default "auto")
  -e, --exclude patterns   Exclude files matching glob patterns from the diff
      --name-only          Display only names of changed files
      --patch              Display diff in patch format
  -w, --web                Open the pull request diff in the browser

INHERITED FLAGS
      --help                     Show help for command
  -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format

EXAMPLES
  # See diff for current branch
  $ gh pr diff
  
  # See diff for a specific PR
  $ gh pr diff 123
  
  # Exclude files from diff output
  $ gh pr diff --exclude '*.yml' --exclude 'generated/*'
  
  # Exclude matching files by name
  $ gh pr diff --name-only --exclude '*.generated.*'

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

