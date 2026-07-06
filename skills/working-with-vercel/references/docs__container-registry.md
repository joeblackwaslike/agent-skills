---
title: Container Registry
product: vercel
url: /docs/container-registry
canonical_url: "https://vercel.com/docs/container-registry"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  []
related:
  - /docs/container-registry/limits-and-pricing
  - /docs/sandbox/concepts/images
  - /docs/functions/container-images
summary: Learn about container registry on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/container-registry.md"
fetched_at: "2026-07-06T05:40:24.878Z"
sha256: "ac0fab83647bbd592fb644d77e0add25f30c90850e2ee7abb3f7ac4bb1bbf5ca"
---

# Vercel Container Registry

Vercel Container Registry (VCR) is a project-scoped registry for OCI container images. Use VCR to store, push, and pull Docker images on Vercel.

VCR supports the Docker Registry HTTP API v2. You can use Docker-compatible tooling to authenticate, push images, and pull images from `vcr.vercel.com`.

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

## Authenticate Docker to VCR

Use OpenID Connect (OIDC) when `VERCEL_OIDC_TOKEN` is available in your shell. Vercel provides this token automatically in deployments.

For local development, link your project, pull the token into `.env.local`, source it, and sign in to Docker:

```bash filename="Terminal"
vercel link
vercel env pull .env.local
source .env.local

printf '%s' "$VERCEL_OIDC_TOKEN" | docker login vcr.vercel.com \
  --username oidc \
  --password-stdin
```

The Docker username is `oidc` for OIDC authentication.

Or create a Vercel token from the [Account Tokens page](/account/tokens), then set `VERCEL_TOKEN` to that value:

```bash filename="Terminal"
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

```bash filename="Terminal"
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --output "type=image,name=vcr.vercel.com/team-slug/project-slug/my-repository:latest,push=true,oci-mediatypes=true,compression=zstd,compression-level=3,force-compression=true" \
  .
```

If Docker Buildx is unavailable, you can build and push the image with Docker. This command does not set zstd compression:

```bash filename="Terminal"
docker build \
  -t vcr.vercel.com/team-slug/project-slug/my-repository:latest \
  .

docker push vcr.vercel.com/team-slug/project-slug/my-repository:latest
```

## Pull an image

Pull a VCR image with the same full repository path:

```bash filename="Terminal"
docker pull vcr.vercel.com/team-slug/project-slug/my-repository:latest
```

## Limits and pricing

For VCR storage costs, size limits, plan limits, and compatibility limits, see [Limits and Pricing](/docs/container-registry/limits-and-pricing).

## Related docs

Several Vercel products can use VCR images for product-specific workflows:

- Vercel Sandbox can create sandboxes from custom VCR images. See [Sandbox Images](/docs/sandbox/concepts/images) for more information.
- Vercel Functions can run custom VCR images. See [container images usage](/docs/functions/container-images#usage) for more information.


---

[View full sitemap](/docs/sitemap)
