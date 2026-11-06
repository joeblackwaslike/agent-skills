# Parallel

Parallel is a web API built for agents: search, page extraction, deep research,
entity discovery, enrichment, and monitoring, billed from a prepaid balance. Agent
instructions: [parallel.ai/agents.md](https://parallel.ai/agents.md).

## Surfaces

| Surface | What it is |
| --- | --- |
| MCP `Parallel-Search-MCP` | Hosted at `https://mcp.parallel.ai/mcp`. Added with `claude mcp add --transport http "Parallel-Search-MCP" https://mcp.parallel.ai/mcp`. |
| `parallel-cli` | Installed with `brew install parallel-web/tap/parallel-cli`. Authenticates with OAuth (`parallel-cli login`) or `PARALLEL_API_KEY`. |
| Skills | `parallel-web-search`, `parallel-web-extract`, `parallel-deep-research`, `parallel-findall`, `parallel-data-enrichment`, `parallel-monitor`, `parallel-memory`, plus setup skills (`parallel-cli-setup`, `parallel-mcp-setup`, `parallel-search-setup`, `parallel-search-evaluation`). |

## MCP tools

| Tool | Use when |
| --- | --- |
| `web_search` | Default for factual, current, research, and troubleshooting questions. Accepts several `search_queries` in one call. Results carry excerpts meant to answer directly. |
| `web_fetch` | A specific URL, exact wording, or full-page analysis. Pass several URLs with one shared `objective`. Handles PDFs. |
| `web_decisions` | Only when the user asks for it by name, or wants a probability, a pick among given options, or a score. |
| `find_verticals` / `search_vertical` | Structured sources: bioRxiv/medRxiv, ChEMBL, ClinicalTrials.gov, CMS coverage, NPI Registry, PubMed. |

Search and fetch are read-only, idempotent, and safe to run concurrently. Fire
independent queries in parallel. Answer from excerpts when they suffice instead of
fetching every hit.

## CLI and skills

Prefer the MCP tools for ordinary lookups. Reach for the CLI skills when you need
their extra controls or saved JSON output:

| Need | Command or skill |
| --- | --- |
| Search with modes (`turbo`, `fast`, `basic`, `advanced`), domain filters, `--after-date` | `parallel-cli search` / `parallel-web-search` |
| Extract URLs as markdown, `--objective`, `--full-content` | `parallel-cli extract` / `parallel-web-extract` |
| Open-ended deep research. Only when the user says "deep research", "exhaustive", or "comprehensive report"; slow and costly | `parallel-cli research` / `parallel-deep-research` |
| "Find all X that..." entity discovery | `parallel-cli findall` / `parallel-findall` |
| Add web-sourced fields to a CSV or list | `parallel-cli enrich` / `parallel-data-enrichment` |
| Watch the web for changes on a cadence | `parallel-cli monitor` / `parallel-monitor` |
| Recall earlier Task, Monitor, or FindAll runs | `parallel-cli memory` / `parallel-memory` |

Account checks: `parallel-cli auth --json`, `parallel-cli balance get`. Adding balance
(`parallel-cli balance add <cents>`) spends money, so ask first.

## Configuration

`PARALLEL_API_KEY` is set in the full environment. The CLI also holds an OAuth login,
so it works without the variable when `parallel-cli auth --json` shows
`authenticated: true`. Check the CLI version (`>= 0.9.2`) with `parallel-cli --version`.
Run `parallel-cli skills install` to refresh the bundled skills.

Use of the service falls under the
[Parallel Customer Terms](https://parallel.ai/customer-terms).

## When to use something else

Free, high-volume lookups go to [searxng](searxng.md). Blocked sites go to
[stealth-browser](stealth-browser.md). Library docs go to [context7](context7.md).

## Skills

Installed with `parallel-cli skills install` (listed under Install):

| Skill | Use when |
| --- | --- |
| `parallel-web-search` | CLI-backed search with extra controls or saved JSON output. Prefer the MCP `web_search` for ordinary lookups |
| `parallel-web-extract` | CLI-backed URL extraction. Prefer the MCP `web_fetch` for ordinary pages |
| `parallel-deep-research` | Only when the user says "deep research", "exhaustive", or "comprehensive report" |
| `parallel-findall` | "Find all X that..." entity discovery |
| `parallel-data-enrichment` | Add web-sourced fields to a CSV or list |
| `parallel-monitor` | Track the web for changes on a cadence |
| `parallel-memory` | Recall earlier Task, Monitor, and FindAll runs |
| `parallel-cli-setup` | Install, authenticate, and check the CLI |
| `parallel-mcp-setup` | Add the MCP server |
| `parallel-search-setup` | Set up Parallel as the search provider |
| `parallel-search-evaluation` | Compare search quality |

## Install

1. CLI: `brew install parallel-web/tap/parallel-cli` (macOS). Other options:
   `uv tool install "parallel-web-tools[cli]"` or `npm install -g parallel-web-cli`.
2. Log in: `parallel-cli login` (add `--no-browser` on a headless host), then confirm
   with `parallel-cli auth --json`. Or set `PARALLEL_API_KEY` from
   [platform.parallel.ai](https://platform.parallel.ai/).
3. Skills: `parallel-cli skills install`. Restart the session if skills don't appear.
4. MCP server: `claude mcp add --transport http "Parallel-Search-MCP" https://mcp.parallel.ai/mcp`.
5. Check: `parallel-cli balance get`, and `claude mcp list` shows `Parallel-Search-MCP`
   Connected. The `parallel-cli-setup` and `parallel-mcp-setup` skills automate this.

Docs: [parallel.ai/agents.md](https://parallel.ai/agents.md).

## Free tier and fallback

- **Free allowance:** the Developer plan is pay-as-you-go with $5 of free credit a
  month (card on file) plus up to $80 at signup, and lists up to 5,000 free requests a
  month ([pricing](https://parallel.ai/pricing)). Search costs from $1 per 1,000
  requests; deep research runs cost more.
- **Out of balance or rate-limited:** don't top up without asking. Use
  [searxng](searxng.md) `search` or `search_many` for search, `fetch_url` for page
  text, and [exa](exa.md) for semantic or company queries. Structured sources
  (PubMed, ClinicalTrials.gov, NPI) have no free equivalent here; say so.
