---
source: "dolt table cp --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "3940e8a57c09f8a57a2a4be1dd97f5af433e2b1f3defedffebe76fc6967b82a8"
---

NAME
	dolt table cp - Makes a copy of a table

SYNOPSIS
	dolt table cp [-f] <oldtable> <newtable>

DESCRIPTION
	The dolt table cp command makes a copy of a table at a given commit. If a commit is not specified the copy is made of
	the table from the current working set.
	
	If a table exists at the target location this command will fail unless the --force|-f flag is provided.  In this case
	the table at the target location will be overwritten with the copied table.
	
	All changes will be applied to the working tables and will need to be staged using dolt add and committed using dolt
	commit.
	

OPTIONS
	<oldtable>
	  The table being copied.
	
	<newtable>
	  The destination where the table is being copied to.
	
	-f, --force
	  If data already exists in the destination, the force flag will allow the target to be overwritten.
	
