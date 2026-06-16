---
title: Quickstart
product: vercel
url: /docs/sandbox/quickstart
canonical_url: "https://vercel.com/docs/sandbox/quickstart"
last_updated: 2026-05-25
type: tutorial
prerequisites:
  - /docs/sandbox
related:
  - /docs/cli
  - /docs/sandbox/concepts/authentication
  - /docs/sandbox/working-with-sandbox
  - /docs/sandbox/pricing
  - /docs/sandbox/concepts/persistent-sandboxes
summary: Learn how to run your first code in a Vercel Sandbox.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/quickstart.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "8db6e40bede8347d7d056205fa45ed3807b2dcb28741a56a5402de74a253a116"
---

# Quickstart

This guide shows you how to run your first code in a Vercel Sandbox.

## Prerequisites

- A [Vercel account](https://vercel.com/signup)
- [Vercel CLI](/docs/cli) installed (`npm i -g vercel`)
- Node.js 22+ or Python 3.10+

- ### Set up your environment
  Create a new directory and connect it to a Vercel project. This is the recommended way to authenticate because the project handles secure [OIDC token authentication](/docs/sandbox/concepts/authentication) for you.

  When prompted, select **Create a new project**. The project doesn't need any code deployed. It needs to exist so Vercel can generate authentication tokens for you.

  Once linked, pull your environment variables to get an authentication token:
  ```bash filename="Terminal"
  vercel env pull
  ```
  This creates a `.env.local` file containing a token that the SDK uses to authenticate your requests. When you deploy to Vercel, token management happens automatically.

- ### Install the SDK

- ### Write your code
  Create a file that creates a sandbox and runs a command:

- ### Run it
  You should see: `Hello from Vercel Sandbox!`

  Sandboxes automatically stop after 5 minutes by default. They are also **persistent by default**: the filesystem is snapshotted on stop and restored the next time you resume the sandbox by name. To adjust the timeout, opt out of persistence, or manage running sandboxes, see [Working with Sandbox](/docs/sandbox/working-with-sandbox).
  > **💡 Note:** Automatic snapshots count toward [Snapshot Storage](/docs/sandbox/pricing#snapshot-storage). For one-off workloads, pass `persistent: false` (or `--non-persistent` in the CLI) to opt out. See [Persistent Sandboxes](/docs/sandbox/concepts/persistent-sandboxes) for details.

## What you just did

1. **Set up authentication**: Connected to a Vercel project and pulled credentials to enable sandbox creation.
2. **Created a sandbox**: Spun up an isolated Linux microVM.
3. **Ran a command**: Executed code inside the secure environment.

## Next steps

- [JS SDK Reference](/docs/sandbox/sdk-reference): Full API documentation for JavaScript and TypeScript.
- [Python SDK Reference](/docs/sandbox/python-sdk-reference): Full API documentation for Python.
- [CLI Reference](/docs/sandbox/cli-reference): Manage sandboxes from the terminal.
- [Snapshots](/docs/sandbox/concepts/snapshots): Save sandbox state to skip setup on future runs.
- [Examples](/docs/sandbox/working-with-sandbox#examples): See real-world use cases.


---

[View full sitemap](/docs/sitemap)
