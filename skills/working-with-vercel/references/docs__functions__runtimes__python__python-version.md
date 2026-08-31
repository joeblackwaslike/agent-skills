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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "0e925536435e471705bfc1d58e0fd08b2e3abdcbf3a5932528630ffe5d27c1fe"
---

# Set the Python version for your Vercel project

Set the Python version for your Vercel project with `pyproject.toml`,
`.python-version`, or `Pipfile.lock`. If you do not set a version, Vercel uses
the default Python version.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to ship a Flask app on Vercel](https://vercel.com/kb/guide/ship-a-flask-app-on-vercel?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fpython%2Fpython-version&source_site=vercel-docs&relationship=related) — Deploy a Flask app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and con
- [Python 3.13 and 3.14 are now available ](https://vercel.com/changelog/python-3-13-and-3-14-are-now-available?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fpython%2Fpython-version&source_site=vercel-docs&relationship=related)
- [How do I use the latest npm version for my Vercel Deployment?](https://vercel.com/kb/guide/how-do-i-use-the-latest-npm-version-for-my-vercel-deployment?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fpython%2Fpython-version&source_site=vercel-docs&relationship=related) — Learn how to use the latest npm version for Vercel deployments.
- [Python 3.12 and Ruby 3.3 are now available](https://vercel.com/changelog/python-3-12-and-ruby-3-3-are-now-available?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fpython%2Fpython-version&source_site=vercel-docs&relationship=related)
- [Supported Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fpython%2Fpython-version&source_site=vercel-docs&relationship=related) — Learn about the supported Node.js versions on Vercel.
- [Configuring the Runtime for Vercel Functions](https://vercel.com/docs/functions/configuring-functions/runtime?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fpython%2Fpython-version&source_site=vercel-docs&relationship=related) — Learn how to configure the runtime for Vercel Functions.
- [General settings](https://vercel.com/docs/project-configuration/general-settings?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fpython%2Fpython-version&source_site=vercel-docs&relationship=related) — Configure basic settings for your Vercel project, including the project name, build and development settings, root direc
- [Package Managers](https://vercel.com/docs/package-managers?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fpython%2Fpython-version&source_site=vercel-docs&relationship=related) — Discover the package managers supported by Vercel for dependency management. Learn how Vercel detects and uses npm, Yarn
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fpython%2Fpython-version&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/functions/runtimes/python/python-version.graph.md](/docs/functions/runtimes/python/python-version.graph.md?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fpython%2Fpython-version&source_site=vercel-docs&relationship=graph)
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
