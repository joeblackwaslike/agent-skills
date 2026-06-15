---
source: "dolt init --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "335501d63a8343cd9737f5b298a4ebf0c2e5e730ca68e2e23aa3fea097d15420"
---

NAME
	dolt init - Create an empty Dolt data repository

SYNOPSIS
	dolt init 

DESCRIPTION
	This command creates an empty Dolt data repository in the current directory.
	
	Running dolt init in an already initialized directory will fail.
	

OPTIONS
	--name=<name>
	  The name used in commits to this repo. If not provided will be taken from user.name in the global config.
	
	--email=<email>
	  The email address used. If not provided will be taken from user.email in the global config.
	
	--date=<date>
	  Specify the date used in the initial commit. If not specified the current system time is used.
	
	-b <branch>, --initial-branch=<branch>
	  The branch name used to initialize this database. If not provided will be taken from init.defaultbranch in the global
	  config. If unset, the default initialized branch will be named 'main'.
	
	--fun
	  
	
