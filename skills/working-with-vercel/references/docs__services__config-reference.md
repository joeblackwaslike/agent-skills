---
title: Service configuration reference
product: vercel
url: /docs/services/config-reference
canonical_url: "https://vercel.com/docs/services/config-reference"
last_updated: 2026-06-30
type: reference
prerequisites:
  - /docs/services
related:
  - /docs/project-configuration/vercel-json
  - /docs/functions/runtimes
  - /docs/services/bindings
  - /docs/services/routing
summary: Options available for service configuration.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/services/config-reference.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "380a5a32d23b7c213849e73a4d31e52ea225f6166eaafc3f488e133226254bff"
---

# Service configuration reference

A service is configured like any standalone Vercel project, using the same build and runtime settings.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Migrate self-hosted Next.js and containers from AWS to Vercel](https://vercel.com/kb/guide/migrate-containers-from-aws-to-vercel?from=related) — Migrate containers from AWS to Vercel: deploy with Dockerfile.vercel, keep RDS, S3, and SQS in AWS over OIDC, and cut ov
- [The Complete Guide to Vercel Services](https://vercel.com/kb/guide/vercel-services?from=related) — Vercel Services let you deploy multiple frontends and backends in one project on a shared domain. Learn how to define se
- [How Vercel Services run on Fluid compute](https://vercel.com/kb/guide/vercel-services-fluid-compute?from=related) — The backends in a Vercel Services project run as Vercel Functions on Fluid compute by default. Learn how optimized concu
- [Services](https://vercel.com/docs/build-output-api/services?from=related) — Learn how a deployment with multiple services is structured in the Build Output API.
- [Project Configuration](https://vercel.com/docs/project-configuration?from=related) — Learn how to configure your Vercel projects using vercel.json, vercel.ts, or the dashboard to control builds, routing, f
- [Experimental Services](https://vercel.com/docs/services/experimental?from=related) — The experimentalServices configuration model for deploying multiple backends and frontends in a single Vercel project.
- [Routing](https://vercel.com/docs/routing?from=related) — Learn how Vercel's CDN routes requests through firewall, project routes, and deployment routes before reaching your appl
- [Features](https://vercel.com/docs/build-output-api/features?from=related) — Learn how to implement common Vercel platform features through the Build Output API.

Full cross-link map for this page: [/docs/services/config-reference.graph.md](/docs/services/config-reference.graph.md)
<!-- /docsgraph:related -->

The service configuration object supports the following properties. Settings are optional unless indicated otherwise.

- [root](#root)
- [framework](#framework)
- [runtime](#runtime)
- [entrypoint](#entrypoint)
- [installCommand](#installcommand)
- [buildCommand](#buildcommand)
- [devCommand](#devcommand)
- [ignoreCommand](#ignorecommand)
- [outputDirectory](#outputdirectory)
- [bindings](#bindings)
- [functions](#functions)
- [headers](#headers)
- [redirects](#redirects)
- [rewrites](#rewrites)
- [routes](#routes)
- [cleanUrls](#cleanurls)
- [trailingSlash](#trailingslash)

## root

**Type:** `string`

Required. The path to the service root, relative to `vercel.json`.

## framework

**Type:** `string`

The [Framework](/docs/project-configuration/vercel-json#framework) slug for the service, for example, `"nextjs"`, `"fastapi"`, or `"express"`. Vercel detects the framework automatically when `framework` is not set.

## runtime

**Type:** `string`

The [Runtime](/docs/functions/runtimes) for the service. Vercel detects the runtime automatically when `runtime` is not set.

## entrypoint

**Type:** `string`

The framework or runtime entrypoint, such as `main:app` for a Python ASGI app or a file path for Node.js.

## installCommand

**Type:** `string`

The [install command](/docs/project-configuration/vercel-json#installcommand) override for the service.

## buildCommand

**Type:** `string`

The [build command](/docs/project-configuration/vercel-json#buildcommand) override for the service.

## devCommand

**Type:** `string`

The [development command](/docs/project-configuration/vercel-json#devcommand) override for the service.

## ignoreCommand

**Type:** `string`

The [build-skip command](/docs/project-configuration/vercel-json#ignorecommand) for the service.

## outputDirectory

**Type:** `string`

The [output directory](/docs/project-configuration/vercel-json#outputdirectory) for the service.

## bindings

**Type:** `array`

Caller-side bindings to other services. See [Service bindings](/docs/services/bindings).

## functions

**Type:** `object`

[Function configuration](/docs/project-configuration/vercel-json#functions) scoped to the service.

## headers

**Type:** `array`

[Header rules](/docs/project-configuration/vercel-json#headers) scoped to the service.

## redirects

**Type:** `array`

[Redirect rules](/docs/project-configuration/vercel-json#redirects) scoped to the service.

## rewrites

**Type:** `array`

[Rewrite rules](/docs/project-configuration/vercel-json#rewrites) scoped to the service.

## routes

**Type:** `array`

[Low-level route rules](/docs/project-configuration/vercel-json#routes) scoped to the service.

## cleanUrls

**Type:** `boolean`

[`cleanUrls`](/docs/project-configuration/vercel-json#cleanurls) behavior scoped to the service.

## trailingSlash

**Type:** `boolean`

[`trailingSlash`](/docs/project-configuration/vercel-json#trailingslash) behavior scoped to the service.

The routing and URL keys run only after a request enters the service. See [Routing](/docs/services/routing).


---

[View full sitemap](/docs/sitemap)
