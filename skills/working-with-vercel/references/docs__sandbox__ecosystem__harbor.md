---
title: Harbor and Terminal-Bench
product: vercel
url: /docs/sandbox/ecosystem/harbor
canonical_url: "https://vercel.com/docs/sandbox/ecosystem/harbor"
last_updated: 2026-08-21
type: tutorial
prerequisites:
  - /docs/sandbox/ecosystem
  - /docs/sandbox
related:
  - /docs/sandbox
  - /docs/ai-gateway
  - /docs/sandbox/pricing
  - /docs/sandbox/python-sdk-reference
  - /docs/sandbox/concepts/authentication
summary: Run Terminal-Bench and any other Harbor Hub dataset on Vercel Sandbox, with each trial in its own isolated Firecracker microVM.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/ecosystem/harbor.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "190fb49207bb1b6b0d3280e1b945d808d080d3a62f5e2241e2177e0362c5b3ef"
---

# Harbor and Terminal-Bench

Evaluating a coding agent means running it against hundreds of benchmark
tasks, each in a clean environment, and scoring the results. An evaluation
harness automates that loop: it prepares each task's environment, runs the
agent, and scores the outcome. [Harbor](https://harborframework.com) is the
open source harness built by the [Terminal-Bench](https://www.tbench.ai/)
team, and one integration covers its whole registry: any of the 300 or more
datasets on the [Harbor Hub](https://hub.harborframework.com/datasets), including
Terminal-Bench, SWE-bench, tau3-bench, and OSWorld, runs every trial in
its own isolated [Vercel Sandbox](/docs/sandbox) microVM instead of a local
Docker container. Trials run in the cloud, so you can run many more in
parallel than on your local machine.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Run Terminal-Bench and any Harbor benchmark on Vercel Sandbox](https://vercel.com/kb/guide/run-terminal-bench-harbor-benchmarks-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fharbor&source_site=vercel-docs&relationship=related) — Run Terminal-Bench, SWE-bench, and any Harbor benchmark on Vercel Sandbox. Each trial executes in an isolated Firecracke
- [How to run Herdr coding agents in isolated Vercel Sandboxes](https://vercel.com/kb/guide/run-herdr-coding-agents-isolated-vercel-sandboxes?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fharbor&source_site=vercel-docs&relationship=related) — Install the vercel.sandbox plugin for Herdr, approve an upload manifest, run each AI coding agent in its own isolated Ve
- [How to test a container image in Vercel Sandbox before deploying](https://vercel.com/kb/guide/test-container-image-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fharbor&source_site=vercel-docs&relationship=related) — Validate a container image before deploying by booting it as a custom Sandbox image from Vercel Container Registry \\(VCR
- [Using TanStack AI with Vercel Sandbox](https://vercel.com/kb/guide/tanstack-ai-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fharbor&source_site=vercel-docs&relationship=related) — Run coding agents in isolated Vercel Sandbox microVMs with the @tanstack/ai-sandbox-vercel provider, with durable resume
- [Running Docker on Vercel](https://vercel.com/kb/guide/docker?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fharbor&source_site=vercel-docs&relationship=related) — Learn how to run Docker on Vercel by deploying OCI container images as Vercel Functions, storing them in Vercel Containe
- [Harbor with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/harbor?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fharbor&source_site=vercel-docs&relationship=related) — Evaluate coding-agent harnesses with Harbor and AI Gateway. Choose a harness, configure its connection, and pass separat
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fharbor&source_site=vercel-docs&relationship=related) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [Quickstart](https://vercel.com/docs/sandbox/quickstart?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fharbor&source_site=vercel-docs&relationship=related) — Learn how to run your first code in a Vercel Sandbox.

Full cross-link map for this page: [/docs/sandbox/ecosystem/harbor.graph.md](/docs/sandbox/ecosystem/harbor.graph.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fharbor&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Prerequisites

Before you begin, make sure you have:

- [uv](https://docs.astral.sh/uv/) or pip to install Harbor
- A Vercel access token, or a Git repository linked to a Vercel project with
  `vercel link`
- An [AI Gateway](/docs/ai-gateway) API key: one key gives your agent access
  to hundreds of models from multiple providers, so you can benchmark
  different models without new credentials. A single provider's key, such as
  `ANTHROPIC_API_KEY`, works too. The built-in `oracle` agent replays each
  task's reference solution and needs no model key at all.

Sandbox time that Harbor uses is billed as normal
[Vercel Sandbox usage](/docs/sandbox/pricing). Trial sandboxes are deleted
when the trial ends and leave no snapshots behind. Harbor's one-time build
caches (the builder snapshot behind image builds and Compose hosts) persist
on the `harbor-sandbox` project and are billed as snapshot storage.

## Getting started

- ### Install Harbor with the Vercel extra
  ```bash filename="Terminal"
  uv tool install 'harbor[vercel]'
  ```
  The `vercel` extra installs the [Vercel Python SDK](/docs/sandbox/python-sdk-reference).
  The square brackets are typed literally, and the quotes keep your shell from
  treating them as glob characters. You need Harbor 0.22.0 or later. If an
  older Harbor is already installed, see [Troubleshooting](#troubleshooting) to
  upgrade.

- ### Authenticate with Vercel
  If you work in a repository linked to a Vercel project, export a development
  token for that project:
  ```bash filename="Terminal"
  vercel link
  export VERCEL_OIDC_TOKEN="$(vercel project token)"
  ```
  Harbor then authenticates as your linked Vercel project. The token is valid
  for 12 hours, so run the export again when it expires.

  Without a linked project, set an access token instead. Harbor resolves your
  team, creates a project named `harbor-sandbox`, and scopes everything to it:
  ```bash filename="Terminal"
  export VERCEL_TOKEN="<your-token>"
  ```
  If your token has access to more than one team, also set `VERCEL_TEAM_ID`.
  See [Sandbox authentication](/docs/sandbox/concepts/authentication) for both
  methods.

- ### Run a smoke test
  Run the single `hello-world` task with the built-in `oracle` agent, which
  replays each task's known-correct reference solution instead of calling a
  model, so it verifies your setup without needing a model key:
  ```bash filename="Terminal"
  harbor run -t hello-world/hello-world -a oracle -e vercel
  ```
  The first run builds the task's image into
  [Vercel Container Registry](/docs/container-registry) and finishes with a
  reward of 1.0. Repeat runs boot the cached image directly.

- ### Run Terminal-Bench
  Evaluate an agent and model against Terminal-Bench 2.1 (89 tasks). The
  gateway-aware `fx` agent reads `AI_GATEWAY_API_KEY`, so one
  [AI Gateway](/docs/ai-gateway) key reaches models from every provider:
  ```bash filename="Terminal"
  export AI_GATEWAY_API_KEY="<your-key>"

  harbor run -d terminal-bench/terminal-bench-2-1 \
    --agent fx \
    --model vercel_ai_gateway/anthropic/claude-fable-5 \
    --env vercel \
    --n-concurrent 8
  ```
  The example's concurrency of 8 fits every plan's concurrency limit,
  including Hobby's 10 concurrent sandboxes. Hobby also caps each session at
  45 minutes, below Harbor's default sandbox lifetime of 24 hours, so on
  Hobby lower the lifetime with the `sandbox_lifetime_seconds` option shown
  in Configuration. On paid plans, raise `--n-concurrent` toward your model
  provider's rate limits. The same command runs any dataset registered on the
  [Harbor Hub](https://hub.harborframework.com/datasets).

- ### View results
  ```bash filename="Terminal"
  harbor view jobs
  ```
  Harbor writes results to the `jobs` directory by default. Pass a different
  path if you set `--jobs-dir`. This starts a local web viewer and prints its
  URL. Open it in your browser
  and stop the server with Ctrl+C when done. On disk, each trial's record also
  includes a `vercel-env-setup` JSON file with per-phase setup timings and the
  image or snapshot the sandbox booted from.

## How it works

A trial moves through three stages. Harbor turns the task's environment
definition into a sandbox image, boots a fresh sandbox from that image for
the agent to work in, and applies the task's network rules to the sandbox
firewall. Each item below covers one stage of that flow.

- **Native image boot**: Harbor builds a task's image once and stores it in
  [Vercel Container Registry](/docs/container-registry). Every trial of that
  task boots its sandbox directly from the stored image. The image is keyed
  by the task's content, so editing a task rebuilds its image and unchanged
  tasks reuse theirs. Pass the `task_image` option to boot from an image
  already in the registry.
- **Docker Compose tasks**: Tasks that need several containers, such as an
  app plus its database, run their Compose file inside the sandbox. Because
  installing Docker takes 30 to 90 seconds, Harbor does it once, saves the
  sandbox as a snapshot, and starts later trials from that snapshot. Reusing
  the snapshot only makes trials start faster. It cannot change their
  results.
- **Network modes**: A task's network policy maps to the
  sandbox firewall: public, no network, or a hostname allowlist with
  wildcard support, enforced outside the VM. Compose tasks support the
  public and no-network modes.
- **Credential injection**: The `credential_injection` option attaches
  secrets to matching outbound requests at the sandbox firewall, so API keys
  never enter the sandbox. Available for single-container tasks.
- **Resource requests**: A task's CPU and memory requests from `task.toml`
  are applied to the sandbox, and `--override-cpus` and `--override-memory`
  work as with other providers.
  GPU tasks are not supported.

## Configuration

Harbor accepts extra environment options with `--ek key=value` (short for
environment keyword argument). Values are JSON-parsed, so nested options are
passed as one shell-quoted argument, for example
`--ek 'credential_injection={"api.example.com": {"headers": {"Authorization": "Bearer token"}}}'`:

| Option                 | What it does                                                                 | Default          |
| ---------------------- | ---------------------------------------------------------------------------- | ---------------- |
| `task_image`           | Boot directly from an existing VCR image instead of building one            | None             |
| `project_name`         | Vercel project that owns sandboxes, images, and snapshot caches             | `harbor-sandbox` |
| `sandbox_lifetime_seconds` | The sandbox VM's own lifetime deadline, separate from agent timeouts    | 86400 (24 hours) |
| `credential_injection` | Per-host firewall rules that attach headers to outbound requests            | None             |

## Troubleshooting

### `vercel link` fails with "You defined --token, but its contents are invalid"

The Vercel CLI reads the `VERCEL_TOKEN` environment variable, so a placeholder
value like `<your-token>` left exported from an earlier step makes
`vercel link` reject it. Run `unset VERCEL_TOKEN`, then retry the link and
pull.

### VercelScopeError: token has access to multiple teams

Harbor cannot pick a team on your behalf. Set `VERCEL_TEAM_ID` to the team
that should own the `harbor-sandbox` project.

### Harbor asks for authentication after you pulled environment variables

Harbor 0.22.0 does not read `.env.local` on its own, so credentials from
`vercel env pull` stay invisible to it. Export a token as shown in step 2, or
point Harbor at the file with `harbor run --env-file .env.local`.

### `vercel` is not a valid environment type

Your installed Harbor predates the integration. Releases before 0.22.0 do
not contain the Vercel environment. Upgrade with `uv tool uninstall harbor`
followed by `uv tool install 'harbor[vercel]'`.

### Network allowlists on Compose tasks

Tasks with a `docker-compose.yaml` support the public and no-network modes
but not hostname allowlists. Harbor fails the trial at validation time with
an explanatory error rather than running with a weaker policy.


---

[View full sitemap](/docs/sitemap)
