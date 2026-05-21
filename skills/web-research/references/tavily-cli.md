---
name: tavily-cli
description: |
  Web search, content extraction, crawling, and deep research via the Tavily CLI. Use this skill whenever
  the user wants to search the web, find articles, research a topic, look something up online, extract
  content from a URL, grab text from a webpage, crawl documentation, download a site's pages, discover
  URLs on a domain, or conduct in-depth research with citations. Also use when they say "fetch this page",
  "pull the content from", "get the page at https://", "find me articles about", or reference extracting
  data from external websites. Do NOT trigger for local file operations, git commands, deployments, or
  code editing tasks.
compatibility: Requires tavily-cli (`curl -fsSL https://cli.tavily.com/install.sh | bash`) and TAVILY_API_KEY.
allowed-tools: Bash(tvly *)
---

# Tavily CLI

Web search, content extraction, site crawling, URL discovery, and deep research. Returns JSON optimized
for LLM consumption.

## Prerequisites

Check: `tvly --status`. If not ready:

```bash
curl -fsSL https://cli.tavily.com/install.sh | bash
tvly login --api-key "${TAVILY_API_KEY}"
```

## Escalation Workflow

Start simple, escalate when needed:

| Need | Command | When |
|------|---------|------|
| Find pages on a topic | `tvly search` | No specific URL yet |
| Get a page's content | `tvly extract` | Have a URL |
| Find URLs within a site | `tvly map` | Need to locate a subpage |
| Bulk extract a site section | `tvly crawl` | Need many pages (e.g., all /docs/) |
| Deep research with citations | `tvly research` | Need multi-source synthesis |

## Output

All commands support `--json` for machine-readable output and `-o` to save to a file:

```bash
tvly search "react hooks" --json -o results.json
tvly extract "https://example.com/docs" -o docs.md
tvly crawl "https://docs.example.com" --output-dir ./docs/
```

## Tips

- Always quote URLs — shell interprets `?` and `&` as special characters
- Use `--json` in agentic workflows
- Read from stdin: `echo "query" | tvly search -`
- Exit codes: 0=success, 2=bad input, 3=auth error, 4=API error
