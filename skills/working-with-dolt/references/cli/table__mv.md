---
source: "dolt table mv --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "c5ea822dad8c0495b7f885bc67c15434b9e5772de2f5b5fd648cba3918e2488a"
---

NAME
	dolt table mv - Renames a table

SYNOPSIS
	dolt table mv [-f] <oldtable> <newtable>

DESCRIPTION
	
	The dolt table mv command will rename a table. If a table exists with the target name this command will 
	fail unless the --force|-f flag is provided.  In that case the table at the target location will be overwritten 
	by the table being renamed.
	
	The result is equivalent of running dolt table cp <old> <new> followed by dolt table rm <old>, resulting 
	in a new table and a deleted table in the working set. These changes can be staged using dolt add and committed
	using dolt commit.

OPTIONS
	<oldtable>
	  The table being moved.
	
	<newtable>
	  The new name of the table
	
	-f, --force
	  If data already exists in the destination, the force flag will allow the target to be overwritten.
	
