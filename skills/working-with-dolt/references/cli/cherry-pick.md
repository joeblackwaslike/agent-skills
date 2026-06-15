---
source: "dolt cherry-pick --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "1067bb67e8b2ff48975139fb841fad1fd33781b10d755db76a43d0e42514a302"
---

NAME
	dolt cherry-pick - Apply the changes introduced by an existing commit.

SYNOPSIS
	dolt cherry-pick [--allow-empty] <commit>

DESCRIPTION
	
	Applies the changes from an existing commit and creates a new commit from the current HEAD. This requires your working
	tree to be clean (no modifications from the HEAD commit).
	
	Cherry-picking merge commits or commits with table drops/renames is not currently supported. 
	
	If any data conflicts, schema conflicts, or constraint violations are detected during cherry-picking, you can use
	Dolt's conflict resolution features to resolve them. For more information on resolving conflicts, see:
	https://dolthub.com/docs/concepts/dolt/git/conflicts.
	

OPTIONS
	--abort
	  Abort the current conflict resolution process, and revert all changes from the in-process cherry-pick operation.
	
	--continue
	  Continue the current cherry-pick operation after conflicts have been resolved.
	
	--allow-empty
	  Allow empty commits to be cherry-picked. Note that use of this option only keeps commits that were initially empty.
	  Commits which become empty, due to a previous commit, will cause cherry-pick to fail.
	
	--skip-verification
	  Skip commit verification before cherry-pick
	
	--dont-merge-json
	  Do not attempt to automatically resolve multiple changes to the same JSON value, report a conflict instead.
	
