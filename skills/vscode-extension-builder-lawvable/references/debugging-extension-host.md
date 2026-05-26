# Debugging the Extension Host

## Start with Runtime Evidence

When an extension fails, collect:

- Extension Host console errors
- Output channel logs
- activation timing and activation event
- command ID invoked
- workspace/folder used
- VS Code version and extension host kind

## Useful Surfaces

- **Run Extension** launch config: easiest interactive debug loop.
- **Developer: Toggle Developer Tools**: inspect Extension Host and webview errors.
- **Output panel**: create a named output channel for extension logs.
- **Developer: Show Running Extensions**: inspect activation and runtime cost.
- **Extension Bisect**: isolate conflicts when behavior depends on installed extensions.

## Add a Debug Output Channel

```typescript
const output = vscode.window.createOutputChannel("Example");
context.subscriptions.push(output);

function log(message: string): void {
  output.appendLine(`[${new Date().toISOString()}] ${message}`);
}
```

## Common Triage Path

1. Does the extension activate?
2. Is the command/view contribution visible?
3. Does `registerCommand` or provider registration run?
4. Does the command throw?
5. Is the workspace assumption valid?
6. Are resources available after bundling?
7. Are disposables/listeners cleaned up after reload?

## Activation Debugging

Activation bugs usually come from mismatched IDs, stale `package.json`, wrong `engines.vscode`, or relying on outdated activation-event behavior. Check generated docs before changing compatibility rules.
