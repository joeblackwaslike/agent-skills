#!/bin/bash
set -euo pipefail
input=$(cat)
command=$(jq -r '.tool_input.command // empty' <<<"$input")
if [[ "$command" == *"rm -rf"* ]]; then
  echo "Blocked: rm -rf is not allowed" >&2
  exit 2
fi
exit 0
