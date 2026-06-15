---
source: "dolt creds use --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "bf6e0eea67a92979ad606f6557404686ca17925265d6c84f428ff1b61eb2e69a"
---

NAME
	dolt creds use - Select an existing dolt credential for authenticating with doltremoteapi.

SYNOPSIS
	dolt creds use <public_key_as_appears_in_ls | public_key_id_as_appears_in_ls>

DESCRIPTION
	Selects an existing dolt credential for authenticating with doltremoteapi.
	
	Can be given a credential's public key or key id and will update global dolt
	config to use the credential when interacting with doltremoteapi.
	
	You can see your available credentials with 'dolt creds ls'.
