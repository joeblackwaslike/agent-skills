---
title: Monitor your sandbox
product: vercel
url: /docs/sandbox/examples/monitor-your-sandbox
canonical_url: "https://vercel.com/docs/sandbox/examples/monitor-your-sandbox"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/sandbox/examples
  - /docs/sandbox
related:
  - /docs/sandbox/cli-reference
summary: Track running Vercel Sandboxes in the dashboard, list them from the CLI, and monitor compute usage.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/examples/monitor-your-sandbox.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "d5f3fc8b6d8cf31d6f9ee54ceb9127f6462f019562dff022c646b53566e9764d"
---

# Monitor your sandbox

View your sandboxes in the [Sandboxes dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fsandboxes\&title=Show+Sandbox+Page). For each project, you can see:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [More granular observability for Vercel Sandbox](https://vercel.com/changelog/more-granular-observability-for-vercel-sandbox)
- [Connect to and manage Sandboxes from the dashboard](https://vercel.com/changelog/connect-to-and-manage-sandboxes-from-the-dashboard)
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/examples/run-commands-in-sandbox) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [Create a sandbox and run code](https://vercel.com/docs/sandbox/examples/create-a-sandbox-and-run-code) — Create a Vercel Sandbox, write a file into it, run the file, and inspect the command output in TypeScript, Python, or th
- [Vercel Sandbox SDK](https://vercel.com/docs/sandbox/sdk) — Use the Vercel Sandbox SDK for JavaScript, TypeScript, and Python, or the Sandbox CLI, to create and manage isolated Lin

Full cross-link map for this page: [/docs/sandbox/examples/monitor-your-sandbox.graph.md](/docs/sandbox/examples/monitor-your-sandbox.graph.md)
<!-- /docsgraph:related -->

- Total sandboxes created
- Currently running sandboxes
- Stopped sandboxes
- Command history and sandbox URLs

To list sandboxes from the terminal, run [`sandbox list`](/docs/sandbox/cli-reference#sandbox-list). It shows running sandboxes by default, and `--all` includes stopped ones:

```bash filename="terminal"
sandbox list --all
```

Track compute usage across projects in the [Usage dashboard](https://vercel.com/d?to=%2Fdashboard%2F%5Bteam%5D%2Fusage\&title=Show+Usage+Page), which measures:

- **Sandbox Provisioned Memory**: Memory allocated to your sandboxes
- **Sandbox Data Transfer**: Data your sandboxes send to the internet, plus all traffic to and from exposed ports, is billable. Data your sandboxes download from the internet is free
- **Sandbox Active CPU**: CPU time consumed
- **Sandbox Creations**: Number of sandboxes created
- **Snapshot Storage**: Sandbox snapshot storage

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
