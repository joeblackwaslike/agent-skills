---
name: brave-web-search
description: >-
  Web search via Brave Search's independent index (30B+ pages). Use when Exa/Tavily are unavailable,
  for privacy-first search with no Google/Bing dependency, or when news and time-sensitive results are
  needed. Requires BRAVE_API_KEY. If Brave MCP is connected, use MCP tool; otherwise call the REST API.
---

# Brave Web Search

**API key**: `BRAVE_API_KEY` env var — [api-dashboard.search.brave.com](https://api-dashboard.search.brave.com/app/subscriptions/subscribe)

## If Brave MCP is connected

Use `mcp__brave-search__web_search` (or similar — check deferred tools for exact name).

## REST API fallback

```bash
curl -s "https://api.search.brave.com/res/v1/web/search" \
  -H "Accept: application/json" \
  -H "X-Subscription-Token: ${BRAVE_API_KEY}" \
  -G \
  --data-urlencode "q=YOUR_QUERY" \
  --data-urlencode "count=10" \
  --data-urlencode "freshness=pm"
```

## Key Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `q` | Search query (max 400 chars) | required |
| `count` | Results per page (1-20) | 10 |
| `freshness` | `pd` (day), `pw` (week), `pm` (month) | none |
| `country` | Country code, e.g. `US` | auto |
| `safesearch` | `off`, `moderate`, `strict` | moderate |

## When to Use

- Privacy-first search (no Google/Bing dependency)
- News and time-sensitive queries when Tavily is unavailable
- Independent index with broad coverage
- Cost-effective: ~$0.10/100 queries
