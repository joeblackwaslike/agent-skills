---
title: Prepare files and download artifacts
product: vercel
url: /docs/sandbox/examples/prepare-files-and-download-artifacts
canonical_url: "https://vercel.com/docs/sandbox/examples/prepare-files-and-download-artifacts"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/sandbox/examples
  - /docs/sandbox
related:
  []
summary: Send input files to a Vercel Sandbox, run a build, and download the output back to your machine.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/examples/prepare-files-and-download-artifacts.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "f5cd9f67cbd76018f02d3043fd1894f7acb93423cb5a56297be603d5942d713a"
---

# Prepare files and download artifacts

Use file APIs when your local application needs to send input files to the sandbox and retrieve a build output.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [Create a sandbox and run code](https://vercel.com/docs/sandbox/examples/create-a-sandbox-and-run-code) — Create a Vercel Sandbox, write a file into it, run the file, and inspect the command output in TypeScript, Python, or th
- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/examples/run-commands-in-sandbox) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [Quickstart](https://vercel.com/docs/sandbox/quickstart) — Learn how to run your first code in a Vercel Sandbox.
- [Vercel Sandbox SDK](https://vercel.com/docs/sandbox/sdk) — Use the Vercel Sandbox SDK for JavaScript, TypeScript, and Python, or the Sandbox CLI, to create and manage isolated Lin
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y

Full cross-link map for this page: [/docs/sandbox/examples/prepare-files-and-download-artifacts.graph.md](/docs/sandbox/examples/prepare-files-and-download-artifacts.graph.md)
<!-- /docsgraph:related -->

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create();

try {
  await sandbox.mkDir('src');
  await sandbox.writeFiles([
    {
      path: 'src/build-artifact.js',
      content: Buffer.from(
        "import { mkdir, writeFile } from 'node:fs/promises';\n\n" +
          "await mkdir('dist', { recursive: true });\n" +
          "await writeFile('dist/output.txt', 'hello from sandbox\\n');\n"
      ),
    },
  ]);

  const result = await sandbox.runCommand('node', ['src/build-artifact.js']);

  if (result.exitCode !== 0) {
    throw new Error(await result.stderr());
  }

  await sandbox.downloadFile(
    { path: 'dist/output.txt' },
    { path: './artifacts/dist/output.txt' },
    { mkdirRecursive: true }
  );
} finally {
  await sandbox.stop();
}
```

**main.py**

```py filename="main.py"
import asyncio

import anyio

from vercel import sandbox


async def main() -> None:
    async with sandbox.create_sandbox() as box:
        await box.fs.write_text(
            "src/build_artifact.py",
            """\
from pathlib import Path

Path('dist').mkdir(exist_ok=True)
Path('dist/output.txt').write_text('hello from sandbox\\n')
""",
        )
        await box.run_command(
            "python",
            ["src/build_artifact.py"],
            check=True,
        )

        local_path = anyio.Path("artifacts/dist/output.txt")
        await local_path.parent.mkdir(parents=True, exist_ok=True)
        async with (
            box.fs.open("dist/output.txt", "rb") as source,
            await anyio.open_file(local_path, "wb") as target,
        ):
            while chunk := await source.read(64 * 1024):
                await target.write(chunk)


asyncio.run(main())
```

**script.sh**

```bash filename="script.sh"
# ./build-artifact.js is a local copy of the script from the SDK example.
sandbox create --name my-sandbox --image vercel/sandbox/node:24

# sandbox copy creates missing parent directories in the sandbox, but not on your machine.
# Commands in this image start in /vercel, so relative paths resolve there.
sandbox copy ./build-artifact.js my-sandbox:/vercel/src/build-artifact.js
sandbox exec my-sandbox -- node src/build-artifact.js

mkdir -p artifacts/dist
sandbox copy my-sandbox:/vercel/dist/output.txt ./artifacts/dist/output.txt
sandbox stop my-sandbox
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
