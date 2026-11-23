---
title: Delete a sandbox
product: vercel
url: /docs/sandbox/examples/delete-a-sandbox
canonical_url: "https://vercel.com/docs/sandbox/examples/delete-a-sandbox"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/sandbox/examples
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/sandbox/concepts/snapshots
summary: Permanently delete a Vercel Sandbox through the dashboard, programmatically, or from the CLI, and manage its snapshots.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/examples/delete-a-sandbox.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "6e9f26095f910236d2e0f0403d8b3a7e6a381d3ae3dd4eb8d0635dcb40dd67f5"
---

# Delete a sandbox

Stopping a [persistent sandbox](/docs/sandbox/concepts/persistent-sandboxes) ends the current session but keeps the sandbox so it can be resumed later. To remove the sandbox along with all of its sessions, delete it. **This cannot be undone.** By default, deleting a sandbox keeps its [snapshots](/docs/sandbox/concepts/snapshots), which stay available until they expire or you delete them. To also delete the snapshots that no other sandbox uses, pass `deleteOrphanSnapshots: true` to `sandbox.delete()` or `--delete-orphan-snapshots` to `sandbox remove`.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Stop a sandbox](https://vercel.com/docs/sandbox/examples/stop-a-sandbox) — Stop a Vercel Sandbox from the dashboard, programmatically, from the CLI, or let it stop automatically on timeout.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/examples/run-commands-in-sandbox) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [Delete a sandbox](https://vercel.com/docs/rest-api/sandboxes/delete-a-sandbox) — DELETE /v2/sandboxes/{name} — Deletes a sandbox by name. If sandboxes are currently running, they will be stopped first.
- [Examples](https://vercel.com/docs/platforms/examples) — Clone working multi-tenant and multi-project starters to begin your platform build.

Full cross-link map for this page: [/docs/sandbox/examples/delete-a-sandbox.graph.md](/docs/sandbox/examples/delete-a-sandbox.graph.md)
<!-- /docsgraph:related -->

## Through the dashboard

The dashboard is the safest way to delete a single sandbox interactively. It requires you to type the sandbox name plus a verification phrase before the deletion goes through:

1. Go to [Sandboxes](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fsandboxes\&title=Show+Sandbox+Page) in **Observability** and select the sandbox you want to delete.
2. Scroll to the **Delete Sandbox** section at the bottom of the detail page.
3. Click **Delete Sandbox**.
4. In the confirmation modal, type the sandbox name and the verification phrase `delete my sandbox`, then click **Delete Sandbox**.

## Programmatically

Delete the sandbox from your code. This is useful for cleanup at the end of a job or when reacting to an event:

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.get({ name: 'my-sandbox' });
await sandbox.delete();
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-sandbox")
    await box.destroy()


asyncio.run(main())
```

## From the CLI

Run `sandbox remove` for ad-hoc cleanup or to script deletion alongside other CLI commands:

```bash filename="Terminal"
sandbox remove my-sandbox
```

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
