---
title: Quickstart
product: vercel
url: /docs/drives/quickstart
canonical_url: "https://vercel.com/docs/drives/quickstart"
last_updated: 2018-10-20
type: tutorial
prerequisites:
  - /docs/drives
related:
  - /docs/cli
  - /docs/sandbox/sdk/cli
  - /docs/oidc
  - /docs/drives/pricing
  - /docs/sandbox/concepts/drives
summary: Create a Vercel Drive and keep a file across Sandbox runs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/drives/quickstart.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "edd6c9a3a155e1c79c3b38d3028dbf3ef826573f4a6675af242748976f1b9090"
---

# Quickstart

Create a drive, write a file from a sandbox, and mount the drive in a second sandbox to read the file.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Drives for Vercel Sandbox are now in public beta](https://vercel.com/changelog/drives-for-vercel-sandbox-are-now-in-public-beta)
- [How to use Vercel Drives with an eve agent](https://vercel.com/kb/guide/vercel-drives-eve-agent) — Mount Vercel Drives in an eve agent's sandbox to give each user a persistent workspace and share read-only reference dat
- [Vercel Drives is now generally available](https://vercel.com/changelog/vercel-drives-is-now-generally-available)
- [Mount remote storage](https://vercel.com/docs/sandbox/examples/mount-remote-storage) — Mount an external object store such as Amazon S3 into a Vercel Sandbox with a FUSE driver, so code reads and writes remo
- [Drives](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives) — Vercel MCP tools for drives.
- [Quickstart](https://vercel.com/docs/sandbox/quickstart) — Learn how to run your first code in a Vercel Sandbox.
- [Vercel Sandbox SDK](https://vercel.com/docs/sandbox/sdk) — Use the Vercel Sandbox SDK for JavaScript, TypeScript, and Python, or the Sandbox CLI, to create and manage isolated Lin
- [Get or create a drive](https://vercel.com/docs/rest-api/drives/get-or-create-a-drive) — POST /v1/drives/{name} — Gets an existing drive by project and name, or creates it when it does not exist.

Full cross-link map for this page: [/docs/drives/quickstart.graph.md](/docs/drives/quickstart.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

- A Vercel account and a project.
- The [Vercel CLI](/docs/cli). For the CLI mount examples, also install the [Sandbox CLI](/docs/sandbox/sdk/cli#installation).
- Node.js 22.19.0 or later for the JS SDK, or Python 3.11 or later for the Python SDK.

- ### Link your project
  Sign in and link the directory where you'll run the examples:
  ```bash filename="Terminal"
  vercel login
  vercel link
  vercel env pull .env.local
  ```
  The last command saves a development [OIDC token](/docs/oidc) in `.env.local`. Run the examples for both Drives and Sandbox from this directory so they use the same linked project.

- ### Install the SDK
  Skip this step if you use the CLI examples. If you start in an empty directory, run `npm init -y` for JS or `uv init` if you use uv for Python.

  For JS, install `@vercel/drives` and `@vercel/sandbox`. For Python, install `vercel-drives`, `vercel-sandbox`, and `python-dotenv`:

  **pnpm**
  ```bash
  pnpm i @vercel/drives @vercel/sandbox
  ```
  **yarn**
  ```bash
  yarn add @vercel/drives @vercel/sandbox
  ```
  **npm**
  ```bash
  npm i @vercel/drives @vercel/sandbox
  ```
  **bun**
  ```bash
  bun add @vercel/drives @vercel/sandbox
  ```
  **uv**
  ```bash
  uv add vercel-drives vercel-sandbox python-dotenv
  ```
  **pip**
  ```bash
  pip install vercel-drives vercel-sandbox python-dotenv
  ```

- ### Create a drive
  Create `workspace-cache` in `iad1`. If the drive exists with that name and region, the command returns it. Leave the size unset to use your plan's [default size](/docs/drives/pricing#limits).

  **create-drive.mts**
  ```ts filename="create-drive.mts"
  import { Drive } from '@vercel/drives';

  const drive = await Drive.getOrCreate({
    name: 'workspace-cache',
    region: 'iad1',
  });

  console.log(drive.name, drive.region);
  ```
  **create\_drive.py**
  ```py filename="create_drive.py"
  import asyncio

  from dotenv import load_dotenv
  from vercel import drives

  async def main() -> None:
      load_dotenv(".env.local")
      drive, _ = await drives.get_or_create_drive(
          name="workspace-cache",
          region="iad1",
      )
      print(drive.name, drive.region)

  asyncio.run(main())
  ```
  **Terminal**
  ```bash filename="Terminal"
  vercel drives get-or-create workspace-cache --region iad1
  ```
  Run the TypeScript file with `node --env-file=.env.local create-drive.mts`, or the Python file with `python create_drive.py` (`uv run python create_drive.py` if you installed with uv). The SDK examples print `workspace-cache iad1`. The CLI output includes the drive name and region.

- ### Mount the drive
  Follow [Mounting a drive](/docs/sandbox/concepts/drives#mounting-a-drive) to mount this drive on a sandbox and interact with its files. You can then create [read-only snapshots](/docs/sandbox/concepts/drives#snapshots) to read the files on many other sandboxes in parallel, or [fork](/docs/sandbox/concepts/drives#forking-a-drive) this drive into new writable drives.

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
