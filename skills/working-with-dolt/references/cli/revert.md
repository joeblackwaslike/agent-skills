---
source: "dolt revert --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "335154156af3c516033c6a79300378034178d478710acb818fd1c16d2647f669"
---

NAME
	dolt revert - Undo the changes introduced in a commit

SYNOPSIS
	dolt revert <revision>...
	dolt revert --continue
	dolt revert --abort

DESCRIPTION
	Removes the changes made in a commit (or series of commits) from the working set, and then automatically commits the
	result. This is done by way of a three-way merge. Given a specific commit (e.g. HEAD~1), this is similar to applying
	the patch from HEAD~1..HEAD~2, giving us a patch of what to remove to effectively remove the influence of the specified
	commit. If multiple commits are specified, then each is reverted in the order given, creating a separate commit for
	each revert. This requires a clean working set.
	
	If conflicts or constraint violations are encountered during a revert, the operation pauses and leaves the conflicting
	state in the working set. Resolve the conflicts, stage the resolved tables with dolt add, and then run dolt revert
	--continue to complete the revert. To abandon the revert entirely, run dolt revert --abort.

OPTIONS
	<revision>
	  The commit revisions. If multiple revisions are given, they're applied in the order given.
	
	--author=<author>
	  Specify an explicit author using the standard A U Thor <author@example.com> format.
	
	--abort
	  Abort the current revert operation and return the working set to the pre-revert state.
	
	--continue
	  Continue the current revert operation after resolving conflicts.
	
