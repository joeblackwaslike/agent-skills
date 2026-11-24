---
source: "dolt gc --help @ 2.4.2"
fetched_at: "2026-10-10T20:16:32.123Z"
sha256: "0d288ba3d3ecb6c0d7a06659fc98773818f853441a2150bc14599e1591d94e10"
---

NAME
	dolt gc - Cleans up unreferenced data from the repository.

SYNOPSIS
	dolt gc [--shallow|--full]

DESCRIPTION
	Searches the repository for data that is no longer referenced and no longer needed.
	
	Dolt GC is generational. When a GC is run, everything reachable from any commit on any branch
	is put into the old generation. Data which is only reachable from uncommitted branch HEADs is kept in
	the new generation. By default, Dolt GC will only visit data in the new generation, and so will never
	collect data from deleted branches which has previously made its way to the old generation from being
	copied during a prior garbage collection.
	
	If the --shallow flag is supplied, a faster but less thorough garbage collection will be performed.
	
	If the --full flag is supplied, a more thorough garbage collection, fully collecting the old gen and new gen, will be
	performed.

OPTIONS
	-s, --shallow
	  perform a fast, but incomplete garbage collection pass
	
	-f, --full
	  perform a full garbage collection, including the old generation
	
	--archive-level=<archive compression level>
	  Specify the archive compression level garbage collection results. Default is 1, Disable with 0
	
	--incremental-file-size
	  max size in bytes of incremental GC table files
	
