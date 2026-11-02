#!/bin/bash
# Validate a plugin settings file (.claude/<plugin>.local.md: YAML frontmatter + markdown body).
# Adapted from plugin-dev (Apache-2.0), anthropics/claude-plugins-official.
# This file layout is a plugin convention, not a Claude Code feature; see references/plugin-settings.md.
#
# Usage: validate-settings.sh <settings-file.md> [required-key...]
# Exit codes: 0 no errors (warnings allowed), 1 errors found, 2 usage error.
#
# Errors: file missing, no opening --- on line 1, unclosed frontmatter, empty frontmatter,
# a listed required key is absent.
# Warnings: YAML 1.1 booleans (yes/no/on/off/True) that parse inconsistently, empty body,
# file not git-ignored.

set -eu

if [ $# -lt 1 ] || [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
  sed -n '2,10p' "$0" | sed 's/^# \{0,1\}//' >&2
  exit 2
fi

file="$1"
shift
here=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
pf="$here/parse-frontmatter.sh"

errors=0
warnings=0
err() { echo "ERROR: $1"; errors=$((errors + 1)); }
warn() { echo "WARN: $1"; warnings=$((warnings + 1)); }

if [ ! -f "$file" ]; then
  echo "ERROR: file not found: $file"
  exit 1
fi

rc=0
raw=$(bash "$pf" "$file" 2>/dev/null) || rc=$?
case "$rc" in
  0) ;;
  2) echo "ERROR: line 1 must be '---'"; exit 1 ;;
  4) echo "ERROR: frontmatter is not closed (missing second '---')"; exit 1 ;;
  *) echo "ERROR: could not read frontmatter (exit $rc)"; exit 1 ;;
esac

if [ -z "$(printf '%s' "$raw" | tr -d '[:space:]')" ]; then
  err "frontmatter is empty"
fi

keys=$(bash "$pf" --keys "$file" 2>/dev/null || true)
echo "keys: $(printf '%s' "$keys" | tr '\n' ' ')"

for req in "$@"; do
  if ! printf '%s\n' "$keys" | grep -qx "$req"; then
    err "required key missing: $req"
  fi
done

for key in $keys; do
  value=$(bash "$pf" "$file" "$key" 2>/dev/null || true)
  case "$value" in
    yes | no | on | off | Yes | No | On | Off | YES | NO | ON | OFF | True | False | TRUE | FALSE)
      warn "$key: '$value' is ambiguous across YAML versions; use lowercase true/false"
      ;;
  esac
done

body=$(bash "$pf" --body "$file" 2>/dev/null | tr -d '[:space:]')
[ -n "$body" ] || warn "markdown body is empty (frontmatter only)"

if command -v git >/dev/null 2>&1; then
  dir=$(cd "$(dirname "$file")" && pwd)
  if (cd "$dir" && git rev-parse --is-inside-work-tree >/dev/null 2>&1); then
    if ! (cd "$dir" && git check-ignore -q "$(basename "$file")" 2>/dev/null); then
      warn "file is not git-ignored; *.local.md settings should not be committed"
    fi
  fi
fi

if [ "$errors" -gt 0 ]; then
  echo "FAIL: $file ($errors error(s), $warnings warning(s))"
  exit 1
fi
echo "OK: $file ($warnings warning(s))"
