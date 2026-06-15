---
source: "dolt schema import --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "f3ffb9bcb5c816e8ab9719e0e632466682a0e96707706d8d9ce6db9f4abd371f"
---

NAME
	dolt schema import - Creates or updates a table by inferring a schema from a file containing sample data.

SYNOPSIS
	dolt schema import [--create|--replace] [--force] [--dry-run] [--lower|--upper] [--keep-types] [--file-type <type>] [--float-threshold] [--map <mapping-file>] [--delim <delimiter>]--pks <field>,... <table> <file>

DESCRIPTION
	If --create | -c is given the operation will create <table> with a schema that it infers from the supplied file. One or
	more primary key columns must be specified using the --pks parameter.
	
	If --update | -u is given the operation will update <table> any additional columns, or change the types of columns
	based on the file supplied.  If the --keep-types parameter is supplied then the types for existing columns will not be
	modified, even if they differ from what is in the supplied file.
	
	If --replace | -r is given the operation will replace <table> with a new, empty table which has a schema inferred from
	the supplied file but columns tags will be maintained across schemas.  --keep-types can also be supplied here to
	guarantee that types are the same in the file and in the pre-existing table.
	
	A mapping file can be used to map fields between the file being imported and the table's schema being inferred.  This
	can be used when creating a new table, or updating or replacing an existing table.
	
	A mapping file is json in the format:
	
		{
			"source_field_name":"dest_field_name"
			...
		}
	
	where source_field_name is the name of a field in the file being imported and dest_field_name is the name of a field in
	the table being imported to.
	
	
	In create, update, and replace scenarios the file's extension is used to infer the type of the file.  If a file does
	not have the expected extension then the --file-type parameter should be used to explicitly define the format of the
	file in one of the supported formats (Currently only csv is supported).  For files separated by a delimiter other than
	a ',', the --delim parameter can be used to specify a delimiter.
	
	If the parameter --dry-run is supplied a sql statement will be generated showing what would be executed if this were
	run without the --dry-run flag
	
	--float-threshold is the threshold at which a string representing a floating point number should be interpreted as a
	float versus an int.  If FloatThreshold is 0.0 then any number with a decimal point will be interpreted as a float
	(such as 0.0, 1.0, etc).  If FloatThreshold is 1.0 then any number with a decimal point will be converted to an int
	(0.5 will be the int 0, 1.99 will be the int 1, etc.  If the FloatThreshold is 0.001 then numbers with a fractional
	component greater than or equal to 0.001 will be treated as a float (1.0 would be an int, 1.0009 would be an int, 1.001
	would be a float, 1.1 would be a float, etc)
	

OPTIONS
	<table>
	  Name of the table to be created.
	
	<file>
	  The file being used to infer the schema.
	
	-c, --create
	  Create a table with the schema inferred from the <file> provided.
	
	-u, --update
	  Update a table to match the inferred schema of the <file> provided. All previous data will be lost.
	
	-r, --replace
	  Replace a table with a new schema that has the inferred schema from the <file> provided. All previous data will be lost.
	
	--dry-run
	  Print the sql statement that would be run if executed without the flag.
	
	--keep-types
	  When a column already exists in the table, and it's also in the <file> provided, use the type from the table.
	
	--file-type=<type>
	  Explicitly define the type of the file if it can't be inferred from the file extension.
	
	--pks=<comma-separated-col-names>
	  List of columns used as the primary key cols.  Order of the columns will determine sort order.
	
	-m <mapping-file>, --map=<mapping-file>
	  A file that can map a column name in <file> to a new value.
	
	--float-threshold=<float>
	  Minimum value at which the fractional component of a value must exceed in order to be considered a float.
	
	--delim=<delimiter>
	  Specify a delimiter for a csv style file with a non-comma delimiter.
	
