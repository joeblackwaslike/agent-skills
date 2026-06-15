---
source: "gh project link --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "12a812ba2aae5206a1191491dade19b6693f9dc5f5f0b61979ae6524e17e7449"
---

Link a project to a repository or a team

USAGE
  gh project link [<number>] [flags]

FLAGS
      --owner string   Login of the owner. Use "@me" for the current user.
  -R, --repo string    The repository to be linked to this project
  -T, --team string    The team to be linked to this project

INHERITED FLAGS
  --help   Show help for command

EXAMPLES
  # Link monalisa's project 1 to her repository "my_repo"
  $ gh project link 1 --owner monalisa --repo my_repo
  
  # Link monalisa's organization's project 1 to her team "my_team"
  $ gh project link 1 --owner my_organization --team my_team
  
  # Link monalisa's project 1 to the repository of current directory if neither --repo nor --team is specified
  $ gh project link 1

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

