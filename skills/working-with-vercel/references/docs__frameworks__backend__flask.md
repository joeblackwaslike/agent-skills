---
title: Deploy a Flask app on Vercel
product: vercel
url: /docs/frameworks/backend/flask
canonical_url: "https://vercel.com/docs/frameworks/backend/flask"
last_updated: 2026-08-12
type: how-to
prerequisites:
  - /docs/frameworks/backend
  - /docs/frameworks
related:
  - /docs/cli/init
  - /docs/functions/runtimes/python/python-version
  - /docs/functions/runtimes/python
  - /docs/cli/deploy
  - /docs/cdn
summary: Deploy a Flask app on Vercel. Learn how the Python runtime, WSGI, static assets, and Vercel Functions work together.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/backend/flask.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "008cac21b93a3492d04c6754ca35ca7cd854f30985386dd92f57d2c9df1b60a1"
---

# Deploy a Flask app on Vercel

Deploy a Flask app to Vercel with the Python runtime and Vercel Functions.
Vercel looks for a `Flask` instance named `app` at supported entrypoints in
your repository.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Zero-configuration Flask backends](https://vercel.com/changelog/zero-configuration-flask-backends)
- [Migrate from Railway to Vercel](https://vercel.com/kb/guide/migrate-railway-to-vercel) — Migrate an app from Railway to Vercel. Choose a deployment path, configure services, plan for stored data, and test befo
- [How to ship a FastAPI app on Vercel](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel) — Deploy a FastAPI app to Vercel with zero configuration. Learn how the Python runtime, Vercel Functions, streaming, middl
- [Build with a FastAPI starter template](https://vercel.com/kb/guide/build-with-a-fastapi-starter-template) — Browse FastAPI starter templates for Vercel and deploy one in a few steps. Compare minimal, AI, agent, and full-stack Fa
- [How to ship a Fastify app on Vercel](https://vercel.com/kb/guide/ship-a-fastify-app-on-vercel) — Deploy a Fastify app to Vercel with zero configuration, then add streaming, lifecycle hooks, cron jobs, and observabilit
- [How to ship an Express app on Vercel](https://vercel.com/kb/guide/ship-a-express-app-on-vercel) — Deploy an Express app to Vercel with zero configuration. Configure response streaming, middleware, cron jobs, the Bun ru
- [Fastify on Vercel](https://vercel.com/docs/frameworks/backend/fastify) — Deploy Fastify applications to Vercel with zero configuration.
- [Routing Middleware: Python Reference](https://vercel.com/docs/routing-middleware/python-reference) — Reference for writing Routing Middleware in Python with the vercel-proxy package, including setup, routes, requests, and

Full cross-link map for this page: [/docs/frameworks/backend/flask.graph.md](/docs/frameworks/backend/flask.graph.md)
<!-- /docsgraph:related -->

## Create or import your app

To move an existing Flask app from another platform, follow the Python API migration guide for [Heroku](/kb/guide/migrate-a-python-api-from-heroku-to-vercel), [Render](/kb/guide/migrate-a-python-api-from-render-to-vercel), or [Railway](/kb/guide/migrate-a-python-api-from-railway-to-vercel).

Create a Flask app or use an existing one:

### Get started with Vercel CLI

Initialize a new Flask project with the [Vercel CLI `init` command](/docs/cli/init):

```bash filename="terminal"
vc init flask
```

This clones the [Flask example repository](https://github.com/vercel/vercel/tree/main/examples/flask) in a directory called `flask`.

## Exporting the Flask application

To run a Flask application on Vercel, define an `app` instance that initializes `Flask` at a supported entrypoint:

- `app.py`, `index.py`, `server.py`, `main.py`, `wsgi.py`, or `asgi.py`
- the same filenames inside `src/` or `app/`

For example:

```py filename="main.py"
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return {"message": "Hello, World!"}
```

To point Vercel to a Flask app in a custom module, set `tool.vercel.entrypoint` in `pyproject.toml`:

```toml filename="pyproject.toml"
[tool.vercel]
entrypoint = "backend.server:app"
```

The `tool.vercel.entrypoint` value tells Vercel to look for a `Flask` instance named `app` in `./backend/server.py`.

### Configure Python and dependencies

[Set the Python version](/docs/functions/runtimes/python/python-version) to match your application's dependencies. Vercel supports `pyproject.toml`, `requirements.txt`, and Pipenv manifests; see the [Python dependency configuration](/docs/functions/runtimes/python#dependencies) for supported lockfiles.

### Build command

The `build` property in `[tool.vercel.scripts]` defines the Build Command for Flask deployments. It runs after dependencies are installed and before your application is deployed.

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

> **💡 Note:** Minimum CLI version required: 48.2.10

### Deploying the application

Deploy the project by connecting your Git repository or by using the [Vercel CLI](/docs/cli/deploy):

```bash filename="terminal"
vc deploy
```

> **💡 Note:** Minimum CLI version required: 48.2.10

## Serving static assets

To serve static assets, place them in the `public/**` directory. Vercel serves
those files from the [CDN](/docs/cdn) with default [headers](/docs/headers)
unless you override them in `vercel.json`.

```py filename="app.py" highlight={5-7}
from flask import Flask, redirect

app = Flask(__name__)

@app.route("/favicon.ico")
def favicon():
    # /vercel.svg is automatically served when included in the public/** directory.
    return redirect("/vercel.svg", code=307)
```

> **💡 Note:** Flask's `app.static_folder` should not be used for static files on Vercel. Use
> the `public/**` directory instead.

## Vercel Functions

When you deploy a Flask app to Vercel, it becomes a single [Vercel
Function](/docs/functions). Vercel uses [Fluid
compute](/docs/fluid-compute) by default, so the function scales with traffic.

To configure that function, add an entry to the [`functions`
object](/docs/project-configuration/vercel-json#functions) in `vercel.json` keyed by your
resolved entrypoint file. For example, to let an app defined in `main.py`
run for up to 60 seconds, set `maxDuration`:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "main.py": {
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

For scheduled work, configure Cron Jobs to call a Flask route that runs the task or enqueues it. The [Flask cron job example](/kb/guide/ship-a-flask-app-on-vercel#run-scheduled-tasks-with-cron-jobs) includes the schedule and `CRON_SECRET` authorization check.

## Stream responses

Return a Flask `Response` backed by a generator to send response chunks as they become available. See the [Flask streaming example](/kb/guide/ship-a-flask-app-on-vercel#stream-responses), which uses `stream_with_context` to preserve the request context while the generator runs.

## Use WebSockets

Use Flask-Sock to add WebSocket routes to a Flask application on Vercel. Follow the [Flask-Sock setup](/docs/functions/websockets#flask-sock-with-wsgi) and handle client reconnects when connections reach the function duration limit.

## Monitor and debug requests

Use [Runtime Logs](/docs/functions/logs) to inspect application output and errors, and [Observability](/docs/observability) to investigate request duration and failures. See [monitoring Flask with Observability](/kb/guide/ship-a-flask-app-on-vercel#monitor-performance-with-observability) for details.

## Limitations

All [Vercel Functions limitations](/docs/functions/limitations) apply to Flask applications, including:

- **Application size**: The Flask application becomes a single bundle, which has a standard bundle size limit of 500MB. [Large Functions](/docs/functions/limitations#large-functions-beta) support Python bundles up to 5GB on Fluid compute when enabled (public beta).

## More resources

For more about deploying Flask on Vercel, see:

- [Flask official documentation](https://flask.palletsprojects.com/)
- [Build with a Flask starter template](/kb/guide/build-with-a-flask-starter-template)
- [How to ship a Flask app on Vercel](/kb/guide/ship-a-flask-app-on-vercel)
- [Vercel Functions documentation](/docs/functions)
- [Backend templates on Vercel](https://vercel.com/templates?type=backend)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
