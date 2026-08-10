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
  - /docs/build-output-api/v3/configuration
  - /docs/services/routing
  - /docs/services/bindings
summary: Learn how a deployment with multiple services is structured in the Build Output API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/build-output-api/services.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "f8cdac418c80aa3ac87e16279137facc9b9c2878e611269c827e474fe51213ce"
---

# Services

A deployment can contain multiple services. In the Build Output API, each service is emitted as its own sub-tree under `.vercel/output/services`, and the top-level `config.json` lists them. To configure services in your project, see [Services](/docs/services).

## Declaring services

List the deployment's service build targets in the top-level `config.json` through a [`services`](/docs/build-output-api/v3/configuration#services) array. Each entry names a service and its root:

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

Each service is emitted at `.vercel/output/services/<name>`, where `<name>` is the service name. A service sub-tree is a complete, standard Build Output API tree with its own [`config.json`](/docs/build-output-api/v3/configuration), `functions` directory, and static assets. The same primitives and configuration that apply to a single-tree deployment apply inside each service sub-tree.

The `web` and `api` services above produce the following output:

Services do not nest. A service's own `config.json` describes only that service and does not contain a `services` field.

## Reaching a service

A service is internal by default. Public traffic reaches it only when the top-level route table delegates to it, and one service reaches another through a binding declared in its [`services`](/docs/build-output-api/v3/configuration#services) configuration. To understand how requests are routed into a service and how bindings work, see [Services routing](/docs/services/routing) and [Service bindings](/docs/services/bindings).

## Constraints

- Middleware is not supported inside a service.
- The Edge runtime is not supported inside a service. A service that emits an Edge Function output is rejected at deploy.
- A deployment can contain up to 100 services.
- Service names may contain only lowercase letters, hyphens, and underscores, must start and end with a letter, and are limited to 64 characters.


---

[View full sitemap](/docs/sitemap)
