---
title: Services
product: vercel
url: /docs/services
canonical_url: "https://vercel.com/docs/services"
last_updated: 2026-06-30
type: conceptual
prerequisites:
  []
related:
  - /docs/services/experimental
  - /docs/services/routing
  - /docs/services/bindings
  - /docs/functions/container-images
  - /docs/services/config-reference
summary: Deploy multiple backends and frontends within a single Vercel project using services.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/services.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "4b214db9fb647169aa9cd1c04d7dd64b4989cb2aebc963e7c02c6081c2f72bb5"
---

# Services

> **🔒 Permissions Required**: Services


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Services](https://vercel.com/kb/guide/vercel-services?from=related) — Vercel Services let you deploy multiple frontends and backends in one project on a shared domain. Learn how to define se
- [Nuxt](https://eve.dev/docs/guides/frontend/nuxt?from=related) — Run an eve agent and a Nuxt app as one project with the eve/nuxt module.
- [SvelteKit](https://eve.dev/docs/guides/frontend/sveltekit?from=related) — Run an eve agent and a SvelteKit app as one project with the eveSvelteKit Vite plugin.
- [Deploy Go apps on Vercel using Docker](https://vercel.com/kb/guide/deploy-go-using-docker-vercel?from=related) — Deploy an existing Dockerized Go app to Vercel using Memos as a real-world example, with Neon Postgres for durable data.
- [Deploy a Node.js Fastify app on Vercel with Docker](https://vercel.com/kb/guide/deploy-nodejs-on-vercel-with-docker?from=related) — Build a Node.js application with Fastify and Docker, then deploy it to Vercel Functions. Learn how to configure environm
- [Deploy PHP on Vercel with Docker](https://vercel.com/kb/guide/deploy-php-on-vercel-with-docker?from=related) — Build a PHP application with FrankenPHP and Docker, then deploy it to Vercel Functions with managed configuration, stora
- [Running Docker on Vercel vs Render](https://vercel.com/kb/guide/docker-on-vercel-vs-render?from=related) — Compare how Vercel and Render run Docker workloads, including deployment model, scaling, image sources, state, and netwo
- [Features](https://vercel.com/docs/build-output-api/features?from=related) — Learn how to implement common Vercel platform features through the Build Output API.
- [Project Settings](https://vercel.com/docs/project-configuration/project-settings?from=related) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,
- [Express](https://vercel.com/docs/frameworks/backend/express?from=related) — Deploy Express applications to Vercel with zero configuration. Learn about middleware and Vercel Functions.
- [Glossary](https://vercel.com/docs/glossary?from=related) — Learn about the terms and concepts used in Vercel's products and documentation.
- [vercel.json](https://vercel.com/docs/project-configuration/vercel-json?from=related) — Learn how to use vercel.json to configure and override the default behavior of Vercel from within your project.

Full cross-link map for this page: [/docs/services.graph.md](/docs/services.graph.md)
<!-- /docsgraph:related -->

Services let you deploy multiple backends and frontends within a single Vercel project. For example, a Next.js frontend and a FastAPI backend in the same repository deploy together with shared routing, environment variables, and a unique domain,
replacing the need to split monorepos into separate Vercel projects.

> **💡 Note:** Looking for the earlier `experimentalServices` configuration? See
> [Experimental Services](/docs/services/experimental). The `services` model
> described here replaces it for new projects.

## How services work

A service is an independently built unit within your project.
At build time, Vercel builds each service separately. At request time, Vercel routes incoming requests to the correct service based on the rewrite rules in your `vercel.json`.

A project can contain multiple services across different frameworks or runtimes, such as:

- A Next.js frontend at `/`
- A Python FastAPI backend, e.g. at `/backend`
- A Go server, e.g. at `/svc/go`

All services share the same deployment.

## When to use services

Services are valuable when you have:

- **A polyglot monorepo**: For example, a JavaScript frontend and a Python backend in the same repository that you want to deploy as one project.
- **Multiple backends**: Several API services, each with its own dependencies and build step.

## Quick start

Define services in `vercel.json` using the `services` key. A service is internal by default and will not be routable from the Internet unless you expose it.
To route a service publicly, include a top-level rewrite rule that targets the service as `destination`:

```json filename="vercel.json"
{
  "services": {
    "my_frontend": {
      "root": "frontend/"
    },
    "my_backend": {
      "root": "backend/",
      "entrypoint": "main:app"
    }
  },
  "rewrites": [
    { "source": "/api/(.*)", "destination": { "service": "my_backend" } },
    { "source": "/(.*)", "destination": { "service": "my_frontend" } }
  ]
}
```

The two top-level rewrites are what expose these services. Without them, neither `my_frontend` nor `my_backend` would receive any public traffic. With the rewrites in place:

- Any request under `/api/`, such as `/api/users`, routes to `my_backend`.
- Every other path routes to `my_frontend`.

For the smallest possible setup, a single service with a catch-all rewrite:

```json filename="vercel.json"
{
  "services": { "api": { "root": "api/" } },
  "rewrites": [ { "source": "/(.*)", "destination": { "service": "api" } } ]
}
```

Because every public request enters through the top-level route table, your
deployment has one public surface. Firewall, Deployment Protection, redirects
are configured once at the top level and apply across all services, instead of
being redefined per service.

Read [Service Routing](/docs/services/routing) to learn more about service
public routing configuration.

## Calling another service

A service can call another service directly over an internal [binding](/docs/services/bindings), without going through the public internet. The calling service declares the binding, and Vercel injects the target service's URL as an environment variable for your server-side code to use.

Bindings are how services communicate privately. The target stays unreachable from the internet unless a separate top-level rewrite exposes it, so a binding grants internal access without creating a public route. See [Service bindings](/docs/services/bindings) to declare and use them.

## Using custom container images with services

Vercel builds each service according to the specified (or
auto-detected) `runtime` and `framework` settings. If you prefer or require
the service package to be built as a container (Docker) image instead, set
the `runtime` setting for the service to `container`.

```json {4,8} filename="vercel.json"
{
  "services": {
    "frontend": {
      "runtime": "container",
      "root": "frontend/"
    },
    "backend": {
      "runtime": "container",
      "root": "backend/"
    }
  }
}
```

See [Container Images](/docs/functions/container-images) for more information
about using container images with Vercel.

## Top-level configuration in services mode

When a project does not define `services`, Vercel evaluates `vercel.json` normally. When `services` is present, the top-level keys split into two groups:

- **Public routing and URL behavior** stay at the top level, where they own public traffic for the whole deployment. See [Routing](/docs/services/routing).
- **Build and runtime fields** are not valid at the top level, because their owner would be ambiguous across services. `functions`, `installCommand`, `buildCommand`, `devCommand`, `ignoreCommand`, `outputDirectory` and `framework` keys should be moved into the relevant service.

See [Service configuration reference](/docs/services/config-reference) for all configuration options that can be set in a service configuration object.

## Local development

Run all your services together locally with `vercel dev`:

```bash filename="Terminal"
vercel dev
```

To run everything locally without authenticating with the Vercel Cloud, add the `-L` flag (short for `--local`):

```bash filename="Terminal"
vercel dev -L
```

In both cases, generated binding environment variables are injected automatically, so calls between services work the same locally as in production.

## Learn more

- [Routing](/docs/services/routing): How public requests reach services and how to control the path your code sees.
- [Service bindings](/docs/services/bindings): How one service calls another.
- [Pricing and Limits](/docs/services/pricing): How billing works for services and which limits apply.
- [Queues with services](/docs/queues/concepts#queues-with-services): How a service consumes queue messages.
- [Experimental Services](/docs/services/experimental): The earlier `experimentalServices` configuration model.
- [Services guides](/kb/vercel-services): Guides and examples for deploying with Vercel Services.


---

[View full sitemap](/docs/sitemap)
