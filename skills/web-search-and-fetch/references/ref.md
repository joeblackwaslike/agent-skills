# Ref

Ref searches technical documentation (public web, GitHub, and private repos or PDFs)
and reads pages in a token-efficient way. It tracks the session's search history, so
repeated searches don't return the same results, and `ref_read_url` returns only the
most relevant ~5k tokens of a long page. Source:
[ref-tools/ref-tools-mcp](https://github.com/ref-tools/ref-tools-mcp), site [ref.tools](https://ref.tools).

## Tools

| Tool | Parameters | Use when |
| --- | --- | --- |
| `ref_search_documentation` | `query` (required): a full sentence or question | Finding docs or code snippets. Search, then read. |
| `ref_read_url` | `url` (required) | Reading a page a search returned, as markdown. |

Typical flow: search with a specific sentence ("Figma API post comment endpoint
documentation"), read one or two hits, refine the query if the answer is missing.
Rephrase instead of paging; Ref filters out results it already showed you.

## Install and configure

Auth is `REF_API_KEY` (set in the environment). The streamable-HTTP server is the
recommended setup:

```text
claude mcp add -s user --transport http Ref 'https://api.ref.tools/mcp?apiKey=${REF_API_KEY}'
```

Single quotes keep the variable unexpanded in `~/.claude.json`. The legacy stdio
alternative is `npx ref-tools-mcp@latest` with `REF_API_KEY` in its environment.
Connected as `Ref`, the tools are `mcp__Ref__ref_search_documentation` and
`mcp__Ref__ref_read_url`.

Don't confuse it with `plugin:ref:Plans` (`api.plan.ref.tools`). That is a separate
product for plans and has nothing to do with documentation search.

## When to use something else

- A known library with a clean ID and version: [context7](context7.md) first.
- Open-web research, news, or non-doc pages: [exa](exa.md) or [searxng](searxng.md).
- A page Ref can't read (blocked or interactive): [stealth-browser](stealth-browser.md).
