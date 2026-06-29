---
title: Services
product: vercel
url: /docs/services
canonical_url: "https://vercel.com/docs/services"
last_updated: 2026-06-16
type: conceptual
prerequisites:
  []
related:
  - /docs/monorepos
  - /docs/services/routing
summary: Deploy multiple backends and frontends within a single Vercel project using services.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/services.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "46361069d834e65c4e3bd0f5118575188aed1a3d2d2adb4230a5e66831b5bc21"
---

# Services

> **🔒 Permissions Required**: Services

Services let you deploy multiple backends and frontends within a single Vercel project. For example, a Next.js frontend and a FastAPI backend in the same repository deploy together with shared routing, environment variables, and a unique domain,
replacing the need to split monorepos into separate Vercel projects.

## How services work

A service is an independently built unit within your project that is deployed to the same domain under a unique subpath.
At build time, Vercel builds each service separately. At request time, Vercel routes incoming requests to the correct service based on the URL path prefix.

A project can contain multiple services across different frameworks or runtimes, such as:

- A Next.js frontend at `/`
- A Python FastAPI backend, e.g. at `/backend`
- A Go server, e.g. at `/svc/go`

All services share the same deployment URL.

## When to use services

Services are valuable when you have:

- **A polyglot monorepo**: A JavaScript frontend and a Python backend in the same repository that you want to deploy as one project.
- **Multiple backends**: Several API services, each with its own dependencies and build step.

If your project uses a single framework (for example, a Next.js with API routes), you don't need services. If your monorepo contains separate applications that you would prefer to mount under separate domains, consider deploying them as separate [projects in a monorepo](/docs/monorepos) instead.

## Quick start

Define services in `vercel.json` using the `experimentalServices` key:

```json filename="vercel.json"
{
  "experimentalServices": {
    "web": {
      "entrypoint": "apps/web",
      "routePrefix": "/"
    },
    "api": {
      "entrypoint": "backend/main.py",
      "routePrefix": "/server"
    }
  }
}
```

To deploy a project that uses multiple services, your project framework setting must be set to Services and `experimentalServices` must be present in `vercel.json`.

## Configuration fields

| Field          | Type                   | Description                                                                                                                                                                     |
| -------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entrypoint`   | `string`               | Path to the service entrypoint file or directory.                                                                                                                               |
| `routePrefix`  | `string`               | URL path prefix for routing. Required for `web` services.                                                                                                                       |
| `framework`    | `string`               | Optional: framework slug (for example, `"nextjs"`, `"fastapi"`, `"express"`). Pins the framework configuration. If not set, framework is automatically detected on every build. |
| `memory`       | `integer`              | Optional: max available RAM in MB (128 to 10,240).                                                                                                                              |
| `maxDuration`  | `integer`              | Optional: execution timeout in seconds (1 to 900).                                                                                                                              |
| `includeFiles` | `string` | `string[]` | Optional: glob patterns for files to include in the deployment.                                                                                                                 |
| `excludeFiles` | `string` | `string[]` | Optional: glob patterns for files to exclude from the deployment.                                                                                                               |

## Local development

Run all services together locally, without authenticating with the Vercel Cloud, by adding the `-L` flag (short for `--local`):

```bash filename="Terminal"
vercel dev -L
```

## Learn more

- [Routing and communication](/docs/services/routing): How request routing, route prefixes, environment variables, and cross-service communication work.


---

[View full sitemap](/docs/sitemap)
