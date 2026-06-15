---
source: "dolt query-diff --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "489deb5481f1e7fd8717491235f55080001ca996a6b3c7a70048cfa9c59b538e"
---

NAME
	dolt query-diff - Calculates table diff between two queries

SYNOPSIS
	dolt query-diff [options] [<query1>] [<query2>]

DESCRIPTION
	Will execute two queries and compare the resulting table sets
	
	`<query1>`: A SQL `SELECT` query to be executed.
	
	`<query2>`: A SQL `SELECT` query to be executed.
	
	**Note**
	
	Query diff is performed brute force and thus, will be slow for large result sets.
	The algorithm is super linear (`n^2`) on the size of the results sets.
	Over time, we will optimize this to use features of the storage engine to improve performance.
