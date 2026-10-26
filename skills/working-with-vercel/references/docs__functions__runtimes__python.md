---
title: Using the Python Runtime with Vercel Functions
product: vercel
url: /docs/functions/runtimes/python
canonical_url: "https://vercel.com/docs/functions/runtimes/python"
last_updated: 2026-08-12
type: reference
prerequisites:
  - /docs/functions/runtimes
  - /docs/functions
related:
  - /docs/frameworks/backend/fastapi
  - /docs/frameworks/backend/flask
  - /docs/frameworks/full-stack/django
  - /docs/services
  - /docs/functions/runtimes/python/python-version
summary: Learn how to use the Python runtime to run Python applications on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/runtimes/python.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "86e634d14c31f3f619f00d298bb2f1b4b788a1af0cee2b1ecb828908ff9819ee"
---

# Using the Python Runtime with Vercel Functions

Use the Python runtime to run ASGI (Asynchronous Server Gateway Interface) and
WSGI (Web Server Gateway Interface) applications on Vercel. Vercel detects
supported Python frameworks and runs your application as Vercel Functions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Python 3.13 and 3.14 are now available ](https://vercel.com/changelog/python-3-13-and-3-14-are-now-available)
- [Python function bundles now include precompiled bytecode](https://vercel.com/changelog/python-function-bundles-now-include-precompiled-bytecode)
- [Python on Vercel is now generally available](https://vercel.com/changelog/python-on-vercel-is-now-generally-available)
- [Python package manager uv is now available for builds with zero configuration](https://vercel.com/changelog/python-package-manager-uv-is-now-available-for-builds-with-zero)
- [Python support added to in-function concurrency beta](https://vercel.com/changelog/python-support-added-to-in-function-concurrency-beta)
- [Build with a FastAPI starter template](https://vercel.com/kb/guide/build-with-a-fastapi-starter-template) — Browse FastAPI starter templates for Vercel and deploy one in a few steps. Compare minimal, AI, agent, and full-stack Fa
- [How to debug 404 errors](https://vercel.com/kb/guide/how-to-debug-404-errors) — Learn the systematic steps to identify and resolve 404 issues.
- [Migrate from Railway to Vercel](https://vercel.com/kb/guide/migrate-railway-to-vercel) — Migrate an app from Railway to Vercel. Choose a deployment path, configure services, plan for stored data, and test befo
- [Migrate from Render to Vercel](https://vercel.com/kb/guide/migrate-render-to-vercel) — Migrate from Render to Vercel: map web services, cron jobs, and containers to their equivalents, and handle what doesn't
- [How to ship a FastAPI app on Vercel](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel) — Deploy a FastAPI app to Vercel with zero configuration. Learn how the Python runtime, Vercel Functions, streaming, middl
- [Python on Vercel is now generally available](https://vercel.com/blog/python-on-vercel-is-now-generally-available)
- [Run background tasks with Celery on Vercel](https://vercel.com/docs/frameworks/backend/celery) — Deploy Celery on Vercel. Learn how Celery workers use Vercel Queues and Vercel Functions to run background tasks without

Full cross-link map for this page: [/docs/functions/runtimes/python.graph.md](/docs/functions/runtimes/python.graph.md)
<!-- /docsgraph:related -->

## Deploy with a Python framework preset

Vercel detects your framework automatically when it finds a matching dependency in
`requirements.txt`, `pyproject.toml`, or `Pipfile`. The Python framework presets
work with [FastAPI](/docs/frameworks/backend/fastapi),
[Flask](/docs/frameworks/backend/flask),
[Django](/docs/frameworks/full-stack/django), and other Python web frameworks.
Define a supported Python entrypoint so Vercel can load your application.

Vercel then runs your app as Vercel Functions and routes every request to it,
so the app you run locally deploys as-is.

For framework-specific setup guides, see:

- [Deploy a FastAPI app on Vercel](/docs/frameworks/backend/fastapi)
- [Deploy a Flask app on Vercel](/docs/frameworks/backend/flask)
- [Deploy a Django app on Vercel](/docs/frameworks/full-stack/django)

## Migrate an existing Python API

To move an existing FastAPI, Flask, or Django API to Vercel, follow the migration guide for your current platform:

- [Migrate a Python API from Heroku to Vercel](/kb/guide/migrate-a-python-api-from-heroku-to-vercel)
- [Migrate a Python API from Render to Vercel](/kb/guide/migrate-a-python-api-from-render-to-vercel)
- [Migrate a Python API from Railway to Vercel](/kb/guide/migrate-a-python-api-from-railway-to-vercel)

## Combine Python with another framework

To run a Python backend and a frontend together in one project, you can use
[Services](/docs/services). Each part builds independently and routes to a
shared domain.

## Python entrypoints

A Python entrypoint is the file and top-level variable that Vercel loads as the
Vercel Function handler. Vercel looks for a Python entrypoint in these
locations:

- `app.py`, `index.py`, `server.py`, `main.py`, `wsgi.py`, or `asgi.py`
- the same filenames inside `src/` or `app/`
- the module path configured with `tool.vercel.entrypoint` in `pyproject.toml`

For Django projects, Vercel also detects a `manage.py` file that sets
`DJANGO_SETTINGS_MODULE`, including in an immediate subdirectory, and resolves
the application from the `WSGI_APPLICATION` or `ASGI_APPLICATION` setting.

The entrypoint file must define one of these top-level names:

- `app` for most ASGI or WSGI frameworks, including FastAPI and Flask
- `application` for Django and other WSGI applications

To point Vercel to an app in a custom module, set `tool.vercel.entrypoint` to a
Python `module:variable` value:

```toml filename="pyproject.toml"
[tool.vercel]
entrypoint = "my_package.api:app"
```

*The \`tool.vercel.entrypoint\` value tells Vercel to load the \`app\` variable
from \`my\_package/api.py\`, which is also the key you'd use in
\`functions\`.*

Vercel still supports `[project.scripts] app = "module:variable"` for existing
projects. Use `tool.vercel.entrypoint` for new projects.

Here's a FastAPI example:

```python filename="app.py"
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Hello from Python on Vercel"}

@app.get("/api/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}
```

```toml filename="pyproject.toml"
[project]
name = "my-python-api"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = [
    "fastapi>=0.117.1",
]
```

## Python version

Set the Python version for your project with `pyproject.toml`,
`.python-version`, or `Pipfile.lock`. For step-by-step instructions, see
[Set the Python version for your Vercel project](/docs/functions/runtimes/python/python-version).

If the required Python version is not defined or not supported, Vercel uses the
default version. The available versions are:

- **3.12** (default)
- **3.13**
- **3.14**

## Dependencies

Define dependencies in `pyproject.toml` (with or without a `uv.lock`),
`requirements.txt`, or a `Pipfile` with a corresponding `Pipfile.lock`.

```python filename="requirements.txt"
fastapi==0.117.1
```

*An example \`requirements.txt\` file that defines \`FastAPI\` as a dependency.*

## Streaming

Vercel Functions support streaming responses when using the Python runtime.
This lets you send parts of a response as they become ready.

## Controlling what gets bundled

By default, Python Vercel Functions include all files from your project that
are reachable at build time. There is no automatic tree-shaking for Python.

During deployment builds, Vercel automatically compiles Python source files
into bytecode and includes the resulting `.pyc` files in the function bundle
when space allows. This reduces initialization time and requires no
configuration.

Make sure your `pyproject.toml` or `requirements.txt` only lists packages
necessary at runtime. Explicitly exclude files you don't need to keep bundles
small and avoid hitting size limits.

> **💡 Note:** The standard Python bundle size limit is **500 MB** uncompressed.
> [Large Functions](/docs/functions/limitations#large-functions-beta)
> support Python bundles up to **5 GB** on Fluid compute when enabled (public beta).
> See the
> [bundle size limits](/docs/functions/limitations#bundle-size-limits)
> for details.

To exclude unnecessary files (tests, static assets, test data), configure
`excludeFiles` in `vercel.json` under the `functions` key. The pattern is a
[glob](https://github.com/isaacs/node-glob#glob-primer) relative to your
project root.

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "app.py": {
      "excludeFiles": "{tests/**,__tests__/**,**/*.test.py,**/test_*.py,fixtures/**,__fixtures__/**,testdata/**,sample-data/**,static/**,assets/**}"
    }
  }
}
```

*Exclude common development and static folders from a Python application to
stay under the 500 MB bundle limit.*

## Reading relative files

Python uses the current working directory when you pass a relative path to
[open()](https://docs.python.org/3/library/functions.html#open). The working
directory is the base of your project, not the directory containing the file.

## Routing Middleware

To redirect, rewrite, or answer requests before they reach your Python app, write [Routing Middleware](/docs/routing-middleware) in Python. Set `proxy` in `vercel.json` to a `module:attribute` entrypoint:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "proxy": {
    "entrypoint": "proxy:proxy"
  }
}
```

Your Routing Middleware runs separately from your app, with only the packages in the `vercel.proxy` dependency group installed. See the [Python reference](/docs/routing-middleware/python-reference).

## Existing projects using `/api`

Vercel supports existing projects that define file-based Python functions in
an `/api` directory. See [Python functions in the `/api`
directory](/docs/functions/runtimes/python/api-directory) for routing, handlers,
and configuration.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
