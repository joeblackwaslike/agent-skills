---
source: "dolt ls --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "88b94431eaa983ba5f29a401376a1584891ea9076f53df4acb8d04959f6a2aad"
---

NAME
	dolt ls - List tables

SYNOPSIS
	dolt ls [--options] [<commit>]

DESCRIPTION
	With no arguments lists the tables in the current working set but if a commit is specified it will list the tables in
	that commit.  If the --verbose flag is provided a row count of the table will also be displayed.
	
	If the --system flag is supplied this will show the dolt system tables which are queryable with SQL.
	
	If the --all flag is supplied both user and system tables will be printed.
	

OPTIONS
	-v, --verbose
	  show the hash of the table and row count
	
	-s, --system
	  show system tables
	
	-a, --all
	  show user and system tables
	
