---
title: Box Mount
product: vercel
url: /docs/sandbox/ecosystem/box-mount
canonical_url: "https://vercel.com/docs/sandbox/ecosystem/box-mount"
last_updated: 2026-09-23
type: how-to
prerequisites:
  - /docs/sandbox/ecosystem
  - /docs/sandbox
related:
  - /docs/sandbox
  - /docs/sandbox/mount-remote-storage
  - /docs/sandbox/pricing
  - /docs/sandbox/concepts/images
  - /docs/sandbox/concepts/multi-agent
summary: Sync a Box folder into a Vercel Sandbox as a POSIX filesystem, so an agent reads and writes Box content through standard file operations.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/ecosystem/box-mount.md"
fetched_at: "2026-09-28T10:45:21.491Z"
sha256: "834cd509706e59ee7996086fba847b9d84db0df749e7aee54e0fca7579c674cb"
---

# Box Mount

[Box](https://www.box.com) is a cloud content platform companies use to store
and govern documents. [Box Mount](https://developer.box.com/guides/box-mount)
maps a Box folder to a directory inside a [Vercel Sandbox](/docs/sandbox) and
keeps the two in sync while the sandbox runs. An agent works at that path with
standard filesystem calls: reading a file, creating one, listing a directory,
and editing one all behave normally. It signs in to Box the way a person
would, so it gets the same view that account gets: the same limits on what it
can open, and the same record of what it changed. Because the content lives in
Box, the output the agent writes remains after the sandbox is deleted.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Drives](https://vercel.com/kb/guide/vercel-drives?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fbox-mount&source_site=vercel-docs&relationship=related) — Learn how Vercel Drives provide persistent storage for Vercel Sandboxes, and how to create, mount, list, and delete a dr
- [Vercel Sandbox now supports FUSE-based filesystems](https://vercel.com/changelog/vercel-sandbox-now-supports-fuse-based-filesystems?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fbox-mount&source_site=vercel-docs&relationship=related)
- [How to test a container image in Vercel Sandbox before deploying](https://vercel.com/kb/guide/test-container-image-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fbox-mount&source_site=vercel-docs&relationship=related) — Validate a container image before deploying by booting it as a custom Sandbox image from Vercel Container Registry \\(VCR
- [Drives](https://vercel.com/docs/sandbox/concepts/drives?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fbox-mount&source_site=vercel-docs&relationship=related) — Persistent storage that can be mounted into sandboxes and shared across runs.
- [Working with Sandbox](https://vercel.com/docs/sandbox/working-with-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fbox-mount&source_site=vercel-docs&relationship=related) — Task-oriented examples for common Vercel Sandbox operations in TypeScript and Python.
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fbox-mount&source_site=vercel-docs&relationship=related) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [Persistence](https://vercel.com/docs/sandbox/concepts/persistent-sandboxes?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fbox-mount&source_site=vercel-docs&relationship=related) — Sandboxes automatically save their filesystem state when stopped and restore it when resumed. No manual snapshot managem
- [Quickstart](https://vercel.com/docs/sandbox/quickstart?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fbox-mount&source_site=vercel-docs&relationship=related) — Learn how to run your first code in a Vercel Sandbox.

Full cross-link map for this page: [/docs/sandbox/ecosystem/box-mount.graph.md](/docs/sandbox/ecosystem/box-mount.graph.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fbox-mount&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** Box Mount is in private preview with Box. It is not publicly available, it is
> not covered by a production SLA, and its features can change before general
> availability. Box provides the binary and setup guidance to preview
> participants. To request access, complete Box's [private preview
> form](https://bit.ly/box-mount-preview).

## How it works

Box Mount runs a background sync process inside the sandbox. When it starts,
it fills the mounted directory with the Box folder's contents. From then on,
files the agent writes go up to Box, and changes people make in Box are
available in the directory.

This is not the same as the S3 mounts on
[Mount remote storage](/docs/sandbox/mount-remote-storage). Those use a FUSE
driver, which passes each read straight through to the remote store, so
nothing is kept in the sandbox. Box Mount keeps real files in the sandbox and
syncs them, so reads are local and the mounted content takes up sandbox
[disk](/docs/sandbox/pricing#resource-limits).

## Getting started

The [vercel-labs/vercel-box-mount](https://github.com/vercel-labs/vercel-box-mount)
example runs this setup end to end. It reviews a synthetic contract in a
sandbox and checks that the review is still in Box after the sandbox is
deleted.

Work through these steps in order.

### Prerequisites

Before you start, you need:

- Access to the Box Mount private preview, including the binary. Box Mount
  runs on Linux for x86\_64 and ARM64, which covers the
  [managed Sandbox images](/docs/sandbox/concepts/images).
- A Box app in the Developer Console configured for OAuth 2.0 or JWT, and its
  credentials saved as a `box-config.json` file. See
  [Configure credentials](https://developer.box.com/guides/box-mount/#configure-credentials).
- The ID of the Box folder to mount, which is the number at the end of the
  folder's URL in Box.
- A Vercel project with Sandbox access, and the JS SDK. The user isolation
  below is not available in the Python SDK.

### Install Box Mount

Upload the preview archive and put the binary on `PATH`:

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';
import { readFile } from 'node:fs/promises';

const sandbox = await Sandbox.create();
const root = sandbox.asUser('root');

await sandbox.writeFiles([
  {
    path: '/vercel/sandbox/box-mount.tar.gz',
    content: await readFile(process.env.BOX_MOUNT_ARCHIVE),
    mode: 0o600,
  },
]);

await root.runCommand({
  cmd: 'bash',
  args: [
    '-c',
    `tar -xzf /vercel/sandbox/box-mount.tar.gz -C /usr/local/bin &&
     chmod 755 /usr/local/bin/box-mount`,
  ],
});
```

### Run the sync and the agent as separate users

The Box credentials are a Box API identity, and that identity is usually
broader than the folder you mount, so anything that can read them can act as
that app or user against all of Box. Box recommends splitting the work across
two Unix users, and Sandbox
[multi-user support](/docs/sandbox/concepts/multi-agent) provides them. The
`boxmount` user holds the credentials and runs the sync. The `boxagent` user
gets the mounted folder and nothing else.

Set the share permissions while the directory is still empty, before the first
mount fills it. `setfacl` comes from the `acl` package, which the managed
images do not preinstall:

```ts filename="index.ts"
const boxmount = await sandbox.createUser('boxmount');
const agent = await sandbox.createUser('boxagent');
const workspace = await sandbox.createGroup('boxworkspace');
await sandbox.addUserToGroup('boxmount', 'boxworkspace');
await sandbox.addUserToGroup('boxagent', 'boxworkspace');

const dataPath = '/home/boxmount/.box-mount';

await sandbox.writeFiles([
  {
    path: '/vercel/sandbox/box-config.json',
    content: await readFile(process.env.BOX_CONFIG_PATH),
    mode: 0o600,
  },
]);

await root.runCommand({
  cmd: 'bash',
  args: [
    '-c',
    `mkdir -p ${dataPath} && chown boxmount:boxmount ${dataPath} && chmod 700 ${dataPath} &&
     install -o boxmount -g boxmount -m 600 /vercel/sandbox/box-config.json ${dataPath}/box-config.json &&
     rm /vercel/sandbox/box-config.json &&
     (command -v setfacl >/dev/null || (apt-get update -qq && apt-get install -y -qq acl)) &&
     chown boxmount:boxworkspace ${workspace.sharedDir} &&
     chmod 2770 ${workspace.sharedDir} &&
     setfacl -m g:boxworkspace:rwx -m d:g:boxworkspace:rwx ${workspace.sharedDir}`,
  ],
});
```

Check the split before you mount. Running
`test ! -r /home/boxmount/.box-mount/box-config.json` as `boxagent` should
exit `0`, and
never start the agent with the `BOX_*` variables in its environment.

### Mount the folder

Run the mount as the `boxmount` user:

```ts filename="index.ts"
await boxmount.runCommand({
  cmd: 'box-mount',
  args: [
    '--data-path',
    dataPath,
    'mount',
    workspace.sharedDir,
    process.env.BOX_FOLDER_ID,
  ],
});

const status = await boxmount.runCommand({
  cmd: 'box-mount',
  args: ['--data-path', dataPath, 'status'],
});
console.log(await status.stdout());
```

The agent now works against `workspace.sharedDir` with normal file operations,
and Box Mount syncs its writes back to the folder.

### Unmount before the sandbox stops

Stopping a sandbox kills the sync process, and deleting it discards the
filesystem along with anything that never reached Box. Unmount first, and
check the status before you do: `box-mount status` reporting `No mount found.`
means the sync is already gone and local edits have not reached Box.

```ts filename="index.ts"
await boxmount.runCommand({
  cmd: 'box-mount',
  args: ['--data-path', dataPath, 'unmount', workspace.sharedDir],
});

await sandbox.stop();
```

To check that the sync landed, read the file back through the
[Box API](https://developer.box.com/reference/get-files-id-content/) and
compare its hash after the sandbox is gone.

## Limits

- Box asks you to keep preview mounts off production workloads, and sets a
  size and file count per mount. See
  [Box's workload limits](https://developer.box.com/guides/box-mount/#workload-limits)
  for the current values.
- Box Mount does not support atomic save, where an application writes a
  temporary file and renames it over the original. Files saved that way sync
  as a new file instead of a new version, and lose their Box version history.
- Developer tokens expire after 60 minutes and cannot be refreshed. Use OAuth
  2.0 or JWT for a mount that outlives one token.
- A session ends at its
  [timeout](/docs/sandbox/pricing#runtime-limits), which defaults to 5 minutes,
  whether or not a mount is still running. Size the timeout to cover the work
  and the unmount.


---

[View full sitemap](/docs/sitemap)
