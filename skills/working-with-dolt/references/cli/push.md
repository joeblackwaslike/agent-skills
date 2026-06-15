---
source: "dolt push --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "dad5584a319b14f8a040b8aeccb2ec885866fdf78657e196a83213ba599ab314"
---

NAME
	dolt push - Update remote refs along with associated objects

SYNOPSIS
	dolt push [-u | --set-upstream] [<remote>] [<refspec>]

DESCRIPTION
	Updates remote refs using local refs, while sending objects necessary to complete the given refs.
	
	When the command line does not specify where to push with the <remote> argument, an attempt is made to infer the
	remote.  If only one remote exists it will be used, if multiple remotes exists, a remote named 'origin' will be
	attempted.  If there is more than one remote, and none of them are named 'origin' then the command will fail and you
	will need to specify the correct remote explicitly.
	
	When the command line does not specify what to push with <refspec>... then the current branch will be used.
	
	A remote's branch can be deleted by pushing an empty source ref: `dolt push origin :branch`
	
	When neither the command-line does not specify what to push, the default behavior is used, which corresponds to the
	current branch being pushed to the corresponding upstream branch, but as a safety measure, the push is aborted if the
	upstream branch does not have the same name as the local one.
	

OPTIONS
	--user=<user>
	  User name to use when authenticating with the remote. Gets password from the environment variable DOLT_REMOTE_PASSWORD.
	
	-u, --set-upstream
	  For every branch that is up to date or successfully pushed, add upstream (tracking) reference, used by argument-less
	  dolt pull and other commands.
	
	-f, --force
	  Update the remote with local history, overwriting any conflicting history in the remote.
	
	--all
	  Push all branches.
	
	--silent
	  Suppress progress information.
	
