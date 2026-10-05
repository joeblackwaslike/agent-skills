---
title: AI SDK Harnesses
description: Learn how to use AI SDK harness adapters.
url: "https://ai-sdk.dev/providers/ai-sdk-harnesses"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/ai-sdk-harnesses.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "716911985d27f0e124ffdc021fc5ca51cf1565a27474723c5f6887bf130d945c"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

AI SDK harness adapters connect `HarnessAgent` to established agent runtimes.
They are separate from model providers, but they expose AI SDK-compatible stream
and response primitives.

#### [Claude Code](/providers/ai-sdk-harnesses/claude-code)

Use Claude Code through the AI SDK harness abstraction.

#### [Cline](/providers/ai-sdk-harnesses/cline)

Use the Cline SDK through the AI SDK harness abstraction.

#### [Codex](/providers/ai-sdk-harnesses/codex)

Use Codex through the AI SDK harness abstraction.

#### [Cursor](/providers/ai-sdk-harnesses/cursor)

Use Cursor through the AI SDK harness abstraction.

#### [fx](/providers/ai-sdk-harnesses/fx)

Use fx through the AI SDK harness abstraction.

#### [GitHub Copilot](/providers/ai-sdk-harnesses/github-copilot)

Use GitHub Copilot through the AI SDK harness abstraction.

#### [Grok Build](/providers/ai-sdk-harnesses/grok-build)

Use Grok Build through the AI SDK harness abstraction.

#### [OpenCode](/providers/ai-sdk-harnesses/opencode)

Use OpenCode through the AI SDK harness abstraction.

#### [Pi](/providers/ai-sdk-harnesses/pi)

Use Pi through the AI SDK harness abstraction.

#### [Agent Client Protocol](/providers/ai-sdk-harnesses/acp)

Use any ACP compatible harness through the AI SDK harness abstraction.

## Usage

All harness adapters are used with `HarnessAgent`:

```ts
import { HarnessAgent } from '@ai-sdk/harness/agent';
import { codex } from '@ai-sdk/harness-codex';
import { createVercelNetworkSandboxSession } from '@ai-sdk/sandbox-vercel';

const agent = new HarnessAgent({
  harness: codex,
  model: 'gpt-5.6-luna',
});

const sandboxSession = await createVercelNetworkSandboxSession({
  runtime: 'node24',
  ports: [4000],
  template: await agent.getSandboxTemplate(),
});
const session = await agent.createSession({ sandboxSession });
try {
  console.log(
    (await agent.generate({ session, prompt: 'Inspect this project.' })).text,
  );
} finally {
  await session.destroy();
  await sandboxSession.destroy();
}
```

Read the [Harnesses](/docs/ai-sdk-harnesses) documentation for sessions,
tools, UI, and terminal usage.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)