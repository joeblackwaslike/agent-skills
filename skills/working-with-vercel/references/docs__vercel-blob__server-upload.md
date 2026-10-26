---
title: Server Uploads with Vercel Blob
product: vercel
url: /docs/vercel-blob/server-upload
canonical_url: "https://vercel.com/docs/vercel-blob/server-upload"
last_updated: 2026-09-15
type: tutorial
prerequisites:
  - /docs/vercel-blob
related:
  - /docs/cli/blob
  - /docs/functions/runtimes
  - /docs/vercel-blob/client-upload
  - /docs/vercel-blob/using-blob-sdk
  - /docs/vercel-blob/python-sdk-reference
summary: Learn how to upload files to Vercel Blob from server routes and Server Actions
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-blob/server-upload.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "af04895ed92548b1efebd4ce7059fec86ffd94cd96f5e7fe8469b1b1e0d3e12e"
---

# Server Uploads with Vercel Blob

> Vercel Blob is available on all plans
>
> Those with the owner, member, developer role can access this feature

In this guide, you'll learn how to do the following:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to use and optimize videos](https://nextjs.org/docs/app/guides/videos) — Recommendations and best practices for optimizing videos in your Next.js application.
- [Build with Vercel Blob on Next.js](https://vercel.com/kb/guide/vercel-blob-nextjs) — Deploy the Vercel Blob Next.js Starter and learn how client uploads store images securely in a private Blob store.
- [Vercel Blob vs Netlify Blobs](https://vercel.com/kb/guide/vercel-blob-vs-netlify-blobs) — Compare Vercel Blob and Netlify Blobs on storage model, public URLs, delivery, limits, and pricing to choose the right o
- [How can I use AWS S3 with Vercel?](https://vercel.com/kb/guide/how-can-i-use-aws-s3-with-vercel) — Example how to use AWS S3 library on Vercel
- [The Complete Guide to Vercel Blob](https://vercel.com/kb/guide/vercel-blob) — Vercel Blob stores and serves files of any size through Vercel's global network. Learn how Blob works, what it costs, an
- [Build with Vercel Blob on Nuxt](https://vercel.com/kb/guide/vercel-blob-nuxt) — Set up Vercel Blob in a Nuxt application with NuxtHub, upload and serve files, and deliver optimized images with Nuxt Im
- [Public Storage](https://vercel.com/docs/vercel-blob/public-storage) — Learn how to use public Vercel Blob storage to serve files accessible to anyone with the URL
- [Vercel Storage overview](https://vercel.com/docs/storage) — Store files with Vercel Blob, runtime configuration with Global Config, and application data with Marketplace databases.
- [Start a blob upload](https://vercel.com/docs/rest-api/vcr/start-a-blob-upload) — POST /v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/uploads/ — POST /v2/:teamSlug/:projectSlug/:repositoryName/blob
- [Create a Blob store](https://vercel.com/docs/rest-api/storage/create-a-blob-store) — POST /storage/stores/blob — Create a Blob store
- [Complete a blob upload](https://vercel.com/docs/rest-api/vcr/complete-a-blob-upload) — PUT /v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/uploads/{uuid} — PUT /v2/:teamSlug/:projectSlug/:repositoryName/

Full cross-link map for this page: [/docs/vercel-blob/server-upload.graph.md](/docs/vercel-blob/server-upload.graph.md)
<!-- /docsgraph:related -->

- Use the Vercel dashboard or the [CLI](/docs/cli/blob) to create a Blob store connected to a project
- Upload a file using the Blob SDK from the server

> **💡 Note:** Vercel has a [4.5 MB request body size
> limit](/docs/functions/runtimes#request-body-size) on Vercel Functions. If you
> need to upload larger files, use [client
> uploads](/docs/vercel-blob/client-upload).

## Prerequisites

Vercel Blob works with any frontend framework. First, install the SDK. The Python examples in this guide use [FastAPI](https://fastapi.tiangolo.com/):

**Terminal**

```bash filename="Terminal" framework=node package-manager="pnpm"
pnpm add @vercel/blob
```

**Terminal**

```bash filename="Terminal" framework=node package-manager="yarn"
yarn add @vercel/blob
```

**Terminal**

```bash filename="Terminal" framework=node package-manager="npm"
npm install @vercel/blob
```

**Terminal**

```bash filename="Terminal" framework=node package-manager="bun"
bun add @vercel/blob
```

**Terminal**

```bash filename="Terminal" framework=fastapi
uv add vercel "fastapi[standard]" python-dotenv
```

- ### Create a Blob store
  Create a Blob store from the dashboard or the Vercel CLI.
  #### Dashboard
  1. Go to your project's [**Storage** section in the sidebar](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fstores\&title=Go+to+Storage)
  2. Select **Create Storage**, then choose **Blob**
  3. Select **Continue**, then set the access to **Private** or **Public**
  4. Use the name "Images" and select **Create a new Blob store**
  5. Select the environments where you would like the read-write token to be included. **Production** and **Preview** are preselected; include **Development** if you plan to work with the store locally. You can also update the prefix of the Environment Variable in Advanced Options
  Once created, you are taken to the Vercel Blob store page.
  #### CLI
  Run [`vercel blob create-store`](/docs/cli/blob#create-store) from your linked project directory. The `--access` flag is required and accepts `private` or `public`. The `--yes` flag connects the new store to the project in all environments, including **Development**, which `vercel env pull` reads from:
  ```bash filename="terminal"
  vercel blob create-store Images --access private --yes
  ```
  To connect only some environments, use `--environment` instead of `--yes`, once for each environment, for example `--environment production --environment development`.

- ### Prepare your local project
  Since you created the Blob store in a project, we automatically created and added the following Environment Variables to the project for you.

  By default, connected stores use OIDC-based authentication with short-lived, automatically rotated credentials:
  - `BLOB_STORE_ID`: Identifies your Blob store
  - `VERCEL_OIDC_TOKEN`: A short-lived token issued at runtime; rotated automatically
  The following variable is also added as a fallback for code running outside Vercel or to generate client tokens for browser uploads:
  - `BLOB_READ_WRITE_TOKEN`: A long-lived static read-write token
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

If you use Next.js App Router, you can upload a file to Vercel Blob with a [Server Action](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations):

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

## Upload a file using a server upload page and route

You can upload files to Vercel Blob from a server route. The following example shows how to upload a file to Vercel Blob using a server upload page and route.

- ### Create a server upload page
  This page will upload files to your server. The files will then be sent to Vercel Blob.

  **src/app/avatar/upload/page.tsx**
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
  **app/avatar/upload/page.jsx**
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
  **pages/avatar/upload.tsx**
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
  **pages/avatar/upload.jsx**
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
  **main.py**
  ```python filename="main.py" framework=fastapi
  from dotenv import load_dotenv
  from fastapi import FastAPI
  from fastapi.responses import HTMLResponse

  load_dotenv(".env.local")

  app = FastAPI()

  UPLOAD_PAGE = """<!doctype html>
  <h1>Upload Your Avatar</h1>
  <form id="upload-form">
    <input name="file" type="file" accept="image/jpeg, image/png, image/webp" required />
    <button type="submit">Upload</button>
  </form>
  <p id="result"></p>
  <script>
    document.getElementById("upload-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const file = event.target.file.files[0];
      const response = await fetch(
        `/api/avatar/upload?filename=${encodeURIComponent(file.name)}`,
        { method: "POST", body: file },
      );
      const blob = await response.json();
      document.getElementById("result").textContent = `Blob url: ${blob.url}`;
    });
  </script>
  """


  @app.get("/avatar/upload", response_class=HTMLResponse)
  async def avatar_upload_page() -> str:
      return UPLOAD_PAGE
  ```

- ### Create a server upload route
  This route forwards the file to Vercel Blob and returns the URL of the uploaded file to the browser.

  **src/app/api/avatar/upload/route.ts**
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
  **src/app/api/avatar/upload/route.js**
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
  **pages/api/avatar/upload.ts**
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
  **pages/api/avatar/upload.js**
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
  **main.py**
  ```python filename="main.py" framework=fastapi
  from fastapi import Request

  from vercel import blob


  # Add this route to the app from the previous step
  @app.post("/api/avatar/upload")
  async def upload_avatar(filename: str, request: Request) -> blob.PutResult:
      return await blob.put_blob(
          filename,
          await request.body(),
          access="private",  # or "public"
          add_random_suffix=True,
      )
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

- Learn about the methods available in the [JS SDK](/docs/vercel-blob/using-blob-sdk) and the [Python SDK](/docs/vercel-blob/python-sdk-reference)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
