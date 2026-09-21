---
title: AI Gateway Evaluation Quickstart
product: vercel
url: /docs/ai-gateway/getting-started/evaluation
canonical_url: "https://vercel.com/docs/ai-gateway/getting-started/evaluation"
last_updated: 2018-10-20
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
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "67cce8e287839badfea2a2a00003acac729d7dee21d0ececb9089b758820b078"
---

# AI Gateway Evaluation Quickstart

Evaluate application state through AI Gateway and return a typed boolean answer. This quickstart uses the experimental Evaluation API in AI SDK 7 or later.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [An Introduction to Evals](https://vercel.com/kb/guide/an-introduction-to-evals?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fevaluation&source_site=vercel-docs&relationship=related) — Evaluations test model and agent outputs to ensure they meet the standards and requirements you specify.
- [Automatic Model Selection](https://eve.dev/docs/guides/evaluate?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fevaluation&source_site=vercel-docs&relationship=related) — Choose agent models automatically or evaluate typed questions in your tools and application code.
- [Evaluation](https://ai-sdk.dev/docs/ai-sdk-core/evaluation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fevaluation&source_site=vercel-docs&relationship=related)
- [TypeSafe AI's Jev now available on AI Gateway](https://vercel.com/changelog/typesafe-ai-jev-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fevaluation&source_site=vercel-docs&relationship=related)
- [How to automatically approve tool calls in eve with Jev](https://vercel.com/kb/guide/auto-approve-tool-calls-eve-jev?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fevaluation&source_site=vercel-docs&relationship=related) — Use Jev to review tool calls in eve, allow routine actions, and request human approval when needed. Configure the policy
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fevaluation&source_site=vercel-docs&relationship=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.
- [AI SDK for Python with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fevaluation&source_site=vercel-docs&relationship=related) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.
- [AI Gateway SDKs and APIs](https://vercel.com/docs/ai-gateway/sdks-and-apis?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fevaluation&source_site=vercel-docs&relationship=related) — Connect to AI Gateway with the AI SDK, Python, REST, or compatible OpenAI, Anthropic Messages, OpenResponses, and Cohere

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
- Browse [evaluation models](/ai-gateway/models?capabilities=evaluation)


---

[View full sitemap](/docs/sitemap)
