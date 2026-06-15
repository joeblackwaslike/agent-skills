---
source: "gh project unlink --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "caea664143b4003f2b238aed9d7441bbe332e76df7c197bd5f861466437a31c8"
---

Unlink a project from a repository or a team

USAGE
  gh project unlink [<number>] [flags]

FLAGS
      --owner string   Login of the owner. Use "@me" for the current user.
  -R, --repo string    The repository to be unlinked from this project
  -T, --team string    The team to be unlinked from this project

INHERITED FLAGS
  --help   Show help for command

EXAMPLES
  # Unlink monalisa's project 1 from her repository "my_repo"
  $ gh project unlink 1 --owner monalisa --repo my_repo
  
  # Unlink monalisa's organization's project 1 from her team "my_team"
  $ gh project unlink 1 --owner my_organization --team my_team
  
  # Unlink monalisa's project 1 from the repository of current directory if neither --repo nor --team is specified
  $ gh project unlink 1

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

