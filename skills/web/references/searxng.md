# SearXNG

Joe's self-hosted SearXNG runs in Kubernetes (namespace `searxng`) and is reachable on
the tailnet through a Tailscale ingress named `search`. It is the default search tool:
self-hosted and private. Its `braveapi` engine uses the paid Brave Search API, and the Google path uses a paid captcha solver. Agents reach it through the
[88plug/searxng-mcp](https://github.com/88plug/searxng-mcp) Claude Code plugin.

## What the backend runs

| Engine | Role |
| --- | --- |
| `braveapi` | Brave Search API. The paid, reliable general engine. |
| `stealth google` | A custom engine that fetches Google results through the [stealth-browser](stealth-browser.md) gateway, with automatic reCAPTCHA solving. |
| `brave`, `google` | Stock engines, disabled. They get blocked from a server IP. |

The pod reaches the gateway in-cluster (`STEALTH_BROWSER_URL` points at
`gateway.stealth-browser.svc.cluster.local`). The engine source and the manifests live in
the stealth-browser repo under `integrations/searxng/` and `deploy/k8s/searxng/`.
The Brave key sits in Secret `searxng-brave`.

## MCP server

The plugin is `plugin:searxng:searxng`, so its tools appear as
`mcp__plugin_searxng_searxng__<tool>`. Install and check it:

```text
/plugin marketplace add 88plug/claude-code-plugins
/plugin install searxng@88plug
claude mcp list                    # expect plugin:searxng:searxng ... Connected
```

Only the plugin should provide SearXNG tools. If `mcp__searxng__*` tools show up, a
second server is registered as plain `searxng`; remove it with
`claude mcp remove searxng -s user`.

### Tools

| Tool | Use when | Key parameters |
| --- | --- | --- |
| `search` | One query, ranked hits | `query`, `categories`, `engines`, `language`, `pageno`, `time_range` (`day`/`week`/`month`/`year`), `safesearch`, `max_results` (1-50, default 5), `ttl` |
| `search_many` | Several phrasings, merged and de-duplicated | `queries` (1-10), `concurrency`, same filters as `search` |
| `search_and_fetch` | One query plus page excerpts in the same call | `query`, `fetch_limit` (1-20, default 3), `fetch_excerpt_chars`, `rendered` |
| `research` | Multi-query, fetch the best sources, return citations | `queries` (1-10), `fetch_limit`, `fetch_excerpt_chars`, `rendered` |
| `fetch_url` | One known URL, Readability-style extract | `url`, `max_excerpt_chars`, `max_links`, `rendered`, `render_wait_ms` |
| `fetch_many` | Several known URLs in parallel (1-20) | `urls`, `max_excerpt_chars`, `concurrency`, `rendered` |
| `health` | Backend, cache, and renderer status | none |

Notes:

- `query` is 1-400 characters and accepts SearXNG bangs (`!wikipedia foo`).
- Visible output is compact. The full payload is in hidden `_meta`.
- Fetch renders JavaScript-heavy pages on its own when the plain HTML is thin
  (under 60 words or 800 characters). Pass `rendered=true` only to force it.
- Search results are cached 30 s, fetched pages 1 h. `ttl=0` skips the cache.
- `fetch_*` runs a local headless Chromium. It does not use the stealth-browser gateway,
  so it fails on bot-blocked sites. Use [stealth-browser](stealth-browser.md) for those.

### Picking a tool

| Need | Tool |
| --- | --- |
| Quick fact or link | `search` |
| Not sure of the right wording | `search_many` |
| Answer needs the page body | `search_and_fetch` |
| Report with sources | `research` |
| URL already known | `fetch_url` / `fetch_many` |
| Search returns nothing or errors | `health` first |

## Configuration

Set these in the environment of the Claude Code process.

| Variable | Default | Purpose |
| --- | --- | --- |
| `SEARXNG_MCP_BASE_URL` | `http://127.0.0.1:8890` | The SearXNG backend. Point it at Joe's tailnet URL. `SEARXNG_BASE_URL` also works. |
| `SEARXNG_MCP_TRANSPORT` | `stdio` | `stdio`, `streamable-http`, or `sse`. Keep `stdio` for a local client. |
| `SEARXNG_MCP_FALLBACK_BASE_URLS` | unset | Comma-separated backup backends. |
| `SEARXNG_MCP_SEARCH_TIMEOUT` / `SEARXNG_MCP_FETCH_TIMEOUT` | `6.0` / `15.0` | Seconds. Raise the search timeout, because `stealth google` is slower than Brave. |

The plugin manifest ships `SEARXNG_MCP_BASE_URL=http://127.0.0.1:8890` and its `env`
wins over `settings.json`, and plugin updates overwrite it. To make a backend override
last, put exports in `~/.config/searxng-mcp/env` (or the file named by
`SEARXNG_MCP_ENV_FILE`). The launcher sources that file just before starting the server:

```sh
export SEARXNG_MCP_BASE_URL=https://<your-searxng-host>
```

Other tuning variables (cache TTLs, render timeouts, concurrency, default language and
categories) are listed in the
[configuration docs](https://github.com/88plug/searxng-mcp/blob/main/docs/configuration.md).

## Gotchas

- `health` is the first check when results look empty. A 4xx or timeout from the
  backend usually means the tailnet is down or `SEARXNG_MCP_BASE_URL` still points at
  `127.0.0.1`.
- Google results through `stealth google` are slow (seconds, and queued behind other
  gateway traffic) and cost a captcha-solver call when Google serves a challenge.
- Never pass credentials or private data in a query. It goes to Brave and Google.

## Skills

The plugin ships no skills. Its server instructions and the `searxng://guide` resource
cover tool choice, and this skill routes to it. Use `/mcp` or `claude mcp list` to
confirm the tools loaded.

## Install

1. A reachable SearXNG backend. Joe's runs in the cluster, deployed from the
   stealth-browser repo (`deploy/k8s/searxng/deploy.sh`). Any other instance works too.
2. The plugin, in an interactive session: `/plugin marketplace add 88plug/claude-code-plugins`
   then `/plugin install searxng@88plug`. In a shell: `claude plugin marketplace add
   88plug/claude-code-plugins` and `claude plugin install searxng@88plug`.
3. Point it at the backend: export `SEARXNG_MCP_BASE_URL`, or write it to
   `~/.config/searxng-mcp/env` (see "Configuration"). Restart the session.
4. Check: `claude mcp list` shows `plugin:searxng:searxng` Connected, then call `health`.

Without the plugin, run the server with
`uvx --from git+https://github.com/88plug/searxng-mcp searxng-mcp` (Python 3.11+), or
use its Docker image. Both are in the
[installation docs](https://github.com/88plug/searxng-mcp/blob/main/docs/installation.md).

## Free tier and fallback

- **Cost:** the SearXNG service is self-hosted, so no per-query fee and no quota. The one
  metered part is the Brave Search API key behind `braveapi`: Brave gives monthly free
  credits but needs a card on file ([Brave Search API](https://brave.com/search/api/)).
  Check usage in the Brave dashboard.
- **Brave quota spent:** nothing to do. `stealth google` keeps returning results,
  only from one engine, so results are narrower and slower.
- **Backend down, `health` failing, or the tailnet unreachable:** say so, then use
  [parallel](parallel.md) `web_search` or [exa](exa.md) `web_search_exa`. Use built-in
  `WebSearch` last, labelled as a fallback.

## Sources

[88plug/searxng-mcp](https://github.com/88plug/searxng-mcp): `docs/installation.md`,
`docs/getting-started.md`, `docs/configuration.md`, `docs/reference/tools.md`.
Deployment details come from the stealth-browser repo.
