---
title: Claude Code
description: Learn how to use the Claude Code provider to access Claude models through the Claude Agent SDK.
url: "https://ai-sdk.dev/providers/community-providers/claude-code"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/community-providers/claude-code.md"
fetched_at: "2026-10-12T11:48:49.587Z"
sha256: "9d0754395c472a590f3cd0a4b478c29b59b1f0d8dd033a2796303570fe1324b7"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The [ai-sdk-provider-claude-code](https://github.com/ben-vargas/ai-sdk-provider-claude-code) community provider allows you to access Claude models through the official [Claude Agent SDK](https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk). It's particularly useful for developers who want to use their existing Claude Pro/Max subscription without managing API keys.

## Version Compatibility

| Provider Version | AI SDK Version | NPM Tag     | Status      |
| ---------------- | -------------- | ----------- | ----------- |
| 3.x              | v6             | `latest`    | Stable      |
| 2.x              | v5             | `ai-sdk-v5` | Maintenance |
| 0.x              | v4             | `ai-sdk-v4` | Legacy      |

```bash
# AI SDK v6 (default)
npm install ai-sdk-provider-claude-code ai

# AI SDK v5
npm install ai-sdk-provider-claude-code@ai-sdk-v5 ai@^5.0.0

# AI SDK v4
npm install ai-sdk-provider-claude-code@ai-sdk-v4 ai@^4.0.0
```

## Setup

```bash
pnpm add ai-sdk-provider-claude-code
```

## Provider Instance

You can import the default provider instance `claudeCode` from `ai-sdk-provider-claude-code`:

```ts
import { claudeCode } from 'ai-sdk-provider-claude-code';
```

If you need a customized setup, you can import `createClaudeCode` and create a provider instance with your settings:

```ts
import { createClaudeCode } from 'ai-sdk-provider-claude-code';

const claudeCode = createClaudeCode({
  allowedTools: ['Read', 'Write', 'Edit'],
  disallowedTools: ['Bash'],
  mcpServers: {
    'my-server': {
      command: 'node',
      args: ['server.js'],
    },
  },
  permissionMode: 'default',
});
```

You can use the following optional settings to customize the provider instance:

- **allowedTools** *string\[]* - List of allowed tools. When specified, only these tools will be available.
- **disallowedTools** *string\[]* - List of disallowed tools (e.g., `['Bash(rm:*)']`).
- **mcpServers** *Record\<string, McpServerConfig>* - MCP server configurations.
- **permissionMode** *'default' | 'acceptEdits' | 'bypassPermissions' | 'plan'* - Tool permission handling.
- **maxTurns** *number* - Maximum conversation turns.
- **cwd** *string* - Working directory for CLI operations.
- **verbose** *boolean* - Enable debug logging.

## Language Models

You can create models that call Claude through the Claude Agent SDK using the provider instance:

```ts
const model = claudeCode('sonnet');
```

Supported model shortcuts:

- **opus**: Claude Opus (most capable)
- **sonnet**: Claude Sonnet (balanced)
- **haiku**: Claude Haiku (fastest)

You can also use full model identifiers directly:

```ts
const model = claudeCode('claude-opus-4-5');
const model = claudeCode('claude-sonnet-4-5-20250514');
```

### Example

```ts
import { claudeCode } from 'ai-sdk-provider-claude-code';
import { generateText } from 'ai';

const { text } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

### Model Capabilities

| Model    | Image Input | Object Generation | Tool Usage | Tool Streaming |
| -------- | ----------- | ----------------- | ---------- | -------------- |
| `opus`   | ✓           | ✓                 | ✗          | ✗              |
| `sonnet` | ✓           | ✓                 | ✗          | ✗              |
| `haiku`  | ✓           | ✓                 | ✗          | ✗              |

Tool Usage and Tool Streaming show ❌ because this provider does not support
AI SDK custom tools (Zod schemas passed to `generateText`/`streamText`).
Instead, it uses Claude's built-in tools (Bash, Edit, Read, Write, etc.) and
MCP servers which execute autonomously. Object generation uses native
structured outputs with guaranteed schema compliance. Image input requires
streaming mode and base64/data URL format only.

## Authentication

The provider uses your existing Claude Pro or Max subscription through the Claude Code CLI:

```bash
claude login
```

This opens a browser window for authentication. Once authenticated, the provider will use your subscription automatically.

## Requirements

- Node.js 22 or higher
- Claude Code CLI installed (`npm install -g @anthropic-ai/claude-code`)
- Claude Pro or Max subscription

For more details, see the [provider documentation](https://github.com/ben-vargas/ai-sdk-provider-claude-code).

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)