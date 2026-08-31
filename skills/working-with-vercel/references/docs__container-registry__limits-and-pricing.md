---
title: Container Registry limits and pricing
product: vercel
url: /docs/container-registry/limits-and-pricing
canonical_url: "https://vercel.com/docs/container-registry/limits-and-pricing"
last_updated: 2026-08-07
type: reference
prerequisites:
  - /docs/container-registry
related:
  []
summary: Storage pricing, size limits, plan limits, and compatibility limits for Vercel Container Registry.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/container-registry/limits-and-pricing.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "eb45c744032a6b767d8f1f6d2124835ba65e34974bf94134b78927b8d4a75d1c"
---

# Container Registry limits and pricing

## Pricing


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to use Vercel Container Registry](https://vercel.com/kb/guide/how-to-use-vercel-container-registry?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Flimits-and-pricing&source_site=vercel-docs&relationship=related) — Push, store, and pull OCI container images with Vercel Container Registry, then deploy them to Vercel Functions and Verc
- [How to migrate from GHCR to Vercel Container Registry](https://vercel.com/kb/guide/migrate-ghcr-to-vcr?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Flimits-and-pricing&source_site=vercel-docs&relationship=related) — Migrate container images from GitHub Container Registry \\(GHCR\\) to Vercel Container Registry \\(VCR\\), including authent
- [Does Vercel support Docker deployments?](https://vercel.com/kb/guide/does-vercel-support-docker-deployments?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Flimits-and-pricing&source_site=vercel-docs&relationship=related) — Vercel supports deploying OCI-compatible container images through Vercel Functions and Vercel Container Registry, with A
- [Introducing VCR: Vercel Container Registry](https://vercel.com/changelog/introducing-vcr-vercel-container-registry?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Flimits-and-pricing&source_site=vercel-docs&relationship=related)
- [Container Images](https://vercel.com/docs/functions/container-images?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Flimits-and-pricing&source_site=vercel-docs&relationship=related) — Deploy OCI container images with a Dockerfile or Containerfile on Vercel Functions.
- [vercel vcr](https://vercel.com/docs/cli/vcr?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Flimits-and-pricing&source_site=vercel-docs&relationship=related) — Manage Vercel Container Registry from the Vercel CLI: build and push images, manage repositories, tags, and images, and
- [Limits and Pricing for Vercel Flags](https://vercel.com/docs/flags/vercel-flags/limits-and-pricing?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Flimits-and-pricing&source_site=vercel-docs&relationship=related) — Review Vercel Flags request pricing and limits for flags, segments, configuration size, and connected projects.
- [Services Pricing and Limits](https://vercel.com/docs/services/pricing?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Flimits-and-pricing&source_site=vercel-docs&relationship=related) — Understand how billing works for Vercel Services, what's charged, and which limits apply.
- [Limits and Pricing for Image Optimization](https://vercel.com/docs/image-optimization/limits-and-pricing?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Flimits-and-pricing&source_site=vercel-docs&relationship=related) — This page outlines information on the limits that are applicable when using Image Optimization, and the costs they can i

Full cross-link map for this page: [/docs/container-registry/limits-and-pricing.graph.md](/docs/container-registry/limits-and-pricing.graph.md?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Flimits-and-pricing&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

| Resource          | Price          |
| ----------------- | -------------- |
| VCR image storage | $0.10 per GB   |

## Limits

### Size limits

| Resource                          | Limit  |
| --------------------------------- | ------ |
| Compressed image layer            | 500 MB |
| Total image size                  | 15 GB  |
| Manifest body                     | 4 MB   |
| Image config blob                 | 1 MB   |

The total image size is calculated from the compressed layers and config blob referenced by the image manifest.

### Plan limits

| Resource                          | Hobby | Pro    | Enterprise |
| --------------------------------- | ----- | ------ | ---------- |
| Repositories per project          | 10    | 1,000  | 5,000      |
| Images per repository             | 50    | 10,000 | 50,000     |
| Tags per repository               | 1,000 | 10,000 | 50,000     |
| Teams a repository is shared with | 100   | 100    | 100        |

### Compatibility limits

VCR supports OCI image manifests, OCI image indexes, Docker schema 2 image manifests, and Docker manifest lists.

Image layers must use gzip or zstd compression. Uncompressed OCI layers are not supported.

Single-platform image manifests must include `os` and `architecture` in the image config.


---

[View full sitemap](/docs/sitemap)
