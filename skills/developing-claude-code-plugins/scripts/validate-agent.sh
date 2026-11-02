#!/bin/bash
# Validate a Claude Code subagent file (agents/*.md). Adapted from plugin-dev (Apache-2.0),
# anthropics/claude-plugins-official, and rewritten against the current subagent docs
# (working-with-claude-code/references/sub-agents.md).
#
# Usage: validate-agent.sh <path/to/agent.md>
# Exit codes: 0 no errors (warnings allowed), 1 errors found, 2 usage error.
#
# Errors (Claude Code skips the file): no opening --- on line 1, unclosed frontmatter,
# missing name, missing description, name starting with '-', containing ':' or over 256 chars.
# Warnings: unknown frontmatter keys (silently ignored by Claude Code), unknown model/color,
# fields ignored for plugin subagents (hooks, mcpServers, permissionMode), empty tools,
# empty system prompt. <example> blocks in the description are NOT required.

set -eu

if [ $# -ne 1 ] || [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
  sed -n '2,13p' "$0" | sed 's/^# \{0,1\}//' >&2
  exit 2
fi

file="$1"
here=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
pf="$here/parse-frontmatter.sh"

errors=0
warnings=0
err() { echo "ERROR: $1"; errors=$((errors + 1)); }
warn() { echo "WARN: $1"; warnings=$((warnings + 1)); }

fm() { bash "$pf" "$file" "$1" 2>/dev/null || true; }

if [ ! -f "$file" ]; then
  echo "ERROR: file not found: $file"
  exit 1
fi

rc=0
bash "$pf" "$file" >/dev/null 2>&1 || rc=$?
case "$rc" in
  0) ;;
  2) err "line 1 must be '---'; otherwise Claude Code treats the file as documentation, not an agent"; echo "FAIL: $file"; exit 1 ;;
  4) err "frontmatter is not closed (missing second '---')"; echo "FAIL: $file"; exit 1 ;;
  *) err "could not read frontmatter (exit $rc)"; echo "FAIL: $file"; exit 1 ;;
esac

name=$(fm name)
if [ -z "$name" ]; then
  err "missing required field: name (file is skipped as documentation)"
else
  echo "OK: name: $name"
  case "$name" in
    -*) err "name must not start with '-'" ;;
  esac
  case "$name" in
    *:*) err "name must not contain ':' (reserved for plugin-scoped identifiers)" ;;
  esac
  if [ "${#name}" -gt 256 ]; then
    err "name is longer than 256 characters"
  fi
  if ! printf '%s' "$name" | grep -Eq '^[a-z0-9][a-z0-9-]*$'; then
    warn "name is not lowercase-hyphenated (convention only; docs allow other characters)"
  fi
fi

description=$(fm description)
if [ -z "$description" ]; then
  err "missing required field: description (file is skipped)"
else
  echo "OK: description: ${#description} characters"
fi

tools_present=0
bash "$pf" --keys "$file" 2>/dev/null | grep -qx 'tools' && tools_present=1
if [ "$tools_present" -eq 1 ] && [ -z "$(fm tools)" ]; then
  warn "tools is present but empty; if no entry resolves to a tool the subagent can fail to launch"
fi

model=$(fm model)
if [ -n "$model" ]; then
  case "$model" in
    sonnet | opus | haiku | fable | inherit | claude-*) ;;
    *) warn "unrecognized model '$model' (aliases: sonnet, opus, haiku, fable, inherit, or a full claude-* ID)" ;;
  esac
fi

color=$(fm color)
if [ -n "$color" ]; then
  case "$color" in
    red | blue | green | yellow | purple | orange | pink | cyan) ;;
    *) warn "unrecognized color '$color' (documented: red, blue, green, yellow, purple, orange, pink, cyan)" ;;
  esac
fi

known=" name description tools disallowedTools model permissionMode maxTurns autoCompactWindow skills mcpServers hooks memory background omitClaudeMd effort isolation color initialPrompt experimental "
for key in $(bash "$pf" --keys "$file" 2>/dev/null); do
  case "$known" in
    *" $key "*) ;;
    *) warn "unknown frontmatter key '$key' (Claude Code ignores it without an error; names are camelCase)" ;;
  esac
done

agent_dir=$(cd "$(dirname "$file")" && pwd)
if [ -d "$(dirname "$agent_dir")/.claude-plugin" ]; then
  for key in hooks mcpServers permissionMode; do
    if bash "$pf" --keys "$file" 2>/dev/null | grep -qx "$key"; then
      warn "'$key' is ignored for plugin subagents; ship hooks in hooks/hooks.json and servers in .mcp.json instead"
    fi
  done
fi

body=$(bash "$pf" --body "$file" 2>/dev/null | tr -d '[:space:]')
if [ -z "$body" ]; then
  warn "system prompt (markdown body) is empty"
else
  echo "OK: system prompt present"
fi

if [ "$errors" -gt 0 ]; then
  echo "FAIL: $file ($errors error(s), $warnings warning(s))"
  exit 1
fi
echo "OK: $file ($warnings warning(s))"
