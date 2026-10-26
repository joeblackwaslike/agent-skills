---
title: Services
product: vercel
url: /docs/build-output-api/services
canonical_url: "https://vercel.com/docs/build-output-api/services"
last_updated: 2026-09-15
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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "d45a07ba7af2906af2c69ef38684eb8214fbf903ba0e2d86df88a39332b887ea"
---

# Services

A deployment can contain multiple services. In the Build Output API, each service is emitted as its own sub-tree under `.vercel/output/services`, and the top-level `config.json` lists them. To configure services in your project, see [Services](/docs/services).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Services](https://vercel.com/kb/guide/vercel-services) — Vercel Services let you deploy multiple frontends and backends in one project on a shared domain. Learn how to define se
- [Vercel Services: Run full stack on Vercel](https://vercel.com/blog/vercel-services-run-full-stack-on-vercel)
- [Run multiple frameworks in one project with Vercel Services](https://vercel.com/changelog/run-multiple-frameworks-in-one-project-with-vercel-services)
- [Full-stack previews on Vercel](https://vercel.com/kb/guide/full-stack-preview-deployments-on-vercel) — Learn how to use full-stack previews for your Vercel projects. Deploy Next.js, FastAPI, and a containerized Go service t
- [Choosing how to structure your application on Vercel](https://vercel.com/kb/guide/structure-your-application) — Compare three ways to structure an application on Vercel \\(a single framework, one project with Services, or separate pr
- [Service configuration reference](https://vercel.com/docs/services/config-reference) — Options available for service configuration.
- [Features](https://vercel.com/docs/build-output-api/features) — Learn how to implement common Vercel platform features through the Build Output API.
- [Products](https://vercel.com/docs/products) — Browse Vercel products for building, deploying, securing, observing, and scaling web applications.
- [How Vercel builds your application](https://vercel.com/docs/fundamentals/builds) — Learn how Vercel transforms your source code into optimized assets ready to serve globally.
- [Projects overview](https://vercel.com/docs/projects) — A project is where you deploy and operate frontend apps, APIs, backends, containers, and agent workloads on Vercel.

Full cross-link map for this page: [/docs/build-output-api/services.graph.md](/docs/build-output-api/services.graph.md)
<!-- /docsgraph:related -->

## Declaring services

**Build Output Configuration File**: `.vercel/output/config.json`

<br />

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

**Services Directory**: `.vercel/output/services`

<br />

Each service is emitted at `.vercel/output/services/<name>`, where `<name>` is the service name. A service sub-tree is a complete, standard Build Output API tree with its own [`config.json`](/docs/build-output-api/configuration), `functions` directory, and static assets. The same primitives and configuration that apply to a single-tree deployment apply inside each service sub-tree.

The `web` and `api` services above produce the following output:

- `.vercel/`
  - `output/`
    - `config.json`
    - `services/`
      - `web/`
        - `config.json`
        - `functions/`
          - `index.func/`
            - `.vc-config.json`
        - `static/`
          - `favicon.ico`
      - `api/`
        - `config.json`
        - `functions/`
          - `index.func/`
            - `.vc-config.json`

<br />

Services do not nest. A service's own `config.json` describes only that service and does not contain a `services` field.

## Reaching a service

A service is internal by default. Public traffic reaches it only when the top-level route table delegates to it, and one service reaches another through a binding declared in its [`services`](/docs/build-output-api/configuration#services) configuration. To understand how requests are routed into a service and how bindings work, see [Services routing](/docs/services/routing) and [Service bindings](/docs/services/bindings).

## Constraints

- Middleware is not supported inside a service.
- The Edge runtime is not supported inside a service. A service that emits a Function with Edge Runtime is rejected at deploy.
- A deployment can contain up to 100 services.
- Service names may contain only lowercase letters, hyphens, and underscores, must start and end with a letter, and are limited to 64 characters.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
