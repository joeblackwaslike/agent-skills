---
title: Gemini API Managed Agents
product: vercel
url: /docs/sandbox/ecosystem/gemini-api
canonical_url: "https://vercel.com/docs/sandbox/ecosystem/gemini-api"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/sandbox/ecosystem
  - /docs/sandbox
related:
  - /docs/sandbox
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/sandbox/cli-reference
  - /docs/sandbox/pricing
  - /docs/sandbox/concepts/images
summary: Connect a Gemini API self-hosted environment to Vercel Sandbox so agent file and shell tools run in your own microVM.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/ecosystem/gemini-api.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "9dcf464e4194af3818e767ee0e1def67e4af9668e48c3142029f491845881c95"
---

# Gemini API Managed Agents

Use [Vercel Sandbox](/docs/sandbox) as the environment for
[Gemini API Managed Agents](https://aistudio.google.com/docs/agent-environment).
The Gemini API manages the model, the agent harness, and session state. Sandbox
gives the agent an isolated workspace for its file and shell tools.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [Run untrusted code with Vercel Sandbox, now generally available](https://vercel.com/blog/vercel-sandbox-is-now-generally-available)
- [How to run Herdr coding agents in isolated Vercel Sandboxes](https://vercel.com/kb/guide/run-herdr-coding-agents-isolated-vercel-sandboxes) — Install the vercel.sandbox plugin for Herdr, approve an upload manifest, run each AI coding agent in its own isolated Ve
- [Vercel Sandbox vs CodeSandbox](https://vercel.com/kb/guide/vercel-sandbox-vs-codesandbox) — A detailed guide to Vercel Sandbox vs CodeSandbox: compute isolation, credential brokering, Active CPU billing, Docker s
- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [OpenAI Agents API](https://vercel.com/docs/sandbox/ecosystem/openai-agents-api) — Connect OpenAI Agents API sessions to Vercel Sandbox for isolated code execution and persistent workspace files.
- [Hermes](https://vercel.com/docs/sandbox/ecosystem/hermes) — Run Hermes Agent terminal commands in isolated Vercel Sandbox microVMs, with models served through Vercel AI Gateway.

Full cross-link map for this page: [/docs/sandbox/ecosystem/gemini-api.graph.md](/docs/sandbox/ecosystem/gemini-api.graph.md)
<!-- /docsgraph:related -->

By default those tools run in a sandbox Google hosts. A self-hosted environment
points them at compute you control, so an agent can work next to your private
APIs and internal services.

## How it works

1. You create a self-hosted environment with the Gemini API and save the
   environment key it returns once.
2. You start a named [persistent sandbox](/docs/sandbox/concepts/persistent-sandboxes)
   and install the `gemini-api` CLI inside it.
3. `gemini-api environments connect` runs in the sandbox and polls the Gemini
   API for work over outbound HTTPS. No inbound ports are opened.
4. Your application submits an interaction that names the environment. The
   Gemini API leases it to the worker with a short-lived token.
5. The worker executes each file and shell tool call in the sandbox and returns
   the output, while the model and the agent loop stay on Google's servers.

## Prerequisites

- A Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey).
  Every key belongs to a Google Cloud project, and an existing Cloud account
  imports its projects before a key can be created.
- A Vercel project with Sandbox access and the
  [Sandbox CLI](/docs/sandbox/cli-reference) installed.
- The [`gemini-api` CLI](https://github.com/google-gemini/gemini-api-cli) on
  your local machine to submit interactions.

The environment key is scoped to one environment and is the only Gemini
credential the sandbox needs. Keep your Gemini API key in your application.

## Get started

Create the environment, then start the sandbox and connect it:

```bash filename="terminal"
sandbox create --name gemini-self-hosted --timeout 24h

sandbox exec gemini-self-hosted -- bash -lc \
  'curl -fsSL https://raw.githubusercontent.com/google-gemini/gemini-api-cli/main/scripts/install.sh | bash && mkdir -p /vercel/workspace'

sandbox exec --env GEMINI_ENVIRONMENT_KEY="$GEMINI_ENVIRONMENT_KEY" gemini-self-hosted -- \
  bash -lc 'nohup gemini-api environments connect --root-dir /vercel/workspace --workdir /vercel/workspace > /vercel/workspace/worker.log 2>&1 &'
```

Choose a timeout your plan allows. Hobby caps a session at 45 minutes, Pro and
Enterprise at 24 hours. See [runtime limits](/docs/sandbox/pricing#runtime-limits).

The default [managed image](/docs/sandbox/concepts/images) includes `curl`, so
the install step works without extra setup.

The worker polls continuously, so the third command starts it in the background
and writes its output to `worker.log`. Run it in the foreground instead and it
stops when you close your terminal. `--root-dir` and `--workdir` set the agent's
workspace, which the worker otherwise takes from the directory the command
started in.

The worker also stops when the session stops. Because the sandbox is persistent,
stopping it snapshots the filesystem and resuming restores it, so the installed
CLI and the agent's workspace carry over between runs. Start the worker again
after a resume.

For the API side, including how to submit interactions against the environment,
see Google's
[self-hosted environments guide](https://aistudio.google.com/docs/agent-environment#self-hosted-environments).

## What the sandbox isolates

The agent's structured file tools are confined to the worker's `--root-dir`.
Its shell tool is not, so model-generated commands can read and write anywhere
the sandbox user can. Running the worker in a sandbox is what contains that:
each sandbox is a microVM with its own filesystem and network.

> **💡 Note:** Environment variables you set on the sandbox reach the worker process, not the
> agent's own shell commands. The worker passes a fixed allowlist to those
> commands, so values such as a database URL or an internal API token arrive
> empty. Write the configuration an agent needs into its workspace instead.

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
