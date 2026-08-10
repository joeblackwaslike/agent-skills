---
title: Getting Started
product: vercel
url: /docs/container-registry/getting-started
canonical_url: "https://vercel.com/docs/container-registry/getting-started"
last_updated: 2018-10-20
type: tutorial
prerequisites:
  - /docs/container-registry
related:
  - /docs/cli
  - /docs/cli/link
  - /docs/sandbox/concepts/images
  - /docs/functions/container-images
  - /docs/container-registry/cli-reference
summary: Learn about getting started on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/container-registry/getting-started.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "19cb99b1671c40fa61ae383aa23f5eeebfdc16a678103b9eacc60f6c1843cc0a"
---

# Getting Started

Create a Vercel Container Registry (VCR) repository, authenticate your container tool, then push and pull your first image.

## Prerequisites

- A [Vercel account](/signup)
- The [Vercel CLI](/docs/cli)
- A `Dockerfile`

- ### Create a repository
  Create a VCR repository from your project dashboard:
  1. Open [**Images**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fimages\&title=Go+to+Images) in your project dashboard.
  2. Click **Create Repository**.
  3. Enter a repository name, such as `my-repository`.
  You can also push to a new repository path with Docker-compatible tooling. VCR creates the repository automatically when your authenticated account has access to the project.

- ### Authenticate to VCR
  The recommended way to authenticate is with OpenID Connect (OIDC) through the [Vercel CLI](/docs/cli). In a [linked project](/docs/cli/link), `vercel vcr login` authenticates a container tool with VCR. It supports Docker, Podman, and Buildah:
  ```bash filename="terminal"
  vercel link
  vercel vcr login docker
  ```
  Vercel mints a short-lived, project-scoped OIDC token and passes it to the container tool with the username `oidc`. The credentials are valid for 12 hours. Re-run the command to refresh them. Use `--project` to authenticate a different project.

  Alternatively, create a Vercel token from the [Account Tokens page](/account/tokens), then set `VERCEL_TOKEN` to that value:
  ```bash filename="terminal"
  printf '%s' "$VERCEL_TOKEN" | docker login vcr.vercel.com \
    --username "$VERCEL_TEAM_ID" \
    --password-stdin
  ```
  For token authentication, the Docker username is the team ID that owns the project. Docker prints `Login Succeeded` when authentication succeeds:
  ```txt
  Login Succeeded
  ```

- ### Push an image
  The recommended way to push an image is through the [Vercel CLI](/docs/cli). After authenticating, use `vercel vcr build` to build and push to VCR:
  ```bash filename="terminal"
  vercel vcr build docker . my-repository:latest --push
  ```
  Alternatively, build and push the image with Docker Buildx:
  > **💡 Note:** Vercel recommends zstd compression for images pushed to VCR.
  ```bash filename="terminal"
  docker buildx build \
    --platform linux/amd64,linux/arm64 \
    --output "type=image,name=vcr.vercel.com/team-slug/project-slug/my-repository:latest,push=true,oci-mediatypes=true,compression=zstd,compression-level=3,force-compression=true" \
    --push .
  ```
  If Docker Buildx is unavailable, build and push the image with Docker. This command does not set zstd compression:
  ```bash filename="terminal"
  docker build \
    -t vcr.vercel.com/team-slug/project-slug/my-repository:latest \
    .

  docker push vcr.vercel.com/team-slug/project-slug/my-repository:latest
  ```

- ### Pull an image
  Pull the VCR image with the same full repository path:
  ```bash filename="terminal"
  docker pull vcr.vercel.com/team-slug/project-slug/my-repository:latest
  ```

## Next steps

- [Use the image with Vercel Sandbox](/docs/sandbox/concepts/images#custom-images)
- [Use the image with Vercel Functions](/docs/functions/container-images#usage)
- [Manage repositories with the Vercel CLI](/docs/container-registry/cli-reference)


---

[View full sitemap](/docs/sitemap)
