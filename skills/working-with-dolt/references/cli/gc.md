---
source: "dolt gc --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "135415a8191d4a031cf9fba020e72efae8f33bf8e18b9947876c097c4d9b04d6"
---

NAME
	dolt gc - Cleans up unreferenced data from the repository.

SYNOPSIS
	dolt gc [--shallow|--full]

DESCRIPTION
	Searches the repository for data that is no longer referenced and no longer needed.
	
	Dolt GC is generational. When a GC is run, everything reachable from any commit on any branch
	is put into the old generation. Data which is only reachable from uncommited branch HEADs is kept in
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
	
