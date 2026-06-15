---
source: "dolt fetch --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "590cb0e28d06bd86992acd543fcc980988df993f303935241e070402180df192"
---

NAME
	dolt fetch - Download objects and refs from another repository

SYNOPSIS
	dolt fetch [<remote>] [<refspec> ...]

DESCRIPTION
	Fetch refs, along with the objects necessary to complete their histories and update remote-tracking branches.
	
	By default dolt will attempt to fetch from a remote named origin.  The <remote> parameter allows you to specify the
	name of a different remote you wish to pull from by the remote's name.
	
	When no refspec(s) are specified on the command line, the fetch_specs for the default remote are used.
	

OPTIONS
	--user=<user>
	  User name to use when authenticating with the remote. Gets password from the environment variable DOLT_REMOTE_PASSWORD.
	
	-p, --prune
	  After fetching, remove any remote-tracking references that don't exist on the remote.
	
	--silent
	  Suppress progress information.
	
