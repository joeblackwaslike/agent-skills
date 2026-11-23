---
title: Drives CLI Reference
product: vercel
url: /docs/drives/cli-reference
canonical_url: "https://vercel.com/docs/drives/cli-reference"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/drives
related:
  - /docs/sandbox/concepts/drives
  - /docs/cli
  - /docs/cli/login
  - /docs/cli/link
  - /docs/cli/global-options
summary: Create, list, fork, and delete Vercel Drives with the vercel drives command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/drives/cli-reference.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "968015373dc6acc7ffd591ea0f52f3af7d5da6513f6df385402cfb9533d661da"
---

# Drives CLI Reference

Use `vercel drives` to manage persistent storage for a Vercel project from your terminal. To mount a drive and access its files, use the [Sandbox CLI](/docs/sandbox/concepts/drives#mounting-a-drive).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Drives is now generally available](https://vercel.com/changelog/vercel-drives-is-now-generally-available)
- [How Vercel Drives work and how to use them](https://vercel.com/kb/guide/vercel-drives) — Learn how Vercel Drives give Vercel Sandbox persistent, shareable storage, and how to create, mount, snapshot, fork, lis
- [How to use Vercel Drives with an eve agent](https://vercel.com/kb/guide/vercel-drives-eve-agent) — Mount Vercel Drives in an eve agent's sandbox to give each user a persistent workspace and share read-only reference dat
- [Drives](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives) — Vercel MCP tools for drives.
- [List drives](https://vercel.com/docs/rest-api/drives/list-drives) — GET /v1/drives — Retrieves a paginated list of drives belonging to a specific project.
- [Delete a drive](https://vercel.com/docs/rest-api/drives/delete-a-drive) — DELETE /v1/drives/{nameOrId} — Deletes a drive by project and name or drive ID. Attached drives cannot be deleted. Stop
- [Get a drive](https://vercel.com/docs/rest-api/drives/get-a-drive) — GET /v1/drives/{nameOrId} — Gets an existing drive by project and name or drive ID. Returns 404 if doesn't exist.
- [Get or create a drive](https://vercel.com/docs/rest-api/drives/get-or-create-a-drive) — POST /v1/drives/{name} — Gets an existing drive by project and name, or creates it when it does not exist.

Full cross-link map for this page: [/docs/drives/cli-reference.graph.md](/docs/drives/cli-reference.graph.md)
<!-- /docsgraph:related -->

## Installation and authentication

[Install the Vercel CLI](/docs/cli#installing-vercel-cli) and run [`vercel login`](/docs/cli/login). Run [`vercel link`](/docs/cli/link) in your project directory or pass `--project` to select a project by name or ID.

## `vercel drives --help`

Run `vercel drives --help` to list the commands:

- [`get-or-create`](#vercel-drives-get-or-create): Create a drive or retrieve it by name.
- [`list`](#vercel-drives-list): List drives for a project.
- [`fork`](#vercel-drives-fork): Copy a drive into a new drive in the same project.
- [`delete`](#vercel-drives-delete): Permanently delete one or more drives.

Run `vercel drives <command> --help` for help with one command.

## Shared options

All four commands support these options:

| Option                   | Alias | Description                                       |
| ------------------------ | ----- | ------------------------------------------------- |
| `--project <NAME_OR_ID>` | `-p`  | Select a project. Defaults to the linked project. |
| `--json`                 | -     | Return machine-readable JSON.                     |

See [Vercel CLI global options](/docs/cli/global-options) for options such as `--scope` and `--token`.

## `vercel drives get-or-create`

Create a drive if it does not exist. If it exists, the command returns the existing drive. The name must be unique in the project and contain 1 to 64 letters, digits, underscores, or hyphens.

```bash filename="Terminal"
vercel drives get-or-create workspace-cache --region sfo1
```

The command prints the drive name, region, and maximum size.

| Option              | Description                                                                                                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--region <REGION>` | Store the new drive in this region. Defaults to `iad1`.                                                                                                                            |
| `--max-size <SIZE>` | Set the maximum size in bytes or binary units such as `2GiB`. See [drive size limits and defaults](/docs/drives/pricing#limits). |

You cannot change the region or maximum size after creation. The command fails if you pass either option and its value differs from the existing drive.

## `vercel drives list`

List drives for the selected project. `ls` is an alias for `list`.

```bash filename="Terminal"
vercel drives list --name-prefix workspace --sort-order asc --limit 10
```

The output includes each drive's name, region, and attached sandbox, if any. When more results are available, use the next-page command from the output. In JSON output, use the `next` cursor in `pagination`.

| Option                   | Alias | Description                                                                 |
| ------------------------ | ----- | --------------------------------------------------------------------------- |
| `--name-prefix <PREFIX>` | -     | Filter by name prefix and sort by name.                                     |
| `--sort-order <ORDER>`   | -     | Sort in ascending (`asc`) or descending (`desc`) order. Defaults to `desc`. |
| `--limit <NUMBER>`       | `-n`  | Return up to this many drives per page. Defaults to 50.                     |
| `--next <CURSOR>`        | -     | Get the next page. Keep the same project, scope, filters, and sort order.   |

## `vercel drives fork`

Create an independent writable copy of an existing drive. Before you fork, [write a file to the source drive and stop the writer](/docs/sandbox/concepts/drives#mounting-a-drive).

Pass the source drive name first and a new name second:

```bash filename="Terminal"
vercel drives fork workspace-cache workspace-cache-fork
```

The output identifies the new drive and its source. The fork inherits the source's project, region, and maximum size. Changes to the fork do not change the source.

## `vercel drives delete`

Permanently delete one or more drives and their data. Stop the sandboxes that use the drive before you delete it. A read-write mount blocks deletion. A read-only mount does not.

```bash filename="Terminal"
vercel drives delete workspace-cache
```

In an interactive terminal, confirm each drive name when prompted. The CLI prints the name of each drive it deletes. `rm` and `del` are aliases for `delete`. The `remove` alias is deprecated.

| Option                  | Description                                                                                                                       |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `--confirm-name <NAME>` | Approve deletion without an interactive prompt. Repeat this option for each drive you specify. Use `--scope` to specify the team. |

## Next steps

- [Quickstart](/docs/drives/quickstart): Create a drive and read a file across Sandbox runs.
- [JS SDK reference](/docs/drives/sdk-reference): Manage drives with `@vercel/drives`.
- [Python SDK reference](/docs/drives/python-sdk-reference): Manage drives with `vercel.drives`.

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
