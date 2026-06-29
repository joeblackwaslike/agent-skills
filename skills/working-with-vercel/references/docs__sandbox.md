---
title: Vercel Sandbox
product: vercel
url: /docs/sandbox
canonical_url: "https://vercel.com/docs/sandbox"
last_updated: 2026-06-17
type: conceptual
prerequisites:
  []
related:
  - /docs/sandbox/sdk-reference
  - /docs/sandbox/python-sdk-reference
  - /docs/sandbox/cli-reference
  - /docs/sandbox/concepts/authentication
  - /docs/sandbox/system-specifications
summary: Vercel Sandbox allows you to run arbitrary code in isolated, ephemeral Linux VMs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "7ba1142bc52bd27c7e1804e687fb4f10016ec95711f2e7adec7489be2aa7aac0"
---

# Vercel Sandbox

[Vercel Sandbox](/sandbox) is a compute primitive designed to safely run untrusted or user-generated code on Vercel. It supports dynamic, real-time workloads for AI agents, code generation, and developer experimentation.

Use sandboxes to:

- **Execute untrusted code safely**: Run AI agent output, user uploads, or third-party scripts without exposing your production systems.
- **Build interactive tools**: Create code playgrounds, AI-powered UI builders, or developer sandboxes.
- **Test in isolation**: Preview how user-submitted or agent-generated code behaves in a self-contained environment with access to logs, file edits, and live previews.
- **Run development servers**: Spin up and test applications with live previews.

## Using Vercel Sandbox

The Sandbox SDKs are the recommended way to integrate Vercel Sandbox into your applications. They provide a programmatic interface to create sandboxes, run commands, and manage files.

- **[JS SDK Reference](/docs/sandbox/sdk-reference)**: Use `@vercel/sandbox` for JavaScript and TypeScript
- **[Python SDK Reference](/docs/sandbox/python-sdk-reference)**: Use `vercel.sandbox` from the `vercel` Python package
- **[CLI](/docs/sandbox/cli-reference)**: Use the `sandbox` CLI for manual testing, agentic workflows, debugging, and one-off operations

## Authentication

Vercel Sandbox supports two authentication methods:

- **[Vercel OIDC tokens](/docs/sandbox/concepts/authentication#vercel-oidc-token-recommended)** (recommended): Vercel generates the OIDC token that it associates with your Vercel project. For local development, run `vercel link` and `vercel env pull` to get a development token. In production on Vercel, authentication is automatic.
- **[Access tokens](/docs/sandbox/concepts/authentication#access-tokens)**: Use access tokens when `VERCEL_OIDC_TOKEN` is unavailable, such as in external CI/CD systems or non-Vercel environments.

To learn more on each method, see [Authentication](/docs/sandbox/concepts/authentication) for complete setup instructions.

## System specifications

Sandboxes run on Amazon Linux 2023 with `node26`, `node24`, `node22`, and `python3.13` runtimes available. The default runtime is `node24`. Each sandbox runs as the `vercel-sandbox` user with `sudo` access and a default working directory of `/vercel/sandbox`.

For detailed information about runtimes, available packages, and sudo configuration, see [System Specifications](/docs/sandbox/system-specifications).

## Features

- **[Isolation](/docs/sandbox/concepts#isolation-architecture)**: Each sandbox runs in a secure Firecracker microVM with its own filesystem and network. Run untrusted code without affecting production.
- **[Node.js and Python runtimes](/docs/sandbox/system-specifications#runtimes)**: Choose from `node26`, `node24`, `node22`, or `python3.13` with full root access. [Install any package or binary you need](/kb/guide/how-to-install-system-packages-in-vercel-sandbox).
- **[System-privileged processes](/docs/sandbox/system-specifications#system-privileged-processes)**: Run workloads that need system-level privileges, such as container runtimes like Docker, VPN clients, and FUSE filesystem drivers.
- **[Fast startup](/docs/sandbox/concepts#how-sandboxes-work)**: Sandboxes start in milliseconds, making them ideal for real-time user interactions and latency-sensitive workloads.
- **[Persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes)**: Sandboxes that auto-save state on stop and resume where you left off. Persistence is the default. No manual snapshot management needed.
- **[Snapshotting](/docs/sandbox/concepts/snapshots)**: Save the state of a running sandbox to resume later. Skip dependency installation on subsequent runs.
- **[Tags](/docs/sandbox/concepts/tags)**: Categorize sandboxes by environment, team, or any other criteria using key-value tags.
- **[Drives (beta)](/docs/sandbox/concepts/drives)**: Attach persistent filesystem storage to sandboxes and reuse data across sandbox runs.
- **[CLI and SDKs](/docs/sandbox/sdk-reference)**: Manage sandboxes through the CLI, JS SDK, or Python SDK. Automate sandbox workflows in your application.

## Resources

**Quickstart**: Create your first sandbox step by step. [Learn more →](/docs/sandbox/quickstart)

**Working with Sandbox**: Task-oriented guides for common operations. [Learn more →](/docs/sandbox/working-with-sandbox)

**Concepts**: Understand how sandboxes work under the hood. [Learn more →](/docs/sandbox/concepts)

**JS SDK Reference**: Full API documentation for JavaScript and TypeScript. [Learn more →](/docs/sandbox/sdk-reference)

**Python SDK Reference**: Full API documentation for the Python Sandbox SDK. [Learn more →](/docs/sandbox/python-sdk-reference)

**CLI Reference**: Manage sandboxes from the command line. [Learn more →](/docs/sandbox/cli-reference)

**Pricing**: Review costs and resource limits. [Learn more →](/docs/sandbox/pricing)

**Sandbox Repo**: View the Sandbox repository on GitHub contained the SDK and CLI codebase. [Learn more →](https://github.com/vercel/sandbox)


---

[View full sitemap](/docs/sitemap)
