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
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "b236d83b6e3ca8d64c50cd2d5e3d9fe286cdfddec9fb70bc5f4b2ad6bf66312e"
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

- [Run Paseo agents on Vercel Sandbox](https://vercel.com/changelog/run-paseo-agents-on-vercel-sandbox)
- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [How to run Herdr coding agents in isolated Vercel Sandboxes](https://vercel.com/kb/guide/run-herdr-coding-agents-isolated-vercel-sandboxes) — Install the vercel.sandbox plugin for Herdr, approve an upload manifest, run each AI coding agent in its own isolated Ve
- [Vercel Sandbox vs CodeSandbox](https://vercel.com/kb/guide/vercel-sandbox-vs-codesandbox) — A detailed guide to Vercel Sandbox vs CodeSandbox: compute isolation, credential brokering, Active CPU billing, Docker s
- [How to run Devin Outposts sessions on Vercel](https://vercel.com/kb/guide/devin-outposts-vercel-sandbox) — Run Devin Outposts sessions in isolated Vercel Sandbox microVMs. One browser authorization to set up, then sessions star
- [Running OpenCode securely with the Vercel Sandbox](https://vercel.com/kb/guide/running-opencode-securely-with-the-vercel-sandbox) — Run OpenCode in an isolated Vercel Sandbox MicroVM with controlled egress, using the SDK to restrict network access so t
- [OpenAI Agents API](https://vercel.com/docs/sandbox/ecosystem/openai-agents-api) — Connect OpenAI Agents API sessions to Vercel Sandbox for isolated code execution and persistent workspace files.

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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
