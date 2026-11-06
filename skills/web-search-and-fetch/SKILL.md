---
name: web-search-and-fetch
description: Use before WebSearch or WebFetch, and for any web search, URL read, library-docs lookup, or multi-source research. Also when a fetch is blocked (403, 429, captcha, login wall, empty SPA). Routes to SearXNG, Exa, Context7, Ref, Firecrawl, Parallel, or stealth-browser. Not for clicks or forms (use agent-browser).
license: MIT
compatibility: Needs the MCP servers and env vars listed in each reference file. Falls back to built-in WebSearch and WebFetch when a service is unavailable.
metadata:
  last_updated: "2026-11-05"
---

# Web search and fetch

Classify the request, pick the service, then read that service's reference file for
tool names, parameters, and configuration. Don't ask the user which tool to use and
don't narrate the routing. If a service is not connected or its env var is unset, skip
it and take the next row. Report failures plainly; never return weaker results
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

1. **Known-blocked host** (`ebay.com`, `reddit.com`, `www.amazon.com`): go straight to
   step 4.
2. **`WebFetch`**, or SearXNG `fetch_url` / `fetch_many` for several URLs or text
   extraction. Exa `web_fetch_exa`, Ref `ref_read_url` (docs), and Parallel `web_fetch`
   (PDFs, objective-focused excerpts) are equivalent reads when already in use.
3. **Unhydrated SPA** (body text under ~200 characters, or only an empty `#root`,
   `#app`, `#__next`): retry with SearXNG `fetch_url` and `rendered=true`.
4. **Blocked** (403, 429, captcha, login wall, near-empty server-rendered page):
   stealth-browser. See [stealth-browser.md](references/stealth-browser.md). Skip it if
   `STEALTH_BROWSER_URL` or `STEALTH_BROWSER_TOKEN` is unset.
5. **Needs structured JSON, a whole-site crawl, or clicks and forms**: Firecrawl
   (`firecrawl_scrape` with JSON, `firecrawl_crawl`, `firecrawl_interact`).
6. **Still failing**: `agent-browser` skill, or the Playwright and Chrome DevTools MCPs.

## Rules

- A tool that is not connected is skipped silently. A tool that errors gets logged
  (name and error) and the next option is tried.
- Never retry the same tool and query more than twice.
- Cite only URLs a tool actually returned. Never fabricate a citation.
- Run independent searches and fetches concurrently.
- Don't send credentials or private data in queries. They leave the machine.
- Paid calls (Exa, Firecrawl, Parallel) are for jobs the free tools can't do. Adding
  Parallel balance or deleting a Firecrawl monitor needs the user's go-ahead.

## Services

| Service | Reference | Env var | Connection |
| --- | --- | --- | --- |
| SearXNG | [searxng.md](references/searxng.md) | `SEARXNG_MCP_BASE_URL`, `SEARXNG_MCP_TRANSPORT` | plugin `searxng` (88plug) |
| stealth-browser | [stealth-browser.md](references/stealth-browser.md) | `STEALTH_BROWSER_URL`, `STEALTH_BROWSER_TOKEN` | HTTP gateway, no MCP |
| Exa | [exa.md](references/exa.md) | `EXA_API_KEY` | MCP `exa` |
| Context7 | [context7.md](references/context7.md) | `CONTEXT7_API_KEY` | MCP `context7`, plugin `context7` |
| Ref | [ref.md](references/ref.md) | `REF_API_KEY` | MCP `Ref` |
| Firecrawl | [firecrawl.md](references/firecrawl.md) | `FIRECRAWL_API_KEY` | MCP `firecrawl`, plugin `firecrawl` |
| Parallel | [parallel.md](references/parallel.md) | `PARALLEL_API_KEY` | MCP `Parallel-Search-MCP`, `parallel-cli` |
