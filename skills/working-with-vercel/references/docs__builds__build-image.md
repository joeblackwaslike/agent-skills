---
title: Build image overview
product: vercel
url: /docs/builds/build-image
canonical_url: "https://vercel.com/docs/builds/build-image"
last_updated: 2026-08-11
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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "df2215b333a0e3779f5741b4e2c616f0647ec962de5504f42cb5f4c1aac1246d"
---

# Build image overview

When you initiate a deployment, Vercel will [build your project](/docs/builds) within a container using the build image.
Vercel supports [multiple runtimes](/docs/functions/runtimes).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vlt is now available in builds via zero configuration](https://vercel.com/changelog/vlt-is-now-available-in-builds-via-zero-configuration)
- [Does Vercel support Docker deployments?](https://vercel.com/kb/guide/does-vercel-support-docker-deployments) — Vercel supports deploying OCI-compatible container images through Vercel Functions and Vercel Container Registry, with A
- [Running Docker on Vercel](https://vercel.com/kb/guide/docker) — Learn how to run Docker on Vercel by deploying OCI container images as Vercel Functions, storing them in Vercel Containe
- [How to install system packages in Vercel Sandbox](https://vercel.com/kb/guide/how-to-install-system-packages-in-vercel-sandbox) — Learn how to install additional system packages in Vercel Sandbox with apt-get on the default Ubuntu-based managed image
- [vercel build](https://vercel.com/docs/cli/build) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
- [Container Runtime](https://vercel.com/docs/functions/runtimes/container) — Run any code and library on Vercel Functions with an OCI container image built from a Dockerfile or Containerfile at the
- [How Vercel builds your application](https://vercel.com/docs/fundamentals/builds) — Learn how Vercel transforms your source code into optimized assets ready to serve globally.
- [Vercel Container Registry](https://vercel.com/docs/container-registry) — Store and manage Docker container images on Vercel. Build and push images with the Vercel CLI, then run them on Vercel F
- [Build Output API](https://vercel.com/docs/build-output-api) — The Build Output API is a file-system-based specification for a directory structure that can produce a Vercel deployment

Full cross-link map for this page: [/docs/builds/build-image.graph.md](/docs/builds/build-image.graph.md)
<!-- /docsgraph:related -->

| Runtime                                                           | [Build image](/docs/builds/build-image)                 |
| ----------------------------------------------------------------- | ------------------------------------------------------- |
| [Node.js](/docs/functions/runtimes/node-js)                       | `24.x` `22.x`                                           |
| [Python](/docs/functions/runtimes/python)                         | `3.14`, `3.13`, `3.12`                                  |
| [Ruby](/docs/functions/runtimes/ruby)                             | `3.3.x`                                                 |
| [Go](/docs/functions/runtimes/go)                                                 | (Supported) |
| [Edge](/docs/functions/runtimes/edge)                     | (Supported) |
| [Community Runtimes](/docs/functions/configuring-functions/runtime#other-runtimes) | (Supported) |

The build image uses [Amazon Linux 2023](https://aws.amazon.com/linux/amazon-linux-2023/) as its base image.

## Pre-installed packages

The following packages are pre-installed in the build image with `dnf`, the default package manager for Amazon Linux 2023.

## Running the build image locally

Vercel does not provide the build image itself, but you can use the Amazon Linux 2023 base image to test things locally:

```bash filename="terminal"
docker run --rm -it public.ecr.aws/amazonlinux/amazonlinux:2023.11.20260509.0 sh
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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
