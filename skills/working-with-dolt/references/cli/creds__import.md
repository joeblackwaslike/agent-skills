---
source: "dolt creds import --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "11fc072516e64d2b7391dea24b4400d620d92bcb269cf57e47eeb5476a0ac716"
---

NAME
	dolt creds import - Import a dolt credential from an existing .jwk file.

SYNOPSIS
	dolt creds import [--no-profile] [<jwk_filename>]

DESCRIPTION
	Imports a dolt credential from an existing .jwk file.
	
	Dolt credentials are stored in the creds subdirectory of the global dolt config
	directory as files with one key per file in JWK format. This command can import
	a JWK from a file or stdin and places the imported key in the correct place for
	dolt to find it as a valid credential.
	
	This command will set the newly imported credential as the used credential if
	there are currently not credentials. If this command does use the new
	credential, it will call doltremoteapi to update user.name and user.email with
	information from the remote user profile if those fields are not already
	available in the local dolt config.

OPTIONS
	<jwk_filename>
	  The JWK file. If omitted, import operates on stdin.
	
	--no-profile
	  If provided, no attempt will be made to contact doltremoteapi and update user.name and user.email.
	
