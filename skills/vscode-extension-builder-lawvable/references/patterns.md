# VS Code Extension Patterns

## Architecture Selection

- Use a command when the user initiates a short action.
- Use a view or tree view when state should remain visible in the sidebar.
- Use a webview only when native VS Code UI cannot represent the interaction.
- Use a custom editor when a file type needs visual editing while preserving document semantics.
- Use a language server when features must scale across languages, documents, or editor instances.
- Use Language Model Tools when Copilot/agent chat should call your tool through VS Code's LM tool surface.

## Activation

Keep activation narrow. Prefer contribution-driven activation events and avoid `*` unless startup behavior is truly required. Starting with modern VS Code versions, contributed commands and languages can activate without redundant explicit activation entries; verify against generated docs when targeting older versions.

## Disposables

Every registration returns a disposable. Push disposables into `context.subscriptions` unless you have a deliberate lifecycle shorter than the extension.

```typescript
context.subscriptions.push(
  vscode.commands.registerCommand("example.run", runCommand),
  vscode.window.createOutputChannel("Example"),
);
```

## State

- Use `context.workspaceState` for workspace-specific UI/session facts.
- Use `context.globalState` for user-level extension state.
- Use `SecretStorage` for secrets.
- Use workspace files for project artifacts users should review or commit.

## Workspace Files

Prefer `vscode.workspace.fs` and `vscode.Uri` over raw `fs` when remote, web, or virtual workspace compatibility matters.

## Multi-root Workspaces

Never assume one root folder. Ask the user or infer from the active editor when multiple workspace folders exist.

## Web and Remote Compatibility

Before using Node-only APIs, decide whether the extension must run in:

- VS Code desktop local extension host
- Remote extension host
- Codespaces
- vscode.dev / web extension host

If web support matters, provide a `browser` entry and avoid Node built-ins in browser code.
