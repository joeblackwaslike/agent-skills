#!/bin/bash
# Assert each validator accepts its known-good fixture (exit 0) and rejects its known-bad one (non-zero).
# Usage: run-fixtures.sh   (run from anywhere; exit 0 if every assertion holds)

set -u

here=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
fx="$here/fixtures"
fails=0
total=0

expect() {
  want="$1"; label="$2"; shift 2
  total=$((total + 1))
  for arg in "$@"; do
    case "$arg" in "$fx"/*) [ -e "$arg" ] || { echo "FAIL: $label (missing fixture $arg)"; fails=$((fails + 1)); return; } ;; esac
  done
  "$@" >/dev/null 2>&1
  got=$?
  if { [ "$want" = zero ] && [ "$got" -eq 0 ]; } || { [ "$want" = nonzero ] && [ "$got" -ne 0 ] && [ "$got" -lt 126 ]; }; then
    echo "PASS: $label (exit $got)"
  else
    echo "FAIL: $label (exit $got, wanted $want)"
    fails=$((fails + 1))
  fi
}

expect zero    "hooks.json wrapped is accepted"        "$here/validate-hook-schema.sh" "$fx/hooks/good-wrapped.json"
expect nonzero "hooks.json empty file is rejected"        "$here/validate-hook-schema.sh" "$fx/hooks/bad-empty.json"
expect nonzero "hooks.json two documents is rejected"     "$here/validate-hook-schema.sh" "$fx/hooks/bad-two-docs.json"
expect nonzero "hooks.json unwrapped is rejected"      "$here/validate-hook-schema.sh" "$fx/hooks/bad-unwrapped.json"
expect nonzero "hooks.json bad handler is rejected"    "$here/validate-hook-schema.sh" "$fx/hooks/bad-handler.json"
expect zero    "hook script good lints clean"          "$here/hook-linter.sh" "$fx/hooks/good-hook.sh"
expect nonzero "hook script bad fails lint"            "$here/hook-linter.sh" "$fx/hooks/bad-hook.sh"
expect zero    "test-hook allows safe command (exit 0)" "$here/test-hook.sh" -e 0 "$fx/hooks/good-hook.sh" "$fx/hooks/event-safe.json"
expect zero    "test-hook sees rm -rf blocked (exit 2)" "$here/test-hook.sh" -e 2 "$fx/hooks/good-hook.sh" "$fx/hooks/event-rm.json"
expect nonzero "test-hook flags wrong expectation"     "$here/test-hook.sh" -e 0 "$fx/hooks/good-hook.sh" "$fx/hooks/event-rm.json"
expect zero    "agent good is accepted"                "$here/validate-agent.sh" "$fx/agents/good-agent.md"
expect nonzero "agent bad is rejected"                 "$here/validate-agent.sh" "$fx/agents/bad-agent.md"
expect zero    "settings good is accepted"             "$here/validate-settings.sh" "$fx/settings/good.local.md" enabled
expect nonzero "settings bad is rejected"              "$here/validate-settings.sh" "$fx/settings/bad.local.md"
expect nonzero "settings missing required key"         "$here/validate-settings.sh" "$fx/settings/good.local.md" nope
expect zero    "parse-frontmatter reads a field"       "$here/parse-frontmatter.sh" "$fx/agents/good-agent.md" name
expect nonzero "parse-frontmatter missing field"       "$here/parse-frontmatter.sh" "$fx/agents/good-agent.md" nope

if command -v zsh >/dev/null 2>&1; then
  expect zero    "zsh-launched: wrapped hooks accepted"  zsh -c "\"$here/validate-hook-schema.sh\" \"$fx/hooks/good-wrapped.json\""
  expect nonzero "zsh-launched: unwrapped hooks rejected" zsh -c "\"$here/validate-hook-schema.sh\" \"$fx/hooks/bad-unwrapped.json\""
  expect zero    "zsh-launched: agent accepted"          zsh -c "\"$here/validate-agent.sh\" \"$fx/agents/good-agent.md\""
fi

echo "$((total - fails))/$total assertions passed"
[ "$fails" -eq 0 ]
