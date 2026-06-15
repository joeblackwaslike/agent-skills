---
source: "dolt show --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "dede9966e53ee8921ba24bbc576a76b192a6939c8770d80fe35f146e262db1f2"
---

NAME
	dolt show - Show information about a specific commit

SYNOPSIS
	dolt show [<revision>]

DESCRIPTION
	Show information about a specific commit

OPTIONS
	--parents
	  Shows all parents of each commit in the log.
	
	--decorate=<decorate_fmt>
	  Shows refs next to commits. Valid options are short, full, no, and auto
	
	--no-pretty
	  Show the object without making it pretty.
	
	-d, --data
	  Show only the data changes, do not show the schema changes (Both shown by default).
	
	-s, --schema
	  Show only the schema changes, do not show the data changes (Both shown by default).
	
	--stat
	  Show stats of data changes
	
	--summary
	  Show summary of data and schema changes
	
	-r <result output format>, --result-format=<result output format>
	  How to format diff output. Valid values are tabular, sql, json. Defaults to tabular.
	
	--where=<column>
	  filters columns based on values in the diff.  See dolt diff --help for details.
	
	--limit=<record_count>
	  limits to the first N diffs.
	
	-c, --cached
	  Show only the staged data changes.
	
	-sk, --skinny
	  Shows only primary key columns and any columns with data changes.
	
	--merge-base
	  Uses merge base of the first commit and second commit (or HEAD if not supplied) as the first commit
	
	--diff-mode=<diff mode>
	  Determines how to display modified rows with tabular output. Valid values are row, line, in-place, context. Defaults to
	  context.
	
