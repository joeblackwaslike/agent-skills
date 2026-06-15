---
source: "dolt config --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "82a5722207eda02d2d6183a3f7611add4229eefede8f622e86e3e7ef41d0bda2"
---

NAME
	dolt config - Get and set repository or global options

SYNOPSIS
	dolt config [--global|--local] --list
	dolt config [--global|--local] --add <name> <value>
	dolt config [--global|--local] --set <name> <value>
	dolt config [--global|--local] --get <name>
	dolt config [--global|--local] --unset <name>...

DESCRIPTION
	You can query/set/replace/unset options with this command.
	When reading, the values are read from the global and repository local configuration files, and options <--global>, and
	<--local> can be used to tell the command to read from only that location.
	
	When writing, the new value is written to the repository local configuration file by default, and options <--global>,
	can be used to tell the command to write to that location (you can say <--local> but that is the default).
	
	Valid configuration variables:
	
		- core.editor - lets you edit 'commit' or 'tag' messages by launching the set editor.
	
		- creds.add_url - sets the endpoint used to authenticate a client for 'dolt login'.
	
		- doltlab.insecure - boolean flag used to authenticate a client against DoltLab.
	
		- init.defaultbranch - allows overriding the default branch name e.g. when initializing a new repository.
	
		- metrics.disabled - boolean flag disables sending metrics when true.
	
		- user.creds - sets user keypairs for authenticating with doltremoteapi.
	
		- user.email - sets name used in the author and committer field of commit objects.
	
		- user.name - sets email used in the author and committer field of commit objects.
	
		- remotes.default_host - sets default host for authenticating with doltremoteapi.
	
		- remotes.default_port - sets default port for authenticating with doltremoteapi.
	
		- push.autoSetupRemote - if set to "true" assume --set-upstream on default push when no upstream tracking exists for
		the current branch.
	

OPTIONS
	--global
	  Use global config.
	
	--local
	  Use repository local config.
	
	--add
	  Set the value of one or more config parameters
	
	--set
	  Set the value of one or more config parameters
	
	--list
	  List the values of all config parameters.
	
	--get
	  Get the value of one or more config parameters.
	
	--unset
	  Unset the value of one or more config parameters.
	
