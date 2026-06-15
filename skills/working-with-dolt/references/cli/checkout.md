---
source: "dolt checkout --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "c54cfe81ca21c9d3422416957c73c97d86be4782d1686902a65277beeae28103"
---

NAME
	dolt checkout - Switch branches or restore working tree tables

SYNOPSIS
	dolt checkout <branch>
	dolt checkout <commit> [--] <table>...
	dolt checkout <table>...
	dolt checkout -b <new-branch> [<start-point>]
	dolt checkout --track <remote>/<branch>

DESCRIPTION
	
	Updates tables in the working set to match the staged versions. If no paths are given, dolt checkout will also update
	HEAD to set the specified branch as the current branch.
	
	dolt checkout <branch>
	   To prepare for working on <branch>, switch to it by updating the index and the tables in the working tree, and by
	   pointing HEAD at the branch. Local modifications to the tables in the working
	   tree are kept, so that they can be committed to the <branch>.
	
	dolt checkout <commit> [--] <table>...
		 Specifying table names after a commit reference (branch, commit hash, tag, etc.) updates the working set to match
		 that commit for one or more tables, but keeps the current branch. Local modifications to the tables named will be
		 overwritten by their versions in the commit named.
	
	dolt checkout -b <new_branch> [<start_point>]
	   Specifying -b causes a new branch to be created as if dolt branch were called and then checked out.
	
	dolt checkout <table>...
	  To update table(s) with their values in HEAD 

OPTIONS
	--b=<branch>
	  Create a new branch named <new_branch> and start it at <start_point>.
	
	--B=<branch>
	  Similar to '-b'. Forcibly resets the branch to <start_point> if it exists.
	
	-f, --force
	  If there is any changes in working set, the force flag will wipe out the current changes and checkout the new branch.
	
	-t, --track
	  When creating a new branch, set up 'upstream' configuration.
	
	--overwrite-ignore
	  Silently overwrite ignored tables when switching branches (default behavior).
	
	--no-overwrite-ignore
	  Abort the operation when ignored tables in the working set would be overwritten by the checkout.
	
