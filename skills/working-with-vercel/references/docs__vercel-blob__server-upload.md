---
title: Server Uploads with Vercel Blob
product: vercel
url: /docs/vercel-blob/server-upload
canonical_url: "https://vercel.com/docs/vercel-blob/server-upload"
last_updated: 2026-08-11
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
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "946f846f815ea8f097af2417725ab082addeb13fbc5b590e317ff31bcee45cc4"
---

# Server Uploads with Vercel Blob

> **🔒 Permissions Required**: Vercel Blob

In this guide, you'll learn how to do the following:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to use and optimize videos](https://nextjs.org/docs/app/guides/videos?from=related&source_path=%2Fdocs%2Fvercel-blob%2Fserver-upload&source_site=vercel-docs&relationship=related) — Recommendations and best practices for optimizing videos in your Next.js application.
- [Build with Vercel Blob on Next.js](https://vercel.com/kb/guide/vercel-blob-nextjs?from=related&source_path=%2Fdocs%2Fvercel-blob%2Fserver-upload&source_site=vercel-docs&relationship=related) — Deploy the Vercel Blob Next.js Starter and learn how client uploads store images securely in a private Blob store.
- [Vercel Blob vs Netlify Blobs](https://vercel.com/kb/guide/vercel-blob-vs-netlify-blobs?from=related&source_path=%2Fdocs%2Fvercel-blob%2Fserver-upload&source_site=vercel-docs&relationship=related) — Compare Vercel Blob and Netlify Blobs on storage model, public URLs, delivery, limits, and pricing to choose the right o
- [The Complete Guide to Vercel Blob](https://vercel.com/kb/guide/vercel-blob?from=related&source_path=%2Fdocs%2Fvercel-blob%2Fserver-upload&source_site=vercel-docs&relationship=related) — Vercel Blob stores and serves files of any size through Vercel's global network. Learn how Blob works, what it costs, an
- [Build with Vercel Blob on Nuxt](https://vercel.com/kb/guide/vercel-blob-nuxt?from=related&source_path=%2Fdocs%2Fvercel-blob%2Fserver-upload&source_site=vercel-docs&relationship=related) — Set up Vercel Blob in a Nuxt application with NuxtHub, upload and serve files, and deliver optimized images with Nuxt Im
- [How can I use AWS S3 with Vercel?](https://vercel.com/kb/guide/how-can-i-use-aws-s3-with-vercel?from=related&source_path=%2Fdocs%2Fvercel-blob%2Fserver-upload&source_site=vercel-docs&relationship=related) — Example how to use AWS S3 library on Vercel
- [Introducing Vercel Blob](https://vercel.com/changelog/vercel-blob?from=related&source_path=%2Fdocs%2Fvercel-blob%2Fserver-upload&source_site=vercel-docs&relationship=related)
- [Public Storage](https://vercel.com/docs/vercel-blob/public-storage?from=related&source_path=%2Fdocs%2Fvercel-blob%2Fserver-upload&source_site=vercel-docs&relationship=related) — Learn how to use public Vercel Blob storage to serve files accessible to anyone with the URL
- [Vercel Storage overview](https://vercel.com/docs/storage?from=related&source_path=%2Fdocs%2Fvercel-blob%2Fserver-upload&source_site=vercel-docs&relationship=related) — Store files with Vercel Blob, runtime configuration with Global Config, and application data with Marketplace databases.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fvercel-blob%2Fserver-upload&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/vercel-blob/server-upload.graph.md](/docs/vercel-blob/server-upload.graph.md?from=related&source_path=%2Fdocs%2Fvercel-blob%2Fserver-upload&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

- Use the Vercel dashboard to create a Blob store connected to a project
- Upload a file using the Blob SDK from the server

> **💡 Note:** Vercel has a [4.5 MB request body size
> limit](/docs/functions/runtimes#request-body-size) on Vercel Functions. If you
> need to upload larger files, use [client
> uploads](/docs/vercel-blob/client-upload).

## Prerequisites

Vercel Blob works with any frontend framework. First, install the package:

**TypeScript**

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i @vercel/blob
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i @vercel/blob
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i @vercel/blob
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i @vercel/blob
    ```
  </Code>
</CodeBlock>

**Python**

```bash
python -m venv .venv
source .venv/bin/activate
pip install vercel
```

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

**TypeScript**

The following example shows how to use a [Server Action](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) with Next.js App Router to upload a file to Vercel Blob.

```tsx filename="app/components/form.tsx" framework="all"
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

export async function Form() {
  async function uploadImage(formData: FormData) {
    'use server';
    const imageFile = formData.get('image') as File;
    const blob = await put(imageFile.name, imageFile, {
      access: 'private' /* or 'public' */,
      addRandomSuffix: true,
    });
    revalidatePath('/');
    return blob;
  }

  return (
    <form action={uploadImage}>
      <label htmlFor="image">Image</label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/jpeg, image/png, image/webp"
        required
      />
      <button>Upload</button>
    </form>
  );
}
```

Read more about [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) and [App Router](https://nextjs.org/docs) on the Next.js documentation.

**Python**

The following example shows how to upload a file to Vercel Blob from a Python server handler:

```python
import os
from dotenv import load_dotenv
from vercel.blob import AsyncBlobClient, UploadProgressEvent

load_dotenv('.env.local') or load_dotenv()

def on_progress(e: UploadProgressEvent) -> None:
    print(f"progress: {e.loaded}/{e.total} bytes ({e.percentage}%)")

async def upload_avatar(form: dict) -> dict:
    client = AsyncBlobClient()

    blob = await client.put(
        f"avatars/{filename}",
        file_bytes,
        access="private",  # or "public",
        add_random_suffix=True,
        on_upload_progress=on_progress,
    )

    return {
        "url": blob.url,
        "pathname": blob.pathname,
    }
```

## Upload a file using a server upload page and route

You can upload files to Vercel Blob using Route Handlers/API Routes. The following example shows how to upload a file to Vercel Blob using a server upload page and route.

- ### Create a server upload page
  This page will upload files to your server. The files will then be sent to Vercel Blob.

  **TypeScript**
  ```tsx filename="src/app/avatar/upload/page.tsx" framework=nextjs-app
  'use client';

  import type { PutBlobResult } from '@vercel/blob';
  import { useState, useRef } from 'react';

  export default function AvatarUploadPage() {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);
    return (
      <>
        <h1>Upload Your Avatar</h1>

        <form
          onSubmit={async (event) => {
            event.preventDefault();

            if (!inputFileRef.current?.files) {
              throw new Error('No file selected');
            }

            const file = inputFileRef.current.files[0];

            const response = await fetch(
              `/api/avatar/upload?filename=${file.name}`,
              {
                method: 'POST',
                body: file,
              },
            );

            const newBlob = (await response.json()) as PutBlobResult;

            setBlob(newBlob);
          }}
        >
          <input
            name="file"
            ref={inputFileRef}
            type="file"
            accept="image/jpeg, image/png, image/webp"
            required
          />
          <button type="submit">Upload</button>
        </form>
        {blob && (
          <div>
            Blob url: <a href={blob.url}>{blob.url}</a>
          </div>
        )}
      </>
    );
  }
  ```
  ```jsx filename="app/avatar/upload/page.jsx" framework=nextjs-app
  'use client';

  import { useState, useRef } from 'react';

  export default function AvatarUploadPage() {
    const inputFileRef = useRef(null);
    const [blob, setBlob] = useState(null);
    return (
      <>
        <h1>Upload Your Avatar</h1>

        <form
          onSubmit={async (event) => {
            event.preventDefault();

            const file = inputFileRef.current.files[0];

            const response = await fetch(
              `/api/avatar/upload?filename=${file.name}`,
              {
                method: 'POST',
                body: file,
              },
            );

            const newBlob = await response.json();

            setBlob(newBlob);
          }}
        >
          <input
            name="file"
            ref={inputFileRef}
            type="file"
            accept="image/jpeg, image/png, image/webp"
            required
          />
          <button type="submit">Upload</button>
        </form>
        {blob && (
          <div>
            Blob url: <a href={blob.url}>{blob.url}</a>
          </div>
        )}
      </>
    );
  }
  ```
  ```tsx filename="pages/avatar/upload.tsx" framework=nextjs
  import type { PutBlobResult } from '@vercel/blob';
  import { useState, useRef } from 'react';

  export default function AvatarUploadPage() {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);
    return (
      <>
        <h1>Upload Your Avatar</h1>

        <form
          onSubmit={async (event) => {
            event.preventDefault();

            if (!inputFileRef.current?.files) {
              throw new Error('No file selected');
            }

            const file = inputFileRef.current.files[0];

            const response = await fetch(
              `/api/avatar/upload?filename=${file.name}`,
              {
                method: 'POST',
                body: file,
              },
            );

            const newBlob = (await response.json()) as PutBlobResult;

            setBlob(newBlob);
          }}
        >
          <input
            name="file"
            ref={inputFileRef}
            type="file"
            accept="image/jpeg, image/png, image/webp"
            required
          />
          <button type="submit">Upload</button>
        </form>
        {blob && (
          <div>
            Blob url: <a href={blob.url}>{blob.url}</a>
          </div>
        )}
      </>
    );
  }
  ```
  ```jsx filename="pages/avatar/upload.jsx" framework=nextjs
  import { useState, useRef } from 'react';

  export default function AvatarUploadPage() {
    const inputFileRef = useRef(null);
    const [blob, setBlob] = useState(null);
    return (
      <>
        <h1>Upload Your Avatar</h1>

        <form
          onSubmit={async (event) => {
            event.preventDefault();

            const file = inputFileRef.current.files[0];

            const response = await fetch(
              `/api/avatar/upload?filename=${file.name}`,
              {
                method: 'POST',
                body: file,
              },
            );

            const newBlob = await response.json();

            setBlob(newBlob);
          }}
        >
          <input
            name="file"
            ref={inputFileRef}
            type="file"
            accept="image/jpeg, image/png, image/webp"
            required
          />
          <button type="submit">Upload</button>
        </form>
        {blob && (
          <div>
            Blob url: <a href={blob.url}>{blob.url}</a>
          </div>
        )}
      </>
    );
  }
  ```
  **Python**

  A minimal HTML upload form you can serve from a Python web framework:
  ```html filename="templates/upload.html"
  <form method="post" enctype="multipart/form-data" action="/upload">
    <input type="file" name="file" />
    <button type="submit">Upload</button>
  </form>
  ```

- ### Create a server upload route
  This route forwards the file to Vercel Blob and returns the URL of the uploaded file to the browser.

  **TypeScript**
  ```ts filename="src/app/api/avatar/upload/route.ts" framework=nextjs-app
  import { put } from '@vercel/blob';
  import { NextResponse } from 'next/server';

  export async function POST(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    const blob = await put(filename, request.body, {
      access: 'private' /* or 'public' */,
      addRandomSuffix: true,
    });

    return NextResponse.json(blob);
  }
  ```
  ```js filename="src/app/api/avatar/upload/route.js" framework=nextjs-app
  import { put } from '@vercel/blob';
  import { NextResponse } from 'next/server';

  export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    const blob = await put(filename, request.body, {
      access: 'private' /* or 'public' */,
      addRandomSuffix: true,
    });

    return NextResponse.json(blob);
  }
  ```
  ```ts filename="pages/api/avatar/upload.ts" framework=nextjs
  import { put } from '@vercel/blob';
  import type { NextApiResponse, NextApiRequest, PageConfig } from 'next';

  export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
  ) {
    const blob = await put(request.query.filename as string, request, {
      access: 'private' /* or 'public' */,
      addRandomSuffix: true,
    });

    return response.status(200).json(blob);
  }

  export const config: PageConfig = {
    api: {
      bodyParser: false,
    },
  };
  ```
  ```js filename="pages/api/avatar/upload.js" framework=nextjs
  import { put } from '@vercel/blob';

  export default async function handler(request, response) {
    const blob = await put(request.query.filename, request, {
      access: 'private' /* or 'public' */,
      addRandomSuffix: true,
    });

    return response.status(200).json(blob);
  }

  export const config = {
    api: {
      bodyParser: false,
    },
  };
  ```
  **Python**

  Example FastAPI route that accepts the upload and stores it in Vercel Blob:
  ```python filename="main.py"
  from fastapi import FastAPI, UploadFile, File
  from vercel.blob import AsyncBlobClient

  app = FastAPI()

  @app.get("/avatar/upload", response_class=HTMLResponse)
  async def upload_page():
      """Serve a simple HTML upload form."""
      return """
      <form method="post" enctype="multipart/form-data" action="/upload">
        <input type="file" name="file" />
        <button type="submit">Upload</button>
      </form>
      """

  @app.post("/upload")
  async def upload_file(file: UploadFile = File(...)):
      """Handle file upload and store in Vercel Blob."""
      if not file:
          return {"error": "missing file"}

      client = AsyncBlobClient()
      data = await file.read()

      blob = await client.put(
          f"avatars/{file.filename}",
          data,
          access="private",  # or "public",
          add_random_suffix=True,
      )

      return {"url": blob.url, "pathname": blob.pathname}
  ```

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
