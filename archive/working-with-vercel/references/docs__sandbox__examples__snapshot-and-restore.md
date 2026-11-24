---
title: Snapshot and restore a prepared environment
product: vercel
url: /docs/sandbox/examples/snapshot-and-restore
canonical_url: "https://vercel.com/docs/sandbox/examples/snapshot-and-restore"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/sandbox/examples
  - /docs/sandbox
related:
  - /docs/sandbox/sdk-reference
summary: Snapshot a configured Vercel Sandbox so future sandboxes start from the same filesystem state, or fork a sandbox directly.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/examples/snapshot-and-restore.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "3271a2b4a587c819a8cba3c4bfa7fb5959b558372364e86edee0d6471df8108c"
---

# Snapshot and restore a prepared environment

Use snapshots after dependency installation or environment setup so future sandboxes start from the same filesystem state. With persistent sandboxes, snapshots are also created automatically every time the sandbox stops; for manual checkpoints, call `snapshot()` explicitly.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Filesystem snapshots supported on Vercel Sandboxes](https://vercel.com/changelog/filesystem-snapshots-supported-on-vercel-sandboxes)
- [Snapshots](https://vercel.com/docs/sandbox/concepts/snapshots) — Save and restore sandbox state with snapshots for faster startups and environment sharing.
- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/examples/run-commands-in-sandbox) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [Create a sandbox and run code](https://vercel.com/docs/sandbox/examples/create-a-sandbox-and-run-code) — Create a Vercel Sandbox, write a file into it, run the file, and inspect the command output in TypeScript, Python, or th
- [Resume a long-lived sandbox](https://vercel.com/docs/sandbox/examples/resume-a-long-lived-sandbox) — Stop a persistent Vercel Sandbox and resume it later by name, with its filesystem restored automatically.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y

Full cross-link map for this page: [/docs/sandbox/examples/snapshot-and-restore.graph.md](/docs/sandbox/examples/snapshot-and-restore.graph.md)
<!-- /docsgraph:related -->

To spawn fresh children from another sandbox's current snapshot without tracking IDs manually, use [`Sandbox.fork`](/docs/sandbox/sdk-reference#sandbox.fork). The fork inherits the source's config and is seeded from its latest snapshot:

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const child = await Sandbox.fork({
  sourceSandbox: 'my-base-sandbox',
  persistent: false,
});
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    child = await sandbox.fork_sandbox(
        source_sandbox="my-base-sandbox",
        persistent=False,
    )
    print(child.name)


asyncio.run(main())
```

**script.sh**

```bash filename="script.sh"
sandbox fork my-base-sandbox --non-persistent
```

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const MIN_SNAPSHOT_EXPIRATION_MS = 24 * 60 * 60 * 1000;

let snapshotId = '';
const sandbox = await Sandbox.create({ runtime: 'node24' });

try {
  await sandbox.writeFiles([
    { path: 'config.json', content: Buffer.from('{"env": "prod"}') },
  ]);

  const snapshot = await sandbox.snapshot({
    expiration: MIN_SNAPSHOT_EXPIRATION_MS,
  });
  snapshotId = snapshot.snapshotId;
} catch (error) {
  await sandbox.stop();
  throw error;
}

const restored = await Sandbox.create({
  source: { type: 'snapshot', snapshotId },
  timeout: 120_000,
});

try {
  const result = await restored.runCommand('cat', ['config.json']);
  console.log(await result.stdout());
} finally {
  await restored.stop();
}
```

**main.py**

```py filename="main.py"
import asyncio
from datetime import timedelta

from vercel import sandbox
from vercel.sandbox import SnapshotSource


async def main() -> None:
    producer = await sandbox.create_sandbox()
    snapshot = None
    try:
        await producer.fs.write_text("config.json", '{"env": "prod"}')
        snapshot = await producer.snapshot(expiration=timedelta(days=1))

        async with sandbox.create_sandbox(
            source=SnapshotSource(snapshot_id=snapshot.id),
            execution_time_limit=timedelta(minutes=2),
        ) as restored:
            print(await restored.fs.read_text("config.json"))
    finally:
        try:
            await producer.destroy()
        finally:
            if snapshot is not None:
                await snapshot.delete()


asyncio.run(main())
```

**script.sh**

```bash filename="script.sh"
echo '{"env": "prod"}' > config.json

sandbox create --name my-sandbox --image vercel/sandbox/node:24
sandbox copy ./config.json my-sandbox:/vercel/config.json

# Snapshotting stops the sandbox and prints the snapshot ID.
sandbox snapshot my-sandbox --stop --expiration 1d

sandbox create --name my-restored-sandbox --snapshot <snapshot-id> --timeout 2m
sandbox exec my-restored-sandbox -- cat config.json
sandbox stop my-restored-sandbox

# Delete the snapshot when you no longer need it.
sandbox snapshots delete <snapshot-id>
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
