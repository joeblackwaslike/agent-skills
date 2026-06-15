---
source: "dolt table import --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "0cf71a31fe3f16f290154f224bbba42c403682c85870f08b5ed8727708d20b2f"
---

NAME
	dolt table import - Imports data into a dolt table

SYNOPSIS
	dolt table import -c [-f] [--pk <field>] [--all-text] [--schema <file>] [--map <file>] [--continue] [--quiet] [--disable-fk-checks] [--file-type <type>] [--no-header] [--columns <col1,col2,...>] <table> <file>
	dolt table import -u [--map <file>] [--continue] [--quiet] [--file-type <type>] [--no-header] [--columns <col1,col2,...>] <table> <file>
	dolt table import -a [--map <file>] [--continue] [--quiet] [--file-type <type>] [--no-header] [--columns <col1,col2,...>] <table> <file>
	dolt table import -r [--map <file>] [--file-type <type>] [--no-header] [--columns <col1,col2,...>] <table> <file>

DESCRIPTION
	If --create-table | -c is given the operation will create <table> and import the contents of file into it.  If a table
	already exists at this location then the operation will fail, unless the --force | -f flag is provided. The force flag
	forces the existing table to be overwritten.
	
	The schema for the new table can be specified explicitly by providing a SQL schema definition file, or may be inferred
	from the imported file (depending on file type). All schemas, inferred or explicitly defined must define a primary key.
	If the file format being imported does not support defining a primary key, then the --pk parameter must supply the name
	of the field that should be used as the primary key. If no primary key is explicitly defined, the first column in the
	import file will be used as the primary key. For json, jsonl, and parquet create operations, a schema file must be
	provided with --schema.
	
	If --update-table | -u is given the operation will update <table> with the contents of file. The table's existing
	schema will be used, and field names will be used to match file fields with table fields unless a mapping file is
	specified.
	
	If --append-table | -a is given the operation will add the contents of the file to <table>, without modifying any of
	the rows of <table>. If the file contains a row that matches the primary key of a row already in the table, the import
	will be aborted unless the --continue flag is used. The table's existing schema will be used, and field names will be
	used to match file fields with table fields unless a mapping file is specified.
	
	If --replace-table | -r is given the operation will replace <table> with the contents of the file. The table's existing
	schema will be used, and field names will be used to match file fields with table fields unless a mapping file is
	specified.
	
	If the schema for the existing table does not match the schema for the new file, the import will be aborted by default.
	To overwrite both the table and the schema, use -c -f.
	
	A mapping file can be used to map fields between the file being imported and the table being written to. This can be
	used when creating a new table, or updating or replacing an existing table.
	
	During import, if there is an error importing any row, the import will be aborted by default. Use the --continue flag
	to continue importing when an error is encountered. You can add the --quiet flag to prevent the import utility from
	printing all warnings.
	
	A mapping file is json in the format:
	
		{
			"source_field_name":"dest_field_name"
			...
		}
	
	where source_field_name is the name of a field in the file being imported and dest_field_name is the name of a field in
	the table being imported to.
	
	The expected JSON input file format is:
	
		{ "rows":
			[
				{
					"column_name":"value"
					...
				}, ...
			]
		}
	
	where column_name is the name of a column of the table being imported and value is the data for that column in the
	table.
	
	The expected JSONL input file format is:
	
		{"column_name":"value", ...}
		{"column_name":"value", ...}
		...
	
	where each line is a JSON object representing a row.
	
	 In create, update, and replace scenarios the file's extension is used to infer the type of the file. If a file does
	 not have the expected extension then the --file-type parameter should be used to explicitly define the format of the
	 file in one of the supported formats (csv, psv, json, jsonl, xlsx, parquet). For files separated by a delimiter other
	 than a ',' (type csv) or a '|' (type psv), the --delim parameter can be used to specify a delimiter

OPTIONS
	<table>
	  The new or existing table being imported to.
	
	<file>
	  The file being imported. Supported file types are csv, psv, and nbf.
	
	-c, --create-table
	  Create a new table, or overwrite an existing table (with the -f flag) from the imported data.
	
	-u, --update-table
	  Update an existing table with the imported data.
	
	-a, --append-table
	  Require that the operation will not modify any rows in the table.
	
	-r, --replace-table
	  Replace existing table with imported data while preserving the original schema.
	
	-f, --force
	  If a create operation is being executed, data already exists in the destination, the force flag will allow the target
	  to be overwritten.
	
	--continue
	  Continue importing when row import errors are encountered.
	
	--quiet
	  Suppress any warning messages about invalid rows when using the --continue flag.
	
	--disable-fk-checks
	  Disables foreign key checks.
	
	-s <schema_file>, --schema=<schema_file>
	  The schema for the output data.
	
	-m <mapping_file>, --map=<mapping_file>
	  A file that lays out how fields should be mapped from input data to output data.
	
	-pk <primary_key>, --pk=<primary_key>
	  Explicitly define the name of the field in the schema which should be used as the primary key.
	
	--file-type=<file_type>
	  Explicitly define the type of the file if it can't be inferred from the file extension.
	
	--delim=<delimiter>
	  Specify a delimiter for a csv style file with a non-comma delimiter.
	
	--all-text
	  Treats all fields as text. Can only be used when creating a table.
	
	--no-header
	  Treats the first row of a CSV file as data instead of a header row with column names.
	
	--columns=<columns>
	  Comma-separated list of column names. If used with --no-header, defines column names for the file. If used without
	  --no-header, overrides the column names in the file's header row.
	
