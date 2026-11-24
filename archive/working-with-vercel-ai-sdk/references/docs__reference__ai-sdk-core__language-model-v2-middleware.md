---
title: LanguageModelV4Middleware
description: Middleware for enhancing language model behavior (API Reference)
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/language-model-v2-middleware"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/language-model-v2-middleware.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "e57a97aaf46d8cd4c649b4049901ef58152989ef5dd62c1da812a1985de50b97"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Language model middleware is an experimental feature.

Language model middleware provides a way to enhance the behavior of language models
by intercepting and modifying the calls to the language model. It can be used to add
features like guardrails, RAG, caching, and logging in a language model agnostic way.

See [Language Model Middleware](/docs/ai-sdk-core/middleware) for more information.

## Import

```
import { LanguageModelV4Middleware } from "ai"
```

## API Signature

- `specificationVersion` (`'v4'`): The specification version of the middleware. Must be "v4".
- `transformParams?` (`({ type: "generate" | "stream", params: LanguageModelV4CallOptions, model: LanguageModelV4 }) => PromiseLike<LanguageModelV4CallOptions>`): Transforms the parameters before they are passed to the language model.
- `wrapGenerate?` (`({ doGenerate: () => PromiseLike<LanguageModelV4GenerateResult>, doStream: () => PromiseLike<LanguageModelV4StreamResult>, params: LanguageModelV4CallOptions, model: LanguageModelV4 }) => PromiseLike<LanguageModelV4GenerateResult>`): Wraps the generate operation of the language model. Receives both doGenerate and doStream functions.
- `wrapStream?` (`({ doGenerate: () => PromiseLike<LanguageModelV4GenerateResult>, doStream: () => PromiseLike<LanguageModelV4StreamResult>, params: LanguageModelV4CallOptions, model: LanguageModelV4 }) => PromiseLike<LanguageModelV4StreamResult>`): Wraps the stream operation of the language model. Receives both doGenerate and doStream functions.
- `overrideProvider?` (`(options: { model: LanguageModelV4 }) => string`): Override the provider ID of the model.
- `overrideModelId?` (`(options: { model: LanguageModelV4 }) => string`): Override the model ID of the model.
- `overrideSupportedUrls?` (`(options: { model: LanguageModelV4 }) => PromiseLike<Record<string, RegExp[]>> | Record<string, RegExp[]>`): Override the supported URLs for the model.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)