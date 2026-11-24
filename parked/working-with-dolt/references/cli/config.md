---
source: "dolt config --help @ 2.4.2"
fetched_at: "2026-10-10T20:16:32.123Z"
sha256: "5290efca421d2a818b5ea931282942065827f2da3e02b68ded7322874557bfd3"
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
	
		- remotesapi.credential_helper - sets a global credential helper for remotesapi requests. This option is ignored in
		repository local config.
	
		- push.autoSetupRemote - if set to "true" assume --set-upstream on default push when no upstream tracking exists for
		the current branch.
	
		- git-remote.max-history-commits - maximum reachable Git data commits (default 64; 0 means unlimited).
	
		- git-remote.reset-history-on-prune - reset Git history when obsolete tables are removed (default true).
	
	Environment variables DOLT_GIT_REMOTE_MAX_HISTORY_COMMITS and DOLT_GIT_REMOTE_RESET_HISTORY_ON_PRUNE override local and
	global config. Longer Git histories improve incremental transfers but retain obsolete data until history is reset.
	These settings affect the shared Git remote's data history. For unlimited history, set max-history-commits to 0 and
	reset-history-on-prune to false.
	
	Credential helpers use the Bazel credential helper protocol. Dolt invokes the configured executable with the get
	argument and sends the canonical remotesapi origin on stdin:
	
		{"uri":"https://example.com:443"}
	
	The helper returns additive HTTP headers and, optionally, an RFC 3339 expiration time:
	
		{"headers":{"Proxy-Authorization":["Bearer TOKEN"]},"expires":"2026-06-24T20:00:00Z"}
	
	Dolt caches headers until shortly before their expiration. Responses without an expiration are used once. The helper is
	responsible for returning credentials only for origins it trusts. It cannot replace Dolt's own Authorization header or
	transport-controlled headers.
	

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
	
