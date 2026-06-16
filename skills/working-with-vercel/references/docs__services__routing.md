---
title: Services routing and communication
product: vercel
url: /docs/services/routing
canonical_url: "https://vercel.com/docs/services/routing"
last_updated: 2026-03-02
type: conceptual
prerequisites:
  - /docs/services
related:
  []
summary: Learn how Vercel routes requests between services and how services communicate with each other.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/services/routing.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "abcf1fae4dc5754685fe662c403c23628439eff400b50f6c61bcac53ed535de3"
---

# Services routing and communication

When a project has multiple services, Vercel merges their routes into a single routing table and distributes incoming requests based on each service's route prefix.

## How requests are routed

Each web service has a `routePrefix` that determines which requests it receives. Vercel evaluates prefixes from longest to shortest (most specific first), with the primary service (prefix `/`) as the catch-all.

For example, with a Next.js frontend at `/` and a FastAPI backend at `/svc/api`:

| Request               | Handled by         | Application receives |
| --------------------- | ------------------ | -------------------- |
| `GET /dashboard`      | Frontend (Next.js) | `/dashboard`         |
| `POST /svc/api/users` | Backend (FastAPI)  | `/svc/api/users`     |
| `GET /svc/api/docs`   | Backend (FastAPI)  | `/svc/api/docs`      |

When you configure `routePrefix`, Vercel automatically mounts backend services at that base path, so you do not need to configure a framework-specific root path for backends.

For frontend frameworks such as Next.js mounted on a subpath, you still need to configure the app's base path (for example, `basePath` in `next.config.js`) to match `routePrefix`.

## Environment variables

Vercel automatically generates environment variables so services can communicate with each other.

### Service URL variables

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


---

[View full sitemap](/docs/sitemap)
