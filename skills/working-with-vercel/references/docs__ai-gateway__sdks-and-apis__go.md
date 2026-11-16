---
title: "Go with AI Gateway: OpenAI and Anthropic SDKs"
product: vercel
url: /docs/ai-gateway/sdks-and-apis/go
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/go"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/authentication-and-byok/api-keys
  - /docs/ai-gateway/models-and-providers/model-fallbacks
  - /docs/ai-gateway/observability-and-spend/custom-reporting
  - /docs/ai-gateway/models-and-providers/automatic-caching
  - /docs/ai-gateway/models-and-providers/provider-filtering-and-ordering
summary: Use AI Gateway from any Go application with the OpenAI or Anthropic Go SDKs, including model fallbacks, cost tracking, and prompt caching.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/go.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "d2022bf20a2ba10cfde12db8f63fb27f5a91d3ef3ca4908d344ef0ce2ff87458"
---

# Go with AI Gateway: OpenAI and Anthropic SDKs

Call AI Gateway from Go with the official [OpenAI](https://github.com/openai/openai-go) or [Anthropic](https://github.com/anthropics/anthropic-sdk-go) Go SDK. Set the AI Gateway base URL and an [AI Gateway API key](/docs/ai-gateway/authentication-and-byok/api-keys#create-a-key), then choose a model.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 400+ models.
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [AI Gateway OIDC Authentication](https://vercel.com/docs/ai-gateway/authentication-and-byok/oidc) — Authenticate AI Gateway requests from Vercel deployments with OIDC tokens. Configure the AI SDK or send bearer tokens di
- [AI Gateway Authentication and BYOK](https://vercel.com/docs/ai-gateway/authentication-and-byok) — Authenticate AI Gateway requests with API keys or OIDC tokens, and configure bring your own key \\(BYOK\\) credentials for
- [AI Gateway Ecosystem and Integrations](https://vercel.com/docs/ai-gateway/ecosystem) — Connect frameworks, coding tools, and billing integrations to AI Gateway. Configure app attribution and explore integrat

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/go.graph.md](/docs/ai-gateway/sdks-and-apis/go.graph.md)
<!-- /docsgraph:related -->

Your Go application can run on any host or cloud and doesn't need to deploy to Vercel.

## Quick start

Install the SDK for the API you want to call, then set `AI_GATEWAY_API_KEY` in your environment:

#### Chat Completions

```bash filename="Terminal"
go get github.com/openai/openai-go/v3
```

```go filename="main.go"
package main

import (
	"context"
	"fmt"
	"os"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/option"
)

func main() {
	client := openai.NewClient(
		option.WithAPIKey(os.Getenv("AI_GATEWAY_API_KEY")),
		option.WithBaseURL("https://ai-gateway.vercel.sh/v1"),
	)

	completion, err := client.Chat.Completions.New(context.Background(), openai.ChatCompletionNewParams{
		Model: "anthropic/claude-sonnet-5",
		Messages: []openai.ChatCompletionMessageParamUnion{
			openai.UserMessage("Describe a red bicycle in one sentence."),
		},
	})
	if err != nil {
		panic(err)
	}

	fmt.Println(completion.Choices[0].Message.Content)
}
```

#### Anthropic Messages

```bash filename="Terminal"
go get github.com/anthropics/anthropic-sdk-go
```

```go filename="main.go"
package main

import (
	"context"
	"fmt"
	"os"

	"github.com/anthropics/anthropic-sdk-go"
	"github.com/anthropics/anthropic-sdk-go/option"
)

func main() {
	client := anthropic.NewClient(
		option.WithAPIKey(os.Getenv("AI_GATEWAY_API_KEY")),
		option.WithBaseURL("https://ai-gateway.vercel.sh"),
	)

	message, err := client.Messages.New(context.Background(), anthropic.MessageNewParams{
		Model:     "anthropic/claude-sonnet-5",
		MaxTokens: 256,
		Messages: []anthropic.MessageParam{
			anthropic.NewUserMessage(anthropic.NewTextBlock("Describe a red bicycle in one sentence.")),
		},
	})
	if err != nil {
		panic(err)
	}

	for _, block := range message.Content {
		if block.Type == "text" {
			fmt.Println(block.Text)
		}
	}
}
```

## Use fallbacks, cost tracking, and caching from Go

Pass AI Gateway options as a request option with `option.WithJSONSet`. This Chat Completions request tries a [fallback model](/docs/ai-gateway/models-and-providers/model-fallbacks) if the primary model fails, attributes the request to a user and a tag for [Custom Reporting](/docs/ai-gateway/observability-and-spend/custom-reporting), and turns on [automatic prompt caching](/docs/ai-gateway/models-and-providers/automatic-caching):

```go filename="main.go"
package main

import (
	"context"
	"fmt"
	"os"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/option"
)

func main() {
	client := openai.NewClient(
		option.WithAPIKey(os.Getenv("AI_GATEWAY_API_KEY")),
		option.WithBaseURL("https://ai-gateway.vercel.sh/v1"),
	)

	completion, err := client.Chat.Completions.New(
		context.Background(),
		openai.ChatCompletionNewParams{
			Model: "anthropic/claude-sonnet-5",
			Messages: []openai.ChatCompletionMessageParamUnion{
				openai.UserMessage("Explain model fallbacks in one sentence."),
			},
		},
		option.WithJSONSet("providerOptions.gateway", map[string]any{
			"models":  []string{"openai/gpt-6-astra"},
			"user":    "user-123",
			"tags":    []string{"feature:summaries"},
			"caching": "auto",
		}),
	)
	if err != nil {
		panic(err)
	}

	fmt.Println(completion.Choices[0].Message.Content)
}
```

Each `user` value and tag counts as a Custom Reporting write. See [Custom Reporting pricing](/docs/ai-gateway/observability-and-spend/custom-reporting#pricing).

The same `gateway` object accepts [provider ordering and filtering](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering), [`zeroDataRetention`](/docs/ai-gateway/security-and-compliance/zdr), and the other [provider options](/docs/ai-gateway/models-and-providers/provider-options). To cap spend, set a [budget](/docs/ai-gateway/observability-and-spend/budgets) on the API key. To use your own provider accounts, configure [BYOK](/docs/ai-gateway/authentication-and-byok/byok).

## API reference

- **[OpenAI Chat Completions API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions)**: Chat completions, embeddings, streaming, tool calls, structured outputs, image inputs, and provider routing
- **[OpenAI Responses API](/docs/ai-gateway/sdks-and-apis/responses)**: Streaming, tool calling, structured output, and reasoning
- **[Anthropic Messages API](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api)**: Streaming, tool calls, extended thinking, web search, and file attachments

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
