---
title: Stop a sandbox
product: vercel
url: /docs/sandbox/examples/stop-a-sandbox
canonical_url: "https://vercel.com/docs/sandbox/examples/stop-a-sandbox"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/sandbox/examples
  - /docs/sandbox
related:
  - /docs/sandbox/cli-reference
summary: Stop a Vercel Sandbox from the dashboard, programmatically, from the CLI, or let it stop automatically on timeout.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/examples/stop-a-sandbox.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "5ca1113a033aa71352916c17702e04f80a04797647b93cfb8a8f3e312152d2e3"
---

# Stop a sandbox

There are four ways to stop a sandbox:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Delete a sandbox](https://vercel.com/docs/sandbox/examples/delete-a-sandbox) — Permanently delete a Vercel Sandbox through the dashboard, programmatically, or from the CLI, and manage its snapshots.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Resume a long-lived sandbox](https://vercel.com/docs/sandbox/examples/resume-a-long-lived-sandbox) — Stop a persistent Vercel Sandbox and resume it later by name, with its filesystem restored automatically.
- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/examples/run-commands-in-sandbox) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [Monitor your sandbox](https://vercel.com/docs/sandbox/examples/monitor-your-sandbox) — Track running Vercel Sandboxes in the dashboard, list them from the CLI, and monitor compute usage.

Full cross-link map for this page: [/docs/sandbox/examples/stop-a-sandbox.graph.md](/docs/sandbox/examples/stop-a-sandbox.graph.md)
<!-- /docsgraph:related -->

## Through the dashboard

1. Go to [Sandboxes](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fsandboxes\&title=Show+Sandbox+Page) in **Observability**.
2. Select your sandbox.
3. Click **Stop Sandbox**.

## Programmatically

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create();

try {
  // Run your workflow here.
} finally {
  await sandbox.stop();
}
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.create_sandbox()
    try:
        # Run your workflow here.
        pass
    finally:
        await box.stop()


asyncio.run(main())
```

## From the CLI

Run [`sandbox stop`](/docs/sandbox/cli-reference#sandbox-stop) with the name of the sandbox you want to stop:

```bash filename="Terminal"
sandbox stop my-sandbox
```

## Automatic timeout

Sandboxes stop automatically when their timeout expires. The default is 5 minutes.

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
