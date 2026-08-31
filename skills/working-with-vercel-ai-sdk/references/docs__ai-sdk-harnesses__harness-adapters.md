---
source: "https://ai-sdk.dev/docs/ai-sdk-harnesses/harness-adapters.md"
fetched_at: "2026-08-31T10:43:45.904Z"
sha256: "074637d0f73e759319599a0d5971de9092847f7910a13939f24a25cb0e54d64b"
---

# Harness Adapters

Harness adapters connect `HarnessAgent` to a specific agent runtime. They are
the harness equivalent of AI SDK model providers: each adapter wraps one runtime
and normalizes its sessions, stream events, tools, usage, lifecycle state, and
configuration into the harness contract.

## AI SDK Harness Adapters

The AI SDK includes the following harness adapters:

- [Claude Code](/providers/ai-sdk-harnesses/claude-code) (`@ai-sdk/harness-claude-code`)
- [Cline](/providers/ai-sdk-harnesses/cline) (`@ai-sdk/harness-cline`)
- [Codex](/providers/ai-sdk-harnesses/codex) (`@ai-sdk/harness-codex`)
- [Cursor](/providers/ai-sdk-harnesses/cursor) (`@ai-sdk/harness-cursor`)
- [Deep Agents](/providers/ai-sdk-harnesses/deepagents) (`@ai-sdk/harness-deepagents`)
- [fx](/providers/ai-sdk-harnesses/fx) (`@ai-sdk/harness-fx`)
- [Grok Build](/providers/ai-sdk-harnesses/grok-build) (`@ai-sdk/harness-grok-build`)
- [OpenCode](/providers/ai-sdk-harnesses/opencode) (`@ai-sdk/harness-opencode`)
- [Pi](/providers/ai-sdk-harnesses/pi) (`@ai-sdk/harness-pi`)

### Coming Soon

- Amp (`@ai-sdk/harness-amp`)
- Goose (`@ai-sdk/harness-goose`)
- Mastra (`@ai-sdk/harness-mastra`)

## Adapter Capabilities

| Adapter                                                | Runtime location | Custom tools | Custom skills | Structured output | Built-in tool approval | Built-in tool filtering      |
| ------------------------------------------------------ | ---------------- | ------------ | ------------- | ----------------- | ---------------------- | ---------------------------- |
| [Claude Code](/providers/ai-sdk-harnesses/claude-code) | Sandbox bridge   | <Check />    | <Check />     | <Check />         | <Check />              | <Check />                    |
| [Cline](/providers/ai-sdk-harnesses/cline)             | Host process     | <Check />    | <Check />     | <Check />         | <Check />              | <Check />                    |
| [Codex](/providers/ai-sdk-harnesses/codex)             | Sandbox bridge   | <Check />    | <Check />     | <Check />         | <Cross />              | <Cross />                    |
| [Cursor](/providers/ai-sdk-harnesses/cursor)           | Sandbox via ACP  | <Check />    | <Check />     | <Cross />         | <Check />              | <Cross />                    |
| [Deep Agents](/providers/ai-sdk-harnesses/deepagents)  | Sandbox bridge   | <Check />    | <Check />     | <Check />         | <Check />              | <Check /> via auto-rejection |
| [fx](/providers/ai-sdk-harnesses/fx)                   | Sandbox via ACP  | <Check />    | <Check />     | <Cross />         | <Check />              | <Cross />                    |
| [Grok Build](/providers/ai-sdk-harnesses/grok-build)   | Sandbox via ACP  | <Check />    | <Check />     | <Check />         | <Check />              | <Cross />                    |
| [OpenCode](/providers/ai-sdk-harnesses/opencode)       | Sandbox bridge   | <Check />    | <Check />     | <Check />         | <Check />              | <Check /> via auto-rejection |
| [Pi](/providers/ai-sdk-harnesses/pi)                   | Host process     | <Check />    | <Check />     | <Cross />         | <Check />              | <Check />                    |


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
