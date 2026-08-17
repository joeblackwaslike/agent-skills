---
title: Markdown Access
product: vercel
url: /docs/agent-resources/markdown-access
canonical_url: "https://vercel.com/docs/agent-resources/markdown-access"
last_updated: 2026-02-27
type: conceptual
prerequisites:
  - /docs/agent-resources
related:
  - /docs/agent-resources/vercel-plugin
  - /docs/graph.json
  - /docs/functions.graph.md
summary: Access Vercel documentation as markdown using .md endpoints or the copy button.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/markdown-access.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "c961cac2018b803b524d61baed2cccdfe0c9b7454358d529188b3fefd33bc259"
---

# Markdown and Agent Discovery

Vercel documentation is available as HTML for humans and structured Markdown for AI agents. Vercel combines content negotiation, explicit Markdown URLs, discovery indexes, and a cross-site link graph so agents can find the right page and understand how it connects to related content.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Make your documentation readable by AI agents](https://vercel.com/kb/guide/make-your-documentation-readable-by-ai-agents?from=related) — Serve markdown to AI agents using content negotiation, .md endpoints, agent auto-detection, llms.txt,   sitemap.md, and
- [How to serve documentation for agents](https://vercel.com/kb/guide/how-to-serve-documentation-for-agents?from=related) — Learn how to serve markdown to agents and HTML for humans from the same URL
- [Agent Readability: A Specification for AI-Optimized Websites](https://vercel.com/kb/guide/agent-readability-spec?from=related) — When an agent visits your site, it needs to quickly find, read, and understand your pages. Sites that are easy for agent
- [Contribution Guide](https://nextjs.org/docs/community/contribution-guide?from=related) — Learn how to contribute to Next.js Documentation
- [AI Coding Agents](https://nextjs.org/docs/app/guides/ai-agents?from=related) — Learn how to configure your Next.js project so AI coding agents use up-to-date documentation instead of outdated trainin
- [MDX](https://nextjs.org/docs/pages/guides/mdx?from=related) — Learn how to configure MDX to write JSX in your markdown files.
- [Draft content in your voice from Slack with eve](https://vercel.com/kb/guide/eve-content-agent?from=related) — Deploy the eve content agent template, a Slack bot that drafts blog posts, LinkedIn posts, release notes, and newsletter
- [Getting Started](https://vercel.com/docs/getting-started-with-vercel?from=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [vercel agent](https://vercel.com/docs/cli/agent?from=related) — Generate an AGENTS.md file with Vercel deployment best practices using the vercel agent CLI command.
- [Products](https://vercel.com/docs/products?from=related) — Explore all Vercel products and capabilities.
- [Path Routing](https://vercel.com/docs/microfrontends/path-routing?from=related) — Learn about path routing on Vercel.
- [Contentful](https://vercel.com/docs/integrations/cms/contentful?from=related) — Integrate Vercel with Contentful to deploy your content.

Full cross-link map for this page: [/docs/agent-resources/markdown-access.graph.md](/docs/agent-resources/markdown-access.graph.md)
<!-- /docsgraph:related -->

## How agents receive Markdown

A canonical docs URL such as `https://vercel.com/docs/functions` returns HTML to an ordinary browser request. The same URL returns `text/markdown` when Vercel detects an AI agent or the request includes the `Accept: text/markdown` header.

Recognized AI agents receive Markdown even if they send an HTML `Accept` header. This lets you give an agent a canonical docs URL without changing the URL first.

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

Each Markdown response starts with YAML frontmatter. The frontmatter includes structured fields such as the title, product, canonical URL, last updated date, content type, prerequisites, related pages, and summary. The `prerequisites` and `related` arrays are empty when no relationships are available.

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

Each outbound or inbound link section renders at most 100 links. When a section overflows, the response points to [`/docs/graph.json`](/docs/graph.json) for the complete data.

## Site-wide discovery files

Agents can use these files to navigate or load the broader documentation set:

| File | Use |
| --- | --- |
| `https://vercel.com/llms.txt` | A compact index of Vercel documentation |
| `https://vercel.com/docs/llms-full.txt` | The full Vercel docs corpus in one file |
| `https://vercel.com/docs/sitemap.md` | A semantic page index with summaries and prerequisites |
| `https://vercel.com/docs/taxonomy.json` | Canonical product names, aliases, and deprecations |
| `https://vercel.com/docs/graph.json` | The complete cross-site documentation graph |

## View or copy Markdown in the browser

Open the page-actions menu on a docs page to access its Markdown:

- **View as Markdown** requests the canonical URL with `Accept: text/markdown`, creates a browser-local plain-text Blob, and opens the Blob URL in a new tab. The Blob URL is temporary and only works in your browser session. Share the page's `.md` URL instead.
- **Copy page** copies the page as Markdown to your clipboard so you can paste it into an AI assistant.

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
