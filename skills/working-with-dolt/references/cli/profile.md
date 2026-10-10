---
source: "dolt profile --help @ 2.4.2"
fetched_at: "2026-10-10T20:16:32.123Z"
sha256: "d8251a8cc31eb355d9e9b87029d423dd033240dda279998fd9287a146487b0a4"
---

NAME
	dolt profile - Manage dolt profiles for CLI global options.

SYNOPSIS
	dolt profile [-v | --verbose]
	dolt profile add [-u <user>] [-p <password>] [--host <host>] [--port <port>] [--no-tls] [--data-dir <directory>] [--doltcfg-dir <directory>] [--privilege-file <privilege file>] [--branch-control-file <branch control file>] [--use-db <database>] <name>
	dolt profile remove <name>

DESCRIPTION
	With no arguments, shows a list of existing profiles. Two subcommands are available to perform operations on the
	profiles.
	
	add
	Adds a profile named <name>. Returns an error if the profile already exists.
	
	remove, rm
	Remove the profile named <name>.

OPTIONS
	<name>
	  Defines the name of the profile to add or remove.
	
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
	
	-C <dir>, --directory=<dir>
	  Run the command as if executed in the directory provided. When repeated, each relative path is resolved from the
	  preceding directory. Matches git -C behaviour.
	
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
	
	-v, --verbose
	  Includes full details when printing list of profiles.
	
