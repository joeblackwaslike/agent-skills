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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/markdown-access.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "ad9bdfe1fb6829cbd2e70c909f505e38296f1bdef3feefc9659fbcfd2d7d8ecf"
---

# Markdown and Agent Discovery

Vercel documentation is available as HTML for humans and structured Markdown for AI agents. Vercel combines content negotiation, explicit Markdown URLs, discovery indexes, and a cross-site link graph so agents can find the right page and understand how it connects to related content.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Making agent-friendly pages with content negotiation](https://vercel.com/blog/making-agent-friendly-pages-with-content-negotiation)
- [Docs pages support Markdown responses](https://vercel.com/changelog/docs-pages-support-markdown-responses)
- [Making your catalog discoverable to AI agents](https://vercel.com/kb/guide/agentic-commerce-readiness) — Agentic commerce readiness starts with the initial HTML response. Server-render your product catalog, ship JSON-LD, and
- [Migrate to Vercel from Netlify](https://vercel.com/kb/guide/migrate-to-vercel-from-netlify) — Migrate your website's configuration from Netlify to Vercel
- [How to build an MCP server with Nuxt](https://vercel.com/kb/guide/how-to-build-an-mcp-server-with-nuxt) — Add an MCP server to your Nuxt app with the Nuxt MCP Toolkit. Create tools, resources, and prompt templates that AI assi
- [How to create a contentful asset on Vercel](https://vercel.com/kb/guide/how-to-create-a-contentful-asset-on-vercel) — This is my wonderful
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [Supported Frameworks on Vercel](https://vercel.com/docs/frameworks/more-frameworks) — Learn about the frameworks that can be deployed to Vercel.
- [Frontends on Vercel](https://vercel.com/docs/frameworks/frontend) — Vercel supports a wide range of the most popular frontend frameworks, optimizing how your application builds and runs no
- [Call AI Gateway Chat Completions with REST](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/rest-api) — Use AI Gateway API directly without client libraries using curl and fetch.
- [Getting started with Vercel Web Analytics](https://vercel.com/docs/analytics/quickstart) — Vercel Web Analytics provides you detailed insights into your website's visitors. This quickstart guide will help you ge

Full cross-link map for this page: [/docs/agent-resources/markdown-access.graph.md](/docs/agent-resources/markdown-access.graph.md)
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
| `related` | Paths of up to five other docs pages that the page links to. Empty (`[]`) when none are available |
| `summary` | A one-sentence description of the page |
| `install_vercel_plugin` | The command to install the [Vercel Plugin](/docs/agent-resources/vercel-plugin) |
| `search_with_vercel_cli` | The command to [search the docs](#search-the-docs-from-the-terminal) with the Vercel CLI |

The response body preserves headings, links, fenced code blocks, and tables. When the docs graph has curated links for the page, the Markdown response also includes a **Related pages** section after the introduction.

Each HTML page advertises its Markdown version in a `rel="alternate"` link with the `text/markdown` content type. It also advertises the page's `.graph.md` cross-link map.

## Knowledge Base guides

Append `.md` to a [Knowledge Base](/kb) guide URL to read the guide as Markdown. For example, [the evlog guide as Markdown](/kb/guide/ai-sdk-and-evlog.md) covers recording AI SDK usage and cost.

Guide pages, topic pages, and the [Knowledge Base index](/kb.md) also show agents how to find more guides with the Vercel CLI, without logging in. Their frontmatter includes a `search_with_vercel_cli` field, and a footer lists example searches:

```bash filename="terminal"
npx vercel@latest kb search "rewrites and redirects"
```

## Prompt library

The [prompt library](/kb/prompts) contains tasks you can give to a coding agent to build an app, extend an agent, or improve a project. Agents can browse the [Markdown index](/kb/prompts.md) to find prompts by title and description.

Append `.md` to an individual prompt URL to read its prerequisites, expected results, and prompt text. For example, [the AI chat app prompt as Markdown](/kb/prompts/build-ai-chat-app.md) includes instructions for building a streaming chat interface with the AI SDK and AI Gateway.

## Reference architecture

The [reference architecture library](/kb/architecture) groups documentation, guides, templates, and courses around application design decisions. Agents can browse the [Markdown index](/kb/architecture.md) to find a stack for their application.

Append `.md` to a stack URL to read its guidance and resource links. For example, [the agent stack as Markdown](/kb/architecture/agents.md) covers models, tools, durable workflows, and production operation.

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

## Search the docs from the terminal

Agents can search the Vercel docs and read pages as Markdown with the `vercel docs` command, without logging in. Search returns one result per page, best match first, with the page's title, URL, and description:

```bash filename="terminal"
npx vercel@latest docs search "environment variables"
npx vercel@latest docs inspect functions
```

Each docs Markdown response points agents at these commands. Its frontmatter includes a `search_with_vercel_cli` field, and a footer lists example searches. The Markdown response for a page that doesn't exist also suggests a search.

## Site-wide discovery files

Agents can use these files to discover Vercel documentation, the REST API, and other machine-readable resources:

| File | Use |
| --- | --- |
| `https://vercel.com/llms.txt` | A compact index of Vercel documentation and platform resources. Also served at `https://vercel.com/agent.txt` |
| `https://vercel.com/docs/llms-full.txt` | The full Vercel docs corpus in one file |
| `https://vercel.com/docs/sitemap.md` | A semantic page index with summaries and prerequisites |
| `https://vercel.com/kb/sitemap.md` | A page index for the Vercel Knowledge Base |
| [`/kb/prompts.md`](/kb/prompts.md) | A prompt library index with task titles, descriptions, and links to individual prompts |
| [`/kb/architecture.md`](/kb/architecture.md) | A reference architecture index with stack descriptions and links to application design guidance |
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

## Serve Markdown to agents from your own site

You can add the same content negotiation to your own documentation or content site, so that a page's canonical URL returns HTML to browsers and Markdown to agents. The examples use a Next.js app, and the same approach works in any framework that can return a Markdown response and rewrite requests based on a header.

### Create a route that returns Markdown

Add a route that returns the Markdown version of a page. This [Route Handler](https://nextjs.org/docs/app/getting-started/route-handlers) serves every page under `/md`. Replace `getMarkdownContent` with the function that loads or converts your content:

```ts filename="app/md/[[...slug]]/route.ts"
import { getMarkdownContent } from '@/lib/content';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const path = slug ? `/docs/${slug.join('/')}` : '/docs';
  const markdown = await getMarkdownContent(path);

  if (!markdown) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Link: `<https://your-domain.com${path}>; rel="canonical"`,
      Vary: 'Accept',
    },
  });
}
```

The `Vary: Accept` header tells caches to store the HTML and Markdown versions of a URL separately. The `Link` header with `rel="canonical"` tells search engines to index the HTML page instead of the Markdown copy.

### Rewrite requests that ask for Markdown

Rewrite a request to the Markdown route when its `Accept` header contains `text/markdown`. Put the rewrite in `beforeFiles` so that it runs before Next.js matches the HTML page at the same path:

```ts filename="next.config.ts"
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/docs/:path*',
          has: [
            {
              type: 'header',
              key: 'accept',
              value: '(.*)text/markdown(.*)',
            },
          ],
          destination: '/md/:path*',
        },
      ],
    };
  },
};

export default nextConfig;
```

This pattern matches any `Accept` header that mentions `text/markdown`. It doesn't compare quality values, so a request that ranks HTML higher, or rejects Markdown with `text/markdown;q=0`, also receives Markdown. For content negotiation that honors quality values, use the [`@vercel/agent-readability`](https://www.npmjs.com/package/@vercel/agent-readability) package instead of the rewrite. The package has adapters for Next.js, SvelteKit, and Nuxt, and for other frameworks deployed on Vercel. It also detects AI agents that don't ask for Markdown in the `Accept` header and serves them Markdown.

### Add a discovery index

Give agents a way to find your other pages. Publish an index that lists each page's title, URL, and a one-sentence summary as Markdown, such as the [`sitemap.md` index](#site-wide-discovery-files) for the Vercel docs, and link to it from every Markdown response. An agent that doesn't find its answer on the first page can then choose the next page to read.

### Test the responses

Request the same URL with and without the `Accept` header:

```bash filename="terminal"
# Returns HTML
curl https://your-domain.com/docs/getting-started

# Returns Markdown
curl --header "Accept: text/markdown" https://your-domain.com/docs/getting-started
```

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
