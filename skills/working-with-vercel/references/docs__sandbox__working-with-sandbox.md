---
title: Working with Sandbox
product: vercel
url: /docs/sandbox/working-with-sandbox
canonical_url: "https://vercel.com/docs/sandbox/working-with-sandbox"
last_updated: 2026-08-04
type: conceptual
prerequisites:
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/images
  - /docs/sandbox/pricing
  - /docs/sandbox/sdk-reference
  - /docs/sandbox/cli-reference
  - /docs/sandbox/concepts/persistent-sandboxes
summary: Task-oriented examples for common Vercel Sandbox operations in TypeScript and Python.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/working-with-sandbox.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "639c5aca5b8ee459beeaa25126fe42fc8baf64a3abf05444fcd6aabdebab6728"
---

# Working with Sandbox

Use Vercel Sandbox to run code, stream command output, manage files, capture snapshots, and stop sandboxes from your application.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Sandbox](https://eve.dev/docs/sandbox?from=related) — The agent's isolated bash environment, including built-in file tools, a seeded /workspace, backends, lifecycle, and netw
- [How to test a container image in Vercel Sandbox before deploying](https://vercel.com/kb/guide/test-container-image-vercel-sandbox?from=related) — Validate a container image before deploying by booting it as a custom Sandbox image from Vercel Container Registry \(VCR
- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence?from=related) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [How to use snapshots for faster sandbox startup](https://vercel.com/kb/guide/how-to-use-snapshots-for-faster-sandbox-startup?from=related) — Learn how to save sandbox state with snapshots and skip installation on future runs.
- [Concepts](https://vercel.com/docs/sandbox/concepts?from=related) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [Run Commands in Vercel Sandbox](https://vercel.com/docs/sandbox/run-commands-in-sandbox?from=related) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox?from=related) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Quickstart](https://vercel.com/docs/sandbox/quickstart?from=related) — Learn how to run your first code in a Vercel Sandbox.
- [Multi-Agent](https://vercel.com/docs/sandbox/concepts/multi-agent?from=related) — Give each AI agent an isolated Linux user in a Vercel Sandbox with the @vercel/sandbox createUser, createGroup, and asUs

Full cross-link map for this page: [/docs/sandbox/working-with-sandbox.graph.md](/docs/sandbox/working-with-sandbox.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** Sandboxes are **persistent by default**: when a sandbox stops, the SDK automatically snapshots its filesystem and restores it on the next resume. Pass `persistent: false` at creation time for one-off, ephemeral workloads.

## Create a sandbox and run code

Create a sandbox, write a file into it, run the file, and inspect the command output.

You can use any of the [Vercel Managed Image](/docs/sandbox/concepts/images#vercel-managed-images), or start from your own or a shared [custom image](/docs/sandbox/concepts/images#custom-images) hosted on Vercel Container Registry. See [Images](/docs/sandbox/concepts/images) for how to use it:

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  image: 'my-repository:latest',
});
```

## Resume a long-lived sandbox

Persistent sandboxes keep their filesystem across sessions. Create a sandbox, write a file, stop it, then resume by name and read the file back — no snapshot ID to track and no setup to repeat.

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

## Execute long-running tasks

By default, sandboxes timeout after 5 minutes. For longer tasks, set a custom timeout when creating the sandbox:

To extend a running sandbox, call `extendTimeout` in TypeScript or `extend_timeout()` in Python:

See [Pricing and Limits](/docs/sandbox/pricing#runtime-limits) for maximum durations by plan.

### Run a detached command and stream logs

Use a detached command when you need to follow long-running output, keep a server alive, or wait for completion later.

## Prepare files and download artifacts

Use file APIs when your local application needs to send input files to the sandbox and retrieve a build output.

## Snapshot and restore a prepared environment

Use snapshots after dependency installation or environment setup so future sandboxes start from the same filesystem state. With persistent sandboxes, snapshots are also created automatically every time the sandbox stops; for manual checkpoints, call `snapshot()` explicitly.

To spawn fresh children from another sandbox's current snapshot without tracking IDs manually, use [`Sandbox.fork`](/docs/sandbox/sdk-reference#sandbox.fork). The fork inherits the source's config and is seeded from its latest snapshot:

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const child = await Sandbox.fork({
  sourceSandbox: 'my-base-sandbox',
  persistent: false,
});
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

Track compute usage across projects in the [Usage dashboard](https://vercel.com/d?to=%2Fdashboard%2F%5Bteam%5D%2Fusage\&title=Show+Usage+Page), which measures:

- **Sandbox Provisioned Memory**: Memory allocated to your sandboxes
- **Sandbox Data Transfer**: Data your sandboxes send to the internet, plus all traffic to and from exposed ports, is billable. Data your sandboxes download from the internet is free
- **Sandbox Active CPU**: CPU time consumed
- **Sandbox Creations**: Number of sandboxes created
- **Snapshot Storage**: Sandbox snapshot storage

## Stop a sandbox

There are three ways to stop a sandbox:

### Through the dashboard

1. Go to [Sandboxes](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fsandboxes\&title=Show+Sandbox+Page) in **Observability**.
2. Select your sandbox.
3. Click **Stop Sandbox**.

### Programmatically

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

Use `sandbox.delete()` from the JS SDK to remove the sandbox in code — useful for cleanup at the end of a job or when reacting to an event:

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


---

[View full sitemap](/docs/sitemap)
