---
title: Harbor with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/harbor
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/harbor"
last_updated: 2026-09-13
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/authentication-and-byok/api-keys
  - /docs/ai-gateway/coding-agents/aider
  - /docs/ai-gateway/coding-agents/claude-code
  - /docs/ai-gateway/coding-agents/openai-codex
  - /docs/ai-gateway/coding-agents/fx
summary: Evaluate coding-agent harnesses with Harbor and AI Gateway. Choose a harness, configure its connection, and pass separate credentials to verifiers.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/harbor.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "8d8ac3eeb6c192217bd1747b8ac891c0648679d6fcfed2b5366a4d48f2c91444"
---

# Harbor with AI Gateway

[Harbor](https://harborframework.com/) runs benchmark tasks in isolated sandboxes and records the results. A coding-agent harness, such as Claude Code or Codex, performs each task. Harbor uses an adapter to install and launch the selected harness, then pass its model, endpoint, and credentials into the sandbox.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Run Terminal-Bench and any Harbor benchmark on Vercel Sandbox](https://vercel.com/kb/guide/run-terminal-bench-harbor-benchmarks-vercel-sandbox?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fharbor&source_site=vercel-docs&relationship=related) — Run Terminal-Bench, SWE-bench, and any Harbor benchmark on Vercel Sandbox. Each trial executes in an isolated Firecracke
- [Run Terminal-Bench and other Harbor evals on Vercel Sandbox](https://vercel.com/changelog/run-terminal-bench-and-other-harbor-evals-on-vercel-sandbox?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fharbor&source_site=vercel-docs&relationship=related)
- [Using TanStack AI with Vercel AI Gateway](https://vercel.com/kb/guide/tanstack-ai-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fharbor&source_site=vercel-docs&relationship=related) — Connect TanStack AI to Vercel AI Gateway with the @tanstack/ai-vercel-gateway adapter to stream chat, route across provi
- [OpenCode](https://ai-sdk.dev/providers/ai-sdk-harnesses/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fharbor&source_site=vercel-docs&relationship=related)
- [Harbor and Terminal-Bench](https://vercel.com/docs/sandbox/ecosystem/harbor?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fharbor&source_site=vercel-docs&relationship=related) — Run Terminal-Bench and any other Harbor Hub dataset on Vercel Sandbox, with each trial in its own isolated Firecracker m
- [DeepSeek Harness with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/deepseek?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fharbor&source_site=vercel-docs&relationship=related) — Connect DeepSeek Harness to AI Gateway with the Vercel CLI or a YAML provider and model shortlist.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/harbor.graph.md](/docs/ai-gateway/coding-agents/harbor.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fharbor&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

To route a harness through AI Gateway, configure the Harbor adapter for that harness. Each adapter forwards different credentials, endpoints, and model-name formats.

## Prerequisites

To run a benchmark locally, you need:

- Python 3.12 or later and [uv](https://docs.astral.sh/uv/getting-started/installation/)
- Docker running on your machine
- An [AI Gateway API key](/docs/ai-gateway/authentication-and-byok/api-keys)

The examples below use Harbor 0.22.0.

## Install Harbor

Install or update Harbor:

```bash filename="terminal"
uv tool install --upgrade harbor
```

Export your AI Gateway API key for the examples below:

```bash filename="terminal"
export AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
```

## Choose a harness

Select the coding-agent harness you want to evaluate with `--agent`. Harbor runs the benchmark and uses the corresponding adapter to configure the harness inside the task sandbox. The harness solves the task; the adapter only connects Harbor to that harness.

These Harbor adapters expose settings you can use to connect to AI Gateway. Set the credential variable to your AI Gateway API key and configure the endpoint shown:

| Harness | Harbor `--agent` | Credential | Connection setting |
| --- | --- | --- | --- |
| [Aider](/docs/ai-gateway/coding-agents/aider) | `aider` | `OPENAI_API_KEY` | `OPENAI_API_BASE=https://ai-gateway.vercel.sh/v1` |
| [Claude Code](/docs/ai-gateway/coding-agents/claude-code) | `claude-code` | `ANTHROPIC_API_KEY` | `ANTHROPIC_BASE_URL=https://ai-gateway.vercel.sh/claude-code` |
| [Codex](/docs/ai-gateway/coding-agents/openai-codex) | `codex` | `OPENAI_API_KEY` | `OPENAI_BASE_URL=https://ai-gateway.vercel.sh/codex/v1` |
| [fx](/docs/ai-gateway/coding-agents/fx) | `fx` | `AI_GATEWAY_API_KEY` | Native `vercel_ai_gateway` provider |
| [OpenCode](/docs/ai-gateway/coding-agents/opencode) | `opencode` | `OPENAI_API_KEY` | Use the `openai` provider with `OPENAI_BASE_URL=https://ai-gateway.vercel.sh/v1` |
| [OpenHands](/docs/ai-gateway/coding-agents/openhands) | `openhands` | `LLM_API_KEY` | `LLM_BASE_URL=https://ai-gateway.vercel.sh/v1` |
| [Pi](/docs/ai-gateway/coding-agents/pi) | `pi` | `OPENAI_API_KEY` | `OPENAI_BASE_URL=https://ai-gateway.vercel.sh/v1` and `--ak model_api=openai-completions` |
| [Qwen Code](/docs/ai-gateway/coding-agents/qwen) | `qwen-code` | `OPENAI_API_KEY` | `OPENAI_BASE_URL=https://ai-gateway.vercel.sh/v1` |
| [Mistral Vibe](/docs/ai-gateway/coding-agents/vibe) | `vibe` | `OPENAI_API_KEY` | `VIBE_BACKEND=generic` and `OPENAI_BASE_URL=https://ai-gateway.vercel.sh/v1` |

For the OpenAI-compatible paths above, model arguments may include a transport prefix in addition to AI Gateway's `creator/model-name` slug. OpenCode, OpenHands, Pi, Qwen Code, and Vibe can use `openai/anthropic/claude-opus-5` with these settings. Aider needs `openai/openai/anthropic/claude-opus-5`: Harbor removes the first `openai/`, and Aider's LiteLLM client consumes the second. Claude Code, Codex, and fx use the formats in the examples below.

The table is not an exhaustive list of Harbor harnesses. For another harness, use its AI Gateway setup guide and check how the Harbor adapter forwards the connection configuration.

For a custom harness, implement a [Harbor agent](https://harborframework.com/docs/agents) and pass its Python import path, such as `--agent my_package.agent:MyAgent`.

Each adapter controls which connection settings it forwards to the harness. Check its endpoint and model handling before switching agents. Changing `--agent` alone does not translate another adapter's configuration.

## Run a benchmark

The examples run one Terminal-Bench task. Remove `--n-tasks 1` to run the full dataset.

### Codex

Use the Codex compatibility endpoint with Harbor's `codex` adapter:

```bash filename="terminal"
harbor run \
  --dataset terminal-bench@2.0 \
  --agent codex \
  --model openai/gpt-6-astra \
  --ae "OPENAI_API_KEY=$AI_GATEWAY_API_KEY" \
  --ae "OPENAI_BASE_URL=https://ai-gateway.vercel.sh/codex/v1" \
  --n-tasks 1
```

Harbor forwards the API key and writes the base URL into Codex's configuration. Its adapter passes the final model segment, `gpt-6-astra`, to Codex. AI Gateway resolves that model name. The [Codex compatibility endpoint](/docs/ai-gateway/coding-agents/openai-codex#codex-compatibility-endpoint) supports the Responses API Codex uses.

### Claude Code

Harbor's Claude Code adapter accepts an Anthropic-compatible base URL and preserves the full model name when you configure that URL:

```bash filename="terminal"
harbor run \
  --dataset terminal-bench@2.0 \
  --agent claude-code \
  --model anthropic/claude-opus-5 \
  --ae "ANTHROPIC_API_KEY=$AI_GATEWAY_API_KEY" \
  --ae "ANTHROPIC_BASE_URL=https://ai-gateway.vercel.sh/claude-code" \
  --n-tasks 1
```

The adapter passes your AI Gateway key as `ANTHROPIC_API_KEY`. AI Gateway's [Anthropic-compatible API](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api) accepts it through the `x-api-key` header.

### OpenCode

Configure OpenCode's OpenAI-compatible provider through its Harbor adapter:

```bash filename="terminal"
harbor run \
  --dataset terminal-bench@2.0 \
  --agent opencode \
  --model openai/anthropic/claude-opus-5 \
  --ae "OPENAI_API_KEY=$AI_GATEWAY_API_KEY" \
  --ae "OPENAI_BASE_URL=https://ai-gateway.vercel.sh/v1" \
  --n-tasks 1
```

The first `openai/` selects OpenCode's provider. The remaining `anthropic/claude-opus-5` is the model ID sent to AI Gateway. Harbor registers the model and sets the provider's `baseURL` in OpenCode's configuration.

### Pi

For Pi, specify the API format as well as the base URL:

```bash filename="terminal"
harbor run \
  --dataset terminal-bench@2.0 \
  --agent pi \
  --model openai/anthropic/claude-opus-5 \
  --ae "OPENAI_API_KEY=$AI_GATEWAY_API_KEY" \
  --ae "OPENAI_BASE_URL=https://ai-gateway.vercel.sh/v1" \
  --ak model_api=openai-completions \
  --n-tasks 1
```

Harbor writes a custom Pi provider with the endpoint, credential reference, and `anthropic/claude-opus-5` model ID. The `model_api` argument selects the OpenAI Chat Completions format.

### fx

Harbor's fx adapter connects directly to AI Gateway and reads `AI_GATEWAY_API_KEY` from your shell:

```bash filename="terminal"
harbor run \
  --dataset terminal-bench@2.0 \
  --agent fx \
  --model vercel_ai_gateway/anthropic/claude-opus-5 \
  --n-tasks 1
```

Harbor installs fx inside the task environment and forwards your credential. The `vercel_ai_gateway/` prefix selects the provider; the fx adapter removes it before passing `anthropic/claude-opus-5` to fx.

See the [fx guide](/docs/ai-gateway/coding-agents/fx) to use fx outside Harbor.

### fx credentials

Harbor's fx adapter accepts these credentials from your shell or through `--ae KEY=VALUE`:

| Variable | Purpose |
| --- | --- |
| `AI_GATEWAY_API_KEY` | AI Gateway API key for fx |
| `VERCEL_AI_GATEWAY_API_KEY` | Alternative API key variable; also the variable in Harbor's `vercel_ai_gateway` provider registry |
| `VERCEL_OIDC_TOKEN` | Vercel [OpenID Connect (OIDC) token](/docs/ai-gateway/authentication-and-byok/oidc) for supported Vercel environments |

Use an API key for the local example above. OIDC tokens require a valid Vercel identity and have a limited lifetime.

## Configure verifier credentials separately

Harbor separates the agent's environment (`--ae`) from the verifier's environment (`--ve`). If a task uses a language model to judge results, pass its credentials and endpoint through `--ve`. Agent credentials do not automatically configure the verifier.

For a verifier that reads `OPENAI_API_KEY` and `OPENAI_BASE_URL`, add these flags to `harbor run`:

```bash filename="terminal"
--ve "OPENAI_API_KEY=$AI_GATEWAY_API_KEY" \
--ve "OPENAI_BASE_URL=https://ai-gateway.vercel.sh/v1"
```

Use the variable names and model configuration that the task's verifier expects. A verifier that uses another provider may require different settings.

## Next steps

- Review requests and spend with [AI Gateway observability](/docs/ai-gateway/observability-and-spend/observability)
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key
- Explore [Harbor's source](https://github.com/harbor-framework/harbor) for provider and agent adapter configuration


---

[View full sitemap](/docs/sitemap)
