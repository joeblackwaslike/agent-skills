---
source: "dolt remote --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "9bc7b381cb40645e1113b6673da34f6fcdefdd26a0102d29150f923a6668538c"
---

NAME
	dolt remote - Manage set of tracked repositories

SYNOPSIS
	dolt remote [-v | --verbose]
	dolt remote add [--aws-region <region>] [--aws-creds-type <creds-type>] [--aws-creds-file <file>] [--aws-creds-profile <profile>] <name> <url>
	dolt remote remove <name>

DESCRIPTION
	With no arguments, shows a list of existing remotes. Several subcommands are available to perform operations on the
	remotes.
	
	add
	Adds a remote named <name> for the repository at <url>. The command dolt fetch <name> can then be used to create and
	update remote-tracking branches <name>/<branch>.
	
	The <url> parameter supports url schemes of http, https, aws, gs, and file. The url prefix defaults to https. If the
	<url> parameter is in the format <organization>/<repository> then dolt will use the remotes.default_host from your
	configuration file (Which will be dolthub.com unless changed).
	
	AWS cloud remote urls should be of the form aws://[dynamo-table:s3-bucket]/database.  You may configure your aws cloud
	remote using the optional parameters aws-region, aws-creds-type, aws-creds-file.
	
	aws-creds-type specifies the means by which credentials should be retrieved in order to access the specified cloud
	resources (specifically the dynamo table, and the s3 bucket). Valid values are 'role', 'env', or 'file'.
	
		role: Use the credentials installed for the current user
		env: Looks for environment variables AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
		file: Uses the credentials file specified by the parameter aws-creds-file
	GCP remote urls should be of the form gs://gcs-bucket/database and will use the credentials setup using the gcloud
	command line available from Google.
	
	The local filesystem can be used as a remote by providing a repository url in the format file://absolute path. See
	https://en.wikipedia.org/wiki/File_URI_scheme
	
	remove, rm
	Remove the remote named <name>. All remote-tracking branches and configuration settings for the remote are removed.

OPTIONS
	--ref=<ref>
	  Git ref to use as the Dolt data ref for git remotes (default: refs/dolt/data).
	
	-v, --verbose
	  When printing the list of remotes adds additional details.
	
	--aws-region=<region>
	  Cloud provider region associated with this remote.
	
	--aws-creds-type=<creds-type>
	  Credential type. Valid options are role, env, and file. See the help section for additional details.
	
	--aws-creds-file=<file>
	  AWS credentials file
	
	--aws-creds-profile=<profile>
	  AWS profile to use
	
	--oss-creds-file=<file>
	  OSS credentials file
	
	--oss-creds-profile=<profile>
	  OSS profile to use
	
