---
title: AI Gateway Decision Quickstart
product: vercel
url: /docs/ai-gateway/getting-started/decision
canonical_url: "https://vercel.com/docs/ai-gateway/getting-started/decision"
last_updated: 2026-10-07
type: tutorial
prerequisites:
  - /docs/ai-gateway/getting-started
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/sdks-and-apis/openai-decisions
  - /docs/ai-gateway/sdks-and-apis/typesafe
  - /docs/ai-gateway/modalities/decision
summary: Answer a typed boolean question about application state using AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/getting-started/decision.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "02e029ed7a85a0ea724aeab9c734f810492880c7b87445ac1793f3f16613e63f"
---

# AI Gateway Decision Quickstart

Ask a typed question about application state through AI Gateway and get a boolean answer back. This quickstart uses the experimental Decision API, available as `experimental_decide` in `ai` 7.0.128 or later. Earlier AI SDK 7 releases call it `experimental_evaluate`, which still works as a deprecated alias.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenAI Decisions API now available on AI Gateway](https://vercel.com/changelog/openai-decisions-api-now-available-on-ai-gateway)
- [Microsoft Decision-1 now available on AI Gateway](https://vercel.com/changelog/microsoft-decision-1-now-available-on-ai-gateway)
- [Decisions](https://ai-sdk.dev/docs/ai-sdk-core/decisions) — Decide answers to Choice, Score, and Boolean questions against shared state.
- [TypeSafe AI's Jev 1.14 is now available on AI Gateway](https://vercel.com/changelog/typesafe-ais-jev-1-14-is-now-available-on-ai-gateway)
- [Liquid AI's d1 is available on AI Gateway](https://vercel.com/changelog/liquid-ai-d1-is-available-on-ai-gateway)
- [TypeSafe AI's Jev now available on AI Gateway](https://vercel.com/changelog/typesafe-ai-jev-now-available-on-ai-gateway)
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 400+ models.
- [AI SDK for Python with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 400+ models.

Full cross-link map for this page: [/docs/ai-gateway/getting-started/decision.graph.md](/docs/ai-gateway/getting-started/decision.graph.md)
<!-- /docsgraph:related -->

## Make your first decision

### Use a coding agent

Paste this prompt into a coding agent with terminal access:

**Agent prompt**

```text
Add a decision request through AI Gateway in the current environment. Use the AI Gateway skill for this task. If it is unavailable, run npx skills add vercel/vercel-plugin --skill ai-gateway, then find and read its SKILL.md before continuing. Reuse the environment's Node.js project, framework, and package manager when possible. Otherwise, add the smallest TypeScript entry point and explain why. Use ai 7.0.128 or later for this quickstart, upgrading an existing ai dependency if it is older, and add only required dependencies. Read AI_GATEWAY_API_KEY from the environment. If it is missing, run npx vercel@latest whoami and pause for login if needed. Determine the team, then run npx vercel@latest --scope <team-slug> ai-gateway api-keys create --name <descriptive-name>. Capture stdout directly into AI_GATEWAY_API_KEY for the request or existing ignored secret storage, and never expose the value. Use typesafe-ai/jev with experimental_decide from the ai package to decide whether a support agent issued a refund, print the structured boolean answer, run the result, and report the output.
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
import { experimental_decide as decide } from 'ai';

const result = await decide({
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

- Make decisions over HTTP or with the OpenAI SDK through the [OpenAI-Compatible Decisions API](/docs/ai-gateway/sdks-and-apis/openai-decisions)
- Migrate an existing client to the [TypeSafe-compatible API](/docs/ai-gateway/sdks-and-apis/typesafe)
- Add [choice and score questions](/docs/ai-gateway/modalities/decision#question-types)
- Ask [multiple questions](/docs/ai-gateway/modalities/decision#multiple-questions-in-one-request) or pass [structured state](/docs/ai-gateway/modalities/decision#structured-state)
- Learn how to [classify, route, and score with Jev and AI SDK](/kb/guide/typesafe-jev-and-ai-sdk) and [route form submissions](/kb/guide/jev-ai-sdk-form-router)
- Learn how to [automatically approve tool calls in eve with Jev](/kb/guide/auto-approve-tool-calls-eve-jev)
- Build a [product review moderation workflow with Jev and TanStack AI](/kb/guide/moderate-product-reviews-jev-tanstack-ai)
- Browse [decision models](/ai-gateway/models?capabilities=decision)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
