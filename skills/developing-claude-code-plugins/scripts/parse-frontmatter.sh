#!/bin/bash
# Frontmatter reader. Adapted from plugin-dev (Apache-2.0), anthropics/claude-plugins-official.
#
# Usage:
#   parse-frontmatter.sh <file>             print the raw frontmatter
#   parse-frontmatter.sh <file> <field>     print one top-level field's value
#   parse-frontmatter.sh --keys <file>      list top-level keys
#   parse-frontmatter.sh --body <file>      print everything after the closing ---
#
# Handles quoted scalars, block scalars (> and |), and block lists.
# Exit codes: 0 ok, 1 usage/file error, 2 no opening --- on line 1,
# 3 field not found, 4 frontmatter not closed.

set -eu

usage() {
  sed -n '2,12p' "$0" | sed 's/^# \{0,1\}//' >&2
  exit 1
}

mode=value
case "${1:-}" in
  -h | --help | "") usage ;;
  --keys) mode=keys; shift ;;
  --body) mode=body; shift ;;
esac

file="${1:-}"
field="${2:-}"
[ -n "$file" ] || usage
[ -f "$file" ] || { echo "error: file not found: $file" >&2; exit 1; }
[ "$mode" = value ] || [ -z "$field" ] || usage

if [ "$mode" = value ] && [ -z "$field" ]; then
  mode=raw
fi

awk -v mode="$mode" -v key="$field" '
function finish_value(   out, i, ind) {
  if (!has) exit_code = 3
  else {
    ind = first
    if (ind ~ /^[>|][-+0-9]*$/) {
      out = ""
      for (i = 1; i <= n; i++) out = out (i > 1 ? (ind ~ /^>/ ? " " : "\n") : "") cont[i]
    } else if (ind == "" && n > 0) {
      out = ""
      for (i = 1; i <= n; i++) { sub(/^- /, "", cont[i]); out = out (i > 1 ? "\n" : "") cont[i] }
    } else if (n > 0) {
      out = ind
      for (i = 1; i <= n; i++) out = out " " cont[i]
    } else {
      out = ind
      if (out ~ /^".*"$/ || out ~ /^\047.*\047$/) out = substr(out, 2, length(out) - 2)
    }
    print out
  }
}
NR == 1 {
  if ($0 ~ /^---[ \t]*$/) { state = 1; next }
  exit_code = 2; stop = 1; exit
}
state == 1 && $0 ~ /^---[ \t]*$/ { state = 2; closed = 1; if (mode == "raw" || mode == "keys" || mode == "value") stop = 1; if (stop) exit; next }
state == 1 {
  if (mode == "raw") print
  else if (mode == "keys") { if ($0 ~ /^[A-Za-z_][^:[:space:]]*:/) { k = $0; sub(/:.*/, "", k); print k } }
  else if (mode == "value") {
    if (found) {
      if ($0 ~ /^[ \t]+/ || $0 ~ /^- /) { line = $0; sub(/^[ \t]+/, "", line); cont[++n] = line; next }
      found = 0
    }
    if (!has && index($0, key ":") == 1) {
      first = substr($0, length(key) + 2); sub(/^[ \t]+/, "", first); sub(/[ \t]+$/, "", first)
      found = 1; has = 1
    }
  }
  next
}
state == 2 && mode == "body" { print }
END {
  if (exit_code == 2) exit 2
  if (!closed) exit 4
  if (mode == "value") { finish_value(); if (exit_code) exit exit_code }
}
' "$file"
