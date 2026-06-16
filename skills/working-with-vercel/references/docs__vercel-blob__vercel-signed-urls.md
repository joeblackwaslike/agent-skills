---
title: Vercel Signed URLs
product: vercel
url: /docs/vercel-blob/vercel-signed-urls
canonical_url: "https://vercel.com/docs/vercel-blob/vercel-signed-urls"
last_updated: 2026-05-19
type: reference
prerequisites:
  - /docs/vercel-blob
related:
  - /docs/vercel-blob/using-blob-sdk
summary: Grant time-limited access to Vercel Blob URLs with signed tokens, and authorize browser-to-blob presigned uploads.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-blob/vercel-signed-urls.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "1761006964fb7b94f9f44816e8e53edcdad718371b66641810ea9404d5f7c53d"
---

# Vercel Signed URLs

> **🔒 Permissions Required**: Vercel Blob

Vercel Signed URLs grant time-limited access to a Blob URL without exposing a read-write token. Issue a short-lived signed token on your server, then sign individual blob URLs from the browser or any client. The CDN verifies the signature and rejects requests that fall outside the token's scope.

Use Signed URLs when you want to:

- Share a private blob with a third party for a limited window.
- Embed a private blob in a server-rendered page without proxying bytes through your function.
- Let a browser upload directly to your Blob store without holding a read-write token.
- Let a client delete or inspect a specific blob without granting full read-write access.

## `issueSignedToken()`

The `issueSignedToken` method runs on your server and asks the Blob control API for a short-lived token that you can use to sign presigned URLs. It uses the same authentication as the rest of the SDK (OIDC or a static read-write token).

```js
issueSignedToken(options);
```

It accepts a single options object:

| Parameter             | Required | Values                                                                                                                                                                                          |
| --------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pathname`            | No       | The blob pathname to scope the token to, for example `media/photo.png`. Use `*` to allow any pathname in the store. Defaults to a whole-store wildcard.                                          |
| `operations`          | No       | An array of allowed operations: `'get'`, `'head'`, `'put'`, or `'delete'`. Defaults to `['get']`. `'get'` covers `GET` requests against the blob URL; `'head'` covers `HEAD` requests against the same URL (signed separately so a `'get'` token cannot be replayed as `HEAD`); `'put'` covers single-object `PUT` and multipart `POST` against the Blob API; `'delete'` covers `DELETE` against the Blob API. |
| `validUntil`          | No       | A timestamp in milliseconds since the epoch when the token expires. Maximum 7 days from now. Defaults to 1 hour from now.                                                                        |
| `allowedContentTypes` | No       | An array of MIME types the token accepts on `'put'` operations, for example `['image/png', 'image/jpeg']`. Embedded in the delegation payload so the API enforces it on every upload.        |
| `maximumSizeInBytes`  | No       | Maximum upload size in bytes, enforced on `'put'` operations. Embedded in the delegation payload.                                                                                                |
| `token`               | No       | A static read-write token. See [Authentication](/docs/vercel-blob/using-blob-sdk#authentication).                                                                                                |
| `oidcToken`           | No       | A Vercel OIDC token, used in place of `process.env.VERCEL_OIDC_TOKEN`. Pair with `storeId` (or `BLOB_STORE_ID`). See [Authentication](/docs/vercel-blob/using-blob-sdk#authentication).           |
| `storeId`             | No       | The Blob store id, used with OIDC. See [Authentication](/docs/vercel-blob/using-blob-sdk#authentication).                                                                                        |
| `abortSignal`         | No       | An [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) to cancel the request.                                                                                            |

`issueSignedToken()` returns:

```ts
{
  delegationToken: string;       // public; encodes scope and HMAC, travels publicly in every signed URL
  clientSigningToken: string;    // secret; HMAC key used to sign URLs within the delegation's scope
  validUntil: number;            // ms since epoch
}
```

The `delegationToken` is safe to share with clients. It travels inside every signed URL the CDN sees. Treat the `clientSigningToken` as a secret: anyone who holds it can sign URLs within the delegation's scope.

## `presignUrl()`

The `presignUrl` method takes the material returned by `issueSignedToken` and produces a ready-to-fetch URL for a specific pathname. It is HMAC-only and runs in any environment (server, edge, browser). Use it to sign `'get'`, `'head'`, `'put'`, and `'delete'` operations.

```js
presignUrl(signedToken, options);
```

It accepts the following parameters:

- `signedToken`: (Required) The `{ delegationToken, clientSigningToken }` returned by `issueSignedToken`.
- `options`: (Required) An object describing what to sign:

| Parameter    | Required | Values                                                                                                                                                                                       |
| ------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `operation`  | Yes      | `'get'`, `'head'`, `'put'`, or `'delete'`. Must be included in the `operations` array of the `issueSignedToken` call.                                                                                                                 |
| `pathname`   | Yes      | The blob pathname to sign, for example `media/photo.png`. Must match the delegation's `pathname` scope.                                                                                      |
| `access`     | Yes      | `'public'` or `'private'`, matching the store's access mode.                                                                                                                                 |
| `validUntil` | No       | A timestamp in milliseconds since the epoch when this specific URL expires. Capped to the delegation's `validUntil`. Serialized as the `vercel-blob-valid-until` query parameter and signed. |

For `'put'` operations, `options` also accepts upload-shaping fields (`allowedContentTypes`, `maximumSizeInBytes`, `addRandomSuffix`, `allowOverwrite`, `cacheControlMaxAge`, `ifMatch`, and `onUploadCompleted`).

For `'delete'` operations, `options` also accepts `ifMatch` to require a specific ETag on the target blob. `'head'` accepts no additional fields beyond the ones in the table above.

`presignUrl()` returns:

```ts
{
  presignedUrl: string;
}
```

### Examples

Each operation in the delegation token's `operations` array can be signed into a URL with `presignUrl`. The four examples below cover every operation supported by the SDK.

#### `GET` - Get a blob

Fetch the presigned URL with a standard `GET` request.

```ts
import { issueSignedToken, presignUrl } from '@vercel/blob';

// Server: issue a signed token. `issueSignedToken` calls the Blob
// control API, so cache the result and reuse it across requests until it's
// near expiry to avoid a network round-trip on every URL you sign.
const token = await issueSignedToken({
  pathname: 'media/photo.png',
  operations: ['get'],
  validUntil: Date.now() + 60 * 60 * 1000,
});

// Sign a URL valid for 5 minutes, even though the token is valid for 1 hour.
const { presignedUrl } = await presignUrl(token, {
  operation: 'get',
  pathname: 'media/photo.png',
  access: 'private',
  validUntil: Date.now() + 5 * 60 * 1000,
});

const res = await fetch(presignedUrl);
```

#### `HEAD` - Check if a blob exists

Use a `'head'`-signed URL to check whether a blob exists and read its response headers (content type, size, cache headers) without transferring the blob's bytes.

```ts
import { issueSignedToken, presignUrl } from '@vercel/blob';

const token = await issueSignedToken({
  pathname: 'media/photo.png',
  operations: ['head'],
  validUntil: Date.now() + 60 * 60 * 1000,
});

const { presignedUrl } = await presignUrl(token, {
  operation: 'head',
  pathname: 'media/photo.png',
  access: 'private',
});

const res = await fetch(presignedUrl, { method: 'HEAD' });
const contentLength = res.headers.get('content-length');
const contentType = res.headers.get('content-type');
```

#### `PUT` - Upload a blob

Call `presignUrl` directly when you need a one-off upload URL outside of [`handleUploadPresigned`](#handleuploadpresigned), for example from a CLI or a server-to-server job. The PUT options enforce constraints on the upload at the CDN, so the URL is safe to hand to a client even if the client controls the request body:

- `allowedContentTypes` rejects requests whose `Content-Type` header is not in the list.
- `maximumSizeInBytes` rejects requests larger than the configured size.
- `addRandomSuffix` and `allowOverwrite` control collision behavior on the target pathname.
- `ifMatch` requires the existing blob at the pathname to have a specific `ETag`, so an upload only succeeds if the blob has not changed since you last read it (conditional write).
- `validUntil` shortens the URL's lifetime below the delegation token's expiry.

```ts
import { head, issueSignedToken, presignUrl } from '@vercel/blob';

const { etag } = await head(
  'https://<storeId>.private.blob.vercel-storage.com/media/photo.png',
);

const token = await issueSignedToken({
  pathname: 'media/photo.png',
  operations: ['put'],
  allowedContentTypes: ['image/png'],
  maximumSizeInBytes: 10 * 1024 * 1024,
  validUntil: Date.now() + 60 * 60 * 1000,
});

const { presignedUrl } = await presignUrl(token, {
  operation: 'put',
  pathname: 'media/photo.png',
  access: 'private',
  allowedContentTypes: ['image/png'],
  maximumSizeInBytes: 10 * 1024 * 1024,
  addRandomSuffix: false,
  allowOverwrite: true,
  ifMatch: etag,
});

const res = await fetch(presignedUrl, {
  method: 'PUT',
  headers: { 'content-type': 'image/png' },
  body: pngBytes,
});
```

#### `DELETE` - Delete a blob

Call `presignUrl` directly when you need a one-off delete URL, for example from a CLI or a server-to-server job. Pass `ifMatch` to require a specific `ETag` so the delete only succeeds if the blob has not changed since you last read it.

```ts
import { head, issueSignedToken, presignUrl } from '@vercel/blob';

const { etag } = await head(
  'https://<storeId>.private.blob.vercel-storage.com/media/photo.png',
);

const token = await issueSignedToken({
  pathname: 'media/photo.png',
  operations: ['delete'],
  validUntil: Date.now() + 60 * 60 * 1000,
});

const { presignedUrl } = await presignUrl(token, {
  operation: 'delete',
  pathname: 'media/photo.png',
  access: 'private',
  ifMatch: etag,
});

const res = await fetch(presignedUrl, { method: 'DELETE' });
```

## Presigned uploads

Vercel Signed URLs also support browser-to-blob uploads. Instead of generating a single-use client token with [`handleUpload`](/docs/vercel-blob/using-blob-sdk#handleupload), your server returns presigned `PUT` URLs. The browser uploads directly to the Blob control plane with no Vercel-managed bearer token in flight.

### `handleUploadPresigned()`

The `handleUploadPresigned` server-side route helper is the presigned counterpart of [`handleUpload`](/docs/vercel-blob/using-blob-sdk#handleupload). Imported from `@vercel/blob/client`, it issues presigned upload URLs for clients and verifies the upload-completed callback the same way `handleUpload` does.

```js
handleUploadPresigned(options);
```

| Parameter           | Required | Values                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `body`              | Yes      | The parsed request JSON, typed as `HandleUploadPresignedBody`.                                                                                                                                                                                                                                                                                                                                                                      |
| `request`           | Yes      | The incoming `Request`. Used to verify the `onUploadCompleted` callback signature.                                                                                                                                                                                                                                                                                                                                                  |
| `webhookPublicKey`  | No       | The public key used to verify the `onUploadCompleted` callback. Defaults to `process.env.BLOB_WEBHOOK_PUBLIC_KEY`. Note that when uploads are done via presigned URLs, this key is used for callback signature verification, instead of the read-write token.                                                                                                                                                                                                                                                                                                               |
| `getSignedToken`    | Yes      | An async function called with `(pathname, clientPayload, multipart)` that returns `{ token, urlOptions? }`. `token` is an `IssuedSignedToken` from `issueSignedToken`, scoped with `operations: ['put']`. `urlOptions` constrains the resulting upload URL. **You must authenticate and authorize the user inside this function** — otherwise your upload route allows anonymous uploads to your Blob store. |
| `onUploadCompleted` | No       | Same shape as in `handleUpload`. Useful for updating your database after the upload finishes.                                                                                                                                                                                                                                                                                                                                       |

#### Example

The route handler authenticates the request, issues a token scoped to `'put'`, and returns the constraints that should be embedded in the presigned URL. In production, cache the token across requests to avoid issuing a new token on every upload.

```ts filename="app/api/upload-presigned/route.ts" framework=nextjs-app
import { issueSignedToken } from '@vercel/blob';
import {
  type HandleUploadPresignedBody,
  handleUploadPresigned,
} from '@vercel/blob/client';
import { NextResponse } from 'next/server';

async function authenticate(request: Request): Promise<{ id: string, plan: 'hobby' | 'pro' } | null> {
  // Replace with your real auth check.
  return { id: 'user_123', plan: 'pro' };
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadPresignedBody;

  try {
    const jsonResponse = await handleUploadPresigned({
      body,
      request,
      getSignedToken: async (pathname) => {
        const user = await authenticate(request);
        if (!user) throw new Error('Not authorized');

        // You can cache this token until validUntil
        const token = await issueSignedToken({
          pathname,
          operations: ['put'],
          allowedContentTypes: ['image/png', 'image/jpeg', 'video/mp4'],
          maximumSizeInBytes: 10 * 1024 * 1024,
          validUntil: Date.now() + 60 * 60 * 1000,
        });

        // Give tighter restrictions to hobby users.
        const allowedContentTypes = user.plan === 'hobby' ? ['image/png', 'image/jpeg'] : undefined;
        const maximumSizeInBytes = user.plan === 'hobby' ? 5 * 1024 * 1024 : undefined;

        return {
          token,
          urlOptions: {
            allowedContentTypes,
            maximumSizeInBytes,
            validUntil: Date.now() + 10 * 60 * 1000,
            addRandomSuffix: true,
            allowOverwrite: false,
            cacheControlMaxAge: 30 * 24 * 60 * 60,
          },
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Persist `blob.url` or update your database here.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: message },
      { status: message === 'Not authorized' ? 401 : 400 },
    );
  }
}
```

From the browser, call [`uploadPresigned`](https://github.com/vercel/storage/tree/main/packages/blob) from `@vercel/blob/client` with the route URL — the SDK fetches a presigned URL and streams the file directly to Blob storage with no `Authorization` header in flight:

```tsx filename="app/upload/page.tsx" framework=nextjs-app
'use client';

import { uploadPresigned, type PutBlobResult } from '@vercel/blob/client';
import { useRef, useState } from 'react';

export default function UploadPage(): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const file = inputRef.current?.files?.[0];
        if (!file) return;

        const result = await uploadPresigned(file.name, file, {
          access: 'private',
          handleUploadUrl: '/api/upload-presigned',
        });
        setBlob(result);
      }}
    >
      <input ref={inputRef} type="file" />
      <button type="submit">Upload</button>
      {blob ? <a href={blob.url}>{blob.url}</a> : null}
    </form>
  );
}
```

### Upgrading from `handleUpload`

If you already use [`handleUpload`](/docs/vercel-blob/using-blob-sdk#handleupload), the upgrade is mostly mechanical. The example above shows the full new form. The changes from the legacy flow are:

On the server, swap `handleUpload` for `handleUploadPresigned` and mint the token inside `getSignedToken`. The constraints you used to return from `onBeforeGenerateToken` move into `urlOptions`; `onUploadCompleted` keeps the same shape, so database writes carry over unchanged.

```ts
import { issueSignedToken } from '@vercel/blob';
import {
  type HandleUploadPresignedBody,
  handleUploadPresigned,
} from '@vercel/blob/client';

await handleUploadPresigned({
  body,
  request,
  getSignedToken: async (pathname) => ({
    token: await issueSignedToken({ pathname, operations: ['put'] }),
    urlOptions: {
      allowedContentTypes: ['image/png', 'image/jpeg'],
      addRandomSuffix: true,
      allowOverwrite: false,
      cacheControlMaxAge: 30 * 24 * 60 * 60,
    },
  }),
  onUploadCompleted: async ({ blob, tokenPayload }) => {
    // Same shape as `handleUpload` — your database writes carry over.
  },
});
```

Also set `BLOB_WEBHOOK_PUBLIC_KEY` in your project's environment so `handleUploadPresigned` can verify the upload-completed callback. Existing connections can opt in from the store's connection menu.

On the client:

- Replace `upload` with `uploadPresigned`. Both come from `@vercel/blob/client`.
- Point `handleUploadUrl` at the new presigned route handler.
- The result type is `PutBlobResult`. If you were typing the awaited value with `BlobResult`, update it.


---

[View full sitemap](/docs/sitemap)
