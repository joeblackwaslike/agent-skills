---
title: vercel vcr
product: vercel
url: /docs/cli/vcr
canonical_url: "https://vercel.com/docs/cli/vcr"
last_updated: 2026-08-03
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/container-registry
  - /docs/container-registry/cli-reference
  - /docs/container-registry/public-and-shared-repositories
  - /docs/container-registry/limits-and-pricing
summary: "Manage Vercel Container Registry from the Vercel CLI: list, inspect, create, and delete repositories, browse tags, and manage images from your..."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/vcr.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "f0893db81c5f51e17f5a74cecd127d9d99f0604acc441a1225aaf398e3844275"
---

# vercel vcr

The `vercel vcr` command is the entry point for managing [Vercel Container Registry](/docs/container-registry) (VCR) from the Vercel CLI. It groups subcommands for building and pushing images, for listing, inspecting, creating, and deleting repositories, for managing their tags and images, and for sharing repositories with other teams. The full command surface is documented in the [Container Registry CLI Reference](/docs/container-registry/cli-reference). This page summarizes the entry point and links to the full reference.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to use Vercel Container Registry](https://vercel.com/kb/guide/how-to-use-vercel-container-registry?from=related) — Push, store, and pull OCI container images with Vercel Container Registry, then deploy them to Vercel Functions and Verc
- [How to migrate from GHCR to Vercel Container Registry](https://vercel.com/kb/guide/migrate-ghcr-to-vcr?from=related) — Migrate container images from GitHub Container Registry \(GHCR\) to Vercel Container Registry \(VCR\), including authent
- [Running Docker on Vercel](https://vercel.com/kb/guide/docker?from=related) — Learn how to run Docker on Vercel by deploying OCI container images as Vercel Functions, storing them in Vercel Containe
- [Getting Started](https://vercel.com/docs/container-registry/getting-started?from=related) — Learn about getting started on Vercel.
- [vercel crons](https://vercel.com/docs/cli/crons?from=related) — Manage Cron Jobs from the Vercel CLI: add cron entries to your vercel.json, list them, and trigger them on demand.
- [Manage Vercel Blob Storage](https://vercel.com/docs/vercel-blob/manage-blob-storage?from=related) — Create blob stores, upload files, list contents, and manage storage using the CLI.
- [vercel api](https://vercel.com/docs/cli/api?from=related) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [List repositories](https://vercel.com/docs/rest-api/vcr/list-repositories?from=related)

Full cross-link map for this page: [/docs/cli/vcr.graph.md](/docs/cli/vcr.graph.md)
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
