---
title: AI_EvaluationUnsupportedQuestionTypeError
description: Identify an evaluation question type that a model does not support.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-evaluation-unsupported-question-type-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-evaluation-unsupported-question-type-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "3ac459a5e503c6e5d096b330c75ccf6df59f3f846bbdad79a7dfaafa19243d50"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This experimental error identifies a question whose type is unsupported by an
evaluation model. It is exported from `ai` and `@ai-sdk/provider` as
`Experimental_EvaluationUnsupportedQuestionTypeError`.

## Properties

- `questionId`: The ID of the unsupported question.
- `questionType`: The requested question type.
- `provider`: The provider of the evaluation model.
- `modelId`: The evaluation model ID.
- `message`: A description of the unsupported question and model. Providers can
  supply a custom message.

## Checking for this Error

Use the marker-based `isInstance` check, which works across package copies:

```typescript
import { Experimental_EvaluationUnsupportedQuestionTypeError as EvaluationUnsupportedQuestionTypeError } from 'ai';

if (EvaluationUnsupportedQuestionTypeError.isInstance(error)) {
  console.log(error.questionId, error.questionType, error.modelId);
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)