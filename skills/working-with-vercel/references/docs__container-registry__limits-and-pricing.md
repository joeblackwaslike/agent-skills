---
title: Container Registry limits and pricing
product: vercel
url: /docs/container-registry/limits-and-pricing
canonical_url: "https://vercel.com/docs/container-registry/limits-and-pricing"
last_updated: 2026-08-03
type: reference
prerequisites:
  - /docs/container-registry
related:
  []
summary: Storage pricing, size limits, plan limits, and compatibility limits for Vercel Container Registry.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/container-registry/limits-and-pricing.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "259384d92df451f1aa4ea216ce25ca143d1a98bdd5cfd4f9f40c3d9d14999465"
---

# Container Registry limits and pricing

## Pricing

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
