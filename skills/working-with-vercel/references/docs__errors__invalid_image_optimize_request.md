---
title: INVALID_IMAGE_OPTIMIZE_REQUEST
product: vercel
url: /docs/errors/INVALID_IMAGE_OPTIMIZE_REQUEST
canonical_url: "https://vercel.com/docs/errors/INVALID_IMAGE_OPTIMIZE_REQUEST"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: The query string is using an invalid value for q, w, or url parameters. This is a request error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/invalid_image_optimize_request.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "ce37fea5a382eafaefa5eb1c1d3c8ee1251ceb03f3c79919ddfcef69abbf313a"
---

# INVALID_IMAGE_OPTIMIZE_REQUEST

The `INVALID_IMAGE_OPTIMIZE_REQUEST` error occurs when the query string is using an invalid value for `q` (quality) or `w` (width), or `url` returns a non-image response.

**Error Code:** `400`

**Name:** Bad Request

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check for typos:** Verify that there are no typos in the parameter names or values
2. **Review request format:** Ensure that the request URL is correctly formatted and includes the required parameters
   - The `q` parameter controls the quality of the image and must follow these rules:
     - The `q` parameter must be an integer
     - The `q` integer must be greater than or equal to 1
     - The `q` integer must be less than or equal to 100
     - The `q` integer must be the same as one specified in [`qualities`](https://nextjs.org/docs/app/api-reference/components/image#qualities), if defined
   - The `w` parameter defines the width of the image and must follow these rules:
     - The `w` parameter must be an integer
     - The `w` integer must be the same as one specified in [`deviceSizes`](https://nextjs.org/docs/app/api-reference/components/image#devicesizes) or [`imageSizes`](https://nextjs.org/docs/app/api-reference/components/image#imagesizes) in your [`next.config.js`](https://nextjs.org/docs/app/api-reference/next-config-js).
   - The `url` parameter specifies the image location and must follow these rules:
     - The `url` parameter must start with `/`, `http://`, or `https://`
     - The `url` parameter must match one of the configured [`remotePatterns`](https://nextjs.org/docs/app/api-reference/components/image#remotepatterns) or [`localPatterns`](https://nextjs.org/docs/app/api-reference/components/image#localpatterns) in your `next.config.js`
     - The `url` parameter must have a `Content-Type` header that starts with `image/`
     - The `url` parameter must have a response body **less than 300 MB** (or **less than 100 MB for hobby**), otherwise the image won't be optimized

Run `next dev` locally to reproduce the error and get additional details.


---

[View full sitemap](/docs/sitemap)
