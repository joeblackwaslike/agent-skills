---
title: AgentEnv by Scale AI
product: vercel
url: /docs/sandbox/ecosystem/agentenv
canonical_url: "https://vercel.com/docs/sandbox/ecosystem/agentenv"
last_updated: 2018-10-20
type: tutorial
prerequisites:
  - /docs/sandbox/ecosystem
  - /docs/sandbox
related:
  - /docs/sandbox
  - /docs/cli
summary: Run evaluations with AgentEnv by Scale AI using separate Vercel sandboxes for the environment and agent.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/ecosystem/agentenv.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "77f1ed491163e47f0148206afd843d6ef510a207d2896ac6ca6963f38aa1abed"
---

# AgentEnv by Scale AI

[AgentEnv](https://github.com/scaleapi/agentenv-framework) is Scale AI's
evaluation harness. It prepares a task's environment, runs an agent, and
scores the result. With the Vercel provider, the environment and agent run in separate
[Vercel Sandbox](/docs/sandbox) instances.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [Build an agentic app in FastAPI with OpenAI Agents API and Vercel Sandbox](https://vercel.com/kb/guide/fastapi-openai-agents-api-vercel-sandbox) — Learn how to build a repository Q&A app using FastAPI, OpenAI Agents API, and Vercel Sandbox, with isolated code inspect
- [An Introduction to Evals](https://vercel.com/kb/guide/an-introduction-to-evals) — Evaluations test model and agent outputs to ensure they meet the standards and requirements you specify.
- [Run Python code securely with AI SDK and Vercel Sandbox](https://vercel.com/kb/guide/python-ai-sdk-vercel-sandbox) — Add an \\`executeCode\\` tool to your AI SDK agent with the \\`ai-sdk-tool-code-execution\\` package to run Python 3.13 insi
- [Using TanStack AI with Vercel Sandbox](https://vercel.com/kb/guide/tanstack-ai-vercel-sandbox) — Run coding agents in isolated Vercel Sandbox microVMs with the @tanstack/ai-sandbox-vercel provider, with durable resume
- [Ship It](https://eve.dev/docs/tutorial/ship-it) — Part 8 of the Build an Agent tutorial. Put a web dashboard on the agent with useEveAgent, replace placeholderAuth, and d
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [eve](https://vercel.com/docs/eve) — Build and deploy durable backend AI agents with eve, an open-source, filesystem-first framework.
- [OpenAI Agents API](https://vercel.com/docs/sandbox/ecosystem/openai-agents-api) — Connect OpenAI Agents API sessions to Vercel Sandbox for isolated code execution and persistent workspace files.
- [LangChain](https://vercel.com/docs/sandbox/ecosystem/langchain) — Give a LangChain agent a tool that executes model-generated code in an isolated Vercel Sandbox, with models served by AI

Full cross-link map for this page: [/docs/sandbox/ecosystem/agentenv.graph.md](/docs/sandbox/ecosystem/agentenv.graph.md)
<!-- /docsgraph:related -->

This guide runs a complete evaluation using the
[Vercel Labs example](https://github.com/vercel-labs/agentenv-framework/tree/vercel-demo).
Its deterministic agent calls Model Context Protocol (MCP) tools to add an
item, then the harness checks the result. You don't need a model API key.
The example verifies the integration; it doesn't measure model quality.

> **💡 Note:** [AgentEnv 0.9.1334](https://pypi.org/project/agentenv-framework/0.9.1334/)
> includes the Vercel provider. This guide uses the Vercel Labs demo branch for
> its example environment and deterministic agent.

## Prerequisites

Before you begin, make sure you have:

- Git, Python 3.11.4 or newer, and [uv](https://docs.astral.sh/uv/)
- Node.js and [Vercel CLI](/docs/cli) 62.5.0 or newer
- A Vercel project and team where you can create sandboxes with 4 vCPUs and
  8 GB of memory for the builder and environment, plus 2 vCPUs and 4 GB for
  the agent

The example builds its images in a Vercel sandbox, so you don't need local
Docker. Your machine and sandboxes need access to the package and image
registries used by the example.

## Run an evaluation

- ### Install the example
  Clone the Vercel Labs branch and install its optional Vercel dependencies:
  ```bash filename="Terminal"
  git clone --branch vercel-demo https://github.com/vercel-labs/agentenv-framework.git
  cd agentenv-framework
  uv sync --frozen --extra vercel
  export AGENT_ENV_CONFIG="$PWD/examples/vercel-sandbox/config.toml"
  ```
  The dedicated configuration selects Vercel for both the environment and
  agent:
  ```toml filename="examples/vercel-sandbox/config.toml"
  [sandbox]
  default = "vercel"
  agent_default = "vercel"
  ```
  Keep `AGENT_ENV_CONFIG` set in the terminal where you run the example.

- ### Sign in to Vercel
  If you haven't signed in through the CLI, run:
  ```bash filename="Terminal"
  vercel login
  ```
  The example's wrapper uses your CLI login to request a project-scoped
  OpenID Connect (OIDC) token. It passes the token to the evaluation process
  without printing it or saving it to disk. You don't need to create an
  access token manually.

- ### Run the demo
  Replace `YOUR_TEAM` with your team slug and `YOUR_PROJECT` with an existing
  project name. Choose a new output directory for each run; the example
  refuses to overwrite an existing directory:
  ```bash filename="Terminal"
  .venv/bin/python examples/vercel-sandbox/with_vercel_login.py \
    --scope YOUR_TEAM --project YOUR_PROJECT -- \
    .venv/bin/python examples/vercel-sandbox/run_e2e.py \
    --repo . --output /tmp/agentenv-vercel-e2e-run-1
  ```
  The example creates a builder sandbox, an environment sandbox, and an
  agent sandbox. It loads an initial item, asks the agent to add
  `vercel-review-complete` through MCP, and grades the result.

- ### Check the result
  A successful run ends with:
  ```text filename="Terminal"
  END-TO-END EVALUATION PASSED: score 1
  ```
  Open the output directory to inspect the results:
  - **`success.json`**: The score and cleanup checks.
  - **`environment-state.json`**: The initial item and the item the agent added.
  - **`objects/`**: Task artifacts, including the agent's recorded actions.
  - **`resources.json`**: The sandbox identifiers for the run.
  Successful runs remove all three sandboxes. Failed runs stop and retain
  sandboxes tracked by the runner for diagnosis. See the
  [example's lifecycle notes](https://github.com/vercel-labs/agentenv-framework/tree/vercel-demo#run-with-an-existing-vercel-login)
  for setup failures and retained resources.

## Next steps

The example stores run records in local SQLite and artifacts on your
filesystem. See the
[example's validation scope](https://github.com/vercel-labs/agentenv-framework/blob/vercel-demo/examples/vercel-sandbox/RESULTS.md)
for what the demo verifies before adapting it to your own tasks.


---

[View full sitemap](/docs/sitemap)
