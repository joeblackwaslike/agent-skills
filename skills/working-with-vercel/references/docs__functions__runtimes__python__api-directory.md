---
title: Python Functions in the /api Directory
product: vercel
url: /docs/functions/runtimes/python/api-directory
canonical_url: "https://vercel.com/docs/functions/runtimes/python/api-directory"
last_updated: 2026-08-12
type: reference
prerequisites:
  - /docs/functions/runtimes/python
  - /docs/functions/runtimes
related:
  - /docs/frameworks/backend/fastapi
  - /docs/frameworks/backend/flask
  - /docs/frameworks/full-stack/django
  - /docs/services
  - /docs/project-configuration/vercel-json
summary: Configure existing Vercel projects that use file-based Python functions in an /api directory.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/runtimes/python/api-directory.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "c5cf47c8cf705cf025b1a940983d2691319097d8c07e321317b974f25f3b1803"
---

# Python Functions in the /api Directory

Vercel supports existing projects that define file-based Python functions in
an `/api` directory. File-based Python functions map `.py` files to routes and
load ASGI applications, WSGI applications, or `BaseHTTPRequestHandler`
subclasses.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to ship a FastAPI app on Vercel](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fpython%2Fapi-directory&source_site=vercel-docs&relationship=related) — Deploy a FastAPI app to Vercel with zero configuration. Learn how the Python runtime, Vercel Functions, streaming, middl
- [How to ship a Flask app on Vercel](https://vercel.com/kb/guide/ship-a-flask-app-on-vercel?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fpython%2Fapi-directory&source_site=vercel-docs&relationship=related) — Deploy a Flask app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and con
- [Configuring the Runtime for Vercel Functions](https://vercel.com/docs/functions/configuring-functions/runtime?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fpython%2Fapi-directory&source_site=vercel-docs&relationship=related) — Learn how to configure the runtime for Vercel Functions.
- [vercel.functions API Reference \\(Python\\)](https://vercel.com/docs/functions/functions-api-reference/vercel-sdk-python?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fpython%2Fapi-directory&source_site=vercel-docs&relationship=related) — Learn about available APIs when working with Vercel Functions in Python.
- [Advanced Configuration](https://vercel.com/docs/functions/configuring-functions/advanced-configuration?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fpython%2Fapi-directory&source_site=vercel-docs&relationship=related) — Learn how to add utility files to the /api directory, and bundle Vercel Functions.
- [Getting started with Vercel Functions](https://vercel.com/docs/functions/quickstart?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fpython%2Fapi-directory&source_site=vercel-docs&relationship=related) — Build your first Vercel Function in a few steps.
- [Frameworks on Vercel](https://vercel.com/docs/frameworks?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fpython%2Fapi-directory&source_site=vercel-docs&relationship=related) — Vercel supports a wide range of the most popular frameworks, optimizing how your application builds and runs no matter w

Full cross-link map for this page: [/docs/functions/runtimes/python/api-directory.graph.md](/docs/functions/runtimes/python/api-directory.graph.md?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fpython%2Fapi-directory&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

For new Python applications, use a framework preset for
[FastAPI](/docs/frameworks/backend/fastapi),
[Flask](/docs/frameworks/backend/flask), or
[Django](/docs/frameworks/full-stack/django). To run a Python backend alongside
another framework, use [Services](/docs/services).

## How files map to routes

Without a detected Python framework preset, each `.py` file inside `/api`
becomes a separate Vercel Function. Vercel serves each function at its file
path. For example, `api/index.py` serves `/api`, and `api/users.py` serves
`/api/users`.

## Supported handlers

Each `.py` file must define one of these top-level names:

- `app` for an ASGI or WSGI application
- `application` for a WSGI application
- `handler` for a class that inherits from `BaseHTTPRequestHandler`

The following function uses `BaseHTTPRequestHandler`:

```py filename="api/index.py"
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/plain')
        self.end_headers()
        self.wfile.write('Hello, world!'.encode('utf-8'))
```

## Framework preset precedence

A Python framework preset takes precedence over file-based functions. When
Vercel detects a framework preset, the framework application handles all
requests, and files under `/api` don't become separate Vercel Functions.

## Configure file-based functions

Use the [`functions` property](/docs/project-configuration/vercel-json#functions)
in `vercel.json` to configure file-based Python functions. For example, use
`excludeFiles` to exclude files that the functions don't need at runtime:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "api/**/*.py": {
      "excludeFiles": "{tests/**,__tests__/**,**/*.test.py,**/test_*.py,fixtures/**,__fixtures__/**,testdata/**,sample-data/**,static/**,assets/**}"
    }
  }
}
```

For dependency files, Python versions, streaming, bundle size limits, and file
system behavior, see the [Python runtime
reference](/docs/functions/runtimes/python).

## Related

- [Deploy a FastAPI app on Vercel](/docs/frameworks/backend/fastapi)
- [Deploy a Flask app on Vercel](/docs/frameworks/backend/flask)
- [Deploy a Django app on Vercel](/docs/frameworks/full-stack/django)
- [Combine frontends and backends with Services](/docs/services)


---

[View full sitemap](/docs/sitemap)
