---
source: "dolt clone --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "971cf8039c7c683ef35533460f7ba40063547ab00f6babddea07b0b77de4b191"
---

NAME
	dolt clone - Clone a data repository into a new directory

SYNOPSIS
	dolt clone [-remote <remote>] [-branch <branch>]  [--aws-region <region>] [--aws-creds-type <creds-type>] [--aws-creds-file <file>] [--aws-creds-profile <profile>] <remote-url> <new-dir>

DESCRIPTION
	Clones a repository into a newly created directory, creates remote-tracking branches for each branch in the cloned
	repository (visible using <dolt branch -a>), and creates and checks out an initial branch that is forked from the
	cloned repository's currently active branch.
	
	After the clone, a plain dolt fetch without arguments will update all the remote-tracking branches, and a dolt pull
	without arguments will in addition merge the remote branch into the current branch.
	
	This default configuration is achieved by creating references to the remote branch heads under <refs/remotes/origin> 
	and by creating a remote named 'origin'.
	

OPTIONS
	--remote=<name>
	  Name of the remote to be added to the cloned database. The default is 'origin'.
	
	-b <branch>, --branch=<branch>
	  The branch to be cloned. If not specified all branches will be cloned.
	
	--depth=<depth>
	  Clone a single branch and limit history to the given commit depth.
	
	--ref=<ref>
	  Git ref to use as the Dolt data ref for git remotes (default: refs/dolt/data).
	
	--aws-region=<region>
	  
	
	--aws-creds-type=<creds-type>
	  
	
	--aws-creds-file=<file>
	  AWS credentials file.
	
	--aws-creds-profile=<profile>
	  AWS profile to use.
	
	--oss-creds-file=<file>
	  OSS credentials file.
	
	--oss-creds-profile=<profile>
	  OSS profile to use.
	
	-u <user>, --user=<user>
	  User name to use when authenticating with the remote. Gets password from the environment variable DOLT_REMOTE_PASSWORD.
	
	--single-branch
	  Clone only the history leading to the tip of a single branch, either specified by --branch or the remote's HEAD
	  (default).
	
