---
title: Quickstart
product: vercel
url: /docs/sandbox/quickstart
canonical_url: "https://vercel.com/docs/sandbox/quickstart"
last_updated: 2026-08-25
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
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "379f5da96b06ec0a517973aeed4a5131a0d030fd3270c0bf5badae90c8c6fd13"
---

# Quickstart

This guide shows you how to run your first code in a Vercel Sandbox.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk?from=related&source_path=%2Fdocs%2Fsandbox%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [Run untrusted code with Vercel Sandbox, now generally available](https://vercel.com/blog/vercel-sandbox-is-now-generally-available?from=related&source_path=%2Fdocs%2Fsandbox%2Fquickstart&source_site=vercel-docs&relationship=related)
- [Safely running AI generated code in your Next.js application](https://vercel.com/kb/guide/running-ai-generated-code-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fquickstart&source_site=vercel-docs&relationship=related) — How to execute untrusted, AI‑generated code from a Next.js app using Vercel Sandbox, an isolated, ephemeral environment.
- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [Using private GitHub repositories with Vercel Sandbox](https://vercel.com/kb/guide/sandbox-private-github-repositories?from=related&source_path=%2Fdocs%2Fsandbox%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn how to use Vercel Sandbox with private GitHub repositories using fine-grained tokens, classic tokens, or GitHub Ap
- [Vercel Sandboxes are now generally available](https://vercel.com/changelog/vercel-sandboxes-ga?from=related&source_path=%2Fdocs%2Fsandbox%2Fquickstart&source_site=vercel-docs&relationship=related)
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts?from=related&source_path=%2Fdocs%2Fsandbox%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [vercel sandbox](https://vercel.com/docs/cli/sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fquickstart&source_site=vercel-docs&relationship=related) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [OpenAI SDK](https://vercel.com/docs/sandbox/ecosystem/openai-sdk?from=related&source_path=%2Fdocs%2Fsandbox%2Fquickstart&source_site=vercel-docs&relationship=related) — Use OpenAI function calling with AI Gateway to execute model-generated code in an isolated Vercel Sandbox.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fquickstart&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/sandbox/quickstart.graph.md](/docs/sandbox/quickstart.graph.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fquickstart&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

**Agent prompt**

```text
Help me set up Vercel Sandbox in this project. First, make sure the Vercel CLI is installed (`npm i -g vercel`). If I'm using Claude Code or Cursor, install the Vercel Plugin (`npx plugins add vercel/vercel-plugin`). For other agents, install Vercel Skills (`npx skills add vercel-labs/agent-skills`). Then: 1. Install the @vercel/sandbox SDK. 2. Run `vercel link` and `vercel env pull` to get credentials. 3. Create a script that spins up a sandbox, runs code inside it, and captures the output. 4. Run it to verify the sandbox works.
```

## Prerequisites

- A [Vercel account](https://vercel.com/signup)
- [Vercel CLI](/docs/cli) installed (`npm i -g vercel`)
- Node.js 22+ or Python 3.10+

- ### Set up your environment
  Create a new directory and connect it to a Vercel project. This is the recommended way to authenticate because the project handles secure [OIDC token authentication](/docs/sandbox/concepts/authentication) for you.

  **TypeScript**
  ```bash filename="Terminal"
  mkdir my-sandbox-app && cd my-sandbox-app
  pnpm init
  vercel link
  ```
  **Python**
  ```bash filename="Terminal"
  mkdir my-sandbox-app && cd my-sandbox-app
  uv init
  vercel link
  ```
  When prompted, select **Create a new project**. The project doesn't need any code deployed. It needs to exist so Vercel can generate authentication tokens for you.

  Once linked, pull your environment variables to get an authentication token:
  ```bash filename="Terminal"
  vercel env pull
  ```
  This creates a `.env.local` file containing a token that the SDK uses to authenticate your requests. When you deploy to Vercel, token management happens automatically.

- ### Install the SDK
  **TypeScript**
  #### npm
  ```bash filename="Terminal"
  npm install @vercel/sandbox dotenv @types/node tsx typescript
  ```
  #### yarn
  ```bash filename="Terminal"
  yarn add @vercel/sandbox dotenv @types/node tsx typescript
  ```
  #### pnpm
  ```bash filename="Terminal"
  pnpm add @vercel/sandbox dotenv @types/node tsx typescript
  ```
  #### bun
  ```bash filename="Terminal"
  bun add @vercel/sandbox dotenv @types/node tsx typescript
  ```
  `dotenv` is used to access environment variables within your application. The `tsx` package is a TypeScript runner that allows you to run your TypeScript code. The `typescript` package is the TypeScript compiler. The `@types/node` package is the TypeScript definitions for the Node.js API.

  **Python**
  ```bash filename="Terminal"
  uv add vercel python-dotenv
  ```

- ### Write your code
  Create a file that creates a sandbox and runs a command:

  **TypeScript**
  ```ts filename="index.ts"
  import { config } from 'dotenv';
  config({ path: '.env.local' });

  import { Sandbox } from '@vercel/sandbox';

  async function main() {
    const sandbox = await Sandbox.create();

    const result = await sandbox.runCommand('echo', ['Hello from Vercel Sandbox!']);
    console.log(await result.stdout());
  }

  main().catch(console.error);
  ```
  **Python**
  ```python filename="main.py"
  import asyncio

  from dotenv import load_dotenv
  from vercel import sandbox

  load_dotenv('.env.local')


  async def main() -> None:
      async with sandbox.create_sandbox(persistent=False) as box:
          result = await box.run_process(
              'echo',
              ['Hello from Vercel Sandbox!'],
              capture_output=True,
              check=True,
          )
          print(result.stdout)


  asyncio.run(main())
  ```

- ### Run it
  **TypeScript**
  ```bash filename="Terminal"
  pnpm tsx index.ts
  ```
  **Python**
  ```bash filename="Terminal"
  uv run python main.py
  ```
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
