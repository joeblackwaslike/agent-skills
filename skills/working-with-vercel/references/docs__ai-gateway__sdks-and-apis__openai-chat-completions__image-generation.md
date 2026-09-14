---
title: AI Gateway Chat Completions Image Generation Reference
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/modalities/image-generation/openai
  - /docs/ai-gateway/modalities/image-generation
summary: Generate images using AI models that support multimodal output through the Chat Completions API through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "5666f770d6e78725ff94fefe00d82d2a21602c4141c63f1896feae4105a1c49a"
---

# AI Gateway Chat Completions Image Generation Reference

Generate images using AI models that support multimodal output through the Chat Completions API. This feature allows you to create images alongside text responses using models like Google's Gemini 3.1 Flash Image.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenAI Chat Completions Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Fimage-generation&source_site=vercel-docs&relationship=related) — Send images and PDF documents to a model using the OpenAI Chat Completions API through AI Gateway.
- [AI Gateway Image Generation](https://vercel.com/docs/ai-gateway/modalities/image-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Fimage-generation&source_site=vercel-docs&relationship=related) — Generate and edit images using AI models through Vercel AI Gateway with support for multiple providers and modalities.
- [OpenAI Chat Completions Requests with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/chat-completions?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Fimage-generation&source_site=vercel-docs&relationship=related) — Create chat completions using the Chat Completions API with support for streaming, image attachments, and PDF documents
- [AI Gateway Image Generation with AI SDK](https://vercel.com/docs/ai-gateway/modalities/image-generation/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Fimage-generation&source_site=vercel-docs&relationship=related) — Generate and edit images using AI models through Vercel AI Gateway with the AI SDK.
- [AI Gateway Vision and Image Input](https://vercel.com/docs/ai-gateway/inputs-and-tools/vision?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Fimage-generation&source_site=vercel-docs&relationship=related) — Analyze images with AI Gateway using AI SDK 7, the Python beta, Chat Completions, Messages, and Responses APIs.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation.graph.md](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Fimage-generation&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Endpoint

```
POST /chat/completions
```

Parameters

To enable image generation, include the `modalities` parameter in your request:

- `modalities` (array): Array of strings specifying the desired output modalities. Use `['text', 'image']` for both text and image generation, or `['image']` for image-only generation.

Example requests

#### TypeScript

```typescript filename="image-generation.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

type ImageOutput = { images?: Array<{ image_url: { url: string } }> };

const completion = await client.chat.completions.create({
  model: 'google/gemini-3.1-flash-image-preview',
  messages: [{ role: 'user', content: 'Generate a sunset image and describe it.' }],
  // @ts-expect-error AI Gateway supports image output beyond OpenAI's text/audio types.
  modalities: ['text', 'image'],
  stream: false,
});

const message = completion.choices[0].message as
  OpenAI.Chat.Completions.ChatCompletionMessage & ImageOutput;
console.log(message.content);
for (const image of message.images ?? []) {
  console.log('Image:', image.image_url.url);
}
```

#### Python

```python filename="image-generation.py"
import os
from openai import OpenAI

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = OpenAI(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh/v1'
)

completion = client.chat.completions.create(
    model='google/gemini-3.1-flash-image-preview',
    messages=[
        {
            'role': 'user',
            'content': 'Generate a beautiful sunset over mountains and describe the scene.'
        }
    ],
    # Note: modalities parameter is not yet in OpenAI Python types but supported by our gateway
    extra_body={'modalities': ['text', 'image']},
    stream=False,
)

message = completion.choices[0].message

# Text content is always a string
print(f"Text: {message.content}")

# Images are in a separate array
if hasattr(message, 'images') and message.images:
    print(f"Generated {len(message.images)} images:")
    for i, img in enumerate(message.images):
        if img.get('type') == 'image_url' and img.get('image_url'):
            image_url = img['image_url']['url']
            data_size = len(image_url) if image_url else 0
            print(f"Image {i+1}: size: {data_size} chars")
            print(f"Preview: {image_url[:50]}...")

print(f'Tokens used: {completion.usage}')
```

#### cURL

```bash filename="image-generation.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "google/gemini-3.1-flash-image-preview",
    "messages": [
      {
        "role": "user",
        "content": "Generate a beautiful sunset over mountains and describe the scene."
      }
    ],
    "modalities": [
      "text",
      "image"
    ],
    "stream": false
  }'
```

Response format

When image generation is enabled, the response separates text content from generated images:

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "google/gemini-3.1-flash-image-preview",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Here's a beautiful sunset scene over the mountains...",
        "images": [
          {
            "type": "image_url",
            "image_url": {
              "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
            }
          }
        ]
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 28,
    "total_tokens": 43
  }
}
```

### Response structure details

- **`content`**: Contains the text description as a string
- **`images`**: Array of generated images, each with:
  - `type`: Always `"image_url"`
  - `image_url.url`: Base64-encoded data URI of the generated image

### Streaming responses

For streaming requests, images are delivered in delta chunks:

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion.chunk",
  "created": 1677652288,
  "model": "google/gemini-3.1-flash-image-preview",
  "choices": [
    {
      "index": 0,
      "delta": {
        "images": [
          {
            "type": "image_url",
            "image_url": {
              "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
            }
          }
        ]
      },
      "finish_reason": null
    }
  ]
}
```

### Handling streaming image responses

When processing streaming responses, check for both text content and images in each delta:

#### TypeScript

```typescript filename="streaming-images.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

type ImageOutput = { images?: Array<{ image_url: { url: string } }> };

const stream = await client.chat.completions.create({
  model: 'google/gemini-3.1-flash-image-preview',
  messages: [{ role: 'user', content: 'Generate a sunset image and describe it.' }],
  // @ts-expect-error AI Gateway supports image output beyond OpenAI's text/audio types.
  modalities: ['text', 'image'],
  stream: true,
});

for await (const chunk of stream) {
  const delta = chunk.choices[0]?.delta as
    | (OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta & ImageOutput)
    | undefined;
  if (delta?.content) process.stdout.write(delta.content);
  for (const image of delta?.images ?? []) {
    console.log('Image:', image.image_url.url);
  }
}
```

#### Python

```python filename="streaming-images.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1'
)

stream = client.chat.completions.create(
    model='google/gemini-3.1-flash-image-preview',
    messages=[{'role': 'user', 'content': 'Generate a sunset image'}],
    extra_body={'modalities': ['text', 'image']},
    stream=True,
)

for chunk in stream:
    if chunk.choices and chunk.choices[0].delta:
        delta = chunk.choices[0].delta

        # Handle text content
        if hasattr(delta, 'content') and delta.content:
            print(delta.content, end='', flush=True)

        # Handle images
        if hasattr(delta, 'images') and delta.images:
            for img in delta.images:
                if img.get('type') == 'image_url' and img.get('image_url'):
                    image_url = img['image_url']['url']
                    print(f"\n[Image received: {len(image_url)} chars]")
```

#### cURL

```bash filename="image-generation-stream.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "google/gemini-3.1-flash-image-preview",
    "messages": [
      {
        "role": "user",
        "content": "Generate a sunset image"
      }
    ],
    "modalities": [
      "text",
      "image"
    ],
    "stream": true
  }'
```

## Image-only models (different endpoint)

OpenAI's `openai/gpt-image-2` and other image-only models (for example, Flux, Recraft, Grok Imagine) do not accept the Chat Completions `modalities` parameter. They use the OpenAI-compatible Images endpoint (`/v1/images/generations`) instead of `/v1/chat/completions`, called via `openai.images.generate`.

See the [image-only models examples](/docs/ai-gateway/modalities/image-generation/openai#image-only-models) for `openai/gpt-image-2`, Flux, and Grok Imagine.

To edit an existing image with these models, use the `/v1/images/edits` endpoint (`openai.images.edit`). See [editing images](/docs/ai-gateway/modalities/image-generation/openai#editing-images).

> **💡 Note:** **Image generation support:** Multimodal image output through Chat Completions
> `modalities` is supported by Google's Gemini 2.5 Flash Image. Generated images
> are returned as base64-encoded data URIs. For more detail, see the [Image
> Generation documentation](/docs/ai-gateway/modalities/image-generation).


---

[View full sitemap](/docs/sitemap)
