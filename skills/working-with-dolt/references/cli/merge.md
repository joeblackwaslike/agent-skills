---
source: "dolt merge --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "ec0518603eb35d729b9819059da967afac8373eb35c2f9fedf8fad8b2625b918"
---

NAME
	dolt merge - Join two or more development histories together

SYNOPSIS
	dolt merge [--squash] <branch>
	dolt merge --no-ff [-m message] <branch>
	dolt merge --ff-only <branch>
	dolt merge --abort

DESCRIPTION
	Incorporates changes from the named commits (since the time their histories diverged from the current branch) into the
	current branch.
	
	The second syntax (<dolt merge --abort>) can only be run after the merge has resulted in conflicts. dolt merge --abort
	will abort the merge process and try to reconstruct the pre-merge state. However, if there were uncommitted changes
	when the merge started (and especially if those changes were further modified after the merge was started), dolt merge
	--abort will in some cases be unable to reconstruct the original (pre-merge) changes. Therefore: 
	
	<Warning>: Running dolt merge with non-trivial uncommitted changes is discouraged: while possible, it may leave you in
	a state that is hard to back out of in the case of a conflict.
	

OPTIONS
	--no-ff
	  Create a merge commit even when the merge resolves as a fast-forward.
	
	--ff-only
	  Refuse to merge unless the current HEAD is already up to date or the merge can be resolved as a fast-forward.
	
	--squash
	  Merge changes to the working set without updating the commit history
	
	-m <msg>, --message=<msg>
	  Use the given <msg> as the commit message.
	
	--abort
	  Abort the in-progress merge and return the working set to the state before the merge started.
	
	--commit
	  Perform the merge and commit the result. This is the default option, but can be overridden with the --no-commit flag.
	  Note that this option does not affect fast-forward merges, which don't create a new merge commit, and if any merge
	  conflicts or constraint violations are detected, no commit will be attempted.
	
	--no-commit
	  Perform the merge and stop just before creating a merge commit. Note this will not prevent a fast-forward merge; use
	  the --no-ff arg together with the --no-commit arg to prevent both fast-forwards and merge commits.
	
	--no-edit
	  Use an auto-generated commit message when creating a merge commit. The default for interactive CLI sessions is to open
	  an editor.
	
	--author=<author>
	  Specify an explicit author using the standard A U Thor <author@example.com> format.
	
	--skip-verification
	  Skip commit verification before merge
	
	--dont-merge-json
	  Do not attempt to automatically resolve multiple changes to the same JSON value, report a conflict instead.
	
