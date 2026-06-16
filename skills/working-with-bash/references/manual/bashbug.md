---
source: "man bashbug @ bash 5.3.9"
fetched_at: "2026-06-16T09:46:54.480Z"
sha256: "d18bc3d46ef175c49cfb11905b5c0b5d0da4512b8725fc37f61a960e2a744421"
---

BASHBUG(1)                  General Commands Manual                  BASHBUG(1)

NAME
     bashbug - report a bug in bash

SYNOPSIS
     bashbug [--version] [--help] [email-address]

DESCRIPTION
     bashbug  is  a  shell script to help the user compose and mail bug reports
     concerning bash in a standard format.  bashbug invokes the  editor  speci-
     fied by the environment variable EDITOR on a temporary copy of the bug re-
     port format outline. The user must fill in the appropriate fields and exit
     the  editor.  bashbug then mails the completed report to bug-bash@gnu.org,
     or email-address.  If the report cannot be mailed, it is saved in the file
     dead.bashbug in the invoking user's home directory.

     The bug report format outline consists of  several  sections.   The  first
     section provides information about the machine, operating system, the bash
     version,  and  the  compilation environment.  The second section should be
     filled in with a description of the bug.  The third section  should  be  a
     description  of  how to reproduce the bug.  The optional fourth section is
     for a proposed fix.  Fixes are encouraged.

ENVIRONMENT
     bashbug will utilize the following environment variables if they exist:

     EDITOR
            Specifies the preferred editor. If EDITOR is not set,  bashbug  at-
            tempts  to locate a number of alternative editors, including emacs.
            If bashbug cannot locate any of the  alternative  editors,  it  at-
            tempts to execute vi.

     HOME   Directory  in  which  the  failed  bug  report is saved if the mail
            fails.

     TMPDIR
            Directory in which to create temporary files and directories.

SEE ALSO
     bash(1)

AUTHORS
     Brian Fox, Free Software Foundation
     bfox@gnu.org

     Chet Ramey, Case Western Reserve University
     chet@po.cwru.edu

GNU Bash 5.1                     2020 August 1                       BASHBUG(1)
