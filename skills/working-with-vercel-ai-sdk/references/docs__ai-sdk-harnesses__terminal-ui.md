---
title: Terminal UI
description: "Use @ai-sdk/tui with HarnessAgent."
url: "https://ai-sdk.dev/docs/ai-sdk-harnesses/terminal-ui"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/ai-sdk-harnesses/terminal-ui.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "c7c6ffc26cbdd3f52d86203d0bcdc32d79d211d68df902fc824913c06d10b8a8"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

`@ai-sdk/tui` can render harness streams, tool calls, reasoning sections, and
approval prompts in a terminal. Because `HarnessAgent` requires a session on
every call, wrap it with a small `AgentTUIAgent` adapter that injects one
session for the lifetime of the terminal UI.

## Installation

**Packages:** `@ai-sdk/tui`, `@ai-sdk/harness`, `@ai-sdk/harness-codex`, `@ai-sdk/sandbox-vercel`

## Example

```ts title='tui.ts'
import { HarnessAgent, type HarnessAgentSession } from '@ai-sdk/harness/agent';
import { codex } from '@ai-sdk/harness-codex';
import { createVercelNetworkSandboxSession } from '@ai-sdk/sandbox-vercel';
import { runAgentTUI, type AgentTUIAgent } from '@ai-sdk/tui';

const agent = new HarnessAgent({
  harness: codex,
});

function createTUIAgent({
  agent,
  session,
}: {
  agent: HarnessAgent<any, any, any>;
  session: HarnessAgentSession;
}): AgentTUIAgent {
  return {
    version: 'agent-v1',
    id: agent.id,
    tools: agent.tools,
    generate(request) {
      return agent.generate({
        ...request,
        session,
      } as Parameters<typeof agent.generate>[0]);
    },
    stream(request) {
      return agent.stream({
        ...request,
        session,
      } as Parameters<typeof agent.stream>[0]);
    },
  } as AgentTUIAgent;
}

const sandboxSession = await createVercelNetworkSandboxSession({
  runtime: 'node24',
  ports: [4000],
  template: await agent.getSandboxTemplate(),
});
const session = await agent.createSession({ sandboxSession });

try {
  await runAgentTUI({
    title: 'Codex',
    agent: createTUIAgent({ agent, session }),
    tools: 'auto-collapsed',
    reasoning: 'collapsed',
  });
} finally {
  await session.destroy();
  await sandboxSession.destroy();
}
```

The terminal UI runs until the user exits with `Esc` or `Ctrl+C`.

Use one session per terminal run. For long-lived terminal tools, persist the
state from `session.detach()` or `session.stop()` if you need to resume later.

## Related

- [Terminal UI](/docs/agents/terminal-ui)
- [runAgentTUI API Reference](/docs/reference/ai-sdk-tui/run-agent-tui)
- [HarnessAgent](/docs/ai-sdk-harnesses/harness-agent)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)