---
source: "gh issue close --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "977a3100120d92c0514a7a2176cc6dde2944e5716d9240eda82e5ae3de1e3323"
---

Close issue

USAGE
  gh issue close {<number> | <url>} [flags]

FLAGS
  -c, --comment string        Leave a closing comment
      --duplicate-of string   Mark as duplicate of another issue by number or URL
  -r, --reason string         Reason for closing: {completed|not planned|duplicate}

INHERITED FLAGS
      --help                     Show help for command
  -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format

EXAMPLES
  # Close issue
  $ gh issue close 123
  
  # Close issue and add a closing comment
  $ gh issue close 123 --comment "Closing this issue"
  
  # Close issue as a duplicate of issue #456
  $ gh issue close 123 --duplicate-of 456
  
  # Close issue as not planned
  $ gh issue close 123 --reason "not planned"

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

