---
title: "Routing Middleware: Python Reference"
product: vercel
url: /docs/routing-middleware/python-reference
canonical_url: "https://vercel.com/docs/routing-middleware/python-reference"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/routing-middleware
related:
  - /docs/routing-middleware
  - /docs/frameworks/backend/fastapi
  - /docs/frameworks/backend/flask
  - /docs/frameworks/full-stack/django
  - /docs/project-configuration/vercel-json
summary: Reference for writing Routing Middleware in Python with the vercel-proxy package, including setup, routes, requests, and responses.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/routing-middleware/python-reference.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "99abe6a2d3f0c112714d0313e77d8ae7c1e44dd3fda56badb2db483ad026f31d"
---

# Routing Middleware: Python Reference

Use the [`vercel-proxy`](https://pypi.org/project/vercel-proxy/) package to write [Routing Middleware](/docs/routing-middleware) in Python. It routes requests by path and provides responses that continue, rewrite, or answer a request. For path matching and limits, see the [Routing Middleware overview](/docs/routing-middleware).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Routing Middleware now supports Python](https://vercel.com/changelog/routing-middleware-now-supports-python)
- [Routing](https://vercel.com/docs/routing) — Learn how Vercel's CDN routes requests through firewall, project routes, and deployment routes before reaching your appl
- [Services routing](https://vercel.com/docs/services/routing) — Learn how Vercel routes public requests to services and how each service handles its own routes.
- [Project-Level Routing Rules](https://vercel.com/docs/routing/project-routing-rules) — Add redirects, rewrites, headers, and status codes to your project from the dashboard or API, without deploying new code
- [Features](https://vercel.com/docs/build-output-api/features) — Learn how to implement common Vercel platform features through the Build Output API.
- [Add a routing rule](https://vercel.com/docs/rest-api/project-routes/add-a-routing-rule) — POST /v1/projects/{projectId}/routes — Add a single routing rule to a project at a specified position. Defaults to the e

Full cross-link map for this page: [/docs/routing-middleware/python-reference.graph.md](/docs/routing-middleware/python-reference.graph.md)
<!-- /docsgraph:related -->

Python Routing Middleware works with apps on the Python runtime, such as [FastAPI](/docs/frameworks/backend/fastapi), [Flask](/docs/frameworks/backend/flask), and [Django](/docs/frameworks/full-stack/django).

## Setup

### Install `vercel-proxy`

Your Routing Middleware runs separately from your app, with only the packages in the `vercel.proxy` dependency group of your `pyproject.toml`. Add `vercel-proxy` to that group:

```bash
uv add --group vercel.proxy vercel-proxy
```

Or add the group to `pyproject.toml` yourself:

```toml filename="pyproject.toml"
[dependency-groups]
"vercel.proxy" = ["vercel-proxy"]
```

Add any other packages your Routing Middleware imports to the same group. Requests to your Routing Middleware fail if one is missing. Projects that only use `requirements.txt` should switch to `pyproject.toml`.

### Set the entrypoint

Set [`proxy.entrypoint`](/docs/project-configuration/vercel-json#proxy) in `vercel.json` to the module that defines your `Proxy` and the name of the `Proxy`, separated by a colon:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "proxy": {
    "entrypoint": "proxy:proxy"
  }
}
```

| `entrypoint`         | Loads                          |
| -------------------- | ------------------------------ |
| `proxy:proxy`        | `proxy` from `proxy.py`        |
| `app.proxy:proxy`    | `proxy` from `app/proxy.py`    |
| `middleware:handler` | `handler` from `middleware.py` |

- The name must be defined at the module's top level, by assignment, `def`, or `from ... import`.
- A plain file path such as `proxy.py` isn't accepted. Use `module:attribute`.
- The entrypoint can also name any other ASGI or WSGI app instead of a `Proxy`.

## `Proxy`

`Proxy` routes each request to a handler. Create one at the top level of your entrypoint module:

```python filename="proxy.py"
from urllib.parse import quote

from vercel.proxy import ContinueResponse, Proxy, RedirectResponse, Request, Response

proxy = Proxy()


@proxy.route("/old-blog/{slug}")
def old_blog(request: Request) -> Response:
    slug = quote(request.path_params["slug"])
    return RedirectResponse(f"/blog/{slug}", status_code=308)


@proxy.route("/api/{path:path}")
def api(request: Request) -> Response:
    return ContinueResponse(request_headers={"x-api-version": "2"})
```

| Argument   | Type                  | Description                                                                                       |
| ---------- | --------------------- | ------------------------------------------------------------------------------------------------- |
| `fallback` | `Response` or handler | What to do with requests that match no route. See [Fallback](#fallback)                           |
| `strict`   | `bool`                | Require exact path matches, including trailing slashes. See [Trailing slashes](#trailing-slashes) |

`Proxy` only receives requests that match `proxy.matcher`. See [path matching](/docs/routing-middleware#path-matching).

## Routes

`@proxy.route(path)` registers a handler for requests whose path matches. Each request goes to the first matching route, in the order you registered the routes. Handlers can be sync or async.

A path can capture parts of the URL with placeholders. Your handler reads the captured values from `request.path_params`:

```python filename="proxy.py"
from vercel.proxy import Proxy, Request, Response, RewriteResponse

proxy = Proxy()


@proxy.route("/users/{user_id:int}")
def user(request: Request) -> Response:
    return RewriteResponse(f"/profiles/{request.path_params['user_id']}")
```

The following placeholders are available:

| Placeholder   | Matches                                                         |
| ------------- | --------------------------------------------------------------- |
| `{name}`      | One path segment, as a string                                   |
| `{name:type}` | One path segment, converted to `str`, `int`, `float`, or `uuid` |
| `{name:path}` | Any part of the path, including `/`                             |

> **💡 Note:** Captured values are URL-decoded. Quote them with `urllib.parse.quote` before
> you build a URL from them. Check any value that chooses a destination, such
> as a host or a path that contains `..`.

### Match methods and hosts

You can limit a route to certain HTTP methods or hosts:

```python filename="proxy.py"
@proxy.route("/admin", methods=["GET", "POST"], host="admin.example.com")
def admin(request: Request) -> Response:
    return RewriteResponse("/internal/admin")
```

| Argument  | Type        | Description                                                                                                                     |
| --------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `methods` | `list[str]` | HTTP methods the route accepts. Omit it to accept every method                                                                  |
| `host`    | `str`       | Hostname the route accepts. It can capture values like the path, such as `"{tenant}.example.com"`. Omit it to accept every host |

### Trailing slashes

Trailing slashes are optional by default. `Proxy` first matches each request against every route as sent, then with the trailing slash added or removed. A route that matches the path exactly wins.

To require exact matches, pass `strict=True`:

```python filename="proxy.py"
proxy = Proxy(strict=True)
```

## Fallback

Requests that match no route go to the fallback. By default, they continue to your app unchanged.

To change this, pass a response or a handler as `fallback`:

```python filename="proxy.py"
from vercel.proxy import JSONResponse, Proxy

proxy = Proxy(fallback=JSONResponse({"error": "not found"}, status_code=404))
```

You can also set the fallback with the `@proxy.fallback` decorator. It replaces any fallback you passed to `Proxy()`:

```python filename="proxy.py"
@proxy.fallback
def fallback(request: Request) -> Response:
    return RewriteResponse("/404")
```

## Request

`Request` is a Starlette [`Request`](https://starlette.dev/requests/). Use `method`, `url`, `headers`, `query_params`, `cookies`, `path_params`, and `client` to decide how to route it.

To read a request's location, see [geolocation headers](/docs/routing-middleware#geolocation-headers).

## Responses

Every handler returns a response. The response type decides what happens to the request. Responses are based on Starlette's [responses](https://starlette.dev/responses/).

### Continue or rewrite the request

| Response               | What happens                                                                 |
| ---------------------- | ---------------------------------------------------------------------------- |
| `ContinueResponse()`   | The request continues to the original URL                                    |
| `RewriteResponse(url)` | Vercel serves the request from `url`. The URL the client sees doesn't change |

A continue or rewrite always has status `200` and no body. To change the status code, [answer the request](#answer-the-request) instead.

### Change headers on the forwarded request

`ContinueResponse` and `RewriteResponse` take `request_headers`, a dictionary of headers to set on the request your app receives. A `None` value removes the header:

```python filename="proxy.py"
@proxy.route("/{path:path}")
def add_region(request: Request) -> Response:
    return ContinueResponse(request_headers={"x-region": "eu", "cookie": None})
```

### Answer the request

`Response`, `JSONResponse`, `PlainTextResponse`, `HTMLResponse`, and `RedirectResponse` answer the request directly. The request doesn't reach your app. They take the same arguments as the Starlette classes of the same name:

```python filename="proxy.py"
from vercel.proxy import JSONResponse, Proxy, Request, Response

proxy = Proxy()


@proxy.route("/api/health")
def health(request: Request) -> Response:
    return JSONResponse({"status": "ok"})
```

`RedirectResponse` defaults to status `307`. Pass `status_code` to use a different status.

### Set response headers and cookies

`headers`, `set_cookie`, and `delete_cookie` work on every response, as in Starlette:

```python filename="proxy.py"
@proxy.route("/")
def home(request: Request) -> Response:
    response = ContinueResponse()
    response.set_cookie("bucket", "b", max_age=86400)
    return response
```

Header names starting with `x-middleware-` are reserved for Vercel. Starlette background tasks aren't supported.

## Function options

Set duration, memory, and other options with the [`functions`](/docs/project-configuration/vercel-json#functions) property. Use the module's file path as the key, not the `module:attribute` value:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "proxy": {
    "entrypoint": "app.proxy:proxy"
  },
  "functions": {
    "app/proxy.py": {
      "maxDuration": 10
    }
  }
}
```

## Troubleshooting

| Error                        | Cause                                                                                                                      | Fix                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `invalid_proxy_entrypoint`   | `entrypoint` is a plain `.py` path                                                                                         | Use `module:attribute`, such as `proxy:proxy`                                        |
| `proxy_entrypoint_not_found` | The module file doesn't exist                                                                                              | Check the module path. `app.proxy` loads `app/proxy.py`                              |
| `PYTHON_HANDLER_NOT_FOUND`   | The attribute isn't defined at the module's top level                                                                      | Define it at the top level, such as `proxy = Proxy()`                                |
| `proxy_runtime_mismatch`     | Your app doesn't use the Python runtime                                                                                    | Write your Routing Middleware in the same language as your app                       |
| Every matched request fails  | The `vercel.proxy` dependency group is missing, or lacks `vercel-proxy` or another package your Routing Middleware imports | Add the packages to `"vercel.proxy"` under `[dependency-groups]` in `pyproject.toml` |

## More resources

- [Routing Middleware overview](/docs/routing-middleware)
- [Getting Started with Routing Middleware](/docs/routing-middleware/getting-started)
- [`proxy` in `vercel.json`](/docs/project-configuration/vercel-json#proxy)
- [Python runtime](/docs/functions/runtimes/python)
- [`vercel-proxy` on PyPI](https://pypi.org/project/vercel-proxy/)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
