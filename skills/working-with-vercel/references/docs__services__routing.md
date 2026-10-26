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
  - /docs/routing/rewrites
  - /docs/services/bindings
summary: Learn how Vercel routes public requests to services and how each service handles its own routes.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/services/routing.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "84cf103d1bf12ccad519aefeb9b495df61cebfc770784c15b6bbf6a507920ab2"
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

- [Full-stack previews on Vercel](https://vercel.com/kb/guide/full-stack-preview-deployments-on-vercel) — Learn how to use full-stack previews for your Vercel projects. Deploy Next.js, FastAPI, and a containerized Go service t
- [How to deploy a Python backend with Vercel Services ](https://vercel.com/kb/guide/python-backend-on-vercel) — Deploy a Python backend with a Next.js frontend on Vercel. Learn how to configure both apps with Vercel Services, use a
- [Choosing how to structure your application on Vercel](https://vercel.com/kb/guide/structure-your-application) — Compare three ways to structure an application on Vercel \\(a single framework, one project with Services, or separate pr
- [The Complete Guide to Vercel Services](https://vercel.com/kb/guide/vercel-services) — Vercel Services let you deploy multiple frontends and backends in one project on a shared domain. Learn how to define se
- [Vercel Services: Run full stack on Vercel](https://vercel.com/blog/vercel-services-run-full-stack-on-vercel)
- [Project-Level Routing Rules](https://vercel.com/docs/routing/project-routing-rules) — Add redirects, rewrites, headers, and status codes to your project from the dashboard or API, without deploying new code
- [Service configuration reference](https://vercel.com/docs/services/config-reference) — Options available for service configuration.
- [Services](https://vercel.com/docs/build-output-api/services) — Learn how a deployment with multiple services is structured in the Build Output API.
- [Add a routing rule](https://vercel.com/docs/rest-api/project-routes/add-a-routing-rule) — POST /v1/projects/{projectId}/routes — Add a single routing rule to a project at a specified position. Defaults to the e
- [Edit a routing rule](https://vercel.com/docs/rest-api/project-routes/edit-a-routing-rule) — PATCH /v1/projects/{projectId}/routes/{routeId} — Replace a routing rule identified by its ID, or restore it from the cu

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

## Route by host

The examples above route by path prefix on a shared domain. You can also route by hostname, so each service is reached on its own subdomain. Routing by host keeps existing production hostnames unchanged when you move several services into one deployment.

A service rewrite accepts the same `has` and `missing` conditions as an ordinary rewrite. Add a `has` condition with `type: "host"` to require a specific request host before the rule matches. For the full condition syntax, see [conditional matching with `has` and `missing`](/docs/project-configuration/vercel-json#conditional-matching-with-has-and-missing).

The following configuration routes `service-one.example.com` to `service_one` and `service-two.example.com` to `service_two`, with a final rule for requests that match neither host:

```json filename="vercel.json"
{
  "services": {
    "service_one": {
      "root": "service-one/"
    },
    "service_two": {
      "root": "service-two/"
    },
    "site": {
      "root": "site/"
    }
  },
  "rewrites": [
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": { "pre": "service-one." } }],
      "destination": { "service": "service_one" }
    },
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": { "pre": "service-two." } }],
      "destination": { "service": "service_two" }
    },
    {
      "source": "/(.*)",
      "destination": { "service": "site" }
    }
  ]
}
```

With this configuration:

| Request                                      | Handled by    | Service receives  |
| -------------------------------------------- | ------------- | ----------------- |
| `GET https://service-one.example.com/users`  | `service_one` | `/users`          |
| `GET https://service-two.example.com/health` | `service_two` | `/health`         |
| `GET https://example.com/`                   | `site`        | `/`               |
| `GET https://<deployment-url>.vercel.app/`   | `site`        | `/`               |

The service still receives the original request path, exactly as with path-based routing. Host and path conditions combine: `source` matches the path and `has` adds the host requirement, so a rule can require both. For everything else rewrites support, including all condition types and matching options, see [Rewrites](/docs/routing/rewrites) and the full [routing documentation](/docs/routing).

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
