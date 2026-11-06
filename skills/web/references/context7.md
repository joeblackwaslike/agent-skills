# Context7

Context7 serves current, version-specific library documentation and code examples.
It is the first stop for "how do I use library X at version Y". Docs:
[Claude Code setup](https://context7.com/docs/clients/claude-code) and
[MCP tools](https://context7.com/docs/resources/all-clients#mcp-tools).

## Tools

| Tool | Parameters | Notes |
| --- | --- | --- |
| `resolve-library-id` | `libraryName` (required, official punctuation: `Next.js`, not `nextjs`), `query` (required, what you want to do) | Returns matches with ID, title, snippet count, reputation, benchmark score, and versions. Skip it when you already have an ID like `/vercel/next.js`. |
| `query-docs` | `libraryId` (required, `/owner/repo` or `/owner/repo/vX.Y.Z`), `query` (required, one concept), `language` (optional, ranks examples in that language first) | Returns docs and code as text. |

Flow: `resolve-library-id` once, then `query-docs` per question. Pin the version in the
ID (`/vercel/next.js/v16.2.9`) when the project's version matters. Keep each `query` to a
single concept; split compound questions into separate calls.

## Connection

Two servers are connected, with the same two tools:

| Entry | Tool prefix | Auth |
| --- | --- | --- |
| `plugin:context7:context7` (plugin `context7@context7-marketplace`) | `mcp__plugin_context7_context7__` | The plugin does not read `CONTEXT7_API_KEY`. OAuth through `/mcp`, or anonymous with lower limits. |
| `context7` (user scope, `https://mcp.context7.com/mcp`) | `mcp__context7__` | API key |

`CONTEXT7_API_KEY` is set in the environment. For a headless, SSH, or CI host, run
`npx ctx7 setup --claude` (OAuth device flow, generates a key and installs a skill) or
add the server manually per
[All MCP Clients](https://context7.com/docs/resources/all-clients). Keys are managed at
[context7.com/dashboard](https://context7.com/dashboard).

Either prefix works. Use whichever is connected, and do not call both for one question.

## Skills

`npx ctx7 setup --claude` installs a skill that triggers on library questions, so
"use context7" isn't needed. Installed here: `context7-mcp`, which activates for
library, framework, and API-reference questions and for code generation that uses a
library.

The MCP plugin adds only the two tools, no skills. Load a skill when you want its
trigger behavior, and use this file for tool parameters and the quota fallback.

## Install

Slash commands run in an interactive session. In a shell, use `claude plugin ...`.

1. Plugin (hosted MCP server, no local Node needed):
   `/plugin marketplace add upstash/context7`, then
   `/plugin install context7@context7-marketplace`, restart, then `/mcp` and sign in.
2. Or set up with a key and the bundled skill: `npx ctx7 setup --claude` (OAuth device
   flow, generates an API key, installs the skill, and works on a headless host). Keys
   live in the [dashboard](https://context7.com/dashboard) and go in `CONTEXT7_API_KEY`.
3. Or add the MCP server by hand: [All MCP Clients](https://context7.com/docs/resources/all-clients).
4. Check: `claude mcp list` shows Context7 Connected, then run `resolve-library-id`
   for `Next.js`.

Docs: [Claude Code setup](https://context7.com/docs/clients/claude-code).

## Quota and fallback


The Free plan gives **1,000 API calls per month** across the MCP server, CLI, and APIs.
After that, requests stop until the next month, with 20 bonus calls per day in between
([plans](https://context7.com/docs/plans-pricing)). Without a key the limits are lower
still. A rate-limited request returns HTTP `429` with `Retry-After`,
`RateLimit-Limit`, and `RateLimit-Remaining` headers
([API guide](https://context7.com/docs/api-guide)). Each `resolve-library-id` and
`query-docs` call counts, so skip `resolve-library-id` when you already know the ID.

## Fallback: fetch the official docs as markdown

Switch to this when Context7 returns a quota or `429` error, is not connected, doesn't
have the library, or gives a thin or stale answer. Don't retry Context7 more than once.
Say you switched ("Context7 quota hit, reading the official docs instead").

1. **Ref first** (separate quota): `ref_search_documentation` with a full-sentence
   query naming the library and version, then `ref_read_url` on the best hit. See
   [ref.md](ref.md). If it answers the question, stop.
2. **Find the official docs host.** Take it from the library's package page or repo
   README (`npm view <pkg> homepage`, `pip show <pkg>`, `gh repo view <owner>/<repo>`),
   not from a search result you haven't checked.
3. **Ask for markdown directly**, in this order, stopping at the first hit:
   1. `https://<docs-host>/llms.txt` (an index of pages), then the specific page.
      `llms-full.txt` holds the whole docs set when it exists. Grep it, don't read it
      whole.
   2. The page URL with `.md` appended, or fetched with the header
      `Accept: text/markdown`. Many docs sites serve this.
   3. The docs source in GitHub, pinned to the version in use:
      `https://raw.githubusercontent.com/<owner>/<repo>/<tag>/docs/<page>.md`. List the
      files with `gh api repos/<owner>/<repo>/contents/docs?ref=<tag>`.
4. **No markdown available**, so convert the HTML page:
   [searxng](searxng.md) `fetch_url` (free Readability-style extract), then
   [parallel](parallel.md) `web_fetch` with an `objective`, then
   [firecrawl](firecrawl.md) `firecrawl_scrape` (paid). If the site needs JavaScript
   or blocks agents, use [stealth-browser](stealth-browser.md).
5. **Check the version.** Confirm the page matches the version in the project's
   lockfile or manifest. Docs sites default to latest. Look for a version switcher, a
   `/vX.Y/` path, or the git tag in step 3.3.
6. **Cite and keep it small.** Quote only the relevant section and give its URL. For a
   long page, save it to the scratchpad and grep it. Don't paste it all into context.

## Other failure modes

- **Library not found:** retry once with the official name and punctuation, then use
  the fallback above.
- **Stale or thin answer:** check the version in the ID, then confirm against the
  official docs with the fallback above.

## When to use something else

Prose explanations, RFCs, blog-post knowledge, and private docs belong to
[ref](ref.md) or [exa](exa.md). Context7 is for library API reference and examples.
