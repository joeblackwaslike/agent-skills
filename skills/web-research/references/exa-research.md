---
name: exa-research
description: >-
  Deep research powered by Exa. Use for lead generation, literature reviews, deep dives, competitive
  analysis, or any query where one search falls short — including phrases like "research this",
  "find everything about", "find me all", or "deep dive on".
---

# Exa Research Orchestrator

Understand the query, plan the work, dispatch the right Exa tool, compile and deliver results.

## Tool Selection

| Query type | Tool |
|------------|------|
| General web research | `mcp__exa__web_search_exa` |
| Code examples in OSS | `mcp__exa__get_code_context_exa` |
| Company / product info | `mcp__exa__company_research_exa` |
| Deep multi-source research | `mcp__exa__deep_researcher_start` + poll `mcp__exa__deep_researcher_check` |
| LinkedIn / people research | `mcp__exa__linkedin_search_exa` |

## Date Handling

For recency queries ("last month", "this year"), calculate the actual date before searching:

```bash
date -u +%Y-%m-%dT%H:%M:%SZ
```

Use this as `startPublishedDate`.

## Source Quality

- Prefer `.edu`, `.gov`, and primary sources
- Prefer recent publications; check publish date
- Discard sources with relevance score < 0.5
- Never fabricate citations — only cite URLs actually returned by the tool
- Never retry the same tool + query more than twice

## Citation Format

```
[Title](URL) — one-line summary of key finding
```

Include at least 3 citations in any research response.
