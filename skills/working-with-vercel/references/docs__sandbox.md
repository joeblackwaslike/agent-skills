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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "85ad026c1fafd601c29f0c2d2a2151384b198dce87e8723da64bc13b9fa02327"
---

# Vercel Sandbox

[Vercel Sandbox](/sandbox) is a compute primitive designed to safely run untrusted or user-generated code on Vercel. It supports dynamic, real-time workloads for AI agents, code generation, and developer experimentation.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Security Model](https://eve.dev/docs/concepts/security-model?from=related) — eve's trust boundaries, where secrets live, how credentials reach hosts, and what fails closed by default.
- [Sandbox](https://eve.dev/docs/sandbox?from=related) — The agent's isolated bash environment, including built-in file tools, a seeded /workspace, backends, lifecycle, and netw
- [How to run Devin Outposts sessions on Vercel](https://vercel.com/kb/guide/devin-outposts-vercel-sandbox?from=related) — Run Devin Outposts sessions in isolated Vercel Sandbox microVMs. One browser authorization to set up, then sessions star
- [Running Docker on Vercel](https://vercel.com/kb/guide/docker?from=related) — Learn how to run Docker on Vercel by deploying OCI container images as Vercel Functions, storing them in Vercel Containe
- [Manage your Sanity project from Slack with eve](https://vercel.com/kb/guide/eve-sanity-copilot?from=related) — A Slack-based Sanity copilot built on eve. It queries and edits content with GROQ, shapes schemas, manages releases, and
- [Ship social posts from Slack with eve and Typefully](https://vercel.com/kb/guide/eve-typefully-social-media-agent?from=related) — A Slack-based social media agent built on eve. It drafts posts and threads for X, LinkedIn, Threads, Bluesky, and Mastod
- [How to run a multi-step research agent on Vercel](https://vercel.com/kb/guide/how-to-run-a-multi-step-research-agent-on-vercel?from=related) — An end-to-end architecture for production research agents on Vercel using Sandbox, Workflows, and AI Gateway with isolat
- [vercel sandbox](https://vercel.com/docs/cli/sandbox?from=related) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Code Review](https://vercel.com/docs/agent/pr-review?from=related) — Get automatic AI-powered code reviews on your pull requests
- [eve](https://vercel.com/docs/eve?from=related) — Learn how to deploy and run durable backend AI agents built with the open-source eve framework on Vercel.
- [Concepts](https://vercel.com/docs/eve/concepts?from=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [Insights](https://vercel.com/docs/observability/insights?from=related) — List of available data sources that you can view and monitor with Observability on Vercel.

Full cross-link map for this page: [/docs/sandbox.graph.md](/docs/sandbox.graph.md)
<!-- /docsgraph:related -->

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
- **[Multi-agent isolation](/docs/sandbox/concepts/multi-agent)**: Give each AI agent its own Linux user with a private home directory, and share files between agents with groups.
- **[Persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes)**: Sandboxes that auto-save state on stop and resume where you left off. Persistence is the default. No manual snapshot management needed.
- **[Snapshotting](/docs/sandbox/concepts/snapshots)**: Save the state of a running sandbox to resume later. Skip dependency installation on subsequent runs.
- **[Tags](/docs/sandbox/concepts/tags)**: Categorize sandboxes by environment, team, or any other criteria using key-value tags.
- **[Drives (beta)](/docs/sandbox/concepts/drives)**: Attach persistent filesystem storage to sandboxes and reuse data across sandbox runs.
- **[Mount remote storage](/docs/sandbox/mount-remote-storage)**: Mount an external object store such as Amazon S3 with a FUSE driver, and read and write remote files through the sandbox filesystem.
- **[CLI and SDKs](/docs/sandbox/sdk-reference)**: Manage sandboxes through the CLI, JS SDK, or Python SDK. Automate sandbox workflows in your application.
- **[Ubuntu with Node.js, Python, coding agents and utilities](/docs/sandbox/concepts/images)**: By default, use Ubuntu with a large set of languages and tools available with full root access.

## Resources

**Quickstart**: Create your first sandbox step by step. [Learn more →](/docs/sandbox/quickstart)

**Working with Sandbox**: Task-oriented guides for common operations. [Learn more →](/docs/sandbox/working-with-sandbox)

**Concepts**: Understand how sandboxes work under the hood. [Learn more →](/docs/sandbox/concepts)

**Multi-Agent Sandboxes**: Isolate agents with users and share files through groups. [Learn more →](/docs/sandbox/concepts/multi-agent)

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
