---
source: "gh pr update-branch --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "86d34cf1342c47554dda88959f767858a9f180395dddacf70e48d03a86949cd1"
---

Update a pull request branch with latest changes of the base branch.

Without an argument, the pull request that belongs to the current branch is selected.

The default behavior is to update with a merge commit (i.e., merging the base branch
into the PR's branch). To reconcile the changes with rebasing on top of the base
branch, the `--rebase` option should be provided.


USAGE
  gh pr update-branch [<number> | <url> | <branch>] [flags]

FLAGS
  --rebase   Update PR branch by rebasing on top of latest base branch

INHERITED FLAGS
      --help                     Show help for command
  -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format

EXAMPLES
  $ gh pr update-branch 23
  $ gh pr update-branch 23 --rebase
  $ gh pr update-branch 23 --repo owner/repo

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

