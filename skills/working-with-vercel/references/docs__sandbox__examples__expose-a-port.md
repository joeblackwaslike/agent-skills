---
title: Expose a port
product: vercel
url: /docs/sandbox/examples/expose-a-port
canonical_url: "https://vercel.com/docs/sandbox/examples/expose-a-port"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/sandbox/examples
  - /docs/sandbox
related:
  - /docs/sandbox/sdk-reference
  - /docs/sandbox/pricing
summary: Expose a port on a Vercel Sandbox to reach a server running inside it through a public URL.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/examples/expose-a-port.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "936f137f1c21c18292e8b650d10f71947ef81522941c63937828a4a55384b78b"
---

# Expose a port

To reach a server running in a sandbox, such as a dev server or an API, expose its port when you create the sandbox. Each exposed port gets its own public URL. You can expose up to 15 ports.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Sandbox vs Upstash Box](https://vercel.com/kb/guide/vercel-sandbox-vs-upstash-box) — Compare Vercel Sandbox and Upstash Box as AI agent sandboxes, including isolation, persistence, network controls, SDKs,
- [Port 8080 is now available in Vercel Sandboxes](https://vercel.com/changelog/port-8080-is-now-available-in-vercel-sandboxes)
- [ Vercel Sandbox increases concurrency and port limits](https://vercel.com/changelog/vercel-sandbox-increases-concurrency-and-port-limits)
- [Examples](https://vercel.com/docs/platforms/examples) — Clone working multi-tenant and multi-project starters to begin your platform build.
- [Create a sandbox and run code](https://vercel.com/docs/sandbox/examples/create-a-sandbox-and-run-code) — Create a Vercel Sandbox, write a file into it, run the file, and inspect the command output in TypeScript, Python, or th
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Monitor your sandbox](https://vercel.com/docs/sandbox/examples/monitor-your-sandbox) — Track running Vercel Sandboxes in the dashboard, list them from the CLI, and monitor compute usage.
- [Vercel Sandbox SDK](https://vercel.com/docs/sandbox/sdk) — Use the Vercel Sandbox SDK for JavaScript, TypeScript, and Python, or the Sandbox CLI, to create and manage isolated Lin

Full cross-link map for this page: [/docs/sandbox/examples/expose-a-port.graph.md](/docs/sandbox/examples/expose-a-port.graph.md)
<!-- /docsgraph:related -->

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({ ports: [3000] });

// Start a web server in the background on the exposed port.
await sandbox.runCommand({
  cmd: 'python3',
  args: ['-m', 'http.server', '3000'],
  detached: true,
});

console.log(sandbox.domain(3000));
```

**main.py**

```py filename="main.py"
import asyncio
import subprocess

from vercel import sandbox


async def main() -> None:
    box = await sandbox.create_sandbox(ports=[3000])

    # Start a web server in the background on the exposed port.
    await box.create_command(
        "python3",
        ["-m", "http.server", "3000"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    for route in box.routes:
        if route.port == 3000:
            print(route.url)


asyncio.run(main())
```

**script.sh**

```bash filename="script.sh"
# The output lists each published port and its public URL.
sandbox create --name my-sandbox --publish-port 3000

# Start a web server on that port. It runs until you press Ctrl+C.
sandbox exec my-sandbox -- python3 -m http.server 3000
```

Anyone with the URL can reach the server, so only expose services you intend to share. To change the exposed ports later, pass `ports` to [`sandbox.update()`](/docs/sandbox/sdk-reference#sandbox.update), which replaces the full list. Traffic to and from exposed ports counts toward [Sandbox Data Transfer](/docs/sandbox/pricing).

## Long-running WebSocket connections

WebSocket connections to a sandbox's public URL can close while the sandbox continues running. For long-running sessions, reconnect clients automatically and resume application state after an interruption. You can also host the WebSocket server outside the sandbox and have the sandbox initiate the connection.

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
