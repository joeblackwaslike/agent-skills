---
title: Vercel Sandbox SDK
product: vercel
url: /docs/sandbox/sdk
canonical_url: "https://vercel.com/docs/sandbox/sdk"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/sandbox
related:
  - /docs/sandbox/sdk/javascript
  - /docs/sandbox/sdk/python
  - /docs/sandbox/sdk/cli
  - /docs/sandbox/concepts/authentication
  - /docs/sandbox/quickstart
summary: Use the Vercel Sandbox SDK for JavaScript, TypeScript, and Python, or the Sandbox CLI, to create and manage isolated Linux microVMs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/sdk.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "60e944b7da84ea2b2f56ceaad169946299bcc4f27567ff2daf74411277183526"
---

# Vercel Sandbox SDK

The Vercel Sandbox SDK lets you create and manage isolated Linux microVMs from your own code: run commands, work with files and drives, snapshot environments, and preserve state between sessions. The SDK is available for JavaScript and TypeScript, and for Python, alongside a CLI for working from the terminal:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Sandbox CLI is now available](https://vercel.com/changelog/vercel-sandbox-cli-is-now-available)
- [Vercel Sandboxes are now generally available](https://vercel.com/changelog/vercel-sandboxes-ga)
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Create a sandbox and run code](https://vercel.com/docs/sandbox/examples/create-a-sandbox-and-run-code) — Create a Vercel Sandbox, write a file into it, run the file, and inspect the command output in TypeScript, Python, or th
- [Sandbox Examples](https://vercel.com/docs/sandbox/examples) — Task-oriented examples for common Vercel Sandbox operations in TypeScript, Python, and the Sandbox CLI.
- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/examples/run-commands-in-sandbox) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat

Full cross-link map for this page: [/docs/sandbox/sdk.graph.md](/docs/sandbox/sdk.graph.md)
<!-- /docsgraph:related -->

- [JS SDK Reference](/docs/sandbox/sdk/javascript): The `@vercel/sandbox` package for JavaScript and TypeScript.
- [Python SDK Reference](/docs/sandbox/sdk/python): The `vercel-sandbox` package for Python 3.11 and newer, with asynchronous and synchronous APIs.
- [CLI Reference](/docs/sandbox/sdk/cli): The `sandbox` command for manual testing and debugging: create and connect to sandboxes, run commands and coding agents, and copy files from your terminal.

Both SDKs expose the same core capabilities, including sandbox creation and retrieval, command execution, filesystem access, drives, snapshots, network policies, and Linux users. They authenticate with a Vercel OIDC token by default, or with an access token where OIDC is unavailable. See [Authentication](/docs/sandbox/concepts/authentication). The CLI uses your saved Vercel credentials.

If you're new to Vercel Sandbox, start with the [Quickstart](/docs/sandbox/quickstart).

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
