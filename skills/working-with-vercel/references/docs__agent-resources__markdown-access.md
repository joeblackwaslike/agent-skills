---
title: Markdown and Agent Discovery
product: vercel
url: /docs/agent-resources/markdown-access
canonical_url: "https://vercel.com/docs/agent-resources/markdown-access"
last_updated: 2026-09-17
type: conceptual
prerequisites:
  - /docs/agent-resources
related:
  - /docs/agent-resources/vercel-plugin
  - /docs/graph.json
  - /docs/functions.graph.md
  - /docs/rest-api
  - /docs/agent-resources/vercel-mcp
summary: Learn how Vercel serves documentation to AI agents as Markdown and helps them discover related pages through content negotiation, discovery indexes,...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/markdown-access.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "72a4b6bcda42dcae4eb20dfa2bb74fd1a1f8b3eda9f434010c1b057a438a7eab"
---

# Markdown and Agent Discovery

Vercel documentation is available as HTML for humans and structured Markdown for AI agents. Vercel combines content negotiation, explicit Markdown URLs, discovery indexes, and a cross-site link graph so agents can find the right page and understand how it connects to related content.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to serve documentation for agents](https://vercel.com/kb/guide/how-to-serve-documentation-for-agents?from=related&source_path=%2Fdocs%2Fagent-resources%2Fmarkdown-access&source_site=vercel-docs&relationship=related) — Learn how to serve markdown to agents and HTML for humans from the same URL
- [Making agent-friendly pages with content negotiation](https://vercel.com/blog/making-agent-friendly-pages-with-content-negotiation?from=related&source_path=%2Fdocs%2Fagent-resources%2Fmarkdown-access&source_site=vercel-docs&relationship=related)
- [Docs pages support Markdown responses](https://vercel.com/changelog/docs-pages-support-markdown-responses?from=related&source_path=%2Fdocs%2Fagent-resources%2Fmarkdown-access&source_site=vercel-docs&relationship=related)
- [Docs Contribution Guide](https://nextjs.org/docs/community/contribution-guide?from=related&source_path=%2Fdocs%2Fagent-resources%2Fmarkdown-access&source_site=vercel-docs&relationship=related) — Learn how to contribute to Next.js Documentation
- [How to set up your Next.js project for AI coding agents](https://nextjs.org/docs/app/guides/ai-agents?from=related&source_path=%2Fdocs%2Fagent-resources%2Fmarkdown-access&source_site=vercel-docs&relationship=related) — Learn how to configure your Next.js project so AI coding agents use up-to-date documentation instead of outdated trainin
- [Open Vercel documentation pages in AI providers](https://vercel.com/changelog/open-vercel-documentation-pages-in-ai-providers?from=related&source_path=%2Fdocs%2Fagent-resources%2Fmarkdown-access&source_site=vercel-docs&relationship=related)
- [Text Prompting](https://v0.app/docs/text-prompting?from=related&source_path=%2Fdocs%2Fagent-resources%2Fmarkdown-access&source_site=vercel-docs&relationship=related) — Use text prompting to create initial UIs and ask technical questions with natural language.
- [AEO & GEO](https://docs.vercel.shop/docs/anatomy/aeo-geo?from=related&source_path=%2Fdocs%2Fagent-resources%2Fmarkdown-access&source_site=vercel-docs&relationship=related) — How the storefront makes itself legible to AI answer engines and generative search, with built-in content negotiation, s
- [Draft content in your voice from Slack with eve](https://vercel.com/kb/guide/eve-content-agent?from=related&source_path=%2Fdocs%2Fagent-resources%2Fmarkdown-access&source_site=vercel-docs&relationship=related) — Deploy the eve content agent template, a Slack bot that drafts blog posts, LinkedIn posts, release notes, and newsletter
- [Ship It](https://eve.dev/docs/tutorial/ship-it?from=related&source_path=%2Fdocs%2Fagent-resources%2Fmarkdown-access&source_site=vercel-docs&relationship=related) — Part 8 of the Build an Agent tutorial. Put a web dashboard on the agent with useEveAgent, replace placeholderAuth, and d
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel?from=related&source_path=%2Fdocs%2Fagent-resources%2Fmarkdown-access&source_site=vercel-docs&relationship=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [vercel agent](https://vercel.com/docs/cli/agent?from=related&source_path=%2Fdocs%2Fagent-resources%2Fmarkdown-access&source_site=vercel-docs&relationship=related) — Generate an AGENTS.md file with Vercel deployment best practices using the vercel agent CLI command.

Full cross-link map for this page: [/docs/agent-resources/markdown-access.graph.md](/docs/agent-resources/markdown-access.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fmarkdown-access&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## How agents receive Markdown

A canonical docs URL such as `https://vercel.com/docs/functions` returns HTML to an ordinary browser request. The same URL returns `text/markdown` when the request prefers Markdown, or when Vercel detects an AI agent without a format preference.

Vercel honors explicit format preferences. A recognized AI agent receives HTML when it requests `text/html`. When the agent does not distinguish between HTML and Markdown, Vercel returns Markdown.

To request Markdown from the canonical URL, send the `Accept` header:

```bash
curl --header "Accept: text/markdown" https://vercel.com/docs/functions
```

Every Markdown response sets the `Vary: Accept` header. The Vercel CDN includes `Accept` in its cache key, and the header lets browser, agent-side, and third-party intermediary caches store the HTML and Markdown versions of a page separately.

## .md endpoints

Append `.md` to any documentation URL to get an explicit Markdown URL for that page:

- **HTML:** `https://vercel.com/docs/functions`
- **Markdown:** `https://vercel.com/docs/functions.md`

The `.md` URL is durable and shareable. Use it in saved prompts, project rules, scripts, or other tools that need to request Markdown directly.

```bash
curl https://vercel.com/docs/functions.md
```

Both curl commands return the Vercel Functions page as Markdown.

### What a Markdown response contains

Each Markdown response starts with YAML frontmatter with these fields:

| Field | Value |
| --- | --- |
| `title` | The page title |
| `product` | The product the page documents, such as `vercel` or `nextjs` |
| `url` | The page path, such as `/docs/functions` |
| `canonical_url` | The full canonical URL of the HTML page |
| `last_updated` | The date the page last changed, in `YYYY-MM-DD` format |
| `type` | The content type: `conceptual`, `tutorial`, `how-to`, `reference`, or `integration` |
| `prerequisites` | Paths of pages to read first. Empty (`[]`) when none are available |
| `related` | Paths of curated related pages. Empty (`[]`) when none are available |
| `summary` | A one-sentence description of the page |
| `install_vercel_plugin` | The command to install the [Vercel Plugin](/docs/agent-resources/vercel-plugin) |

The response body preserves headings, links, fenced code blocks, and tables. When the docs graph has curated links for the page, the Markdown response also includes a **Related pages** section after the introduction.

Each HTML page advertises its Markdown version in a `rel="alternate"` link with the `text/markdown` content type. It also advertises the page's `.graph.md` cross-link map.

## Cross-link graph

Vercel builds a nightly cross-link graph across Vercel docs, the Vercel Knowledge Base, nextjs.org, ai-sdk.dev, and other Vercel documentation sites. The graph helps agents move beyond one page and find supporting context across the documentation estate.

The docs cross-link graph maps relationships between documentation pages. The [Vercel Plugin](/docs/agent-resources/vercel-plugin) ecosystem knowledge graph is separate and maps relationships between Vercel products.

### Complete graph.json file

[`/docs/graph.json`](/docs/graph.json) contains the complete graph. Each page entry includes its title, summary, outbound and inbound links, semantic neighbors, curated related pages, and prerequisites when available.

The graph rebuilds nightly. Check its `builtAt` value before using it when freshness matters.

### Per-page .graph.md files

Append `.graph.md` to a page URL for a smaller cross-link map designed for agent tools. For example, [`/docs/functions.graph.md`](/docs/functions.graph.md) includes:

- Semantically closest pages
- Prerequisites, when available
- Pages that the source page links to
- Pages that link to the source page, grouped by site

Each `.graph.md` response contains the page's complete set of relationships, and section headings include the link count. The header of every response links to [`/docs/graph.json`](/docs/graph.json) and states when the graph was built. Pages that are newer than the last nightly build return a `200` response explaining that no cross-link map exists yet.

## Site-wide discovery files

Agents can use these files to discover Vercel documentation, the REST API, and other machine-readable resources:

| File | Use |
| --- | --- |
| `https://vercel.com/llms.txt` | A compact index of Vercel documentation and platform resources. Also served at `https://vercel.com/agent.txt` |
| `https://vercel.com/docs/llms-full.txt` | The full Vercel docs corpus in one file |
| `https://vercel.com/docs/sitemap.md` | A semantic page index with summaries and prerequisites |
| `https://vercel.com/kb/sitemap.md` | A page index for the Vercel Knowledge Base |
| `https://vercel.com/docs/taxonomy.json` | Canonical product names, aliases, and deprecations |
| `https://vercel.com/docs/graph.json` | The complete cross-site documentation graph |
| `https://vercel.com/openapi.json` | The OpenAPI 3.0 description of the [Vercel REST API](/docs/rest-api) |
| `https://vercel.com/.well-known/ai-catalog.json` | A catalog of Vercel's agent-facing resources, including [Vercel MCP](/docs/agent-resources/vercel-mcp) OAuth metadata, the REST API OpenAPI description, and the documentation graph |
| `https://vercel.com/.well-known/api-catalog` | An [RFC 9727](https://www.rfc-editor.org/rfc/rfc9727) API catalog that links the REST API to its OpenAPI description, documentation, and status endpoint |

## View or copy Markdown in the browser

Every docs page has a **Copy page** button at the top of the content. Click the button to copy the page as Markdown to your clipboard, or open its menu for more options:

- **Copy page** copies the page as Markdown to your clipboard so you can paste it into an AI assistant.
- **View as Markdown** opens the page's durable `.md` URL in a new tab so you can view or share its Markdown representation.
- **Open in v0** and **Ask AI about this page** send the page to an AI assistant as context.
- **OpenAPI Specification** appears on [REST API](/docs/rest-api) reference pages and opens the API's OpenAPI description.

## Feeding documentation to AI assistants

### Single page context

When you need help with a specific feature, copy that page's Markdown or fetch its `.md` URL, then include the content in your prompt:

```text
Here is the Vercel Functions documentation:

[paste markdown content]

Based on this, how do I set up a function with a 60 second timeout?
```

### Multiple page context

For tasks that span multiple features, combine the relevant pages:

```text
I need to deploy a Next.js app with custom domains. Here is the relevant documentation:

## Deploying
[paste deploying.md]

## Custom Domains
[paste domains.md]

Help me set this up step by step.
```

### Project rules

In tools like Cursor, add `.md` documentation URLs to your [project rules](https://cursor.com/docs/context/rules) so the AI can load the relevant Vercel documentation.


---

[View full sitemap](/docs/sitemap)
