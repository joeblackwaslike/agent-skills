---
name: web
description: Use before WebSearch or WebFetch, and for any web search, URL read, library-docs lookup, or multi-source research. Also when a fetch is blocked (403, 429, captcha, login wall, empty SPA). Routes to SearXNG, Exa, Context7, Ref, Firecrawl, Parallel, or stealth-browser. Not for multi-step browser automation (use agent-browser).
license: MIT
compatibility: Needs the MCP servers and env vars listed in each reference file. Falls back to built-in WebSearch and WebFetch when a service is unavailable.
metadata:
  last_updated: "2026-11-05"
---

# Web search and fetch

Classify the request, pick the service, then read that service's reference file for
tool names, parameters, and configuration. Don't ask the user which tool to use and
don't narrate the routing. If a service is not connected, skip it and take the next row. Connection can be OAuth,
an API key, or keyless; don't treat a missing env var alone as unavailable. Report failures plainly; never return weaker results
silently.

## Route a search

| Request | Service | First tool | Reference |
| --- | --- | --- | --- |
| General lookup, quick fact, news, anything unclassified | SearXNG | `search` (`search_many` for variants) | [searxng.md](references/searxng.md) |
| Library, framework, or SDK API docs and examples | Context7 | `resolve-library-id`, then `query-docs` | [context7.md](references/context7.md) |
| Doc prose, RFCs, private docs, library not in Context7 | Ref | `ref_search_documentation`, then `ref_read_url` | [ref.md](references/ref.md) |
| Niche technical query, semantic or "similar to" search, company or people research | Exa | `web_search_exa` | [exa.md](references/exa.md) |
| Programming Q&A from issues and PRs, statutes, papers | Firecrawl | `firecrawl_developer_search`, `firecrawl_gov_search`, `firecrawl_research_*` | [firecrawl.md](references/firecrawl.md) |
| Search with excerpts, concurrent fan-out, or structured sources (PubMed, trials, NPI) | Parallel | `web_search`, `find_verticals` | [parallel.md](references/parallel.md) |
| Report with sources from several queries | SearXNG | `research` (Parallel deep research only if the user says "deep research" or "exhaustive") | [searxng.md](references/searxng.md), [parallel.md](references/parallel.md) |
| Find every entity matching a description, enrich a list, watch a page over time | Parallel, or Firecrawl | `parallel-cli findall` / `enrich` / `monitor`, or `firecrawl_monitor_*` | [parallel.md](references/parallel.md), [firecrawl.md](references/firecrawl.md) |
| Google, eBay (incl. sold comps), Reddit, or Amazon results | stealth-browser (SearXNG already covers plain Google) | `POST /content` on a search URL | [stealth-browser.md](references/stealth-browser.md) |

Default to the free, self-hosted options (SearXNG, Context7, Ref) before paid ones
(Exa, Firecrawl, Parallel). Use built-in `WebSearch` only as a last resort and say so:
"(using fallback search, results may be less targeted)".

## Route a fetch

Stop at the first step that returns enough content.

1. **Host on the blocked-host list below**: go straight to step 3.
2. **`WebFetch`**, or SearXNG `fetch_url` / `fetch_many` for several URLs or text
   extraction. Exa `web_fetch_exa`, Ref `ref_read_url` (docs), and Parallel `web_fetch`
   (PDFs, objective-focused excerpts) are equivalent reads when already in use.
   Escalate to step 3 when the response is any of:
   - HTTP 403 or 429
   - a captcha, "robot", "automated access", or "verify you are human" page
   - a login wall, or a redirect to a login or challenge page
   - an unhydrated single-page app: body text under ~200 characters, or only an empty
     `#root`, `#app`, or `#__next`
   - under ~300 characters on a page that is clearly server-rendered
3. **stealth-browser** renders JavaScript and gets past bot blocks, so one step covers
   both blocked pages and SPAs. See [stealth-browser.md](references/stealth-browser.md).
   **If `STEALTH_BROWSER_URL` or `STEALTH_BROWSER_TOKEN` is unset, or the health check
   fails, say so loudly. Don't skip it silently.** Tell the user, before anything else:

   > stealth-browser is unavailable: `<STEALTH_BROWSER_URL | STEALTH_BROWSER_TOKEN>` is
   > not set in this environment (or the gateway is unreachable). I can't fetch
   > `<domain>`: it is blocked or needs JavaScript rendering, and stealth-browser is the
   > only tool here that handles it.

   Then try step 4 as a degraded fallback and label the result as such.
4. **Fallback renderers**, weaker than step 3 and not a substitute for it: SearXNG
   `fetch_url` with `rendered=true` (local headless Chromium, no bot evasion), Firecrawl
   (`firecrawl_scrape`; also structured JSON, `firecrawl_crawl`, `firecrawl_interact` for
   clicks and forms), then the `agent-browser` skill or the Playwright and Chrome
   DevTools MCPs.

### Blocked-host list

Official list of hosts that go straight to stealth-browser, skipping `WebFetch`. Add a
host here when it blocks twice; this table is the only copy.

| Host | Profile | What to fetch |
| --- | --- | --- |
| `ebay.com` and every subdomain | `ebay` (logged in) | Sold comps (`/sch/i.html?...&LH_Sold=1&LH_Complete=1`), Terapeak and Seller Hub research URLs, listings. Anonymous sold searches redirect to sign-in. |
| `reddit.com` and every subdomain | `reddit` (logged in) | Threads, search, login-walled threads |
| `www.amazon.com` | `anon` | Search results, product pages |
| `www.google.com/search` | `anon` | Raw results page only; plain Google queries go through SearXNG |

## Rules

- A search tool that is not connected is skipped silently. stealth-browser is the
  exception: it has no equivalent, so its absence is always reported (see fetch step 3).
  A tool that errors gets logged (name and error) and the next option is tried.
- Context7 out of quota or erroring: follow the fallback procedure in
  [context7.md](references/context7.md), don't just retry.
- Never retry the same tool and query more than twice.
- Cite only URLs a tool actually returned. Never fabricate a citation.
- Run independent searches and fetches concurrently, except through stealth-browser: its
  gateway runs one request at a time and queues at most five, so send those one by one.
- Don't send credentials or private data in queries. They leave the machine.
- Paid calls (Exa, Firecrawl, Parallel) are for jobs the free tools can't do. Adding
  Parallel balance or deleting a Firecrawl monitor needs the user's go-ahead.

## Doctor (`/web doctor`)

When the argument is `doctor`, or a service seems broken, run
`bash ${CLAUDE_SKILL_DIR}/scripts/doctor.sh` (about 20 seconds). For each service it
reports whether the MCP server is installed, whether it is connected, needs
authentication, or failed, and whether the service's skills are installed. A failure
prints numbered steps to resolve it.

Show the user the output. Then run every resolution step you can without them, such as
registering a missing MCP with an API key. Report as blocked only the steps that need a
human: an OAuth login through `/mcp`, or an env var that isn't set in the shell Claude
Code starts from. The script can't read quota; see each reference's "Free tier and
fallback".

## Services

If a service isn't set up, its reference file has an Install section (plugin, MCP
server, skills, env var, and a check) and a "Free tier and fallback" section. Follow
the Install steps when the user asks for the service or no fallback fits. In a shell,
`/plugin ...` becomes `claude plugin ...`. A login or OAuth step needs the user; report
it as the one thing you can't do.

| Service | Reference | Env var | Connection |
| --- | --- | --- | --- |
| SearXNG | [searxng.md](references/searxng.md) | `SEARXNG_MCP_BASE_URL`, `SEARXNG_MCP_TRANSPORT` | plugin `searxng` (88plug) |
| stealth-browser | [stealth-browser.md](references/stealth-browser.md) | `STEALTH_BROWSER_URL`, `STEALTH_BROWSER_TOKEN` | HTTP gateway, no MCP |
| Exa | [exa.md](references/exa.md) | `EXA_API_KEY` | MCP `exa` |
| Context7 | [context7.md](references/context7.md) | `CONTEXT7_API_KEY` | MCP `context7`, plugin `context7` |
| Ref | [ref.md](references/ref.md) | `REF_API_KEY` | MCP `Ref` |
| Firecrawl | [firecrawl.md](references/firecrawl.md) | `FIRECRAWL_API_KEY` | MCP `firecrawl`, plugin `firecrawl` |
| Parallel | [parallel.md](references/parallel.md) | `PARALLEL_API_KEY` | MCP `Parallel-Search-MCP`, `parallel-cli` |
