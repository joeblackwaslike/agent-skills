---
source: "dolt log --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "282cbd02503192dd4cbfcf5681b51b63756f20d5ba48069e082ffea405ed9bf1"
---

NAME
	dolt log - Show commit logs

SYNOPSIS
	dolt log [-n <num_commits>] [<revision-range>] [[--] <table>]

DESCRIPTION
	Shows the commit logs
	
	The command takes options to control what is shown and how. 
	
	dolt log
	  Lists commit logs from current HEAD when no options provided.
	dolt log [<revisions>...]
	  Lists commit logs starting from revision. If multiple revisions provided, lists logs reachable by all revisions.
	dolt log [<revisions>...] -- <table>
	  Lists commit logs starting from revisions, only including commits with changes to table.
	dolt log <revisionB>..<revisionA>
	dolt log <revisionA> --not <revisionB>
	dolt log ^<revisionB> <revisionA>
	  Different ways to list two dot logs. These will list commit logs for revisionA, while excluding commits from
	  revisionB. The table option is not supported for two dot log.
	dolt log <revisionB>...<revisionA>
	dolt log <revisionA> <revisionB> --not $(dolt merge-base <revisionA> <revisionB>)
	  Different ways to list three dot logs. These will list commit logs reachable by revisionA OR revisionB, while
	  excluding commits reachable by BOTH revisionA AND revisionB.

OPTIONS
	-n <num_commits>, --number=<num_commits>
	  Limit the number of commits to output.
	
	--min-parents=<parent_count>
	  The minimum number of parents a commit must have to be included in the log.
	
	--merges
	  Equivalent to min-parents == 2, this will limit the log to commits with 2 or more parents.
	
	--parents
	  Shows all parents of each commit in the log.
	
	--decorate=<decorate_fmt>
	  Shows refs next to commits. Valid options are short, full, no, and auto
	
	--not=<revision>
	  Excludes commits from revision.
	
	--all
	  Automatically select every branch in database
	
	--show-signature
	  Shows the signature of each commit.
	
	--oneline
	  Shows logs in a compact format.
	
	--stat
	  Shows the diffstat for each commit.
	
	--graph
	  Shows the commit graph.
	
