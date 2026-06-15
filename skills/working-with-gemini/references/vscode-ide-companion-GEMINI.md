---
source: "https://raw.githubusercontent.com/google-gemini/gemini-cli/main/packages/vscode-ide-companion/GEMINI.md"
fetched_at: "2026-06-15T05:55:14.234Z"
sha256: "9b7445a6c524922938f0b8abd9d16b53f0edd0674fbcf2897dcb21dde5eabcde"
---

# Gemini CLI VS Code Companion (`gemini-cli-vscode-ide-companion`)

VS Code extension that pairs with Gemini CLI, providing direct IDE workspace
access to the CLI agent.

## Architecture

- `src/extension.ts`: Extension activation and lifecycle.
- `src/ide-server.ts`: Local server exposing IDE capabilities to the CLI.
- `src/diff-manager.ts`: Diff viewing and application.
- `src/open-files-manager.ts`: Tracks and exposes open editor files.
- `src/utils/`: Shared utility functions.

## Development

- Requires VS Code `^1.99.0`.
- Build: `npm run build` (uses esbuild).
- Launch via VS Code's "Run Extension" debug configuration.

## Testing

- Run tests: `npm test -w gemini-cli-vscode-ide-companion`
- Tests use standard Vitest patterns alongside VS Code test APIs.
