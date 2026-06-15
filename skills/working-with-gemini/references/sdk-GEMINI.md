---
source: "https://raw.githubusercontent.com/google-gemini/gemini-cli/main/packages/sdk/GEMINI.md"
fetched_at: "2026-06-15T05:55:14.234Z"
sha256: "098786bbdeef91780f77eae01e8f373dfdfa1998b62dc268cae392e4da2931ae"
---

# Gemini CLI SDK (`@google/gemini-cli-sdk`)

Programmatic SDK for embedding Gemini CLI agent capabilities into other
applications.

## Architecture

- `src/agent.ts`: Agent creation and management.
- `src/session.ts`: Session lifecycle and state management.
- `src/tool.ts`: Tool definition and execution interface.
- `src/skills.ts`: Skill integration.
- `src/fs.ts` & `src/shell.ts`: File system and shell utilities.
- `src/types.ts`: Public type definitions.

## Testing

- Run tests: `npm test -w @google/gemini-cli-sdk`
- Integration tests use `*.integration.test.ts` naming convention.
