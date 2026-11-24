---
title: Vercel Drives
product: vercel
url: /docs/drives
canonical_url: "https://vercel.com/docs/drives"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  []
related:
  - /docs/sandbox/concepts/regions
  - /docs/sandbox/concepts/drives
  - /docs/drives/sdk-reference
  - /docs/drives/quickstart
  - /docs/drives/python-sdk-reference
summary: Keep workspace files, caches, and datasets across Vercel Sandbox runs with persistent storage.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/drives.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "73bfa980b435dd1b14ed341a60e43f469f6d51a40c9ec301ffb119b8ac2966d1"
---

# Vercel Drives

Drives provide persistent storage that you mount into a sandbox as a working directory. Your agent can generate code, download dependencies, and build up context in that directory, keeping its progress across sessions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Drives: persistent storage for agents](https://vercel.com/blog/introducing-vercel-drives-persistent-storage-for-agents)
- [Drives for Vercel Sandbox are now in public beta](https://vercel.com/changelog/drives-for-vercel-sandbox-are-now-in-public-beta)
- [Vercel Drives is now generally available](https://vercel.com/changelog/vercel-drives-is-now-generally-available)
- [How to use Vercel Drives with an eve agent](https://vercel.com/kb/guide/vercel-drives-eve-agent) — Mount Vercel Drives in an eve agent's sandbox to give each user a persistent workspace and share read-only reference dat
- [Drives for Vercel Sandbox in Private Beta](https://vercel.com/changelog/drives-for-vercel-sandbox-in-private-beta)
- [How Vercel Drives work and how to use them](https://vercel.com/kb/guide/vercel-drives) — Learn how Vercel Drives give Vercel Sandbox persistent, shareable storage, and how to create, mount, snapshot, fork, lis
- [How to give agents persistent storage with Vercel Drives](https://vercel.com/kb/guide/persistent-storage-with-vercel-drives) — Give AI SDK and TanStack AI agents persistent storage with Vercel Drives so they can save and reuse research notes acros
- [Drives](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives) — Vercel MCP tools for drives.
- [Vercel CLI Overview](https://vercel.com/docs/cli) — Learn how to use the Vercel command-line interface \\(CLI\\) to manage and configure your Vercel Projects from the command

Full cross-link map for this page: [/docs/drives.graph.md](/docs/drives.graph.md)
<!-- /docsgraph:related -->

## How drives work

A drive belongs to one Vercel project and one [region](/docs/sandbox/concepts/regions#regions-and-drives). To read or write files, [mount the drive](/docs/sandbox/concepts/drives#mounting-a-drive) as a directory in a sandbox in the same project and region. You can move compute between runs without moving the files.

One sandbox at a time can mount a drive read-write. Use a [read-only snapshot](/docs/sandbox/concepts/drives#snapshots) when several sandboxes need the same data, or [fork the drive](/docs/drives/sdk-reference#forking-a-drive) when each sandbox needs an independent writable copy.

## Common patterns

- **Agent workspaces**: Keep generated code, logs, and working files across sessions.
- **Shared caches**: [Reuse dependencies and build artifacts](/docs/sandbox/concepts/drives#example-a-shared-dependency-cache) across sandboxes.
- **Shared datasets**: [Load a dataset once](/kb/guide/large-scale-data-analysis-vercel-sandbox-mcp#how-to-share-large-datasets-across-sandboxes-with-vercel-drives) and mount read-only snapshots in separate sandboxes.

## Get started

Install `@vercel/drives` for JavaScript or TypeScript, or `vercel-drives` for Python:

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

**uv**

```bash
uv add vercel-drives
```

**pip**

```bash
pip install vercel-drives
```

Follow the [Drives quickstart](/docs/drives/quickstart) to create a drive and write your first file with an SDK or the command line.

## Start with a template

Deploy an eve template to build an agent that stores and searches files on a drive:

## Next steps

- [JS SDK reference](/docs/drives/sdk-reference): Manage drives with `@vercel/drives`.
- [Python SDK reference](/docs/drives/python-sdk-reference): Manage drives with `vercel.drives`.
- [CLI reference](/docs/drives/cli-reference): Manage drives with `vercel drives`.
- [Pricing and limits](/docs/drives/pricing): Check regional rates, capacity, and mount limits.

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
