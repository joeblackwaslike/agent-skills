---
source: "dolt --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "2ac59ffd12df33db87967149f0c25ea016724077bad772b31241adc70c2e1f11"
---

Valid commands for dolt are
                init - Create an empty Dolt data repository.
              status - Show the working tree status.
                 add - Add table changes to the list of staged table changes.
                diff - Diff a table.
               reset - Remove table changes from the list of staged table changes.
               clean - Remove untracked tables from working set.
              commit - Record changes to the repository.
                 sql - Run a SQL query against tables in repository.
          sql-server - Start a MySQL-compatible server.
                 log - Show commit logs.
                show - Show information about a specific commit.
              branch - Create, list, edit, delete branches.
            checkout - Checkout a branch or overwrite a table from HEAD.
               merge - Merge a branch.
           conflicts - Commands for viewing and resolving merge conflicts.
         cherry-pick - Apply the changes introduced by an existing commit.
              revert - Undo the changes introduced in a commit.
               clone - Clone from a remote data repository.
               fetch - Update the database from a remote data repository.
                pull - Fetch from a dolt remote data repository and merge.
                push - Push to a dolt remote.
              config - Dolt configuration.
              remote - Manage set of tracked repositories.
              backup - Manage a set of server backups.
               login - Login to a dolt remote host.
               creds - Commands for managing credentials.
                  ls - List tables in the working set.
              schema - Commands for showing and importing table schemas.
               table - Commands for copying, renaming, deleting, and exporting tables.
                 tag - Create, list, delete tags.
               blame - Show what revision and author last modified each row of a table.
         constraints - Commands for handling constraints.
         read-tables - Fetch table(s) at a specific commit into a new dolt repo
                  gc - Cleans up unreferenced data from the repository.
                fsck - Verifies the contents of the database are not corrupted. Provides repair when possible.
       filter-branch - Edits the commit history using the provided query.
          merge-base - Find the common ancestor of two commits.
             version - Displays the version for the Dolt binary.
                dump - Export all tables in the working set into a file.
                docs - Commands for working with Dolt documents.
               stash - Stash the changes in a dirty workspace away.
             profile - Manage dolt profiles for CLI global options.
          query-diff - Shows table diff between two queries.
              reflog - Show history of named refs.
              rebase - Reapplies commits on top of another base tip
                  ci - Commands for working with Dolt continuous integration configuration.
               debug - Run a query in profile and trace mode
                  rm - Drops a table and removes it from tracking


Dolt subcommands are in transition to using the flags listed below as global flags.
Not all subcommands use these flags. If your command accepts these flags without error, then they are supported.

usage: dolt <--data-dir=<path>> subcommand <subcommand arguments>

Specific dolt options
    --profile=<profile>
      The name of the profile to use when executing SQL queries. Run `dolt profile --help` for more information.
    
    -u <user>, --user=<user>
      Defines the local superuser (defaults to `root`). If the specified user exists, will take on permissions of that user.
    
    -p <password>, --password=<password>
      Defines the password for the user. Defaults to empty string when the user is `root`.
    
    --host=<host>
      Defines the host to connect to.
    
    --port=<port>
      Defines the port to connect to.
    
    --no-tls
      Disables TLS for the connection to remote databases.
    
    --data-dir=<data-dir>
      Defines a data directory whose subdirectories should all be dolt data repositories accessible as independent databases.
      Defaults to the current directory.
    
    --doltcfg-dir=<doltcfg-dir>
      Defines a directory that contains configuration files for dolt. Defaults to `$data-dir/.doltcfg`. Will only be created
      if there is a change to configuration settings.
    
    --privilege-file=<privilege-file>
      Path to a file to load and store users and grants. Defaults to `$doltcfg-dir/privileges.db`. Will only be created if
      there is a change to privileges.
    
    --branch-control-file=<branch-control-file>
      Path to a file to load and store branch control permissions. Defaults to `$doltcfg-dir/branch_control.db`. Will only be
      created if there is a change to branch control permissions.
    
    --use-db=<use-db>
      The name of the database to use when executing SQL queries. Defaults the database of the root directory, if it exists,
      and the first alphabetically if not.
    
    --branch=<branch>
      Name of the branch to be selected
    
