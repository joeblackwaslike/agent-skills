# Firecrawl

Firecrawl turns pages into clean markdown or structured JSON, crawls sites, drives live
pages, and offers specialized indexes (developer sources, government publications,
scientific literature). It costs credits, so use it for jobs the free tools can't do.
Sources: [firecrawl-claude-plugin](https://github.com/firecrawl/firecrawl-claude-plugin)
and the [MCP docs](https://docs.firecrawl.dev/mcp-server).

## Connection

| Entry | Auth | Tool prefix |
| --- | --- | --- |
| `plugin:firecrawl:firecrawl` (plugin `firecrawl@firecrawl`, endpoint `https://mcp.firecrawl.dev/v2/mcp-search`) | OAuth, completed with `/mcp` in an interactive session | `mcp__plugin_firecrawl_firecrawl__` |
| `firecrawl` (user scope, added 2026-11-05) | `Authorization: Bearer ${FIRECRAWL_API_KEY}` | `mcp__firecrawl__` |

Prefer `firecrawl` in non-interactive sessions. Re-create it with:

```text
claude mcp add -s user --transport http firecrawl 'https://mcp.firecrawl.dev/v2/mcp' \
  -H 'Authorization: Bearer ${FIRECRAWL_API_KEY}'
```

Without a key or sign-in, the server is keyless and rate-limited, and exposes only
search, scrape, and parse. A key or OAuth session unlocks the rest.

## Tools

| Job | Tool |
| --- | --- |
| Read one page, or extract structured fields with a JSON schema | `firecrawl_scrape` |
| Search the web | `firecrawl_search` |
| List the URLs on a site | `firecrawl_map` |
| Read a PDF, document, spreadsheet, or HTML file | `firecrawl_parse` |
| Read many pages of a site | `firecrawl_crawl`, then `firecrawl_check_crawl_status` if it times out |
| Autonomous multi-source research | `firecrawl_agent`, then `firecrawl_agent_status` (async) |
| Click, fill forms, navigate a live page | `firecrawl_interact`, then `firecrawl_interact_stop` (always release the session) |
| Programming questions from issues, merged PRs, READMEs, docs | `firecrawl_developer_search` |
| Statutes, regulations, court opinions | `firecrawl_gov_search` |
| Scientific papers (PubMed, bioRxiv and others) | `firecrawl_research_*` |
| Recurring checks with diffs and notifications | `firecrawl_monitor_*` (never call `firecrawl_monitor_delete` unless asked) |
| Typed third-party provider records | `firecrawl_find_tools`, then `firecrawl_scrape` with `alexandria` (needs auth; runs cost credits) |

The former Extract tool is deprecated. Use `firecrawl_scrape` with JSON format for a
known URL, or `firecrawl_agent` when sources are unknown. Exact input schemas arrive
from the server at connect time. Check them there.

## Skills and commands

The plugin adds `/firecrawl:setup`, `/firecrawl:search`, `/firecrawl:scrape`,
`/firecrawl:map`, `/firecrawl:crawl`, `/firecrawl:agent`, and skills including
`firecrawl:firecrawl`, `firecrawl:firecrawl-deep-research`, `firecrawl:read-docs`,
`firecrawl:read-literature`, `firecrawl:find-leads`, `firecrawl:seo-audit`, and
`firecrawl:design`. Load the matching skill for workflow detail.

## When to use something else

- General search: [searxng](searxng.md) (free) or [exa](exa.md).
- A simple page read: `WebFetch`, then [stealth-browser](stealth-browser.md) if blocked.
- Hosted deep research with citations and a defined budget: [parallel](parallel.md).
- Never use Firecrawl for plain lookups. It spends credits per call.
