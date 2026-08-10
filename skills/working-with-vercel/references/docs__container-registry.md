---
title: Vercel Container Registry
product: vercel
url: /docs/container-registry
canonical_url: "https://vercel.com/docs/container-registry"
last_updated: 2026-08-03
type: how-to
prerequisites:
  []
related:
  - /docs/functions/container-images
  - /docs/sandbox/concepts/images
  - /docs/container-registry/public-and-shared-repositories
  - /docs/cli
  - /docs/container-registry/cli-reference
summary: Store and manage Docker container images on Vercel. Push images built from a Dockerfile, then run them on Vercel Functions or in Vercel Sandbox.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/container-registry.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "0e57ff0d3f1ee2df0e94e08c2b8a19af25f1e1f04b073f6c3710e3533459bea7"
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

Repositories are private by default, but you can [share them with specific Vercel teams or make them public](/docs/container-registry/public-and-shared-repositories).

## Manage repositories from the CLI

Use the `vercel vcr` command group in the [Vercel CLI](/docs/cli) to list, inspect, create, and delete repositories, to manage their tags and images, and to manage repository sharing. For all commands, subcommands, and options, see the [Container Registry CLI Reference](/docs/container-registry/cli-reference).

## Resources

**Getting Started**: Create a repository, authenticate, and push and pull an image. [Learn more →](/docs/container-registry/getting-started)

**Public and Shared Repositories**: Control which Vercel teams can pull images from a repository. [Learn more →](/docs/container-registry/public-and-shared-repositories)

**CLI Reference**: Manage repositories, tags, images, and permissions from the terminal. [Learn more →](/docs/container-registry/cli-reference)

**Limits & Pricing**: Review storage pricing, resource limits, and compatibility. [Learn more →](/docs/container-registry/limits-and-pricing)

**Sandbox Images**: Create Vercel Sandboxes from custom VCR images. [Learn more →](/docs/sandbox/concepts/images)

**Vercel Functions Container Images**: Run Vercel Functions from custom VCR images. [Learn more →](/docs/functions/container-images#usage)


---

[View full sitemap](/docs/sitemap)
