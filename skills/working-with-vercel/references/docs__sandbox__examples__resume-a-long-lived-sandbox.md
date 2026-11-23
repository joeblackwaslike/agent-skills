---
title: Resume a long-lived sandbox
product: vercel
url: /docs/sandbox/examples/resume-a-long-lived-sandbox
canonical_url: "https://vercel.com/docs/sandbox/examples/resume-a-long-lived-sandbox"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/sandbox/examples
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/persistent-sandboxes
summary: Stop a persistent Vercel Sandbox and resume it later by name, with its filesystem restored automatically.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/examples/resume-a-long-lived-sandbox.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "86538703fc1a0ab5a3b56f3845073f5673d062b082c92d75c377a9a1412feccb"
---

# Resume a long-lived sandbox

Persistent sandboxes keep their filesystem across sessions. Create a sandbox, write a file, stop it, then resume by name and read the file back, with no snapshot ID to track and no setup to repeat.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [Create a sandbox and run code](https://vercel.com/docs/sandbox/examples/create-a-sandbox-and-run-code) — Create a Vercel Sandbox, write a file into it, run the file, and inspect the command output in TypeScript, Python, or th
- [Execute long-running tasks](https://vercel.com/docs/sandbox/examples/execute-long-running-tasks) — Set and extend Vercel Sandbox timeouts, run detached commands, stream logs, and keep connections alive for long tasks.
- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/examples/run-commands-in-sandbox) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y

Full cross-link map for this page: [/docs/sandbox/examples/resume-a-long-lived-sandbox.graph.md](/docs/sandbox/examples/resume-a-long-lived-sandbox.graph.md)
<!-- /docsgraph:related -->

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

// First run: create a sandbox, write a file, stop it.
const sandbox = await Sandbox.create({ name: 'my-sandbox' });
await sandbox.writeFiles([
  {
    path: '/vercel/sandbox/notes.txt',
    content: Buffer.from('Hello from the first session.\n'),
  },
]);
await sandbox.stop();

// Later, in a separate process: resume the same sandbox by name and
// read the file back. The next SDK call auto-resumes the session.
const resumed = await Sandbox.get({ name: 'my-sandbox' });
const notes = await resumed.runCommand('cat', ['/vercel/sandbox/notes.txt']);
console.log(await notes.stdout()); // Hello from the first session.
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    # First run: create a sandbox, write a file, stop it.
    box = await sandbox.create_sandbox(
        name="my-sandbox",
        persistent=True,
    )
    await box.fs.write_text("notes.txt", "Hello from the first session.\n")
    await box.stop()

    # Later, in a separate process: retrieve the sandbox by name. Reading
    # the restored file automatically resumes the session.
    resumed = await sandbox.get_sandbox(name="my-sandbox")
    print(await resumed.fs.read_text("notes.txt"))


asyncio.run(main())
```

**script.sh**

```bash filename="script.sh"
# First run: create a sandbox, write a file, stop it.
sandbox create --name my-sandbox
sandbox exec my-sandbox -- sh -c "echo 'Hello from the first session.' > notes.txt"
sandbox stop my-sandbox

# Later: `sandbox run --name` resumes the same sandbox and runs a command in it.
sandbox run --name my-sandbox -- cat notes.txt
```

You can call `Sandbox.get()` from any process that has the sandbox name, for example after your script restarts or crashes. If the sandbox is still running, you reconnect to its current session. If the sandbox might not exist yet, use [`Sandbox.getOrCreate()`](/docs/sandbox/concepts/persistent-sandboxes#get-or-create-idempotent) to retrieve it or create it in one call.

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
