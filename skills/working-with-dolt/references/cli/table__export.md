---
source: "dolt table export --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "3208ac47c45bb50fb1c80e899dde76c4ef13b0d8437c5b64b9381cdcbee2b643"
---

NAME
	dolt table export - Export the contents of a table to a file.

SYNOPSIS
	dolt table export [-f] [-pk <field>] [-schema <file>] [-map <file>] [-continue] [-file-type <type>] <table> <file>

DESCRIPTION
	dolt table export will export the contents of <table> to <|file>
	
	The output format is inferred from the file extension, or can be set explicitly with --file-type.
	
	Supported file types: csv, psv, json, jsonl, sql, parquet.
	
	.json exports a single JSON object containing a rows array; .jsonl exports one JSON object per line.
	
	See the help for dolt table import as the options are the same.
	

OPTIONS
	<table>
	  The table being exported.
	
	<file>
	  The file being output to.
	
	-f, --force
	  If data already exists in the destination, the force flag will allow the target to be overwritten.
	
	--file-type=<file_type>
	  Explicitly define the type of the file if it can't be inferred from the file extension.
	
