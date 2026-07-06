---
source: "https://ai-sdk.dev/docs/ai-sdk-harnesses/harness-adapters.md"
fetched_at: "2026-07-06T05:38:28.608Z"
sha256: "2126f2f5e9e7d71277ba42f73ecd84b9da53fecfb3466b82bd85fdcbeb8df895"
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

| Adapter                                                | Runtime location | Custom tools        | Custom skills       | Built-in tool approval | Built-in tool filtering                |
| ------------------------------------------------------ | ---------------- | ------------------- | ------------------- | ---------------------- | -------------------------------------- |
| [Claude Code](/providers/ai-sdk-harnesses/claude-code) | Sandbox bridge   | <Check size={18} /> | <Check size={18} /> | <Check size={18} />    | <Check size={18} />                    |
| [Codex](/providers/ai-sdk-harnesses/codex)             | Sandbox bridge   | <Check size={18} /> | <Check size={18} /> | <Cross size={18} />    | <Cross size={18} />                    |
| [Deep Agents](/providers/ai-sdk-harnesses/deepagents)  | Sandbox bridge   | <Check size={18} /> | <Check size={18} /> | <Check size={18} />    | <Check size={18} /> via auto-rejection |
| [OpenCode](/providers/ai-sdk-harnesses/opencode)       | Sandbox bridge   | <Check size={18} /> | <Check size={18} /> | <Check size={18} />    | <Check size={18} /> via auto-rejection |
| [Pi](/providers/ai-sdk-harnesses/pi)                   | Host process     | <Check size={18} /> | <Check size={18} /> | <Check size={18} />    | <Check size={18} />                    |


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
