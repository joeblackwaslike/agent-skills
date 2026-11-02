#!/usr/bin/env bash
# Split recent GitHub Actions runs into queue / setup / run time per job.
#
# Usage: ci-audit.sh [-n RUNS] [-w WORKFLOW] [-b BRANCH] OWNER/REPO [OWNER/REPO...]
#   -n RUNS      completed runs to sample per repo (default 15)
#   -w WORKFLOW  workflow name or file (default: all workflows)
#   -b BRANCH    only runs on this branch
#
# Skipped and cancelled jobs are excluded. Setup = runner bootstrap, checkout,
# toolchain setup, cache restore/save, and dependency install, matched by step-name
# prefix, so a test step named like "Install smoke test" counts as setup.
# Queue = job created -> job started. Medians in seconds.
# Requires: gh (authenticated), jq.
set -euo pipefail

runs=15 workflow="" branch=""
while getopts "n:w:b:h" opt; do
  case $opt in
    n) runs=$OPTARG ;;
    w) workflow=$OPTARG ;;
    b) branch=$OPTARG ;;
    h) sed -n '2,13p' "$0"; exit 0 ;;
    *) sed -n '2,13p' "$0"; exit 2 ;;
  esac
done
shift $((OPTIND - 1))
[[ $# -gt 0 ]] || { sed -n '2,13p' "$0"; exit 2; }

SETUP_RE='(?i)^(set up job|complete job|post |run actions/(checkout|cache|setup-[a-z]+)|checkout|set ?up|cache|restore|install)'
MED='def med: sort | if length == 0 then 0 else ((.[(length - 1) / 2 | floor] + .[length / 2 | floor]) / 2 | round) end;'

audit_repo() {
  # shellcheck disable=SC2054 # commas are a gh --json field list
  local repo=$1 args=(--status completed --limit "$runs" --json databaseId,workflowName,createdAt,updatedAt)
  [[ -n $workflow ]] && args+=(--workflow "$workflow")
  [[ -n $branch ]] && args+=(--branch "$branch")

  local run_list
  run_list=$(gh run list -R "$repo" "${args[@]}")

  echo "== $repo  (runs: $(jq length <<<"$run_list"), wall-clock median: $(jq "$MED"'[.[] | (.updatedAt|fromdate) - (.createdAt|fromdate)] | med' <<<"$run_list")s)"

  local id wf jobs_json
  while IFS=$'\t' read -r id wf; do
    if jobs_json=$(gh api --paginate "repos/$repo/actions/runs/$id/jobs" --jq '.jobs[]'); then
      jq -c --arg wf "$wf" '. + {wf: $wf}' <<<"$jobs_json"
    else
      echo "warning: could not fetch jobs for run $id of $repo; excluded from medians" >&2
    fi
  done < <(jq -r '.[] | [.databaseId, (.workflowName // "unknown")] | @tsv' <<<"$run_list") \
    | jq -rs --arg re "$SETUP_RE" "$MED"'
    def secs(a; b): (b|fromdate) - (a|fromdate);
    map(select(.started_at and .completed_at and .conclusion != "skipped" and .conclusion != "cancelled")
      | . as $j
      | [.steps[]? | select(.started_at and .completed_at)
         | {n: .name, d: secs(.started_at; .completed_at)}] as $steps
      | {job: (.wf + " / " + .name),
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
