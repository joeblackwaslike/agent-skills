---
source: "dolt fsck --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "ea5ec6e5d2d311ce4e6875cc61bc55f96c4d05255bd76c07febcf2b8ce1b89fb"
---

NAME
	dolt fsck - Verifies the contents of the database are not corrupted.

SYNOPSIS
	dolt fsck [--quiet]
	dolt fsck --revive-journal-with-data-loss

DESCRIPTION
	Verifies the contents of the database are not corrupted.

OPTIONS
	--quiet
	  Don't show progress. Just print final report.
	
	--revive-journal-with-data-loss
	  Revives a corrupted chunk journal by discarding unparsable data.
	  WARNING: This may result in data loss. Your original data will be preserved in a backup file. Use this option to restore
	  the ability to use your Dolt database. Please contact Dolt (https://github.com/dolthub/dolt/issues) for assistance.
	  
	
