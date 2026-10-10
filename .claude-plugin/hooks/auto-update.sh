#!/bin/bash
[ "${AGENT_SKILLS_AUTO_UPDATE:-true}" = "false" ] && exit 0
# Parent dir mtime advances each time a new SHA is installed
PARENT="$(dirname "${CLAUDE_PLUGIN_ROOT}")"
LAST=$(stat -f %m "$PARENT" 2>/dev/null || stat -c %Y "$PARENT" 2>/dev/null || echo 0)
NOW=$(date +%s)
[ $((NOW - LAST)) -gt 604800 ] && claude plugin update agent-skills@agent-marketplace 2>/dev/null || true
