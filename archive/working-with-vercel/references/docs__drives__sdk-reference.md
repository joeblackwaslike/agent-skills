---
title: JS SDK Reference
product: vercel
url: /docs/drives/sdk-reference
canonical_url: "https://vercel.com/docs/drives/sdk-reference"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/drives
related:
  - /docs/sandbox/sdk/javascript
  - /docs/drives/python-sdk-reference
  - /docs/drives/cli-reference
  - /docs/drives/quickstart
  - /docs/oidc
summary: Create, list, fork, and delete Vercel Drives with the JavaScript and TypeScript SDK.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/drives/sdk-reference.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "82e5aae540f3e4add6ed9c41600b1934c2db4cf4598acb5f54ee909206f837ed"
---

# JS SDK Reference

The `Drive` class in `@vercel/drives` manages persistent storage for a Vercel project. To read or write files, use the [Sandbox SDK](/docs/sandbox/sdk/javascript) to mount the drive.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Drives is now generally available](https://vercel.com/changelog/vercel-drives-is-now-generally-available)
- [Drives for Vercel Sandbox are now in public beta](https://vercel.com/changelog/drives-for-vercel-sandbox-are-now-in-public-beta)
- [List drives](https://vercel.com/docs/rest-api/drives/list-drives) — GET /v1/drives — Retrieves a paginated list of drives belonging to a specific project.
- [Drives](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives) — Vercel MCP tools for drives.
- [Get a drive](https://vercel.com/docs/rest-api/drives/get-a-drive) — GET /v1/drives/{nameOrId} — Gets an existing drive by project and name or drive ID. Returns 404 if doesn't exist.
- [Delete a drive](https://vercel.com/docs/rest-api/drives/delete-a-drive) — DELETE /v1/drives/{nameOrId} — Deletes a drive by project and name or drive ID. Attached drives cannot be deleted. Stop
- [Get or create a drive](https://vercel.com/docs/rest-api/drives/get-or-create-a-drive) — POST /v1/drives/{name} — Gets an existing drive by project and name, or creates it when it does not exist.

Full cross-link map for this page: [/docs/drives/sdk-reference.graph.md](/docs/drives/sdk-reference.graph.md)
<!-- /docsgraph:related -->

For Python, see the [Python SDK reference](/docs/drives/python-sdk-reference). For shell commands, see the [Drives CLI reference](/docs/drives/cli-reference).

## Installation

Install `@vercel/drives`. It requires Node.js 22.19.0 or later:

**pnpm**

```bash
pnpm i @vercel/drives
```

**yarn**

```bash
yarn add @vercel/drives
```

**npm**

```bash
npm i @vercel/drives
```

**bun**

```bash
bun add @vercel/drives
```

Follow the [quickstart](/docs/drives/quickstart) to link a project and pull its [OIDC token](/docs/oidc). Save the examples as `.mts` for TypeScript or `.mjs` for JavaScript and run them with `node --env-file=.env.local`.

To use an access token outside Vercel without OIDC, pass `token`, `teamId`, and `projectId` together to `Drive.get()`, `Drive.getOrCreate()`, or `Drive.list()`.

## Creating or retrieving a drive

`Drive.getOrCreate(options)` returns a `Promise<Drive>`. It creates the drive if the project doesn't already have one with that name:

```ts filename="create-drive.mts"
import { Drive } from '@vercel/drives';

const drive = await Drive.getOrCreate({
  name: 'workspace-cache',
  region: 'sfo1',
});

console.log(drive.name, drive.region);
```

| Option    | Type          | Description                                                                                                 |
| --------- | ------------- | ----------------------------------------------------------------------------------------------------------- |
| `name`    | `string`      | Required. Unique within the project.                                                                        |
| `region`  | `DriveRegion` | Optional. Defaults to `iad1` for a new drive.                                                               |
| `maxSize` | `number`      | Optional maximum size in bytes. Must be a multiple of 4096. See [size limits](/docs/drives/pricing#limits). |
| `signal`  | `AbortSignal` | Optional. Cancels the request.                                                                              |

You can't change the region or maximum size after creation. The request fails if you supply a region or maximum size that differs from the existing drive's configuration.

Use `Drive.get({ name })` to retrieve an existing drive without creating it. The method returns a `Promise<Drive>` and throws an `APIError` with `response.status` set to `404` if the drive doesn't exist.

## Listing drives

`Drive.list(options)` returns the first page of drives and its pagination metadata. Iterate over the result with `for await` to fetch the remaining pages:

```ts filename="list-drives.mts"
import { Drive } from '@vercel/drives';

const driveList = await Drive.list({
  namePrefix: 'workspace',
  sortBy: 'name',
  sortOrder: 'asc',
  limit: 10,
});

for await (const drive of driveList) {
  console.log(drive.name, drive.currentSandboxName ?? 'detached');
}
```

| Option       | Type                                   | Description                                        |
| ------------ | -------------------------------------- | -------------------------------------------------- |
| `namePrefix` | `string`                               | Filter drives by name prefix.                      |
| `sortBy`     | `'name' \| 'createdAt' \| 'updatedAt'` | Field to sort by. Use `'name'` with a name prefix. |
| `sortOrder`  | `'asc' \| 'desc'`                      | Order of results.                                  |
| `limit`      | `number`                               | Maximum number of items per page.                  |
| `cursor`     | `string`                               | Cursor from `pagination.next` to resume a listing. |
| `signal`     | `AbortSignal`                          | Cancels the request.                               |

Use `driveList.drives` for the first page, `driveList.pages()` to iterate over pages, or `await driveList.toArray()` to collect all results.

## Mounting drives and snapshots

See the [write and snapshot examples](/docs/sandbox/concepts/drives#mounting-a-drive). The sandbox and the drive must belong to the same project and region.

## Forking a drive

`drive.fork({ name })` returns a `Promise<Drive>` for an independent copy. The fork inherits the source drive's project, region, and maximum size. Before forking, [write a file to the source drive and stop the writer](/docs/sandbox/concepts/drives#mounting-a-drive).

```ts filename="fork-drive.mts"
import { Drive } from '@vercel/drives';

const source = await Drive.get({ name: 'workspace-cache' });
const fork = await source.fork({ name: 'workspace-cache-fork' });

console.log(fork.name, fork.parentDriveId === source.driveId);
```

The new name must be unique within the project.

## Deleting a drive

`drive.delete()` permanently deletes the drive and its data. A read-write mount blocks deletion. A read-only mount does not.

```ts filename="delete-drive.mts"
import { Drive } from '@vercel/drives';

const drive = await Drive.get({ name: 'workspace-cache' });
await drive.delete();
```

## Drive properties

| Property                                 | Type                  | Description                                               |
| ---------------------------------------- | --------------------- | --------------------------------------------------------- |
| `driveId`, `name`, `projectId`, `region` | `string`              | Drive identity and location.                              |
| `maxSize`                                | `number`              | Maximum size in bytes.                                    |
| `parentDriveId`, `rootDriveId`           | `string \| undefined` | Source and original drive IDs for a fork, when available. |
| `currentSessionId`, `currentSandboxName` | `string \| undefined` | Current read-write attachment, if any.                    |
| `createdAt`, `updatedAt`                 | `Date`                | Creation and last update times.                           |

## Next steps

- [Python SDK reference](/docs/drives/python-sdk-reference)
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
