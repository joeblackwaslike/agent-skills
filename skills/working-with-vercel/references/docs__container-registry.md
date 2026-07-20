---
title: Vercel Container Registry
product: vercel
url: /docs/container-registry
canonical_url: "https://vercel.com/docs/container-registry"
last_updated: 2026-07-10
type: how-to
prerequisites:
  []
related:
  - /docs/functions/container-images
  - /docs/sandbox/concepts/images
  - /docs/cli
  - /docs/cli/link
  - /docs/container-registry/cli-reference
summary: Store and manage Docker container images on Vercel. Push images built from a Dockerfile, then run them on Vercel Functions or in Vercel Sandbox.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/container-registry.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "1b2f764c7198b198464fb77fc0619de3befc55dfd6814355176ba6d391d3446d"
---

# Vercel Container Registry

Vercel Container Registry (VCR) is a Docker-compatible container registry built into Vercel. Use VCR to store, push, and pull the Docker images you build from a Dockerfile or Containerfile, then run them on [Vercel Functions](/docs/functions/container-images) or use them as custom [Vercel Sandbox](/docs/sandbox/concepts/images) images.

VCR uses the Docker Registry HTTP API v2 using the OCI format. You can use Docker-compatible tooling to authenticate, push images, and pull images from `vcr.vercel.com`.

## How VCR repositories work

A VCR repository belongs to a Vercel project. A full image reference includes the registry host, team slug, project slug, repository name, and tag or digest:

```txt
vcr.vercel.com/team-slug/project-slug/my-repository:latest
```

Repository names can include lowercase letters, numbers, periods, underscores, and dashes. The name can't start or end with a period, underscore, or dash.

## Create a repository

Create a VCR repository from your project dashboard:

1. Open [**Images**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fimages\&title=Go+to+Images) in your project dashboard.
2. Click **Create Repository**.
3. Enter a repository name, such as `my-repository`.

You can also push to a new repository path with Docker-compatible tooling. VCR creates the repository automatically when your authenticated account has access to the project.

## Authenticate a container tool to VCR

The recommended way to authenticate is with OpenID Connect (OIDC) through the [Vercel CLI](/docs/cli). In a [linked project](/docs/cli/link), `vercel vcr login` authenticates a container tool with VCR. It supports Docker, Podman, and Buildah:

```bash filename="terminal"
vercel link
vercel vcr login docker
```

Vercel mints a short-lived, project-scoped OIDC token and passes it to the container tool with the username `oidc`. The credentials are valid for 12 hours. Re-run the command to refresh them. Use `--project` to authenticate a different project.

Or create a Vercel token from the [Account Tokens page](/account/tokens), then set `VERCEL_TOKEN` to that value:

```bash filename="terminal"
printf '%s' "$VERCEL_TOKEN" | docker login vcr.vercel.com \
  --username "$VERCEL_TEAM_ID" \
  --password-stdin
```

For token authentication, the Docker username is the team ID that owns the project.

Docker prints `Login Succeeded` when authentication succeeds:

```txt
Login Succeeded
```

## Push an image

To use zstd compression, build and push the image with Docker Buildx:

> **💡 Note:** Vercel recommends zstd compression for images pushed to VCR.

```bash filename="terminal"
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --output "type=image,name=vcr.vercel.com/team-slug/project-slug/my-repository:latest,push=true,oci-mediatypes=true,compression=zstd,compression-level=3,force-compression=true" \
  .
```

If Docker Buildx is unavailable, you can build and push the image with Docker. This command does not set zstd compression:

```bash filename="terminal"
docker build \
  -t vcr.vercel.com/team-slug/project-slug/my-repository:latest \
  .

docker push vcr.vercel.com/team-slug/project-slug/my-repository:latest
```

## Pull an image

Pull a VCR image with the same full repository path:

```bash filename="terminal"
docker pull vcr.vercel.com/team-slug/project-slug/my-repository:latest
```

## Manage repositories from the CLI

Use the `vercel vcr` command group in the [Vercel CLI](/docs/cli) to list, inspect, create, and delete repositories, and to manage their tags and images. For all commands, subcommands, and options, see the [Container Registry CLI Reference](/docs/container-registry/cli-reference).

## Limits and pricing

For VCR storage costs, size limits, plan limits, and compatibility limits, see [Limits and Pricing](/docs/container-registry/limits-and-pricing).

## Related docs

Several Vercel products can use VCR images for product-specific workflows:

- Vercel Sandbox can create sandboxes from custom VCR images. See [Sandbox Images](/docs/sandbox/concepts/images) for more information.
- Vercel Functions can run custom VCR images. See [container images usage](/docs/functions/container-images#usage) for more information.


---

[View full sitemap](/docs/sitemap)
