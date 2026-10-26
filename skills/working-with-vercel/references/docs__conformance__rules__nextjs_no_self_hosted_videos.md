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
source: "https://vercel.com/docs/conformance/rules/nextjs_no_self_hosted_videos.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "56c524008f512af1d3bcb89c349565577b0e3df014835f68fc61eb810caddafb"
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

See the [best practices for hosting videos on Vercel](/kb/guide/best-practices-for-hosting-videos-on-vercel-nextjs-mp4-gif) guide to learn more about various other options for hosting videos.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
