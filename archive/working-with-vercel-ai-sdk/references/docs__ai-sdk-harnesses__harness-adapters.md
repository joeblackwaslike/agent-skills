---
title: Harness Adapters
description: Learn about the available AI SDK harness adapters.
url: "https://ai-sdk.dev/docs/ai-sdk-harnesses/harness-adapters"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/ai-sdk-harnesses/harness-adapters.md"
fetched_at: "2026-10-26T09:52:56.075Z"
sha256: "5db4645d57042e198510ad56377f617df24a0dcb27fb32f438957b0d7318e3a2"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

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
- [GitHub Copilot](/providers/ai-sdk-harnesses/github-copilot) (`@ai-sdk/harness-github-copilot`)
- [Grok Build](/providers/ai-sdk-harnesses/grok-build) (`@ai-sdk/harness-grok-build`)
- [OpenCode](/providers/ai-sdk-harnesses/opencode) (`@ai-sdk/harness-opencode`)
- [Pi](/providers/ai-sdk-harnesses/pi) (`@ai-sdk/harness-pi`)

### Coming Soon

- Amp (`@ai-sdk/harness-amp`)
- Goose (`@ai-sdk/harness-goose`)
- Mastra (`@ai-sdk/harness-mastra`)

## Adapter Capabilities

| Adapter                                                      | Runtime location | Custom tools | Custom skills | Structured output | Built-in tool approval | Built-in tool filtering | Image input | History access |
| ------------------------------------------------------------ | ---------------- | ------------ | ------------- | ----------------- | ---------------------- | ----------------------- | ----------- | -------------- |
| [Claude Code](/providers/ai-sdk-harnesses/claude-code)       | Sandbox bridge   | ✓            | ✓             | ✓                 | ✓                      | ✓                       | ✓           | ✗              |
| [Cline](/providers/ai-sdk-harnesses/cline)                   | Host process     | ✓            | ✓             | ✓                 | ✓                      | ✓                       | ✓           | ✗              |
| [Codex](/providers/ai-sdk-harnesses/codex)                   | Sandbox bridge   | ✓            | ✓             | ✓                 | ✗                      | ✗                       | ✓           | ✗              |
| [Cursor](/providers/ai-sdk-harnesses/cursor)                 | Sandbox via ACP  | ✓            | ✓             | ✗                 | ✗                      | ✗                       | ✓           | ✗              |
| [Deep Agents](/providers/ai-sdk-harnesses/deepagents)        | Sandbox bridge   | ✓            | ✓             | ✓                 | ✓                      | ✓ via auto-rejection    | ✓           | ✗              |
| [fx](/providers/ai-sdk-harnesses/fx)                         | Host process     | ✓            | ✓             | ✓                 | ✓                      | ✓                       | ✓           | ✗              |
| [GitHub Copilot](/providers/ai-sdk-harnesses/github-copilot) | Sandbox via ACP  | ✓            | ✓             | ✗                 | ✗                      | ✗                       | ✓           | ✗              |
| [Grok Build](/providers/ai-sdk-harnesses/grok-build)         | Sandbox via ACP  | ✓            | ✓             | ✓                 | ✗                      | ✗                       | ✓           | ✗              |
| [OpenCode](/providers/ai-sdk-harnesses/opencode)             | Sandbox bridge   | ✓            | ✓             | ✓                 | ✓                      | ✓                       | ✓           | ✗              |
| [Pi](/providers/ai-sdk-harnesses/pi)                         | Host process     | ✓            | ✓             | ✗                 | ✓                      | ✓                       | ✓           | ✗              |

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)