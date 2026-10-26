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
  - /docs/functions/runtimes/python/python-version
  - /docs/functions/runtimes/python
  - /docs/cli/deploy
  - /docs/services
summary: Deploy a FastAPI app on Vercel. Learn how the Python runtime, ASGI, static assets, and Vercel Functions work together.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/backend/fastapi.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "b8ea700d42cd88e3c71e6d4bc943aa82c58544ea842152ce6d527e8bd5e4fa20"
---

# Deploy a FastAPI app on Vercel

Deploy a FastAPI app to Vercel with the Python runtime and Vercel Functions.
Vercel looks for a `FastAPI` instance named `app` at supported entrypoints in
your repository.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to ship a Fastify app on Vercel](https://vercel.com/kb/guide/ship-a-fastify-app-on-vercel) — Deploy a Fastify app to Vercel with zero configuration, then add streaming, lifecycle hooks, cron jobs, and observabilit
- [How to ship a Flask app on Vercel](https://vercel.com/kb/guide/ship-a-flask-app-on-vercel) — Deploy a Flask app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and con
- [FastAPI frontends and static files served from the CDN](https://vercel.com/changelog/fastapi-frontends-and-static-files-served-from-the-cdn)
- [FastAPI Lifespan Events are now supported on Vercel](https://vercel.com/changelog/fastapi-lifespan-events-are-now-supported-on-vercel)
- [Vercel now supports Build Commands for FastAPI and Flask](https://vercel.com/changelog/vercel-now-supports-build-commands-for-fastapi-and-flask)
- [Zero-configuration FastAPI backends](https://vercel.com/changelog/zero-config-fastapi-backends)
- [Build an agentic app in FastAPI with OpenAI Agents API and Vercel Sandbox](https://vercel.com/kb/guide/fastapi-openai-agents-api-vercel-sandbox) — Learn how to build a repository Q&A app using FastAPI, OpenAI Agents API, and Vercel Sandbox, with isolated code inspect
- [Migrate from Google Cloud Run to Vercel](https://vercel.com/kb/guide/migrate-cloud-run-to-vercel) — Move a Cloud Run service or worker to Vercel. Compare runtimes, preserve Google Cloud access, and plan jobs, validation,
- [Build a Weather API on Vercel: Express, FastAPI, and Nitro](https://vercel.com/kb/guide/weather-api-with-fastapi) — Build a weather API on Vercel with FastAPI, Express, or Nitro. Compare the three runtimes, add caching and Observability
- [Deploy a Flask app on Vercel](https://vercel.com/docs/frameworks/backend/flask) — Deploy a Flask app on Vercel. Learn how the Python runtime, WSGI, static assets, and Vercel Functions work together.
- [Fastify on Vercel](https://vercel.com/docs/frameworks/backend/fastify) — Deploy Fastify applications to Vercel with zero configuration.
- [Projects overview](https://vercel.com/docs/projects) — A project is where you deploy and operate frontend apps, APIs, backends, containers, and agent workloads on Vercel.

Full cross-link map for this page: [/docs/frameworks/backend/fastapi.graph.md](/docs/frameworks/backend/fastapi.graph.md)
<!-- /docsgraph:related -->

## Create or import your app

To move an existing FastAPI app from another platform, follow the Python API migration guide for [Heroku](/kb/guide/migrate-a-python-api-from-heroku-to-vercel), [Render](/kb/guide/migrate-a-python-api-from-render-to-vercel), or [Railway](/kb/guide/migrate-a-python-api-from-railway-to-vercel).

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

### Configure Python and dependencies

[Set the Python version](/docs/functions/runtimes/python/python-version) to match your application's dependencies. Vercel supports `pyproject.toml`, `requirements.txt`, and Pipenv manifests; see the [Python dependency configuration](/docs/functions/runtimes/python#dependencies) for supported lockfiles.

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

## Deploy with a frontend

Use [Vercel Services](/docs/services) to deploy a FastAPI backend and a frontend in one project. Follow the [Python backend with Next.js guide](/kb/guide/python-backend-on-vercel) to configure private backend calls, separate databases for each environment, and preview deployments across both apps.

### Build an agent app with eve

Deploy the [eve Agent with Python template](/templates/eve/eve-agent-with-python) to build a chat app with an eve agent, a Next.js frontend, and a FastAPI backend. The agent and frontend share a task list stored in Postgres, and the agent calls FastAPI endpoints to run Python tools for statistics and text analysis.

Vercel Services deploys all three services in one project. The FastAPI backend has no public route; the frontend and agent call it through [service bindings](/docs/services/bindings). See the [template repository](https://github.com/vercel-labs/eve-agent-python-template) for setup instructions and examples you can customize.

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

#### app.frontend

```py filename="app.py"
from fastapi import FastAPI

app = FastAPI()

@app.get("/api/hello")
def hello():
    return {"message": "Hello"}

app.frontend("/", directory="dist")
```

#### app.mount

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

To redirect, rewrite, or answer requests before they reach FastAPI, use [Routing Middleware in Python](/docs/routing-middleware/python-reference). FastAPI middleware and dependency guards run inside the application, after a request reaches the function.

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

## Run background and scheduled tasks

To process work independently of an API response, enqueue tasks with [Celery](/docs/frameworks/backend/celery) or [Dramatiq](/docs/frameworks/backend/dramatiq). Both integrations use Vercel Queues to invoke worker functions, and their guides show how to enqueue work from a Python web application.

For scheduled work, configure Cron Jobs to call a FastAPI route that runs the task or enqueues it. The [FastAPI cron job example](/kb/guide/ship-a-fastapi-app-on-vercel#run-scheduled-tasks-with-cron-jobs) includes the schedule and `CRON_SECRET` authorization check.

## Stream responses

Use FastAPI's `StreamingResponse` to send response chunks as they become available. See the [FastAPI streaming example](/kb/guide/ship-a-fastapi-app-on-vercel#stream-responses) for a generator-backed response on Vercel.

## Use WebSockets

Follow the [FastAPI WebSocket setup](/docs/functions/websockets#fastapi-with-asgi) to add a WebSocket endpoint. Connections follow function duration limits, so clients need to handle reconnects.

For a complete application, [build a multiplayer board with Next.js and FastAPI](/kb/guide/real-time-board-nextjs-fastapi). The guide uses Redis to coordinate presence and messages across function instances.

## Protect an internal API

Use Vercel Passport to require sign-in through your company's identity provider before requests reach your FastAPI app. Passport requires an Enterprise plan. Follow the [FastAPI Passport guide](/kb/guide/vercel-passport-backend-frameworks#fastapi) to verify visitor identity and authorize access within your app.

## Monitor and debug requests

Use [Runtime Logs](/docs/functions/logs) to inspect application output and errors, and [Observability](/docs/observability) to investigate request duration and failures. See [monitoring FastAPI with Observability](/kb/guide/ship-a-fastapi-app-on-vercel#monitor-performance-with-observability) for details.

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
