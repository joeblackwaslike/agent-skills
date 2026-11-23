---
title: Install system packages
product: vercel
url: /docs/sandbox/examples/install-system-packages
canonical_url: "https://vercel.com/docs/sandbox/examples/install-system-packages"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/sandbox/examples
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/images
  - /docs/sandbox/concepts/runtimes
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/sandbox/examples/snapshot-and-restore
summary: "Install system packages in a Vercel Sandbox with the image's package manager and sudo."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/examples/install-system-packages.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "6263bb918bc66e25166a9b4b3ce453159797e9a2a48183a8aeb948e69534eff1"
---

# Install system packages

The [Vercel Managed Images](/docs/sandbox/concepts/images#vercel-managed-images) include common languages and tools, so most workloads don't need extra packages. To add one, run the image's package manager with `sudo`. The Ubuntu-based images, including the default `vercel/sandbox/universal` image, use `apt-get`. A new sandbox has no package index, so run `apt-get update` before you install:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Sandbox now supports sudo and installing RPM packages](https://vercel.com/changelog/sandbox-now-supports-sudo-and-installing-rpm-packages)
- [Vercel Sandbox now runs on Vercel Managed Images](https://vercel.com/changelog/vercel-sandbox-managed-images)
- [Create a sandbox and run code](https://vercel.com/docs/sandbox/examples/create-a-sandbox-and-run-code) — Create a Vercel Sandbox, write a file into it, run the file, and inspect the command output in TypeScript, Python, or th
- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/examples/run-commands-in-sandbox) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [Examples](https://vercel.com/docs/platforms/examples) — Clone working multi-tenant and multi-project starters to begin your platform build.
- [Prepare files and download artifacts](https://vercel.com/docs/sandbox/examples/prepare-files-and-download-artifacts) — Send input files to a Vercel Sandbox, run a build, and download the output back to your machine.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y

Full cross-link map for this page: [/docs/sandbox/examples/install-system-packages.graph.md](/docs/sandbox/examples/install-system-packages.graph.md)
<!-- /docsgraph:related -->

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create();

await sandbox.runCommand({ cmd: 'apt-get', args: ['update'], sudo: true });
await sandbox.runCommand({
  cmd: 'apt-get',
  args: ['install', '-y', 'golang'],
  sudo: true,
});
```

**index.js**

```js filename="index.js"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create();

await sandbox.runCommand({ cmd: 'apt-get', args: ['update'], sudo: true });
await sandbox.runCommand({
  cmd: 'apt-get',
  args: ['install', '-y', 'golang'],
  sudo: true,
});
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    async with sandbox.create_sandbox() as box:
        await box.run_command("apt-get", ["update"], sudo=True, check=True)
        await box.run_command(
            "apt-get",
            ["install", "-y", "golang"],
            sudo=True,
            check=True,
        )


asyncio.run(main())
```

**script.sh**

```bash filename="script.sh"
sandbox exec --sudo my-sandbox -- sh -c "apt-get update && apt-get install -y golang"
```

The `-y` flag answers yes to the installation prompt, so the command doesn't wait for confirmation on stdin. Sandboxes created with the deprecated `runtime` property run Amazon Linux 2023 and use `dnf` instead, for example `dnf install -y golang`. See [Runtimes](/docs/sandbox/concepts/runtimes) for the packages those runtimes include.

A [persistent sandbox](/docs/sandbox/concepts/persistent-sandboxes) keeps installed packages when it stops and resumes. A new sandbox starts from its image again. To start new sandboxes with your packages already installed, [snapshot](/docs/sandbox/examples/snapshot-and-restore) a sandbox after you install them, or build a [custom image](/docs/sandbox/concepts/images#custom-images) from a Dockerfile.

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
