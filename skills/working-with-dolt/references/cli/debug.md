---
source: "dolt debug --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "81e69dcdbd6314c9870d38b45b81a56f5e9d327630cd11fb2d2dd4eb4a658392"
---

NAME
	dolt debug - Runs a SQL query

SYNOPSIS
	dolt debug 
	dolt debug < script.sql
	dolt debug -q <query> [-r <result format>] [-s <name> -m <message>] [-b]
	dolt debug -x <name>
	dolt debug --list-saved

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
	
	-c, --continue
	  Continue running queries on an error. Used for batch mode only.
	
	-f <input file>, --file=<input file>
	  Execute statements from the file given.
	
	-t <benchmark time>, --time=<benchmark time>
	  Execute for at least time seconds.
	
	-o <output dir>, --output=<output dir>
	  Result directory (Defaults to temporary director)
	
