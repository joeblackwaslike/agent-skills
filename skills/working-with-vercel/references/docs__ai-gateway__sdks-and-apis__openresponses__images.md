---
title: File Attachments
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openresponses/images
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/images"
last_updated: 2026-07-27
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/sdks-and-apis/openresponses/text-generation
  - /docs/ai-gateway/sdks-and-apis/openresponses/tool-calling
summary: Send images and PDF documents for analysis using the OpenResponses API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/images.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "717bd940e27c3e4ffd8302377f134ccc0bdfb21fb8a39a4bf0ab7ba765c338d9"
---

# File Attachments

The [OpenResponses API](/docs/ai-gateway/sdks-and-apis/openresponses) accepts images and PDFs alongside text. Replace the plain string in a message's `content` with an array of parts: `input_text` for the prompt, `input_image` for an image, `input_file` for a document.

#### \['cURL'

```bash filename="image-input.sh"
IMAGE_B64=$(base64 -i diagram.png)

curl https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "input": [
      {
        "type": "message",
        "role": "user",
        "content": [
          { "type": "input_text", "text": "Describe this image in one sentence." },
          {
            "type": "input_image",
            "image_url": "data:image/png;base64,'"$IMAGE_B64"'",
            "detail": "auto"
          }
        ]
      }
    ]
  }'
```

#### 'TypeScript'

```typescript filename="image-input.ts"
import fs from 'node:fs';

const apiKey = process.env.AI_GATEWAY_API_KEY;
const imageBase64 = fs.readFileSync('./diagram.png').toString('base64');

const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'anthropic/claude-opus-5',
    input: [
      {
        type: 'message',
        role: 'user',
        content: [
          { type: 'input_text', text: 'Describe this image in one sentence.' },
          {
            type: 'input_image',
            image_url: `data:image/png;base64,${imageBase64}`,
            detail: 'auto',
          },
        ],
      },
    ],
  }),
});

const result = await response.json();
const message = result.output.find((item) => item.type === 'message');
console.log(message.content[0].text);
```

#### 'Python']

```python filename="image_input.py"
import base64
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

with open('diagram.png', 'rb') as f:
    image_base64 = base64.b64encode(f.read()).decode()

response = client.responses.create(
    model='anthropic/claude-opus-5',
    input=[
        {
            'type': 'message',
            'role': 'user',
            'content': [
                {'type': 'input_text', 'text': 'Describe this image in one sentence.'},
                {
                    'type': 'input_image',
                    'image_url': f'data:image/png;base64,{image_base64}',
                    'detail': 'auto',
                },
            ],
        },
    ],
)

message = next(item for item in response.output if item.type == 'message')
print(message.content[0].text)
```

## Public image URLs

`image_url` also takes a plain URL, as long as the host serves it without authentication:

```typescript
{
  type: 'input_image',
  image_url: 'https://example.com/diagram.png',
  detail: 'auto',
}
```

If the host blocks the request, the gateway returns a 400 naming the upstream status rather than falling back. Use base64 for anything behind a login or a signed URL.

## PDF documents

Send a PDF with an `input_file` part. The document is passed to the model as a document, not rasterized, so the model reads its text directly:

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
        "type": "message",
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

const pdfBase64 = fs.readFileSync('./report.pdf').toString('base64');

const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
  },
  body: JSON.stringify({
    model: 'anthropic/claude-opus-5',
    input: [
      {
        type: 'message',
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
  }),
});

const result = await response.json();
const message = result.output.find((item) => item.type === 'message');
console.log(message.content[0].text);
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
            'type': 'message',
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

message = next(item for item in response.output if item.type == 'message')
print(message.content[0].text)
```

## Detail parameter

`detail` controls the resolution the model analyzes an image at:

- `auto` - Let the model decide
- `low` - Lower resolution, fewer input tokens, faster
- `high` - Higher resolution, more input tokens, better for small text and fine detail

## Next steps

- [Text generation](/docs/ai-gateway/sdks-and-apis/openresponses/text-generation) - Request and response shapes for text
- [Tool calling](/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling) - Let the model call your functions


---

[View full sitemap](/docs/sitemap)
