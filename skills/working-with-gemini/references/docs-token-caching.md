---
source: "https://raw.githubusercontent.com/google-gemini/gemini-cli/main/docs/cli/token-caching.md"
fetched_at: "2026-06-15T05:55:14.234Z"
sha256: "0cd2b222377c8874b7cb4e52fc8f61e198643e716aea987855d0d4780ad54f12"
---

# Token caching and cost optimization

Gemini CLI automatically optimizes API costs through token caching when using
API key authentication (Gemini API key or Vertex AI). This feature reuses
previous system instructions and context to reduce the number of tokens
processed in subsequent requests.

**Token caching is available for:**

- API key users (Gemini API key)
- Vertex AI users (with project and location setup)

**Token caching is not available for:**

- OAuth users (Google Personal/Enterprise accounts) - the Code Assist API does
  not support cached content creation at this time

You can view your token usage and cached token savings using the `/stats`
command. When cached tokens are available, they will be displayed in the stats
output.
