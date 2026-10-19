---
title: Working with Sandbox
product: vercel
url: /docs/sandbox/working-with-sandbox
canonical_url: "https://vercel.com/docs/sandbox/working-with-sandbox"
last_updated: 2026-09-15
type: conceptual
prerequisites:
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/images
  - /docs/sandbox/cli-reference
  - /docs/sandbox/pricing
  - /docs/sandbox/sdk-reference
  - /docs/sandbox/concepts/persistent-sandboxes
summary: Task-oriented examples for common Vercel Sandbox operations in TypeScript, Python, and the Sandbox CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/working-with-sandbox.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "212e7adb6f6fc75e2fd5fd7a0282f7ed1da4e8aa1effd4e8cda79994ce44baba"
---

# Working with Sandbox

Use Vercel Sandbox to run code, stream command output, manage files, capture snapshots, and stop sandboxes from your application or from the terminal.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to use snapshots for faster sandbox startup](https://vercel.com/kb/guide/how-to-use-snapshots-for-faster-sandbox-startup) — Learn how to save sandbox state with snapshots and skip installation on future runs.
- [Vercel Sandbox vs CodeSandbox](https://vercel.com/kb/guide/vercel-sandbox-vs-codesandbox) — A detailed guide to Vercel Sandbox vs CodeSandbox: compute isolation, credential brokering, Active CPU billing, Docker s
- [Run untrusted code with Vercel Sandbox, now generally available](https://vercel.com/blog/vercel-sandbox-is-now-generally-available)
- [How to test a container image in Vercel Sandbox before deploying](https://vercel.com/kb/guide/test-container-image-vercel-sandbox) — Validate a container image before deploying by booting it as a custom Sandbox image from Vercel Container Registry \\(VCR
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/run-commands-in-sandbox) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [Run isolated AI agents in one sandbox](https://vercel.com/docs/sandbox/concepts/multi-agent) — Give each AI agent an isolated Linux user in a Vercel Sandbox with the @vercel/sandbox createUser, createGroup, and asUs

Full cross-link map for this page: [/docs/sandbox/working-with-sandbox.graph.md](/docs/sandbox/working-with-sandbox.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** Sandboxes are **persistent by default**: when a sandbox stops, the SDK automatically snapshots its filesystem and restores it on the next resume. Pass `persistent: false` at creation time for one-off, ephemeral workloads.

## Create a sandbox and run code

Create a sandbox, write a file into it, run the file, and inspect the command output.

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

        result = await box.run_process(
            "python",
            ["hello.py"],
            capture_output=True,
            check=True,
        )
        print(result.stdout)


asyncio.run(main())
```

**script.sh**

```bash filename="script.sh"
echo "console.log('Hello from Vercel Sandbox!')" > hello.js

sandbox create --name my-sandbox --timeout 1m
sandbox copy ./hello.js my-sandbox:/vercel/sandbox/hello.js
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

**script.sh**

```bash filename="script.sh"
sandbox create --image my-repository:latest
```

## Start a coding agent from the CLI

With Sandbox CLI 4.8.0 or later, start OpenCode in a new sandbox from an interactive terminal:

```bash filename="Terminal"
sandbox create opencode
```

The agent's interface opens in your terminal while its commands run in the sandbox. Sign in to Vercel for Sandbox access and authenticate OpenCode separately. Your local files are not copied automatically. See the [CLI reference](/docs/sandbox/cli-reference#sandbox-create) for agent options and how to reconnect or stop the sandbox.

## Resume a long-lived sandbox

Persistent sandboxes keep their filesystem across sessions. Create a sandbox, write a file, stop it, then resume by name and read the file back, with no snapshot ID to track and no setup to repeat.

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

// First run: create a named sandbox, write a file, stop it.
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
    # First run: create a named sandbox, write a file, stop it.
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
# First run: create a named sandbox, write a file, stop it.
sandbox create --name my-sandbox
sandbox exec my-sandbox -- sh -c "echo 'Hello from the first session.' > notes.txt"
sandbox stop my-sandbox

# Later: `sandbox run --name` resumes the same sandbox and runs a command in it.
sandbox run --name my-sandbox -- cat notes.txt
```

## Execute long-running tasks

By default, sandboxes timeout after 5 minutes. For longer tasks, set a custom timeout when creating the sandbox:

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  timeout: 3 * 60 * 60 * 1000, // 3 hours
});

try {
  console.log(sandbox.timeout);
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
        execution_time_limit=timedelta(hours=3),
    ) as box:
        print(box.execution_time_limit)


asyncio.run(main())
```

**script.sh**

```bash filename="script.sh"
sandbox create --name my-sandbox --timeout 3h
```

To extend a running sandbox, call `extendTimeout()` in TypeScript or `extend_execution_time_limit()` in Python:

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create();

try {
  await sandbox.extendTimeout(2 * 60 * 60 * 1000); // Add 2 hours
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
    async with sandbox.create_sandbox() as box:
        await box.extend_execution_time_limit(timedelta(hours=2))


asyncio.run(main())
```

The CLI can't extend a running session. [`sandbox config timeout`](/docs/sandbox/cli-reference#sandbox-config) changes the timeout for new sessions only.

See [Pricing and Limits](/docs/sandbox/pricing#runtime-limits) for maximum durations by plan.

### Run a detached command and stream logs

Use a detached command when you need to follow long-running output, keep a server alive, or wait for completion later.

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({ timeout: 120_000 });

try {
  const command = await sandbox.runCommand({
    cmd: 'bash',
    args: ['-lc', 'for i in 1 2 3; do echo $i; sleep 1; done'],
    detached: true,
  });

  for await (const line of command.logs()) {
    if (line.stream === 'stdout') {
      process.stdout.write(line.data);
    } else {
      process.stderr.write(line.data);
    }
  }

  const finished = await command.wait();
  console.log(finished.exitCode);
} finally {
  await sandbox.stop();
}
```

**main.py**

```py filename="main.py"
import asyncio
import sys
from datetime import timedelta

from vercel import sandbox


async def main() -> None:
    async with sandbox.create_sandbox(
        execution_time_limit=timedelta(minutes=2),
    ) as box:
        process = await box.create_process(
            "sh",
            ["-lc", "for i in 1 2 3; do echo $i; sleep 1; done"],
        )

        assert process.stdout is not None
        async for line in process.stdout:
            sys.stdout.write(line)

        print(await process.wait())


asyncio.run(main())
```

**script.sh**

```bash filename="script.sh"
# sandbox exec runs in the foreground and streams output until the command exits.
sandbox create --name my-sandbox --timeout 2m
sandbox exec my-sandbox -- bash -lc 'for i in 1 2 3; do echo $i; sleep 1; done'
sandbox stop my-sandbox
```

The CLI has no detached mode: `sandbox exec` streams output while the command runs and returns when it exits. To start a command and return right away, use `detached: true` in the SDK.

## Prepare files and download artifacts

Use file APIs when your local application needs to send input files to the sandbox and retrieve a build output.

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
        await box.run_process(
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
sandbox create --name my-sandbox

# sandbox copy transfers one file and doesn't create parent directories.
sandbox exec my-sandbox -- mkdir -p src
sandbox copy ./build-artifact.js my-sandbox:/vercel/sandbox/src/build-artifact.js
sandbox exec my-sandbox -- node src/build-artifact.js

mkdir -p artifacts/dist
sandbox copy my-sandbox:/vercel/sandbox/dist/output.txt ./artifacts/dist/output.txt
sandbox stop my-sandbox
```

## Snapshot and restore a prepared environment

Use snapshots after dependency installation or environment setup so future sandboxes start from the same filesystem state. With persistent sandboxes, snapshots are also created automatically every time the sandbox stops; for manual checkpoints, call `snapshot()` explicitly.

To spawn fresh children from another sandbox's current snapshot without tracking IDs manually, use [`Sandbox.fork`](/docs/sandbox/sdk-reference#sandbox.fork). The fork inherits the source's config and is seeded from its latest snapshot:

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const child = await Sandbox.fork({
  sourceSandbox: 'my-base-sandbox',
  persistent: false,
});
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
    async with sandbox.create_sandbox() as box:
        await box.fs.write_text("config.json", '{"env": "prod"}')
        snapshot = await box.snapshot(expiration=timedelta(days=1))

    async with sandbox.create_sandbox(
        source=SnapshotSource(snapshot_id=snapshot.id),
        execution_time_limit=timedelta(minutes=2),
    ) as restored:
        print(await restored.fs.read_text("config.json"))

    await snapshot.delete()


asyncio.run(main())
```

**script.sh**

```bash filename="script.sh"
echo '{"env": "prod"}' > config.json

sandbox create --name my-sandbox --image vercel/sandbox/node:24
sandbox copy ./config.json my-sandbox:/vercel/sandbox/config.json

# Snapshotting stops the sandbox and prints the snapshot ID.
sandbox snapshot my-sandbox --stop --expiration 1d

sandbox create --name my-restored-sandbox --snapshot <snapshot-id> --timeout 2m
sandbox exec my-restored-sandbox -- cat config.json
sandbox stop my-restored-sandbox

# Delete the snapshot when you no longer need it.
sandbox snapshots delete <snapshot-id>
```

## Debug with an interactive shell

Connect to a running sandbox for interactive debugging with an SSH-like experience:

```bash filename="Terminal"
sandbox connect <name>
```

Once connected, you have full shell access to inspect logs, check processes, and explore the filesystem.

See [CLI Reference](/docs/sandbox/cli-reference#sandbox-connect) for all options.

## Monitor your sandbox

View your sandboxes in the [Sandboxes dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fsandboxes\&title=Show+Sandbox+Page). For each project, you can see:

- Total sandboxes created
- Currently running sandboxes
- Stopped sandboxes
- Command history and sandbox URLs

To list sandboxes from the terminal, run [`sandbox list`](/docs/sandbox/cli-reference#sandbox-list). It shows running sandboxes by default, and `--all` includes stopped ones:

```bash filename="terminal"
sandbox list --all
```

Track compute usage across projects in the [Usage dashboard](https://vercel.com/d?to=%2Fdashboard%2F%5Bteam%5D%2Fusage\&title=Show+Usage+Page), which measures:

- **Sandbox Provisioned Memory**: Memory allocated to your sandboxes
- **Sandbox Data Transfer**: Data your sandboxes send to the internet, plus all traffic to and from exposed ports, is billable. Data your sandboxes download from the internet is free
- **Sandbox Active CPU**: CPU time consumed
- **Sandbox Creations**: Number of sandboxes created
- **Snapshot Storage**: Sandbox snapshot storage

## Stop a sandbox

There are four ways to stop a sandbox:

### Through the dashboard

1. Go to [Sandboxes](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fsandboxes\&title=Show+Sandbox+Page) in **Observability**.
2. Select your sandbox.
3. Click **Stop Sandbox**.

### Programmatically

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

### From the CLI

Run [`sandbox stop`](/docs/sandbox/cli-reference#sandbox-stop) with the name of the sandbox you want to stop:

```bash filename="Terminal"
sandbox stop my-sandbox
```

### Automatic timeout

Sandboxes stop automatically when their timeout expires. The default is 5 minutes.

## Delete a sandbox

Stopping a [persistent sandbox](/docs/sandbox/concepts/persistent-sandboxes) ends the current session but keeps the sandbox so it can be resumed later. To remove the sandbox along with all of its sessions, delete it. **This cannot be undone.** Deleting a sandbox keeps its [snapshots](/docs/sandbox/concepts/snapshots), which stay available until they expire or you delete them.

### Through the dashboard

The dashboard is the safest way to delete a single sandbox interactively. It requires you to type the sandbox name plus a verification phrase before the deletion goes through:

1. Go to [Sandboxes](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fsandboxes\&title=Show+Sandbox+Page) in **Observability** and select the sandbox you want to delete.
2. Scroll to the **Delete Sandbox** section at the bottom of the detail page.
3. Click **Delete Sandbox**.
4. In the confirmation modal, type the sandbox name and the verification phrase `delete my sandbox`, then click **Delete Sandbox**.

### Programmatically

Use `sandbox.delete()` from the JS SDK to remove the sandbox in code. This is useful for cleanup at the end of a job or when reacting to an event:

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.get({ name: 'my-sandbox' });
await sandbox.delete();
```

### From the CLI

Run `sandbox remove` for ad-hoc cleanup or to script deletion alongside other CLI commands:

```bash filename="Terminal"
sandbox remove my-sandbox
```

## Examples

**View all Sandbox examples**: Browse the complete collection of Sandbox guides, tutorials, and code samples. [Learn more →](/kb/sandbox)

**Reconnect to a running sandbox**: Learn how to use Sandbox.get() to reconnect to an existing sandbox from a different process or after a script restart. [Learn more →](/kb/guide/how-to-reconnect-to-a-running-sandbox)

**Execute AI-generated code safely**: Learn how to run code generated by AI models in an isolated sandbox environment. [Learn more →](/kb/guide/how-to-execute-ai-generated-code-safely)

**Use with Claude Agent SDK**: Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation and autonomous agent tasks. [Learn more →](/kb/guide/using-vercel-sandbox-claude-agent-sdk)

**Run AI-generated code**: How to execute untrusted, AI-generated code inside Vercel Sandbox - an isolated, ephemeral environment. [Learn more →](/kb/guide/running-ai-generated-code-sandbox)

**Use private GitHub repositories**: Learn how to create sandboxes from private GitHub repositories using personal access tokens or GitHub App installation tokens. [Learn more →](/kb/guide/sandbox-private-github-repositories)

**Run OpenClaw in Vercel Sandbox**: Learn how to run OpenClaw in Vercel Sandbox for secure and isolated execution. [Learn more →](/kb/guide/running-openclaw-in-vercel-sandbox)

**Run OpenCode securely with the Vercel Sandbox**: Learn how to run OpenCode securely with the Vercel Sandbox to build your own background coding agent [Learn more →](/kb/guide/running-opencode-securely-with-the-vercel-sandbox)

**Run Cursor Cloud Agents in Vercel Sandbox**: Learn how to run Cursor Cloud Agents in Vercel Sandbox instead of Cursor's hosted machines. [Learn more →](/kb/guide/cursor-vercel-sandbox)


---

[View full sitemap](/docs/sitemap)
