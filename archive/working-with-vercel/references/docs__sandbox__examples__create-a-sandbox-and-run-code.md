---
title: Create a sandbox and run code
product: vercel
url: /docs/sandbox/examples/create-a-sandbox-and-run-code
canonical_url: "https://vercel.com/docs/sandbox/examples/create-a-sandbox-and-run-code"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/sandbox/examples
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/images
summary: Create a Vercel Sandbox, write a file into it, run the file, and inspect the command output in TypeScript, Python, or the Sandbox CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/examples/create-a-sandbox-and-run-code.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "0ed41a490b112131ff43ac66d4ea21b70021bcff20eaa9c446761bc33aaea0f5"
---

# Create a sandbox and run code

Create a sandbox, write a file into it, run the file, and inspect the command output.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/examples/run-commands-in-sandbox) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [Quickstart](https://vercel.com/docs/sandbox/quickstart) — Learn how to run your first code in a Vercel Sandbox.
- [Prepare files and download artifacts](https://vercel.com/docs/sandbox/examples/prepare-files-and-download-artifacts) — Send input files to a Vercel Sandbox, run a build, and download the output back to your machine.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Vercel Sandbox SDK](https://vercel.com/docs/sandbox/sdk) — Use the Vercel Sandbox SDK for JavaScript, TypeScript, and Python, or the Sandbox CLI, to create and manage isolated Lin

Full cross-link map for this page: [/docs/sandbox/examples/create-a-sandbox-and-run-code.graph.md](/docs/sandbox/examples/create-a-sandbox-and-run-code.graph.md)
<!-- /docsgraph:related -->

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  timeout: 60_000,
});

try {
  await sandbox.writeFiles([
    {
      path: 'hello.js',
      content: Buffer.from("console.log('Hello from Vercel Sandbox!')\n"),
    },
  ]);

  const result = await sandbox.runCommand('node', ['hello.js']);

  if (result.exitCode !== 0) {
    throw new Error(await result.stderr());
  }

  console.log(await result.stdout());
} finally {
  await sandbox.stop();
}
```

**main.py**

```py filename="main.py"
import asyncio
from datetime import timedelta

from vercel import sandbox


async def main() -> None:
    async with sandbox.create_sandbox(
        execution_time_limit=timedelta(minutes=1),
    ) as box:
        await box.fs.write_text(
            "hello.py",
            "print('Hello from Vercel Sandbox!')\n",
        )

        result = await box.run_command(
            "python",
            ["hello.py"],
            capture_output=True,
            check=True,
        )
        print(result.stdout.decode())


asyncio.run(main())
```

**script.sh**

```bash filename="script.sh"
echo "console.log('Hello from Vercel Sandbox!')" > hello.js

sandbox create --name my-sandbox --image vercel/sandbox/node:24 --timeout 1m
sandbox copy ./hello.js my-sandbox:/vercel/hello.js
sandbox exec my-sandbox -- node hello.js
sandbox stop my-sandbox
```

You can use any of the [Vercel Managed Image](/docs/sandbox/concepts/images#vercel-managed-images), or start from your own or a shared [custom image](/docs/sandbox/concepts/images#custom-images) hosted on Vercel Container Registry. See [Images](/docs/sandbox/concepts/images) for how to use it:

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  image: 'my-repository:latest',
});
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    await sandbox.create_sandbox(image="my-repository:latest")


asyncio.run(main())
```

**script.sh**

```bash filename="script.sh"
sandbox create --image my-repository:latest
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
