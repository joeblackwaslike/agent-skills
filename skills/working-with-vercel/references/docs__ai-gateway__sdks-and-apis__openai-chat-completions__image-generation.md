---
title: Image Generation
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/modalities/image-generation/openai
  - /docs/ai-gateway/modalities/image-generation
summary: Generate images using AI models that support multimodal output through the Chat Completions API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "d52c71e8e0a24e0d3b9b6290aaa24d8bc3caa52fc62c9301b2caec9bc8bd9181"
---

# Image Generation

Generate images using AI models that support multimodal output through the Chat Completions API. This feature allows you to create images alongside text responses using models like Google's Gemini 3.1 Flash Image.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Image Generation](https://vercel.com/docs/ai-gateway/modalities/image-generation?from=related) — Generate and edit images using AI models through Vercel AI Gateway with support for multiple providers and modalities.
- [Using AI SDK](https://vercel.com/docs/ai-gateway/modalities/image-generation/ai-sdk?from=related) — Generate and edit images using AI models through Vercel AI Gateway with the AI SDK.
- [Images](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/images?from=related) — Send images and PDF documents to a model using the OpenAI Chat Completions API.
- [Image](https://vercel.com/docs/ai-gateway/getting-started/image?from=related) — Generate images from text prompts using AI Gateway.
- [Modalities](https://vercel.com/docs/ai-gateway/modalities?from=related) — The inputs and outputs AI Gateway models work with: text, image, and video generation, speech to text, text to speech, r

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation.graph.md](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation.graph.md)
<!-- /docsgraph:related -->

Endpoint

```
POST /chat/completions
```

Parameters

To enable image generation, include the `modalities` parameter in your request:

- `modalities` (array): Array of strings specifying the desired output modalities. Use `['text', 'image']` for both text and image generation, or `['image']` for image-only generation.

Example requests

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

#### TypeScript

```typescript filename="image-generation.ts"
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const completion = await openai.chat.completions.create({
  model: 'google/gemini-3.1-flash-image-preview',
  messages: [
    {
      role: 'user',
      content:
        'Generate a beautiful sunset over mountains and describe the scene.',
    },
  ],
  // @ts-expect-error - modalities not yet in OpenAI types but supported by gateway
  modalities: ['text', 'image'],
  stream: false,
});

const message = completion.choices[0].message;

// Text content is always a string
console.log('Text:', message.content);

// Images are in a separate array
if (message.images && Array.isArray(message.images)) {
  console.log(`Generated ${message.images.length} images:`);
  for (const [index, img] of message.images.entries()) {
    if (img.type === 'image_url' && img.image_url) {
      console.log(`Image ${index + 1}:`, {
        size: img.image_url.url?.length || 0,
        preview: `${img.image_url.url?.substring(0, 50)}...`,
      });
    }
  }
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

#### TypeScript

```typescript filename="streaming-images.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const stream = await openai.chat.completions.create({
  model: 'google/gemini-3.1-flash-image-preview',
  messages: [{ role: 'user', content: 'Generate a sunset image' }],
  // @ts-expect-error - modalities not yet in OpenAI types
  modalities: ['text', 'image'],
  stream: true,
});

for await (const chunk of stream) {
  const delta = chunk.choices[0]?.delta;

  // Handle text content
  if (delta?.content) {
    process.stdout.write(delta.content);
  }

  // Handle images
  if (delta?.images) {
    for (const img of delta.images) {
      if (img.type === 'image_url' && img.image_url) {
        console.log(`\n[Image received: ${img.image_url.url.length} chars]`);
      }
    }
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

## Image-only models (different endpoint)

OpenAI's `openai/gpt-image-2` and other image-only models (for example, Imagen, Flux, Grok Imagine) do not accept the Chat Completions `modalities` parameter. They use the OpenAI-compatible Images endpoint (`/v1/images/generations`) instead of `/v1/chat/completions`, called via `openai.images.generate`.

See the [image-only models examples](/docs/ai-gateway/modalities/image-generation/openai#image-only-models) for `openai/gpt-image-2`, Imagen, Flux, and Grok Imagine.

> **💡 Note:** **Image generation support:** Multimodal image output through Chat Completions
> `modalities` is supported by Google's Gemini 2.5 Flash Image. Generated images
> are returned as base64-encoded data URIs. For more detail, see the [Image
> Generation documentation](/docs/ai-gateway/modalities/image-generation).


---

[View full sitemap](/docs/sitemap)
