---
title: Paseo
product: vercel
url: /docs/sandbox/ecosystem/paseo
canonical_url: "https://vercel.com/docs/sandbox/ecosystem/paseo"
last_updated: 2026-10-23
type: tutorial
prerequisites:
  - /docs/sandbox/ecosystem
  - /docs/sandbox
related:
  - /docs/ai-gateway
  - /docs/sandbox/pricing
  - /docs/sandbox/concepts/firewall
summary: Run Codex, Claude Code, OpenCode, and Pi in persistent Vercel Sandbox microVMs from Paseo, and reach the same session from your desktop or phone.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/ecosystem/paseo.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "c28265607e41a90c6c8e7e51b02b5440bbbdd7ce3edcc3e614ee88aa0670b0ab"
---

# Paseo

Run agents in the cloud with the
[Vercel Sandbox plugin](https://github.com/vercel-labs/paseo-vercel-sandbox)
for [Paseo](https://paseo.sh). Control sessions from your laptop, or connect
from your phone to follow progress and send instructions. Your agents keep
running when your laptop is offline.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to run Herdr coding agents in isolated Vercel Sandboxes](https://vercel.com/kb/guide/run-herdr-coding-agents-isolated-vercel-sandboxes) — Install the vercel.sandbox plugin for Herdr, approve an upload manifest, run each AI coding agent in its own isolated Ve
- [Running OpenCode securely with the Vercel Sandbox](https://vercel.com/kb/guide/running-opencode-securely-with-the-vercel-sandbox) — Run OpenCode in an isolated Vercel Sandbox MicroVM with controlled egress, using the SDK to restrict network access so t
- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [Using TanStack AI with Vercel Sandbox](https://vercel.com/kb/guide/tanstack-ai-vercel-sandbox) — Run coding agents in isolated Vercel Sandbox microVMs with the @tanstack/ai-sandbox-vercel provider, with durable resume
- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [Quickstart](https://vercel.com/docs/sandbox/quickstart) — Learn how to run your first code in a Vercel Sandbox.
- [OpenAI Agents API](https://vercel.com/docs/sandbox/ecosystem/openai-agents-api) — Connect OpenAI Agents API sessions to Vercel Sandbox for isolated code execution and persistent workspace files.
- [Security for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/security) — What a durable agent harness may run in your Vercel Function, where the commands and files a model picks run instead, an

Full cross-link map for this page: [/docs/sandbox/ecosystem/paseo.graph.md](/docs/sandbox/ecosystem/paseo.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

Before you begin, make sure you have:

- Paseo 0.9.0 or newer on your client and the machine running the plugin
- Node.js 24 or newer on that machine
- A Vercel token, team ID, and project ID
- An [AI Gateway](/docs/ai-gateway) key

The plugin installs Paseo 0.9.1 inside each sandbox.

> **💡 Note:** Sessions default to 24 hours, which requires a Pro or Enterprise plan. On
> Hobby, set the plugin's session timeout to 45 minutes or less. See [runtime
> limits](/docs/sandbox/pricing#runtime-limits).

## Getting started

- ### Install the plugin
  In Paseo, open **Settings → Plugins** and turn on **Enable plugins**. Paste
  the repository into **Plugin source**:
  ```
  https://github.com/vercel-labs/paseo-vercel-sandbox.git
  ```
  You can install the same source from the command line:
  ```bash
  paseo plugin add https://github.com/vercel-labs/paseo-vercel-sandbox.git
  ```
  Paseo clones the repository and compiles the plugin. You don't need to run
  `npm install` or build it yourself.

- ### Add your credentials
  Open **Vercel Sandboxes** in the sidebar and select **Open settings**.
  You can also find the plugin under **Settings → Plugins → Vercel Sandbox**.
  On Paseo 0.9, open the actions menu on the `vercel-sandbox` row and choose
  **Vercel Sandbox**.

  Enter your Vercel token, team ID, project ID, and AI Gateway key, then select
  **Save credentials**. You enter these once during setup; the plugin uses them
  for subsequent sessions.

  Create the token at
  [vercel.com/account/settings/tokens](https://vercel.com/account/settings/tokens).
  The team and project IDs are the `orgId` and `projectId` values in
  `.vercel/project.json` after running `vercel link`, and both also appear on
  the Settings, General page for the team and the project.

- ### Create a host
  Open **Vercel Sandboxes** in the sidebar. Choose Codex, Claude Code, OpenCode,
  or Pi, then select **Create**.
  The plugin creates a sandbox, installs Paseo and the agent inside it, starts
  Paseo, and prepares a pairing link.

- ### Pair the host
  When the host is ready, select **Reveal pairing link**, then **Copy pairing
  link**. In Paseo, go to **Hosts → Add host → Paste pairing link**. Paste the
  link and select **Pair**. If Paseo asks you to confirm the host, review its
  details and select **Connect**. You only need to pair this host once.

- ### Work from anywhere
  Open a workspace on the host, set the repository directory to
  `/vercel/workspace/repo`, and choose the agent and its AI Gateway model:

  | Agent | Model selection |
  | --- | --- |
  | Codex | **Gateway** |
  | Claude Code | **Sonnet 5** |
  | OpenCode | A model under **Vercel AI Gateway** |
  | Pi | A model under **vercel-ai-gateway** |

  Give the agent a task. Close your laptop and the agent keeps working. You can
  also pair your phone to the same host to follow the session and send follow-up
  instructions while the task runs.

## How it works

Each host is a persistent sandbox running Paseo. Clients connect through
Paseo's relay without exposing a public sandbox port.

Keep the machine running the plugin online to create, stop, or resume hosts.
Once paired, your laptop and phone connect to the running cloud
agent through the relay until the sandbox session ends.

Stopping a host snapshots it, and resuming restores the workspace and restarts
Paseo with the same identity, so existing pairings keep working. Snapshots
expire after 24 hours. Save work you need to keep longer outside the sandbox.

### Credential handling

The AI Gateway key never enters the sandbox. The plugin puts it in the
sandbox's [egress firewall policy](/docs/sandbox/concepts/firewall), which
injects the `Authorization` header on requests to `ai-gateway.vercel.sh` and
leaves other traffic unchanged. The agents inside the sandbox see a
placeholder value, so code running there cannot read the real key.

The plugin reapplies the policy on start and resume using the credentials
saved for that host. Replacing credentials in settings applies to new hosts;
existing hosts keep their original Vercel token and AI Gateway key. Keep those
credentials valid while their hosts are in use.

Your Vercel token stays on your own machine. It is used by the plugin to call
the Sandbox API and is never sent to the sandbox.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
