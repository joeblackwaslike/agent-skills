---
title: Sandbox Examples
product: vercel
url: /docs/sandbox/examples
canonical_url: "https://vercel.com/docs/sandbox/examples"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/sandbox
related:
  - /docs/sandbox
  - /docs/sandbox/examples/create-a-sandbox-and-run-code
  - /docs/sandbox/examples/expose-a-port
  - /docs/sandbox/examples/clone-a-private-git-repository
  - /docs/sandbox/examples/install-system-packages
summary: Task-oriented examples for common Vercel Sandbox operations in TypeScript, Python, and the Sandbox CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/examples.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "0c186f40059913a06ef8296e9511c285423e6bac6425c8fd01fb06fd0cc943a3"
---

# Sandbox Examples

Use Vercel Sandbox to run code, stream command output, manage files, capture snapshots, and stop sandboxes from your application or from the terminal. Each example is a focused page with TypeScript, Python, and Sandbox CLI versions where they apply.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Sandbox vs CodeSandbox](https://vercel.com/kb/guide/vercel-sandbox-vs-codesandbox) — A detailed guide to Vercel Sandbox vs CodeSandbox: compute isolation, credential brokering, Active CPU billing, Docker s
- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [Quickstart](https://vercel.com/docs/sandbox/quickstart) — Learn how to run your first code in a Vercel Sandbox.
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [Run isolated AI agents in one sandbox](https://vercel.com/docs/sandbox/concepts/multi-agent) — Give each AI agent an isolated Linux user in a Vercel Sandbox with the JS and Python SDKs, then share files between agen
- [Ecosystem](https://vercel.com/docs/sandbox/ecosystem) — Use Vercel Sandbox with the agent frameworks, model SDKs, and agents you already work with.
- [Vercel Sandbox SDK](https://vercel.com/docs/sandbox/sdk) — Use the Vercel Sandbox SDK for JavaScript, TypeScript, and Python, or the Sandbox CLI, to create and manage isolated Lin

Full cross-link map for this page: [/docs/sandbox/examples.graph.md](/docs/sandbox/examples.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** Sandboxes are **persistent by default**: when a sandbox stops, the SDK automatically snapshots its filesystem and restores it on the next resume. Pass `persistent: false` at creation time for one-off, ephemeral workloads.

To have a coding agent run these examples for you, add the [sandbox](https://skills.sh/vercel/sandbox/sandbox) and [offload-to-sandbox](https://skills.sh/vercel/vercel-plugin/offload-to-sandbox) skills. See [Add Sandbox skills to your coding agent](/docs/sandbox#add-sandbox-skills-to-your-coding-agent).

- [Create a sandbox and run code](/docs/sandbox/examples/create-a-sandbox-and-run-code): Write a file into a sandbox, run it, and inspect the output.
- [Expose a port](/docs/sandbox/examples/expose-a-port): Reach a server running in a sandbox through a public URL.
- [Clone a private Git repository](/docs/sandbox/examples/clone-a-private-git-repository): Create a sandbox from a private repository with the right GitHub token.
- [Install system packages](/docs/sandbox/examples/install-system-packages): Add packages with the image's package manager and `sudo`.
- [Start a coding agent from the CLI](/docs/sandbox/examples/start-a-coding-agent): Run OpenCode in a new sandbox from your terminal.
- [Resume a long-lived sandbox](/docs/sandbox/examples/resume-a-long-lived-sandbox): Stop a persistent sandbox and pick up where you left off.
- [Execute long-running tasks](/docs/sandbox/examples/execute-long-running-tasks): Set and extend timeouts, run detached commands, and stream logs.
- [Prepare files and download artifacts](/docs/sandbox/examples/prepare-files-and-download-artifacts): Send input files to a sandbox and retrieve build output.
- [Snapshot and restore a prepared environment](/docs/sandbox/examples/snapshot-and-restore): Save a configured filesystem and start new sandboxes from it.
- [Debug with an interactive shell](/docs/sandbox/examples/debug-with-an-interactive-shell): Connect to a running sandbox with an SSH-like session.
- [Monitor your sandbox](/docs/sandbox/examples/monitor-your-sandbox): Track sandboxes and usage in the dashboard and CLI.
- [Stop a sandbox](/docs/sandbox/examples/stop-a-sandbox): Stop sessions from the dashboard, SDK, or CLI.
- [Delete a sandbox](/docs/sandbox/examples/delete-a-sandbox): Permanently remove a sandbox and, optionally, its snapshots.
- [Mount remote storage](/docs/sandbox/examples/mount-remote-storage): Mount an object store such as Amazon S3 with a FUSE driver.
- [Run commands in a Vercel Sandbox](/docs/sandbox/examples/run-commands-in-sandbox): A CLI walkthrough for builds, tests, and one-off commands.
- [Stream a desktop to your browser](/docs/sandbox/examples/desktop-streaming): Stream a sandbox's desktop with screen-relay, and control it from your browser or from an agent.

## More examples

**View all Sandbox examples**: Browse the complete collection of Sandbox guides, tutorials, and code samples. [Learn more →](/kb/sandbox)

**Execute AI-generated code safely**: Learn how to run code generated by AI models in an isolated sandbox environment. [Learn more →](/kb/guide/how-to-execute-ai-generated-code-safely)

**Use with Claude Agent SDK**: Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation and autonomous agent tasks. [Learn more →](/kb/guide/using-vercel-sandbox-claude-agent-sdk)

**Run AI-generated code**: How to execute untrusted, AI-generated code inside Vercel Sandbox - an isolated, ephemeral environment. [Learn more →](/kb/guide/running-ai-generated-code-sandbox)

**Run OpenClaw in Vercel Sandbox**: Learn how to run OpenClaw in Vercel Sandbox for secure and isolated execution. [Learn more →](/kb/guide/running-openclaw-in-vercel-sandbox)

**Run OpenCode securely with the Vercel Sandbox**: Learn how to run OpenCode securely with the Vercel Sandbox to build your own background coding agent [Learn more →](/kb/guide/running-opencode-securely-with-the-vercel-sandbox)

**Run Cursor Cloud Agents in Vercel Sandbox**: Learn how to run Cursor Cloud Agents in Vercel Sandbox instead of Cursor's hosted machines. [Learn more →](/kb/guide/cursor-vercel-sandbox)

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
