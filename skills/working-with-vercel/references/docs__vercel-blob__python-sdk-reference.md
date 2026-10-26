---
title: Python SDK Reference
product: vercel
url: /docs/vercel-blob/python-sdk-reference
canonical_url: "https://vercel.com/docs/vercel-blob/python-sdk-reference"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/vercel-blob
related:
  - /docs/vercel-blob/using-blob-sdk
  - /docs/vercel-blob
  - /docs/vercel-blob/blocked-store
  - /docs/vercel-blob/client-upload
  - /docs/vercel-blob/vercel-signed-urls
summary: Reference for the Vercel Blob Python SDK, including uploads, streaming and multipart uploads, downloads, metadata, listing, copying, deletion,...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-blob/python-sdk-reference.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "d0c83995ab55b6464c4131538292cb2a9441265e0a865ee05006946b55e2bc1f"
---

# Python SDK Reference

> Vercel Blob is available on all plans
>
> Those with the owner, member, developer role can access this feature

Use the Vercel Blob Python SDK to upload, download, inspect, list, copy, and delete blobs from Python applications. The SDK provides an asynchronous API in `vercel.blob` and a matching synchronous API in `vercel.blob.sync`.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Python on Vercel is now generally available](https://vercel.com/changelog/python-on-vercel-is-now-generally-available)
- [Python on Vercel is now generally available](https://vercel.com/blog/python-on-vercel-is-now-generally-available)
- [The Complete Guide to Vercel Blob](https://vercel.com/kb/guide/vercel-blob) — Vercel Blob stores and serves files of any size through Vercel's global network. Learn how Blob works, what it costs, an
- [How to upload and store files with Vercel](https://vercel.com/kb/guide/how-to-upload-and-store-files-with-vercel) — Vercel file uploads done right cover Server Actions, client-direct upload, and multipart for 5 TB files, with auth and c
- [Build with Vercel Blob on Next.js](https://vercel.com/kb/guide/vercel-blob-nextjs) — Deploy the Vercel Blob Next.js Starter and learn how client uploads store images securely in a private Blob store.
- [Build with Vercel Blob on Nuxt](https://vercel.com/kb/guide/vercel-blob-nuxt) — Set up Vercel Blob in a Nuxt application with NuxtHub, upload and serve files, and deliver optimized images with Nuxt Im
- [How to process user-uploaded files with Vercel Sandbox and Vercel Blob](https://vercel.com/kb/guide/user-uploaded-files-vercel-sandbox-and-blob) — Learn how to upload files to Vercel Blob, process them safely with FFmpeg in an isolated Vercel Sandbox, and store the r
- [Public Storage](https://vercel.com/docs/vercel-blob/public-storage) — Learn how to use public Vercel Blob storage to serve files accessible to anyone with the URL

Full cross-link map for this page: [/docs/vercel-blob/python-sdk-reference.graph.md](/docs/vercel-blob/python-sdk-reference.graph.md)
<!-- /docsgraph:related -->

For JavaScript and TypeScript, see the [JS SDK Reference](/docs/vercel-blob/using-blob-sdk).

## Install the SDK

Install the Vercel Python package. It requires Python 3.10 or later:

```bash filename="Terminal"
uv add vercel
```

The `vercel` package includes the Blob SDK from the `vercel-blob` package. To install only the Blob SDK, add `vercel-blob` instead. This page documents `vercel-blob` 0.5.0 and later. Earlier `vercel-blob` releases on PyPI are an unrelated package that doesn't provide the `vercel.blob` module.

The examples on this page use the asynchronous API. You can import it as a module:

```python filename="main.py"
from vercel import blob
```

The SDK creates and reuses a default session when you first use it. Most applications don't need to create one. See [SDK sessions](#sdk-sessions) when you need a custom HTTP client or custom credentials.

## Authentication

By default, the SDK resolves credentials in this order:

1. A Vercel OpenID Connect (OIDC) token, from the current Vercel request or `VERCEL_OIDC_TOKEN`, paired with `BLOB_STORE_ID`
2. `BLOB_READ_WRITE_TOKEN`, then `VERCEL_BLOB_READ_WRITE_TOKEN`

If the SDK finds an OIDC token but `BLOB_STORE_ID` isn't set, and no read-write token is available, it raises `BlobCredentialsError`. `BLOB_STORE_ID` can include the `store_` prefix.

When you [connect a store to a project](/docs/vercel-blob#connecting-a-store-to-your-projects), Vercel adds `BLOB_STORE_ID` and the OIDC token to the project, so code running on Vercel works without configuration. For local development, run `vercel link` and `vercel env pull`, then load `.env.local` into your Python process with a tool such as `python-dotenv`. When a development OIDC token expires, the SDK refreshes it with your Vercel CLI credentials.

To supply credentials from your own configuration, pass a credentials factory to the session. See [Configure Blob](#configure-blob).

## The `access` argument

Uploads, copies, and downloads require `access="public"` or `access="private"`, and the value must match the store's [access mode](/docs/vercel-blob#private-and-public-storage). `head_blob()`, `delete_blob()`, `query_blobs()`, and `query_blob_entries()` don't take an `access` argument.

## Pathnames and URLs

Operations that read, inspect, copy, or delete a blob accept either a pathname or a Blob delivery URL. Uploads and copy destinations accept a pathname.

A pathname is a literal object name relative to the store, not a URL-encoded string or a local file path. The SDK removes one leading slash and rejects:

- Empty pathnames
- Control characters and invalid Unicode
- `//`
- `.` and `..` path segments

Pathnames for `put_blob()`, `multipart_upload_blob()`, and `copy_blob()` destinations can contain up to 950 UTF-16 code units, the same limit as the JS SDK. Characters outside the Unicode Basic Multilingual Plane count as two units.

The SDK encodes characters such as `?`, `#`, and `%` when it builds a delivery URL from a pathname. Delivery URLs must use HTTPS and a `<store-id>.<access>.blob.vercel-storage.com` host. The SDK keeps query strings, removes fragments, and doesn't follow redirects. Custom delivery domains aren't supported.

A private delivery URL must belong to the store identified by your credentials. You can download a public delivery URL without credentials, but a pathname always needs credentials to identify the store.

> **💡 Note:** Pathname validation isn't a shell-escaping or filesystem-safety guarantee.
> Don't use untrusted pathnames as commands or unchecked local file paths.

## Upload a blob

### `put_blob()`

Upload bytes to a blob:

```python filename="main.py"
import asyncio

from vercel import blob


async def main() -> None:
    uploaded = await blob.put_blob(
        "reports/summary.txt",
        b"Quarterly summary",
        access="private",  # or "public"
        add_random_suffix=True,
    )
    print(uploaded.url)


asyncio.run(main())
```

`put_blob()` accepts these arguments:

| Parameter               | Type                                          | Default  | Description                                                                                                                       |
| ----------------------- | --------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `pathname`              | `str`                                         | Required | Destination pathname in the store.                                                                                                |
| `body`                  | `bytes \| bytearray \| memoryview \| PutBody` | Required | Content to upload. See [Stream an upload](#stream-an-upload) for streaming sources.                                               |
| `access`                | `"public" \| "private"`                       | Required | Must match the store's access mode.                                                                                               |
| `content_length`        | `int \| None`                                 | `None`   | Length in bytes. Optional for in-memory buffers and required for streaming sources.                                               |
| `content_type`          | `str \| None`                                 | `None`   | Media type to store. When omitted, Vercel Blob determines it.                                                                     |
| `add_random_suffix`     | `bool`                                        | `False`  | Add a random suffix to the pathname to avoid collisions.                                                                          |
| `allow_overwrite`       | `bool`                                        | `False`  | Replace an existing blob at the same pathname. Without it, uploading to an existing pathname fails.                               |
| `cache_control_max_age` | `int \| None`                                 | `None`   | Cache lifetime in whole seconds. The service default of one month applies when omitted. See [Caching](/docs/vercel-blob#caching). |

`put_blob()` copies in-memory buffers when you call it, so later changes to a `bytearray` don't affect the upload. It returns a `PutResult`:

| Property              | Type  | Description                                                          |
| --------------------- | ----- | -------------------------------------------------------------------- |
| `url`                 | `str` | Blob delivery URL.                                                   |
| `download_url`        | `str` | Delivery URL that forces a download.                                 |
| `pathname`            | `str` | Stored pathname, including the random suffix when you requested one. |
| `content_type`        | `str` | Stored media type.                                                   |
| `content_disposition` | `str` | Stored `Content-Disposition` header value.                           |
| `etag`                | `str` | Entity tag for the stored content.                                   |

`PutResult` doesn't include the blob's size or upload time. Use [`head_blob()`](#head_blob) to retrieve them. When you set `add_random_suffix=True`, use the returned `pathname` or `url` to refer to the blob.

### Stream an upload

`put_blob()` also accepts streaming sources when you pass `content_length`. Each API accepts only sources of its own shape:

| API                | Accepted streaming sources                                                      |
| ------------------ | ------------------------------------------------------------------------------- |
| `vercel.blob`      | `AsyncByteReader`, an object with `async def read()`, or `AsyncIterable[bytes]` |
| `vercel.blob.sync` | `SyncByteReader`, an object with a blocking `read()`, or `Iterable[bytes]`      |

The SDK sends exactly `content_length` bytes with a `Content-Length` header and doesn't spool the source to a temporary file. If the source ends early or produces more bytes, the SDK raises `BlobContentLengthError` and doesn't send the excess data. Uploads with an unknown length aren't supported.

Streaming sources remain yours: the SDK doesn't close, seek, or retry them, and a source's position is unspecified after a failed upload.

The asynchronous API doesn't run blocking reads on worker threads for you, and it raises `TypeError` for sync readers and sync iterables, such as a file opened with `open()`. Pass an async byte reader from your async file library, or wrap blocking reads in an async iterable. This example reads a local file on a worker thread:

```python filename="main.py"
import asyncio
import os
from collections.abc import AsyncIterator
from typing import BinaryIO

from vercel import blob

CHUNK_SIZE = 64 * 1024


async def read_in_thread(file: BinaryIO) -> AsyncIterator[bytes]:
    # Read each chunk on a worker thread so the event loop isn't blocked
    while chunk := await asyncio.to_thread(file.read, CHUNK_SIZE):
        yield chunk


async def upload_report() -> blob.PutResult:
    with open("report.pdf", "rb") as file:
        return await blob.put_blob(
            "reports/report.pdf",
            read_in_thread(file),
            access="private",
            content_length=os.fstat(file.fileno()).st_size,
        )
```

## Upload a blob in parts

### `multipart_upload_blob()`

Use `multipart_upload_blob()` when you want to choose each part of a large upload. Enter it with `async with`, upload parts in order, and the SDK publishes the blob when the block exits successfully:

```python filename="main.py"
from collections.abc import AsyncIterator

from vercel import blob

PART_SIZE = 5 * 1024 * 1024


async def first_part() -> AsyncIterator[bytes]:
    for _ in range(80):
        yield b"x" * (64 * 1024)


async def upload_parts() -> blob.PutResult:
    async with blob.multipart_upload_blob(
        "videos/intro.bin",
        access="private",
    ) as upload:
        await upload.upload_part(first_part(), content_length=PART_SIZE)
        await upload.upload_part(b"tail")

    return upload.result
```

`multipart_upload_blob()` accepts `pathname`, `access`, `content_type`, `add_random_suffix`, `allow_overwrite`, and `cache_control_max_age` with the same meaning as in [`put_blob()`](#put_blob). Don't await the returned upload; enter it as a context manager.

`upload_part(body, *, content_length=None)` accepts the same bodies as `put_blob()`. It infers the length of in-memory buffers and requires `content_length` for streaming sources. The SDK numbers parts in the order you upload them and tracks their entity tags, so there are no part numbers or manual completion step.

Parts follow these rules:

- Each part contains between 1 byte and 5 GiB, and an upload contains at most 10,000 parts.
- Every part except the last one must contain at least 5 MiB. The SDK rejects a part that follows a smaller part before reading its source.
- Upload one part at a time. Overlapping `upload_part()` calls fail the upload, and the SDK doesn't retry failed parts.
- An upload with no parts raises `BlobError` on exit. Use `put_blob(pathname, b"", ...)` to create an empty blob.

A successful exit from the `async with` block, including an early `return` or `break`, publishes the uploaded parts and sets `upload.result` to a `PutResult`. An exception or cancellation inside the block prevents publishing. A failed part fails the whole upload, even if you catch its exception, and exiting the block then raises `BlobError` instead of publishing a partial blob. Reading `upload.result` before a successful exit raises `BlobError`.

> **💡 Note:** Vercel Blob has no abort action for multipart uploads. When an upload fails,
> the SDK doesn't delete the parts it already sent. If the completion response
> is lost, the blob may or may not be published, and the SDK doesn't retry
> completion.

## Download a blob

### `get_blob()`

Download a complete blob into memory:

```python filename="main.py"
from vercel import blob

result = await blob.get_blob("reports/summary.txt", access="private")
print(result.metadata.content_type)
print(result.body.decode())
```

`get_blob()` accepts a pathname or delivery URL and `access`. It returns a `GetResult` with `metadata`, a [`DownloadMetadata`](#download-metadata) value, and `body`, the complete content as `bytes`. The SDK closes the response before returning, and a read error raises an exception instead of returning a partial body.

### `stream_blob()`

Read a blob incrementally without buffering it in memory:

```python filename="main.py"
from vercel import blob

received = 0
async with blob.stream_blob("videos/intro.bin", access="private") as download:
    print(download.metadata.size)
    async for chunk in download:
        received += len(chunk)
```

`stream_blob()` accepts the same arguments as `get_blob()`. Don't await it; enter it with `async with`. Entering the block sends the request, so `download.metadata` is available before you read the body.

A download has one consumer. Iterate it once inside its block. Each chunk contains at most 64 KiB. The SDK closes the response at the end of the content, when the block exits early, and on read errors or cancellation. You can also close it with `await download.aclose()`. The SDK doesn't restart partial downloads.

This FastAPI route streams a private blob to the browser. A background task closes the download after the response finishes:

```python filename="main.py"
from contextlib import AsyncExitStack

from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from starlette.background import BackgroundTask

from vercel import blob

app = FastAPI()


@app.get("/api/file")
async def get_file(pathname: str) -> StreamingResponse:
    # Your auth goes here

    stack = AsyncExitStack()
    try:
        download = await stack.enter_async_context(
            blob.stream_blob(pathname, access="private")
        )
    except blob.BlobNotFoundError:
        raise HTTPException(status_code=404, detail="Not found") from None

    return StreamingResponse(
        download,
        media_type=download.metadata.content_type,
        headers={"X-Content-Type-Options": "nosniff"},
        background=BackgroundTask(stack.aclose),
    )
```

### Download metadata

`GetResult.metadata` and `download.metadata` are `DownloadMetadata` values derived from the response:

| Property              | Type                | Description                                |
| --------------------- | ------------------- | ------------------------------------------ |
| `url`                 | `str`               | Delivery URL the SDK requested.            |
| `status_code`         | `int`               | HTTP status code.                          |
| `size`                | `int \| None`       | Value of the `Content-Length` header.      |
| `content_type`        | `str \| None`       | Value of the `Content-Type` header.        |
| `content_disposition` | `str \| None`       | Value of the `Content-Disposition` header. |
| `cache_control`       | `str \| None`       | Value of the `Cache-Control` header.       |
| `etag`                | `str \| None`       | Value of the `ETag` header.                |
| `last_modified`       | `datetime \| None`  | Parsed `Last-Modified` header.             |
| `headers`             | `Mapping[str, str]` | All response headers.                      |

Header-derived properties are `None` when the response omits the header. `metadata.size` stays `None` without a `Content-Length` header, even after `get_blob()` reads the body, so use `len(result.body)` for the number of downloaded bytes.

## Get blob metadata

### `head_blob()`

Retrieve a blob's metadata without downloading its content:

```python filename="main.py"
from vercel import blob

metadata = await blob.head_blob("reports/summary.txt")
print(metadata.size, metadata.uploaded_at)
```

`head_blob()` accepts a pathname or delivery URL and returns a `HeadResult`:

| Property              | Type          | Description                                |
| --------------------- | ------------- | ------------------------------------------ |
| `url`                 | `str`         | Blob delivery URL.                         |
| `download_url`        | `str`         | Delivery URL that forces a download.       |
| `pathname`            | `str`         | Stored pathname.                           |
| `size`                | `int`         | Size in bytes.                             |
| `etag`                | `str`         | Entity tag for the stored content.         |
| `uploaded_at`         | `datetime`    | Upload time.                               |
| `content_type`        | `str \| None` | Stored media type.                         |
| `content_disposition` | `str`         | Stored `Content-Disposition` header value. |
| `cache_control`       | `str`         | Stored `Cache-Control` header value.       |

## List blobs

### `query_blobs()`

Iterate over the blobs in a store, including blobs in nested folders:

```python filename="main.py"
from vercel import blob

total_bytes = 0
async for item in blob.query_blobs(prefix="reports/"):
    print(item.pathname, item.size)
    total_bytes += item.size
```

`query_blobs()` returns an async iterator and follows pagination cursors automatically. Don't await it; iterate it with `async for`. It accepts these keyword arguments:

| Parameter   | Type          | Default | Description                                                                                 |
| ----------- | ------------- | ------- | ------------------------------------------------------------------------------------------- |
| `prefix`    | `str \| None` | `None`  | Literal pathname prefix. Only blobs whose pathname starts with it are returned.             |
| `page_size` | `int \| None` | `None`  | Maximum number of blobs fetched per request, from 1 to 1,000. The service default is 1,000. |
| `cursor`    | `str \| None` | `None`  | Opaque cursor at which to start listing. The iterator follows later cursors itself.         |

`page_size` doesn't limit the total number of blobs the iterator yields. To stop early, break out of the loop. The iterator doesn't fetch further pages after you stop.

Creating the iterator doesn't send a request. The SDK validates the arguments and fetches the first page when iteration begins, then fetches each following page only after it yields the current page's blobs. Errors propagate during iteration, and the SDK doesn't retry or restart the listing. A listing isn't a snapshot, so blobs that change while you iterate may or may not appear. Iterate within the session that created the iterator.

Each item is a `ListBlob`:

| Property       | Type       | Description                          |
| -------------- | ---------- | ------------------------------------ |
| `url`          | `str`      | Blob delivery URL.                   |
| `download_url` | `str`      | Delivery URL that forces a download. |
| `pathname`     | `str`      | Stored pathname.                     |
| `size`         | `int`      | Size in bytes.                       |
| `uploaded_at`  | `datetime` | Upload time.                         |
| `etag`         | `str`      | Entity tag for the stored content.   |

`ListBlob` doesn't include the content type or cache settings. Use [`head_blob()`](#head_blob) to retrieve them for a single blob.

### `query_blob_entries()`

Browse one folder level at a time. `query_blob_entries()` yields `ListBlob` values for the blobs directly inside the prefix and `BlobPrefix` values for its subfolders:

```python filename="main.py"
from vercel import blob


async def print_tree(prefix: str = "", indent: str = "") -> None:
    async for entry in blob.query_blob_entries(prefix=prefix):
        match entry:
            case blob.BlobPrefix(prefix=folder):
                print(f"{indent}{folder.removeprefix(prefix)}")
                await print_tree(folder, indent + "  ")
            case blob.ListBlob(pathname=pathname, size=size):
                print(f"{indent}{pathname.removeprefix(prefix)} ({size} bytes)")
```

`query_blob_entries()` accepts the same `prefix`, `page_size`, and `cursor` arguments as `query_blobs()` and paginates the same way. These rules also apply:

- A nonempty `prefix` must end with `/`. Omit it, or pass `""`, to browse the root of the store. The SDK doesn't normalize or URL-decode prefixes.
- `BlobPrefix.prefix` contains the subfolder's full prefix, including its trailing slash, so you can pass it to another `query_blob_entries()` call. Folders are virtual groupings of pathnames, not stored blobs, so they have no size or entity tag.
- `page_size` counts both blobs and folders. Within each page, blobs come before folders, and there's no sort order across pages.

## Copy a blob

### `copy_blob()`

Copy a blob to a new pathname in the same store:

```python filename="main.py"
from vercel import blob

draft = await blob.head_blob("drafts/getting-started.md")

published = await blob.copy_blob(
    draft.url,
    "published/getting-started.md",
    access="private",
    content_type="text/markdown",
    cache_control_max_age=3600,
    if_match=draft.etag,
)
print(published.url)
```

Vercel Blob copies the content on the server, so the SDK doesn't download the source. `copy_blob()` accepts these arguments:

| Parameter               | Type                    | Default  | Description                                                                                      |
| ----------------------- | ----------------------- | -------- | ------------------------------------------------------------------------------------------------ |
| `source`                | `str`                   | Required | Pathname or delivery URL of the blob to copy.                                                    |
| `pathname`              | `str`                   | Required | Destination pathname in the same store.                                                          |
| `access`                | `"public" \| "private"` | Required | Must match the store's access mode.                                                              |
| `content_type`          | `str \| None`           | `None`   | Media type to store on the copy.                                                                 |
| `add_random_suffix`     | `bool`                  | `False`  | Add a random suffix to the destination pathname.                                                 |
| `allow_overwrite`       | `bool`                  | `False`  | Replace an existing blob at the destination. Without it, copying to an existing pathname fails.  |
| `cache_control_max_age` | `int \| None`           | `None`   | Cache lifetime in whole seconds. The service default of one month applies when omitted.          |
| `if_match`              | `str \| None`           | `None`   | Entity tag the **source** blob must still have. A mismatch raises `BlobPreconditionFailedError`. |

The copy doesn't inherit the source's content type or cache lifetime. Pass `content_type` and `cache_control_max_age` again when the copy needs them.

`copy_blob()` returns a `CopyResult` with the same properties as [`PutResult`](#put_blob): `url`, `download_url`, `pathname`, `content_type`, `content_disposition`, and `etag`.

## Delete blobs

### `delete_blob()`

Delete one blob, or up to 1,000 blobs in one request, by pathname or delivery URL:

```python filename="main.py"
from vercel import blob

await blob.delete_blob("reports/summary.txt")

await blob.delete_blob(["reports/2025.pdf", "reports/2026.pdf"])
```

`delete_blob()` returns `None`. Deleting a blob that doesn't exist succeeds, but other failures, such as an unknown store, raise an error. Deleted blobs can remain in the CDN cache for up to one minute.

The SDK validates every target before it sends the request, and it doesn't split larger lists into several requests. Batch deletion isn't atomic, and the SDK doesn't retry it, so a failed request can leave some blobs deleted. Because deleting a missing blob succeeds, you can retry the whole batch.

Pass `if_match` to delete a blob only if it still has that entity tag. `if_match` works only with a single target:

```python filename="main.py"
from vercel import blob

metadata = await blob.head_blob("config.json")
await blob.delete_blob("config.json", if_match=metadata.etag)
```

## Synchronous API

The synchronous API mirrors the asynchronous API and doesn't need an event loop. Import it explicitly from `vercel.blob`:

```python filename="main.py"
from vercel.blob import sync as blob

uploaded = blob.put_blob("hello.txt", b"Hello, Blob!", access="private")
try:
    result = blob.get_blob(uploaded.url, access="private")
    print(result.body)

    with blob.stream_blob(uploaded.url, access="private") as download:
        for chunk in download:
            print(len(chunk))

    print(blob.head_blob(uploaded.url).size)
finally:
    blob.delete_blob(uploaded.url)
```

Remove `await` and use regular context managers and iterators. Iterate `query_blobs()` and `query_blob_entries()` with `for`, and close a sync download early with `download.close()`.

The sync `put_blob()` and `upload_part()` accept sync readers, such as open binary files, and sync iterables:

```python filename="main.py"
from pathlib import Path

from vercel.blob import sync as blob

path = Path("report.pdf")
with path.open("rb") as file:
    uploaded = blob.put_blob(
        "reports/report.pdf",
        file,
        access="private",
        content_length=path.stat().st_size,
    )
```

Use the asynchronous API unless your application is synchronous. Don't call the synchronous API from an active async event loop.

## Errors

Catch `BlobError` to handle any Blob service error. Every `BlobError` exposes `status_code` and `code` when they're available. Catch a more specific type when your application can recover differently:

| Error                            | Meaning                                                                                               |
| -------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `BlobNotFoundError`              | The blob doesn't exist. Also a `FileNotFoundError`.                                                   |
| `BlobAccessError`                | The credentials can't access the blob. Also a `PermissionError`.                                      |
| `BlobCredentialsError`           | The SDK couldn't resolve valid credentials.                                                           |
| `BlobStoreNotFoundError`         | The store doesn't exist.                                                                              |
| `BlobStoreSuspendedError`        | The store is suspended. See [Blocked Blob Store](/docs/vercel-blob/blocked-store).                    |
| `BlobContentTypeNotAllowedError` | The service rejected the content type.                                                                |
| `BlobFileTooLargeError`          | The blob exceeds a size limit.                                                                        |
| `BlobPreconditionFailedError`    | The blob's entity tag didn't match `if_match`, or the blob changed while the operation was in flight. |
| `BlobServiceRateLimited`         | The service rate limited the request. `retry_after` contains the suggested wait in seconds, or `0`.   |
| `BlobServiceNotAvailable`        | The service is temporarily unavailable.                                                               |
| `BlobContentLengthError`         | A streaming source didn't match its `content_length`.                                                 |
| `BlobStreamError`                | A response was malformed or a download was read incorrectly. Also an `OSError`.                       |
| `BlobUnknownError`               | The request failed for an unrecognized reason.                                                        |

Invalid arguments, such as a malformed pathname, raise before the SDK resolves credentials or sends a request. The SDK doesn't retry failed requests.

```python filename="main.py"
from vercel import blob

try:
    metadata = await blob.head_blob("reports/summary.txt")
except blob.BlobNotFoundError:
    metadata = None
except blob.BlobServiceRateLimited as error:
    print(f"Retry in {error.retry_after} seconds")
    raise
```

## Features available in the JS SDK

The Python SDK supports conditional copies and deletes, but it doesn't currently support conditional uploads or conditional reads, renaming blobs, cache bypass on reads, [client uploads](/docs/vercel-blob/client-upload), [Vercel Signed URLs](/docs/vercel-blob/vercel-signed-urls), optimized image uploads, or upload progress callbacks. Use the [JS SDK](/docs/vercel-blob/using-blob-sdk) or the [Vercel CLI](/docs/cli/blob) for these operations.

## SDK sessions

An SDK session owns the HTTP connection pool and service clients used by Vercel Python SDK calls. The SDK creates and reuses a default session, so most applications should call the SDK directly. Create an explicit session only when you need to customize its HTTP client or Blob's configuration.

Import `session` from `vercel.api` and use it as an async or sync context manager. It accepts `service_options`, a sequence of service-specific options, and `httpx_client_factory`, a factory for the HTTP client that the session closes when its context exits. See [SDK sessions](/docs/sandbox/python-sdk-reference#sdk-sessions) in the Sandbox Python SDK reference for the full parameter reference.

Nested sessions inherit their parent's configuration. Run Blob calls inside their session's scope, including `stream_blob()` and `multipart_upload_blob()` blocks, and don't use sync Blob calls inside an async session or async Blob calls inside a sync session.

### Configure Blob

Pass `BlobServiceOptions` to configure Blob calls in an async session. This example reads a read-write token and store ID from custom environment variables:

```python filename="main.py"
import asyncio
import os

from vercel import blob
from vercel.api import session


async def resolve_credentials() -> blob.BlobCredentials:
    return blob.BlobCredentials(
        token=os.environ["ACME_BLOB_TOKEN"],
        store_id=os.environ["ACME_BLOB_STORE_ID"],
    )


async def main() -> None:
    options = blob.BlobServiceOptions(credentials_factory=resolve_credentials)

    async with session(service_options=[options]):
        metadata = await blob.head_blob("reports/summary.txt")
        print(metadata.size)


asyncio.run(main())
```

`BlobCredentials` accepts `token`, `store_id`, and `kind`. `kind` defaults to `CredentialKind.READ_WRITE`, and the store ID must match the store in the read-write token. Set `kind=blob.CredentialKind.OIDC` to authenticate with an OIDC token. The SDK calls the factory for each operation that needs credentials, so it can return refreshed tokens, but every call within a session must identify the same store.

`BlobServiceOptions` accepts these parameters:

| Parameter             | Default                                                | Description                                                                             |
| --------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| `credentials_factory` | Default OIDC and environment resolver                  | Callable that returns `BlobCredentials`. Async sessions accept sync or async callables. |
| `base_url`            | `VERCEL_BLOB_API_URL` or `https://vercel.com/api/blob` | Blob API base URL. Override it only for testing.                                        |

For sync calls, use `SyncBlobServiceOptions` from `vercel.blob.sync` with a synchronous factory and a sync session. The sync API rejects async factories.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
