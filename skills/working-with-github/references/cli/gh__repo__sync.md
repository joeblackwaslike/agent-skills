---
source: "gh repo sync --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "827d9d466bf61e6d69e6032f5e30d1e539118d01cd423096738b6d31b9c8a453"
---

Sync destination repository from source repository. Syncing uses the default branch
of the source repository to update the matching branch on the destination
repository so they are equal. A fast forward update will be used except when the
`--force` flag is specified, then the two branches will
be synced using a hard reset.

Without an argument, the local repository is selected as the destination repository.

The source repository is the parent of the destination repository by default.
This can be overridden with the `--source` flag.


USAGE
  gh repo sync [<destination-repository>] [flags]

FLAGS
  -b, --branch string   Branch to sync (default [default branch])
      --force           Hard reset the branch of the destination repository to match the source repository
  -s, --source string   Source repository

INHERITED FLAGS
  --help   Show help for command

EXAMPLES
  # Sync local repository from remote parent
  $ gh repo sync
  
  # Sync local repository from remote parent on specific branch
  $ gh repo sync --branch v1
  
  # Sync remote fork from its parent
  $ gh repo sync owner/cli-fork
  
  # Sync remote repository from another remote repository
  $ gh repo sync owner/repo --source owner2/repo2

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

