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
  - /docs/services
  - /docs/frameworks/full-stack/django
  - /docs/functions/runtimes/python/python-version
summary: Learn how to use the Python runtime to run Python applications on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/runtimes/python.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "6bf4e1094aa0b3e703561897d4737c1dd468455b40e9e8a196289ed715c1b5e8"
---

# Using the Python Runtime with Vercel Functions

> **🔒 Permissions Required**: The Python runtime

Use the Python runtime to run ASGI (Asynchronous Server Gateway Interface) and
WSGI (Web Server Gateway Interface) applications on Vercel. The Python Framework
Presets work with [FastAPI](/docs/frameworks/backend/fastapi),
[Flask](/docs/frameworks/backend/flask), Django, and other Python web
frameworks.

## Run a Python application

Vercel detects your framework automatically when it finds a matching dependency in
`requirements.txt`, `pyproject.toml`, or `Pipfile`. Define a supported Python
entrypoint so Vercel can load your application.

## Python entrypoints

A Python entrypoint is the file and top-level variable that Vercel loads as the
Vercel Function handler. Vercel looks for a Python entrypoint in these
locations:

- `app.py`, `index.py`, `server.py`, `main.py`, `wsgi.py`, or `asgi.py`
- the same filenames inside `src/`, `app/`, or `api/`
- the module path configured with `tool.vercel.entrypoint` in `pyproject.toml`

The entrypoint file must define one of these top-level names:

- `app` for most ASGI or WSGI frameworks, including FastAPI and Flask
- `application` for Django and other WSGI applications
- `handler` for Python serverless functions that use `BaseHTTPRequestHandler`

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

To deploy a Python API alongside a frontend such as a Next.js app within the
same project, use [Services](/docs/services).

For framework-specific setup guides, see:

- [Deploy a FastAPI app on Vercel](/docs/frameworks/backend/fastapi)
- [Deploy a Flask app on Vercel](/docs/frameworks/backend/flask)
- [Deploy a Django app on Vercel](/docs/frameworks/full-stack/django)

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
    "api/**/*.py": {
      "excludeFiles": "{tests/**,__tests__/**,**/*.test.py,**/test_*.py,fixtures/**,__fixtures__/**,testdata/**,sample-data/**,static/**,assets/**}"
    }
  }
}
```

*Exclude common development and static folders from all Python functions to
stay under the 500 MB bundle limit.*

## Reading relative files

Python uses the current working directory when you pass a relative path to
[open()](https://docs.python.org/3/library/functions.html#open). The working
directory is the base of your project, not the directory containing the file.

## Python serverless functions

You can also place `.py` files inside an `/api` directory. Each file that
defines a `handler` (inheriting from `BaseHTTPRequestHandler`) or an ASGI/WSGI
`app` becomes a separate Vercel Function.

```py filename="api/index.py"
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type','text/plain')
        self.end_headers()
        self.wfile.write('Hello, world!'.encode('utf-8'))
        return
```


---

[View full sitemap](/docs/sitemap)
