---
source: "https://raw.githubusercontent.com/google-gemini/gemini-cli/main/packages/sdk/README.md"
fetched_at: "2026-06-15T05:55:14.234Z"
sha256: "7b0a525f099a7a4b717baf31ae83e191d58c01d8384e033988c6639043558054"
---

# @google/gemini-cli-sdk

The Gemini CLI SDK provides a programmatic interface to interact with Gemini
models and tools.

## Installation

```bash
npm install @google/gemini-cli-sdk
```

## Usage

```typescript
import { GeminiCliAgent } from '@google/gemini-cli-sdk';

async function main() {
  const agent = new GeminiCliAgent({
    instructions: 'You are a helpful assistant.',
  });

  const controller = new AbortController();
  const signal = controller.signal;

  // Stream responses from the agent
  const stream = agent.sendStream('Why is the sky blue?', signal);

  for await (const chunk of stream) {
    if (chunk.type === 'content') {
      process.stdout.write(chunk.value.text || '');
    }
  }
}

main().catch(console.error);
```
