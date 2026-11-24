---
title: Start a coding agent from the CLI
product: vercel
url: /docs/sandbox/examples/start-a-coding-agent
canonical_url: "https://vercel.com/docs/sandbox/examples/start-a-coding-agent"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/sandbox/examples
  - /docs/sandbox
related:
  - /docs/sandbox/cli-reference
summary: Start OpenCode in a new Vercel Sandbox from an interactive terminal with the Sandbox CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/examples/start-a-coding-agent.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "b0d0255ac6423ce4d09c7d5b1ea0377ae1d09530e446e8515b607628b9058f99"
---

# Start a coding agent from the CLI

With Sandbox CLI 4.8.0 or later, start OpenCode in a new sandbox from an interactive terminal:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Running OpenCode securely with the Vercel Sandbox](https://vercel.com/kb/guide/running-opencode-securely-with-the-vercel-sandbox) — Run OpenCode in an isolated Vercel Sandbox MicroVM with controlled egress, using the SDK to restrict network access so t
- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [OpenCode](https://vercel.com/docs/sandbox/ecosystem/opencode) — Run OpenCode in Vercel Sandbox from your terminal, or use the plugin for sandbox-backed tools and remote workspaces.
- [Quickstart](https://vercel.com/docs/sandbox/quickstart) — Learn how to run your first code in a Vercel Sandbox.
- [Ecosystem](https://vercel.com/docs/sandbox/ecosystem) — Use Vercel Sandbox with the agent frameworks, model SDKs, and agents you already work with.
- [Examples](https://vercel.com/docs/platforms/examples) — Clone working multi-tenant and multi-project starters to begin your platform build.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y

Full cross-link map for this page: [/docs/sandbox/examples/start-a-coding-agent.graph.md](/docs/sandbox/examples/start-a-coding-agent.graph.md)
<!-- /docsgraph:related -->

```bash filename="Terminal"
sandbox create opencode
```

The agent's interface opens in your terminal while its commands run in the sandbox. Sign in to Vercel for Sandbox access and authenticate OpenCode separately. Your local files are not copied automatically. See the [CLI reference](/docs/sandbox/cli-reference#sandbox-create) for agent options and how to reconnect or stop the sandbox.

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
