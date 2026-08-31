---
title: Deploy a FastAPI app on Vercel
product: vercel
url: /docs/frameworks/backend/fastapi
canonical_url: "https://vercel.com/docs/frameworks/backend/fastapi"
last_updated: 2026-08-27
type: how-to
prerequisites:
  - /docs/frameworks/backend
  - /docs/frameworks
related:
  - /docs/cli/init
  - /docs/cli/deploy
  - /docs/cdn
  - /docs/headers
  - /docs/functions
summary: Deploy a FastAPI app on Vercel. Learn how the Python runtime, ASGI, static assets, and Vercel Functions work together.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/backend/fastapi.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "f1dc888698a56a8b9862e7e427dd6850d4dc2d15842ace0040835c5f2667b918"
---

# Deploy a FastAPI app on Vercel

Deploy a FastAPI app to Vercel with the Python runtime and Vercel Functions.
Vercel looks for a `FastAPI` instance named `app` at supported entrypoints in
your repository.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to ship a Fastify app on Vercel](https://vercel.com/kb/guide/ship-a-fastify-app-on-vercel?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Ffastapi&source_site=vercel-docs&relationship=related) — Deploy a Fastify app to Vercel with zero configuration, then add streaming, lifecycle hooks, cron jobs, and observabilit
- [FastAPI Lifespan Events are now supported on Vercel](https://vercel.com/changelog/fastapi-lifespan-events-are-now-supported-on-vercel?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Ffastapi&source_site=vercel-docs&relationship=related)
- [Vercel now supports Build Commands for FastAPI and Flask](https://vercel.com/changelog/vercel-now-supports-build-commands-for-fastapi-and-flask?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Ffastapi&source_site=vercel-docs&relationship=related)
- [Zero-configuration FastAPI backends](https://vercel.com/changelog/zero-config-fastapi-backends?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Ffastapi&source_site=vercel-docs&relationship=related)
- [Build Figma-style multiplayer cursors with WebSockets on Vercel](https://vercel.com/kb/guide/real-time-board-nextjs-fastapi?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Ffastapi&source_site=vercel-docs&relationship=related) — Learn how to build Figma-style multiplayer cursors with Next.js and FastAPI, kept consistent across multiple Vercel Func
- [How to Build a Weather API with FastAPI and Vercel](https://vercel.com/kb/guide/weather-api-with-fastapi?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Ffastapi&source_site=vercel-docs&relationship=related) — Provide real-time weather data to apps and websites with a single FastAPI route.
- [How to ship a Flask app on Vercel](https://vercel.com/kb/guide/ship-a-flask-app-on-vercel?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Ffastapi&source_site=vercel-docs&relationship=related) — Deploy a Flask app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and con
- [Deploy a Node.js Fastify app on Vercel with Docker](https://vercel.com/kb/guide/deploy-nodejs-on-vercel-with-docker?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Ffastapi&source_site=vercel-docs&relationship=related) — Build a Node.js application with Fastify and Docker, then deploy it to Vercel Functions. Learn how to configure environm
- [Deploy a Flask app on Vercel](https://vercel.com/docs/frameworks/backend/flask?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Ffastapi&source_site=vercel-docs&relationship=related) — Deploy a Flask app on Vercel. Learn how the Python runtime, WSGI, static assets, and Vercel Functions work together.
- [Fastify on Vercel](https://vercel.com/docs/frameworks/backend/fastify?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Ffastapi&source_site=vercel-docs&relationship=related) — Deploy Fastify applications to Vercel with zero configuration.
- [Express on Vercel](https://vercel.com/docs/frameworks/backend/express?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Ffastapi&source_site=vercel-docs&relationship=related) — Deploy Express applications to Vercel with zero configuration. Learn about middleware and Vercel Functions.
- [Deploy Dramatiq workers on Vercel](https://vercel.com/docs/frameworks/backend/dramatiq?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Ffastapi&source_site=vercel-docs&relationship=related) — Deploy Dramatiq workers on Vercel. Learn how Dramatiq actors use Vercel Queues and Vercel Functions to process backgroun

Full cross-link map for this page: [/docs/frameworks/backend/fastapi.graph.md](/docs/frameworks/backend/fastapi.graph.md?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Ffastapi&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Create or import your app

Create a FastAPI app or use an existing one:

### Get started with Vercel CLI

Initialize a new FastAPI project with the [Vercel CLI `init` command](/docs/cli/init):

```bash filename="terminal"
vc init fastapi
```

This clones the [FastAPI example repository](https://github.com/vercel/vercel/tree/main/examples/fastapi) in a directory called `fastapi`.

## Exporting the FastAPI application

To run a FastAPI application on Vercel, define an `app` instance that initializes `FastAPI` at a supported entrypoint:

- `app.py`, `index.py`, `server.py`, `main.py`, `wsgi.py`, or `asgi.py`
- the same filenames inside `src/` or `app/`

For example:

```py filename="app/main.py"
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Python": "on Vercel"}
```

To point Vercel to a FastAPI app in a custom module, set `tool.vercel.entrypoint` in `pyproject.toml`:

```toml filename="pyproject.toml"
[tool.vercel]
entrypoint = "backend.server:app"
```

The `tool.vercel.entrypoint` value tells Vercel to look for a `FastAPI` instance named `app` in `./backend/server.py`.

### Build command

The `build` property in `[tool.vercel.scripts]` defines the Build Command for FastAPI deployments. It runs after dependencies are installed and before your application is deployed.

```toml filename="pyproject.toml"
[tool.vercel.scripts]
build = "python build.py"
```

For example:

```py filename="build.py"
def main():
    print("Running build command...")
    with open("build.txt", "w") as f:
        f.write("BUILD_COMMAND")

if __name__ == "__main__":
    main()
```

> **💡 Note:** If you define a [Build
> Command](https://vercel.com/docs/project-configuration/vercel-json#buildcommand) in
> `vercel.json` or in the Project Settings dashboard, it takes precedence over a
> build script in `pyproject.toml`.

### Local development

Use `vercel dev` to run your application locally.

```bash filename="terminal"
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
vercel dev
```

> **💡 Note:** Minimum CLI version required: 48.1.8

### Deploying the application

Deploy the project by connecting your Git repository or by using the [Vercel CLI](/docs/cli/deploy):

```bash filename="terminal"
vc deploy
```

> **💡 Note:** Minimum CLI version required: 48.1.8

## Serving frontend and static assets

Vercel supports two methods for serving frontend and static assets with FastAPI.

### The `public/` directory

Place files in a `public/` directory at your project root. Vercel serves them
from the [CDN](/docs/cdn) at the matching root URL paths. For example,
`public/logo.svg` is served at `/logo.svg`. Default [response
headers](/docs/headers) apply unless you override them in `vercel.json`.

```py filename="app.py"
from fastapi import FastAPI
from fastapi.responses import RedirectResponse

app = FastAPI()

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    # /vercel.svg is served automatically from public/vercel.svg.
    return RedirectResponse("/vercel.svg", status_code=307)
```

> **💡 Note:** Do not mount the `public/` directory with `app.mount()`. Vercel handles it at the platform level.

### Built-in FastAPI frontend and static file support

When using [`app.frontend()`](https://fastapi.tiangolo.com/tutorial/frontend/) or
[`app.mount()`](https://fastapi.tiangolo.com/advanced/sub-applications/) with [`StaticFiles`](https://fastapi.tiangolo.com/tutorial/static-files/),
files are promoted to the CDN at build time:

#### \['app.frontend'

```py filename="app.py"
from fastapi import FastAPI

app = FastAPI()

@app.get("/api/hello")
def hello():
    return {"message": "Hello"}

app.frontend("/", directory="dist")
```

#### 'app.mount']

```py filename="app.py"
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/assets", StaticFiles(directory="assets"), name="assets")
```

Promoted source directories are kept in the function bundle by default so the app can read from them at runtime. To exclude them and serve files from the CDN only, set `exclude = true`:

```toml filename="pyproject.toml"
[tool.vercel.fastapi.static]
exclude = true
```

See [Configuration](#configuration) for all available settings.

#### Route precedence for `app.mount()`

Files are served from the CDN at the mount's URL prefix. Route declaration order
determines which wins when a route and a CDN file share the same path:

- A route declared before the mount takes priority over CDN files. Matching
  requests reach the function.
- A route declared after the mount does not take priority. Matching requests are
  served from the CDN.

```python filename="main.py"
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Declared before the mount, so this route wins over any CDN file at this path.
@app.get("/static/protected.json")
def protected():
    return {"access": "denied"}

app.mount("/static", StaticFiles(directory="static"))
```

The bare mount root (for example, `/static`) always reaches the function.
`StaticFiles` redirects it to the trailing-slash form.

#### Fallback behavior for `app.frontend()`

`app.frontend()` registers a low-priority frontend build. Every API route takes
priority over frontend files regardless of declaration order.

The `fallback` parameter controls CDN behavior when no file matches a request
under the mount:

| `fallback` value | File served | Status | When applied |
|---|---|---|---|
| `"auto"` | `404.html` if present, else `index.html` | `404` or `200` | See notes below |
| `"index.html"` | `index.html` | `200` | Navigation requests only |
| `"404.html"` | `404.html` | `404` | All misses |
| `None` | n/a | n/a | Unmatched paths reach the function |

An `index.html` fallback applies to navigation requests only: requests with an
explicit `text/html` or `application/xhtml+xml` `Accept` header and an
extension-less final URL segment (for example, `/dashboard` but not
`/dashboard/app.js`). All other misses reach the function. A `404.html` fallback
applies to every miss regardless of the `Accept` header. If `"auto"` is set but
neither file exists in the build directory, no fallback is applied.

Fallback routes apply to `GET` and `HEAD` requests only. All other methods
always reach the function.

#### Middleware

CDN-served files bypass the function entirely, so [middleware handlers](https://fastapi.tiangolo.com/reference/fastapi/#fastapi.FastAPI.middleware) and [`Depends()`](https://fastapi.tiangolo.com/reference/dependencies/) guards do not run for them.

Vercel detects these cases and keeps the affected static files and frontends in the function rather than promoting them to the CDN:

- **Top-level middleware**: All static mounts and frontends stay in the function.
- **Sub-app middleware**: Only that sub-app's mounts stay in the function. Mounts elsewhere are still promoted.
- **Frontend dependencies**: Frontends with [`Depends()`](https://fastapi.tiangolo.com/reference/dependencies/) guards stay in the function.

Set `cdn = true` to promote files to the CDN even when middleware or dependency guards are present:

```toml filename="pyproject.toml"
[tool.vercel.fastapi.static]
cdn = true
```

#### Configuration

All settings go under `[tool.vercel.fastapi.static]` in `pyproject.toml`.

| Setting | Value | Description |
|---|---|---|
| `cdn` | omitted *(default)* | CDN promotion enabled. Disabled automatically when middleware or dependency guards are present. |
| `cdn` | `true` | CDN promotion always enabled, even when middleware or dependency guards are present. |
| `cdn` | `false` | CDN promotion disabled. All requests reach the function. |
| `exclude` | `false` *(default)* | Promoted source directories are kept in the function bundle. |
| `exclude` | `true` | Promoted source directories are excluded from the function bundle. |

## Startup and shutdown

You can use [FastAPI lifespan events](https://fastapi.tiangolo.com/advanced/events/) to manage startup and shutdown logic, such as initializing and closing database connections.

```python filename="main.py"
from contextlib import asynccontextmanager
from fastapi import FastAPI

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    print("Starting up...")
    await startup_tasks()
    yield
    # Shutdown logic
    await cleanup_tasks()

app = FastAPI(lifespan=lifespan)
```

> **💡 Note:** Cleanup logic during shutdown is limited to a maximum of **500ms** after
> receiving the [SIGTERM
> signal](https://vercel.com/docs/functions/functions-api-reference#sigterm-signal).
> Logs printed during the shutdown step will not appear in the Vercel dashboard.

## Vercel Functions

When you deploy a FastAPI app to Vercel, it becomes a single [Vercel
Function](/docs/functions). Vercel uses [Fluid
compute](/docs/fluid-compute) by default, so the function scales with traffic.

To configure that function, add an entry to the [`functions`
object](/docs/project-configuration/vercel-json#functions) in `vercel.json` keyed by your
resolved entrypoint file. For example, to let an app defined in `app/main.py`
run for up to 60 seconds, set `maxDuration`:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "app/main.py": {
      "maxDuration": 60
    }
  }
}
```

For more options, see [Configuring
functions](/docs/functions/configuring-functions) and the [`functions`
property](/docs/project-configuration/vercel-json#functions).

## Limitations

All [Vercel Functions limitations](/docs/functions/limitations) apply to FastAPI applications, including:

- **Application size**: The FastAPI application becomes a single bundle, which has a standard bundle size limit of 500MB. [Large Functions](/docs/functions/limitations#large-functions-beta) support Python bundles up to 5GB on Fluid compute when enabled (public beta).

## More resources

For more about deploying FastAPI on Vercel, see:

- [FastAPI official documentation](https://fastapi.tiangolo.com/)
- [Build with a FastAPI starter template](/kb/guide/build-with-a-fastapi-starter-template)
- [How to ship a FastAPI app on Vercel](/kb/guide/ship-a-fastapi-app-on-vercel)
- [Vercel Functions documentation](/docs/functions)
- [Backend templates on Vercel](https://vercel.com/templates?type=backend)


---

[View full sitemap](/docs/sitemap)
