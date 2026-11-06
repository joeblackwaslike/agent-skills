#!/usr/bin/env bash
# Health check for the services the web skill routes to. For each service it reports:
#   1. is the MCP server installed (registered)?
#   2. is it up and connectable (connected / needs authentication / failed)?
#   3. are the service's skills installed?
# Failures print numbered steps to resolve. Never prints secret values.
# Exit 1 if any service is unusable (no connected MCP and no working CLI).
set -u

fails=0
nl=$'\n'

say() { printf '%s\n' "$*"; }
row() { printf '%-5s %-18s %s\n' "$1" "$2" "$3"; }
steps() { # lines of resolution steps, already numbered
  printf '%s\n' "$1" | sed 's/^/        /'
}
have_var() { [ -n "${!1:-}" ]; }

env_file="${SEARXNG_MCP_ENV_FILE:-$HOME/.config/searxng-mcp/env}"
# shellcheck disable=SC1090
[ -r "$env_file" ] && . "$env_file"

mcp_out=""
if command -v claude >/dev/null 2>&1; then
  mcp_out=$(timeout 90 claude mcp list 2>&1 || true)
fi

mcp_line() { printf '%s\n' "$mcp_out" | awk -v n="$1: " 'index($0, n) == 1 { print; exit }'; }

mcp_status() { # line -> connected | auth | failed
  case "$1" in
    *Connected*) echo connected ;;
    *"Needs authentication"*) echo auth ;;
    *) echo failed ;;
  esac
}

skill_index=$(find -L "$HOME/.claude/skills" "$HOME/.agents/skills" "$HOME/.claude/plugins/cache" \
  -maxdepth 8 -name SKILL.md 2>/dev/null)

skill_present() { # skill-name [path-substring]
  printf '%s\n' "$skill_index" | grep -F -- "/$1/SKILL.md" | grep -qF -- "${2:-/}"
}

check_skills() { # service path-filter skill...
  local svc="$1" filt="$2" missing="" n=0 have=0
  shift 2
  for s in "$@"; do
    n=$((n + 1))
    if skill_present "$s" "$filt"; then have=$((have + 1)); else missing="$missing $s"; fi
  done
  if [ "$n" -eq 0 ]; then
    row ok "$svc skills" "none shipped"
  elif [ -z "$missing" ]; then
    row ok "$svc skills" "$have/$n installed"
  else
    row warn "$svc skills" "$have/$n installed; missing:$missing"
  fi
}

# check_mcp service "name1 name2" var "api-key add command" "skill-install hint"
check_mcp() {
  local svc="$1" names="$2" var="$3" addcmd="$4"
  local any_found=0 any_conn=0 n line st pending="" extra=""
  for n in $names; do
    line=$(mcp_line "$n")
    [ -z "$line" ] && continue
    any_found=1
    st=$(mcp_status "$line")
    case "$st" in
      connected)
        any_conn=1
        row ok "$svc MCP" "$n: installed, connected" ;;
      auth)
        pending="$pending$(row warn "$svc MCP" "$n: installed, needs authentication")${nl}"
        extra="$extra $n"
        case "$n" in
          plugin:*) pending="$pending$(steps "1. In an interactive claude session run /mcp, select $n, choose Authenticate (browser login).${nl}2. Or skip OAuth and use an API key entry: $addcmd")${nl}" ;;
          *) pending="$pending$(steps "1. In an interactive claude session run /mcp, select $n, choose Authenticate.${nl}2. If it uses an API key, confirm \$$var is set in the environment Claude Code starts from, then restart the session.")${nl}" ;;
        esac ;;
      failed)
        pending="$pending$(row warn "$svc MCP" "$n: installed, failed to connect")${nl}"
        extra="$extra $n"
        pending="$pending$(steps "1. Run: claude mcp get $n   (shows the command or URL and env).${nl}2. Check \$${var:-credentials} is set where Claude Code starts, then restart the session.${nl}3. If it is a URL, test it: curl -sS -m 10 -o /dev/null -w '%{http_code}' <url>   (401/403 = bad key, 000 = network).${nl}4. If it keeps failing: claude mcp remove $n, then re-add (see references/${svc}.md#install).")${nl}" ;;
    esac
  done
  if [ "$any_conn" -eq 1 ]; then
    [ -n "$extra" ] && row ok "$svc MCP" "also registered, not connected (optional):$extra"
  else
    printf '%s' "$pending"
  fi
  if [ "$any_found" -eq 0 ]; then
    row FAIL "$svc MCP" "not installed"
    steps "1. Install: see references/${svc}.md#install.${nl}2. API-key route: $addcmd${nl}3. Restart the session, then re-run doctor."
    fails=$((fails + 1))
  elif [ "$any_conn" -eq 0 ]; then
    row FAIL "$svc MCP" "installed but no entry is connected; $svc tools are unavailable"
    fails=$((fails + 1))
  fi
}

say "web doctor ($(date '+%Y-%m-%d %H:%M'))"
if [ -z "$mcp_out" ]; then
  row FAIL claude "claude CLI missing or printed nothing; MCP checks can't run"
  fails=$((fails + 1))
fi

say
say "== SearXNG"
if [ -n "$mcp_out" ]; then
  check_mcp searxng "plugin:searxng:searxng" "" \
    "/plugin marketplace add 88plug/claude-code-plugins && /plugin install searxng@88plug"
fi
check_skills searxng ""
if have_var SEARXNG_MCP_BASE_URL; then
  code=$(curl -sS -o /dev/null -m 10 --connect-timeout 5 -w '%{http_code}' "${SEARXNG_MCP_BASE_URL%/}/healthz" 2>/dev/null)
  if [ "$code" = 200 ]; then
    row ok "searxng backend" "answers /healthz"
  else
    row FAIL "searxng backend" "returned '${code:-no response}'"
    steps "1. Is the tailnet up? (tailscale status)${nl}2. Check SEARXNG_MCP_BASE_URL (or $env_file) points at the cluster URL, not 127.0.0.1.${nl}3. Check the pod: kubectl -n searxng get pods"
    fails=$((fails + 1))
  fi
else
  row FAIL "searxng backend" "SEARXNG_MCP_BASE_URL unset; plugin defaults to 127.0.0.1:8890"
  steps "1. export SEARXNG_MCP_BASE_URL=<cluster URL> or write it to $env_file.${nl}2. Restart the session."
  fails=$((fails + 1))
fi

say
say "== stealth-browser (HTTP gateway, no MCP or skills)"
if have_var STEALTH_BROWSER_URL && have_var STEALTH_BROWSER_TOKEN; then
  code=$(curl -sS -o /dev/null -m 10 --connect-timeout 5 -w '%{http_code}' \
    -H "Authorization: Bearer $STEALTH_BROWSER_TOKEN" "${STEALTH_BROWSER_URL%/}/healthz" 2>/dev/null)
  case "$code" in
    200) row ok stealth-browser "gateway healthy" ;;
    401)
      row FAIL stealth-browser "gateway rejected the token"
      steps "1. Re-read the token from the cluster Secret stealth-browser-secrets and update STEALTH_BROWSER_TOKEN."
      fails=$((fails + 1)) ;;
    *)
      row FAIL stealth-browser "gateway returned '${code:-no response}'"
      steps "1. Is the tailnet up? (tailscale status)${nl}2. kubectl -n stealth-browser get pods${nl}3. Redeploy: deploy/deploy.sh in the stealth-browser repo."
      fails=$((fails + 1)) ;;
  esac
else
  m=""
  have_var STEALTH_BROWSER_URL || m="STEALTH_BROWSER_URL "
  have_var STEALTH_BROWSER_TOKEN || m="${m}STEALTH_BROWSER_TOKEN"
  row FAIL stealth-browser "unset: $m; blocked and JavaScript pages cannot be fetched"
  steps "1. Export the missing variable(s) in the environment Claude Code starts from.${nl}2. See references/stealth-browser.md#install."
  fails=$((fails + 1))
fi

if [ -n "$mcp_out" ]; then
  say
  say "== Exa"
  check_mcp exa "exa plugin:exa:exa" EXA_API_KEY \
    "claude mcp add -s user --transport http exa 'https://mcp.exa.ai/mcp' -H 'Authorization: Bearer \${EXA_API_KEY}'"
  have_var EXA_API_KEY && row ok "exa key" "EXA_API_KEY set" || row warn "exa key" "EXA_API_KEY unset in this shell"
  check_skills exa /exa/ search exa-agent

  say
  say "== Context7"
  check_mcp context7 "context7 plugin:context7:context7" CONTEXT7_API_KEY \
    "claude mcp add -s user --transport http context7 https://mcp.context7.com/mcp -H 'CONTEXT7_API_KEY: \${CONTEXT7_API_KEY}'"
  have_var CONTEXT7_API_KEY && row ok "context7 key" "CONTEXT7_API_KEY set" || row warn "context7 key" "CONTEXT7_API_KEY unset in this shell"
  check_skills context7 "" context7-mcp

  say
  say "== Ref"
  check_mcp ref "Ref" REF_API_KEY \
    "claude mcp add -s user --transport http Ref 'https://api.ref.tools/mcp?apiKey=\${REF_API_KEY}'"
  have_var REF_API_KEY && row ok "ref key" "REF_API_KEY set" || row warn "ref key" "REF_API_KEY unset in this shell"
  check_skills ref ""

  say
  say "== Firecrawl"
  check_mcp firecrawl "firecrawl plugin:firecrawl:firecrawl" FIRECRAWL_API_KEY \
    "claude mcp add -s user --transport http firecrawl 'https://mcp.firecrawl.dev/v2/mcp' -H 'Authorization: Bearer \${FIRECRAWL_API_KEY}'"
  have_var FIRECRAWL_API_KEY && row ok "firecrawl key" "FIRECRAWL_API_KEY set" || row warn "firecrawl key" "FIRECRAWL_API_KEY unset in this shell"
  check_skills firecrawl /firecrawl/ firecrawl firecrawl-deep-research read-docs read-literature
fi

say
say "== Parallel"
if command -v parallel-cli >/dev/null 2>&1; then
  auth=$(parallel-cli auth --json 2>/dev/null | grep -o '"authenticated": *[a-z]*' | grep -o '[a-z]*$')
  if [ "$auth" = true ]; then
    row ok "parallel CLI" "installed, authenticated"
  else
    row FAIL "parallel CLI" "installed, not authenticated"
    steps "1. parallel-cli login   (add --no-browser on a headless host)${nl}2. Or export PARALLEL_API_KEY."
    fails=$((fails + 1))
  fi
  bal=$(parallel-cli balance get 2>&1 | grep -v "^[[:space:]]*$" | head -1)
  row ok "parallel balance" "${bal:-not reported by the CLI}"
else
  row FAIL "parallel CLI" "not installed"
  steps "1. brew install parallel-web/tap/parallel-cli${nl}2. parallel-cli login${nl}3. parallel-cli skills install"
  fails=$((fails + 1))
fi
if [ -n "$mcp_out" ]; then
  check_mcp parallel "Parallel-Search-MCP" PARALLEL_API_KEY \
    "claude mcp add --transport http \"Parallel-Search-MCP\" https://mcp.parallel.ai/mcp"
fi
check_skills parallel "" parallel-web-search parallel-web-extract parallel-deep-research \
  parallel-findall parallel-data-enrichment parallel-monitor parallel-memory \
  parallel-cli-setup parallel-mcp-setup parallel-search-setup parallel-search-evaluation
have_var PARALLEL_API_KEY && row ok "parallel key" "PARALLEL_API_KEY set" ||
  row warn "parallel key" "PARALLEL_API_KEY unset (fine if the CLI is logged in)"

say
say "Quota can't be read from here: Context7 (1,000 calls/month), Exa, Firecrawl (1,000 credits/month), Ref."
say "On a 402/429, follow that reference's 'Free tier and fallback' section."
if [ "$fails" -eq 0 ]; then say "doctor: all services usable"; else say "doctor: $fails problem(s) above"; fi
[ "$fails" -eq 0 ]
