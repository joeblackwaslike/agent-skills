---
title: AI Gateway Evaluation Quickstart
product: vercel
url: /docs/ai-gateway/getting-started/evaluation
canonical_url: "https://vercel.com/docs/ai-gateway/getting-started/evaluation"
last_updated: 2026-09-22
type: tutorial
prerequisites:
  - /docs/ai-gateway/getting-started
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/modalities/evaluation
  - /docs/ai-gateway/sdks-and-apis/typesafe
summary: Evaluate application state and return a typed boolean answer using AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/getting-started/evaluation.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "5a27c83c8b1ef75eafcf366ed40bcfdd080b0ec6dca891e63d495c98cb3d001f"
---

# AI Gateway Evaluation Quickstart

Evaluate application state through AI Gateway and return a typed boolean answer. This quickstart uses the experimental Evaluation API in AI SDK 7 or later.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [An Introduction to Evals](https://vercel.com/kb/guide/an-introduction-to-evals?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fevaluation&source_site=vercel-docs&relationship=related) — Evaluations test model and agent outputs to ensure they meet the standards and requirements you specify.
- [Evaluation](https://ai-sdk.dev/docs/ai-sdk-core/evaluation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fevaluation&source_site=vercel-docs&relationship=related) — Evaluate Choice, Score, and Boolean questions against shared state.
- [Automatic Model Selection](https://eve.dev/docs/guides/evaluate?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fevaluation&source_site=vercel-docs&relationship=related) — Choose agent models automatically or evaluate typed questions in your tools and application code.
- [Using TanStack AI with Vercel AI Gateway](https://vercel.com/kb/guide/tanstack-ai-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fevaluation&source_site=vercel-docs&relationship=related) — Connect TanStack AI to Vercel AI Gateway with the @tanstack/ai-vercel-gateway adapter to stream chat, route across provi
- [TypeSafe AI's Jev now available on AI Gateway](https://vercel.com/changelog/typesafe-ai-jev-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fevaluation&source_site=vercel-docs&relationship=related)
- [AI Gateway now supports TypeSafe clients and an HTTP API for Jev](https://vercel.com/changelog/ai-gateway-now-supports-typesafe-clients-and-http-api-for-jev?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fevaluation&source_site=vercel-docs&relationship=related)
- [Building AI apps on Vercel: an overview](https://vercel.com/kb/guide/how-to-build-ai-app?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fevaluation&source_site=vercel-docs&relationship=related) — Learn the key AI concepts and tools for building and scaling AI apps.
- [AI Gateway](https://vercel.com/docs/agent-resources/vercel-mcp/tools/ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fevaluation&source_site=vercel-docs&relationship=related) — Vercel MCP tools for ai gateway.
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fevaluation&source_site=vercel-docs&relationship=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.
- [AI SDK for Python with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fevaluation&source_site=vercel-docs&relationship=related) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.

Full cross-link map for this page: [/docs/ai-gateway/getting-started/evaluation.graph.md](/docs/ai-gateway/getting-started/evaluation.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fevaluation&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Run your first evaluation

### Use a coding agent

Paste this prompt into a coding agent with terminal access:

**Agent prompt**

```text
Add an evaluation request through AI Gateway in the current environment. Use the AI Gateway skill for this task. If it is unavailable, run npx skills add vercel/vercel-plugin --skill ai-gateway, then find and read its SKILL.md before continuing. Reuse the environment's Node.js project, framework, and package manager when possible. Otherwise, add the smallest TypeScript entry point and explain why. Use AI SDK 7 or later for this quickstart, and add only required dependencies. Read AI_GATEWAY_API_KEY from the environment. If it is missing, run npx vercel@latest whoami and pause for login if needed. Determine the team, then run npx vercel@latest --scope <team-slug> ai-gateway api-keys create --name <descriptive-name>. Capture stdout directly into AI_GATEWAY_API_KEY for the request or existing ignored secret storage, and never expose the value. Use typesafe-ai/jev to evaluate whether a support agent issued a refund, print the structured boolean answer, run the result, and report the output.
```

### Run the Node.js example

Use [Node.js 22.18 or later](https://nodejs.org/) and a team with available [AI Gateway Credits](/docs/ai-gateway/pricing). Export `AI_GATEWAY_API_KEY` in your current shell. If you need a key, open the [Create API Key dialog](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys%3FshowCreateKeyModal%3Dtrue\&title=AI+Gateway+API+Keys).

```bash filename="Terminal"
export AI_GATEWAY_API_KEY="your_ai_gateway_api_key"
```

Install the latest AI SDK:

```bash filename="Terminal"
pnpm add ai@latest
```

Create `index.mts`:

```typescript filename="index.mts"
import { experimental_evaluate as evaluate } from 'ai';

const result = await evaluate({
  model: 'typesafe-ai/jev',
  state: 'The support agent issued a full refund to the customer.',
  questions: {
    refunded: {
      type: 'boolean',
      instructions: 'Was a refund issued?',
    },
  },
});

console.log(JSON.stringify(result.answers, null, 2));
```

Run the script:

```bash filename="Terminal"
node index.mts
```

This quickstart logs only `result.answers`. The probability can vary, but you should see output with this shape:

```json
{
  "refunded": {
    "type": "boolean",
    "probability": 0.99
  }
}
```

## Next steps

- Call evaluation through the [HTTP API](/docs/ai-gateway/modalities/evaluation#http-api)
- Migrate an existing client to the [TypeSafe-compatible API](/docs/ai-gateway/sdks-and-apis/typesafe)
- Add [choice and score questions](/docs/ai-gateway/modalities/evaluation#question-types)
- Evaluate [multiple questions](/docs/ai-gateway/modalities/evaluation#multiple-questions-in-one-request) or [structured state](/docs/ai-gateway/modalities/evaluation#structured-state)
- Learn how to [classify, route, and score with Jev and AI SDK](/kb/guide/typesafe-jev-and-ai-sdk) and [route form submissions](/kb/guide/jev-ai-sdk-form-router)
- Learn how to [automatically approve tool calls in eve with Jev](/kb/guide/auto-approve-tool-calls-eve-jev)
- Build a [product review moderation workflow with Jev and TanStack AI](/kb/guide/moderate-product-reviews-jev-tanstack-ai)
- Browse [evaluation models](/ai-gateway/models?capabilities=evaluation)


---

[View full sitemap](/docs/sitemap)
