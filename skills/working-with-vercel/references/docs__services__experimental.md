---
title: Experimental Services
product: vercel
url: /docs/services/experimental
canonical_url: "https://vercel.com/docs/services/experimental"
last_updated: 2026-07-15
type: conceptual
prerequisites:
  - /docs/services
related:
  - /docs/services
  - /docs/monorepos
summary: The experimentalServices configuration model for deploying multiple backends and frontends in a single Vercel project.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/services/experimental.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "a565cc0d39ef8f73f79128dae76c86c15c8117283a2f1cdc9077c0c86ed240c8"
---

# Experimental Services

> **🔒 Permissions Required**: Services

> **💡 Note:** This page documents the earlier `experimentalServices` configuration model. New
> projects should use the [`services`](/docs/services) model. The
> `experimentalServices` model remains available while you migrate.

Services let you deploy multiple backends and frontends within a single Vercel project. For example, a Next.js frontend and a FastAPI backend in the same repository deploy together with shared routing, environment variables, and a unique domain, replacing the need to split monorepos into separate Vercel projects.

## How experimental services work

A service is an independently built unit within your project that is deployed to the same domain under a unique subpath.
At build time, Vercel builds each service separately. At request time, Vercel routes incoming requests to the correct service based on the URL path prefix.

A project can contain multiple services across different frameworks or runtimes, such as:

- A Next.js frontend at `/`
- A Python FastAPI backend, for example at `/backend`
- A Go server, for example at `/svc/go`

All services share the same deployment URL.

## When to use experimental services

Services are valuable when you have:

- **A polyglot monorepo**: A JavaScript frontend and a Python backend in the same repository that you want to deploy as one project.
- **Multiple backends**: Several API services, each with its own dependencies and build step.

If your project uses a single framework (for example, a Next.js app with API routes), you don't need services. If your monorepo contains separate applications that you would prefer to mount under separate domains, consider deploying them as separate [projects in a monorepo](/docs/monorepos) instead.

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

## Routing and communication

When a project has multiple experimental services, Vercel merges their routes into a single routing table and distributes incoming requests based on each service's route prefix.

### How requests are routed

Each web service has a `routePrefix` that determines which requests it receives. Vercel evaluates prefixes from longest to shortest (most specific first), with the primary service (prefix `/`) as the catch-all.

For example, with a Next.js frontend at `/` and a FastAPI backend at `/svc/api`:

| Request               | Handled by         | Application receives |
| --------------------- | ------------------ | -------------------- |
| `GET /dashboard`      | Frontend (Next.js) | `/dashboard`         |
| `POST /svc/api/users` | Backend (FastAPI)  | `/svc/api/users`     |
| `GET /svc/api/docs`   | Backend (FastAPI)  | `/svc/api/docs`      |

When you configure `routePrefix`, Vercel automatically mounts backend services at that base path, so you do not need to configure a framework-specific root path for backends.

For frontend frameworks such as Next.js mounted on a subpath, you still need to configure the app's base path (for example, `basePath` in `next.config.js`) to match `routePrefix`.

### Environment variables

Vercel automatically generates environment variables so services can communicate with each other.

For each web service, Vercel injects:

| Variable                        | Example value                            | Availability            | Use case                               |
| ------------------------------- | ---------------------------------------- | ----------------------- | -------------------------------------- |
| `{SERVICENAME}_URL`             | `https://your-deploy.vercel.app/svc/api` | Server-side in services | Server-side requests between services  |
| `NEXT_PUBLIC_{SERVICENAME}_URL` | `/svc/api`                               | Client-side in Next.js  | Client-side requests from the frontend |

For example, for a project with two services, a Next.js "frontend" mounted at the root and a FastAPI "backend" mounted at "svc/api", Vercel would generate the following environment variables:

| Variable                   | Value                                    | Availability            | Use case                               |
| -------------------------- | ---------------------------------------- | ----------------------- | -------------------------------------- |
| `FRONTEND_URL`             | `https://your-deploy.vercel.app`         | Server-side in services | Server-side redirects to the frontend  |
| `BACKEND_URL`              | `https://your-deploy.vercel.app/svc/api` | Server-side in services | Server-side requests to the backend    |
| `NEXT_PUBLIC_FRONTEND_URL` | `/`                                      | Client-side in Next.js  | Client-side requests to the frontend   |
| `NEXT_PUBLIC_BACKEND_URL`  | `/svc/api`                               | Client-side in Next.js  | Client-side requests from the frontend |

Client-side variables use relative paths (the route prefix only) to avoid CORS issues. The browser resolves them against the current origin, so they work across preview deployments and custom domains.

If you define an environment variable with the same name in your project settings, your value takes precedence.

## Local development

Run all services together locally, without authenticating with the Vercel Cloud, by adding the `-L` flag (short for `--local`):

```bash filename="Terminal"
vercel dev -L
```


---

[View full sitemap](/docs/sitemap)
