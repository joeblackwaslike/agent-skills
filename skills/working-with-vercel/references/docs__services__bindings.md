---
title: Service bindings
product: vercel
url: /docs/services/bindings
canonical_url: "https://vercel.com/docs/services/bindings"
last_updated: 2026-07-15
type: conceptual
prerequisites:
  - /docs/services
related:
  - /docs/services
  - /docs/services/pricing
  - /docs/routing-middleware
summary: Call one service from another using caller-declared service bindings.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/services/bindings.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "45945f390b91f67e968f312f7ed81d60be72c050b731f6a0008216b3c2143453"
---

# Service bindings

A service binding lets server-side code in one service call another service directly, without exposing the target service to public traffic.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Secure internal communication between services (beta)](https://vercel.com/changelog/secure-internal-communication-between-services)
- [How Docker Compose concepts map to Vercel](https://vercel.com/kb/guide/docker-compose-concepts-on-vercel) — Translate your Docker Compose file to Vercel: Compose services become Vercel Services, networks become bindings, and vol
- [Migrate from Google Cloud Run to Vercel](https://vercel.com/kb/guide/migrate-cloud-run-to-vercel) — Move a Cloud Run service or worker to Vercel. Compare runtimes, preserve Google Cloud access, and plan jobs, validation,
- [Migrate self-hosted Next.js and containers from AWS to Vercel](https://vercel.com/kb/guide/migrate-containers-from-aws-to-vercel) — Migrate Next.js apps and HTTP containers from AWS to Vercel. Configure AWS access, assess background workers, and plan t
- [Migrate from Fly.io to Vercel](https://vercel.com/kb/guide/migrate-fly-io-to-vercel) — Move an app from Fly.io to Vercel. Map configuration, choose Functions or Daemons, plan persistent storage, and verify t
- [Migrate from Railway to Vercel](https://vercel.com/kb/guide/migrate-railway-to-vercel) — Migrate an app from Railway to Vercel. Choose a deployment path, configure services, plan for stored data, and test befo
- [Run multiple frameworks in one project with Vercel Services](https://vercel.com/changelog/run-multiple-frameworks-in-one-project-with-vercel-services)
- [Service configuration reference](https://vercel.com/docs/services/config-reference) — Options available for service configuration.
- [Services](https://vercel.com/docs/build-output-api/services) — Learn how a deployment with multiple services is structured in the Build Output API.
- [Rewrites on Vercel](https://vercel.com/docs/routing/rewrites) — Learn how to use rewrites to send users to different URLs without modifying the visible URL.
- [Routing](https://vercel.com/docs/routing) — Learn how Vercel's CDN routes requests through firewall, project routes, and deployment routes before reaching your appl
- [Using the Go Runtime with Vercel Functions](https://vercel.com/docs/functions/runtimes/go) — Learn how to use the Go runtime to run Go APIs on Vercel.

Full cross-link map for this page: [/docs/services/bindings.graph.md](/docs/services/bindings.graph.md)
<!-- /docsgraph:related -->

Bindings are how services find each other internally. The binding simultaneously grants access to the caller and generates the URL the caller's code uses, so there is no public route or hardcoded hostname involved.

## Declare a binding

You declare a binding on the caller service. The caller names the target service and the environment variable that receives the generated URL.

```json filename="vercel.json"
{
  "services": {
    "orders": {
      "root": "services/orders/",
      "framework": "express",
      "bindings": [
        {
          "type": "service",
          "service": "inventory",
          "format": "url",
          "env": "INVENTORY_URL"
        }
      ]
    },
    "inventory": {
      "root": "services/inventory/",
      "framework": "fastapi",
      "entrypoint": "main:app"
    }
  },
  "rewrites": [{ "source": "/api/(.*)", "destination": { "service": "orders" } }]
}
```

The top-level rewrite is the only public entry point. A request from the public internet can reach `orders`, but Vercel never routes public traffic to `inventory`: it has no rewrite of its own, so it stays unreachable from the outside.

`orders` can still call `inventory` because it declares a binding to it. The binding grants that access and injects the target URL as `INVENTORY_URL`, which server-side code in `orders` reads to build request URLs:

```ts
await fetch(new URL('items/123', process.env.INVENTORY_URL));
```

> **💡 Note:** Service bindings aren't available yet for services that use the Go or Rust
> runtime. If your service uses one of these runtimes and declares bindings,
> build it as a [container image](/docs/services#using-custom-container-images-with-services)
> instead. A container image service can use bindings. Runtimes such as Node.js and Python
> are not affected.

## Binding fields

| Field     | Required | Description                                                                                                  |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `type`    | Yes      | Must be `"service"` for a service-to-service binding.                                                         |
| `service` | Yes      | Target service name from `services`.                                                           |
| `format`  | Yes      | Must be `"url"`. The generated value is an absolute URL base for the target service.                       |
| `env`     | Yes      | Environment variable name that receives the generated URL. Vercel generates this value and injects into a service, you do not set it.   |

## How bindings behave

The binding is the reachability grant. If `orders` declares a binding to `inventory`, it can call `inventory`. A service without a matching binding cannot derive the URL and fails to connect.
This grant is independent from public ingress. Adding a binding gives a service internal access to another service. It does not create a public route to the target, and a public rewrite to a service does not grant another service internal access to it.

Vercel injects the binding as a URL base, and the value is deployment-aware. This way, a preview deployment's `orders` service reaches that same preview deployment's `inventory` service, so you never reference a fixed hostname.

Internal calls also skip the public request pipeline. Firewall, Deployment Protection, the project's top-level middleware, and CDN request accounting do not apply to a service-to-service call.

A call over a binding is billed as a single service request, with no separate CDN Request or Fast Data Transfer charge. See [Pricing and Limits](/docs/services/pricing) for how billing works across services.

> **💡 Note:** A binding grants internal access only. It does not authenticate or authorize the
> call. If you need application-level authorization between services, handle it in
> your service code.

### Where bindings are available

Bindings are available to a service's functions at runtime only. They do not resolve during builds, and code running in [middleware](/docs/routing-middleware) cannot call another service over a binding. Make service-to-service calls from a function instead.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
