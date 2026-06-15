---
source: "dolt creds check --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "70821d98258696c5ff4ad609131ccc5ca12e7ff2db00738a20c007dac4859a7b"
---

NAME
	dolt creds check - Check authenticating with a credential keypair against a doltremoteapi.

SYNOPSIS
	dolt creds check [--endpoint doltremoteapi.dolthub.com:443] [--creds <eak95022q3vskvumn2fcrpibdnheq1dtr8t...>]

DESCRIPTION
	Tests calling a doltremoteapi with dolt credentials and reports the authentication result.

OPTIONS
	--endpoint
	  API endpoint, otherwise taken from config.
	
	--creds
	  Public Key ID or Public Key for credentials, otherwise taken from config.
	
