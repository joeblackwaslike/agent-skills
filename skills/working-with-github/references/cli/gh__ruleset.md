---
source: "gh ruleset --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "0ba92ab1aafbf5838e6b863ab95a1a6b7d313acfbd3f37d33fc9d2f44333cb25"
---

Repository rulesets are a way to define a set of rules that apply to a repository.
These commands allow you to view information about them.


USAGE
  gh ruleset <command> [flags]

ALIASES
  gh rs

AVAILABLE COMMANDS
  check:         View rules that would apply to a given branch
  list:          List rulesets for a repository or organization
  view:          View information about a ruleset

FLAGS
  -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format

INHERITED FLAGS
  --help   Show help for command

EXAMPLES
  $ gh ruleset list
  $ gh ruleset view --repo OWNER/REPO --web
  $ gh ruleset check branch-name

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

