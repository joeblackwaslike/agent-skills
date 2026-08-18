#!/usr/bin/env bash
# Fires on every commit (via .beads/hooks/post-commit).
# Refreshes each tool's local plugin cache so skill changes propagate without a manual reinstall.
# Never silent: prints PASS/FAIL per tool and macOS-notifies on any failure.
set -uo pipefail
FAILURES=()

echo "→ Claude Code: refreshing marketplace + plugin cache"
if claude plugin marketplace update agent-marketplace && claude plugin update agent-skills@agent-marketplace -y; then
  echo "  ok"
else
  FAILURES+=("claude")
fi

echo "→ Codex CLI: refreshing marketplace + plugin cache"
if codex plugin marketplace upgrade agent-marketplace && codex plugin add agent-skills@agent-marketplace --json >/dev/null; then
  echo "  ok"
else
  FAILURES+=("codex")
fi

echo "→ Gemini CLI: no action needed (local-path install, always live)"
echo "→ OpenCode: no action needed (skills.paths, always live)"

if [ ${#FAILURES[@]} -gt 0 ]; then
  msg="agent-skills: tool update FAILED for: ${FAILURES[*]}"
  echo "✗ $msg" >&2
  command -v osascript >/dev/null && osascript -e "display notification \"$msg\" with title \"agent-skills\""
  exit 1
fi
