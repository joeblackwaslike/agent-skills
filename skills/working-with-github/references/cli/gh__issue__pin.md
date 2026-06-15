---
source: "gh issue pin --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "7a6542e70d929057fb86009b21771aade84bb4b5a0ec9989551c2dd3096802aa"
---

Pin an issue to a repository.

The issue can be specified by issue number or URL.


USAGE
  gh issue pin {<number> | <url>} [flags]

INHERITED FLAGS
      --help                     Show help for command
  -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format

EXAMPLES
  # Pin an issue to the current repository
  $ gh issue pin 23
  
  # Pin an issue by URL
  $ gh issue pin https://github.com/owner/repo/issues/23
  
  # Pin an issue to specific repository
  $ gh issue pin 23 --repo owner/repo

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

