---
source: "dolt commit --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "359019db218be8c63e25196ed5880f2ba633ca4156322999db497fb691a7267d"
---

NAME
	dolt commit - Record changes to the database

SYNOPSIS
	dolt commit [options]

DESCRIPTION
	
	Stores the current contents of the staged tables in a new commit along with a log message from the user describing the
	changes.
	
	The content to be added can be specified by using dolt add to incrementally \"add\" changes to the staged tables before
	using the commit command (Note: even modified tables must be \"added\").
	
	The log message can be added with the parameter -m <msg>.  If the <-m> parameter is not provided an editor will be
	opened where you can review the commit and provide a log message.
	
	The commit timestamp can be modified using the --date parameter.  Dates can be specified in the formats <YYYY-MM-DD>,
	<YYYY-MM-DDTHH:MM:SS>, or <YYYY-MM-DDTHH:MM:SSZ07:00> (where <07:00> is the time zone offset)."

OPTIONS
	-m <msg>, --message=<msg>
	  Use the given <msg> as the commit message.
	
	--allow-empty
	  Allow recording a commit that has the exact same data as its sole parent. This is usually a mistake, so it is disabled
	  by default. This option bypasses that safety. Cannot be used with --skip-empty.
	
	--skip-empty
	  Only create a commit if there are staged changes. If no changes are staged, the call to commit is a no-op. Cannot be
	  used with --allow-empty.
	
	--date=<date>
	  Specify the date used in the commit. If not specified the current system time is used.
	
	-f, --force
	  Ignores any foreign key warnings and proceeds with the commit.
	
	--author=<author>
	  Specify an explicit author using the standard A U Thor <author@example.com> format.
	
	-a, --all
	  Adds all existing, changed tables (but not new tables) in the working set to the staged set.
	
	-A, --ALL
	  Adds all tables and databases (including new tables) in the working set to the staged set.
	
	--amend
	  Amend previous commit
	
	-S <key-id>, --gpg-sign=<key-id>
	  Sign the commit using GPG. If no key-id is provided the key-id is taken from 'user.signingkey' the in the configuration
	
	--skip-verification
	  Skip commit verification
	
