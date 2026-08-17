---
title: Container Images
product: vercel
url: /docs/functions/container-images
canonical_url: "https://vercel.com/docs/functions/container-images"
last_updated: 2026-07-07
type: how-to
prerequisites:
  - /docs/functions
related:
  - /docs/container-registry
  - /docs/functions/usage-and-pricing
  - /docs/cli/deploy
  - /docs/git
  - /docs/services
summary: Deploy OCI container images with a Dockerfile or Containerfile on Vercel Functions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/container-images.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "a766f7ff933bc700535875ef1a925daf868c6185ba16797d067756012b521cc3"
---

# Container Images

> **🔒 Permissions Required**: Container Images


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Does Vercel support Docker deployments?](https://vercel.com/kb/guide/does-vercel-support-docker-deployments?from=related) — Vercel supports deploying OCI-compatible container images through Vercel Functions and Vercel Container Registry, with A
- [Deploy Go apps on Vercel using Docker](https://vercel.com/kb/guide/deploy-go-using-docker-vercel?from=related) — Deploy an existing Dockerized Go app to Vercel using Memos as a real-world example, with Neon Postgres for durable data.
- [Deploy a Node.js Fastify app on Vercel with Docker](https://vercel.com/kb/guide/deploy-nodejs-on-vercel-with-docker?from=related) — Build a Node.js application with Fastify and Docker, then deploy it to Vercel Functions. Learn how to configure environm
- [Deploy PHP on Vercel with Docker](https://vercel.com/kb/guide/deploy-php-on-vercel-with-docker?from=related) — Build a PHP application with FrankenPHP and Docker, then deploy it to Vercel Functions with managed configuration, stora
- [Deploy Rust on Vercel with Docker](https://vercel.com/kb/guide/deploy-rust-on-vercel-with-docker?from=related) — Build a Rust application with Axum and Docker, then deploy it to Vercel Functions. Learn how to configure environment va
- [Limits & Pricing](https://vercel.com/docs/container-registry/limits-and-pricing?from=related) — Storage pricing, size limits, plan limits, and compatibility limits for Vercel Container Registry.
- [Getting Started](https://vercel.com/docs/container-registry/getting-started?from=related) — Learn about getting started on Vercel.
- [vercel vcr](https://vercel.com/docs/cli/vcr?from=related) — Manage Vercel Container Registry from the Vercel CLI: list, inspect, create, and delete repositories, browse tags, and m

Full cross-link map for this page: [/docs/functions/container-images.graph.md](/docs/functions/container-images.graph.md)
<!-- /docsgraph:related -->

Vercel Functions can run Open Container Initiative (OCI) compatible container images stored in [Vercel Container Registry (VCR)](/docs/container-registry). Functions scale up and down automatically based on demand, and use [Active CPU](/docs/functions/usage-and-pricing) pricing. You are only billed for CPU when your code is actively running, not while waiting for I/O or sleeping.

## Usage

### Dockerfile

Get started by creating a `Dockerfile.vercel` (or `Containerfile.vercel`) file placed at the root of your project. Vercel automatically detects these files and adds a rewrite rule to route all traffic to the container image:

#### \['Node.js and srvx dynamic server'

```docker filename="Dockerfile.vercel"
FROM node:26-alpine

RUN npm i -g srvx
WORKDIR /app
COPY server.ts .

# srvx listens on $PORT by default
CMD ["srvx", "--prod"]
```

```ts filename="server.ts"
export default {
  fetch(req: Request) {
    return Response.json({ ip: req.headers.get("x-forwarded-for") })
  }
}
```

#### 'Nginx static server']

```docker filename="Dockerfile.vercel"
FROM nginx:alpine

COPY . /usr/share/nginx/html
```

```html filename="index.html"
<h1>Hello from Vercel Functions running a custom OCI image!</h1>
```

Deploy your application using the [Vercel CLI](/docs/cli/deploy) or by pushing to a [Git repository](/docs/git). During the build step, the image will be built and pushed to [VCR](/docs/container-registry).

You can also develop and test locally using `vercel dev`. This requires the `docker` CLI and Docker daemon to be available on your machine.

### Services

You can use [services](/docs/services) to deploy multiple applications, backends or frontends, within the same Vercel project. Traffic is routed to the correct service with the `rewrites` configuration:

```json {5,9} filename="vercel.json"
{
  "services": {
    "frontend": {
      "root": "frontend/",
      "entrypoint": "Dockerfile.vercel"
    },
    "backend": {
      "root": "backend/",
      "entrypoint": "Dockerfile.vercel"
    }
  },
  "rewrites": [
    { "source": "/api/(.*)", "destination": { "service": "backend" } },
    { "source": "/(.*)", "destination": { "service": "frontend" } }
  ]
}
```

```docker filename="frontend/Dockerfile.vercel"
FROM nginx:alpine
...
```

```docker filename="backend/Dockerfile.vercel"
FROM node:26-alpine
...
```

Set the `entrypoint` key to the path of your dockerfile, relative to the service's `root`, for each service that uses a custom container image. See [services](/docs/services) for more information on configuring services.

## Observability

You can view [runtime logs](/docs/functions/logs) from the container's `stdout` and `stderr` streams. Because these logs are not tied to a specific request, they are broadcast to all inflight requests of the instance. [Vercel Observability](/docs/observability) metrics are available like any regular Vercel Function.

## Port resolution

Vercel Functions running container images are expected to open an HTTP server to receive traffic on. The default port is `80`, and it can be overridden by setting the `PORT` [environment variable](/docs/environment-variables) in the project settings.

## Scale in behavior

Functions not receiving any traffic for 5 minutes in production environments, and 30 seconds in preview environments, will automatically scale down.

When a function instance is scaled down, the container receives a `SIGTERM` signal with a 30 seconds grace period to clean up before being forcefully terminated. Learn more about the [`SIGTERM` signal](/docs/functions/functions-api-reference#sigterm-signal).

## Limits and pricing

The same [limits](/docs/functions/limitations) and [Active CPU pricing model](/docs/functions/usage-and-pricing) of Vercel Functions apply to custom container images.

[Secure Compute](/docs/networking/secure-compute) and [Static IPs](/docs/networking/static-ips) are not yet supported with custom container images.

## Related

- [Vercel Functions](/docs/functions)
- [Vercel Container Registry](/docs/container-registry)
- [Container Images Demo template](https://vercel.com/templates/container-images/container-images-demo)


---

[View full sitemap](/docs/sitemap)
