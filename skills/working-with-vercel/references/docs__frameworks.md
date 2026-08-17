---
title: Frameworks on Vercel
product: vercel
url: /docs/frameworks
canonical_url: "https://vercel.com/docs/frameworks"
last_updated: 2026-06-16
type: conceptual
prerequisites:
  []
related:
  - /docs/frameworks/more-frameworks
  - /docs/getting-started-with-vercel
  - /docs/git
  - /docs/deployments/environments
  - /docs/functions
summary: Vercel supports a wide range of the most popular frameworks, optimizing how your application builds and runs no matter what tool you use.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "f1c61f892b6db0dcc3260f7fa4fa9a687f0de4bcc00777d23cebb23026798666"
---

# Frameworks on Vercel

Vercel has first-class support for [a wide range of the most popular frameworks](/docs/frameworks/more-frameworks). You can build and deploy using frontend, backend, and full-stack frameworks ranging from SvelteKit to Nitro, often without any upfront configuration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Building an AI chat app with RAG and source citations on Vercel](https://vercel.com/kb/guide/building-ai-chat-app-with-rag-and-citations-on-vercel?from=related) — A production stack for AI chat with retrieval, reranking, source citations, and background ingestion on Vercel using Nex
- [Deploy a Node.js Fastify app on Vercel with Docker](https://vercel.com/kb/guide/deploy-nodejs-on-vercel-with-docker?from=related) — Build a Node.js application with Fastify and Docker, then deploy it to Vercel Functions. Learn how to configure environm
- [Deploy PHP on Vercel with Docker](https://vercel.com/kb/guide/deploy-php-on-vercel-with-docker?from=related) — Build a PHP application with FrankenPHP and Docker, then deploy it to Vercel Functions with managed configuration, stora
- [Deploy Rust on Vercel with Docker](https://vercel.com/kb/guide/deploy-rust-on-vercel-with-docker?from=related) — Build a Rust application with Axum and Docker, then deploy it to Vercel Functions. Learn how to configure environment va
- [Deploy ASP.NET Core on Vercel with Docker](https://vercel.com/kb/guide/dot-net-asp-net-on-vercel-with-docker?from=related) — Build a .NET application with Docker and deploy it to Vercel Functions. Learn how to configure environment variables, in
- [Build System](https://vercel.com/docs/fundamentals/builds?from=related) — Learn how Vercel transforms your source code into optimized assets ready to serve globally.
- [Configuring a Build](https://vercel.com/docs/builds/configure-a-build?from=related) — Vercel automatically configures the build settings for many front-end frameworks, but you can also customize the build a
- [vercel init](https://vercel.com/docs/cli/init?from=related) — Learn how to initialize Vercel supported framework examples locally using the vercel init CLI command.
- [Fluid Compute](https://vercel.com/docs/fluid-compute?from=related) — Learn about fluid compute, an execution model for Vercel Functions that provides a more flexible and efficient way to ru
- [How Vercel CDN works](https://vercel.com/docs/how-vercel-cdn-works?from=related) — Learn how Vercel's CDN processes requests through routing, caching, and compute layers to deliver your content with low

Full cross-link map for this page: [/docs/frameworks.graph.md](/docs/frameworks.graph.md)
<!-- /docsgraph:related -->

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
| [Runtime Cache](/docs/caching/runtime-cache) | ✓ | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
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


---

[View full sitemap](/docs/sitemap)
