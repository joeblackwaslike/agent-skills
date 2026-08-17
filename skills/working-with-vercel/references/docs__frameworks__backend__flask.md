---
title: Deploy a Flask app on Vercel
product: vercel
url: /docs/frameworks/backend/flask
canonical_url: "https://vercel.com/docs/frameworks/backend/flask"
last_updated: 2026-07-22
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
summary: Deploy a Flask app on Vercel. Learn how the Python runtime, WSGI, static assets, and Vercel Functions work together.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/backend/flask.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "d9c495430ee7e8f88444dfdad3ecb4b5cc5f56c998435574208ba231659405a7"
---

# Deploy a Flask app on Vercel

Deploy a Flask app to Vercel with the Python runtime and Vercel Functions.
Vercel looks for a `Flask` instance named `app` at supported entrypoints in
your repository.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to ship a FastAPI app on Vercel](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel?from=related) — Deploy a FastAPI app to Vercel with zero configuration. Learn how the Python runtime, Vercel Functions, streaming, middl
- [How to ship a Fastify app on Vercel](https://vercel.com/kb/guide/ship-a-fastify-app-on-vercel?from=related) — Deploy a Fastify app to Vercel with zero configuration, then add streaming, lifecycle hooks, cron jobs, and observabilit
- [Build with a FastAPI starter template](https://vercel.com/kb/guide/build-with-a-fastapi-starter-template?from=related) — Browse FastAPI starter templates for Vercel and deploy one in a few steps. Compare minimal, AI, agent, and full-stack Fa
- [Deploy a Node.js Fastify app on Vercel with Docker](https://vercel.com/kb/guide/deploy-nodejs-on-vercel-with-docker?from=related) — Build a Node.js application with Fastify and Docker, then deploy it to Vercel Functions. Learn how to configure environm
- [FastAPI](https://vercel.com/docs/frameworks/backend/fastapi?from=related) — Deploy a FastAPI app on Vercel. Learn how the Python runtime, ASGI, static assets, and Vercel Functions work together.
- [Django](https://vercel.com/docs/frameworks/full-stack/django?from=related) — Deploy a Django app on Vercel. Learn how the Python runtime, WSGI, ASGI, static assets, and Vercel Functions work togeth
- [Fastify](https://vercel.com/docs/frameworks/backend/fastify?from=related) — Deploy Fastify applications to Vercel with zero configuration.
- [Express](https://vercel.com/docs/frameworks/backend/express?from=related) — Deploy Express applications to Vercel with zero configuration. Learn about middleware and Vercel Functions.
- [Celery](https://vercel.com/docs/frameworks/backend/celery?from=related) — Deploy Celery on Vercel. Learn how Celery workers use Vercel Queues and Vercel Functions to run background tasks without

Full cross-link map for this page: [/docs/frameworks/backend/flask.graph.md](/docs/frameworks/backend/flask.graph.md)
<!-- /docsgraph:related -->

## Create or import your app

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
