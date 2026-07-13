---
source: "https://ai-sdk.dev/docs/ai-sdk-harnesses/harness-adapters.md"
fetched_at: "2026-07-13T06:59:02.188Z"
sha256: "c32ed9b4b49a2a813be015bb9c4c89e0ec3f30425a99dc73da2d363318b559a0"
---

# Harness Adapters

Harness adapters connect `HarnessAgent` to a specific agent runtime. They are
the harness equivalent of AI SDK model providers: each adapter wraps one runtime
and normalizes its sessions, stream events, tools, usage, lifecycle state, and
configuration into the harness contract.

## AI SDK Harness Adapters

The AI SDK includes the following harness adapters:

- [Claude Code](/providers/ai-sdk-harnesses/claude-code) (`@ai-sdk/harness-claude-code`)
- [Codex](/providers/ai-sdk-harnesses/codex) (`@ai-sdk/harness-codex`)
- [Deep Agents](/providers/ai-sdk-harnesses/deepagents) (`@ai-sdk/harness-deepagents`)
- [OpenCode](/providers/ai-sdk-harnesses/opencode) (`@ai-sdk/harness-opencode`)
- [Pi](/providers/ai-sdk-harnesses/pi) (`@ai-sdk/harness-pi`)

### Coming Soon

- Amp (`@ai-sdk/harness-amp`)
- Goose (`@ai-sdk/harness-goose`)
- Mastra (`@ai-sdk/harness-mastra`)

## Adapter Capabilities

| Adapter                                                | Runtime location | Custom tools | Custom skills | Built-in tool approval | Built-in tool filtering      |
| ------------------------------------------------------ | ---------------- | ------------ | ------------- | ---------------------- | ---------------------------- |
| [Claude Code](/providers/ai-sdk-harnesses/claude-code) | Sandbox bridge   | <Check />    | <Check />     | <Check />              | <Check />                    |
| [Codex](/providers/ai-sdk-harnesses/codex)             | Sandbox bridge   | <Check />    | <Check />     | <Cross />              | <Cross />                    |
| [Deep Agents](/providers/ai-sdk-harnesses/deepagents)  | Sandbox bridge   | <Check />    | <Check />     | <Check />              | <Check /> via auto-rejection |
| [OpenCode](/providers/ai-sdk-harnesses/opencode)       | Sandbox bridge   | <Check />    | <Check />     | <Check />              | <Check /> via auto-rejection |
| [Pi](/providers/ai-sdk-harnesses/pi)                   | Host process     | <Check />    | <Check />     | <Check />              | <Check />                    |


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
