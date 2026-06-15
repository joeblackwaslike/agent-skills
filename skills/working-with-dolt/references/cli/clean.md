---
source: "dolt clean --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "28bc93123b14bbf02a5ccb4bd78a5c763c12e0ac58e5b3d2cf5b16ad16c42fdc"
---

NAME
	dolt clean - Deletes untracked working tables

SYNOPSIS
	dolt clean [--dry-run] [-x]
	dolt clean [--dry-run] [-x] <tables>...

DESCRIPTION
	dolt clean [--dry-run] [-x]
	
	The default (parameterless) form clears the values for all untracked working <tables> .This command permanently deletes
	unstaged or uncommitted tables. By default, tables matching dolt_ignore or dolt_nonlocal_tables are not removed.
	
	The --dry-run flag can be used to test whether the clean can succeed without deleting any tables from the current
	working set.
	
	The -x flag causes dolt_ignore to be ignored so that untracked tables matching dolt_ignore are removed;
	dolt_nonlocal_tables is always respected (similar to git clean -x).
	
	dolt clean [--dry-run] [-x] <tables>...
	
	If <tables> is specified, only those table names are considered for deleting.
	
	

OPTIONS
	--dry-run
	  Tests removing untracked tables without modifying the working set.
	
	-x, --x
	  Do not respect dolt_ignore; remove untracked tables that match dolt_ignore. dolt_nonlocal_tables is always respected.
	
