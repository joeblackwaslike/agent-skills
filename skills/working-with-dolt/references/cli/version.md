---
source: "dolt version --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "c2948981e1c0365c87da2c242586b69f17a45918ef0ea011ad322288135d6855"
---

NAME
	dolt version - Displays the version for the Dolt binary.

SYNOPSIS
	dolt version [--verbose] [--feature]

DESCRIPTION
	Displays the version for the Dolt binary.
	
	The out-of-date check can be disabled by running dolt config --global --add versioncheck.disabled true.

OPTIONS
	-f, --feature
	  display the feature version of this repository.
	
	-v, --verbose
	  display verbose details, including the storage format of this repository.
	
