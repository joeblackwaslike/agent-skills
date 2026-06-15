---
source: "dolt reflog --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "1efc46117cc7c161de577cc486d27414a25f40b506661809e20fadf59abc3bd8"
---

NAME
	dolt reflog - Shows a history of named refs

SYNOPSIS
	dolt reflog [--all] <ref>

DESCRIPTION
	Shows the history of named refs (e.g. branches and tags), which is useful for understanding how a branch 
	or tag changed over time to reference different commits, particularly for information not surfaced through dolt log.
	The data from Dolt's reflog comes from [Dolt's journaling chunk
	store](https://www.dolthub.com/blog/2023-03-08-dolt-chunk-journal/). 
	This data is local to a Dolt database and never included when pushing, pulling, or cloning a Dolt database. This means
	when you clone a Dolt database, it will not have any reflog data until you perform operations that change what commit
	branches or tags reference.
	
	Dolt's reflog is similar to [Git's reflog](https://git-scm.com/docs/git-reflog), but there are a few differences:
	- The Dolt reflog currently only supports named references, such as branches and tags, and not any of Git's special
	refs (e.g. HEAD, FETCH-HEAD, MERGE-HEAD).
	- The Dolt reflog can be queried for the log of references, even after a reference has been deleted. In Git, once a
	branch or tag is deleted, the reflog for that ref is also deleted and to find the last commit a branch or tag pointed
	to you have to use Git's special HEAD reflog to find the commit, which can sometimes be challenging. Dolt makes this
	much easier by allowing you to see the history for a deleted ref so you can easily see the last commit a branch or tag
	pointed to before it was deleted.

OPTIONS
	--all
	  Show all refs, including hidden refs, such as DoltHub workspace refs
	
