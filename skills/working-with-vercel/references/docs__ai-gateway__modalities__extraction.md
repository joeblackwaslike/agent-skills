---
title: Extraction
product: vercel
url: /docs/ai-gateway/modalities/extraction
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/extraction"
last_updated: 2026-11-18
type: how-to
prerequisites:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/getting-started/extraction
  - /docs/ai-gateway/modalities/decision
summary: Extract typed field values, such as invoice numbers and lists of names, from text through Vercel AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/modalities/extraction.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "a47f505ea1d8722d5e71e1d48460891c108ec5b7dd9a2f4db89517ceae62428b"
---

# Extraction

Extract typed values from a piece of shared state, such as an invoice number or a list of contact names. Extraction models return one structured answer per field instead of free-form text, which makes them a fit for invoice processing, contract analysis, and record parsing.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [experimental_extract](https://ai-sdk.dev/docs/reference/ai-sdk-core/extract) — Extract typed field values from shared state with an extraction model.
- [AI Gateway](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway) — Learn how to use the AI Gateway provider with the AI SDK.
- [AI Gateway Models and Providers](https://vercel.com/docs/ai-gateway/models-and-providers) — Choose AI Gateway models and providers. Configure routing, fallbacks, timeouts, prompt caching, reasoning, and web searc
- [AI Gateway Embeddings](https://vercel.com/docs/ai-gateway/modalities/embeddings) — Generate vector embeddings for semantic search, similarity matching, and retrieval-augmented generation \\(RAG\\) through
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 400+ models.
- [OpenAI Responses Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/images) — Send images and PDF documents for analysis using the OpenAI Responses API through AI Gateway.
- [Adding a Model](https://vercel.com/docs/agent-resources/integrations-for-models/adding-a-model) — Learn how to add a new AI model to your Vercel projects

Full cross-link map for this page: [/docs/ai-gateway/modalities/extraction.graph.md](/docs/ai-gateway/modalities/extraction.graph.md)
<!-- /docsgraph:related -->

To see which extraction models AI Gateway supports, use the **Extraction** filter at the [AI Gateway Models page](/ai-gateway/models?capabilities=extraction).

For a step-by-step setup, see the [Extraction quickstart](/docs/ai-gateway/getting-started/extraction).

> **💡 Note:** Extraction is available through the AI SDK only, with `ai` 7.0.176 or later.
> It is not supported through the OpenAI-compatible or Anthropic-compatible
> endpoints.

## Basic usage

For SDK options and result types, see [AI SDK extractions](https://ai-sdk.dev/docs/ai-sdk-core/extractions).

```typescript filename="app/api/extract/route.ts" {5-18}
import { experimental_extract as extract } from 'ai';

export async function GET() {
  const result = await extract({
    model: 'scaledown/extract-1',
    state: 'Invoice INV-2041 from Acme Corp. Contacts: Ana, Bo.',
    fields: {
      invoiceNumber: {
        type: 'text',
        instructions: 'The invoice number',
      },
      contacts: {
        type: 'list',
        items: 'text',
        instructions: 'Contact names',
      },
    },
  });

  return Response.json(result.answers);
}
```

Each key in `fields` becomes a key in `answers`. A `value` is `null` when the state doesn't contain the field. `confidence` is a number between 0 and 1, and `source` gives the position of the value in the state as character offsets:

```typescript
// result.answers
{
  invoiceNumber: {
    type: 'text',
    value: 'INV-2041',
    confidence: 1,
    source: { type: 'text', part: 0, start: 8, end: 16 },
  },
  contacts: {
    type: 'list',
    value: ['Ana', 'Bo'],
    confidence: 1,
    items: [
      { confidence: 1, source: { type: 'text', part: 0, start: 43, end: 46 } },
      { confidence: 1, source: { type: 'text', part: 0, start: 48, end: 50 } },
    ],
  },
}
```

`state` accepts a string, an object, or an array of parts, the same as [structured state](/docs/ai-gateway/modalities/decision#structured-state) for decision models.

## Supported field types and file inputs

The field types and file inputs you can use depend on the model:

| Model                 | Supported field types                   | Supported file inputs |
| --------------------- | --------------------------------------- | --------------------- |
| `scaledown/extract-1` | `text`, and `list` with `items: 'text'` | Images and PDF files  |

## AI Gateway provider instance

When using an AI Gateway provider instance, specify extraction models with `gateway.extractionModel(...)`.

```typescript filename="app/api/extract/route.ts" {2,6}
import { experimental_extract as extract } from 'ai';
import { gateway } from '@ai-sdk/gateway';

export async function GET() {
  const result = await extract({
    model: gateway.extractionModel('scaledown/extract-1'),
    state: 'Invoice INV-2041 from Acme Corp. Contacts: Ana, Bo.',
    fields: {
      invoiceNumber: {
        type: 'text',
        instructions: 'The invoice number',
      },
    },
  });

  return Response.json(result.answers);
}
```

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
