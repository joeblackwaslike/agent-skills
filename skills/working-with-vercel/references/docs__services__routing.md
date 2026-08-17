---
title: Services routing
product: vercel
url: /docs/services/routing
canonical_url: "https://vercel.com/docs/services/routing"
last_updated: 2026-06-30
type: conceptual
prerequisites:
  - /docs/services
related:
  - /docs/services
  - /docs/routing
  - /docs/project-configuration/vercel-json
  - /docs/services/bindings
summary: Learn how Vercel routes public requests to services and how each service handles its own routes.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/services/routing.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "cc80f36fd0e084b6698ece752581354c652d5fbabb7d2fc18e605dfdd1857642"
---

# Services routing

Your `vercel.json` controls all public routing for the deployment. A service
receives public traffic only when there is a top-level rewrite that routes
requests to it. Each service then handles its own routes, and the routes of one
service are never mixed with another, so every public routing rule has a single
owner. For how services are defined and built, see [Services](/docs/services).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Full-stack previews on Vercel](https://vercel.com/kb/guide/full-stack-preview-deployments-on-vercel?from=related) — Learn how to use full-stack previews for your Vercel projects. Deploy Next.js, FastAPI, and a containerized Go service t
- [Choosing how to structure your application on Vercel](https://vercel.com/kb/guide/structure-your-application?from=related) — Compare three ways to structure an application on Vercel \(a single framework, one project with Services, or separate pr
- [The Complete Guide to Vercel Services](https://vercel.com/kb/guide/vercel-services?from=related) — Vercel Services let you deploy multiple frontends and backends in one project on a shared domain. Learn how to define se
- [Can I use Vercel as a reverse proxy?](https://vercel.com/kb/guide/vercel-reverse-proxy-rewrites-external?from=related) — Learn how to use rewrites to proxy requests from Vercel to other deployments.
- [Debug routing on Vercel](https://vercel.com/kb/guide/debug-routing-on-vercel?from=related) — Learn how to debug how Vercel decides where to route your request
- [Services](https://vercel.com/docs/build-output-api/services?from=related) — Learn how a deployment with multiple services is structured in the Build Output API.
- [Service configuration reference](https://vercel.com/docs/services/config-reference?from=related) — Options available for service configuration.
- [Project Routing Rules](https://vercel.com/docs/routing/project-routing-rules?from=related) — Add redirects, rewrites, headers, and status codes to your project from the dashboard or API, without deploying new code
- [Rewrites](https://vercel.com/docs/routing/rewrites?from=related) — Learn how to use rewrites to send users to different URLs without modifying the visible URL.
- [Features](https://vercel.com/docs/build-output-api/features?from=related) — Learn how to implement common Vercel platform features through the Build Output API.

Full cross-link map for this page: [/docs/services/routing.graph.md](/docs/services/routing.graph.md)
<!-- /docsgraph:related -->

Where usual [rewrite rules](/docs/routing) target URLs, service rewrites target
services instead. Set the `destination` value in a rewrite rule to an object
like `{ "service": "my_backend" }`. For example:

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
    {
      "source": "/api/(.*)",
      "destination": { "service": "my_backend" }
    },
    {
      "source": "/(.*)",
      "destination": { "service": "my_frontend" }
    }
  ]
}
```

The destination object accepts the following fields:

| Field     | Required | Description                                                                                                           |
| --------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `service` | Yes      | Name of a service in the same deployment, from your `services` configuration.                                         |
| `path`    | No       | The path used to select a route inside the service. It changes which route runs, not the path your code sees. See [Rules inside a service](#rules-inside-a-service) for an example. |

## How requests are routed

Vercel evaluates your top-level rewrites in order and routes each request to the first matching service. Using the configuration above, where `/api/(.*)` routes to `my_backend` and everything else routes to `my_frontend`:

| Request               | Handled by    | Service receives  |
| --------------------- | ------------- | ----------------- |
| `GET /dashboard`      | `my_frontend` | `/dashboard`      |
| `GET /api/users`      | `my_backend`  | `/api/users`      |
| `POST /api/orders`    | `my_backend`  | `/api/orders`     |

The service receives the original request path. `GET /api/users` reaches `my_backend` as `/api/users`, not `/users`.

Once a request is routed to a service, that service handles the rest of routing. If nothing inside the service matches, the service is expected to return its own 404 or 405 response.

> **💡 Note:** Routing into a service is final. If no route matches inside the service,
> Vercel does not fall back to your other top-level rewrites. It returns the
> service's not-found response.

## Rules inside a service

A service can define its own `headers`, `redirects`, `rewrites`, and `routes`, using the same syntax as the [top-level configuration](/docs/project-configuration/vercel-json). These run only after a top-level rewrite routes a request into the service, and they can match on the state the rewrite passed in.

For example, capture an organization slug at the top level, pass it to the service as query state, and let the service add a response header based on it:

```json filename="vercel.json"
{
  "services": {
    "my_backend": {
      "root": "backend/",
      "entrypoint": "main:app",
      "headers": [
        {
          "source": "/(.*)",
          "has": [{ "type": "query", "key": "org", "value": "(?<org>.*)" }],
          "headers": [{ "key": "x-org-id", "value": ":org" }]
        }
      ]
    }
  },
  "rewrites": [
    {
      "source": "/org/:orgSlug/api/:path*",
      "destination": {
        "service": "my_backend",
        "path": "/:path*?org=:orgSlug"
      }
    }
  ]
}
```

For example, `GET /org/acme/api/users` routes to `my_backend` with the route lookup path `/users` and the query state `org=acme`. The service's own `headers` rule matches `org=acme` and adds `x-org-id: acme` to the response. Your service code still observes the original path `/org/acme/api/users`: the destination `path` only selects which route runs and the query state these rules match against, not the path your code sees. To change the path your service code observes, add a [`request.path` transform](/docs/project-configuration/vercel-json#request-path-transform-in-a-service) to the service's own `routes`.

## Internal calls between services

Top-level rewrites are public ingress. To let one service call another over the internal network, server-side and without a public route, use a [service binding](/docs/services/bindings) instead.


---

[View full sitemap](/docs/sitemap)
