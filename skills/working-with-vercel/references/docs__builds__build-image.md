---
title: Build image overview
product: vercel
url: /docs/builds/build-image
canonical_url: "https://vercel.com/docs/builds/build-image"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/builds
related:
  - /docs/builds
  - /docs/functions/runtimes
  - /docs/functions/runtimes/node-js
  - /docs/functions/runtimes/edge-runtime
  - /docs/functions/runtimes/python
summary: Learn about the container image used for Vercel builds.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/builds/build-image.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "2db9adb5cc7bc8b19d64dfc49f344f0181601fbbca066f470608afdf90431b18"
---

# Build image overview

When you initiate a deployment, Vercel will [build your project](/docs/builds) within a container using the build image.
Vercel supports [multiple runtimes](/docs/functions/runtimes).

| Runtime                                                           | [Build image](/docs/builds/build-image)                 |
| ----------------------------------------------------------------- | ------------------------------------------------------- |
| [Node.js](/docs/functions/runtimes/node-js)                       | `24.x` `22.x` `20.x`                                    |
| [Edge](/docs/functions/runtimes/edge-runtime)                     |  |
| [Python](/docs/functions/runtimes/python)                         | `3.12`                                                  |
| [Ruby](/docs/functions/runtimes/ruby)                             | `3.3.x`                                                 |
|                                                  |  |
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

You can install additional packages into the build container by configuring the [Install Command](/docs/deployments/configure-a-build#install-command) within the dashboard or the [`"installCommand"`](/docs/project-configuration#installcommand) in your `vercel.json` to use any of the following commands.

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
