---
title: Using the Python Runtime with Vercel Functions
product: vercel
url: /docs/functions/runtimes/python
canonical_url: "https://vercel.com/docs/functions/runtimes/python"
last_updated: 2026-07-22
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "701ea9ffa84ef639697f85726379c03081a31bfac1ab37b46bdad73e1a17eddf"
---

# Using the Python Runtime with Vercel Functions

Use the Python runtime to run ASGI (Asynchronous Server Gateway Interface) and
WSGI (Web Server Gateway Interface) applications on Vercel. Vercel detects
supported Python frameworks and runs your application as Vercel Functions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Build with a FastAPI starter template](https://vercel.com/kb/guide/build-with-a-fastapi-starter-template?from=related) — Browse FastAPI starter templates for Vercel and deploy one in a few steps. Compare minimal, AI, agent, and full-stack Fa
- [How to debug 404 errors](https://vercel.com/kb/guide/how-to-debug-404-errors?from=related) — Learn the systematic steps to identify and resolve 404 issues.
- [How to ship a FastAPI app on Vercel](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel?from=related) — Deploy a FastAPI app to Vercel with zero configuration. Learn how the Python runtime, Vercel Functions, streaming, middl
- [How to ship a Flask app on Vercel](https://vercel.com/kb/guide/ship-a-flask-app-on-vercel?from=related) — Deploy a Flask app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and con
- [Deploy Python apps on Vercel using Docker ](https://vercel.com/kb/guide/vercel-docker-python-apps?from=related) — Deploy a Dockerized Python application that depends on native software, OCR engines, or small local models, plus a Next.
- [Runtime](https://vercel.com/docs/functions/configuring-functions/runtime?from=related) — Learn how to configure the runtime for Vercel Functions.
- [Celery](https://vercel.com/docs/frameworks/backend/celery?from=related) — Deploy Celery on Vercel. Learn how Celery workers use Vercel Queues and Vercel Functions to run background tasks without
- [Supported Frameworks](https://vercel.com/docs/frameworks?from=related) — Vercel supports a wide range of the most popular frameworks, optimizing how your application builds and runs no matter w
- [Build Image](https://vercel.com/docs/builds/build-image?from=related) — Learn about the container image used for Vercel builds.
- [Fluid Compute](https://vercel.com/docs/fluid-compute?from=related) — Learn about fluid compute, an execution model for Vercel Functions that provides a more flexible and efficient way to ru

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

> **💡 Note:** The standard Python bundle size limit is  uncompressed.
>
> support Python bundles up to  on Fluid compute when enabled (public beta).
> See the
>
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

## Existing projects using `/api`

Vercel supports existing projects that define file-based Python functions in
an `/api` directory. See [Python functions in the `/api`
directory](/docs/functions/runtimes/python/api-directory) for routing, handlers,
and configuration.


---

[View full sitemap](/docs/sitemap)
