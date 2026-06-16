---
title: Deploy a FastAPI app on Vercel
product: vercel
url: /docs/frameworks/backend/fastapi
canonical_url: "https://vercel.com/docs/frameworks/backend/fastapi"
last_updated: 2026-05-04
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
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "5b0f9986e9a037424359285ed7a9011a9f5f800bf7ad8345e138ea04c797be89"
---

# Deploy a FastAPI app on Vercel

Deploy a FastAPI app to Vercel with the Python runtime and Vercel Functions.
Vercel looks for a `FastAPI` instance named `app` at supported entrypoints in
your repository.

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
- the same filenames inside `src/`, `app/`, or `api/`

For example:

```py filename="src/index.py"
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
> Command](https://vercel.com/docs/project-configuration#buildcommand) in
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

## Serving static assets

To serve static assets, place them in the `public/**` directory. Vercel serves
those files from the [CDN](/docs/cdn) with default [headers](/docs/headers)
unless you override them in `vercel.json`.

```py filename="app.py" highlight={6}
from fastapi import FastAPI
from fastapi.responses import RedirectResponse

app = FastAPI()

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    # /vercel.svg is automatically served when included in the public/** directory.
    return RedirectResponse("/vercel.svg", status_code=307)
```

> **💡 Note:** `app.mount("/public", ...)` is not needed and should not be used.

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

## Limitations

All [Vercel Functions limitations](/docs/functions/limitations) apply to FastAPI applications, including:

- **Application size**: The FastAPI application becomes a single bundle, which must fit within the 500MB limit of Vercel Functions. Our bundling process removes `__pycache__` and `.pyc` files from the deployment's bundle to reduce size, but does not perform application bundling.

## More resources

For more about deploying FastAPI on Vercel, see:

- [FastAPI official documentation](https://fastapi.tiangolo.com/)
- [Vercel Functions documentation](/docs/functions)
- [Backend templates on Vercel](https://vercel.com/templates?type=backend)


---

[View full sitemap](/docs/sitemap)
