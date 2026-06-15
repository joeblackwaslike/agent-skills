---
source: "dolt backup --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "64778d0eccc924eb1c692702b3ebbbbdaa0b66abd7634653923cb21001f8c94b"
---

NAME
	dolt backup - Manage database backups, including creation, sync, and restore.

SYNOPSIS
	dolt backup [-v | --verbose]
	dolt backup add [--aws-region <region>] [--aws-creds-type <creds-type>] [--aws-creds-file <file>] [--aws-creds-profile <profile>] <name> <url>
	dolt backup remove <name>
	dolt backup restore [--aws-region <region>] [--aws-creds-type <creds-type>] [--aws-creds-file <file>] [--aws-creds-profile <profile>] [--force] <url> <name>
	dolt backup sync <name>
	dolt backup sync-url [--aws-region <region>] [--aws-creds-type <creds-type>] [--aws-creds-file <file>] [--aws-creds-profile <profile>] <url>

DESCRIPTION
	
	With no arguments, shows a list of existing backups. Several subcommands are available to perform operations on
	backups; point in time snapshots of a database's contents.
	
	add
	Adds a backup named <name> for the database at <url>.
	The <url> parameter supports http, https, aws, gs, and file schemes (https as default). If the <url> parameter is in
	the format <organization>/<repository> then dolt will use the backups.default_host from your configuration file
	(dolthub.com by default).
	The URL address must be unique to existing remotes and backups.
	
	AWS cloud backup URLs should be of the form aws://[dynamo-table:s3-bucket]/database. You may configure your AWS cloud
	backup using the optional parameters aws-region, aws-creds-type, aws-creds-file, aws-creds-profile.
	
	aws-creds-type specifies the means by which credentials should be retrieved in order to access the specified cloud
	resources (required for DynamoDB tables, and S3 buckets). Valid values are 'role', 'env', or 'file'.
	
		role: Use the credentials installed for the current user.
		env:  Looks for environment variables AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.
		file: Uses the credentials file specified by the parameter aws-creds-file.
	
	GCP backup URLs should follow the format gs://gcs-bucket/database. Backups will use the credentials that you configure
	using the gcloud CLI.
	
	The local filesystem can be used as a backup by providing a repository URL in the format file://absolute-path. See
	https://en.wikipedia.org/wiki/File_URI_scheme.
	
	remove, rm
	Remove the backup named <name>. All configuration settings for the backup are removed. The contents of the backup are
	not affected.
	
	restore
	Restore a Dolt database from a given <url> into a specified directory <name>. This will fail if <name> is already a
	Dolt database unless '--force' is provided, in which case the existing database will be overwritten with the contents
	of the restored backup.
	
	sync
	Snapshot the database and upload to the backup <name>. This includes branches, tags, working sets, and remote tracking
	refs.
	
	sync-url
	Snapshot the database and upload the backup to <url>. Like sync, this includes branches, tags, working sets, and remote
	tracking refs, but it does not require you to create a named backup.
	

OPTIONS
	<region>
	  cloud provider region associated with this backup.
	
	<creds-type>
	  credential type.  Valid options are role, env, and file.  See the help section for additional details.
	
	<profile>
	  AWS profile to use.
	
	-v, --verbose
	  When printing the list of backups adds additional details.
	
	-f, --force
	  When restoring a backup, overwrite the contents of the existing database with the same name.
	
	--ref=<ref>
	  Git ref to use as the Dolt data ref for git remotes (default: refs/dolt/data).
	
	--aws-region=<region>
	  
	
	--aws-creds-type=<creds-type>
	  
	
	--aws-creds-file=<file>
	  AWS credentials file
	
	--aws-creds-profile=<profile>
	  AWS profile to use
	
