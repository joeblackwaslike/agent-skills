---
title: Image Generation with Chat Completions API
product: vercel
url: /docs/ai-gateway/modalities/image-generation/openai
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/image-generation/openai"
last_updated: 2026-08-27
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities/image-generation
  - /docs/ai-gateway/modalities
related:
  []
summary: Generate and edit images using AI models through Vercel AI Gateway with the Chat Completions API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/image-generation/openai.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "c96cb9a0f05d0fa4553c0134a3a20354f26251150dd42724722d244f6368fe68"
---

# Image Generation with Chat Completions API

AI Gateway supports image generation using the Chat Completions API for the models listed under the **Image Gen** filter at the [AI Gateway Models
page](/ai-gateway/models?type=image), including multimodal LLMs and image-only models.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Video Generation with AI Gateway](https://vercel.com/blog/video-generation-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fimage-generation%2Fopenai&source_site=vercel-docs&relationship=related)
- [Image Generation with AI SDK](https://vercel.com/docs/ai-gateway/modalities/image-generation/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fimage-generation%2Fopenai&source_site=vercel-docs&relationship=related) — Generate and edit images using AI models through Vercel AI Gateway with the AI SDK.
- [Image-only models available in Vercel AI Gateway](https://vercel.com/changelog/image-only-models-available-in-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fimage-generation%2Fopenai&source_site=vercel-docs&relationship=related)
- [Generate videos with AI SDK](https://vercel.com/kb/guide/ai-sdk-video-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fimage-generation%2Fopenai&source_site=vercel-docs&relationship=related) — Use experimental_generateVideo in the AI SDK to generate videos from a text prompt or an image, set aspect ratio, resolu
- [Image Generation](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fimage-generation%2Fopenai&source_site=vercel-docs&relationship=related) — Generate images using AI models that support multimodal output through the Chat Completions API.
- [Image Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/image?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fimage-generation%2Fopenai&source_site=vercel-docs&relationship=related) — Generate images from text prompts using AI Gateway.
- [File Attachments](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fimage-generation%2Fopenai&source_site=vercel-docs&relationship=related) — Send images and PDF documents for analysis using the OpenAI Responses API through AI Gateway.
- [Text Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/text?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fimage-generation%2Fopenai&source_site=vercel-docs&relationship=related) — Generate and stream text responses using AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/modalities/image-generation/openai.graph.md](/docs/ai-gateway/modalities/image-generation/openai.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fimage-generation%2Fopenai&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Multimodal LLMs

Multimodal LLMs like Nano Banana, Nano Banana Pro, and GPT-5 variants can generate images alongside text using the `/v1/chat/completions` endpoint. Images are returned in the response's `images` array.

### Generate response format

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
        "content": "I've generated a beautiful sunset image for you.",
        "images": [
          {
            "type": "image_url",
            "image_url": {
              "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
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

### Streaming response format

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
              "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
            }
          }
        ]
      },
      "finish_reason": null
    }
  ]
}
```

## Image-only models

Image-only models use the OpenAI-compatible `/v1/images/generations` endpoint, not `/v1/chat/completions`. Call them with `openai.images.generate` from the OpenAI SDK.

### OpenAI GPT Image 2

OpenAI's `openai/gpt-image-2` is an image-only model. Call it directly with `openai.images.generate`.

```typescript filename="generate-gpt-image-2.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const result = await openai.images.generate({
  model: 'openai/gpt-image-2',
  prompt: 'A Devon Rex peering into a koi pond in the style of ukiyo-e',
});

console.log(`Generated ${result.data.length} image(s)`);
```

```python filename="generate-gpt-image-2.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

result = client.images.generate(
    model='openai/gpt-image-2',
    prompt='A Devon Rex peering into a koi pond in the style of ukiyo-e',
)

print(f'Generated {len(result.data)} image(s)')
```

### Black Forest Labs

Black Forest Labs' Flux models offer advanced image generation with various capabilities. Multiple models are available including but not limited to:

- `bfl/flux-2-pro`
- `bfl/flux-2-flex`
- `bfl/flux-kontext-max`
- `bfl/flux-kontext-pro`
- `bfl/flux-pro-1.0-fill`
- `bfl/flux-pro-1.1`

View available [Black Forest Labs provider options](https://ai-sdk.dev/providers/ai-sdk-providers/black-forest-labs#provider-options) for configuration details.

#### TypeScript (Basic)

```typescript filename="generate-bfl-simple.ts"
import OpenAI from 'openai';
import 'dotenv/config';

async function main() {
  const openai = new OpenAI({
    apiKey: process.env.AI_GATEWAY_API_KEY,
    baseURL: 'https://ai-gateway.vercel.sh/v1',
  });

  const result = await openai.images.generate({
    model: 'bfl/flux-2-pro',
    prompt: `Render an echidna swimming across the Mozambique channel at sunset with phosphorescent jellyfish`,
  });

  // Process the generated images
  for (const image of result.data) {
    if (image.b64_json) {
      console.log(
        'Generated image (base64):',
        image.b64_json.substring(0, 50) + '...',
      );
    }
  }
}

main().catch(console.error);
```

#### TypeScript (With Options)

```typescript filename="generate-bfl-options.ts"
import OpenAI from 'openai';
import 'dotenv/config';

async function main() {
  const openai = new OpenAI({
    apiKey: process.env.AI_GATEWAY_API_KEY,
    baseURL: 'https://ai-gateway.vercel.sh/v1',
  });

  const result = await openai.images.generate({
    model: 'bfl/flux-2-pro',
    prompt: `Draw a gorgeous image of a river made of white owl feathers snaking through a serene winter landscape`,
    // @ts-expect-error - Provider options are not in OpenAI types
    providerOptions: {
      blackForestLabs: {
        outputFormat: 'jpeg',
        safetyTolerance: 2,
      },
    },
  });

  // Process the generated images
  for (const image of result.data) {
    if (image.b64_json) {
      console.log(
        'Generated image (base64):',
        image.b64_json.substring(0, 50) + '...',
      );
    }
  }
}

main().catch(console.error);
```

#### Python

```python filename="generate-bfl.py"
import base64
import json
import os
from datetime import datetime

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

def main():
    api_key = os.getenv("AI_GATEWAY_API_KEY") or os.getenv("VERCEL_OIDC_TOKEN")
    base_url = (
        os.getenv("AI_GATEWAY_BASE_OPENAI_COMPAT_URL")
        or "https://ai-gateway.vercel.sh/v1"
    )

    client = OpenAI(
        api_key=api_key,
        base_url=base_url,
    )

    result = client.images.generate(
        model="bfl/flux-2-pro",
        prompt=(
            "A mystical aurora borealis dancing over a frozen lake "
            "with snow-covered mountains reflected in the ice"
        ),
        n=1,
        response_format="b64_json",
        extra_body={
            "providerOptions": {
                "blackForestLabs": {
                    "outputFormat": "jpeg",
                    "safetyTolerance": 2,
                }
            }
        },
    )

    if not result or not result.data or len(result.data) == 0:
        raise Exception("No image data received from OpenAI-compatible endpoint")

    print(f"Generated {len(result.data)} image(s)")

    for i, image in enumerate(result.data):
        if hasattr(image, "b64_json") and image.b64_json:
            # Decode base64 to get image size
            image_bytes = base64.b64decode(image.b64_json)
            print(f"Image {i+1}:")
            print(f"  Size: {len(image_bytes)} bytes")
            print(f"  Base64 preview: {image.b64_json[:50]}...")

            # Save image to file with timestamp
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            output_file = f"output/output_image_{timestamp}_{i+1}.png"
            print(f"  Saving image to {output_file}")
            with open(output_file, "wb") as f:
                f.write(image_bytes)

    if hasattr(result, "provider_metadata"):
        print("\nProvider metadata:")
        print(json.dumps(result.provider_metadata, indent=2))

if __name__ == "__main__":
    main()
```

### SpaceXAI Grok Imagine

SpaceXAI's Grok Imagine models generate high-quality images from text prompts with support for various aspect ratios. Browse the current lineup in the [model list](/ai-gateway/models).

#### TypeScript

```typescript filename="generate-spacexai.ts"
import OpenAI from 'openai';
import 'dotenv/config';

async function main() {
  const openai = new OpenAI({
    apiKey: process.env.AI_GATEWAY_API_KEY,
    baseURL: 'https://ai-gateway.vercel.sh/v1',
  });

  const result = await openai.images.generate({
    model: 'spacexai/grok-imagine-image',
    prompt: `A serene Japanese garden with a koi pond, stone lanterns, and cherry blossoms in full bloom`,
  });

  // Process the generated images
  for (const image of result.data) {
    if (image.b64_json) {
      console.log(
        'Generated image (base64):',
        image.b64_json.substring(0, 50) + '...',
      );
    }
  }
}

main().catch(console.error);
```

#### Python

```python filename="generate-spacexai.py"
import base64
import os
from datetime import datetime

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

def main():
    api_key = os.getenv("AI_GATEWAY_API_KEY") or os.getenv("VERCEL_OIDC_TOKEN")
    base_url = (
        os.getenv("AI_GATEWAY_BASE_OPENAI_COMPAT_URL")
        or "https://ai-gateway.vercel.sh/v1"
    )

    client = OpenAI(
        api_key=api_key,
        base_url=base_url,
    )

    result = client.images.generate(
        model="spacexai/grok-imagine-image",
        prompt=(
            "A serene Japanese garden with a koi pond, "
            "stone lanterns, and cherry blossoms in full bloom"
        ),
        n=1,
        response_format="b64_json",
    )

    if not result or not result.data or len(result.data) == 0:
        raise Exception("No image data received from OpenAI-compatible endpoint")

    print(f"Generated {len(result.data)} image(s)")

    for i, image in enumerate(result.data):
        if hasattr(image, "b64_json") and image.b64_json:
            image_bytes = base64.b64decode(image.b64_json)
            print(f"Image {i+1}:")
            print(f"  Size: {len(image_bytes)} bytes")
            print(f"  Base64 preview: {image.b64_json[:50]}...")

            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            output_file = f"output/output_image_{timestamp}_{i+1}.png"
            print(f"  Saving image to {output_file}")
            with open(output_file, "wb") as f:
                f.write(image_bytes)

if __name__ == "__main__":
    main()
```

## Editing images

Image-only models can also edit an existing image. Send one or more source images and a prompt describing the change to the OpenAI-compatible `/v1/images/edits` endpoint, using `openai.images.edit` from the OpenAI SDK.

Support varies by model. Models that accept image inputs include `openai/gpt-image-2`, `bfl/flux-kontext-pro`, `bfl/flux-pro-1.0-fill`, `google/gemini-3.1-flash-image`, and `spacexai/grok-imagine-image`. Edited images are returned as base64 strings in `data`, the same as image generation.

### Edit a single image

```typescript filename="edit-image.ts"
import { createReadStream } from 'node:fs';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const result = await openai.images.edit({
  model: 'openai/gpt-image-2',
  image: createReadStream('source.png'),
  prompt: 'Add a watercolor effect to this image',
});

console.log(`Edited ${result.data.length} image(s)`);
```

```python filename="edit-image.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

result = client.images.edit(
    model='openai/gpt-image-2',
    image=open('source.png', 'rb'),
    prompt='Add a watercolor effect to this image',
)

print(f'Edited {len(result.data)} image(s)')
```

### Combine multiple images

Pass up to 16 source images to compose them into a single result:

```typescript filename="combine-images.ts"
const result = await openai.images.edit({
  model: 'openai/gpt-image-2',
  image: [
    createReadStream('body-lotion.png'),
    createReadStream('bath-bomb.png'),
    createReadStream('soap.png'),
  ],
  prompt: 'Create a lovely gift basket with these three items in it',
});
```

```python filename="combine-images.py"
result = client.images.edit(
    model='openai/gpt-image-2',
    image=[
        open('body-lotion.png', 'rb'),
        open('bath-bomb.png', 'rb'),
        open('soap.png', 'rb'),
    ],
    prompt='Create a lovely gift basket with these three items in it',
)
```

### Replace part of an image with a mask

Pass a `mask` to restrict the edit to a specific region. The mask must be the same size as the source image, and its transparent areas mark the region to replace:

```typescript filename="edit-image-mask.ts"
const result = await openai.images.edit({
  model: 'openai/gpt-image-2',
  image: createReadStream('living-room.png'),
  mask: createReadStream('mask.png'),
  prompt: 'Place a potted fern in the empty corner',
});
```

```python filename="edit-image-mask.py"
result = client.images.edit(
    model='openai/gpt-image-2',
    image=open('living-room.png', 'rb'),
    mask=open('mask.png', 'rb'),
    prompt='Place a potted fern in the empty corner',
)
```

> **💡 Note:** Not every model supports masks. Models without mask support return a warning
> in the response and apply the prompt to the whole image.

### Reference images by URL

To reference images you already host instead of uploading bytes, send a JSON body. Each entry in `images` takes an `image_url` that is either an `https` URL or a base64 `data:` URL:

```bash filename="edit-image-url.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/images/edits" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-image-2",
    "prompt": "Add a watercolor effect to this image",
    "images": [{ "image_url": "https://example.com/source.png" }]
  }'
```

> **💡 Note:** Referencing images by `file_id` is not supported, because AI Gateway does not
> implement the OpenAI Files API. Upload the image bytes or pass an `image_url`
> instead. Streaming partial edit results is also unsupported: requests return
> the completed image as a single JSON response.

## Python

You can use the OpenAI Python client to generate images with the AI Gateway:

```python filename="generate-image.py"
import base64
import os
from datetime import datetime

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

def main():
    # Initialize the OpenAI client with AI Gateway
    client = OpenAI(
        api_key=os.getenv("AI_GATEWAY_API_KEY"),
        base_url="https://ai-gateway.vercel.sh/v1",
    )

    # Generate an image
    result = client.images.generate(
        model="bfl/flux-2-pro",
        prompt="A majestic blue whale breaching the ocean surface at sunset",
        n=1,
        response_format="b64_json",
    )

    if not result.data:
        raise Exception("No image data received")

    print(f"Generated {len(result.data)} image(s)")

    # Save images to disk
    for i, image in enumerate(result.data):
        if image.b64_json:
            image_bytes = base64.b64decode(image.b64_json)
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            output_file = f"output/image_{timestamp}_{i+1}.png"

            with open(output_file, "wb") as f:
                f.write(image_bytes)
            print(f"Saved image to {output_file}")

if __name__ == "__main__":
    main()
```

## REST API

You can use the OpenAI Images API directly via REST without a client library:

```typescript filename="generate-image-rest.ts"
import 'dotenv/config';

async function main() {
  const apiKey = process.env.AI_GATEWAY_API_KEY;
  const baseURL = 'https://ai-gateway.vercel.sh/v1';

  // Send POST request to images/generations endpoint
  const response = await fetch(`${baseURL}/images/generations`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'bfl/flux-2-pro',
      prompt: `A playful dolphin pod jumping through ocean waves at sunrise with seabirds flying overhead`,
      providerOptions: {
        blackForestLabs: { outputFormat: 'jpeg' },
      },
      n: 3,
    }),
  });

  if (!response.ok) {
    throw new Error(`Image generation failed: ${response.status}`);
  }

  const json = await response.json();

  // Images are returned as base64 strings in json.data
  for (const image of json.data) {
    if (image.b64_json) {
      console.log(
        'Generated image (base64):',
        image.b64_json.substring(0, 50) + '...',
      );
    }
  }

  console.log('Generated', json.data.length, 'image(s)');
}

main().catch(console.error);
```


---

[View full sitemap](/docs/sitemap)
