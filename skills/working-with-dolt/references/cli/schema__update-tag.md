---
source: "dolt schema update-tag --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "ffc45509c825e1d5539a9b79935739583a12bd9da91573bab014a9b1d82ba9d7"
---

NAME
	dolt schema update-tag - Update the tag of the specified column

SYNOPSIS
	dolt schema update-tag <table> <column> <tag>

DESCRIPTION
	dolt schema update-tag
	
	Update tag of the specified column. Useful to fix a merge that is throwing a
	schema tag conflict.
	

OPTIONS
	<table>
	  The name of the table
	
	<column>
	  The name of the column
	
	<tag>
	  The new tag value
	
