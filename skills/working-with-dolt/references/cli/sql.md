---
source: "dolt sql --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "7e40c70115fbe56c775e11a397cb21f8cbf20bc68e9793fc162aa28b2e22adec"
---

NAME
	dolt sql - Runs a SQL query

SYNOPSIS
	dolt sql 
	dolt sql < script.sql
	dolt sql -q <query> [-r <result format>] [-s <name> -m <message>] [-b]
	dolt sql -x <name>
	dolt sql --list-saved

DESCRIPTION
	Runs a SQL query you specify. With no arguments, begins an interactive shell to run queries and view the results. With
	the -q option, runs the given query and prints any results, then exits.
	
	Multiple SQL statements must be separated by semicolons. Use -b to enable batch mode to speed up large batches of
	INSERT / UPDATE statements. Pipe SQL files to dolt sql (no -q) to execute a SQL import or update script. 
	
	By default this command uses the dolt database in the current working directory. If you would prefer to use a different
	directory, user the --data-dir <directory> argument before the sql subcommand.
	
	If a server is running for the database in question, then the query will go through the server automatically. If
	connecting to a remote server is preferred, used the --host <host> and --port <port> global arguments. See 'dolt
	--help' for more information about global arguments.

OPTIONS
	-q <SQL query to run>, --query=<SQL query to run>
	  Runs a single query and exits.
	
	-r <result output format>, --result-format=<result output format>
	  How to format result output. Valid values are tabular, csv, json, vertical, and parquet. Defaults to tabular.
	
	-s <saved query name>, --save=<saved query name>
	  Used with --query, save the query to the query catalog with the name provided. Saved queries can be examined in the
	  dolt_query_catalog system table.
	
	-x <saved query name>, --execute=<saved query name>
	  Executes a saved query with the given name.
	
	-l, --list-saved
	  List all saved queries.
	
	-m <saved query description>, --message=<saved query description>
	  Used with --query and --save, saves the query with the descriptive message given. See also `--name`.
	
	-b, --batch
	  Use to enable more efficient batch processing for large SQL import scripts. This mode is no longer supported and this
	  flag is a no-op. To speed up your SQL imports, use either LOAD DATA, or structure your SQL import script to insert many
	  rows per statement.
	
	-c, --continue
	  Continue running queries on an error. Used for batch mode only.
	
	-f <input file>, --file=<input file>
	  Execute statements from the file given.
	
	--binary-as-hex
	  Print binary data as hex. Enabled by default for interactive terminals.
	
	--skip-binary-as-hex
	  Disable binary data as hex output.
	
	--disable-auto-gc
	  Disable automatically running GC.
	
