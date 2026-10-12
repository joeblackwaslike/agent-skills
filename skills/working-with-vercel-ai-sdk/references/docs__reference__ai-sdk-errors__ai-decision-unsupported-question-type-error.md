---
title: AI_DecisionUnsupportedQuestionTypeError
description: Identify a decision question type that a model does not support.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-decision-unsupported-question-type-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-decision-unsupported-question-type-error.md"
fetched_at: "2026-10-12T11:48:49.587Z"
sha256: "c70df539c7e1833f3f6477f0ce434d4790d78e541764ec80d8632048cd72a73b"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This experimental error identifies a question whose type is unsupported by a
decision model. It is exported from `ai` and `@ai-sdk/provider` as
`Experimental_DecisionUnsupportedQuestionTypeError`.

## Properties

- `questionId`: The ID of the unsupported question.
- `questionType`: The requested question type.
- `provider`: The provider of the decision model.
- `modelId`: The decision model ID.
- `message`: A description of the unsupported question and model. Providers can
  supply a custom message.

## Checking for this Error

Use the marker-based `isInstance` check, which works across package copies:

```typescript
import { Experimental_DecisionUnsupportedQuestionTypeError as DecisionUnsupportedQuestionTypeError } from 'ai';

if (DecisionUnsupportedQuestionTypeError.isInstance(error)) {
  console.log(error.questionId, error.questionType, error.modelId);
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)