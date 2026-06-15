---
source: "dolt branch --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "9012c624b5a0ebf8105650840171fa663240ec7ac567427ef570798c4db16e1f"
---

NAME
	dolt branch - List, create, or delete branches

SYNOPSIS
	dolt branch [--list] [-v] [-a] [-r]
	dolt branch [-f] <branchname> [<start-point>]
	dolt branch -m [-f] [<oldbranch>] <newbranch>
	dolt branch -c [-f] [<oldbranch>] <newbranch>
	dolt branch -d [-f] [-r] <branchname>...

DESCRIPTION
	If --list is given, or if there are no non-option arguments, existing branches are listed. The current branch will be
	highlighted with an asterisk. With no options, only local branches are listed. With -r, only remote branches are
	listed. With -a both local and remote branches are listed. -v causes the hash of the commit that the branches are at to
	be printed as well.
	
	The command's second form creates a new branch head named <branchname> which points to the current HEAD, or
	<start-point> if given.
	
	Note that this will create the new branch, but it will not switch the working tree to it; use dolt checkout <newbranch>
	to switch to the new branch.
	
	With a -m, <oldbranch> will be renamed to <newbranch>. If <newbranch> exists, -f must be used to force the rename to
	happen.
	
	The -c options have the exact same semantics as -m, except instead of the branch being renamed it will be copied to a
	new name.
	
	With a -d, <branchname> will be deleted. You may specify more than one branch for deletion.

OPTIONS
	<start-point>
	  A commit that a new branch should point at.
	
	-f, --force
	  Reset <branchname> to <startpoint>, even if <branchname> exists already. Without -f, dolt branch refuses to change an
	  existing branch. In combination with -d (or --delete), allow deleting the branch irrespective of its merged status. In
	  combination with -m (or --move), allow renaming the branch even if the new branch name already exists, the same applies
	  for -c (or --copy).
	
	-c, --copy
	  Create a copy of a branch.
	
	-m, --move
	  Move/rename a branch
	
	-d, --delete
	  Delete a branch. The branch must be fully merged in its upstream branch.
	
	--D
	  Shortcut for --delete --force.
	
	-t, --track
	  Set up upstream configuration for a branch. Uses current branch as default
	
	-u, --set-upstream-to
	  Set upstream configuration for a branch.
	
	--list
	  List branches
	
	-v, --verbose
	  When in list mode, show the hash and commit subject line for each head, along with relationship to upstream branch (if
	  any). If given twice, print the name of the upstream branch as well
	
	-a, --all
	  When in list mode, shows remote tracked branches
	
	--datasets
	  List all datasets in the database
	
	-r, --remote
	  When in list mode, show only remote tracked branches. When with -d, delete a remote tracking branch.
	
	--show-current
	  Print the name of the current branch
	
