---
source: "dolt rm --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "61b63008106d90b6180e1de132f96674ca113c21bb7d28b7cde8d1eea7a0ea5f"
---

NAME
	dolt rm - Drops a table and removes it from tracking

SYNOPSIS
	dolt rm [<table>...]

DESCRIPTION
	
	In it's default mode, this command drops a table and removes it from tracking. Without '--cached', you can only call rm
	on committed tables.
	
	The option '--cached' can be used to untrack tables, but leave them in the working set. You can restage them with 'dolt
	add'.
	
	The dolt status command can be used to obtain a summary of which tables have changes that are staged for the next
	commit.'

OPTIONS
	<table>
	  table(s) to remove from the list of tables staged to be committed.
	
	--cached
	  Use this option to unstage and remove tables only from the index. Working tree tables, whether modified or not, will be
	  left alone.
	
