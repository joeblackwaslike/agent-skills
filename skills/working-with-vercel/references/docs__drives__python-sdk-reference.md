---
title: Python SDK Reference
product: vercel
url: /docs/drives/python-sdk-reference
canonical_url: "https://vercel.com/docs/drives/python-sdk-reference"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/drives
related:
  - /docs/drives/sdk-reference
  - /docs/drives/cli-reference
  - /docs/drives/quickstart
  - /docs/sandbox/concepts/authentication
  - /docs/drives/pricing
summary: Create, list, fork, and delete Vercel Drives with the Vercel Drives Python SDK.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/drives/python-sdk-reference.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "807ca3a00627a0e2a5ceabdef23cc03349cf2dbe3a6529c66c34630eed4ab73c"
---

# Python SDK Reference

Use the `vercel.drives` module to manage Vercel Drives in Python. Drive management APIs are asynchronous and use the project from the SDK's resolved credentials.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Drives for Vercel Sandbox are now in public beta](https://vercel.com/changelog/drives-for-vercel-sandbox-are-now-in-public-beta)
- [Vercel Drives is now generally available](https://vercel.com/changelog/vercel-drives-is-now-generally-available)
- [Drives](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives) — Vercel MCP tools for drives.
- [Sandbox Regions](https://vercel.com/docs/sandbox/concepts/regions) — Choose the regions where Vercel Sandbox runs your sandboxes, set a project default, and configure failover regions.
- [List drives](https://vercel.com/docs/rest-api/drives/list-drives) — GET /v1/drives — Retrieves a paginated list of drives belonging to a specific project.
- [Get a drive](https://vercel.com/docs/rest-api/drives/get-a-drive) — GET /v1/drives/{nameOrId} — Gets an existing drive by project and name or drive ID. Returns 404 if doesn't exist.
- [Get or create a drive](https://vercel.com/docs/rest-api/drives/get-or-create-a-drive) — POST /v1/drives/{name} — Gets an existing drive by project and name, or creates it when it does not exist.

Full cross-link map for this page: [/docs/drives/python-sdk-reference.graph.md](/docs/drives/python-sdk-reference.graph.md)
<!-- /docsgraph:related -->

For JavaScript and TypeScript, see the [JS SDK reference](/docs/drives/sdk-reference). For shell commands, see the [Drives CLI reference](/docs/drives/cli-reference).

## Installation

Install [`vercel-drives`](https://pypi.org/project/vercel-drives/). It requires Python 3.11 or later:

**uv**

```bash
uv add vercel-drives
```

**pip**

```bash
pip install vercel-drives
```

Follow the [quickstart](/docs/drives/quickstart) to link a project and pull its development OIDC token to `.env.local`. With uv, run `uv run --env-file .env.local python create_drive.py`. With pip, load `.env.local` with `python-dotenv` as shown in the quickstart, or set `VERCEL_OIDC_TOKEN` in the process environment. For other credentials, see [Sandbox authentication](/docs/sandbox/concepts/authentication).

## Creating or retrieving a drive

`get_or_create_drive()` returns `(drive, created)`. `created` is `True` only when the call creates a drive:

```py filename="create_drive.py"
import asyncio

from vercel import drives

async def main() -> None:
    drive, created = await drives.get_or_create_drive(
        name="workspace-cache",
        region="sfo1",
    )
    print(drive.name, drive.region, created)

asyncio.run(main())
```

| Parameter        | Type                           | Description                                                                                                 |
| ---------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `name`           | `str`                          | Required. Unique within the project.                                                                        |
| `region`         | `str \| CurrentRegion \| None` | Optional. Defaults to `iad1` when the call and client don't set a region.                                   |
| `max_size_bytes` | `int \| None`                  | Optional maximum size in bytes. Must be a multiple of 4096. See [size limits](/docs/drives/pricing#limits). |

You can't change the region or maximum size after creation. The request fails if you supply a region or maximum size that differs from the existing drive's configuration.

Use `get_drive(name_or_id=...)` to retrieve an existing drive by name or ID without creating it. The SDK raises `DriveApiError` with status code 404 if the drive doesn't exist.

## Listing drives

`query_drives()` returns an async iterator and follows pagination cursors automatically:

```py filename="list_drives.py"
import asyncio

from vercel import drives

async def main() -> None:
    query = drives.DriveQueryByName(name_prefix="workspace", sort_order="asc")
    async for drive in drives.query_drives(query=query, page_size=10):
        print(drive.name, drive.current_sandbox_name or "detached")

asyncio.run(main())
```

| Query type              | Fields                               |
| ----------------------- | ------------------------------------ |
| `DriveQueryByName`      | `sort_order`, optional `name_prefix` |
| `DriveQueryByCreatedAt` | `sort_order`                         |
| `DriveQueryByUpdatedAt` | `sort_order`                         |

`query_drives()` also accepts `page_size` and `cursor`.

## Mounting drives and snapshots

See the [write and snapshot examples](/docs/sandbox/concepts/drives#mounting-a-drive). The sandbox and the drive must belong to the same project and region.

## Forking a drive

`drive.fork(name=...)` returns an independent copy. The fork inherits the source drive's project, region, and maximum size. Before forking, [write a file to the source drive and stop the writer](/docs/sandbox/concepts/drives#mounting-a-drive).

```py filename="fork_drive.py"
import asyncio

from vercel import drives

async def main() -> None:
    source = await drives.get_drive(name_or_id="workspace-cache")
    fork = await source.fork(name="workspace-cache-fork")
    print(fork.name, fork.parent_drive_id == source.id)

asyncio.run(main())
```

You can also use `drives.fork_drive(source=..., name=...)` with the source drive's name. The new name must be unique within the project.

## Deleting a drive

`drive.delete()` permanently deletes the drive and its data. A read-write mount blocks deletion. A read-only mount does not.

```py filename="delete_drive.py"
import asyncio

from vercel import drives

async def main() -> None:
    drive = await drives.get_drive(name_or_id="workspace-cache")
    await drive.delete()

asyncio.run(main())
```

Use `drives.delete_drive(name=...)` when you don't have a drive handle.

## Drive properties

| Property                                     | Type          | Description                                               |
| -------------------------------------------- | ------------- | --------------------------------------------------------- |
| `id`, `name`, `project_id`, `region`         | `str`         | Drive identity and location.                              |
| `max_size_bytes`                             | `int`         | Maximum size in bytes.                                    |
| `parent_drive_id`, `root_drive_id`           | `str \| None` | Source and original drive IDs for a fork, when available. |
| `current_session_id`, `current_sandbox_name` | `str \| None` | Current read-write attachment, if any.                    |
| `created_at`, `updated_at`                   | `int`         | Creation and last update times as Unix timestamps.        |

## Next steps

- [JS SDK reference](/docs/drives/sdk-reference)
- [Pricing and limits](/docs/drives/pricing)

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
