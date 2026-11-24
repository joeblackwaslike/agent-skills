---
title: Execute long-running tasks
product: vercel
url: /docs/sandbox/examples/execute-long-running-tasks
canonical_url: "https://vercel.com/docs/sandbox/examples/execute-long-running-tasks"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/sandbox/examples
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/sandbox/cli-reference
  - /docs/sandbox/pricing
summary: Set and extend Vercel Sandbox timeouts, run detached commands, stream logs, and keep connections alive for long tasks.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/examples/execute-long-running-tasks.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "2cae67fe578a32256b9b1ed80fce4f95a4ef4f2e1ae61e7e25dcbe29ec552892"
---

# Execute long-running tasks

By default, each sandbox [session](/docs/sandbox/concepts/persistent-sandboxes#sandboxes-and-sessions) times out after 5 minutes. For longer tasks, set a custom timeout when creating the sandbox:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/examples/run-commands-in-sandbox) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [Resume a long-lived sandbox](https://vercel.com/docs/sandbox/examples/resume-a-long-lived-sandbox) — Stop a persistent Vercel Sandbox and resume it later by name, with its filesystem restored automatically.
- [Create a sandbox and run code](https://vercel.com/docs/sandbox/examples/create-a-sandbox-and-run-code) — Create a Vercel Sandbox, write a file into it, run the file, and inspect the command output in TypeScript, Python, or th
- [Quickstart](https://vercel.com/docs/sandbox/quickstart) — Learn how to run your first code in a Vercel Sandbox.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y

Full cross-link map for this page: [/docs/sandbox/examples/execute-long-running-tasks.graph.md](/docs/sandbox/examples/execute-long-running-tasks.graph.md)
<!-- /docsgraph:related -->

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

To give a running sandbox more time, extend its timeout:

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

## Run a detached command and stream logs

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
from datetime import timedelta

from anyio.streams.text import TextReceiveStream
from vercel import sandbox


async def main() -> None:
    async with sandbox.create_sandbox(
        execution_time_limit=timedelta(minutes=2),
    ) as box:
        process = await box.create_command(
            "sh",
            ["-lc", "for i in 1 2 3; do echo $i; sleep 1; done"],
        )

        # Command output arrives as bytes. Decode it as it streams.
        assert process.stdout is not None
        async for text in TextReceiveStream(process.stdout):
            print(text, end="", flush=True)

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

## Idle connection timeout

Vercel Sandbox closes a connection that carries no data for 340 seconds. Closing the connection doesn't stop the command or the sandbox.

These calls hold a connection open while a command runs:

- `sandbox.runCommand()` without `detached: true`, which receives data only when the command writes output or exits
- `command.logs()` and the output helpers such as `command.stdout()`, which receive data only when the command writes output
- `command.wait()`, which receives data only when the command exits

To keep `runCommand()` and `logs()` connections open, have long commands write a line of output at least every few minutes.

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
