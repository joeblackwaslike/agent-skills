---
source: "gh auth setup-git --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "d814fc6875b817b28f10f0d4bc368c4d6f6a5549c7bd626784398f7e7415aa68"
---

This command configures `git` to use GitHub CLI as a credential helper.
For more information on git credential helpers please reference:
<https://git-scm.com/docs/gitcredentials>.

By default, GitHub CLI will be set as the credential helper for all authenticated hosts.
If there is no authenticated hosts the command fails with an error.

Alternatively, use the `--hostname` flag to specify a single host to be configured.
If the host is not authenticated with, the command fails with an error.


USAGE
  gh auth setup-git [flags]

FLAGS
  -f, --force --hostname   Force setup even if the host is not known. Must be used in conjunction with --hostname
  -h, --hostname string    The hostname to configure git for

INHERITED FLAGS
  --help   Show help for command

EXAMPLES
  # Configure git to use GitHub CLI as the credential helper for all authenticated hosts
  $ gh auth setup-git
  
  # Configure git to use GitHub CLI as the credential helper for enterprise.internal host
  $ gh auth setup-git --hostname enterprise.internal

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

