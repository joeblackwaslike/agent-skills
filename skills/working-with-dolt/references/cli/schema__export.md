---
source: "dolt schema export --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "8b943bf4a12f30d79bbe392d12b46e1a1dcf2892d4881da6bda2b4c506c06e1a"
---

NAME
	dolt schema export - Exports table schemas as SQL DDL statements.

SYNOPSIS
	dolt schema export [<table>] [<file>]

DESCRIPTION
	Exports table schemas as SQL DDL statements, which can then be executed to recreate tables.
	
	If `table` is given, only that table's schema will be exported, otherwise all table schemas will be exported.
	
	If `file` is given, the exported schemas will be written to that file, otherwise they will be written to standard out.

OPTIONS
	<table>
	  table whose schema is being exported.
	
	<file>
	  the file to which the schema will be exported.
	
