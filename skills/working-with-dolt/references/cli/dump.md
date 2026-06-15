---
source: "dolt dump --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "c03d6abcecf6a6a9128a2aa573a0ee02acd4e9b6c0951e32820a666f027bdeeb"
---

NAME
	dolt dump - Export all tables.

SYNOPSIS
	dolt dump [-f] [-r <result-format>] [-fn <file_name>]  [-d <directory>] [--batch] [--no-batch] [--no-autocommit] [--no-create-db] 

DESCRIPTION
	dolt dump dumps all tables in the working set. 
	If a dump file already exists then the operation will fail, unless the --force | -f flag 
	is provided. The force flag forces the existing dump file to be overwritten. The -r flag 
	is used to support different file formats of the dump. In the case of non .sql files each table is written to a separate
	csv,json or parquet file. 
	

OPTIONS
	-r <result_file_type>, --result-format=<result_file_type>
	  Define the type of the output file. Defaults to sql. Valid values are sql, csv, json and parquet.
	
	-fn <file_name>, --file-name=<file_name>
	  Define file name for dump file. Defaults to `doltdump.sql`.
	
	-d <directory_name>, --directory=<directory_name>
	  Define directory name to dump the files in. Defaults to `doltdump/`.
	
	-f, --force
	  If data already exists in the destination, the force flag will allow the target to be overwritten.
	
	--batch
	  Return batch insert statements wherever possible, enabled by default.
	
	--no-batch
	  Emit one row per statement, instead of batching multiple rows into each statement.
	
	-na, --no-autocommit
	  Turn off autocommit for each dumped table. Useful for speeding up loading of output SQL file.
	
	--schema-only
	  Dump a table's schema, without including any data, to the output SQL file.
	
	--no-create-db
	  Do not write `CREATE DATABASE` statements in SQL files.
	
