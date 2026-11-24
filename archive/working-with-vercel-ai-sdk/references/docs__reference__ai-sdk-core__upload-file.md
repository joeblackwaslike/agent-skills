---
title: uploadFile
description: API Reference for uploadFile.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/upload-file"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/upload-file.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "be0999d0abb738ff6917cfded68260d79096c49247c7f36c604528c7ba122107"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Uploads a file to a provider and returns a result whose `providerReference` (a
`ProviderReference`) can be used in subsequent API calls, such as in message
content parts passed to `generateText` or `streamText`.

```ts
import { uploadFile } from 'ai';
import { openai } from '@ai-sdk/openai';
import fs from 'node:fs';

const { providerReference } = await uploadFile({
  api: openai.files(),
  data: fs.readFileSync('./photo.png'),
  filename: 'photo.png',
});
```

## Import

```
import { uploadFile } from "ai"
```

## API Signature

### Parameters

- `api` (`FilesV4 | ProviderV4`): The files API interface to use for uploading. Can be a \`FilesV4\` instance (e.g. \`openai.files()\`) or a provider instance directly (e.g. \`openai\`), in which case \`.files()\` is called automatically.
- `data` (`DataContent | { type: "stream"; stream: ReadableStream<Uint8Array> }`): The file data to upload. Can be a \`Uint8Array\`, a base64-encoded string, an \`ArrayBuffer\`, a \`Buffer\`, or a tagged \`\{ type: "stream", stream }\` shape for providers that support streaming uploads (sent without buffering; other providers reject with an \`UnsupportedFunctionalityError\`). The provider consumes the stream — any failed upload (including validation failures before a request is made) cancels it, and it must not be reused. URLs are not supported — fetch the content first and pass the bytes.
- `mediaType?` (`string`): IANA media type of the file (e.g. \`image/png\`, \`application/pdf\`). Auto-detected from the file bytes if not provided; stream data cannot be sniffed and defaults to \`application/octet-stream\`.
- `filename?` (`string`): Filename for the uploaded file. Multipart-based providers default it to \`"blob"\` when omitted.
- `abortSignal?` (`AbortSignal`): Signal to cancel the upload.
- `headers?` (`Record<string, string>`): Additional HTTP headers to send with the request.
- `providerOptions?` (`ProviderOptions`): Additional provider-specific options. For example, OpenAI accepts a \`purpose\` field, which defaults to \`"assistants"\`.

### Returns

- `providerReference` (`ProviderReference`): A \`Record\<string, string>\` mapping provider names to provider-specific file identifiers. Pass this as the \`data\` or \`image\` field in message content parts.
- `byteSize?` (`number`): Size of the uploaded file in bytes, if reported by the provider.
- `createdAt?` (`Date`): When the file was created, if reported by the provider.
- `expiresAt?` (`Date`): When the provider will delete the file (retention expiry, e.g. from a requested upload TTL), if reported by the provider.
- `providerMetadata?` (`ProviderMetadata`): Additional provider-specific metadata returned from the upload.
- `warnings` (`Warning[]`): Warnings from the provider (e.g. unsupported settings).

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)