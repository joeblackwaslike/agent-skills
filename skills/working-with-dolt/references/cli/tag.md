---
source: "dolt tag --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "0aef319dbf998707d3a2083d3c52cf0c88ddfbf930bf9277459e02082d4f7b91"
---

NAME
	dolt tag - Create, list, delete tags.

SYNOPSIS
	dolt tag [-v]
	dolt tag [-m <message>] <tagname> [<ref>]
	dolt tag -d <tagname>

DESCRIPTION
	If there are no non-option arguments, existing tags are listed.
	
	The command's second form creates a new tag named <tagname> which points to the current HEAD, or <ref> if given.
	Optionally, a tag message can be passed using the -m option. 
	
	With a -d, <tagname> will be deleted.

OPTIONS
	<ref>
	  A commit ref that the tag should point at.
	
	-m <msg>, --message=<msg>
	  Use the given <msg> as the tag message.
	
	-v, --verbose
	  list tags along with their metadata.
	
	-d, --delete
	  Delete a tag.
	
	--author=<author>
	  Specify an explicit author using the standard A U Thor <author@example.com> format.
	
