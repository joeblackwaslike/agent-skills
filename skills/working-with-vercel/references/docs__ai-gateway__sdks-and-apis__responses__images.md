---
title: File Attachments
product: vercel
url: /docs/ai-gateway/sdks-and-apis/responses/images
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/images"
last_updated: 2026-07-27
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/responses/text-generation
  - /docs/ai-gateway/sdks-and-apis/responses/tool-calling
summary: Send images and PDF documents for analysis using the OpenAI Responses API through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/images.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "cf38249c9b87ab959d8ecda07538a46c064c973219b04822399b400b0eeeae86"
---

# File Attachments

Vision-capable models accept images and PDFs alongside your prompt. Replace the plain string in `input` with an array of content parts: `input_text` for the prompt, `input_image` for an image, `input_file` for a document.

#### \['cURL'

```bash filename="image-input.sh"
curl https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "input": [
      {
        "role": "user",
        "content": [
          { "type": "input_text", "text": "Describe this image in one sentence." },
          {
            "type": "input_image",
            "image_url": "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png",
            "detail": "auto"
          }
        ]
      }
    ]
  }'
```

#### 'TypeScript'

```typescript filename="image-input.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'anthropic/claude-opus-5',
  input: [
    {
      role: 'user',
      content: [
        { type: 'input_text', text: 'Describe this image in one sentence.' },
        {
          type: 'input_image',
          image_url:
            'https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png',
          detail: 'auto',
        },
      ],
    },
  ],
});

console.log(response.output_text);
```

#### 'Python']

```python filename="image_input.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.responses.create(
    model='anthropic/claude-opus-5',
    input=[
        {
            'role': 'user',
            'content': [
                {'type': 'input_text', 'text': 'Describe this image in one sentence.'},
                {
                    'type': 'input_image',
                    'image_url': 'https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png',
                    'detail': 'auto',
                },
            ],
        },
    ],
)

print(response.output_text)
```

## Base64-encoded images

For images that are not publicly reachable, send a data URI instead of a URL. The gateway forwards it to the provider, so no fetch happens from the provider's side:

```typescript filename="image-base64.ts"
import fs from 'node:fs';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const imageBase64 = fs.readFileSync('./diagram.png').toString('base64');

const response = await client.responses.create({
  model: 'anthropic/claude-opus-5',
  input: [
    {
      role: 'user',
      content: [
        { type: 'input_text', text: 'What does this diagram show?' },
        {
          type: 'input_image',
          image_url: `data:image/png;base64,${imageBase64}`,
          detail: 'auto',
        },
      ],
    },
  ],
});
```

A URL source must be reachable without authentication. If the host blocks the request, the gateway returns a 400 naming the upstream status rather than falling back, so use base64 for anything behind a login or a signed URL.

## PDF documents

Send a PDF with an `input_file` part. The model reads the document's text directly rather than working from a rasterized page:

#### \['cURL'

```bash filename="pdf-input.sh"
PDF_B64=$(base64 -i report.pdf)

curl https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "input": [
      {
        "role": "user",
        "content": [
          { "type": "input_text", "text": "What total does this document state?" },
          {
            "type": "input_file",
            "filename": "report.pdf",
            "file_data": "data:application/pdf;base64,'"$PDF_B64"'"
          }
        ]
      }
    ]
  }'
```

#### 'TypeScript'

```typescript filename="pdf-input.ts"
import fs from 'node:fs';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const pdfBase64 = fs.readFileSync('./report.pdf').toString('base64');

const response = await client.responses.create({
  model: 'anthropic/claude-opus-5',
  input: [
    {
      role: 'user',
      content: [
        { type: 'input_text', text: 'What total does this document state?' },
        {
          type: 'input_file',
          filename: 'report.pdf',
          file_data: `data:application/pdf;base64,${pdfBase64}`,
        },
      ],
    },
  ],
});

console.log(response.output_text);
```

#### 'Python']

```python filename="pdf_input.py"
import base64
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

with open('report.pdf', 'rb') as f:
    pdf_base64 = base64.b64encode(f.read()).decode()

response = client.responses.create(
    model='anthropic/claude-opus-5',
    input=[
        {
            'role': 'user',
            'content': [
                {'type': 'input_text', 'text': 'What total does this document state?'},
                {
                    'type': 'input_file',
                    'filename': 'report.pdf',
                    'file_data': f'data:application/pdf;base64,{pdf_base64}',
                },
            ],
        },
    ],
)

print(response.output_text)
```

## Detail parameter

`detail` controls the resolution the model analyzes the image at:

- `auto` - Let the model decide
- `low` - Lower resolution, fewer input tokens, faster
- `high` - Higher resolution, more input tokens, better for small text and fine detail

## Next steps

- [Text generation](/docs/ai-gateway/sdks-and-apis/responses/text-generation) - Request and response shapes for text
- [Tool calling](/docs/ai-gateway/sdks-and-apis/responses/tool-calling) - Let the model call your functions


---

[View full sitemap](/docs/sitemap)
