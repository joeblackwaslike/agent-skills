---
title: Devin
product: vercel
url: /docs/sandbox/ecosystem/devin
canonical_url: "https://vercel.com/docs/sandbox/ecosystem/devin"
last_updated: 2026-08-04
type: tutorial
prerequisites:
  - /docs/sandbox/ecosystem
  - /docs/sandbox
related:
  - /docs/cron-jobs
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/sandbox/concepts/runtimes
summary: Run Devin Outposts sessions in isolated Vercel Sandbox microVMs, with the control plane deployed on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/ecosystem/devin.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "9f50b0f5d6f82a6aa1933f1d0edad6f67c38460727696f16297a368066f5d435"
---

# Devin

[Devin Outposts](https://docs.devin.ai/cloud/outposts/overview) lets Devin run
sessions on your own infrastructure. With the
[Devin Outposts for Vercel integration](https://github.com/vercel-labs/devin-outpost-vercel),
the control plane runs entirely on Vercel. No worker process needs to stay
online, so you can start sessions from any device, including a phone.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk?from=related) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence?from=related) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel?from=related) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [Sandbox](https://eve.dev/docs/sandbox?from=related) — The agent's isolated bash environment, including built-in file tools, a seeded /workspace, backends, lifecycle, and netw
- [Quickstart](https://vercel.com/docs/sandbox/quickstart?from=related) — Learn how to run your first code in a Vercel Sandbox.
- [Examples](https://vercel.com/docs/sandbox/working-with-sandbox?from=related) — Task-oriented examples for common Vercel Sandbox operations in TypeScript and Python.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox?from=related) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Concepts](https://vercel.com/docs/sandbox/concepts?from=related) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [Getting Started](https://vercel.com/docs/getting-started-with-vercel?from=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.

Full cross-link map for this page: [/docs/sandbox/ecosystem/devin.graph.md](/docs/sandbox/ecosystem/devin.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** You need a Devin account with Outposts enabled and administrator access, and a
> Vercel team on a Pro or Enterprise plan. The one-minute cron schedule and
> up-to-24-hour sandbox sessions are not available on Hobby.

## How it works

A [cron job](/docs/cron-jobs) invokes a function once per minute, which polls
Devin's queue every three seconds for pending sessions. Each session maps to
one sandbox:

- **One microVM per session**: Each Devin session runs in its own named,
  [persistent sandbox](/docs/sandbox/concepts/persistent-sandboxes).
- **State restoration**: A session resumes from the sandbox's newest
  snapshot; only the newest snapshot is kept after each stop.
- **Network restrictions**: Devin allowlists become sandbox firewall rules.
- **Automatic extension**: The integration extends the sandbox lifetime when
  less than 10 minutes remain.

## Getting started

- ### Deploy the repository
  Click [Deploy with
  Vercel](/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Fdevin-outpost-vercel\&integration-ids=oac_doeREEVvypk1AfuPfktJzjpZ\&project-name=devin-outpost-vercel\&repository-name=devin-outpost-vercel)
  and choose the destination Vercel team. The template comes from the
  [devin-outpost-vercel repository](https://github.com/vercel-labs/devin-outpost-vercel).

- ### Add the integration
  Add **Devin Outposts for Vercel** when the Deploy Button asks for the
  required integration.

- ### Authorize in Devin
  Sign in to Devin as an administrator, review the suggested outpost name, and
  click **Connect**. The browser never sees a Devin token or secret.
  The integration exchanges Devin's short-lived, single-use authorization code
  server-to-server and adds the encrypted runtime configuration to the new
  Vercel project.

- ### Complete the deployment
  Let Vercel finish creating and deploying the project. Queue polling begins
  within one minute of the production deployment.
  > **💡 Note:** Cron jobs run only on production deployments, so a preview deployment never
  > polls the queue.

- ### Start a session
  In Devin, start a session and select the new Vercel outpost as its virtual
  environment.

## Configuration

Optional environment variables on the deployed project, with defaults:

| Variable             | Default   | Description                                                  |
| -------------------- | --------- | ------------------------------------------------------------ |
| `SANDBOX_RUNTIME`    | `node24`  | Sandbox [runtime](/docs/sandbox/concepts/runtimes)           |
| `SANDBOX_VCPUS`      | `2`       | vCPUs per sandbox                                            |
| `SANDBOX_TIMEOUT_MS` | `1200000` | Initial session timeout (20 minutes), extended automatically |
| `MAX_CONCURRENT`     | `5`       | Maximum concurrent sessions                                  |
| `POLL_INTERVAL_MS`   | `3000`    | Queue poll interval                                          |

For local development mode and the full variable reference, see the
[devin-outpost-vercel repository](https://github.com/vercel-labs/devin-outpost-vercel)
and the [Devin Outposts on Vercel Sandbox guide](/kb/guide/devin-outposts-vercel-sandbox).


---

[View full sitemap](/docs/sitemap)
