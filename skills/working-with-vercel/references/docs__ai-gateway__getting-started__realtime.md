---
title: AI Gateway Realtime Quickstart
product: vercel
url: /docs/ai-gateway/getting-started/realtime
canonical_url: "https://vercel.com/docs/ai-gateway/getting-started/realtime"
last_updated: 2026-09-15
type: tutorial
prerequisites:
  - /docs/ai-gateway/getting-started
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/modalities/realtime/gpt-live
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/modalities/realtime
summary: Start a realtime speech session using AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/getting-started/realtime.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "cfe2af6e4558619d37093ce8fdaccf2fdf82f0030cccbc12d3220217221032b9"
---

# AI Gateway Realtime Quickstart

Start a realtime speech session through AI Gateway.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Gemini 3.8 Live models now available on AI Gateway](https://vercel.com/changelog/gemini-3-8-live-models-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Frealtime&source_site=vercel-docs&relationship=related)
- [Realtime voice, speech, and transcription now supported on AI Gateway](https://vercel.com/changelog/realtime-voice-speech-and-transcription-now-supported-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Frealtime&source_site=vercel-docs&relationship=related)
- [xAI Grok audio models now available on Vercel AI Gateway](https://vercel.com/changelog/xai-grok-audio-models-now-available-on-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Frealtime&source_site=vercel-docs&relationship=related)
- [Build realtime voice agents on AI Gateway](https://vercel.com/blog/realtime-voice-agents-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Frealtime&source_site=vercel-docs&relationship=related)
- [Realtime](https://ai-sdk.dev/docs/ai-sdk-core/realtime?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Frealtime&source_site=vercel-docs&relationship=related)
- [GPT-Live 1 now available on AI Gateway](https://vercel.com/changelog/gpt-live-1-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Frealtime&source_site=vercel-docs&relationship=related)
- [Video Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/video?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Frealtime&source_site=vercel-docs&relationship=related) — Generate a video from a text prompt using AI Gateway.
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Frealtime&source_site=vercel-docs&relationship=related) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X

Full cross-link map for this page: [/docs/ai-gateway/getting-started/realtime.graph.md](/docs/ai-gateway/getting-started/realtime.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Frealtime&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

This quickstart uses `openai/gpt-realtime-2`. For `openai/gpt-live-1`, follow the [GPT-Live guide](/docs/ai-gateway/modalities/realtime/gpt-live) instead. GPT-Live requires its own endpoint and session events; changing the model slug in this example does not select the Live protocol.

## Start a realtime session

### Use a coding agent

Paste this prompt into a coding agent with terminal access:

**Agent prompt**

```text
Add a realtime speech session through AI Gateway in the current environment. Use the AI Gateway skill for this task. If it is unavailable, run npx skills add vercel/vercel-plugin --skill ai-gateway, then find and read its SKILL.md before continuing. Reuse the environment's language, framework, package manager, and interface when possible, choose an AI Gateway SDK or API that supports realtime speech, and add only required dependencies. Read AI_GATEWAY_API_KEY from the environment. If it is missing, run npx vercel@latest whoami and pause for login if needed. Determine the team, then run npx vercel@latest --scope <team-slug> ai-gateway api-keys create --name <descriptive-name>. Capture stdout directly into AI_GATEWAY_API_KEY for the request or existing ignored secret storage, and never expose the value. Use openai/gpt-realtime-2, start a session, handle its transcript or audio in the existing interface, run the result, and report the output.
```

### Run the Node.js example

Use [Node.js 22.18 or later](https://nodejs.org/) and a team with available [AI Gateway Credits](/docs/ai-gateway/pricing). Export `AI_GATEWAY_API_KEY` in your current shell. If you need a key, open the [Create API Key dialog](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys%3FshowCreateKeyModal%3Dtrue\&title=AI+Gateway+API+Keys).

```bash filename="Terminal"
export AI_GATEWAY_API_KEY="your_ai_gateway_api_key"
```

Install the AI Gateway provider and WebSocket client:

```bash filename="Terminal"
pnpm add @ai-sdk/gateway@latest ws
```

Create `realtime.mts`:

```typescript filename="realtime.mts"
import { gateway } from '@ai-sdk/gateway';
import WebSocket from 'ws';

const modelId = 'openai/gpt-realtime-2';
const { token, url } = await gateway.experimental_realtime.getToken({
  model: modelId,
});
const model = gateway.experimental_realtime(modelId);
const config = model.getWebSocketConfig({ token, url });
const ws = new WebSocket(config.url, config.protocols);

const send = async (event: Parameters<typeof model.serializeClientEvent>[0]) =>
  ws.send(JSON.stringify(await model.serializeClientEvent(event)));

ws.on('open', async () => {
  await send({
    type: 'conversation-item-create',
    item: {
      type: 'text-message',
      role: 'user',
      text: 'Say hello in one sentence.',
    },
  });
  await send({ type: 'response-create' });
});

ws.on('message', (data) => {
  const parsed = model.parseServerEvent(JSON.parse(data.toString()));

  for (const event of Array.isArray(parsed) ? parsed : [parsed]) {
    if (event.type === 'audio-transcript-delta') {
      process.stdout.write(event.delta);
    }
    if (event.type === 'response-done') {
      console.log();
      ws.close();
    }
    if (event.type === 'error') {
      console.error(event.message);
      ws.close();
    }
  }
});
```

Run the script:

```bash filename="Terminal"
node realtime.mts
```

## Next steps

- Build a live browser voice agent with a server-minted token in the [Realtime guide](/docs/ai-gateway/modalities/realtime#browser-voice-agent)
- Configure [sessions and limits](/docs/ai-gateway/modalities/realtime#session-config)
- Browse [realtime models](/ai-gateway/models)


---

[View full sitemap](/docs/sitemap)
