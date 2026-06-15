---
source: "gh issue unpin --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "313f012653b9313ffea1f9063c153a217181ae794e4453f2bb126ec9285a8a58"
---

Unpin an issue from a repository.

The issue can be specified by issue number or URL.


USAGE
  gh issue unpin {<number> | <url>} [flags]

INHERITED FLAGS
      --help                     Show help for command
  -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format

EXAMPLES
  # Unpin issue from the current repository
  $ gh issue unpin 23
  
  # Unpin issue by URL
  $ gh issue unpin https://github.com/owner/repo/issues/23
  
  # Unpin an issue from specific repository
  $ gh issue unpin 23 --repo owner/repo

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

