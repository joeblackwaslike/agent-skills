---
source: "dolt conflicts resolve --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "5c28e3708bebd5ca3edbfc4efbdcf9d4499a12df3ee53aac202cb5d5454f2e7a"
---

NAME
	dolt conflicts resolve - Automatically resolves all conflicts taking either ours or theirs for the given tables

SYNOPSIS
	dolt conflicts resolve --ours|--theirs <table>...

DESCRIPTION
	
	When a merge finds conflicting changes, it documents them in the dolt_conflicts table. A conflict is between two
	versions: ours (the rows at the destination branch head) and theirs (the rows at the source branch head).
	
	dolt conflicts resolve will automatically resolve the conflicts by taking either the ours or theirs versions for each
	row.
	

OPTIONS
	<table>
	  List of tables to be resolved. '.' can be used to resolve all tables.
	
	--ours
	  For all conflicts, take the version from our branch and resolve the conflict
	
	--theirs
	  For all conflicts, take the version from their branch and resolve the conflict
	
