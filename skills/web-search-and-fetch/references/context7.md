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
| `plugin:context7:context7` (plugin `context7@context7-marketplace`, `npx @upstash/context7-mcp`) | `mcp__plugin_context7_context7__` | The plugin does not read `CONTEXT7_API_KEY`. OAuth through `/mcp`, or anonymous with lower limits. |
| `context7` (user scope, `https://mcp.context7.com/mcp`) | `mcp__context7__` | API key |

`CONTEXT7_API_KEY` is set in the environment. For a headless, SSH, or CI host, run
`npx ctx7 setup --claude` (OAuth device flow, generates a key and installs a skill) or
add the server manually per
[All MCP Clients](https://context7.com/docs/resources/all-clients). Keys are managed at
[context7.com/dashboard](https://context7.com/dashboard).

Either prefix works. Use whichever is connected, and do not call both for one question.

## Failure modes

- **Library not found:** retry with the official name, then fall back to [ref](ref.md)
  or [firecrawl](firecrawl.md) `firecrawl_developer_search`.
- **Quota or rate-limit error:** stop retrying and move to the fallback. An API key
  raises the limit.
- **Stale or thin answer:** check the version in the ID, then confirm against the
  library's own site with `ref_read_url`.

## When to use something else

Prose explanations, RFCs, blog-post knowledge, and private docs belong to
[ref](ref.md) or [exa](exa.md). Context7 is for library API reference and examples.
