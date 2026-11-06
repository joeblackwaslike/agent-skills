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
