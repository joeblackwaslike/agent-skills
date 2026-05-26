# Test Harnesses

## Recommended Layers

- Vitest for pure TypeScript logic.
- `@vscode/test-cli` plus `@vscode/test-electron` for Extension Host integration behavior.
- Playwright or browser harness tests for webview frontend code.
- Fixture workspaces for repeatable command/view/editor scenarios.
- CI that runs build, unit tests, integration tests where supported, and packaging checks.

## Fixture Workspaces

Keep test workspaces small and intentional:

```text
test-fixtures/
  basic-workspace/
    .vscode/
      settings.json
    sample.txt
```

Use fixtures to exercise real paths, workspace configuration, multi-root assumptions, and file writes.

## `@vscode/test-cli`

Install:

```bash
pnpm add -D @vscode/test-cli @vscode/test-electron
```

Typical config:

```javascript
// .vscode-test.mjs
import { defineConfig } from "@vscode/test-cli";

export default defineConfig({
  files: "out/test/**/*.test.js",
  workspaceFolder: "./test-fixtures/basic-workspace",
});
```

Run:

```bash
pnpm exec vscode-test
```

Use direct `@vscode/test-electron` runners when the project needs custom launch orchestration that the CLI config cannot express.


## Integration Test Targets

Assert behavior through VS Code APIs:

- `vscode.commands.executeCommand("example.run")`
- workspace file changes
- diagnostics count and range
- registered tree data returned by provider
- webview provider creates panel without throwing
- extension activates under expected event

## CI Notes

Linux CI usually needs a display server for Electron-backed tests. Use the current official VS Code testing docs from `references/generated/` when setting this up because CI guidance changes over time.
