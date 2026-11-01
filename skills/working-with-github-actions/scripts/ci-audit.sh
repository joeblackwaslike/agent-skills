#!/usr/bin/env bash
# Split recent GitHub Actions runs into queue / setup / run time per job.
#
# Usage: ci-audit.sh [-n RUNS] [-w WORKFLOW] [-b BRANCH] OWNER/REPO [OWNER/REPO...]
#   -n RUNS      completed runs to sample per repo (default 15)
#   -w WORKFLOW  workflow name or file (default: all workflows)
#   -b BRANCH    only runs on this branch
#
# Setup = runner bootstrap, checkout, toolchain setup, cache restore/save, and
# dependency install. Queue = job created -> job started. Medians in seconds.
# Requires: gh (authenticated), jq.
set -euo pipefail

runs=15 workflow="" branch=""
while getopts "n:w:b:h" opt; do
  case $opt in
    n) runs=$OPTARG ;;
    w) workflow=$OPTARG ;;
    b) branch=$OPTARG ;;
    *) sed -n '2,11p' "$0"; exit 2 ;;
  esac
done
shift $((OPTIND - 1))
[[ $# -gt 0 ]] || { sed -n '2,11p' "$0"; exit 2; }

SETUP_RE='(?i)^(set up job|complete job|post )|checkout|setup|cache|install'

audit_repo() {
  # shellcheck disable=SC2054 # commas are a gh --json field list
  local repo=$1 args=(--status completed --limit "$runs" --json databaseId,createdAt,updatedAt)
  [[ -n $workflow ]] && args+=(--workflow "$workflow")
  [[ -n $branch ]] && args+=(--branch "$branch")

  local run_list
  run_list=$(gh run list -R "$repo" "${args[@]}")

  echo "== $repo  (runs: $(jq length <<<"$run_list"), wall-clock median: $(jq '[.[] | (.updatedAt|fromdate) - (.createdAt|fromdate)] | sort | .[length/2|floor] // 0' <<<"$run_list")s)"

  jq -r '.[].databaseId' <<<"$run_list" | while read -r id; do
    gh api "repos/$repo/actions/runs/$id/jobs" --jq '.jobs[]' 2>/dev/null || true
  done | jq -rs --arg re "$SETUP_RE" '
    def med: sort | .[length/2|floor] // 0;
    def secs(a; b): (b|fromdate) - (a|fromdate);
    map(select(.started_at and .completed_at and .conclusion != "skipped")
      | . as $j
      | [.steps[]? | select(.started_at and .completed_at)
         | {n: .name, d: secs(.started_at; .completed_at)}] as $steps
      | {job: .name,
         queue: secs($j.created_at; $j.started_at),
         total: secs($j.started_at; $j.completed_at),
         setup: ([$steps[] | select(.n | test($re)) | .d] | add // 0),
         steps: $steps})
    | group_by(.job)[]
    | . as $g
    | ([$g[].steps[]] | group_by(.n)
       | map({n: .[0].n, d: (map(.d) | med)})
       | map(select(.d >= 3)) | sort_by(-.d) | .[:4]
       | map("\(.n[:40]) \(.d)s") | join(", ")) as $top
    | "  \($g[0].job[:45])  n=\($g|length)  queue=\($g|map(.queue)|med)s (max \($g|map(.queue)|max)s)  setup=\($g|map(.setup)|med)s  run=\($g|map(.total - .setup)|med)s  total=\($g|map(.total)|med)s\n    top: \($top)"'
}

for repo in "$@"; do audit_repo "$repo"; done
