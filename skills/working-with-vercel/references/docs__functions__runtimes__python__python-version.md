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
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "93e901e218b90c9559ae3e8485265c6f6af7dc939adfc6360aa3119cd4bc3964"
---

# Set the Python version for your Vercel project

Set the Python version for your Vercel project with `pyproject.toml`,
`.python-version`, or `Pipfile.lock`. If you do not set a version, Vercel uses
the default Python version.

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
