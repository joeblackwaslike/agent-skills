---
source: "dolt add --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "fcbb213944b12e1cbddb04f538c70cead0e212a468eb19bf5a46e46bca17ba42"
---

NAME
	dolt add - Add table contents to the list of staged tables

SYNOPSIS
	dolt add [<table>...]

DESCRIPTION
	
	This command updates the list of tables using the current content found in the working root, to prepare the content
	staged for the next commit. It adds the current content of existing tables as a whole or remove tables that do not
	exist in the working root anymore.
	
	This command can be performed multiple times before a commit. It only adds the content of the specified table(s) at the
	time the add command is run; if you want subsequent changes included in the next commit, then you must run dolt add
	again to add the new content to the index.
	
	The dolt status command can be used to obtain a summary of which tables have changes that are staged for the next
	commit.

OPTIONS
	<table>
	  Working table(s) to add to the list tables staged to be committed. The abbreviation '.' can be used to add all tables.
	
	-A, --all
	  Stages any and all changes (adds, deletes, and modifications) except for ignored tables.
	
	-f, --force
	  Allow adding otherwise ignored tables.
	
	-p, --patch
	  Interactively select changes to add to the staged set.
	
