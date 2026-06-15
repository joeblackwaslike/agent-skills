---
source: "dolt diff --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "a7ff9846359948ab9e4440c51e7f36f1ddfc32d8668409e047ce3b4468db6e03"
---

NAME
	dolt diff - Show changes between commits, commit and working tree, etc

SYNOPSIS
	dolt diff [options] [<commit>] [<tables>...]
	dolt diff [options] <commit> <commit> [<tables>...]

DESCRIPTION
	
	Show changes between the working and staged tables, changes between the working tables and the tables within a commit,
	or changes between tables at two commits.
	
	dolt diff [--options] [<tables>...]
	   This form is to view the changes you made relative to the staging area for the next commit. In other words, the
	   differences are what you could tell Dolt to further add but you still haven't. You can stage these changes by using
	   dolt add.
	
	dolt diff [--options] [--merge-base] <commit> [<tables>...]
	   This form is to view the changes you have in your working tables relative to the named <commit>. You can use HEAD to
	   compare it with the latest commit, or a branch name to compare with the tip of a different branch. If --merge-base
	   is given, instead of using <commit>, use the merge base of <commit> and HEAD. dolt diff --merge-base A is equivalent
	   to dolt diff $(dolt merge-base A HEAD) and dolt diff A...HEAD.
	
	dolt diff [--options] [--merge-base] <commit> <commit> [<tables>...]
	   This is to view the changes between two arbitrary commit. If --merge-base is given, use the merge base of the two
	   commits for the "before" side. dolt diff --merge-base A B is equivalent to dolt diff $(dolt merge-base A B) B and
	   dolt diff A...B.
	
	dolt diff [--options] <commit>..<commit> [<tables>...]
	   This is synonymous to the above form (without the ..) to view the changes between two arbitrary commit.
	
	dolt diff [--options] <commit>...<commit> [<tables>...]
	   This is to view the changes on the branch containing and up to the second <commit>, starting at a common ancestor of
	   both <commit>. dolt diff A...B is equivalent to dolt diff $(dolt merge-base A B) B and dolt diff --merge-base A B.
	   You can omit any one of <commit>, which has the same effect as using HEAD instead.
	
	The diffs displayed can be limited to show the first N by providing the parameter --limit N where N is the number of
	diffs to display.
	
	To filter which data rows are displayed, use --where <SQL expression>. Table column names in the filter expression must
	be prefixed with from_ or to_, e.g. to_COLUMN_NAME > 100 or from_COLUMN_NAME + to_COLUMN_NAME = 0.
	
	To filter diff output by change type, use --filter <type> where <type> is one of added, modified, renamed, or dropped.
	The added filter shows only additions (new tables or rows), modified shows only schema modifications or row updates,
	renamed shows only renamed tables, and dropped shows only deletions (dropped tables or deleted rows). You can also use
	removed as an alias for dropped. For example, dolt diff --filter=dropped shows only deleted rows and dropped tables.
	
	The --diff-mode argument controls how modified rows are presented when the format output is set to tabular. When set to
	row, modified rows are presented as old and new rows. When set to line, modified rows are presented as a single row,
	and changes are presented using "+" and "-" within the column. When set to in-place, modified rows are presented as a
	single row, and changes are presented side-by-side with a color distinction (requires a color-enabled terminal). When
	set to context, rows that contain at least one column that spans multiple lines uses line, while all other rows use
	row. The default value is context.
	

OPTIONS
	-sk, --skinny
	  Shows only primary key columns and any columns with data changes.
	
	-ic <columns>, --include-cols=<columns>
	  A list of columns to include in the diff.
	
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
	
	--filter=<diff_type>
	  filters results based on the type of change (added, modified, renamed, dropped). 'removed' is accepted as an alias for
	  'dropped'.
	
	--staged
	  Show only the staged data changes.
	
	-c, --cached
	  Synonym for --staged
	
	--merge-base
	  Uses merge base of the first commit and second commit (or HEAD if not supplied) as the first commit
	
	--diff-mode=<diff mode>
	  Determines how to display modified rows with tabular output. Valid values are row, line, in-place, context. Defaults to
	  context.
	
	-R, --reverse
	  Reverses the direction of the diff.
	
	--name-only
	  Only shows table names.
	
	--system
	  Show system tables in addition to user tables
	
