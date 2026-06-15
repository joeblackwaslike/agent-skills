---
source: "dolt read-tables --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "25304e2bd97bb74093e4eec0b71c02997f490c380bb1e3aa657792c7f442ff2f"
---

NAME
	dolt read-tables - Fetch table(s) at a specific commit into a new dolt repo

SYNOPSIS
	dolt read-tables [--dir <directory>] <remote-url> <commit> [<table>...]

DESCRIPTION
	A shallow clone operation will retrieve the state of table(s) from a remote repository at a given commit. Retrieved
	data is placed into the working state of a newly created local Dolt repository. Changes to the data cannot be submitted
	back to the remote repository, and the shallow clone cannot be converted into a regular clone of a repository.

OPTIONS
	<remote-repo>
	  Remote repository to retrieve data from
	
	<commit>
	  Branch or commit hash representing a point in time to retrieve tables from
	
	<table>
	   Optional tables to retrieve.  If omitted, all tables are retrieved.
	
	-d <directory>, --dir=<directory>
	  directory to create and put retrieved table data.
	
	--ref=<ref>
	  Git ref to use as the Dolt data ref for git remotes (default: refs/dolt/data).
	
