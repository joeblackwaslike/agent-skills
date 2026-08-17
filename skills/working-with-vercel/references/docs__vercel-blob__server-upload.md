---
title: Server Uploads with Vercel Blob
product: vercel
url: /docs/vercel-blob/server-upload
canonical_url: "https://vercel.com/docs/vercel-blob/server-upload"
last_updated: 2026-07-30
type: tutorial
prerequisites:
  - /docs/vercel-blob
related:
  - /docs/functions/runtimes
  - /docs/vercel-blob/client-upload
  - /docs/vercel-blob/using-blob-sdk
summary: Learn how to upload files to Vercel Blob using Server Actions and Route Handlers
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-blob/server-upload.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "98f3df51ddddf0cd7d099e5c933a2dba3adfabad349bcecdb25f33e75dca73de"
---

# Server Uploads with Vercel Blob

> **🔒 Permissions Required**: Vercel Blob


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Videos](https://nextjs.org/docs/app/guides/videos?from=related) — Recommendations and best practices for optimizing videos in your Next.js application.
- [Build with Vercel Blob on Next.js](https://vercel.com/kb/guide/vercel-blob-nextjs?from=related) — Deploy the Vercel Blob Next.js Starter and learn how client uploads store images securely in a private Blob store.
- [Vercel Blob vs Netlify Blobs](https://vercel.com/kb/guide/vercel-blob-vs-netlify-blobs?from=related) — Compare Vercel Blob and Netlify Blobs on storage model, public URLs, delivery, limits, and pricing to choose the right o
- [The Complete Guide to Vercel Blob](https://vercel.com/kb/guide/vercel-blob?from=related) — Vercel Blob stores and serves files of any size through Vercel's global network. Learn how Blob works, what it costs, an
- [Build with Vercel Blob on Nuxt](https://vercel.com/kb/guide/vercel-blob-nuxt?from=related) — Set up Vercel Blob in a Nuxt application with NuxtHub, upload and serve files, and deliver optimized images with Nuxt Im
- [How can I use AWS S3 with Vercel?](https://vercel.com/kb/guide/how-can-i-use-aws-s3-with-vercel?from=related) — Example how to use AWS S3 library on Vercel
- [Public Storage](https://vercel.com/docs/vercel-blob/public-storage?from=related) — Learn how to use public Vercel Blob storage to serve files accessible to anyone with the URL
- [Start a blob upload](https://vercel.com/docs/rest-api/vcr/start-a-blob-upload?from=related)
- [Complete a blob upload](https://vercel.com/docs/rest-api/vcr/complete-a-blob-upload?from=related)
- [Upload a blob chunk](https://vercel.com/docs/rest-api/vcr/upload-a-blob-chunk?from=related)

Full cross-link map for this page: [/docs/vercel-blob/server-upload.graph.md](/docs/vercel-blob/server-upload.graph.md)
<!-- /docsgraph:related -->

In this guide, you'll learn how to do the following:

- Use the Vercel dashboard to create a Blob store connected to a project
- Upload a file using the Blob SDK from the server

> **💡 Note:** Vercel has a [4.5 MB request body size
> limit](/docs/functions/runtimes#request-body-size) on Vercel Functions. If you
> need to upload larger files, use [client
> uploads](/docs/vercel-blob/client-upload).

## Prerequisites

Vercel Blob works with any frontend framework. First, install the package:

- ### Create a Blob store
  1. Go to your project's [**Storage** section in the sidebar](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fstores\&title=Go+to+Storage)
  2. Select **Create Database**, then choose **Blob**
  3. Select **Continue**, then set the access to **Private** or **Public**
  4. Use the name "Images" and select **Create a new Blob store**
  5. Select the environments where you would like the read-write token to be included. **Production** and **Preview** are preselected; include **Development** if you plan to work with the store locally. You can also update the prefix of the Environment Variable in Advanced Options
  Once created, you are taken to the Vercel Blob store page.

- ### Prepare your local project
  Since you created the Blob store in a project, we automatically created and added the following Environment Variables to the project for you.

  By default, connected stores use OIDC-based authentication with short-lived, automatically rotated credentials:
  - `BLOB_STORE_ID` — identifies your Blob store
  - `VERCEL_OIDC_TOKEN` — a short-lived token issued at runtime; rotated automatically
  The following variable is also added as a fallback for code running outside Vercel or to generate client tokens for browser uploads:
  - `BLOB_READ_WRITE_TOKEN` — a long-lived static read-write token
  To use these Environment Variables locally, we recommend pulling them with the Vercel CLI:
  ```bash
  vercel env pull
  ```
  > **💡 Note:** If the Blob variables don't show up in your `.env.local` file, your store
  > connection likely doesn't include the **Development** environment, which is
  > the one `vercel env pull` reads from. You can add it from the store's
  > **Projects** tab: open the context menu (⋯) next to your project, select
  > **Update Project Connection**, and include **Development**.

Server uploads are perfectly fine as long as you do not need to upload files larger than [4.5 MB on Vercel](/docs/functions/runtimes#request-body-size). If you need to upload larger files, consider using [client uploads](/docs/vercel-blob/client-upload).

## Upload a file using Server Actions

## Upload a file using a server upload page and route

You can upload files to Vercel Blob using Route Handlers/API Routes. The following example shows how to upload a file to Vercel Blob using a server upload page and route.

- ### Create a server upload page
  This page will upload files to your server. The files will then be sent to Vercel Blob.

- ### Create a server upload route
  This route forwards the file to Vercel Blob and returns the URL of the uploaded file to the browser.

### Testing your page

- ### Run your application locally
  Run your application locally and visit `/avatar/upload` to upload the file to your store. The browser will display the unique URL created for the file.

- ### Review the Blob object metadata
  - Go to the Vercel Project where you created the store
  - Open **Storage** in the sidebar and select your new store
  - Paste the blob object URL returned in the previous step in the **Blob URL** input box in the **Browser** section and select **Lookup**
  - The following blob object metadata will be displayed: file name, path, size, uploaded date, content type and HTTP headers
  - You also have the option to download and delete the file from this page

You have successfully uploaded an object to your Vercel Blob store and are able to review its metadata, download, and delete it from your Vercel Storage Dashboard.

## Next steps

- Learn how to [use the methods](/docs/vercel-blob/using-blob-sdk) available with the `@vercel/blob` package


---

[View full sitemap](/docs/sitemap)
