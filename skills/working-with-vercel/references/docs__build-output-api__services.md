---
title: Services
product: vercel
url: /docs/build-output-api/services
canonical_url: "https://vercel.com/docs/build-output-api/services"
last_updated: 2026-07-27
type: reference
prerequisites:
  - /docs/build-output-api
related:
  - /docs/services
  - /docs/build-output-api/configuration
  - /docs/services/routing
  - /docs/services/bindings
summary: Learn how a deployment with multiple services is structured in the Build Output API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/build-output-api/services.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "cb01197e67b2f0dc6d193a4625eb4c058c36a7f3cbae24e5ce66d958ac0c67b2"
---

# Services

A deployment can contain multiple services. In the Build Output API, each service is emitted as its own sub-tree under `.vercel/output/services`, and the top-level `config.json` lists them. To configure services in your project, see [Services](/docs/services).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Services](https://vercel.com/kb/guide/vercel-services?from=related) — Vercel Services let you deploy multiple frontends and backends in one project on a shared domain. Learn how to define se
- [How Docker Compose concepts map to Vercel](https://vercel.com/kb/guide/docker-compose-concepts-on-vercel?from=related) — Translate your Docker Compose file to Vercel: Compose services become Vercel Services, networks become bindings, and vol
- [Full-stack previews on Vercel](https://vercel.com/kb/guide/full-stack-preview-deployments-on-vercel?from=related) — Learn how to use full-stack previews for your Vercel projects. Deploy Next.js, FastAPI, and a containerized Go service t
- [Choosing how to structure your application on Vercel](https://vercel.com/kb/guide/structure-your-application?from=related) — Compare three ways to structure an application on Vercel \(a single framework, one project with Services, or separate pr
- [Service configuration reference](https://vercel.com/docs/services/config-reference?from=related) — Options available for service configuration.
- [Experimental Services](https://vercel.com/docs/services/experimental?from=related) — The experimentalServices configuration model for deploying multiple backends and frontends in a single Vercel project.
- [Features](https://vercel.com/docs/build-output-api/features?from=related) — Learn how to implement common Vercel platform features through the Build Output API.
- [Products](https://vercel.com/docs/products?from=related) — Explore all Vercel products and capabilities.
- [Build System](https://vercel.com/docs/fundamentals/builds?from=related) — Learn how Vercel transforms your source code into optimized assets ready to serve globally.

Full cross-link map for this page: [/docs/build-output-api/services.graph.md](/docs/build-output-api/services.graph.md)
<!-- /docsgraph:related -->

## Declaring services

List the deployment's service build targets in the top-level `config.json` through a [`services`](/docs/build-output-api/configuration#services) array. Each entry names a service and its root:

```json
{
  "version": 3,
  "services": [
    { "name": "web", "root": "web/" },
    { "name": "api", "root": "api/", "entrypoint": "main:app" }
  ]
}
```

Vercel builds each service and emits its output under `.vercel/output/services/<name>`, rather than at the top level of `.vercel/output`.

## Directory structure

Each service is emitted at `.vercel/output/services/<name>`, where `<name>` is the service name. A service sub-tree is a complete, standard Build Output API tree with its own [`config.json`](/docs/build-output-api/configuration), `functions` directory, and static assets. The same primitives and configuration that apply to a single-tree deployment apply inside each service sub-tree.

The `web` and `api` services above produce the following output:

Services do not nest. A service's own `config.json` describes only that service and does not contain a `services` field.

## Reaching a service

A service is internal by default. Public traffic reaches it only when the top-level route table delegates to it, and one service reaches another through a binding declared in its [`services`](/docs/build-output-api/configuration#services) configuration. To understand how requests are routed into a service and how bindings work, see [Services routing](/docs/services/routing) and [Service bindings](/docs/services/bindings).

## Constraints

- Middleware is not supported inside a service.
- The Edge runtime is not supported inside a service. A service that emits an Edge Function output is rejected at deploy.
- A deployment can contain up to 100 services.
- Service names may contain only lowercase letters, hyphens, and underscores, must start and end with a letter, and are limited to 64 characters.


---

[View full sitemap](/docs/sitemap)
