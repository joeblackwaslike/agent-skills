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
  - /docs/cli/global-options
summary: "Manage Vercel Container Registry from the Vercel CLI: build and push images, manage repositories, tags, and images, and control repository sharing..."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/vcr.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "93aab3d92062cf0b966917a2dd52b23ca47bde2a5878943719cd34d77a8abe56"
---

# vercel vcr

The `vercel vcr` command is the entry point for managing [Vercel Container Registry](/docs/container-registry) (VCR) from the Vercel CLI. It groups subcommands for building and pushing images, for listing, inspecting, creating, and deleting repositories, for managing their tags and images, and for sharing repositories with other teams. The full command surface is documented in the [Container Registry CLI Reference](/docs/container-registry/cli-reference). This page summarizes the entry point and links to the full reference.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Vercel Container Registry with Vercel CLI](https://vercel.com/changelog/manage-vercel-container-registry-with-vercel-cli)
- [How to use Vercel Container Registry](https://vercel.com/kb/guide/how-to-use-vercel-container-registry) — Push, store, and pull OCI container images with Vercel Container Registry, then deploy them to Vercel Functions and Verc
- [How to migrate from GHCR to Vercel Container Registry](https://vercel.com/kb/guide/migrate-ghcr-to-vcr) — Migrate container images from GitHub Container Registry \\(GHCR\\) to Vercel Container Registry \\(VCR\\), including authent
- [Getting Started](https://vercel.com/docs/container-registry/getting-started) — Authenticate your container tool with Vercel Container Registry, then push and pull your first image with the Vercel CLI
- [vercel crons](https://vercel.com/docs/cli/crons) — Manage Cron Jobs from the Vercel CLI: add cron entries to your vercel.json, list them, and trigger them on demand.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel build](https://vercel.com/docs/cli/build) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
- [vercel link](https://vercel.com/docs/cli/link) — Learn how to link a local directory to a Vercel Project using the vercel link CLI command.

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

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel vcr` command:

- [`--cwd`](/docs/cli/global-options#current-working-directory)
- [`--debug`](/docs/cli/global-options#debug)
- [`--global-config`](/docs/cli/global-options#global-config)
- [`--help`](/docs/cli/global-options#help)
- [`--local-config`](/docs/cli/global-options#local-config)
- [`--no-color`](/docs/cli/global-options#no-color)
- [`--non-interactive`](/docs/cli/global-options#non-interactive)
- [`--scope`](/docs/cli/global-options#scope)
- [`--team`](/docs/cli/global-options#team)
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)
