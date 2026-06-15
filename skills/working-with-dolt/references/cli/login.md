---
source: "dolt login --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "fbfb43ff50cc99196dac47df09b1641c0c2d3b9b054dfa7f8a48885e1dc49758"
---

NAME
	dolt login - Login to DoltHub or DoltLab

SYNOPSIS
	dolt login [--auth-endpoint <endpoint>] [--login-url <url>] [-i | --insecure] [<creds>]

DESCRIPTION
	Login into DoltHub or DoltLab using the email in your config so you can pull from private repos and push to those you
	have permission to.
	

OPTIONS
	<creds>
	  A specific credential to use for login. If omitted, new credentials will be generated.
	
	-e <hostname:port>, --auth-endpoint=<hostname:port>
	  Specify the endpoint used to authenticate this client. Must be used with --login-url OR set in the configuration file
	  as `creds.add_url`
	
	-url <url>, --login-url=<url>
	  Specify the login url where the browser will add credentials.
	
	-i, --insecure
	  If set, makes insecure connection to remote authentication server
	
