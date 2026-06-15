---
source: "dolt rebase --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "d294e39793b5719e7e2986cf807e56eb9e6ed18023282f67f8711a36592c4a8f"
---

NAME
	dolt rebase - Reapplies commits on top of another base tip

SYNOPSIS
	dolt rebase [-i | --interactive] [--empty=drop|keep] <upstream>
	dolt rebase (--continue | --abort)

DESCRIPTION
	Rewrites commit history for the current branch by replaying commits, allowing the commits to be reordered, 
	squashed, or dropped. The commits included in the rebase plan are the commits reachable by the current branch, but NOT 
	reachable from the branch specified as the argument when starting a rebase (also known as the upstream branch). This is 
	the same as Git and Dolt's "two dot log" syntax, or |upstreamBranch|..|currentBranch|.
	
	Rebasing is useful to clean and organize your commit history, especially before merging a feature branch back to a
	shared 
	branch. For example, you can drop commits that contain debugging or test changes, or squash or fixup small commits into
	a 
	single commit, or reorder commits so that related changes are adjacent in the new commit history.
	

OPTIONS
	--empty=<empty>
	  How to handle commits that are not empty to start, but which become empty after rebasing. Valid values are: drop
	  (default) or keep
	
	--abort
	  Abort an interactive rebase and return the working set to the pre-rebase state
	
	--continue
	  Continue an interactive rebase after adjusting the rebase plan
	
	-i, --interactive
	  Start an interactive rebase
	
	--skip-verification
	  Skip commit verification before rebase
	
