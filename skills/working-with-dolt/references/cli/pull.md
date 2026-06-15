---
source: "dolt pull --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "9bbf4f48ac67d7a99fda323e7956d6717a2b5a601d9d8682af0048f22b3d910a"
---

NAME
	dolt pull - Fetch from and integrate with another repository or a local branch

SYNOPSIS
	dolt pull [<remote>, [<remoteBranch>]]

DESCRIPTION
	Incorporates changes from a remote repository into the current branch. In its default mode, dolt pull is shorthand for
	dolt fetch followed by dolt merge <remote>/<branch>.
	
	More precisely, dolt pull runs dolt fetch with the given parameters and calls dolt merge to merge the retrieved branch
	HEAD into the current branch.
	
	With --rebase, it runs dolt rebase instead of dolt merge after fetching. If the rebase encounters data conflicts, it
	will pause and allow you to resolve them, then continue with dolt rebase --continue.
	

OPTIONS
	<remote>
	  The name of the remote to pull from.
	
	<remoteBranch>
	  The name of a branch on the specified remote to be merged into the current working set.
	
	--squash
	  Merge changes to the working set without updating the commit history
	
	--no-ff
	  Create a merge commit even when the merge resolves as a fast-forward.
	
	--ff-only
	  Refuse to merge unless the current HEAD is already up to date or the merge can be resolved as a fast-forward.
	
	-f, --force
	  Update from the remote HEAD even if there are errors.
	
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
	
	--user=<user>
	  User name to use when authenticating with the remote. Gets password from the environment variable DOLT_REMOTE_PASSWORD.
	
	-p, --prune
	  After fetching, remove any remote-tracking references that don't exist on the remote.
	
	-r, --rebase
	  After fetching, rebase the current branch on top of the upstream branch instead of merging.
	
	--silent
	  Suppress progress information.
	
	--skip-verification
	  Skip commit verification before merge
	
