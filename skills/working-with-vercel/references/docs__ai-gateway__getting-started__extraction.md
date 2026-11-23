---
title: AI Gateway Extraction Quickstart
product: vercel
url: /docs/ai-gateway/getting-started/extraction
canonical_url: "https://vercel.com/docs/ai-gateway/getting-started/extraction"
last_updated: 2026-11-18
type: tutorial
prerequisites:
  - /docs/ai-gateway/getting-started
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/modalities/extraction
summary: Extract a typed field value from text using AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/getting-started/extraction.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "42d370569084c3875c6b51499f5d4a8dd9508a70cea186330d79b6d50fc5db67"
---

# AI Gateway Extraction Quickstart

Extract a typed value from text through AI Gateway and get a structured answer back. This quickstart uses the experimental Extraction API, available as `experimental_extract` in `ai` 7.0.176 or later.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Extractions](https://ai-sdk.dev/docs/ai-sdk-core/extractions) — Extract typed field values from shared state.
- [AI Gateway Speech Quickstart: Transcription and TTS](https://vercel.com/docs/ai-gateway/getting-started/speech) — Generate speech and transcribe it using AI Gateway.
- [AI Gateway Text Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/text) — Generate and stream text responses using AI Gateway.
- [AI Gateway Decision Quickstart](https://vercel.com/docs/ai-gateway/getting-started/decision) — Answer a typed boolean question about application state using AI Gateway.
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 400+ models.
- [AI Gateway Image Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/image) — Generate an image from a text prompt using AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/getting-started/extraction.graph.md](/docs/ai-gateway/getting-started/extraction.graph.md)
<!-- /docsgraph:related -->

## Make your first extraction

### Use a coding agent

Paste this prompt into a coding agent with terminal access:

**Agent prompt**

```text
Add an extraction request through AI Gateway in the current environment. Use the AI Gateway skill for this task. If it is unavailable, run npx skills add vercel/vercel-plugin --skill ai-gateway, then find and read its SKILL.md before continuing. Reuse the environment's Node.js project, framework, and package manager when possible. Otherwise, add the smallest TypeScript entry point and explain why. Use ai 7.0.176 or later for this quickstart, upgrading an existing ai dependency if it is older, and add only required dependencies. Read AI_GATEWAY_API_KEY from the environment. If it is missing, run npx vercel@latest whoami and pause for login if needed. Determine the team, then run npx vercel@latest --scope <team-slug> ai-gateway api-keys create --name <descriptive-name>. Capture stdout directly into AI_GATEWAY_API_KEY for the request or existing ignored secret storage, and never expose the value. Use scaledown/extract-1 with experimental_extract from the ai package to extract the invoice number from an invoice as a text field, print the structured answer, run the result, and report the output.
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
import { experimental_extract as extract } from 'ai';

const result = await extract({
  model: 'scaledown/extract-1',
  state: 'Invoice INV-2041 from Acme Corp. Contacts: Ana, Bo.',
  fields: {
    invoiceNumber: {
      type: 'text',
      instructions: 'The invoice number',
    },
  },
});

console.log(JSON.stringify(result.answers, null, 2));
```

Run the script:

```bash filename="Terminal"
node index.mts
```

This quickstart logs only `result.answers`. You should see output with this shape:

```json
{
  "invoiceNumber": {
    "type": "text",
    "value": "INV-2041",
    "confidence": 1,
    "source": { "type": "text", "part": 0, "start": 8, "end": 16 }
  }
}
```

## Next steps

- Extract [lists](/docs/ai-gateway/modalities/extraction#basic-usage) and check the [supported field types and file inputs](/docs/ai-gateway/modalities/extraction#supported-field-types-and-file-inputs) for each model
- Browse [extraction models](/ai-gateway/models?capabilities=extraction)

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
