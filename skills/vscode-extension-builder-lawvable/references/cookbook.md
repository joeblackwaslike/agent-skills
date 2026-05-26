# VS Code Extension Cookbook

## Register a Command

```typescript
const disposable = vscode.commands.registerCommand("example.hello", async () => {
  await vscode.window.showInformationMessage("Hello from Example");
});
context.subscriptions.push(disposable);
```

Add a matching `contributes.commands` entry in `package.json`.

## Prompt for Input

```typescript
const value = await vscode.window.showInputBox({
  title: "Example",
  prompt: "Enter a value",
  ignoreFocusOut: true,
});
if (!value) return;
```

## Write a Workspace File

```typescript
const folder = vscode.workspace.workspaceFolders?.[0];
if (!folder) {
  await vscode.window.showWarningMessage("Open a workspace first.");
  return;
}

const target = vscode.Uri.joinPath(folder.uri, "example.txt");
await vscode.workspace.fs.writeFile(target, new TextEncoder().encode("hello\n"));
```

## Output Channel

```typescript
const output = vscode.window.createOutputChannel("Example");
context.subscriptions.push(output);
output.appendLine("Started");
output.show(true);
```

## Status Bar Item

```typescript
const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
item.text = "$(zap) Example";
item.command = "example.run";
item.show();
context.subscriptions.push(item);
```

## Configuration

```typescript
const config = vscode.workspace.getConfiguration("example");
const enabled = config.get<boolean>("enabled", true);
await config.update("enabled", !enabled, vscode.ConfigurationTarget.Workspace);
```

## Diagnostics

```typescript
const collection = vscode.languages.createDiagnosticCollection("example");
context.subscriptions.push(collection);

collection.set(document.uri, [
  new vscode.Diagnostic(
    new vscode.Range(0, 0, 0, 5),
    "Example diagnostic",
    vscode.DiagnosticSeverity.Warning,
  ),
]);
```

## Webview Message Contract

Use explicit message types and validate unknown messages before acting.

```typescript
type WebviewMessage =
  | { type: "ready" }
  | { type: "save"; payload: { text: string } };
```

## Language Model Tool Skeleton

Verify exact API syntax against `references/generated/` before implementation because this surface evolves quickly.

```typescript
context.subscriptions.push(
  vscode.lm.registerTool("example_tool", {
    async invoke(options, token) {
      return new vscode.LanguageModelToolResult([
        new vscode.LanguageModelTextPart("Tool result"),
      ]);
    },
  }),
);
```
