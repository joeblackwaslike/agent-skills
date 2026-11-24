---
title: AI_DecisionRefusalError
description: Identify decision questions that a model declined to answer.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-decision-refusal-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-decision-refusal-error.md"
fetched_at: "2026-10-12T11:48:49.587Z"
sha256: "a31d7503fe15ca4e4c52a5abe99b29facec66c00cfa209e836821403b28279ed"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This experimental error identifies questions that a decision model declined to
answer, such as a question the provider's safety policy refuses. It is exported
from `ai` and `@ai-sdk/provider` as `Experimental_DecisionRefusalError`.

Decision models report a refusal as an answer with `type: 'refusal'`.
`experimental_decide` throws this error when any answer is a refusal, after the
provider call and without retrying it.

## Properties

- `questionIds`: The IDs of the refused questions.
- `provider`: The provider of the decision model.
- `modelId`: The decision model ID.
- `message`: A description of the refused questions and model.

## Checking for this Error

Use the marker-based `isInstance` check, which works across package copies:

```typescript
import { Experimental_DecisionRefusalError as DecisionRefusalError } from 'ai';

if (DecisionRefusalError.isInstance(error)) {
  console.log(error.questionIds, error.modelId);
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)