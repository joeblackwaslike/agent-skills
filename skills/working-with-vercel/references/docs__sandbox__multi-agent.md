---
title: Run isolated AI agents in one sandbox
product: vercel
url: /docs/sandbox/multi-agent
canonical_url: "https://vercel.com/docs/sandbox/multi-agent"
last_updated: 2026-07-15
type: how-to
prerequisites:
  - /docs/sandbox
related:
  - /docs/sandbox/sdk-reference
  - /docs/sandbox/working-with-sandbox
  - /docs/sandbox/concepts
summary: Give each AI agent an isolated Linux user in a Vercel Sandbox with the @vercel/sandbox createUser, createGroup, and asUser methods, then share files...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/multi-agent.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "7983ccd93fc6525d589b725974ef85b8bc6319dccaad6b8803170ca0542d8c54"
---

# Run isolated AI agents in one sandbox

Run several AI agents in one sandbox, each as its own Linux user with a private home directory and separate file permissions. Isolating agents this way keeps one agent's files and output out of reach of the others, while groups let you open up a shared workspace when agents need to collaborate.

> **💡 Note:** Multi-user support is available in the JS SDK (`@vercel/sandbox`) only. The
> sandbox image must include `/bin/bash`, which the stock Vercel Sandbox images
> provide.

## Create a user for each agent

Call [`sandbox.createUser()`](/docs/sandbox/sdk-reference#sandboxcreateuser) to add a Linux user with an isolated home directory. Each user gets `/bin/bash` as their login shell and a home directory at `/home/<username>`:

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create();

const alice = await sandbox.createUser('alice');

alice.username; // "alice"
alice.homeDir; // "/home/alice"
```

`createUser()` returns a [`SandboxUser`](/docs/sandbox/sdk-reference#sandboxuser-class) instance. All commands and file operations you run through this instance execute as that user.

## Valid user and group names

User and group names must match `/^[a-z_][a-z0-9_-]*$/` and be at most 32 characters. This constraint applies to every user and group method. Invalid names throw an error immediately, which prevents command injection through a crafted name:

```ts filename="index.ts"
sandbox.asUser('Alice'); // throws, uppercase not allowed
sandbox.asUser('user name'); // throws, spaces not allowed
sandbox.asUser('$(whoami)'); // throws, special characters not allowed
```

## Run commands as a user

Commands run as the user by default, with the working directory set to their home:

```ts filename="index.ts"
const whoami = await alice.runCommand('whoami');
console.log(await whoami.stdout()); // "alice\n"

const pwd = await alice.runCommand('pwd');
console.log(await pwd.stdout()); // "/home/alice\n"
```

Pass an object to set environment variables, override the working directory, or run a long-lived process in the background:

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

[`runCommand()`](/docs/sandbox/sdk-reference#userruncommand) runs the binary directly without a shell, so shell features like pipes, redirection, and variable expansion need an explicit `bash -c`. Simple commands don't:

```ts filename="index.ts"
// Runs the binary directly, no shell needed
await alice.runCommand({ cmd: 'node', args: ['index.js'] });

// Needs a shell for the redirection
await alice.runCommand({
  cmd: 'bash',
  args: ['-c', 'echo "done" > log.txt'],
});
```

To run a single command as root, for example, to install a system package, pass `sudo: true`:

```ts filename="index.ts"
await alice.runCommand({
  cmd: 'dnf',
  args: ['install', '-y', 'git'],
  sudo: true,
});
```

Use `sudo: true` for one-off privileged commands. For a persistent root session across many commands, get a root handle with [`sandbox.asUser('root')`](/docs/sandbox/sdk-reference#sandboxasuser) instead.

## Scope file operations to a user

[`writeFiles()`](/docs/sandbox/sdk-reference#userwritefiles), [`readFile()`](/docs/sandbox/sdk-reference#userreadfile), [`readFileToBuffer()`](/docs/sandbox/sdk-reference#userreadfiletobuffer), and [`mkDir()`](/docs/sandbox/sdk-reference#usermkdir) resolve relative paths against the user's home directory, and that user owns the files:

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

Absolute paths work too, so you can write outside the home directory when you need to:

```ts filename="index.ts"
await alice.writeFiles([
  { path: '/tmp/output.txt', content: Buffer.from('data') },
]);
```

## Isolate agents from each other

Each user's home directory is isolated from other users. One agent, running as its own user, cannot read, list, or write another agent's home directory:

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

Your application always keeps access to every agent's files through two paths:

- **As the user.** Read through the `SandboxUser` instance, which honors that user's own permissions. This works for any file the user can read, including files the agent has made private.
- **Directly on the sandbox.** Read with an absolute path on the `Sandbox` instance. This works for files with default permissions, because the sandbox creates each home directory with mode `770`, group-owned by its default user group, and operations on the `Sandbox` instance run as that default user. Bob's read above failed for the opposite reason. Bob isn't a member of Alice's owning group, but the sandbox's default user is.

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

If a user already exists, for example, one restored from a snapshot, call `sandbox.asUser()` to get a handle without creating the user again:

```ts filename="index.ts"
const existing = sandbox.asUser('bob');
const whoami = await existing.runCommand('whoami');
console.log(await whoami.stdout()); // "bob\n"
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
- [Working with Sandbox](/docs/sandbox/working-with-sandbox): Task-oriented examples for running code, streaming output, and managing files.
- [Understanding Sandboxes](/docs/sandbox/concepts): How sandbox isolation and the microVM model work.


---

[View full sitemap](/docs/sitemap)
