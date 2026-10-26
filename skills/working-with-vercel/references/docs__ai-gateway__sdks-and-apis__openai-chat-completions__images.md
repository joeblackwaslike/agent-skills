---
title: OpenAI Chat Completions Images and PDFs with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openai-chat-completions/images
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/images"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/chat-completions
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation
summary: Send images and PDF documents to a model using the OpenAI Chat Completions API through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/images.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "153b98196639562224de5d4e005d4c6f025df605e0a48a0cc913255b71f2fd12"
---

# OpenAI Chat Completions Images and PDFs with AI Gateway

Send images and PDFs alongside your text prompt by using an array of content parts in place of a plain string. Every part carries its own `type`, so one message can mix text, images, and documents.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenAI Responses Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/images) — Send images and PDF documents for analysis using the OpenAI Responses API through AI Gateway.
- [OpenResponses Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/images) — Send images and PDF documents for analysis using the OpenResponses API through AI Gateway.
- [Python with AI Gateway: OpenAI and Anthropic SDKs](https://vercel.com/docs/ai-gateway/sdks-and-apis/python) — Use AI Gateway with Python through OpenAI or Anthropic SDKs with full streaming, tool calling, and async support.
- [OpenAI Chat Completions Streaming with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/streaming) — Stream OpenAI Chat Completions responses token by token as they are generated through AI Gateway.
- [AI Gateway Vision and Image Input](https://vercel.com/docs/ai-gateway/inputs-and-tools/vision) — Analyze images with AI Gateway using AI SDK 7, the Python beta, Chat Completions, Messages, and Responses APIs.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openai-chat-completions/images.graph.md](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/images.graph.md)
<!-- /docsgraph:related -->

Model support varies. Check the [models list](/ai-gateway/models) for a model's input modalities before sending an attachment.

## Image attachments

Send images as part of your chat completion request.

Example request

#### TypeScript

```typescript filename="image-analysis.ts"
import fs from 'node:fs';
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// Read the image file as base64
const imageBuffer = fs.readFileSync('./image.png');
const imageBase64 = imageBuffer.toString('base64');

const completion = await openai.chat.completions.create({
  model: 'anthropic/claude-opus-5',
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: 'Describe this image in detail.' },
        {
          type: 'image_url',
          image_url: {
            url: `data:image/png;base64,${imageBase64}`,
            detail: 'auto',
          },
        },
      ],
    },
  ],
  stream: false,
});

console.log('Assistant:', completion.choices[0].message.content);
console.log('Tokens used:', completion.usage);
```

#### Python

```python filename="image-analysis.py"
import os
import base64
from openai import OpenAI

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = OpenAI(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh/v1'
)

# Read the image file as base64
with open('./image.png', 'rb') as image_file:
    image_base64 = base64.b64encode(image_file.read()).decode('utf-8')

completion = client.chat.completions.create(
    model='anthropic/claude-opus-5',
    messages=[
        {
            'role': 'user',
            'content': [
                {'type': 'text', 'text': 'Describe this image in detail.'},
                {
                    'type': 'image_url',
                    'image_url': {
                        'url': f'data:image/png;base64,{image_base64}',
                        'detail': 'auto'
                    }
                }
            ]
        }
    ],
    stream=False,
)

print('Assistant:', completion.choices[0].message.content)
print('Tokens used:', completion.usage)
```

#### cURL

```bash filename="image-analysis.sh"
IMAGE_B64=$(base64 -i image.png)

curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "messages": [
      {
        "role": "user",
        "content": [
          { "type": "text", "text": "What is in this image?" },
          {
            "type": "image_url",
            "image_url": { "url": "data:image/png;base64,'"$IMAGE_B64"'" }
          }
        ]
      }
    ]
  }'
```

## PDF attachments

Send PDF documents as part of your chat completion request.

Example request

#### TypeScript

```typescript filename="pdf-analysis.ts"
import fs from 'node:fs';
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// Read the PDF file as base64
const pdfBuffer = fs.readFileSync('./document.pdf');
const pdfBase64 = pdfBuffer.toString('base64');

const completion = await openai.post<OpenAI.Chat.Completions.ChatCompletion>(
  '/chat/completions',
  {
    body: {
      model: 'anthropic/claude-opus-5',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'What is the main topic of this document? Please summarize the key points.',
            },
            {
              type: 'file',
              file: {
                data: pdfBase64,
                media_type: 'application/pdf',
                filename: 'document.pdf',
              },
            },
          ],
        },
      ],
      stream: false,
    },
  },
);

console.log('Assistant:', completion.choices[0].message.content);
console.log('Tokens used:', completion.usage);
```

#### Python

```python filename="pdf-analysis.py"
import os
import base64
from openai import OpenAI

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = OpenAI(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh/v1'
)

# Read the PDF file as base64
with open('./document.pdf', 'rb') as pdf_file:
    pdf_base64 = base64.b64encode(pdf_file.read()).decode('utf-8')

completion = client.chat.completions.create(
    model='anthropic/claude-opus-5',
    messages=[
        {
            'role': 'user',
            'content': [
                {
                    'type': 'text',
                    'text': 'What is the main topic of this document? Please summarize the key points.'
                },
                {
                    'type': 'file',
                    'file': {
                        'data': pdf_base64,
                        'media_type': 'application/pdf',
                        'filename': 'document.pdf'
                    }
                }
            ]
        }
    ],
    stream=False,
)

print('Assistant:', completion.choices[0].message.content)
print('Tokens used:', completion.usage)
```

#### cURL

```bash filename="pdf-analysis.sh"
PDF_B64=$(base64 -i document.pdf)

curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "messages": [
      {
        "role": "user",
        "content": [
          { "type": "text", "text": "Summarize this document." },
          {
            "type": "file",
            "file": {
              "filename": "document.pdf",
              "file_data": "data:application/pdf;base64,'"$PDF_B64"'"
            }
          }
        ]
      }
    ]
  }'
```

## Next steps

- [Chat completions](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/chat-completions) - Request and response shapes for text
- [Image generation](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation) - Generate images rather than send them


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
