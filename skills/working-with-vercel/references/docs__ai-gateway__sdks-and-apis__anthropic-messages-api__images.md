---
title: File Attachments
product: vercel
url: /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/images
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/images"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
  - /docs/ai-gateway/sdks-and-apis
related:
  []
summary: Send images and PDF documents as part of your Anthropic API message requests.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/images.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "25e6bc6886866bc7ef0a94326cabf18b9c48db4a6e61cde0dee64b369af15163"
---

# File Attachments

Send images and PDF documents as part of your message request.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [File Attachments](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fimages&source_site=vercel-docs&relationship=related) — Send images and PDF documents to a model using the OpenAI Chat Completions API.
- [File Attachments](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fimages&source_site=vercel-docs&relationship=related) — Send images and PDF documents for analysis using the OpenResponses API.
- [File Attachments](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fimages&source_site=vercel-docs&relationship=related) — Send images and PDF documents for analysis using the OpenAI Responses API through AI Gateway.
- [File Uploads](https://chat-sdk.dev/docs/files?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fimages&source_site=vercel-docs&relationship=related) — Send and receive files across chat platforms.
- [Images, videos, and file uploads](https://v0.app/docs/images-and-videos?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fimages&source_site=vercel-docs&relationship=related) — Attach media, documents, code, and other supported assets to give v0 context or add them to your application.
- [Messages](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fimages&source_site=vercel-docs&relationship=related) — Create messages using the Anthropic Messages API format with support for streaming.
- [Python](https://vercel.com/docs/ai-gateway/sdks-and-apis/python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fimages&source_site=vercel-docs&relationship=related) — Use the AI Gateway with Python through OpenAI or Anthropic SDKs with full streaming, tool calling, and async support.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/images.graph.md](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/images.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fimages&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Example request

#### cURL

```bash filename="attachments.sh"
PDF_B64=$(base64 -i document.pdf)
IMAGE_B64=$(base64 -i image.png)

curl -X POST "https://ai-gateway.vercel.sh/v1/messages" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "max_tokens": 1024,
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "document",
            "source": {
              "type": "base64",
              "media_type": "application/pdf",
              "data": "'"$PDF_B64"'"
            }
          },
          {
            "type": "image",
            "source": {
              "type": "base64",
              "media_type": "image/png",
              "data": "'"$IMAGE_B64"'"
            }
          },
          {
            "type": "text",
            "text": "What do this document and image show?"
          }
        ]
      }
    ]
  }'
```

#### TypeScript

```typescript filename="file-attachment.ts"
import Anthropic from '@anthropic-ai/sdk';
import fs from 'node:fs';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const anthropic = new Anthropic({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh',
});

// Read files as base64
const pdfData = fs.readFileSync('./document.pdf');
const imageData = fs.readFileSync('./image.png');

const pdfBase64 = pdfData.toString('base64');
const imageBase64 = imageData.toString('base64');

const message = await anthropic.messages.create({
  model: 'anthropic/claude-opus-5',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'document',
          source: {
            type: 'base64',
            media_type: 'application/pdf',
            data: pdfBase64,
          },
        },
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: 'image/png',
            data: imageBase64,
          },
        },
        {
          type: 'text',
          text: 'Please summarize the PDF and describe the image.',
        },
      ],
    },
  ],
});

console.log('Response:', message.content[0].text);
```

#### Python

```python filename="file-attachment.py"
import os
import base64
import anthropic

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = anthropic.Anthropic(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh'
)

# Read files as base64
with open('./document.pdf', 'rb') as f:
    pdf_base64 = base64.b64encode(f.read()).decode('utf-8')

with open('./image.png', 'rb') as f:
    image_base64 = base64.b64encode(f.read()).decode('utf-8')

message = client.messages.create(
    model='anthropic/claude-opus-5',
    max_tokens=1024,
    messages=[
        {
            'role': 'user',
            'content': [
                {
                    'type': 'document',
                    'source': {
                        'type': 'base64',
                        'media_type': 'application/pdf',
                        'data': pdf_base64,
                    },
                },
                {
                    'type': 'image',
                    'source': {
                        'type': 'base64',
                        'media_type': 'image/png',
                        'data': image_base64,
                    },
                },
                {
                    'type': 'text',
                    'text': 'Please summarize the PDF and describe the image.',
                },
            ],
        }
    ],
)

print('Response:', message.content[0].text)
```

### Supported file types

- **Images**: `image/jpeg`, `image/png`, `image/gif`, `image/webp`
- **Documents**: `application/pdf`


---

[View full sitemap](/docs/sitemap)
