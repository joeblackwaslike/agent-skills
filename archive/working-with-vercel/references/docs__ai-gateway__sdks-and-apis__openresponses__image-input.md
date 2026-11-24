---
title: Image Input
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openresponses/image-input
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/image-input"
last_updated: 2026-02-26
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/openresponses
summary: Send images for analysis using the OpenResponses API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/image-input.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "ec45e3c8a28184a06db1f4c229f865f78d384539311b789475f6120bce4c4674"
---

# Image Input

The [OpenResponses API](/docs/ai-gateway/sdks-and-apis/openresponses) supports sending images alongside text for vision-capable models to analyze. Include an `image_url` object in your message content array with either a public URL or a base64-encoded data URI. The `detail` parameter controls the resolution used for analysis.

```typescript filename="image-input.ts"
const apiKey = process.env.AI_GATEWAY_API_KEY;

const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'zai/glm-4.7',
    input: [
      {
        type: 'message',
        role: 'user',
        content: [
          { type: 'text', text: 'Describe this image in detail.' },
          {
            type: 'image_url',
            image_url: { url: 'https://example.com/image.jpg', detail: 'auto' },
          },
        ],
      },
    ],
  }),
});
```

## Base64-encoded images

You can also use base64-encoded images:

```typescript
{
  type: 'image_url',
  image_url: {
    url: `data:image/png;base64,${imageBase64}`,
    detail: 'high',
  },
}
```

## Detail parameter

The `detail` parameter controls image resolution:

- `auto` - Let the model decide the appropriate resolution
- `low` - Use lower resolution for faster processing
- `high` - Use higher resolution for more detailed analysis


---

[View full sitemap](/docs/sitemap)
