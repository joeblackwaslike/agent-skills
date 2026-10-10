---
source: "dolt remote --help @ 2.4.2"
fetched_at: "2026-10-10T20:16:32.123Z"
sha256: "3f4a869430100de59db7b2a2932b1647b8eb00287fb9ae1c8f9765d002b0fddf"
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
	
	The <url> parameter supports url schemes of http, https, aws, s3, gs, and file. The url prefix defaults to https. If
	the <url> parameter is in the format <organization>/<repository> then dolt will use the remotes.default_host from your
	configuration file (Which will be dolthub.com unless changed).
	
	AWS cloud remote urls should be of the form aws://[dynamo-table:s3-bucket]/database.  You may configure your aws cloud
	remote using the optional parameters aws-region, aws-creds-type, aws-creds-file.
	
	aws-creds-type specifies the means by which credentials should be retrieved in order to access the specified cloud
	resources (specifically the dynamo table, and the s3 bucket). Valid values are 'role', 'env', or 'file'.
	
		role: Use the credentials installed for the current user
		env: Looks for environment variables AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
		file: Uses the credentials file specified by the parameter aws-creds-file
	S3-compatible remote urls should be of the form s3://bucket/database. They work against any object store implementing
	the S3 API with conditional writes, including AWS S3, Cloudflare R2, and MinIO, and require no DynamoDB table.
	Credentials always come from the standard AWS SDK chain and are never accepted in the url.
	
	A non-AWS provider is addressed with query parameters: endpoint (the provider host), region (the signing region, auto
	for R2), and path-style (true/false, needed by providers without wildcard DNS such as MinIO). Endpoint and region
	otherwise resolve from AWS_ENDPOINT_URL_S3, AWS_REGION and the shared config file. Because the url carries them, one
	repository can address several providers, for example:
	
		dolt remote add r2 's3://bucket/db?endpoint=https://<account>.r2.cloudflarestorage.com&region=auto'
	
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
	
