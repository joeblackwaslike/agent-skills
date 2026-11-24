---
title: Frameworks on Vercel
product: vercel
url: /docs/frameworks
canonical_url: "https://vercel.com/docs/frameworks"
last_updated: 2026-08-11
type: conceptual
prerequisites:
  []
related:
  - /docs/frameworks/more-frameworks
  - /docs/frameworks/agents
  - /docs/getting-started-with-vercel
  - /docs/git
  - /docs/deployments/environments
summary: Vercel supports a wide range of the most popular frameworks, optimizing how your application builds and runs no matter what tool you use.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/frameworks.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "65016a85b3b12c27bc68b848c5fcff278a10a6c68b1ab6f8a718c6a9bcbcba93"
---

# Frameworks on Vercel

## Deploy your framework on Vercel

Build with Next.js, SvelteKit, Nuxt, Hono, FastAPI, or another supported framework. Vercel detects your framework and configures the build for you, often with no setup.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Announcing the Build Output API](https://vercel.com/blog/build-output-api)
- [Metrics for outgoing requests](https://vercel.com/changelog/metrics-for-outgoing-requests)
- [Skew Protection is now generally available](https://vercel.com/changelog/skew-protection-is-now-generally-available)
- [Building an AI chat app with RAG and source citations on Vercel](https://vercel.com/kb/guide/building-ai-chat-app-with-rag-and-citations-on-vercel) — A production stack for AI chat with retrieval, reranking, source citations, and background ingestion on Vercel using Nex
- [Deploy a Node.js Fastify app on Vercel with Docker](https://vercel.com/kb/guide/deploy-nodejs-on-vercel-with-docker) — Build a Node.js application with Fastify and Docker, then deploy it to Vercel Functions. Learn how to configure environm
- [Deploy Rust on Vercel with Docker](https://vercel.com/kb/guide/deploy-rust-on-vercel-with-docker) — Build a Rust application with Axum and Docker, then deploy it to Vercel Functions. Learn how to configure environment va
- [Migrate to Vercel from Cloudflare](https://vercel.com/kb/guide/migrate-to-vercel-from-cloudflare) — Migrate your website's configuration from Cloudflare Pages or Workers to Vercel
- [Production architecture for a RAG chatbot on Vercel](https://vercel.com/kb/guide/rag-chatbot-production-architecture-on-vercel) — Architect a production RAG chatbot on Vercel Functions with Fluid compute, AI Gateway, and a region-pinned vector store.
- [Expanding the experimentation ecosystem with Edge Config and LaunchDarkly](https://vercel.com/blog/edge-config-and-launch-darkly)
- [Framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure)
- [Protecting your app (and wallet) against malicious traffic](https://vercel.com/blog/protecting-your-app-and-wallet-against-malicious-traffic)
- [The developer experience of the Frontend Cloud](https://vercel.com/blog/the-developer-experience-of-the-frontend-cloud)

Full cross-link map for this page: [/docs/frameworks.graph.md](/docs/frameworks.graph.md)
<!-- /docsgraph:related -->

#### Next.js

```typescript filename="app/api/hello/route.ts"
import { NextResponse } from 'next/server';

// Next.js serves this file at /api/hello.
export async function GET() {
  const message = 'Hello from Next.js!';
  return NextResponse.json({ message });
}
```

#### SvelteKit

```typescript filename="src/routes/api/hello/+server.ts"
import { json } from '@sveltejs/kit';

// SvelteKit serves this file at /api/hello.
export function GET() {
  const message = 'Hello from SvelteKit!';
  return json({ message });
}
```

#### Nuxt

```typescript filename="server/api/hello.ts"
// Nuxt auto-imports defineEventHandler.

// Nuxt serves this file at /api/hello.
export default defineEventHandler(() => {
  const message = 'Hello from Nuxt!';
  return { message };
});
```

#### Hono

```typescript filename="src/index.ts"
import { Hono } from 'hono';

const app = new Hono();
const message = 'Hello from Hono!';
app.get('/api/hello', (c) => c.json({ message }));

export default app;
```

#### FastAPI

```py filename="main.py"
from fastapi import FastAPI

app = FastAPI()

@app.get("/api/hello")
def hello():
    return {"message": "Hello from FastAPI!"}
```

Each example serves the same `/api/hello` endpoint using the framework's own conventions. The files contain no Vercel-specific code. Vercel detects the framework when you deploy and configures the build for it.

Vercel has first-class support for [a wide range of the most popular frameworks](/docs/frameworks/more-frameworks). You can build and deploy using frontend, backend, and full-stack frameworks ranging from SvelteKit to Nitro, often without any upfront configuration.

For AI applications, explore [agent frameworks](/docs/frameworks/agents) to build agents with eve, Mastra, Flue, and Vercel. Each guide covers the framework’s setup, hosting requirements, and Vercel integrations.

Use the [web applications reference architecture](/kb/architecture/web) to choose a framework and rendering approach, then plan data access, authentication, and caching.

Learn how to [get started with Vercel](/docs/getting-started-with-vercel) or clone one of our example repos to your favorite git provider and deploy it on Vercel using one of the templates below:

Vercel deployments can [integrate with your git provider](/docs/git) to [generate preview URLs](/docs/deployments/environments#preview-environment-pre-production) for each pull request you make to your project.

Deploying on Vercel with one of our [supported frameworks](/docs/frameworks/more-frameworks) gives you access to many features, such as:

- [Vercel Functions](/docs/functions) enable developers to write functions that scale based on traffic demands, preventing failures during peak hours and reducing costs during low activity.
- [Middleware](/docs/routing-middleware) is code that executes before a request is processed on a site, enabling you to modify the response. Because it runs before the cache, Middleware is an effective way to personalize statically generated content.
- [Multi-runtime Support](/docs/functions/runtimes) allows the use of various runtimes for your functions, each with unique libraries, APIs, and features tailored to different technical requirements.
- [Incremental Static Regeneration](/docs/incremental-static-regeneration) enables content updates without redeployment. Vercel caches the page to serve it statically and rebuilds it on a specified interval.
- [Speed Insights](/docs/speed-insights) provide data on your project's Core Web Vitals performance in the Vercel dashboard, helping you improve loading speed, responsiveness, and visual stability.
- [Analytics](/docs/analytics) offer detailed insights into your website's performance over time, including metrics like top pages, top referrers, and user demographics.
- [Skew Protection](/docs/skew-protection) uses version locking to ensure that the client and server use the same version of your application, preventing version skew and related errors.

## Frameworks infrastructure support matrix

The following table shows which features are supported by each framework on Vercel. The framework list represents the most popular frameworks deployed on Vercel.

**Legend:** ✓ Supported | ✗ Not Supported | N/A Not Applicable

| Feature | Next.js | SvelteKit | Nuxt | TanStack | Astro | Remix | Vite | CRA |
|---------|---|---|---|---|---|---|---|---|
| [Static Assets](/docs/cdn) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| [Edge Routing Rules](/docs/cdn#features) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| [Routing Middleware](/docs/routing-middleware) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| [Server-Side Rendering](/docs/functions) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | N/A | N/A |
| [Streaming SSR](/docs/functions/streaming-functions) | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | N/A | N/A |
| [Incremental Static Regeneration](/docs/incremental-static-regeneration) | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ | N/A | N/A |
| [Image Optimization](/docs/image-optimization) | ✓ | ✓ | ✓ | N/A | ✓ | ✗ | N/A | N/A |
| [Runtime Cache](/docs/runtime-cache) | ✓ | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| [Native OG Image Generation](/docs/og-image-generation) | ✓ | N/A | ✓ | N/A | N/A | N/A | N/A | N/A |
| [Multi-runtime support (different routes)](/docs/functions/runtimes) | ✓ | ✓ | ✓ | N/A | ✗ | ✓ | N/A | N/A |
| [Multi-runtime support (entire app)](/docs/functions/runtimes) | ✓ | ✓ | ✓ | N/A | ✓ | ✓ | N/A | N/A |
| [Output File Tracing](/kb/guide/how-can-i-use-files-in-serverless-functions) | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | N/A | N/A |
| [Skew Protection](/docs/skew-protection) | ✓ | ✓ | ✓ | N/A | ✓ | ✗ | N/A | N/A |
| [Framework Routing Middleware](/docs/routing-middleware) | ✓ | N/A | ✗ | ✓ | ✓ | ✗ | N/A | N/A |


## Build Output API

The [Build Output API](/docs/build-output-api) is a file-system-based specification for a directory structure that produces a Vercel deployment. It is primarily targeted at framework authors who want to integrate their frameworks with Vercel's platform features. By implementing this directory structure as the output of their build command, framework authors can utilize all Vercel platform features, such as Vercel Functions, Routing, and Caching.

If you are not using a framework, you can still use these features by manually creating and populating the `.vercel/output` directory according to this specification. Complete examples of Build Output API directories can be found in [vercel/examples](https://github.com/vercel/examples/tree/main/build-output-api), and you can read our [blog post](/blog/build-your-own-web-framework) on using the Build Output API to build your own framework with Vercel.

## More resources

Learn more about deploying your preferred framework on Vercel with the following resources:

- [See a full list of supported frameworks](/docs/frameworks/more-frameworks)
- [Explore our template marketplace](/templates)
- [Learn about our deployment features](/docs/deployments)

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
