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
  - /docs/sandbox/concepts/runtimes
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/sandbox/pricing
summary: Task-oriented examples for common Vercel Sandbox operations in TypeScript, Python, and the Sandbox CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/working-with-sandbox.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "77b96b0e33c99f9b0e42eff5ec16696ef19bc3d5e6a6e2728783cac3f6db195c"
---

# Working with Sandbox

Use Vercel Sandbox to run code, stream command output, manage files, capture snapshots, and stop sandboxes from your application or from the terminal.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Run untrusted Python code safely with Vercel Sandbox](https://vercel.com/kb/guide/python-and-vercel-sandbox) — Execute untrusted and AI-generated code from Python in isolated microVMs, with files, processes, network policies, and s
- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [Run untrusted code with Vercel Sandbox, now generally available](https://vercel.com/blog/vercel-sandbox-is-now-generally-available)
- [How to test a container image in Vercel Sandbox before deploying](https://vercel.com/kb/guide/test-container-image-vercel-sandbox) — Validate a container image before deploying by booting it as a custom Sandbox image from Vercel Container Registry \\(VCR
- [Vercel Sandbox](https://eve.dev/docs/sandbox/vercel) — Create persistent sandboxes on Vercel, from a prepared snapshot when the environment has build-time setup.
- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/run-commands-in-sandbox) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [Run isolated AI agents in one sandbox](https://vercel.com/docs/sandbox/concepts/multi-agent) — Give each AI agent an isolated Linux user in a Vercel Sandbox with the @vercel/sandbox createUser, createGroup, and asUs
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y

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

        result = await box.run_command(
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

**script.sh**

```bash filename="script.sh"
sandbox create --image my-repository:latest
```

## Clone a private Git repository

Pass a `git` source to create a sandbox from a repository. For a private repository, add credentials with `username` and `password`. GitHub accepts `x-access-token` as the username and a token as the password:

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  source: {
    type: 'git',
    url: 'https://github.com/your-org/private-repo.git',
    username: 'x-access-token',
    password: process.env.GIT_ACCESS_TOKEN!,
    depth: 1,
  },
  ports: [3000],
});

const install = await sandbox.runCommand('npm', ['install']);

if (install.exitCode !== 0) {
  throw new Error(await install.stderr());
}

await sandbox.runCommand({ cmd: 'npm', args: ['run', 'dev'], detached: true });
console.log(sandbox.domain(3000));
```

**index.js**

```js filename="index.js"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  source: {
    type: 'git',
    url: 'https://github.com/your-org/private-repo.git',
    username: 'x-access-token',
    password: process.env.GIT_ACCESS_TOKEN,
    depth: 1,
  },
  ports: [3000],
});

const install = await sandbox.runCommand('npm', ['install']);

if (install.exitCode !== 0) {
  throw new Error(await install.stderr());
}

await sandbox.runCommand({ cmd: 'npm', args: ['run', 'dev'], detached: true });
console.log(sandbox.domain(3000));
```

**main.py**

```py filename="main.py"
import asyncio
import os

from vercel import sandbox
from vercel.sandbox import GitSource


async def main() -> None:
    box = await sandbox.create_sandbox(
        source=GitSource(
            url="https://github.com/your-org/private-repo.git",
            username="x-access-token",
            password=os.environ["GIT_ACCESS_TOKEN"],
            depth=1,
        ),
    )
    await box.run_command("npm", ["install"], check=True)


asyncio.run(main())
```

The Sandbox CLI doesn't accept a Git source. From the CLI, clone the repository inside the sandbox with [`sandbox exec`](/docs/sandbox/cli-reference#sandbox-exec) and your own credentials.

Choose the GitHub token that fits your use case:

| Token                                                                                                                                                                                                   | Best for                                         | Setup                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| [Fine-grained personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token) | Your own repositories                            | Select only the repositories the sandbox needs and grant **Contents: Read**.                                           |
| [GitHub App installation token](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)                         | Platforms where users connect their repositories | Give the app **Contents: Read**. Tokens expire after 1 hour and only cover the repositories in that installation.      |
| [Classic personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic)           | Tools that don't support fine-grained tokens     | Grant the `repo` scope. This token can read every repository your account can access, so prefer the other two options. |

If users bring their own repositories, have them install your GitHub App, store the installation ID, and generate a fresh installation token each time you create a sandbox. This example uses [`@octokit/auth-app`](https://github.com/octokit/auth-app.js):

**index.ts**

```ts filename="index.ts"
import { createAppAuth } from '@octokit/auth-app';
import { Sandbox } from '@vercel/sandbox';

const auth = createAppAuth({
  appId: process.env.GITHUB_APP_ID!,
  privateKey: process.env.GITHUB_APP_PRIVATE_KEY!,
});

export async function createSandboxForRepo(
  installationId: number,
  repoUrl: string,
) {
  const { token } = await auth({ type: 'installation', installationId });

  return Sandbox.create({
    source: {
      type: 'git',
      url: repoUrl,
      username: 'x-access-token',
      password: token,
    },
  });
}
```

**index.js**

```js filename="index.js"
import { createAppAuth } from '@octokit/auth-app';
import { Sandbox } from '@vercel/sandbox';

const auth = createAppAuth({
  appId: process.env.GITHUB_APP_ID,
  privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
});

export async function createSandboxForRepo(installationId, repoUrl) {
  const { token } = await auth({ type: 'installation', installationId });

  return Sandbox.create({
    source: {
      type: 'git',
      url: repoUrl,
      username: 'x-access-token',
      password: token,
    },
  });
}
```

Pass tokens through environment variables so they stay out of logs and source code. Grant only **Contents: Read**, which is all cloning needs, and rotate personal access tokens on a schedule.

## Install system packages

The [Vercel Managed Images](/docs/sandbox/concepts/images#vercel-managed-images) include common languages and tools, so most workloads don't need extra packages. To add one, run the image's package manager with `sudo`. The Ubuntu-based images, including the default `vercel/sandbox/universal` image, use `apt-get`. A new sandbox has no package index, so run `apt-get update` before you install:

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

A [persistent sandbox](/docs/sandbox/concepts/persistent-sandboxes) keeps installed packages when it stops and resumes. A new sandbox starts from its image again. To start new sandboxes with your packages already installed, [snapshot](#snapshot-and-restore-a-prepared-environment) a sandbox after you install them, or build a [custom image](/docs/sandbox/concepts/images#custom-images) from a Dockerfile.

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

## Execute long-running tasks

By default, each sandbox [session](/docs/sandbox/concepts/persistent-sandboxes#sandboxes-and-sessions) times out after 5 minutes. For longer tasks, set a custom timeout when creating the sandbox:

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

Use [`sandbox extend`](/docs/sandbox/cli-reference#sandbox-extend) to add time to a running session without changing the saved timeout:

```bash filename="terminal.sh"
sandbox extend my-sandbox 30m
```

The command adds 30 minutes to the current deadline. It fails if the sandbox has no running session and doesn't resume a stopped sandbox.

[`sandbox config timeout`](/docs/sandbox/cli-reference#sandbox-config) changes the saved timeout for future sessions. If the new value exceeds the running session's timeout, it also extends that session by the difference. Lowering the saved timeout doesn't shorten the running session's deadline.

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
        process = await box.create_command(
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

Stopping a [persistent sandbox](/docs/sandbox/concepts/persistent-sandboxes) ends the current session but keeps the sandbox so it can be resumed later. To remove the sandbox along with all of its sessions, delete it. **This cannot be undone.** By default, deleting a sandbox keeps its [snapshots](/docs/sandbox/concepts/snapshots), which stay available until they expire or you delete them. To also delete the snapshots that no other sandbox uses, pass `deleteOrphanSnapshots: true` to `sandbox.delete()` or `--delete-orphan-snapshots` to `sandbox remove`.

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

**Execute AI-generated code safely**: Learn how to run code generated by AI models in an isolated sandbox environment. [Learn more →](/kb/guide/how-to-execute-ai-generated-code-safely)

**Use with Claude Agent SDK**: Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation and autonomous agent tasks. [Learn more →](/kb/guide/using-vercel-sandbox-claude-agent-sdk)

**Run AI-generated code**: How to execute untrusted, AI-generated code inside Vercel Sandbox - an isolated, ephemeral environment. [Learn more →](/kb/guide/running-ai-generated-code-sandbox)

**Run OpenClaw in Vercel Sandbox**: Learn how to run OpenClaw in Vercel Sandbox for secure and isolated execution. [Learn more →](/kb/guide/running-openclaw-in-vercel-sandbox)

**Run OpenCode securely with the Vercel Sandbox**: Learn how to run OpenCode securely with the Vercel Sandbox to build your own background coding agent [Learn more →](/kb/guide/running-opencode-securely-with-the-vercel-sandbox)

**Run Cursor Cloud Agents in Vercel Sandbox**: Learn how to run Cursor Cloud Agents in Vercel Sandbox instead of Cursor's hosted machines. [Learn more →](/kb/guide/cursor-vercel-sandbox)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
