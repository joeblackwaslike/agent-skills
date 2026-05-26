# AI, Language Model API, and Language Model Tools

VS Code AI APIs evolve quickly. Refresh and read `references/generated/language-model-api.md` and `references/generated/language-model-tool-api.md` before implementing current syntax.

## Distinguish the Surfaces

- **Language Model API**: extension asks VS Code-selected models for completions or chat-like responses.
- **Language Model Tool API**: extension contributes tools that AI chat/agents can call.
- **Language model provider extensions**: extensions can surface models through VS Code provider APIs, depending on current API availability and plan/product constraints.
- **Copilot product behavior**: not the same as intercepting or replacing Copilot Chat internals.

## Design Rules

- Feature-detect and degrade gracefully when no model is available.
- Do not add a hard dependency on GitHub Copilot unless the extension has no useful non-AI behavior.
- Keep prompts and tool schemas small, explicit, and testable.
- Validate tool input before touching files, running commands, or calling external APIs.
- Log enough to debug tool routing without leaking secrets or prompt-sensitive content.

## Testing

Use a mocked model/tool path for deterministic tests. Runtime smoke tests should prove:

- the command or tool registration path runs
- missing-model behavior is understandable
- cancellation tokens are respected
- tool input validation rejects malformed data

## Security

Any AI-triggered file write, shell command, network call, or secret access needs an explicit trust boundary. See `security.md`.
