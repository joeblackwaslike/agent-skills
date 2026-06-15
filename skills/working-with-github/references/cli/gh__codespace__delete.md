---
source: "gh codespace delete --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "9710fe487475e0eb02a02cfbffa404af3b76598130403ab4f0c7589c2a4cebb5"
---

Delete codespaces based on selection criteria.

All codespaces for the authenticated user can be deleted, as well as codespaces for a
specific repository. Alternatively, only codespaces older than N days can be deleted.

Organization administrators may delete any codespace billed to the organization.


USAGE
  gh codespace delete [flags]

FLAGS
      --all                 Delete all codespaces
  -c, --codespace string    Name of the codespace
      --days N              Delete codespaces older than N days
  -f, --force               Skip confirmation for codespaces that contain unsaved changes
  -o, --org login           The login handle of the organization (admin-only)
  -R, --repo string         Filter codespace selection by repository name (user/repo)
      --repo-owner string   Filter codespace selection by repository owner (username or org)
  -u, --user username       The username to delete codespaces for (used with --org)

INHERITED FLAGS
  --help   Show help for command

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

