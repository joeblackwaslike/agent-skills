---
source: "dolt status --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "5ddb9b4b1c4e279ed06d7a3b2fc0aa0e6cb63e6593ee466348324d7077052988"
---

NAME
	dolt status - Show the working status

SYNOPSIS
	dolt status 

DESCRIPTION
	Displays working tables that differ from the current HEAD commit, tables that differ from the staged tables, and tables
	that are in the working tree that are not tracked by dolt. The first are what you would commit by running dolt commit;
	the second and third are what you could commit by running dolt add . before running dolt commit.

OPTIONS
	--ignored
	  Show tables that are ignored (according to dolt_ignore)
	
