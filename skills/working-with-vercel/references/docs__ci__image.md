---
title: Images
product: vercel
url: /docs/ci/image
canonical_url: "https://vercel.com/docs/ci/image"
last_updated: 2026-10-28
type: reference
prerequisites:
  - /docs/ci
related:
  - /docs/ci/configuration
summary: Learn about the container images Vercel CI uses to run your tasks, and how to choose one.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ci/image.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "b1b35de14fbec26c8d557a8093a46596641291c029b9ed64676c351b7c282f77"
---

# Images

Vercel CI runs each task in a Linux container. You can choose between two images:

| Image        | Base image                                                                | Tag                 |
| ------------ | ------------------------------------------------------------------------- | ------------------- |
| Amazon Linux | [Amazon Linux 2023](https://aws.amazon.com/linux/amazon-linux-2023/) | `ci:os:amazonlinux` |
| Ubuntu       | [Ubuntu 24.04](https://releases.ubuntu.com/24.04/)                        | `ci:os:ubuntu`      |

Tasks without a `ci:os` tag use the Amazon Linux image. Both images run on the `x86_64` architecture.

## Pre-installed software

Both images include the same Node.js release and a standard set of CI tools:

| Software                                    | Amazon Linux                                     | Ubuntu                                              |
| ------------------------------------------- | ------------------------------------------------ | --------------------------------------------------- |
| Node.js                                     | `24.18.0`, with `npm` and `npx`                  | `24.18.0`, with `npm`, `npx`, and `corepack`        |
| Git                                         | `git`                                            | `git`, `openssh-client`                             |
| Build tools for native Node.js addons       | `gcc-c++`, `make`                                | `g++`, `make`, `python3`                            |
| Docker                                      | `docker`                                         | `docker.io`                                         |
| Archive tools                               | `tar`, `gzip`, `xz`, `zstd`                      | `tar`, `gzip`, `xz-utils`, `zstd`                   |
| Other utilities                             | `jq`, `diffutils`, `curl`                        | `jq`, `diffutils`, `curl`, `ca-certificates`        |
| Package manager                             | `dnf`                                            | `apt-get`                                           |

To use a tool that isn't in this list, install it during bootstrapping. See [Installing additional tools](/docs/ci/configuration#installing-additional-tools).

## Running containers in your tasks

Your tasks can build and run Docker containers. Both images include Docker, and Vercel CI starts the Docker daemon before your task's command runs, so you don't need to start it yourself.

For example, a task can build your app's image and run its tests inside the container:

```json filename="package.json"
{
  "scripts": {
    "test:container": "docker build -t my-app . && docker run --rm my-app npm test"
  }
}
```

### HTTPS requests from inside a container

Vercel CI uses its own certificate authority (CA) for your tasks' network traffic. Containers you start with `docker run` don't trust that CA by default, so HTTPS requests from inside them can fail with certificate errors.

To fix this, use `vercel-ci-docker-run` instead of `docker run`. It's included in both images and accepts the same arguments:

```bash filename="terminal"
vercel-ci-docker-run --rm node:24 npm view next version
```

`vercel-ci-docker-run` mounts the Vercel CI CA bundle into the container at `/run/vercel/ca-certificates.crt` and points these environment variables at it:

- `AWS_CA_BUNDLE`
- `CARGO_HTTP_CAINFO`
- `CURL_CA_BUNDLE`
- `GIT_SSL_CAINFO`
- `GRPC_DEFAULT_SSL_ROOTS_FILE_PATH`
- `NODE_EXTRA_CA_CERTS`, with `NODE_USE_SYSTEM_CA=1`
- `NPM_CONFIG_CAFILE`
- `PIP_CERT`
- `REQUESTS_CA_BUNDLE`
- `SSL_CERT_FILE`

`vercel-ci-docker-run` only replaces `docker run`. It doesn't configure Docker Compose or `docker build`. Applications with their own trust store might need extra setup in their image.

## Choosing an image for a task

Add a `ci:os` tag next to the `ci` tag on a task in your root `turbo.json`:

```json filename="turbo.json" {4}
{
  "tasks": {
    "test": {
      "tags": ["ci", "ci:os:ubuntu"]
    }
  }
}
```

A task can have only one `ci:os` tag. Tagging a task with both `ci:os:amazonlinux` and `ci:os:ubuntu` makes your Vercel CI configuration invalid.

## Choosing an image for a package

To set the default image for every task in a package, add a `ci:os` tag to the top-level `tags` field of the package's [Package Configuration](https://turborepo.dev/docs/reference/package-configurations):

```json filename="apps/web/turbo.json" {3}
{
  "extends": ["//"],
  "tags": ["ci:os:ubuntu"]
}
```

A `ci:os` tag on a task takes precedence over the package's top-level `ci:os` tag.

To change the image for one task in one package, add the tag to that task in the Package Configuration. Start the `tags` array with `$TURBO_EXTENDS$` so the task keeps the `ci` tag from the root `turbo.json`:

```json filename="apps/web/turbo.json" {5}
{
  "extends": ["//"],
  "tasks": {
    "test": {
      "tags": ["$TURBO_EXTENDS$", "ci:os:ubuntu"]
    }
  }
}
```

## Dependency installation

Vercel CI installs your repository's dependencies with the Amazon Linux image, whatever `ci:os` tags your tasks use. To change the resources for this step, see [Bootstrapping resources](/docs/ci/configuration#bootstrapping-resources).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
