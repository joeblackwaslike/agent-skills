---
title: Full-stack frameworks on Vercel
product: vercel
url: /docs/frameworks/full-stack
canonical_url: "https://vercel.com/docs/frameworks/full-stack"
last_updated: 2026-08-11
type: conceptual
prerequisites:
  - /docs/frameworks
related:
  - /docs/frameworks/full-stack/sveltekit
  - /docs/frameworks/full-stack/remix
  - /docs/cdn
  - /docs/routing-middleware
  - /docs/functions
summary: Vercel supports a wide range of the most popular backend frameworks, optimizing how your application builds and runs no matter what tooling you use.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/full-stack.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "01d49aafa376fe1dd2df2683d255d14c971a83de236646ddccf015d1b241dc0d"
---

# Full-stack frameworks on Vercel

The following full-stack frameworks are supported with zero-configuration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a honeypot with Vercel Web Application Firewall](https://vercel.com/kb/guide/how-to-build-a-honeypot-with-vercel-web-application-firewall) — Learn how to build a honeypot with Vercel Web Application Firewall \\(WAF\\) that catches bots ignoring your robots.txt. C
- [Frontends on Vercel](https://vercel.com/docs/frameworks/frontend) — Vercel supports a wide range of the most popular frontend frameworks, optimizing how your application builds and runs no
- [Announcing the Build Output API](https://vercel.com/blog/build-output-api)
- [Run multiple frameworks in one project with Vercel Services](https://vercel.com/changelog/run-multiple-frameworks-in-one-project-with-vercel-services)
- [Supported Frameworks on Vercel](https://vercel.com/docs/frameworks/more-frameworks) — Learn about the frameworks that can be deployed to Vercel.
- [New features for SvelteKit: Optimize your application with ease](https://vercel.com/blog/feature-complete-sveltekit)
- [Does Vercel support Ruby on Rails applications?](https://vercel.com/kb/guide/does-vercel-support-ruby-on-rails-applications) — Learn how to deploy a Ruby on Rails application on Vercel — either as a container image on Vercel Functions or as a head
- [React Router on Vercel](https://vercel.com/docs/frameworks/frontend/react-router) — Deploy React Router applications with SSR or SPA mode, then configure the Vercel preset, streaming, caching, and analyti
- [Backends on Vercel](https://vercel.com/docs/frameworks/backend) — Vercel supports a wide range of the most popular backend frameworks, optimizing how your application builds and runs no
- [Create React App on Vercel](https://vercel.com/docs/frameworks/frontend/create-react-app) — Deploy Create React App projects to Vercel and add Preview Deployments, Web Analytics, Speed Insights, and Observability

Full cross-link map for this page: [/docs/frameworks/full-stack.graph.md](/docs/frameworks/full-stack.graph.md)
<!-- /docsgraph:related -->

- **Django**: Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. 
  - [Deploy](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/django)
- **Next.js**: Next.js makes you productive with React instantly — whether you want to build static or dynamic sites.
  - [Deploy](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/nextjs) | [View Demo](https://nextjs-template.vercel.app)
- **Nuxt**: Nuxt is the open source framework that makes full-stack development with Vue.js intuitive.
  - [Deploy](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/nuxtjs) | [View Demo](https://nuxtjs-template.vercel.app)
- **RedwoodJS**: RedwoodJS is a full-stack framework for the Jamstack.
  - [Deploy](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/redwoodjs) | [View Demo](https://redwood-template.vercel.app)
- **Remix**: Build Better Websites
  - [Deploy](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/remix) | [View Demo](https://remix-run-template.vercel.app)
- **SvelteKit**: SvelteKit is a framework for building web applications of all sizes.
  - [Deploy](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/sveltekit-1) | [View Demo](https://sveltekit-1-template.vercel.app)
- **TanStack Start**: Full-stack Framework powered by TanStack Router for React and Solid.
  - [Deploy](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/tanstack-start)
- **TanStack Start**: Full-stack Framework powered by TanStack Router imported from Lovable
  - [Deploy](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/tanstack-start-lovable)


Framework guides such as [SvelteKit](/docs/frameworks/full-stack/sveltekit) and [Remix](/docs/frameworks/full-stack/remix) show you how to use Vercel features with each framework.

## Frameworks infrastructure support matrix

The following table shows which features are supported by each framework on Vercel. The framework list is not exhaustive, but a representation of the most popular frameworks deployed on Vercel.

We're committed to having support for all Vercel features across frameworks, and continue to work with framework authors on adding support. *This table is continually updated over time*.

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


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
