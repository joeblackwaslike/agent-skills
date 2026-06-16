---
title: Deploy a Django app on Vercel
product: vercel
url: /docs/frameworks/full-stack/django
canonical_url: "https://vercel.com/docs/frameworks/full-stack/django"
last_updated: 2026-05-04
type: how-to
prerequisites:
  - /docs/frameworks/full-stack
  - /docs/frameworks
related:
  - /docs/cli/init
  - /docs/project-configuration
  - /docs/cli/deploy
  - /docs/cdn
  - /docs/environment-variables
summary: Deploy a Django app on Vercel. Learn how the Python runtime, WSGI, ASGI, static assets, and Vercel Functions work together.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/full-stack/django.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "644f83c22f4598c400d94567cc60c8ce71c6468b71f89d9e99e305c871b28386"
---

# Deploy a Django app on Vercel

Deploy a Django app to Vercel with the Python runtime and Vercel Functions.
Vercel detects `manage.py` and reads your WSGI or ASGI entrypoint from your
project settings.

## Create or import your project

Create a Django project or use an existing one:

### Get started with Vercel CLI

Initialize a new Django project with the [Vercel CLI `init` command](/docs/cli/init):

```bash filename="terminal"
vc init django
```

This clones the [Django example repository](https://github.com/vercel/vercel/tree/main/examples/django) into a directory called `django`.

## Configure the Django entrypoint

Vercel automatically detects Django projects by locating `manage.py` in your repository. Vercel then executes `manage.py` to discover your `DJANGO_SETTINGS_MODULE` and determines the entrypoint from `WSGI_APPLICATION` or `ASGI_APPLICATION`.

For a WSGI app (the default), configure your settings and `wsgi.py`:

```py filename="myproject/settings.py"
WSGI_APPLICATION = 'myproject.wsgi.application'
```

```py filename="myproject/wsgi.py"
import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')

application = get_wsgi_application()
```

For an ASGI app, set `ASGI_APPLICATION` instead and define `application` in `asgi.py`:

```py filename="myproject/settings.py"
ASGI_APPLICATION = 'myproject.asgi.application'
```

```py filename="myproject/asgi.py"
import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')

application = get_asgi_application()
```

> **💡 Note:** When both `ASGI_APPLICATION` and `WSGI_APPLICATION` are set in your Django
> settings, Vercel uses the ASGI entrypoint.

To point Vercel to a Django app in a custom module, set `tool.vercel.entrypoint` in `pyproject.toml`:

```toml filename="pyproject.toml"
[tool.vercel]
entrypoint = "myproject.wsgi:application"
```

The `tool.vercel.entrypoint` value tells Vercel to look for a WSGI instance named `application` in `./myproject/wsgi.py`.

### Build command

The `build` property in `[tool.vercel.scripts]` defines the Build Command for Django deployments. It runs after dependencies are installed and before Vercel deploys your application:

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

A [Build Command](/docs/project-configuration#buildcommand) defined in `vercel.json` or in the Project Settings dashboard takes precedence over a build script in `pyproject.toml`.

> **💡 Note:** There is no need to call `collectstatic` in a build script. Vercel runs it
> automatically. See [Serving static assets](#serving-static-assets) for more
> details.

### Local development

Use `vercel dev` to run your application locally:

```bash filename="terminal"
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
vercel dev
```

> **💡 Note:** Minimum CLI version required: 50.38.0

### Deploying the application

Deploy the project by connecting your Git repository or by using the [Vercel CLI](/docs/cli/deploy):

```bash filename="terminal"
vc deploy
```

> **💡 Note:** Minimum CLI version required: 50.38.0

## Serving static assets

When your Django project has `STATIC_ROOT` configured, Vercel automatically runs `collectstatic` during the build and serves the collected files from the [Vercel CDN](/docs/cdn). Files are served at `STATIC_URL` (Django's default is `/static/`).

No additional configuration is needed. `{% static %}` template tags work in both production and local development with `vercel dev`.

Supported storage backends:

- `StaticFilesStorage` (default)
- `ManifestStaticFilesStorage`
- WhiteNoise `CompressedManifestStaticFilesStorage`

### django-storages

If Vercel detects `django-storages` as the storage backend, it runs `collectstatic` with your original settings so files are uploaded directly to your storage provider during the build. Set any required environment variables for your storage provider in your [Vercel project environment variables](/docs/environment-variables).

### WhiteNoise

[WhiteNoise](https://whitenoise.readthedocs.io/) is compatible with Vercel. In production, static files are served from the CDN. WhiteNoise is only active when running locally with `vercel dev`.

> **💡 Note:** If `WHITENOISE_USE_FINDERS = True` is set, then `STATIC_ROOT` is not required
> and Vercel will collect static files directly from your app directories.

## Environment variables

When you add a database or other integration to your Vercel project, Vercel automatically sets environment variables like `DATABASE_URL`. You can access these in your Django settings through `os.environ`. See [environment variables](/docs/environment-variables) for more details.

### Using environment variables in settings.py

For example, to configure a PostgreSQL database using `DATABASE_URL`:

```py filename="myproject/settings.py"
import os
import urllib.parse

if os.environ.get("DATABASE_URL"):
    url = urllib.parse.urlparse(os.environ["DATABASE_URL"])
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": url.path.lstrip("/"),
            "USER": url.username,
            "PASSWORD": url.password,
            "HOST": url.hostname,
            "PORT": url.port,
        }
    }
else:
    # Fall back to SQLite for local development
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
```

### Loading environment variables locally

To use environment variables locally (for example, to run migrations), first pull them with [`vercel pull`](/docs/cli/pull):

```bash filename="terminal"
vercel pull
```

This saves your environment variables to `.env.local`. Then load them in `manage.py` using `dotenv` or `django-environ`:

```py filename="manage.py (dotenv)"
from dotenv import load_dotenv
load_dotenv(".env.local")
```

```py filename="manage.py (django-environ)"
import environ
environ.Env.read_env(".env.local")
```

> **⚠️ Warning:** Never commit `.env.local` to version control. Add it to your `.gitignore` file
> to avoid exposing secrets.

## Vercel Functions

When you deploy a Django app to Vercel, it becomes a single [Vercel
Function](/docs/functions). Vercel uses [Fluid
compute](/docs/fluid-compute) by default, so the function scales with traffic.

## Limitations

All [Vercel Functions limitations](/docs/functions/limitations) apply to Django applications, including:

- **Application size**: The Django application becomes a single bundle, which must fit within the 500 MB limit of Vercel Functions. The bundling process removes `__pycache__` and `.pyc` files from the deployment's bundle to reduce size, but does not perform application bundling.

## More resources

For more about deploying Django on Vercel, see:

- [Django official documentation](https://docs.djangoproject.com/)
- [Vercel Functions documentation](/docs/functions)
- [Backend templates on Vercel](https://vercel.com/templates?type=backend)


---

[View full sitemap](/docs/sitemap)
