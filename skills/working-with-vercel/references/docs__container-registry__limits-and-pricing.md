---
title: Container Registry limits and pricing
product: vercel
url: /docs/container-registry/limits-and-pricing
canonical_url: "https://vercel.com/docs/container-registry/limits-and-pricing"
last_updated: 2026-09-22
type: reference
prerequisites:
  - /docs/container-registry
related:
  - /docs/functions/runtimes/container
  - /docs/sandbox/concepts/images
summary: Storage pricing, size limits, plan limits, and compatibility limits for Vercel Container Registry.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/container-registry/limits-and-pricing.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "1ab20378ed9505641840dfdfb380728258574316485c0a3fd6f47765d0d0645d"
---

# Container Registry limits and pricing

## Pricing

| Resource          | Price          |
| ----------------- | -------------- |
| VCR image storage | $0.10 per GB   |


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to use Vercel Container Registry](https://vercel.com/kb/guide/how-to-use-vercel-container-registry) — Push, store, and pull OCI container images with Vercel Container Registry, then deploy them to Vercel Functions and Verc
- [Migrate self-hosted Next.js and containers from AWS to Vercel](https://vercel.com/kb/guide/migrate-containers-from-aws-to-vercel) — Migrate Next.js apps and HTTP containers from AWS to Vercel. Configure AWS access, assess background workers, and plan t
- [How to migrate from GHCR to Vercel Container Registry](https://vercel.com/kb/guide/migrate-ghcr-to-vcr) — Migrate container images from GitHub Container Registry \\(GHCR\\) to Vercel Container Registry \\(VCR\\), including authent
- [Run Terminal-Bench and any Harbor benchmark on Vercel Sandbox](https://vercel.com/kb/guide/run-terminal-bench-harbor-benchmarks-vercel-sandbox) — Run Terminal-Bench, SWE-bench, and any Harbor benchmark on Vercel Sandbox. Each trial executes in an isolated Firecracke
- [Does Vercel support Docker deployments?](https://vercel.com/kb/guide/does-vercel-support-docker-deployments) — Vercel supports deploying OCI-compatible container images through Vercel Functions and Vercel Container Registry, with A
- [Vercel Container Registry now supports 2 GB compressed image layers](https://vercel.com/changelog/vercel-container-registry-now-supports-2-gb-compressed-image-layers-new)
- [Introducing VCR: Vercel Container Registry](https://vercel.com/changelog/introducing-vcr-vercel-container-registry)
- [Limits and Pricing for Image Optimization](https://vercel.com/docs/image-optimization/limits-and-pricing) — This page outlines information on the limits that are applicable when using Image Optimization, and the costs they can i
- [vercel vcr](https://vercel.com/docs/cli/vcr) — Manage Vercel Container Registry from the Vercel CLI: build and push images, manage repositories, tags, and images, and
- [Limits and Pricing for Vercel Flags](https://vercel.com/docs/flags/vercel-flags/limits-and-pricing) — Review Vercel Flags request pricing and limits for flags, segments, configuration size, and connected projects.
- [Vercel Blob Pricing](https://vercel.com/docs/vercel-blob/usage-and-pricing) — Learn about the pricing for Vercel Blob.
- [Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines) — Learn how Vercel applies fair use guidelines across plans and usage-based resources.

Full cross-link map for this page: [/docs/container-registry/limits-and-pricing.graph.md](/docs/container-registry/limits-and-pricing.graph.md)
<!-- /docsgraph:related -->

## Limits

### Size limits

| Resource                          | Limit  |
| --------------------------------- | ------ |
| Compressed image layer            | 2 GB   |
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

### Optimization limits

Before an image is optimized to run on products such as [Vercel Functions](/docs/functions/runtimes/container) or [Vercel Sandbox](/docs/sandbox/concepts/images), VCR optimizes it by extracting every layer into a single filesystem.

| Resource          | Limit     |
| ----------------- | --------- |
| Entries per image | 2,000,000 |

An entry is one file, directory, symlink, or hard link inside a layer.

If an image exceeds the limit, optimization fails and the image status becomes `Error`. You can still pull the image with your container tool, but you can't run it on Vercel Functions or in Vercel Sandbox.

### Compatibility limits

VCR supports OCI image manifests, OCI image indexes, Docker schema 2 image manifests, and Docker manifest lists.

Image layers must use gzip or zstd compression. Uncompressed OCI layers are not supported.

Single-platform image manifests must include `os` and `architecture` in the image config.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
