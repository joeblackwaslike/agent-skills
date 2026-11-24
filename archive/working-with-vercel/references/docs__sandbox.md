---
title: Vercel Sandbox
product: vercel
url: /docs/sandbox
canonical_url: "https://vercel.com/docs/sandbox"
last_updated: 2026-09-22
type: conceptual
prerequisites:
  []
related:
  - /docs/agent-resources/software-factory/eve
  - /docs/sandbox/quickstart
  - /docs/sandbox/pricing
  - /docs/sandbox/sdk-reference
  - /docs/sandbox/python-sdk-reference
summary: Run untrusted or agent-generated code in isolated Linux microVMs with Vercel Sandbox, an AI agent sandbox with network controls, Drives, and Active...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "080c0a0e7811d2bb14746c9ac0d0af7b5a055d95e50f1243ad0a76d1104d80a6"
---

# Vercel Sandbox

## Run agent workloads in isolated sandboxes

Vercel Sandbox is an AI sandbox that runs untrusted or agent-generated code in isolated Linux microVMs. Use it to execute code, run coding agents, persist state with Drives, and control network access.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Sandbox vs CodeSandbox](https://vercel.com/kb/guide/vercel-sandbox-vs-codesandbox) — A detailed guide to Vercel Sandbox vs CodeSandbox: compute isolation, credential brokering, Active CPU billing, Docker s
- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [Run untrusted code with Vercel Sandbox, now generally available](https://vercel.com/blog/vercel-sandbox-is-now-generally-available)
- [Running OpenCode securely with the Vercel Sandbox](https://vercel.com/kb/guide/running-opencode-securely-with-the-vercel-sandbox) — Run OpenCode in an isolated Vercel Sandbox MicroVM with controlled egress, using the SDK to restrict network access so t
- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [Security Model](https://eve.dev/docs/concepts/security-model) — eve's trust boundaries, where secrets live, how credentials reach hosts, and what fails closed by default.
- [Build with OpenAI Agents API on Vercel](https://vercel.com/changelog/build-with-openai-agents-api-on-vercel)
- [Connect to and manage Sandboxes from the dashboard](https://vercel.com/changelog/connect-to-and-manage-sandboxes-from-the-dashboard)
- [Custom tags available in beta on Vercel Sandbox](https://vercel.com/changelog/custom-tags-available-in-beta-on-vercel-sandbox)
- [Data downloaded by Vercel Sandbox is now free](https://vercel.com/changelog/data-downloaded-by-vercel-sandbox-is-now-free)
- [Drives for Vercel Sandbox in Private Beta](https://vercel.com/changelog/drives-for-vercel-sandbox-in-private-beta)

Full cross-link map for this page: [/docs/sandbox.graph.md](/docs/sandbox.graph.md)
<!-- /docsgraph:related -->

Start from a template

## Deploy an eve software factory

Start with Foreman, an eve template that routes requests through intake,
investigation, implementation, and review stages. Use Sandbox for isolated
repository work.

Start from the [eve software factory template](/templates/eve/eve-software-factory), then follow the [setup guide](/docs/agent-resources/software-factory/eve).

Use sandboxes to:

- **Run untrusted code safely**: Execute AI agent output, user uploads, or third-party scripts without exposing your production systems.
- **Give agents a Linux workspace**: Run coding agents where they can edit files, install packages, execute shell commands, and expose previews.
- **Keep persistent state with Drives**: Attach Drives when an agent needs files after a run ends, or use persistent sandboxes and snapshots for filesystem state.
- **Control network access and credentials**: Restrict outbound traffic and request credentials that Vercel sets up from your team's configuration.
- **Test applications in isolation**: Preview how user-submitted or agent-generated code behaves with access to logs, file edits, and live previews.

## Add Sandbox skills to your coding agent

Skills give a coding agent current Sandbox guidance, so it uses the right SDK and CLI commands when you ask it to work with sandboxes.

- **[sandbox](https://skills.sh/vercel/sandbox/sandbox)**: SDK and CLI guidance for creating sandboxes, running commands, and managing files, snapshots, and network access.
- **[offload-to-sandbox](https://skills.sh/vercel/vercel-plugin/offload-to-sandbox)**: Run heavy builds and long test suites in sandboxes and keep them off your computer.

```bash filename="Terminal"
npx skills add vercel/sandbox
npx skills add https://github.com/vercel/vercel-plugin --skill offload-to-sandbox
```

Choose your coding agent when prompted. The [Vercel plugin](/docs/sandbox/quickstart) includes `offload-to-sandbox` and its own `vercel-sandbox` skill, so you don't need these if you installed the plugin.

## Active CPU pricing for agent sandboxes

In agentic workflows, active CPU time is often dwarfed by time spent waiting on LLM calls and external APIs. With [Active CPU pricing](/docs/sandbox/pricing#active-cpu), Vercel doesn't charge you for CPU while your code waits for those responses. You pay only for actively used CPU time.

An idle sandbox keeps CPU charges low because it uses little CPU. Stop a sandbox when work is done to end CPU and memory charges.

### Example

This table shows compute charges for a sandbox with **1 vCPU and 2 GB of memory** running in `iad1` for a full day:

| Sandbox | What the meter reads | Per day | Per 30 days |
| --- | --- | --- | --- |
| Idle | 1% of a vCPU busy, 2 GB of memory in use | $1.05 | $31.45 |
| Busy all day | 1 vCPU busy, 2 GB of memory in use | $4.09 | $122.69 |
| Stopped | no CPU, no memory | $0.00 | $0.00 |


This example uses current `iad1` rates. Idle assumes 1% CPU utilization. Your utilization will vary.

The totals include CPU and [allocated memory](/docs/sandbox/pricing#provisioned-memory) only. See [pricing](/docs/sandbox/pricing) for other charges and included usage.

## Using Vercel Sandbox

The Sandbox SDKs are the recommended way to integrate Vercel Sandbox into your applications. They provide a programmatic interface to create sandboxes, run commands, and manage files.

- **[JS SDK Reference](/docs/sandbox/sdk-reference)**: Use `@vercel/sandbox` for JavaScript and TypeScript
- **[Python SDK Reference](/docs/sandbox/python-sdk-reference)**: Use `vercel.sandbox` from the `vercel-sandbox` Python package
- **[CLI](/docs/sandbox/cli-reference)**: Use the `sandbox` CLI for manual testing, agentic workflows, debugging, and one-off operations

For a Python walkthrough, [run untrusted Python code safely with Vercel Sandbox](/kb/guide/python-and-vercel-sandbox). Execute code from a FastAPI app with network restrictions and snapshots for reusable environments.

For end-to-end examples using these interfaces, browse the [Vercel Sandbox
guides](/kb/vercel-sandbox).

[Analyze large datasets with Sandbox and MCP](/kb/guide/large-scale-data-analysis-vercel-sandbox-mcp) to run agent-generated SQL and Python while keeping the dataset outside the model's context window.

## Authentication

Vercel Sandbox supports two authentication methods:

- **[Vercel OIDC tokens](/docs/sandbox/concepts/authentication#vercel-oidc-token-recommended)** (recommended): Vercel generates the OIDC token that it associates with your Vercel project. For local development, run `vercel link` and `vercel env pull` to get a development token. In production on Vercel, authentication is automatic.
- **[Access tokens](/docs/sandbox/concepts/authentication#access-tokens)**: Use access tokens when `VERCEL_OIDC_TOKEN` is unavailable, such as in external CI/CD systems or non-Vercel environments.

To learn more on each method, see [Authentication](/docs/sandbox/concepts/authentication) for complete setup instructions.

## System specifications

Sandboxes run Linux images, with Ubuntu, Arch Linux, or any other Linux distribution you need. The default image is `vercel/sandbox/universal`, which includes the current Node.js LTS, Python 3.14, coding agents, and common utilities. You can use Vercel's [managed images](/docs/sandbox/concepts/images) or your own custom images stored in [Vercel Container Registry](/docs/container-registry).

For detailed information about the sandbox environment, see [Concepts](/docs/sandbox/concepts).

## Monitor CPU and memory usage

Use the [**Observability** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability\&title=Go+to+Observability) in your dashboard to inspect Sandbox CPU and memory usage. From [**Sandboxes**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsandboxes\&title=Go+to+Sandboxes), open an individual sandbox's detail page to compare its memory usage with its memory limit.

For CPU pressure, use **CPU usage**. Vercel charges for [**Active CPU**](/docs/sandbox/pricing#active-cpu), the time your code actively uses the CPU. Waiting for network requests or model calls doesn't incur CPU charges.

For memory pressure, use **Memory Usage** (`memoryUsedBytes` in the query builder). [Provisioned Memory](/docs/sandbox/pricing#provisioned-memory) measures allocated memory over time for billing. It doesn't measure how much memory your processes use.

### Monitor usage with alerts

Configure [custom monitors](/docs/alerts/configure-alerts#configure-custom-monitors) to check CPU or memory usage periodically and notify you when it exceeds a threshold you set. Create and manage monitors in [**Settings > Alerts**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Falerts). Custom monitors require a Pro or Enterprise plan with [Observability Plus](/docs/observability/observability-plus), and queries incur [data-scanned charges](/docs/observability/observability-plus#pricing).

## Features

- **[Isolation](/docs/sandbox/concepts/security#isolation-architecture)**: Each sandbox runs in a secure Firecracker microVM with its own filesystem and network. Run untrusted code without affecting production.
- **[Managed and custom images](/docs/sandbox/concepts/images)**: Start sandboxes from Vercel's Managed Images, a shared or public image, or your own OCI images stored in [Vercel Container Registry](/docs/container-registry). Build your system packages and tooling into an image, and share it across projects and teams.
- **[System-privileged processes](/docs/sandbox/concepts/security#isolation-architecture)**: Run workloads that need system-level privileges, such as container runtimes like Docker, VPN clients, and FUSE filesystem drivers.
- **[Fast startup](/docs/sandbox/concepts#how-sandboxes-work)**: Sandboxes start in milliseconds, making them ideal for real-time user interactions and latency-sensitive workloads.
- **[Multi-agent isolation](/docs/sandbox/concepts/multi-agent)**: Give each AI agent its own Linux user with a private home directory, and share files between agents with groups.
- **[Persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes)**: Sandboxes that auto-save state on stop and resume where you left off. Persistence is the default. No manual snapshot management needed.
- **[Secure Compute](/docs/sandbox/concepts/secure-compute)**: Attach sandboxes to a Secure Compute network to send their public-internet traffic through static IPs, and reach your own VPC over VPC peering.
- **[Snapshotting](/docs/sandbox/concepts/snapshots)**: Save the state of a running sandbox to resume later. Skip dependency installation on subsequent runs.
- **[Tags](/docs/sandbox/concepts/tags)**: Categorize sandboxes by environment, team, or any other criteria using key-value tags.
- **[Drives](/docs/sandbox/concepts/drives)**: Attach persistent filesystem storage to sandboxes and reuse data across sandbox runs.
- **[Credentials](/docs/sandbox/concepts/credentials)**: Authenticate to private services with credentials Vercel sets up from your team's configuration.
- **[Mount remote storage](/docs/sandbox/examples/mount-remote-storage)**: Mount an external object store such as Amazon S3 with a FUSE driver, and read and write remote files through the sandbox filesystem.
- **[CLI and SDKs](/docs/sandbox/sdk-reference)**: Manage sandboxes through the CLI, JS SDK, or Python SDK. Automate sandbox workflows in your application.
- **[Ubuntu with Node.js, Python, coding agents and utilities](/docs/sandbox/concepts/images)**: By default, use Ubuntu with a large set of languages and tools available with full root access.

## Resources

**Quickstart**: Create your first sandbox step by step. [Learn more →](/docs/sandbox/quickstart)

**Examples**: Task-oriented guides for common operations. [Learn more →](/docs/sandbox/examples)

**Concepts**: Understand how sandboxes work under the hood. [Learn more →](/docs/sandbox/concepts)

**Multi-Agent Sandboxes**: Isolate agents with users and share files through groups. [Learn more →](/docs/sandbox/concepts/multi-agent)

**JS SDK Reference**: Full API documentation for JavaScript and TypeScript. [Learn more →](/docs/sandbox/sdk-reference)

**Python SDK Reference**: Full API documentation for the Python Sandbox SDK. [Learn more →](/docs/sandbox/python-sdk-reference)

**CLI Reference**: Manage sandboxes from the command line. [Learn more →](/docs/sandbox/cli-reference)

**Ecosystem**: Use Sandbox with agent frameworks, model SDKs, and coding agents. [Learn more →](/docs/sandbox/ecosystem)

**Credentials**: Authenticate to private services with no setup in the sandbox. [Learn more →](/docs/sandbox/concepts/credentials)

**Pricing**: Review costs and resource limits. [Learn more →](/docs/sandbox/pricing)

**Images**: Start sandboxes from a Vercel Managed Image (VMI), or custom images stored in VCR. [Learn more →](/docs/sandbox/concepts/images)

**Container Registry**: Store custom images for Sandbox in VCR. [Learn more →](/docs/container-registry)

**Sandbox Repo**: View the Sandbox repository on GitHub contained the SDK and CLI codebase. [Learn more →](https://github.com/vercel/sandbox)

## Related guides

- [Vercel Sandbox vs Cloudflare Sandbox](https://vercel.com/kb/guide/vercel-sandbox-vs-cloudflare-sandbox): Compare Vercel Sandbox and Cloudflare Sandbox as AI agent sandboxes, including isolation, persistence, network controls, SDKs, and deployment options.
- [Vercel Sandbox vs Modal Sandboxes](https://vercel.com/kb/guide/vercel-sandbox-vs-modal-sandboxes): Compare Vercel Sandbox and Modal Sandboxes as AI agent sandboxes, including isolation, persistence, network controls, GPUs, SDKs, and deployment regions.
- [Vercel Sandbox vs Upstash Box](https://vercel.com/kb/guide/vercel-sandbox-vs-upstash-box): Compare Vercel Sandbox and Upstash Box as AI agent sandboxes, including isolation, persistence, network controls, SDKs, and deployment regions.
- [Running Durable Agents on Vercel](https://vercel.com/kb/guide/durable-ai-agents): Design durable AI agents on Vercel with patterns for execution recovery, human approval, safe retries, deployment changes, and persistent files.

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
