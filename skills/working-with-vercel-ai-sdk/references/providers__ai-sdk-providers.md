---
title: AI SDK Providers
description: Learn how to use AI SDK providers.
url: "https://ai-sdk.dev/providers/ai-sdk-providers"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/ai-sdk-providers.md"
fetched_at: "2026-10-12T11:48:49.587Z"
sha256: "cf2b6ea55731ab6ca315456bc0b47a2bf4259f9b595a692bd4a812d54daa63a9"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The AI SDK comes with several providers that you can use to interact with different language models:

There are also [community providers](./community-providers) that have been created using the [Language Model Specification](./community-providers/custom-providers).

## Provider support

Not all providers support all AI SDK features. Here's a quick comparison of the capabilities of popular models:

| Provider                                                   | Model                                               | Image Input | Object Generation | Tool Usage | Tool Streaming |
| ---------------------------------------------------------- | --------------------------------------------------- | ----------- | ----------------- | ---------- | -------------- |
| [xAI Grok](/providers/ai-sdk-providers/xai)                | `grok-4.6`                                          | ✓           | ✓                 | ✓          | ✓              |
| [xAI Grok](/providers/ai-sdk-providers/xai)                | `grok-4.5`                                          | ✓           | ✓                 | ✓          | ✓              |
| [xAI Grok](/providers/ai-sdk-providers/xai)                | `grok-4-fast-reasoning`                             | ✓           | ✓                 | ✓          | ✓              |
| [xAI Grok](/providers/ai-sdk-providers/xai)                | `grok-4`                                            | ✗           | ✓                 | ✓          | ✓              |
| [xAI Grok](/providers/ai-sdk-providers/xai)                | `grok-3`                                            | ✗           | ✓                 | ✓          | ✓              |
| [xAI Grok](/providers/ai-sdk-providers/xai)                | `grok-3-mini`                                       | ✗           | ✓                 | ✓          | ✓              |
| [OpenAI](/providers/ai-sdk-providers/openai)               | `gpt-6-astra`                                       | ✓           | ✓                 | ✓          | ✓              |
| [OpenAI](/providers/ai-sdk-providers/openai)               | `gpt-6.1-sol`                                       | ✓           | ✓                 | ✓          | ✓              |
| [OpenAI](/providers/ai-sdk-providers/openai)               | `gpt-6-luna`                                        | ✓           | ✓                 | ✓          | ✓              |
| [OpenAI](/providers/ai-sdk-providers/openai)               | `gpt-6-sol`                                         | ✓           | ✓                 | ✓          | ✓              |
| [OpenAI](/providers/ai-sdk-providers/openai)               | `gpt-5.6`                                           | ✓           | ✓                 | ✓          | ✓              |
| [OpenAI](/providers/ai-sdk-providers/openai)               | `gpt-5.6-luna`                                      | ✓           | ✓                 | ✓          | ✓              |
| [OpenAI](/providers/ai-sdk-providers/openai)               | `gpt-5.6-sol`                                       | ✓           | ✓                 | ✓          | ✓              |
| [OpenAI](/providers/ai-sdk-providers/openai)               | `gpt-5.6-terra`                                     | ✓           | ✓                 | ✓          | ✓              |
| [OpenAI](/providers/ai-sdk-providers/openai)               | `gpt-5.5`                                           | ✓           | ✓                 | ✓          | ✓              |
| [OpenAI](/providers/ai-sdk-providers/openai)               | `gpt-5.4-mini`                                      | ✓           | ✓                 | ✓          | ✓              |
| [OpenAI](/providers/ai-sdk-providers/openai)               | `gpt-5.4-nano`                                      | ✓           | ✓                 | ✓          | ✓              |
| [OpenAI](/providers/ai-sdk-providers/openai)               | `gpt-5.2-pro`                                       | ✓           | ✓                 | ✓          | ✓              |
| [OpenAI](/providers/ai-sdk-providers/openai)               | `gpt-5.2`                                           | ✓           | ✓                 | ✓          | ✓              |
| [OpenAI](/providers/ai-sdk-providers/openai)               | `gpt-5.1`                                           | ✓           | ✓                 | ✓          | ✓              |
| [OpenAI](/providers/ai-sdk-providers/openai)               | `gpt-5.1-codex`                                     | ✓           | ✓                 | ✓          | ✓              |
| [OpenAI](/providers/ai-sdk-providers/openai)               | `gpt-5`                                             | ✓           | ✓                 | ✓          | ✓              |
| [OpenAI](/providers/ai-sdk-providers/openai)               | `gpt-5-mini`                                        | ✓           | ✓                 | ✓          | ✓              |
| [OpenAI](/providers/ai-sdk-providers/openai)               | `gpt-4.1`                                           | ✓           | ✓                 | ✓          | ✓              |
| [OpenAI](/providers/ai-sdk-providers/openai)               | `gpt-4.1-mini`                                      | ✓           | ✓                 | ✓          | ✓              |
| [OpenAI](/providers/ai-sdk-providers/openai)               | `gpt-4o`                                            | ✓           | ✓                 | ✓          | ✓              |
| [OpenAI](/providers/ai-sdk-providers/openai)               | `gpt-4o-mini`                                       | ✓           | ✓                 | ✓          | ✓              |
| [Anthropic](/providers/ai-sdk-providers/anthropic)         | `claude-opus-5-5`                                   | ✓           | ✓                 | ✓          | ✓              |
| [Anthropic](/providers/ai-sdk-providers/anthropic)         | `claude-sonnet-5-5`                                 | ✓           | ✓                 | ✓          | ✓              |
| [Anthropic](/providers/ai-sdk-providers/anthropic)         | `claude-sonnet-5`                                   | ✓           | ✓                 | ✓          | ✓              |
| [Anthropic](/providers/ai-sdk-providers/anthropic)         | `claude-haiku-5-5`                                  | ✓           | ✓                 | ✓          | ✓              |
| [Anthropic](/providers/ai-sdk-providers/anthropic)         | `claude-fable-5-1`                                  | ✓           | ✓                 | ✓          | ✓              |
| [Anthropic](/providers/ai-sdk-providers/anthropic)         | `claude-fable-5`                                    | ✓           | ✓                 | ✓          | ✓              |
| [Anthropic](/providers/ai-sdk-providers/anthropic)         | `claude-opus-4-8`                                   | ✓           | ✓                 | ✓          | ✓              |
| [Anthropic](/providers/ai-sdk-providers/anthropic)         | `claude-opus-4-7`                                   | ✓           | ✓                 | ✓          | ✓              |
| [Anthropic](/providers/ai-sdk-providers/anthropic)         | `claude-opus-4-6`                                   | ✓           | ✓                 | ✓          | ✓              |
| [Anthropic](/providers/ai-sdk-providers/anthropic)         | `claude-sonnet-4-6`                                 | ✓           | ✓                 | ✓          | ✓              |
| [Anthropic](/providers/ai-sdk-providers/anthropic)         | `claude-opus-4-5`                                   | ✓           | ✓                 | ✓          | ✓              |
| [Anthropic](/providers/ai-sdk-providers/anthropic)         | `claude-sonnet-4-5`                                 | ✓           | ✓                 | ✓          | ✓              |
| [Anthropic](/providers/ai-sdk-providers/anthropic)         | `claude-haiku-4-5`                                  | ✓           | ✓                 | ✓          | ✓              |
| [Anthropic](/providers/ai-sdk-providers/anthropic)         | `claude-opus-4-1`                                   | ✓           | ✓                 | ✓          | ✓              |
| [Anthropic](/providers/ai-sdk-providers/anthropic)         | `claude-sonnet-4-0`                                 | ✓           | ✓                 | ✓          | ✓              |
| [Google](/providers/ai-sdk-providers/google)               | `gemini-3.8-flash`                                  | ✓           | ✓                 | ✓          | ✓              |
| [Google](/providers/ai-sdk-providers/google)               | `gemini-3.1-pro-preview`                            | ✓           | ✓                 | ✓          | ✓              |
| [Google](/providers/ai-sdk-providers/google)               | `gemini-3-pro-preview`                              | ✓           | ✓                 | ✓          | ✓              |
| [Google](/providers/ai-sdk-providers/google)               | `gemini-2.5-pro`                                    | ✓           | ✓                 | ✓          | ✓              |
| [Google](/providers/ai-sdk-providers/google)               | `gemini-2.5-flash`                                  | ✓           | ✓                 | ✓          | ✓              |
| [Google Vertex](/providers/ai-sdk-providers/google-vertex) | `gemini-3.8-flash`                                  | ✓           | ✓                 | ✓          | ✓              |
| [Google Vertex](/providers/ai-sdk-providers/google-vertex) | `gemini-3.1-pro-preview`                            | ✓           | ✓                 | ✓          | ✓              |
| [Google Vertex](/providers/ai-sdk-providers/google-vertex) | `gemini-3-pro-preview`                              | ✓           | ✓                 | ✓          | ✓              |
| [Google Vertex](/providers/ai-sdk-providers/google-vertex) | `gemini-2.5-pro`                                    | ✓           | ✓                 | ✓          | ✓              |
| [Google Vertex](/providers/ai-sdk-providers/google-vertex) | `gemini-2.5-flash`                                  | ✓           | ✓                 | ✓          | ✓              |
| [Mistral](/providers/ai-sdk-providers/mistral)             | `pixtral-large-latest`                              | ✓           | ✓                 | ✓          | ✓              |
| [Mistral](/providers/ai-sdk-providers/mistral)             | `mistral-large-latest`                              | ✗           | ✓                 | ✓          | ✓              |
| [Mistral](/providers/ai-sdk-providers/mistral)             | `magistral-medium-2506`                             | ✗           | ✓                 | ✓          | ✓              |
| [Mistral](/providers/ai-sdk-providers/mistral)             | `magistral-small-2506`                              | ✗           | ✓                 | ✓          | ✓              |
| [Mistral](/providers/ai-sdk-providers/mistral)             | `mistral-small-latest`                              | ✗           | ✓                 | ✓          | ✓              |
| [Mistral](/providers/ai-sdk-providers/mistral)             | `ministral-8b-latest`                               | ✗           | ✓                 | ✓          | ✓              |
| [Cohere](/providers/ai-sdk-providers/cohere)               | `command-a-03-2025`                                 | ✗           | ✓                 | ✓          | ✓              |
| [Cohere](/providers/ai-sdk-providers/cohere)               | `command-a-reasoning-08-2025`                       | ✗           | ✓                 | ✓          | ✓              |
| [Cohere](/providers/ai-sdk-providers/cohere)               | `command-r-plus`                                    | ✗           | ✓                 | ✓          | ✓              |
| [Cohere](/providers/ai-sdk-providers/cohere)               | `command-r`                                         | ✗           | ✓                 | ✓          | ✓              |
| [DeepSeek](/providers/ai-sdk-providers/deepseek)           | `deepseek-v4-flash-vision-exp`                      | ✓           | ✓                 | ✓          | ✓              |
| [DeepSeek](/providers/ai-sdk-providers/deepseek)           | `deepseek-v4-flash`                                 | ✗           | ✓                 | ✓          | ✓              |
| [DeepSeek](/providers/ai-sdk-providers/deepseek)           | `deepseek-v4-pro`                                   | ✗           | ✓                 | ✓          | ✓              |
| [Moonshot AI](/providers/ai-sdk-providers/moonshotai)      | `kimi-k3`                                           | ✓           | ✓                 | ✓          | ✓              |
| [Moonshot AI](/providers/ai-sdk-providers/moonshotai)      | `kimi-k2.7-code`                                    | ✓           | ✓                 | ✓          | ✓              |
| [Moonshot AI](/providers/ai-sdk-providers/moonshotai)      | `kimi-k2.6`                                         | ✓           | ✓                 | ✓          | ✓              |
| [Groq](/providers/ai-sdk-providers/groq)                   | `meta-llama/llama-4-scout-17b-16e-instruct`         | ✓           | ✓                 | ✓          | ✓              |
| [Groq](/providers/ai-sdk-providers/groq)                   | `llama-3.3-70b-versatile`                           | ✗           | ✓                 | ✓          | ✓              |
| [Groq](/providers/ai-sdk-providers/groq)                   | `deepseek-r1-distill-llama-70b`                     | ✗           | ✓                 | ✓          | ✓              |
| [Groq](/providers/ai-sdk-providers/groq)                   | `qwen-qwq-32b`                                      | ✗           | ✓                 | ✓          | ✓              |
| [Groq](/providers/ai-sdk-providers/groq)                   | `openai/gpt-oss-120b`                               | ✗           | ✓                 | ✓          | ✓              |
| [Together AI](/providers/ai-sdk-providers/togetherai)      | `meta-llama/Meta-Llama-3.3-70B-Instruct-Turbo`      | ✗           | ✗                 | ✗          | ✗              |
| [Together AI](/providers/ai-sdk-providers/togetherai)      | `Qwen/Qwen2.5-72B-Instruct-Turbo`                   | ✗           | ✗                 | ✗          | ✗              |
| [Together AI](/providers/ai-sdk-providers/togetherai)      | `deepseek-ai/DeepSeek-V3`                           | ✗           | ✗                 | ✗          | ✗              |
| [Together AI](/providers/ai-sdk-providers/togetherai)      | `mistralai/Mixtral-8x22B-Instruct-v0.1`             | ✗           | ✓                 | ✓          | ✓              |
| [Fireworks](/providers/ai-sdk-providers/fireworks)         | `accounts/fireworks/models/deepseek-r1`             | ✗           | ✗                 | ✗          | ✗              |
| [Fireworks](/providers/ai-sdk-providers/fireworks)         | `accounts/fireworks/models/deepseek-v3`             | ✗           | ✓                 | ✓          | ✗              |
| [Fireworks](/providers/ai-sdk-providers/fireworks)         | `accounts/fireworks/models/llama-v3p3-70b-instruct` | ✗           | ✓                 | ✓          | ✗              |
| [Fireworks](/providers/ai-sdk-providers/fireworks)         | `accounts/fireworks/models/qwen2-vl-72b-instruct`   | ✓           | ✓                 | ✗          | ✗              |
| [Alibaba](/providers/ai-sdk-providers/alibaba)             | `qwen3-max`                                         | ✗           | ✓                 | ✓          | ✓              |
| [Alibaba](/providers/ai-sdk-providers/alibaba)             | `qwen-plus`                                         | ✗           | ✓                 | ✓          | ✓              |
| [DeepInfra](/providers/ai-sdk-providers/deepinfra)         | `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8` | ✓           | ✗                 | ✗          | ✗              |
| [DeepInfra](/providers/ai-sdk-providers/deepinfra)         | `meta-llama/Llama-4-Scout-17B-16E-Instruct`         | ✓           | ✗                 | ✗          | ✗              |
| [DeepInfra](/providers/ai-sdk-providers/deepinfra)         | `meta-llama/Llama-3.3-70B-Instruct`                 | ✗           | ✓                 | ✓          | ✓              |
| [DeepInfra](/providers/ai-sdk-providers/deepinfra)         | `deepseek-ai/DeepSeek-V3`                           | ✗           | ✗                 | ✗          | ✗              |
| [DeepInfra](/providers/ai-sdk-providers/deepinfra)         | `deepseek-ai/DeepSeek-R1`                           | ✗           | ✗                 | ✗          | ✗              |
| [DeepInfra](/providers/ai-sdk-providers/deepinfra)         | `Qwen/QwQ-32B`                                      | ✗           | ✓                 | ✓          | ✗              |
| [Cerebras](/providers/ai-sdk-providers/cerebras)           | `gpt-oss-120b`                                      | ✗           | ✓                 | ✓          | ✓              |
| [Cerebras](/providers/ai-sdk-providers/cerebras)           | `gemma-4-31b`                                       | ✓           | ✓                 | ✓          | ✓              |
| [Hugging Face](/providers/ai-sdk-providers/huggingface)    | `meta-llama/Llama-3.1-8B-Instruct`                  | ✗           | ✓                 | ✓          | ✓              |
| [Hugging Face](/providers/ai-sdk-providers/huggingface)    | `moonshotai/Kimi-K2-Instruct`                       | ✗           | ✓                 | ✓          | ✓              |
| [Baseten](/providers/ai-sdk-providers/baseten)             | `Qwen/Qwen3-235B-A22B-Instruct-2507`                | ✗           | ✓                 | ✓          | ✓              |
| [Baseten](/providers/ai-sdk-providers/baseten)             | `deepseek-ai/DeepSeek-V3.1`                         | ✗           | ✓                 | ✓          | ✓              |
| [Baseten](/providers/ai-sdk-providers/baseten)             | `moonshotai/Kimi-K2-Instruct-0905`                  | ✗           | ✓                 | ✓          | ✓              |

This table is not exhaustive. Additional models can be found in the provider
documentation pages and on the provider websites.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)