---
source: "https://ai-sdk.dev/providers/ai-sdk-providers/typesafe-ai.md"
fetched_at: "2026-09-21T09:43:58.833Z"
sha256: "fb9c5a4a3c8924ea66617a4303fdfc4ce9cf6f339a4063247cc5b22076423f1a"
---

# TypeSafe Provider

The [TypeSafe](https://typesafe.ai) provider supports the experimental evaluation
API with native Choice, Score, and Boolean answers. It sends all questions in one
request against the same state.

## Setup

Install the provider:

```sh
pnpm add @ai-sdk/typesafe-ai
```

Set the `TYPESAFE_AI_API_KEY` environment variable. Import the default provider or
configure an instance:

```ts
import { createTypeSafeAi, typeSafeAi } from '@ai-sdk/typesafe-ai';

const customTypeSafe = createTypeSafeAi({
  apiKey: 'your-api-key',
});
```

`createTypeSafeAi` accepts:

| Setting   | Description                                 |
| --------- | ------------------------------------------- |
| `apiKey`  | API key; defaults to `TYPESAFE_AI_API_KEY`. |
| `baseURL` | Defaults to `https://api.typesafe.ai/v1`.   |
| `headers` | Additional request headers.                 |
| `fetch`   | Custom fetch implementation.                |

## Evaluation

```ts
import { typeSafeAi } from '@ai-sdk/typesafe-ai';
import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: typeSafeAi.evaluationModel('jev-latest'),
  state: {
    message: 'I was charged twice. Please refund the duplicate.',
  },
  questions: {
    department: {
      type: 'choice',
      instructions: 'Which team should handle this?',
      criteria: {
        billing: { includes: ['Charges', 'Invoices', 'Refunds'] },
        technical: ['Bugs', 'Outages'],
        other: null,
      },
    },
    severity: {
      type: 'score',
      instructions: 'How severe is the issue?',
      criteria: ['Cosmetic', 'Workaround exists', 'Blocking; no workaround'],
    },
    requestsRefund: {
      type: 'boolean',
      instructions: 'Is the customer requesting money back?',
    },
  },
});

console.log(result.answers.department.choice);
console.log(result.answers.severity.score);
console.log(result.answers.requestsRefund.probability);
console.log(result.usage);
```

Use `jev-latest` or another TypeSafe model ID. The response includes the actual
model ID, such as the resolved version behind the alias. Use model instances,
custom aliases, or registered providers. With `typeSafeAi` explicitly configured
as `globalThis.AI_SDK_DEFAULT_PROVIDER`, you can pass `model: 'jev-latest'`
directly. See [model aliases and registries](/docs/ai-sdk-core/evaluation#model-aliases-and-registries).

| Question  | Native TypeSafe primitive | Limits and semantics                                                 |
| --------- | ------------------------- | -------------------------------------------------------------------- |
| `choice`  | Choice                    | 1–255 options; selected option and full probabilities.               |
| `score`   | Score                     | 2–10 ordered rubric levels; fractional score and full probabilities. |
| `boolean` | Noul                      | Required model-estimated probability of true.                        |

State, instructions, and descriptions accept JSON objects and arrays in addition
to strings. Descriptions may be `null`. Boolean true/false criteria are optional.
The SDK uses the neutral name `boolean` and maps it to TypeSafe's `noul` field.

### Rounded values and confidence

TypeSafe returns scores and probabilities rounded to two decimal places.
`result.rounding` reports this precision so the SDK can account for rounding when
checking distribution sums and weighted means. The returned values are preserved
unchanged; rounding means probabilities may not add up to exactly one.

Confidence is a separate TypeSafe statistic, available under
`result.providerMetadata.typesafe.confidence[questionId]` for Choice and Score
answers. Boolean probability always means P(true), not confidence in either
outcome. Choose decision thresholds in application code.

### Errors and retries

Provider failures use `APICallError`, including validation and authentication
errors. Core retries transient failures such as `429` and `529` according to
`maxRetries` (default: 2). `abortSignal`, request headers, and custom fetch are
forwarded. There is no provider-side retry loop.

No provider-specific options are currently defined. Unknown entries under
`providerOptions.typesafe` produce unsupported-option warnings. Language,
embedding, and image model factories throw `NoSuchModelError`.

Evaluation models support workflow serialization. A custom fetch function is not
serialized; restored models use the default fetch implementation.


## Navigation

- [AI Gateway](/providers/ai-sdk-providers/ai-gateway)
- [xAI Grok](/providers/ai-sdk-providers/xai)
- [OpenAI](/providers/ai-sdk-providers/openai)
- [Azure OpenAI](/providers/ai-sdk-providers/azure)
- [Anthropic](/providers/ai-sdk-providers/anthropic)
- [Open Responses](/providers/ai-sdk-providers/open-responses)
- [Claude Platform on AWS](/providers/ai-sdk-providers/anthropic-aws)
- [Amazon Bedrock](/providers/ai-sdk-providers/amazon-bedrock)
- [Groq](/providers/ai-sdk-providers/groq)
- [Fal](/providers/ai-sdk-providers/fal)
- [AssemblyAI](/providers/ai-sdk-providers/assemblyai)
- [GMI Cloud](/providers/ai-sdk-providers/gmicloud)
- [TypeSafe](/providers/ai-sdk-providers/typesafe-ai)
- [DeepInfra](/providers/ai-sdk-providers/deepinfra)
- [Deepgram](/providers/ai-sdk-providers/deepgram)
- [Black Forest Labs](/providers/ai-sdk-providers/black-forest-labs)
- [Gladia](/providers/ai-sdk-providers/gladia)
- [Google](/providers/ai-sdk-providers/google)
- [Hume](/providers/ai-sdk-providers/hume)
- [Google Vertex AI](/providers/ai-sdk-providers/google-vertex)
- [Rev.ai](/providers/ai-sdk-providers/revai)
- [Baseten](/providers/ai-sdk-providers/baseten)
- [Hugging Face](/providers/ai-sdk-providers/huggingface)
- [QuiverAI](/providers/ai-sdk-providers/quiverai)
- [Fish Audio](/providers/ai-sdk-providers/fish-audio)
- [Mistral AI](/providers/ai-sdk-providers/mistral)
- [Z.AI](/providers/ai-sdk-providers/zai)
- [Together.ai](/providers/ai-sdk-providers/togetherai)
- [Cohere](/providers/ai-sdk-providers/cohere)
- [Fireworks](/providers/ai-sdk-providers/fireworks)
- [Voyage AI](/providers/ai-sdk-providers/voyage)
- [DeepSeek](/providers/ai-sdk-providers/deepseek)
- [Moonshot AI](/providers/ai-sdk-providers/moonshotai)
- [Alibaba](/providers/ai-sdk-providers/alibaba)
- [MiniMax](/providers/ai-sdk-providers/minimax)
- [Cerebras](/providers/ai-sdk-providers/cerebras)
- [Replicate](/providers/ai-sdk-providers/replicate)
- [Prodia](/providers/ai-sdk-providers/prodia)
- [Perplexity](/providers/ai-sdk-providers/perplexity)
- [Luma](/providers/ai-sdk-providers/luma)
- [ByteDance](/providers/ai-sdk-providers/bytedance)
- [Kling AI](/providers/ai-sdk-providers/klingai)
- [ElevenLabs](/providers/ai-sdk-providers/elevenlabs)
- [Cartesia](/providers/ai-sdk-providers/cartesia)


[Full Sitemap](/sitemap.md)
