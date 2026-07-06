---
title: Service configuration reference
product: vercel
url: /docs/services/config-reference
canonical_url: "https://vercel.com/docs/services/config-reference"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/services
related:
  - /docs/project-configuration/vercel-json
  - /docs/functions/runtimes
  - /docs/services/bindings
  - /docs/services/routing
summary: Learn about service configuration reference on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/services/config-reference.md"
fetched_at: "2026-07-06T05:40:24.878Z"
sha256: "e89ff4ac7f5e4587df9801d83044311c5c3d1c1f3f00cb7272920a2e84371436"
---

# Service configuration reference

A service is configured like any standalone Vercel project, using the same build and runtime settings.

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
