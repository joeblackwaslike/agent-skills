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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "20f7422410b83f1389a4204ea5baa678130766ba982a038a8204449409f5a808"
---

# Set the Python version for your Vercel project

Set the Python version for your Vercel project with `pyproject.toml`,
`.python-version`, or `Pipfile.lock`. If you do not set a version, Vercel uses
the default Python version.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to ship a Flask app on Vercel](https://vercel.com/kb/guide/ship-a-flask-app-on-vercel?from=related) — Deploy a Flask app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and con
- [How do I use the latest npm version for my Vercel Deployment?](https://vercel.com/kb/guide/how-do-i-use-the-latest-npm-version-for-my-vercel-deployment?from=related) — Learn how to use the latest npm version for Vercel deployments.
- [Supported Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions?from=related) — Learn about the supported Node.js versions on Vercel.
- [Runtime](https://vercel.com/docs/functions/configuring-functions/runtime?from=related) — Learn how to configure the runtime for Vercel Functions.
- [Ruby](https://vercel.com/docs/functions/runtimes/ruby?from=related) — Learn how to use the Ruby runtime to compile Ruby Vercel Functions on Vercel.
- [Flask](https://vercel.com/docs/frameworks/backend/flask?from=related) — Deploy a Flask app on Vercel. Learn how the Python runtime, WSGI, static assets, and Vercel Functions work together.
- [General Settings](https://vercel.com/docs/project-configuration/general-settings?from=related) — Configure basic settings for your Vercel project, including the project name, build and development settings, root direc

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
