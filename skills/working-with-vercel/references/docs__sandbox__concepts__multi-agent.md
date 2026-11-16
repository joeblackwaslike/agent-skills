---
title: Run isolated AI agents in one sandbox
product: vercel
url: /docs/sandbox/concepts/multi-agent
canonical_url: "https://vercel.com/docs/sandbox/concepts/multi-agent"
last_updated: 2026-08-19
type: how-to
prerequisites:
  - /docs/sandbox/concepts
  - /docs/sandbox
related:
  - /docs/sandbox/sdk-reference
  - /docs/sandbox/python-sdk-reference
  - /docs/sandbox/working-with-sandbox
  - /docs/sandbox/concepts
summary: Give each AI agent an isolated Linux user in a Vercel Sandbox with the JS and Python SDKs, then share files between agents through groups.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/concepts/multi-agent.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "f7207da0e87ac14019ef8eb04ad62b5aa21d0635cec3d31f2d5d7fceda1b7410"
---

# Run isolated AI agents in one sandbox

Run several AI agents in one sandbox, each as its own Linux user with a private home directory and separate file permissions. Isolating agents this way keeps one agent's files and output out of reach of the others, while groups let you open up a shared workspace when agents need to collaborate.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Run untrusted code with Vercel Sandbox, now generally available](https://vercel.com/blog/vercel-sandbox-is-now-generally-available)
- [Run multiple isolated agents in a single Sandbox](https://vercel.com/changelog/run-multiple-isolated-agents-in-a-single-sandbox)
- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [Run a research workspace on Vercel](https://vercel.com/kb/guide/run-research-workspace-vercel) — Plan a durable research workspace on Vercel's Agentic Infrastructure with Workflows, internal API tools, Vercel Sandbox
- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [Safely running AI generated code in your Next.js application](https://vercel.com/kb/guide/running-ai-generated-code-sandbox) — How to execute untrusted, AI‑generated code from a Next.js app using Vercel Sandbox, an isolated, ephemeral environment.
- [OpenAI SDK](https://vercel.com/docs/sandbox/ecosystem/openai-sdk) — Use OpenAI function calling with AI Gateway to execute model-generated code in an isolated Vercel Sandbox.

Full cross-link map for this page: [/docs/sandbox/concepts/multi-agent.graph.md](/docs/sandbox/concepts/multi-agent.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** Multi-user support is available in the JS SDK (`@vercel/sandbox`) and the
> Python SDK (`vercel-sandbox`). Groups are available in the JS SDK only. The
> sandbox image must include `/bin/bash`, which the stock Vercel Sandbox images
> provide.

## Create a user for each agent

Create a Linux user with an isolated home directory for each agent. Each user gets `/bin/bash` as their login shell and a home directory at `/home/<username>`:

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create();

const alice = await sandbox.createUser('alice');

alice.username; // "alice"
alice.homeDir; // "/home/alice"
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.create_sandbox(name="my-sandbox")

    alice = await box.create_user("alice")

    print(alice.username)  # "alice"
    print(alice.home_dir)  # "/home/alice"


asyncio.run(main())
```

Creating a user returns a `SandboxUser` instance. All commands and file operations you run through this instance execute as that user.

## Valid user and group names

User and group names must match `/^[a-z_][a-z0-9_-]*$/` and be at most 32 characters. This constraint applies to every user and group method. Invalid names fail immediately, which prevents command injection through a crafted name:

**index.ts**

```ts filename="index.ts"
sandbox.asUser('Alice'); // throws, uppercase not allowed
sandbox.asUser('user name'); // throws, spaces not allowed
sandbox.asUser('$(whoami)'); // throws, special characters not allowed
```

**main.py**

```py filename="main.py"
box.as_user("Alice")  # raises ValueError, uppercase not allowed
box.as_user("user name")  # raises ValueError, spaces not allowed
box.as_user("$(whoami)")  # raises ValueError, special characters not allowed
```

## Run commands as a user

Commands run as the user by default, with the working directory set to their home:

**index.ts**

```ts filename="index.ts"
const whoami = await alice.runCommand('whoami');
console.log(await whoami.stdout()); // "alice\n"

const pwd = await alice.runCommand('pwd');
console.log(await pwd.stdout()); // "/home/alice\n"
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-sandbox")
    alice = box.as_user("alice")

    whoami = await alice.run_command("whoami", capture_output=True)
    print(whoami.stdout.decode())  # "alice\n"

    pwd = await alice.run_command("pwd", capture_output=True)
    print(pwd.stdout.decode())  # "/home/alice\n"


asyncio.run(main())
```

Set environment variables, override the working directory, or run a long-lived process in the background:

**index.ts**

```ts filename="index.ts"
// Pass environment variables scoped to this command
await alice.runCommand({
  cmd: 'node',
  args: ['-e', 'console.log(process.env.API_KEY)'],
  env: { API_KEY: 'your_api_key_here' },
});

// Override the working directory
await alice.runCommand({ cmd: 'ls', cwd: '/tmp' });

// Run a detached process and stop it later
const server = await alice.runCommand({
  cmd: 'node',
  args: ['server.js'],
  detached: true,
});
await server.kill('SIGTERM');
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-sandbox")
    alice = box.as_user("alice")

    # Pass environment variables scoped to this command
    await alice.run_command(
        "node",
        ["-e", "console.log(process.env.API_KEY)"],
        env={"API_KEY": "your_api_key_here"},
    )

    # Override the working directory
    await alice.run_command("ls", cwd="/tmp")

    # Start a command in the background and stop it later
    server = await alice.create_command("node", ["server.js"])
    await server.terminate()


asyncio.run(main())
```

A command runs its binary directly without a shell, so shell features like pipes, redirection, and variable expansion need an explicit `bash -c`. Simple commands don't:

**index.ts**

```ts filename="index.ts"
// Runs the binary directly, no shell needed
await alice.runCommand({ cmd: 'node', args: ['index.js'] });

// Needs a shell for the redirection
await alice.runCommand({
  cmd: 'bash',
  args: ['-c', 'echo "done" > log.txt'],
});
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-sandbox")
    alice = box.as_user("alice")

    # Runs the binary directly, no shell needed
    await alice.run_command("node", ["index.js"])

    # Needs a shell for the redirection
    await alice.run_command("bash", ["-c", 'echo "done" > log.txt'])


asyncio.run(main())
```

To run a single command as root, for example, to install a system package, set the `sudo` option:

**index.ts**

```ts filename="index.ts"
await alice.runCommand({
  cmd: 'apt-get',
  args: ['install', '-y', 'git'],
  sudo: true,
});
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-sandbox")
    alice = box.as_user("alice")
    await alice.run_command("apt-get", ["install", "-y", "git"], sudo=True)


asyncio.run(main())
```

Use `sudo` for one-off privileged commands. For a persistent root session across many commands, get a handle for the `root` user instead, the same way you [reuse an existing user](#reuse-an-existing-user).

## Scope file operations to a user

File operations on a `SandboxUser` instance resolve relative paths against the user's home directory, and that user owns the files and directories they create:

**index.ts**

```ts filename="index.ts"
// Writes to /home/alice/app.js, owned by alice
await alice.writeFiles([
  { path: 'app.js', content: Buffer.from('console.log("hi")') },
]);

// Read it back
const buf = await alice.readFileToBuffer({ path: 'app.js' });
console.log(buf?.toString()); // 'console.log("hi")'

// Create a directory owned by the user
await alice.mkDir('projects/my-app');
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-sandbox")
    alice = box.as_user("alice")

    # Writes to /home/alice/app.js, owned by alice
    await alice.fs.write_text("app.js", 'console.log("hi")')

    # Read it back
    print(await alice.fs.read_text("app.js"))  # 'console.log("hi")'

    # Create a directory owned by the user
    await alice.fs.mkdir("projects/my-app")


asyncio.run(main())
```

Absolute paths work too, so you can write outside the home directory when you need to:

**index.ts**

```ts filename="index.ts"
await alice.writeFiles([
  { path: '/tmp/output.txt', content: Buffer.from('data') },
]);
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-sandbox")
    alice = box.as_user("alice")
    await alice.fs.write_text("/tmp/output.txt", "data")


asyncio.run(main())
```

## Isolate agents from each other

Each user's home directory is isolated from other users. One agent, running as its own user, cannot read, list, or write another agent's home directory:

**index.ts**

```ts filename="index.ts"
const alice = await sandbox.createUser('alice');
const bob = await sandbox.createUser('bob');

await alice.writeFiles([
  { path: 'secret.txt', content: Buffer.from('alice only') },
]);

// Bob, a different user, cannot read Alice's file
const cat = await bob.runCommand({
  cmd: 'cat',
  args: ['/home/alice/secret.txt'],
});
console.log(cat.exitCode); // non-zero, permission denied
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-sandbox")

    alice = box.as_user("alice")
    bob = await box.create_user("bob")

    await alice.fs.write_text("secret.txt", "alice only")

    # Bob, a different user, cannot read Alice's file
    cat = await bob.run_command(
        "cat",
        ["/home/alice/secret.txt"],
        capture_output=True,
    )
    print(cat.returncode)  # non-zero, permission denied


asyncio.run(main())
```

Your application always keeps access to every agent's files through two paths:

- **As the user.** Read through the `SandboxUser` instance, which honors that user's own permissions. This works for any file the user can read, including files the agent has made private.
- **Directly on the sandbox.** Read with an absolute path on the `Sandbox` instance. This works for files with default permissions, because the sandbox creates each home directory with mode `770`, group-owned by its default user group, and operations on the `Sandbox` instance run as that default user. Bob's read above failed for the opposite reason. Bob isn't a member of Alice's owning group, but the sandbox's default user is.

**index.ts**

```ts filename="index.ts"
// Through the SandboxUser instance, with a relative path
const viaUser = await alice.readFileToBuffer({ path: 'secret.txt' });
console.log(viaUser?.toString()); // "alice only"

// Directly on the sandbox, with an absolute path
const viaSandbox = await sandbox.readFileToBuffer({
  path: '/home/alice/secret.txt',
});
console.log(viaSandbox?.toString()); // "alice only"
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-sandbox")
    alice = box.as_user("alice")

    # Through the SandboxUser instance, with a relative path
    via_user = await alice.fs.read_text("secret.txt")
    print(via_user)  # "alice only"

    # Directly on the sandbox, with an absolute path
    via_sandbox = await box.fs.read_text("/home/alice/secret.txt")
    print(via_sandbox)  # "alice only"


asyncio.run(main())
```

> **💡 Note:** Reading directly on the sandbox relies on that default group access. If an
> agent tightens a file's permissions, for example, to mode `600`, the direct
> read no longer works, and only that user's `SandboxUser` instance can read the
> file back.

## Share files between agents with groups

To let agents collaborate, create a group with [`sandbox.createGroup()`](/docs/sandbox/sdk-reference#sandboxcreategroup). Each group gets a shared directory at `/shared/<groupname>`, where every member can read one another's files and add their own:

```ts filename="index.ts"
const devs = await sandbox.createGroup('devs');
devs.sharedDir; // "/shared/devs"

await sandbox.addUserToGroup('alice', 'devs');
await sandbox.addUserToGroup('bob', 'devs');
```

The shared directory uses the setgid bit, so files created inside it inherit the group automatically. Subdirectories created inside inherit the setgid bit too, so files nested deeper keep the group as well. A file one member writes is readable by the others:

```ts filename="index.ts"
// Alice writes to the shared directory
await alice.runCommand({
  cmd: 'bash',
  args: ['-c', 'echo "spec v2" > /shared/devs/spec.txt'],
});

// Bob reads it
const spec = await bob.runCommand({
  cmd: 'cat',
  args: ['/shared/devs/spec.txt'],
});
console.log(await spec.stdout()); // "spec v2\n"
```

Users outside the group cannot read its shared directory, and removing a user from the group revokes their access:

```ts filename="index.ts"
// A non-member cannot list the shared directory
const charlie = await sandbox.createUser('charlie');
const ls = await charlie.runCommand({ cmd: 'ls', args: ['/shared/devs'] });
console.log(ls.exitCode); // non-zero, permission denied

// Remove a member to revoke their access
await sandbox.removeUserFromGroup('alice', 'devs');
```

Removing a user affects new commands only. A process already running as that user keeps the group until it exits, so terminate and restart any long-lived processes if you need the revocation to take effect immediately.

You can also manage membership from a `SandboxUser` instance:

```ts filename="index.ts"
await alice.addToGroup('devs');
await alice.removeFromGroup('devs');
```

## Reuse an existing user

If a user already exists, for example, one restored from a snapshot, get a handle for that user without creating it again:

**index.ts**

```ts filename="index.ts"
const existing = sandbox.asUser('bob');
const whoami = await existing.runCommand('whoami');
console.log(await whoami.stdout()); // "bob\n"
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-sandbox")

    existing = box.as_user("bob")
    whoami = await existing.run_command("whoami", capture_output=True)
    print(whoami.stdout.decode())  # "bob\n"


asyncio.run(main())
```

## A complete multi-agent workflow

The following example gives a researcher, a coder, and a reviewer their own isolated workspaces, plus a shared directory for handing off work. The researcher publishes a spec, the coder reads it and writes code in private, and the reviewer can read the shared spec but not the coder's private files:

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create();

// Each agent gets its own isolated workspace
const researcher = await sandbox.createUser('researcher');
const coder = await sandbox.createUser('coder');
const reviewer = await sandbox.createUser('reviewer');

// A shared workspace for collaboration
await sandbox.createGroup('project');
await sandbox.addUserToGroup('researcher', 'project');
await sandbox.addUserToGroup('coder', 'project');
await sandbox.addUserToGroup('reviewer', 'project');

// The researcher writes findings to the shared directory
await researcher.runCommand({
  cmd: 'bash',
  args: ['-c', 'echo "API spec v2" > /shared/project/spec.txt'],
});

// The coder reads the spec, then writes code in their own home
const spec = await coder.runCommand({
  cmd: 'cat',
  args: ['/shared/project/spec.txt'],
});
await coder.writeFiles([
  { path: 'app.js', content: Buffer.from(`// ${await spec.stdout()}`) },
]);

// The reviewer can read the shared spec but not the coder's private files
const blocked = await reviewer.runCommand({
  cmd: 'cat',
  args: ['/home/coder/app.js'],
});
console.log(blocked.exitCode); // non-zero, isolation enforced
```

## Next steps

- [JS SDK Reference](/docs/sandbox/sdk-reference#sandboxuser-class): Full reference for the `SandboxUser` class and the user and group methods on `Sandbox`.
- [Python SDK Reference](/docs/sandbox/python-sdk-reference#run-commands-as-linux-users): User handles, their filesystem, and the synchronous API.
- [Working with Sandbox](/docs/sandbox/working-with-sandbox): Task-oriented examples for running code, streaming output, and managing files.
- [Understanding Sandboxes](/docs/sandbox/concepts): How sandbox isolation and the microVM model work.

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
