#!/bin/bash
# Lint hook scripts for common problems. Adapted from plugin-dev (Apache-2.0),
# anthropics/claude-plugins-official.
#
# Usage: hook-linter.sh <hook-script> [more-scripts...]
# Exit codes: 0 no errors (warnings allowed), 1 errors found, 2 usage error.
#
# Errors: missing shebang, writing to /dev/tty (hooks have no controlling terminal).
# Warnings: not executable, no strict mode, never reads stdin, parses JSON without jq,
# hardcoded absolute paths, exit 2 without a stderr message, long-running loops, no exit.

set -eu

if [ $# -eq 0 ] || [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
  sed -n '2,9p' "$0" | sed 's/^# \{0,1\}//' >&2
  exit 2
fi

errors=0
warnings=0

err() { echo "  ERROR: $1"; errors=$((errors + 1)); }
warn() { echo "  WARN: $1"; warnings=$((warnings + 1)); }

# Strip full-line comments so matches in comments do not count.
code_of() { grep -v '^[[:space:]]*#' "$1" || true; }

lint() {
  script="$1"
  echo "Linting: $script"

  if [ ! -f "$script" ]; then
    err "file not found"
    return
  fi

  [ -x "$script" ] || warn "not executable (chmod +x)"

  first=$(head -n 1 "$script")
  case "$first" in
    '#!'*) ;;
    *) err "missing shebang" ;;
  esac

  code=$(code_of "$script")

  printf '%s\n' "$code" | grep -Eq 'set -[A-Za-z]*e|set -o errexit' || warn "no 'set -e' (consider 'set -euo pipefail')"

  if ! printf '%s\n' "$code" | grep -Eq '\bcat\b|\bread\b|\bjq\b|<&0|/dev/stdin'; then
    warn "does not appear to read the JSON event from stdin"
  fi

  if printf '%s\n' "$code" | grep -Eq 'tool_input|tool_name|tool_response' && ! printf '%s\n' "$code" | grep -q 'jq'; then
    warn "parses event fields without jq"
  fi

  if printf '%s\n' "$code" | grep -Eq '/dev/tty'; then
    err "uses /dev/tty; hook processes have no controlling terminal (return systemMessage JSON instead)"
  fi

  if printf '%s\n' "$code" | grep -Eq '(^|[^A-Za-z_$"{])/(home|Users|usr/local|opt)/'; then
    warn "hardcoded absolute path (use \${CLAUDE_PLUGIN_ROOT} or \${CLAUDE_PROJECT_DIR})"
  fi

  if printf '%s\n' "$code" | grep -Eq 'exit 2' && ! printf '%s\n' "$code" | grep -Eq '>&2'; then
    warn "exits 2 without writing a reason to stderr (stderr is the block message)"
  fi

  if printf '%s\n' "$code" | grep -Eq 'sleep [0-9]{3,}|while true|while :'; then
    warn "possible long-running loop; hooks should finish quickly"
  fi

  if printf '%s\n' "$code" | grep -Eq '"decision"[[:space:]]*:[[:space:]]*"(approve|block)"' \
    && printf '%s\n' "$code" | grep -q 'PreToolUse'; then
    warn "PreToolUse top-level decision approve/block is deprecated; use hookSpecificOutput.permissionDecision allow/deny"
  fi

  printf '%s\n' "$code" | grep -Eq '\bexit\b' || warn "no explicit exit code (0 = ok, 2 = block)"
}

for s in "$@"; do
  lint "$s"
done

if [ "$errors" -gt 0 ]; then
  echo "FAIL: $errors error(s), $warnings warning(s)"
  exit 1
fi
echo "OK: $warnings warning(s)"
