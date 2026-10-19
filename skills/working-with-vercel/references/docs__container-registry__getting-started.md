---
title: Getting Started
product: vercel
url: /docs/container-registry/getting-started
canonical_url: "https://vercel.com/docs/container-registry/getting-started"
last_updated: 2026-08-13
type: tutorial
prerequisites:
  - /docs/container-registry
related:
  - /docs/cli
  - /docs/container-registry
  - /docs/sandbox/concepts/images
  - /docs/functions/container-images
  - /docs/container-registry/cli-reference
summary: Authenticate your container tool with Vercel Container Registry, then push and pull your first image with the Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/container-registry/getting-started.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "f38f977f1fdf3bf795faced8a10801819fe53cf6b9710608bd8716d0e3777424"
---

# Getting Started

Push your first image to Vercel Container Registry (VCR) with the Vercel CLI, then pull it back with your container tool.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to use Vercel Container Registry](https://vercel.com/kb/guide/how-to-use-vercel-container-registry) — Push, store, and pull OCI container images with Vercel Container Registry, then deploy them to Vercel Functions and Verc
- [How to migrate from GHCR to Vercel Container Registry](https://vercel.com/kb/guide/migrate-ghcr-to-vcr) — Migrate container images from GitHub Container Registry \\(GHCR\\) to Vercel Container Registry \\(VCR\\), including authent
- [Manage Vercel Container Registry with Vercel CLI](https://vercel.com/changelog/manage-vercel-container-registry-with-vercel-cli)
- [Running Docker on Vercel](https://vercel.com/kb/guide/docker) — Learn how to run Docker on Vercel by deploying OCI container images as Vercel Functions, storing them in Vercel Containe
- [Introducing VCR: Vercel Container Registry](https://vercel.com/changelog/introducing-vcr-vercel-container-registry)
- [Does Vercel support Docker deployments?](https://vercel.com/kb/guide/does-vercel-support-docker-deployments) — Vercel supports deploying OCI-compatible container images through Vercel Functions and Vercel Container Registry, with A
- [Push images to Vercel Container Registry from GitHub Actions](https://vercel.com/changelog/vcr-login-github-action)
- [vercel vcr](https://vercel.com/docs/cli/vcr) — Manage Vercel Container Registry from the Vercel CLI: build and push images, manage repositories, tags, and images, and
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [Build image overview](https://vercel.com/docs/builds/build-image) — Learn about the container image used for Vercel builds.

Full cross-link map for this page: [/docs/container-registry/getting-started.graph.md](/docs/container-registry/getting-started.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

- A [Vercel account](/signup)
- The [Vercel CLI](/docs/cli)
- Docker, Podman, or Buildah installed and on your `PATH`
- A `Dockerfile` or `Containerfile`

- ### Link your project and authenticate
  Every VCR repository belongs to a Vercel project. Link your project directory, then authenticate your container tool:
  ```bash filename="terminal"
  vercel link
  vercel vcr login docker
  ```
  Vercel mints a short-lived, project-scoped OpenID Connect (OIDC) token and passes it to the container tool with the username `oidc`. The credentials are valid for 12 hours. Re-run the command to refresh them. Use `--project` to authenticate a different project.

  To authenticate with a long-lived Vercel token instead, see [Authenticate with a Vercel token](/docs/container-registry#authenticate-with-a-vercel-token).

- ### Push an image
  Build the current directory and push it in one step:
  ```bash filename="terminal"
  vercel vcr build docker . --push
  ```
  You don't need to create a repository first. VCR creates one named after your project on the first push. To use a different repository name or tag, pass `name[:tag]`, for example `vercel vcr build docker . my-repository:1.2.3 --push`.

  To build and push with your container tool instead of the Vercel CLI, see [Use your container tool directly](/docs/container-registry#use-your-container-tool-directly).

- ### Pull an image
  Print the full image reference for a tag, then pull that reference with your container tool. `tag inspect` reports the values to use in place of `team-slug` and `project-name`. With the default push, the repository is named after your project, so `project-name` appears twice in the reference. If you passed a `name[:tag]` when pushing, use that repository name in the `tag inspect` command and as the last segment of the reference instead:
  ```bash filename="terminal"
  vercel vcr tag inspect project-name latest
  docker pull vcr.vercel.com/team-slug/project-name/project-name:latest
  ```

## Next steps

- [Use the image with Vercel Sandbox](/docs/sandbox/concepts/images#custom-images)
- [Use the image with Vercel Functions](/docs/functions/container-images#usage)
- [Manage repositories with the Vercel CLI](/docs/container-registry/cli-reference)


---

[View full sitemap](/docs/sitemap)
