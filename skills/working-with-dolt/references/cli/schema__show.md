---
source: "dolt schema show --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "4af02957c7cf761375dc7eabd63d6b055f6eb0e423f7f6d41be8bac23b257aa5"
---

NAME
	dolt schema show - Shows the schema of one or more tables.

SYNOPSIS
	dolt schema show [<commit>] [<table>...]

DESCRIPTION
	dolt schema show displays the schema of tables at a given commit.  If no commit is provided the working set will be
	used.
	
	A list of tables can optionally be provided.  If it is omitted all table schemas will be shown.

OPTIONS
	<table>
	  table(s) whose schema is being displayed.
	
	<commit>
	  commit at which point the schema will be displayed.
	
