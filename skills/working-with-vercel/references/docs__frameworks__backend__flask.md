---
title: Deploy a Flask app on Vercel
product: vercel
url: /docs/frameworks/backend/flask
canonical_url: "https://vercel.com/docs/frameworks/backend/flask"
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
summary: Deploy a Flask app on Vercel. Learn how the Python runtime, WSGI, static assets, and Vercel Functions work together.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/backend/flask.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "cc2ddd8ad51c4a63ddb1b592324b020c20edb15b1ad31d1316b2f48d25d1cc4f"
---

# Deploy a Flask app on Vercel

Deploy a Flask app to Vercel with the Python runtime and Vercel Functions.
Vercel looks for a `Flask` instance named `app` at supported entrypoints in
your repository.

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
- the same filenames inside `src/`, `app/`, or `api/`

For example:

```py filename="src/index.py"
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

## Limitations

All [Vercel Functions limitations](/docs/functions/limitations) apply to Flask applications, including:

- **Application size**: The Flask application becomes a single bundle, which must fit within the 500MB limit of Vercel Functions. Our bundling process removes `__pycache__` and `.pyc` files from the deployment's bundle to reduce size, but does not perform application bundling.

## More resources

For more about deploying Flask on Vercel, see:

- [Flask official documentation](https://flask.palletsprojects.com/)
- [Vercel Functions documentation](/docs/functions)
- [Backend templates on Vercel](https://vercel.com/templates?type=backend)


---

[View full sitemap](/docs/sitemap)
