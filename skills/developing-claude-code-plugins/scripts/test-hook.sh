#!/bin/bash
# Run a command hook script against a sample event, offline. Adapted from plugin-dev
# (Apache-2.0), anthropics/claude-plugins-official.
#
# Usage:
#   test-hook.sh [-v] [-t SECONDS] [-e EXPECTED_EXIT] <hook-script> <event.json>
#   test-hook.sh --create-sample <PreToolUse|PostToolUse|UserPromptSubmit|Stop|SessionStart>
#
# Pipes the JSON file to the hook's stdin, sets CLAUDE_PROJECT_DIR / CLAUDE_PLUGIN_ROOT /
# CLAUDE_ENV_FILE, and reports exit code, stdout, and stderr separately.
# Exit codes: 0 hook behaved as expected, 1 unexpected result or harness error, 2 usage error.
# Without -e, the hook's exit 0 or 2 count as expected; any other code or a timeout fails.

set -eu

usage() {
  sed -n '2,12p' "$0" | sed 's/^# \{0,1\}//' >&2
  exit 2
}

create_sample() {
  case "$1" in
    PreToolUse)
      cat <<'EOF'
{"session_id":"test-session","transcript_path":"/tmp/transcript.jsonl","cwd":"/tmp/test-project","permission_mode":"default","hook_event_name":"PreToolUse","tool_name":"Bash","tool_input":{"command":"ls -la"},"tool_use_id":"toolu_test"}
EOF
      ;;
    PostToolUse)
      cat <<'EOF'
{"session_id":"test-session","transcript_path":"/tmp/transcript.jsonl","cwd":"/tmp/test-project","permission_mode":"default","hook_event_name":"PostToolUse","tool_name":"Write","tool_input":{"file_path":"/tmp/test.txt","content":"hi"},"tool_response":{"success":true},"tool_use_id":"toolu_test"}
EOF
      ;;
    UserPromptSubmit)
      cat <<'EOF'
{"session_id":"test-session","transcript_path":"/tmp/transcript.jsonl","cwd":"/tmp/test-project","permission_mode":"default","hook_event_name":"UserPromptSubmit","prompt":"Write a function"}
EOF
      ;;
    Stop)
      cat <<'EOF'
{"session_id":"test-session","transcript_path":"/tmp/transcript.jsonl","cwd":"/tmp/test-project","permission_mode":"default","hook_event_name":"Stop","last_assistant_message":"Done."}
EOF
      ;;
    SessionStart)
      cat <<'EOF'
{"session_id":"test-session","transcript_path":"/tmp/transcript.jsonl","cwd":"/tmp/test-project","hook_event_name":"SessionStart","source":"startup"}
EOF
      ;;
    *)
      echo "unknown event: $1 (try PreToolUse, PostToolUse, UserPromptSubmit, Stop, SessionStart)" >&2
      exit 2
      ;;
  esac
}

verbose=0
limit=60
expect=""

while [ $# -gt 0 ]; do
  case "$1" in
    -h | --help) usage ;;
    -v | --verbose) verbose=1; shift ;;
    -t | --timeout) [ $# -ge 2 ] || usage; limit="$2"; shift 2 ;;
    -e | --expect) [ $# -ge 2 ] || usage; expect="$2"; shift 2 ;;
    --create-sample) [ $# -eq 2 ] || usage; create_sample "$2"; exit 0 ;;
    --) shift; break ;;
    -*) usage ;;
    *) break ;;
  esac
done

[ $# -eq 2 ] || usage
hook="$1"
input="$2"

[ -f "$hook" ] || { echo "ERROR: hook script not found: $hook"; exit 1; }
[ -f "$input" ] || { echo "ERROR: event file not found: $input"; exit 1; }
command -v jq >/dev/null 2>&1 || { echo "ERROR: jq is required"; exit 1; }
jq empty "$input" >/dev/null 2>&1 || { echo "ERROR: event file is not valid JSON"; exit 1; }

tmp=$(mktemp -d "${TMPDIR:-/tmp}/test-hook.XXXXXX")
trap 'rm -rf "$tmp"' EXIT

export CLAUDE_PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$PWD}"
export CLAUDE_PLUGIN_ROOT="${CLAUDE_PLUGIN_ROOT:-$PWD}"
export CLAUDE_ENV_FILE="$tmp/env"

timeout_bin=""
if command -v timeout >/dev/null 2>&1; then
  timeout_bin=timeout
elif command -v gtimeout >/dev/null 2>&1; then
  timeout_bin=gtimeout
fi

if [ "$verbose" -eq 1 ]; then
  echo "event:"
  jq . "$input"
  echo "CLAUDE_PROJECT_DIR=$CLAUDE_PROJECT_DIR"
  echo "CLAUDE_PLUGIN_ROOT=$CLAUDE_PLUGIN_ROOT"
fi

if [ -x "$hook" ]; then
  runner="$hook"
  runner_arg=""
else
  runner="bash"
  runner_arg="$hook"
fi

set +e
start=$(date +%s)
if [ -n "$timeout_bin" ]; then
  "$timeout_bin" "$limit" "$runner" ${runner_arg:+"$runner_arg"} <"$input" >"$tmp/out" 2>"$tmp/err"
else
  "$runner" ${runner_arg:+"$runner_arg"} <"$input" >"$tmp/out" 2>"$tmp/err"
fi
code=$?
set -e
duration=$(($(date +%s) - start))

echo "exit code: $code (${duration}s)"
case "$code" in
  0) echo "meaning: success; stdout JSON (if any) is applied" ;;
  2) echo "meaning: blocking error; stderr is the reason" ;;
  124) echo "meaning: timed out after ${limit}s" ;;
  *) echo "meaning: non-blocking error" ;;
esac

echo "--- stdout"
if [ -s "$tmp/out" ]; then
  cat "$tmp/out"
  if jq empty "$tmp/out" >/dev/null 2>&1; then
    echo "(stdout parses as JSON)"
  else
    echo "(stdout is plain text, not JSON)"
  fi
else
  echo "(empty)"
fi
echo "--- stderr"
if [ -s "$tmp/err" ]; then cat "$tmp/err"; else echo "(empty)"; fi

if [ -s "$CLAUDE_ENV_FILE" ]; then
  echo "--- CLAUDE_ENV_FILE"
  cat "$CLAUDE_ENV_FILE"
fi

if [ -n "$expect" ]; then
  if [ "$code" = "$expect" ]; then
    echo "OK: exit code matched expected $expect"
    exit 0
  fi
  echo "FAIL: expected exit code $expect, got $code"
  exit 1
fi

if [ "$code" -eq 0 ] || [ "$code" -eq 2 ]; then
  echo "OK"
  exit 0
fi
echo "FAIL: unexpected exit code $code"
exit 1
