---
title: vercel vcr
product: vercel
url: /docs/cli/vcr
canonical_url: "https://vercel.com/docs/cli/vcr"
last_updated: 2026-08-13
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/container-registry
  - /docs/container-registry/cli-reference
  - /docs/container-registry/public-and-shared-repositories
  - /docs/container-registry/limits-and-pricing
summary: "Manage Vercel Container Registry from the Vercel CLI: build and push images, manage repositories, tags, and images, and control repository sharing..."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/vcr.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "87a623d4fd144274c2fe657c0b0615d43d3d1a4a30ad46f54db09af5b1b25cf3"
---

# vercel vcr

The `vercel vcr` command is the entry point for managing [Vercel Container Registry](/docs/container-registry) (VCR) from the Vercel CLI. It groups subcommands for building and pushing images, for listing, inspecting, creating, and deleting repositories, for managing their tags and images, and for sharing repositories with other teams. The full command surface is documented in the [Container Registry CLI Reference](/docs/container-registry/cli-reference). This page summarizes the entry point and links to the full reference.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Vercel Container Registry with Vercel CLI](https://vercel.com/changelog/manage-vercel-container-registry-with-vercel-cli?from=related&source_path=%2Fdocs%2Fcli%2Fvcr&source_site=vercel-docs&relationship=related)
- [How to use Vercel Container Registry](https://vercel.com/kb/guide/how-to-use-vercel-container-registry?from=related&source_path=%2Fdocs%2Fcli%2Fvcr&source_site=vercel-docs&relationship=related) — Push, store, and pull OCI container images with Vercel Container Registry, then deploy them to Vercel Functions and Verc
- [Introducing VCR: Vercel Container Registry](https://vercel.com/changelog/introducing-vcr-vercel-container-registry?from=related&source_path=%2Fdocs%2Fcli%2Fvcr&source_site=vercel-docs&relationship=related)
- [How to migrate from GHCR to Vercel Container Registry](https://vercel.com/kb/guide/migrate-ghcr-to-vcr?from=related&source_path=%2Fdocs%2Fcli%2Fvcr&source_site=vercel-docs&relationship=related) — Migrate container images from GitHub Container Registry \\(GHCR\\) to Vercel Container Registry \\(VCR\\), including authent
- [Running Docker on Vercel](https://vercel.com/kb/guide/docker?from=related&source_path=%2Fdocs%2Fcli%2Fvcr&source_site=vercel-docs&relationship=related) — Learn how to run Docker on Vercel by deploying OCI container images as Vercel Functions, storing them in Vercel Containe
- [Getting Started](https://vercel.com/docs/container-registry/getting-started?from=related&source_path=%2Fdocs%2Fcli%2Fvcr&source_site=vercel-docs&relationship=related) — Authenticate your container tool with Vercel Container Registry, then push and pull your first image with the Vercel CLI
- [vercel crons](https://vercel.com/docs/cli/crons?from=related&source_path=%2Fdocs%2Fcli%2Fvcr&source_site=vercel-docs&relationship=related) — Manage Cron Jobs from the Vercel CLI: add cron entries to your vercel.json, list them, and trigger them on demand.
- [Managing Vercel Blob storage from the CLI](https://vercel.com/docs/vercel-blob/manage-blob-storage?from=related&source_path=%2Fdocs%2Fcli%2Fvcr&source_site=vercel-docs&relationship=related) — Create blob stores, upload files, list contents, and manage storage using the CLI.
- [vercel api](https://vercel.com/docs/cli/api?from=related&source_path=%2Fdocs%2Fcli%2Fvcr&source_site=vercel-docs&relationship=related) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fcli%2Fvcr&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/cli/vcr.graph.md](/docs/cli/vcr.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fvcr&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel vcr [subcommand]
```

*Using \`vercel vcr\` to manage Vercel Container Registry from the terminal.*

## Examples

### List repositories in the linked project

```bash filename="terminal"
vercel vcr ls
```

*List the container registry repositories in the linked project.*

### Authenticate Docker with VCR

```bash filename="terminal"
vercel vcr login docker
```

*Authenticate Docker with the Vercel Container Registry using a short-lived
OIDC token.*

### Build and push an image

```bash filename="terminal"
vercel vcr build docker . --push
```

*Build the current directory with Docker and push it to the linked project's
repository.*

## Full reference

For the full list of subcommands, options, and examples, see the [Container Registry CLI Reference](/docs/container-registry/cli-reference). Use `vercel vcr login` to authenticate Docker, Podman, or Buildah with VCR, `vercel vcr build` and `vercel vcr push` to publish images, `vercel vcr tag` to browse a repository's tags, `vercel vcr image` to list, inspect, or delete images, and `vercel vcr permissions` to manage which teams a repository is [shared](/docs/container-registry/public-and-shared-repositories#share-a-repository) with. For the end-to-end workflow, see the [Container Registry documentation](/docs/container-registry#push-an-image).

## Related

- [Container Registry CLI Reference](/docs/container-registry/cli-reference)
- [Vercel Container Registry overview](/docs/container-registry)
- [Container Registry limits and pricing](/docs/container-registry/limits-and-pricing)


---

[View full sitemap](/docs/sitemap)
