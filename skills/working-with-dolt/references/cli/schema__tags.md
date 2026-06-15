---
source: "dolt schema tags --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "020ac56e41d1f270ba8daf78312ee4de5b30ee5094b8884d7863a516ae48bd1c"
---

NAME
	dolt schema tags - Shows the column tags of one or more tables.

SYNOPSIS
	dolt schema tags [-r <result format>] [<table>...]

DESCRIPTION
	dolt schema tags displays the column tags of tables on the working set.
	
	A list of tables can optionally be provided.  If it is omitted then all tables will be shown. If a given table does not
	exist, then it is ignored.

OPTIONS
	<table>
	  table(s) whose tags will be displayed.
	
	-r <result output format>, --result-format=<result output format>
	  How to format result output. Valid values are tabular, csv, json. Defaults to tabular.
	
