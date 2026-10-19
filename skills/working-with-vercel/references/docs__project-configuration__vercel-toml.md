---
title: Static Configuration with vercel.toml
product: vercel
url: /docs/project-configuration/vercel-toml
canonical_url: "https://vercel.com/docs/project-configuration/vercel-toml"
last_updated: 2026-08-25
type: reference
prerequisites:
  - /docs/project-configuration
related:
  - /docs/project-configuration/vercel-json
  - /docs/routing/rewrites
  - /docs/services
  - /docs/project-configuration/vercel-ts
summary: Configure your Vercel project with a TOML file using the same properties as vercel.json.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/project-configuration/vercel-toml.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "2df97e0aa76e52fbf0d9cb3600f02919e792cdfb86c0c0d17ba2e938b33cf814"
---

# Static Configuration with vercel.toml

The `vercel.toml` file lets you configure your Vercel project with [TOML](https://toml.io/). In addition to supporting the same configuration properties as [`vercel.json`](/docs/project-configuration/vercel-json), it supports comments and has a flatter structure.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing vercel.ts: Programmatic project configuration](https://vercel.com/changelog/vercel-ts)
- [Vercel](https://turborepo.dev/docs/guides/ci-vendors/vercel) — Deploy your Turborepo on Vercel with zero-config Remote Caching.
- [Advanced Configuration](https://vercel.com/docs/functions/configuring-functions/advanced-configuration) — Learn how to add utility files to the /api directory, and bundle Vercel Functions.
- [Service configuration reference](https://vercel.com/docs/services/config-reference) — Options available for service configuration.
- [Global Vercel CLI Configuration](https://vercel.com/docs/project-configuration/global-configuration) — Learn how to configure Vercel CLI under your system user.
- [General settings](https://vercel.com/docs/project-configuration/general-settings) — Configure basic settings for your Vercel project, including the project name, build and development settings, root direc
- [Serving Static Files](https://vercel.com/docs/platforms/multi-tenant-platforms/serving-static-files) — Serve tenant-specific static files like robots.txt, sitemap.xml, and llms.txt dynamically using route handlers.

Full cross-link map for this page: [/docs/project-configuration/vercel-toml.graph.md](/docs/project-configuration/vercel-toml.graph.md)
<!-- /docsgraph:related -->

You may wish to use TOML when you have a large or complex configuration, such as if you need to configure many [Rewrites](/docs/routing/rewrites) or are using [Services](/docs/services) to deploy multiple applications within one Vercel project.

Create `vercel.toml` in your project root and commit it with your code. Use only one project configuration file: `vercel.toml`, [`vercel.json`](/docs/project-configuration/vercel-json), or [`vercel.ts`](/docs/project-configuration/vercel-ts).

## Configure your project

Set top-level properties using TOML key-value pairs. This example configures the build command, output directory, and clean URLs:

#### vercel.toml

```toml filename="vercel.toml"
"$schema" = "https://openapi.vercel.sh/vercel.json"
buildCommand = "pnpm run build"
outputDirectory = "dist"
cleanUrls = true
```

#### vercel.json

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist",
  "cleanUrls": true
}
```

TOML is a good fit for configuring [Services](/docs/services), which let you deploy multiple applications within one Vercel project. This example deploys a frontend and backend service, routing `/api` requests to the backend and all other requests to the frontend:

#### vercel.toml

```toml filename="vercel.toml"
"$schema" = "https://openapi.vercel.sh/vercel.json"

# Next.js frontend
[services.frontend]
root = "frontend/"

# FastAPI backend
[services.backend]
root = "backend/"
entrypoint = "main:app"

[[rewrites]]
source = "/api/(.*)"
destination = { service = "backend" }

[[rewrites]]
source = "/(.*)"
destination = { service = "frontend" }
```

#### vercel.json

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "services": {
    "frontend": {
      "root": "frontend/"
    },
    "backend": {
      "root": "backend/",
      "entrypoint": "main:app"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": { "service": "backend" }
    },
    {
      "source": "/(.*)",
      "destination": { "service": "frontend" }
    }
  ]
}
```

## Configuration properties

`vercel.toml` supports all the same configuration fields as [`vercel.json`](/docs/project-configuration/vercel-json).


---

[View full sitemap](/docs/sitemap)
