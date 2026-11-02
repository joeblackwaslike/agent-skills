#!/bin/bash
# Validate a plugin hooks/hooks.json. Adapted from plugin-dev (Apache-2.0),
# anthropics/claude-plugins-official, and corrected against the current Claude Code hooks docs.
#
# Usage: validate-hook-schema.sh <path/to/hooks.json>
# Exit codes: 0 no errors (warnings allowed), 1 errors found, 2 usage error.
#
# Errors: invalid JSON, events NOT wrapped in a top-level "hooks" key, malformed matcher
# groups, unknown handler type, missing command/prompt/url, non-numeric timeout.
# Warnings: unknown event names, hardcoded absolute paths, prompt/agent handlers on events
# that do not support them, matcher on events that ignore it, unexpected top-level keys.

set -eu

if [ $# -ne 1 ] || [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
  sed -n '2,11p' "$0" | sed 's/^# \{0,1\}//' >&2
  exit 2
fi

file="$1"

if [ ! -f "$file" ]; then
  echo "ERROR: file not found: $file"
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "ERROR: jq is required"
  exit 1
fi

if ! jq empty "$file" >/dev/null 2>&1; then
  echo "ERROR: invalid JSON syntax in $file"
  exit 1
fi

# shellcheck disable=SC2016  # jq program, not shell
JQ_PROGRAM='
def events: ["SessionStart","Setup","UserPromptSubmit","UserPromptExpansion","PreToolUse",
  "PermissionRequest","PermissionDenied","PostToolUse","PostToolUseFailure","PostToolBatch",
  "Notification","MessageDisplay","SubagentStart","SubagentStop","TaskCreated","TaskCompleted",
  "Stop","StopFailure","TeammateIdle","InstructionsLoaded","ConfigChange","CwdChanged",
  "DirectoryAdded","FileChanged","WorktreeCreate","WorktreeRemove","PreCompact","PostCompact",
  "PreModelSwitch","PostModelSwitch","Elicitation","ElicitationResult","SessionEnd"];
def handler_types: ["command","http","mcp_tool","prompt","agent"];
def prompt_events: ["PermissionDenied","PostToolBatch","PostToolUse","PostToolUseFailure",
  "PreToolUse","Stop","SubagentStop","TaskCompleted","TaskCreated","TeammateIdle",
  "UserPromptExpansion","UserPromptSubmit","PermissionRequest"];
def no_matcher: ["UserPromptSubmit","PostToolBatch","Stop","TeammateIdle","TaskCreated",
  "TaskCompleted","WorktreeCreate","WorktreeRemove","MessageDisplay","CwdChanged"];
def inl($arr; $x): ($arr | index($x)) != null;

if type != "object" then "E: top level must be a JSON object"
elif ([keys[] | inl(events; .)] | any) and (has("hooks") | not) then
  "E: events are not wrapped in a top-level \"hooks\" key; hooks/hooks.json must be {\"hooks\":{\"<Event>\":[...]}} or the plugin fails to load"
elif (has("hooks") | not) then "E: missing top-level \"hooks\" key"
elif (.hooks | type) != "object" then "E: \"hooks\" must be an object keyed by event name"
else
  (keys[] | select(. != "hooks" and . != "$schema") | "W: unexpected top-level key \"" + . + "\""),
  (.hooks | to_entries[] | .key as $ev | .value as $groups |
    (if inl(events; $ev) then empty else "W: unknown event \"" + $ev + "\"" end),
    (if ($groups | type) != "array" then "E: " + $ev + " must be an array of matcher groups"
     else ($groups | to_entries[] | .key as $i | .value as $g | ($ev + "[" + ($i | tostring) + "]") as $at |
       if ($g | type) != "object" then "E: " + $at + " must be an object"
       else
         (if ($g | has("matcher")) and (($g.matcher | type) != "string") then "E: " + $at + ".matcher must be a string" else empty end),
         (if ($g | has("matcher")) and inl(no_matcher; $ev) then "W: " + $at + ": " + $ev + " ignores matcher" else empty end),
         (if ($g.hooks | type) != "array" then "E: " + $at + " missing \"hooks\" array"
          else ($g.hooks | to_entries[] | .key as $j | .value as $h | ($at + ".hooks[" + ($j | tostring) + "]") as $hat |
            if ($h | type) != "object" then "E: " + $hat + " must be an object"
            elif ($h.type // "") == "" then "E: " + $hat + " missing \"type\""
            elif (inl(handler_types; $h.type) | not) then "E: " + $hat + " invalid type \"" + ($h.type | tostring) + "\" (expected command, http, mcp_tool, prompt, or agent)"
            else
              (if $h.type == "command" and (($h.command // "") == "") then "E: " + $hat + " command handler needs \"command\"" else empty end),
              (if $h.type == "http" and (($h.url // "") == "") then "E: " + $hat + " http handler needs \"url\"" else empty end),
              (if ($h.type == "prompt" or $h.type == "agent") and (($h.prompt // "") == "") then "E: " + $hat + " " + $h.type + " handler needs \"prompt\"" else empty end),
              (if ($h.type == "prompt" or $h.type == "agent") and (inl(prompt_events; $ev) | not) then "W: " + $hat + ": " + $h.type + " handlers are not supported on " + $ev else empty end),
              (if $h.type == "command" and (($h.command // "") | type) == "string" and (($h.command // "") | test("^\"?/")) and (($h.command // "") | test("CLAUDE_PLUGIN_ROOT|CLAUDE_PROJECT_DIR") | not) then "W: " + $hat + ": absolute path without ${CLAUDE_PLUGIN_ROOT}" else empty end),
              (if ($h | has("timeout")) and (($h.timeout | type) != "number" or $h.timeout <= 0) then "E: " + $hat + " timeout must be a positive number of seconds" else empty end)
            end)
          end)
       end)
     end))
end
'

out=$(jq -r "$JQ_PROGRAM" "$file")

errors=0
warnings=0
if [ -n "$out" ]; then
  errors=$(printf '%s\n' "$out" | grep -c '^E: ' || true)
  warnings=$(printf '%s\n' "$out" | grep -c '^W: ' || true)
  printf '%s\n' "$out" | sed -e 's/^E: /ERROR: /' -e 's/^W: /WARN: /'
fi

if [ "$errors" -gt 0 ]; then
  echo "FAIL: $file ($errors error(s), $warnings warning(s))"
  exit 1
fi
echo "OK: $file ($warnings warning(s))"
