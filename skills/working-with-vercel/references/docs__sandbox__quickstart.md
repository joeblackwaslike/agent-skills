---
title: Quickstart
product: vercel
url: /docs/sandbox/quickstart
canonical_url: "https://vercel.com/docs/sandbox/quickstart"
last_updated: 2026-07-15
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "6fcf9003c7e31bcf729d7ce9c2ce6ff58bc9348407e7253bb9288f89afbe5c0f"
---

# Quickstart

This guide shows you how to run your first code in a Vercel Sandbox.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk?from=related) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [Using private GitHub repositories with Vercel Sandbox](https://vercel.com/kb/guide/sandbox-private-github-repositories?from=related) — Learn how to use Vercel Sandbox with private GitHub repositories using fine-grained tokens, classic tokens, or GitHub Ap
- [Safely running AI generated code in your Next.js application](https://vercel.com/kb/guide/running-ai-generated-code-sandbox?from=related) — How to execute untrusted, AI‑generated code from a Next.js app using Vercel Sandbox, an isolated, ephemeral environment.
- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox?from=related) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [Run Commands in Vercel Sandbox](https://vercel.com/docs/sandbox/run-commands-in-sandbox?from=related) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox?from=related) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Concepts](https://vercel.com/docs/sandbox/concepts?from=related) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [OpenAI SDK](https://vercel.com/docs/sandbox/ecosystem/openai-sdk?from=related) — Use OpenAI function calling with AI Gateway to execute model-generated code in an isolated Vercel Sandbox.
- [Getting Started](https://vercel.com/docs/getting-started-with-vercel?from=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.

Full cross-link map for this page: [/docs/sandbox/quickstart.graph.md](/docs/sandbox/quickstart.graph.md)
<!-- /docsgraph:related -->

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
