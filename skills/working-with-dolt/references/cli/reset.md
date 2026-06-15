---
source: "dolt reset --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "6f9d17a3a4fc909be44517454472e90586d98fdbe226d5aa12edcf80afa1b852"
---

NAME
	dolt reset - Resets staged or working tables to HEAD or a specified commit

SYNOPSIS
	dolt reset <tables>...
	dolt reset [--hard | --soft] <revision>

DESCRIPTION
	dolt reset <tables>...
	
	The default form resets the values for all staged <tables> to their values at HEAD. It does not affect the working tree
	or the current branch.
	
	This means that dolt reset <tables> is the opposite of dolt add <tables>.
	
	After running dolt reset <tables> to update the staged tables, you can use dolt checkout to check the contents out of
	the staged tables to the working tables.
	
	dolt reset [--hard | --soft] <revision>
	
	This form resets all tables to values in the specified revision (i.e. commit, tag, working set). The --soft option
	resets HEAD to a revision without changing the current working set.  The --hard option resets all three HEADs to a
	revision, deleting all uncommitted changes in the current working set.
	
	dolt reset .
	
	This form resets all staged tables to their values at HEAD. It is the opposite of dolt add .

OPTIONS
	--hard
	  Resets the working tables and staged tables. Any changes to tracked tables in the working tree since <commit> are
	  discarded.
	
	--soft
	  Resets HEAD to the specified revision without touching the index or the working tables.
	
