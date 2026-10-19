---
title: Set the Python version for your Vercel project
product: vercel
url: /docs/functions/runtimes/python/python-version
canonical_url: "https://vercel.com/docs/functions/runtimes/python/python-version"
last_updated: 2026-04-10
type: how-to
prerequisites:
  - /docs/functions/runtimes/python
  - /docs/functions/runtimes
related:
  - /docs/functions/runtimes/python
summary: Set the Python version for your Vercel project with pyproject.toml, .python-version, or Pipfile.lock.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/runtimes/python/python-version.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "2b2709e37349e68bbb1d4aa1ef88e7dd8e294d69aed41a5b5342fa8236766361"
---

# Set the Python version for your Vercel project

Set the Python version for your Vercel project with `pyproject.toml`,
`.python-version`, or `Pipfile.lock`. If you do not set a version, Vercel uses
the default Python version.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Migrate a Python API from Heroku to Vercel](https://vercel.com/kb/guide/migrate-a-python-api-from-heroku-to-vercel) — Move a FastAPI, Flask, or Django API from Heroku to Vercel Functions. Replace your Procfile, worker dynos, Heroku Schedu
- [Migrate a Python API from Railway to Vercel](https://vercel.com/kb/guide/migrate-a-python-api-from-railway-to-vercel) — Move a FastAPI, Flask, or Django API from Railway to Vercel Functions. Replace railway.json start commands, volumes, Cel
- [Migrate a Python API from Render to Vercel](https://vercel.com/kb/guide/migrate-a-python-api-from-render-to-vercel) — Move a FastAPI, Flask, or Django API from Render to Vercel Functions. Translate render.yaml and replace persistent disks
- [How to ship a Flask app on Vercel](https://vercel.com/kb/guide/ship-a-flask-app-on-vercel) — Deploy a Flask app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and con
- [Python 3.13 and 3.14 are now available ](https://vercel.com/changelog/python-3-13-and-3-14-are-now-available)
- [Python on Vercel is now generally available](https://vercel.com/changelog/python-on-vercel-is-now-generally-available)
- [Python 3.12 and Ruby 3.3 are now available](https://vercel.com/changelog/python-3-12-and-ruby-3-3-are-now-available)
- [Python on Vercel is now generally available](https://vercel.com/blog/python-on-vercel-is-now-generally-available)
- [Supported Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions) — Learn about the supported Node.js versions on Vercel.
- [General settings](https://vercel.com/docs/project-configuration/general-settings) — Configure basic settings for your Vercel project, including the project name, build and development settings, root direc
- [Package Managers](https://vercel.com/docs/package-managers) — Discover the package managers supported by Vercel for dependency management. Learn how Vercel detects and uses npm, Yarn
- [Deploying Bitbucket Projects with Vercel](https://vercel.com/docs/git/vercel-for-bitbucket) — ​Vercel for Bitbucket automatically deploys your Bitbucket projects with Vercel, providing Preview Deployment URLs, and

Full cross-link map for this page: [/docs/functions/runtimes/python/python-version.graph.md](/docs/functions/runtimes/python/python-version.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

- A Vercel project that uses the Python runtime
- One of the following files: `pyproject.toml`, `.python-version`, or
  `Pipfile.lock`

## Set the Python version

- ### Choose a supported version
  Vercel supports the following Python versions:
  - **3.12** (default)
  - **3.13**
  - **3.14**

- ### Add the version to a supported file
  Use one of the following files:

  **`pyproject.toml`**

  Add or update `requires-python` in the `[project]` section:
  ```toml filename="pyproject.toml"
  [project]
  requires-python = ">=3.12"
  ```
  **`.python-version`**

  Create or update a `.python-version` file:
  ```text filename=".python-version"
  3.13
  ```
  **`Pipfile.lock`**

  If you use Pipenv, update and commit `Pipfile.lock`.

- ### Redeploy your project
  Commit the change and redeploy your project.

## If the version is missing or unsupported

Vercel uses Python 3.12 when your repository does not define a supported Python
version.

## Related

- [Using the Python Runtime with Vercel Functions](/docs/functions/runtimes/python)


---

[View full sitemap](/docs/sitemap)
