---
title: Vercel Sandbox
product: vercel
url: /docs/sandbox
canonical_url: "https://vercel.com/docs/sandbox"
last_updated: 2026-08-04
type: conceptual
prerequisites:
  []
related:
  - /docs/sandbox/sdk-reference
  - /docs/sandbox/python-sdk-reference
  - /docs/sandbox/cli-reference
  - /docs/sandbox/concepts/authentication
  - /docs/sandbox/concepts/images
summary: Vercel Sandbox allows you to run arbitrary code in isolated, ephemeral Linux VMs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "a85a22a107a7bc212308b4c21df6b7757295734c56c50e0105441b81d5e49c97"
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

Sandboxes run Linux images, with Ubuntu, Arch Linux, or any other Linux distribution you need. The default image is `vercel/sandbox/universal`, which includes the current Node.js LTS, Python 3.14, coding agents, and common utilities. You can use Vercel's [managed images](/docs/sandbox/concepts/images) or your own custom images stored in [Vercel Container Registry](/docs/container-registry).

For detailed information about the sandbox environment, see [Concepts](/docs/sandbox/concepts).

## Features

- **[Isolation](/docs/sandbox/concepts#isolation-architecture)**: Each sandbox runs in a secure Firecracker microVM with its own filesystem and network. Run untrusted code without affecting production.
- **[Managed and custom images](/docs/sandbox/concepts/images)**: Start sandboxes from Vercel's Managed Images, a shared or public image, or your own OCI images stored in [Vercel Container Registry](/docs/container-registry). Build your system packages and tooling into an image, and share it across projects and teams.
- **[System-privileged processes](/docs/sandbox/concepts#isolation-architecture)**: Run workloads that need system-level privileges, such as container runtimes like Docker, VPN clients, and FUSE filesystem drivers.
- **[Fast startup](/docs/sandbox/concepts#how-sandboxes-work)**: Sandboxes start in milliseconds, making them ideal for real-time user interactions and latency-sensitive workloads.
- **[Multi-agent isolation](/docs/sandbox/multi-agent)**: Give each AI agent its own Linux user with a private home directory, and share files between agents with groups.
- **[Persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes)**: Sandboxes that auto-save state on stop and resume where you left off. Persistence is the default. No manual snapshot management needed.
- **[Snapshotting](/docs/sandbox/concepts/snapshots)**: Save the state of a running sandbox to resume later. Skip dependency installation on subsequent runs.
- **[Tags](/docs/sandbox/concepts/tags)**: Categorize sandboxes by environment, team, or any other criteria using key-value tags.
- **[Drives (beta)](/docs/sandbox/concepts/drives)**: Attach persistent filesystem storage to sandboxes and reuse data across sandbox runs.
- **[CLI and SDKs](/docs/sandbox/sdk-reference)**: Manage sandboxes through the CLI, JS SDK, or Python SDK. Automate sandbox workflows in your application.
- **[Ubuntu with Node.js, Python, coding agents and utilities](/docs/sandbox/concepts/images)**: By default, use Ubuntu with a large set of languages and tools available with full root access.

## Resources

**Quickstart**: Create your first sandbox step by step. [Learn more →](/docs/sandbox/quickstart)

**Working with Sandbox**: Task-oriented guides for common operations. [Learn more →](/docs/sandbox/working-with-sandbox)

**Concepts**: Understand how sandboxes work under the hood. [Learn more →](/docs/sandbox/concepts)

**Multi-Agent Sandboxes**: Isolate agents with users and share files through groups. [Learn more →](/docs/sandbox/multi-agent)

**JS SDK Reference**: Full API documentation for JavaScript and TypeScript. [Learn more →](/docs/sandbox/sdk-reference)

**Python SDK Reference**: Full API documentation for the Python Sandbox SDK. [Learn more →](/docs/sandbox/python-sdk-reference)

**CLI Reference**: Manage sandboxes from the command line. [Learn more →](/docs/sandbox/cli-reference)

**Ecosystem**: Use Sandbox with agent frameworks, model SDKs, and coding agents. [Learn more →](/docs/sandbox/ecosystem)

**Pricing**: Review costs and resource limits. [Learn more →](/docs/sandbox/pricing)

**Images**: Start sandboxes from a Vercel Managed Image (VMI), or custom images stored in VCR. [Learn more →](/docs/sandbox/concepts/images)

**Container Registry**: Store custom images for Sandbox in VCR. [Learn more →](/docs/container-registry)

**Sandbox Repo**: View the Sandbox repository on GitHub contained the SDK and CLI codebase. [Learn more →](https://github.com/vercel/sandbox)


---

[View full sitemap](/docs/sitemap)
