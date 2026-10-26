---
title: AI SDK Core
description: Reference documentation for the AI SDK Core
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core.md"
fetched_at: "2026-10-26T09:52:56.075Z"
sha256: "ea4ef94879f1ed73a495ee5915aea8a964e86342ac3a51c677224c0cdfa25bb4"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

[AI SDK Core](/docs/ai-sdk-core) is a set of functions that allow you to interact with language models and other AI models.
These functions are designed to be easy-to-use and flexible, allowing you to generate text, structured data,
and embeddings from language models and other AI models.

AI SDK Core contains the following main functions:

#### [generateText()](/docs/reference/ai-sdk-core/generate-text)

Generate text and call tools from a language model.

#### [streamText()](/docs/reference/ai-sdk-core/stream-text)

Stream text and call tools from a language model.

#### [Output](/docs/reference/ai-sdk-core/output)

Structured output types for generateText and streamText.

#### [embed()](/docs/reference/ai-sdk-core/embed)

Generate an embedding for a single value using an embedding model.

#### [embedMany()](/docs/reference/ai-sdk-core/embed-many)

Generate embeddings for several values using an embedding model (batch embedding).

#### [generateImage()](/docs/reference/ai-sdk-core/generate-image)

Generate images based on a given prompt using an image model.

#### [experimental\_generateVideo()](/docs/reference/ai-sdk-core/generate-video)

Generate videos based on a given prompt using a video model.

#### [experimental\_startBatch()](/docs/reference/ai-sdk-core/start-batch)

Start an asynchronous text-generation batch.

#### [experimental\_getBatchStatus()](/docs/reference/ai-sdk-core/get-batch-status)

Retrieve the status of an asynchronous batch.

#### [experimental\_getBatchResults()](/docs/reference/ai-sdk-core/get-batch-results)

Retrieve terminal results from an asynchronous batch.

#### [experimental\_cancelBatch()](/docs/reference/ai-sdk-core/cancel-batch)

Request cancellation of an asynchronous batch.

#### [experimental\_listBatches()](/docs/reference/ai-sdk-core/list-batches)

List asynchronous batches and their latest statuses.

#### [transcribe()](/docs/reference/ai-sdk-core/transcribe)

Generate a transcript from an audio file.

#### [experimental\_streamTranscribe()](/docs/reference/ai-sdk-core/stream-transcribe)

Stream a transcript from live raw audio.

#### [experimental\_streamTranslate()](/docs/reference/ai-sdk-core/stream-translate)

Stream a speech-to-speech translation from live raw audio.

#### [generateSpeech()](/docs/reference/ai-sdk-core/generate-speech)

Generate speech audio from text.

#### [experimental\_streamSpeech()](/docs/reference/ai-sdk-core/stream-speech)

Stream speech audio from text or a text stream.

#### [uploadFile()](/docs/reference/ai-sdk-core/upload-file)

Upload a file to a provider and get a provider reference.

#### [uploadSkill()](/docs/reference/ai-sdk-core/upload-skill)

Upload a skill to a provider and get a provider reference.

It also contains the following helper functions:

#### [toolSearch()](/docs/reference/ai-sdk-core/tool-search)

Search deferred tools and load their definitions on demand.

#### [tool()](/docs/reference/ai-sdk-core/tool)

Type inference helper function for tools.

#### [experimental\_getRealtimeToolDefinitions()](/docs/reference/ai-sdk-core/get-realtime-tool-definitions)

Convert AI SDK tools into realtime tool definitions.

#### [Experimental\_SandboxSession](/docs/reference/ai-sdk-core/sandbox)

Experimental execution environment interface passed to tool execution.

#### [experimental\_filterActiveTools()](/docs/reference/ai-sdk-core/filter-active-tools)

Filters a tool set to only the currently active tools.

#### [createMCPClient()](/docs/reference/ai-sdk-core/create-mcp-client)

Creates a client for connecting to MCP servers.

#### [MCP Events](/docs/reference/ai-sdk-core/mcp-events)

Experimental event methods, webhook delivery, and subscription types.

#### [MCP Apps](/docs/reference/ai-sdk-core/mcp-apps)

Helpers for rendering interactive MCP tool UIs and filtering app-visible tools.

#### [jsonSchema()](/docs/reference/ai-sdk-core/json-schema)

Creates AI SDK compatible JSON schema objects.

#### [zodSchema()](/docs/reference/ai-sdk-core/zod-schema)

Creates AI SDK compatible Zod schema objects.

#### [createProviderRegistry()](/docs/reference/ai-sdk-core/provider-registry)

Creates a registry for using models from multiple providers.

#### [cosineSimilarity()](/docs/reference/ai-sdk-core/cosine-similarity)

Calculates the cosine similarity between two vectors, e.g. embeddings.

#### [simulateReadableStream()](/docs/reference/ai-sdk-core/simulate-readable-stream)

Creates a ReadableStream that emits values with configurable delays.

#### [wrapLanguageModel()](/docs/reference/ai-sdk-core/wrap-language-model)

Wraps a language model with middleware.

#### [wrapImageModel()](/docs/reference/ai-sdk-core/wrap-image-model)

Wraps an image model with middleware.

#### [extractReasoningMiddleware()](/docs/reference/ai-sdk-core/extract-reasoning-middleware)

Extracts reasoning from the generated text and exposes it as a \`reasoning\` property on the result.

#### [extractJsonMiddleware()](/docs/reference/ai-sdk-core/extract-json-middleware)

Extracts JSON from text content by stripping markdown code fences.

#### [isStepCount()](/docs/reference/ai-sdk-core/is-step-count)

Creates a stop condition that triggers after a specified number of steps.

#### [hasToolCall()](/docs/reference/ai-sdk-core/has-tool-call)

Creates a stop condition that triggers when any specified tool is called.

#### [isLoopFinished()](/docs/reference/ai-sdk-core/loop-finished)

Creates a stop condition that lets the agent loop run until it naturally finishes.

#### [simulateStreamingMiddleware()](/docs/reference/ai-sdk-core/simulate-streaming-middleware)

Simulates streaming behavior with responses from non-streaming language models.

#### [defaultSettingsMiddleware()](/docs/reference/ai-sdk-core/default-settings-middleware)

Applies default settings to a language model.

#### [defaultInstructionsMiddleware()](/docs/reference/ai-sdk-core/default-instructions-middleware)

Applies default instructions to a language model.

#### [smoothStream()](/docs/reference/ai-sdk-core/smooth-stream)

Smooths text and reasoning streaming output.

#### [generateId()](/docs/reference/ai-sdk-core/generate-id)

Helper function for generating unique IDs

#### [createIdGenerator()](/docs/reference/ai-sdk-core/create-id-generator)

Creates an ID generator

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)