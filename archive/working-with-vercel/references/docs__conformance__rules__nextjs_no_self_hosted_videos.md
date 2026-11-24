---
title: NEXTJS_NO_SELF_HOSTED_VIDEOS
product: vercel
url: /docs/conformance/rules/NEXTJS_NO_SELF_HOSTED_VIDEOS
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_NO_SELF_HOSTED_VIDEOS"
last_updated: 2025-11-25
type: conceptual
prerequisites:
  []
related:
  - /docs/storage/vercel-blob
  - /docs/storage/vercel-blob/server-upload
  - /docs/storage/vercel-blob/client-upload
summary: Prevent video files from being added to Next.js applications.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/nextjs_no_self_hosted_videos.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "532c4cd5483d30af0e0d8ab86874554f759e5a72fd1110101f8e6b348fcf334a"
---

# NEXTJS_NO_SELF_HOSTED_VIDEOS

Video files, which are typically large, can consume a lot of bandwidth for
your Next.js application. Video files are better served from a dedicated video
CDN that is optimized for serving videos.

## How to fix

Vercel Blob can be used for storing and serving large files such as videos.

You can use either [server uploads or client uploads](/docs/storage/vercel-blob#server-and-client-uploads) depending on the file size:

- [Server uploads](/docs/storage/vercel-blob/server-upload) are suitable for files up to **4.5 MB**
- [Client uploads](/docs/storage/vercel-blob/client-upload) allow for uploading larger files directly from the browser to Vercel Blob, supporting files up to **5 TB (5,000 GB)**

If you need transcoding or adaptive streaming, use a dedicated video platform such as [Mux](https://vercel.com/marketplace/mux), which is available on the Vercel Marketplace.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
