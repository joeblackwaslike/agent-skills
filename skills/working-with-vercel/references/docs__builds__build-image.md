---
title: Build image overview
product: vercel
url: /docs/builds/build-image
canonical_url: "https://vercel.com/docs/builds/build-image"
last_updated: 2026-07-01
type: reference
prerequisites:
  - /docs/builds
related:
  - /docs/builds
  - /docs/functions/runtimes
  - /docs/functions/runtimes/node-js
  - /docs/functions/runtimes/python
  - /docs/functions/runtimes/ruby
summary: Learn about the container image used for Vercel builds.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/builds/build-image.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "0ae1fe7afe226bcc402490c9113216226e4ec504e40abff969bd965843621926"
---

# Build image overview

When you initiate a deployment, Vercel will [build your project](/docs/builds) within a container using the build image.
Vercel supports [multiple runtimes](/docs/functions/runtimes).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Does Vercel support Docker deployments?](https://vercel.com/kb/guide/does-vercel-support-docker-deployments?from=related) — Vercel supports deploying OCI-compatible container images through Vercel Functions and Vercel Container Registry, with A
- [Running Docker on Vercel](https://vercel.com/kb/guide/docker?from=related) — Learn how to run Docker on Vercel by deploying OCI container images as Vercel Functions, storing them in Vercel Containe
- [Deploy Rust on Vercel with Docker](https://vercel.com/kb/guide/deploy-rust-on-vercel-with-docker?from=related) — Build a Rust application with Axum and Docker, then deploy it to Vercel Functions. Learn how to configure environment va
- [Deploy a Node.js Fastify app on Vercel with Docker](https://vercel.com/kb/guide/deploy-nodejs-on-vercel-with-docker?from=related) — Build a Node.js application with Fastify and Docker, then deploy it to Vercel Functions. Learn how to configure environm
- [vercel build](https://vercel.com/docs/cli/build?from=related) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
- [Build System](https://vercel.com/docs/fundamentals/builds?from=related) — Learn how Vercel transforms your source code into optimized assets ready to serve globally.
- [Getting Started](https://vercel.com/docs/container-registry/getting-started?from=related) — Learn about getting started on Vercel.
- [Build Output API](https://vercel.com/docs/build-output-api?from=related) — The Build Output API is a file-system-based specification for a directory structure that can produce a Vercel deployment
- [vercel vcr](https://vercel.com/docs/cli/vcr?from=related) — Manage Vercel Container Registry from the Vercel CLI: list, inspect, create, and delete repositories, browse tags, and m

Full cross-link map for this page: [/docs/builds/build-image.graph.md](/docs/builds/build-image.graph.md)
<!-- /docsgraph:related -->

| Runtime                                                           | [Build image](/docs/builds/build-image)                 |
| ----------------------------------------------------------------- | ------------------------------------------------------- |
| [Node.js](/docs/functions/runtimes/node-js)                       | `24.x` `22.x` `20.x`                                    |
| [Python](/docs/functions/runtimes/python)                         | `3.14`, `3.13`, `3.12`                                  |
| [Ruby](/docs/functions/runtimes/ruby)                             | `3.3.x`                                                 |
|                                                  |  |
| [Edge](/docs/functions/runtimes/edge)                     |  |
| [Community Runtimes](/docs/functions/runtimes#community-runtimes) |  |

The build image uses [Amazon Linux 2023](https://aws.amazon.com/linux/amazon-linux-2023/) as its base image.

## Pre-installed packages

The following packages are pre-installed in the build image with `dnf`, the default package manager for Amazon Linux 2023.

## Running the build image locally

Vercel does not provide the build image itself, but you can use the Amazon Linux 2023 base image to test things locally:

```bash filename="terminal"
docker run --rm -it amazonlinux:2023.2.20231011.0 sh
```

When you are done, run `exit` to return.

## Installing additional packages

You can install additional packages into the build container by configuring the [Install Command](/docs/builds/configure-a-build#install-command) within the dashboard or the [`"installCommand"`](/docs/project-configuration/vercel-json#installcommand) in your `vercel.json` to use any of the following commands.

The build image includes access to repositories with stable versions of popular packages. You can list all packages with the following command:

```bash filename="terminal"
dnf list
```

You can search for a package by name with the following command:

```bash filename="terminal"
dnf search my-package-here
```

You can install a package by name with the following command:

```bash filename="terminal"
dnf install -y my-package-here
```


---

[View full sitemap](/docs/sitemap)
