---
source: "dolt stash --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "46a6157279df7ad695c4d1323b8e9c9e47f2339e0fb507254e5e22c7e3b8411b"
---

NAME
	dolt stash - Stash the changes in a dirty workspace away.

SYNOPSIS
	dolt stash 
	dolt stash list
	dolt stash pop [<stash>]
	dolt stash apply [<stash>]
	dolt stash drop [<stash>]
	dolt stash clear

DESCRIPTION
	Use dolt stash when you want to record the current state of the workspace and the index, but want to go back to a clean
	workspace.
	
	The command saves your local modifications away and reverts the workspace to match the HEAD commit. The stash entries
	that are saved away can be listed with dolt stash list.
	
	With pop, the stash entry is applied to the working set and then removed. With apply, the stash entry is applied but
	kept. Both default to stash@{0} if no stash is specified. If there are conflicting local changes, the operation fails
	and the stash entry is preserved.
	
	Stash entries are shared across branches, so you can stash on one branch and pop or apply on another.
	

OPTIONS
	-u, --include-untracked
	  Untracked tables are also stashed.
	
	-a, --all
	  All tables are stashed, including untracked and ignored tables.
	
