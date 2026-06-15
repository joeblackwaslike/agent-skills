---
source: "dolt filter-branch --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "7242bb13a669b1f29cbfd5d711bea79039ffe0b8ef7890d48372d22bf13e584a"
---

NAME
	dolt filter-branch - Edits the commit history using the provided query

SYNOPSIS
	dolt filter-branch [--all] -q <queries> [<commit>]

DESCRIPTION
	Traverses the commit history to the initial commit starting at the current HEAD commit, or a commit you name. Replays
	all commits, rewriting the history using the provided SQL queries. Separate multiple queries with semicolons. Use the
	DELIMITER syntax to define stored procedures, triggers, etc. 
	
	If a <commit-spec> is provided, the traversal will stop when the commit is reached and rewriting will begin at that
	commit, or will error if the commit is not found.
	
	If the --branches flag is supplied, filter-branch traverses and rewrites commits for all branches.
	
	If the --all flag is supplied, filter-branch traverses and rewrites commits for all branches and tags.
	

OPTIONS
	-v, --verbose
	  logs more information
	
	-b, --branches
	  filter all branches
	
	--apply-to-uncommitted
	  apply changes to uncommitted tables
	
	-a, --all
	  filter all branches and tags
	
	-c, --continue
	  log a warning and continue if any errors occur executing statements
	
	-q <queries>, --query=<queries>
	  Queries to run, separated by semicolons. If not provided, queries are read from STDIN.
	
