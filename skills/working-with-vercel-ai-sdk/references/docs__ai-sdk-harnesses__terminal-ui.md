---
source: "https://ai-sdk.dev/docs/ai-sdk-harnesses/terminal-ui.md"
fetched_at: "2026-07-13T06:59:02.188Z"
sha256: "e99c8033ea80ddb9e15ed3e636b816948e4f2d5e6b5a75936c731a01cfcf2e9a"
---

# Harnesses with Terminal UI

`@ai-sdk/tui` can render harness streams, tool calls, reasoning sections, and
approval prompts in a terminal. Because `HarnessAgent` requires a session on
every call, wrap it with a small `AgentTUIAgent` adapter that injects one
session for the lifetime of the terminal UI.

## Installation

<InstallPackages packages="@ai-sdk/tui @ai-sdk/harness @ai-sdk/harness-codex @ai-sdk/sandbox-vercel" />

## Example

```ts filename='tui.ts'
import { HarnessAgent, type HarnessAgentSession } from '@ai-sdk/harness/agent';
import { codex } from '@ai-sdk/harness-codex';
import { createVercelSandbox } from '@ai-sdk/sandbox-vercel';
import { runAgentTUI, type AgentTUIAgent } from '@ai-sdk/tui';

const agent = new HarnessAgent({
  harness: codex,
  sandbox: createVercelSandbox({
    runtime: 'node24',
    ports: [4000],
  }),
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

const session = await agent.createSession();

try {
  await runAgentTUI({
    title: 'Codex',
    agent: createTUIAgent({ agent, session }),
    tools: 'auto-collapsed',
    reasoning: 'collapsed',
  });
} finally {
  await session.destroy();
}
```

The terminal UI runs until the user exits with `Esc` or `Ctrl+C`.

Use one session per terminal run. For long-lived terminal tools, persist the
state from `session.detach()` or `session.stop()` if you need to resume later.

## Related

- [Terminal UI](/docs/agents/terminal-ui)
- [runAgentTUI API Reference](/docs/reference/ai-sdk-tui/run-agent-tui)
- [HarnessAgent](/docs/ai-sdk-harnesses/harness-agent)


## Navigation

- [Overview](/docs/ai-sdk-harnesses/overview)
- [HarnessAgent](/docs/ai-sdk-harnesses/harness-agent)
- [Tools](/docs/ai-sdk-harnesses/tools)
- [Skills](/docs/ai-sdk-harnesses/skills)
- [Harness Adapters](/docs/ai-sdk-harnesses/harness-adapters)
- [Workflow Utilities](/docs/ai-sdk-harnesses/workflow-utilities)
- [UI](/docs/ai-sdk-harnesses/ui)
- [Terminal UI](/docs/ai-sdk-harnesses/terminal-ui)


[Full Sitemap](/sitemap.md)
