---
title: vercel vcr
product: vercel
url: /docs/cli/vcr
canonical_url: "https://vercel.com/docs/cli/vcr"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/container-registry
  - /docs/container-registry/cli-reference
  - /docs/container-registry/limits-and-pricing
summary: "Manage Vercel Container Registry from the Vercel CLI: list, inspect, create, and delete repositories, browse tags, and manage images from your..."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/vcr.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "fc889b111c5f2f64bd675f52d98eebe45566e2e44339bd545d02ea6ecf5436d7"
---

# vercel vcr

The `vercel vcr` command is the entry point for managing [Vercel Container Registry](/docs/container-registry) (VCR) from the Vercel CLI. It groups subcommands for listing, inspecting, creating, and deleting repositories, and for managing their tags and images. The full command surface is documented in the [Container Registry CLI Reference](/docs/container-registry/cli-reference). This page summarizes the entry point and links to the full reference.

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

## Full reference

For the full list of subcommands, options, and examples, see the [Container Registry CLI Reference](/docs/container-registry/cli-reference). Use `vercel vcr login` to authenticate Docker, Podman, or Buildah with VCR, `vercel vcr tag` to browse a repository's tags, and `vercel vcr image` to list, inspect, or delete images. To push and pull images, use Docker-compatible tooling as described in the [Container Registry documentation](/docs/container-registry#push-an-image).

## Related

- [Container Registry CLI Reference](/docs/container-registry/cli-reference)
- [Vercel Container Registry overview](/docs/container-registry)
- [Container Registry limits and pricing](/docs/container-registry/limits-and-pricing)


---

[View full sitemap](/docs/sitemap)
