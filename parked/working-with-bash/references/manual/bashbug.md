---
source: "man bashbug @ bash 5.3.9"
fetched_at: "2026-11-16T12:28:22.643Z"
sha256: "7576f0ca7201289eec4bd9f20e53ddccb2abf3cb04fc0e7c6e233a56cafd6c7b"
---

BASHBUG(1)                          bashbug                          BASHBUG(1)

NAME
       bashbug - report a bug in bash

SYNOPSIS

       bashbug [--help] [--version] [bug-report-email-addresses]

DESCRIPTION
       bashbug is a utility for reporting bugs in Bash to the maintainers.

       bashbug will start up your preferred editor with a preformatted bug
       report template for you to fill in. Save the file and quit the editor
       once you have completed the missing fields.  bashbug will notify you of
       any problems with the report and ask for confirmation before sending it.
       By default the bug report is mailed to both the GNU developers and the
       Debian Bash maintainers. The recipients can be changed by giving a comma
       separated list of bug-report-email-addresses.

       If you invoke bashbug by accident, just quit your editor. You will
       always be asked for confirmation before a bug report is sent.

OPTIONS
       --help
              Show a brief usage message and exit.

       --version
              Show the version of bashbug and exit.

       bug-report-email-addresses
              Comma separated list of recipients´ email addresses. By default
              the report is mailed to both the GNU developers and the Debian
              Bash maintainers.

ENVIRONMENT
       DEFEDITOR
              Editor to use for editing the bug report.

       EDITOR
              Editor to use for editing the bug report (overridden by
              DEFEDITOR).

SEE ALSO
       bash(1), reportbug(1), update-alternatives(8) for preferred editor.

AUTHOR
       This manual page was written by Christer Andersson <klamm@comhem.se> for
       the Debian project (but may be used by others).

GNU Bash 3.1                    11 December 2007                     BASHBUG(1)
