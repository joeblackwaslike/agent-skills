# Exa

Exa is a neural web search and content API. Use it for niche technical queries,
semantic "find pages like this" searches, and company or people research where keyword
engines return noise. Source: [exa-labs/exa-mcp-server](https://github.com/exa-labs/exa-mcp-server).

## Connection

The hosted MCP server is `https://mcp.exa.ai/mcp`. Two entries exist:

| Entry | Auth | Tool prefix |
| --- | --- | --- |
| `plugin:exa:exa` (Claude Code plugin `exa@claude-plugins-official`) | OAuth, completed with `/mcp` in an interactive session | `mcp__plugin_exa_exa__` |
| `exa` (user scope) | `Authorization: Bearer ${EXA_API_KEY}` header | `mcp__exa__` |

Prefer the `exa` entry in non-interactive sessions, since OAuth can't be completed
there. Re-create it with:

```text
claude mcp add -s user --transport http exa 'https://mcp.exa.ai/mcp' \
  -H 'Authorization: Bearer ${EXA_API_KEY}'
```

Single quotes keep `${EXA_API_KEY}` unexpanded, so the key never lands in
`~/.claude.json`. The hosted server also works anonymously with low rate limits. A key
can instead go on the URL (`?exaApiKey=`) or in an `x-api-key` header.

## Tools

| Tool | Default on | Use when |
| --- | --- | --- |
| `web_search_exa` | yes | Search the web and get clean, ready-to-use page content |
| `web_fetch_exa` | yes | Read one or more URLs as clean markdown |
| `web_search_advanced_exa` | no | You need domain, date, or category filters, highlights, summaries, or subpage crawling |
| `agent_run` | no | Multi-step research, list-building, or enrichment with structured output. Needs auth |

Optional tools turn on through the URL, and a `tools=` list replaces the defaults, so
list everything you want:

```text
https://mcp.exa.ai/mcp?tools=web_search_exa,web_fetch_exa,web_search_advanced_exa,agent_run
```

`dynamicHighlights=true` (beta) makes the search tools pick highlights across all
results under one shared budget, which sends less text to the model.

Tool input schemas come from the server at connect time. Read them there rather than
trusting a copy in this file.

## Skills

The plugin bundles two skills. Load them for orchestration instead of re-deriving it:

- `exa:search` for deep research, lead generation, competitive analysis.
- `exa:exa-agent` for Exa Agent runs, enrichment, and structured output.

## When to use something else

- Library or API docs: [context7](context7.md) or [ref](ref.md).
- Exhaustive cited reports where cost matters: [parallel](parallel.md) deep research
  is purpose-built, but also slow and priced per run.
- Bot-blocked pages: [stealth-browser](stealth-browser.md).

## Install

Run in an interactive Claude Code session, or prefix with `claude plugin` in a shell
(`claude plugin install exa@claude-plugins-official`):

1. Plugin (adds the MCP server and the `exa:search` and `exa:exa-agent` skills):
   `claude plugin install exa@claude-plugins-official`. Then `/mcp` to sign in.
2. Or the MCP server alone with an API key (see "Connection" above). Get a key at the
   [Exa dashboard](https://dashboard.exa.ai/api-keys) and export it as `EXA_API_KEY`.
3. Check: `claude mcp list` shows `exa` as Connected.

Docs: [exa-mcp-server](https://github.com/exa-labs/exa-mcp-server),
[Exa MCP reference](https://docs.exa.ai/reference/exa-mcp).

## Free tier and fallback

- **Free tier:** $10 of credits every month plus a $10 onboarding bonus, no card
  needed ([pricing](https://exa.ai/pricing)). The hosted MCP also works without a key at
  low rate limits.
- **Out of credits or rate-limited:** stop retrying. Use [searxng](searxng.md)
  `search_many` for web queries and `fetch_url` for page text. For a company or
  people lookup with no free equivalent, use [parallel](parallel.md) `web_search`.
  Tell the user which fallback you used.
