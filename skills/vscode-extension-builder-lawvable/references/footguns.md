# VS Code Extension Footguns

## Build Passing Does Not Prove Runtime Behavior

TypeScript can pass while activation events, contribution IDs, command IDs, webview resource URIs, or Extension Host assumptions are broken. Always run the relevant feedback loop.

## Command ID Mismatches

The command ID in `package.json`, `registerCommand`, menus, keybindings, tests, and docs must match exactly.

## Over-broad Activation

`activationEvents: ["*"]` hurts startup and hides lifecycle bugs. Use the narrowest activation path that fits.

## Forgotten Disposables

Undisposed watchers, output channels, status bars, tree providers, and webview listeners leak across reloads. Push disposables to `context.subscriptions`.

## Webview CSP and Resource URIs

Webviews cannot use normal file paths. Use `webview.asWebviewUri`, set a restrictive CSP, and avoid inline scripts unless nonce-protected.

## Assuming Local Filesystem

Raw `fs` breaks or behaves differently in remote, virtual, and web contexts. Use `vscode.workspace.fs` unless you intentionally require local desktop-only behavior.

## Multi-root Blindness

`workspaceFolders[0]` is often wrong. Prefer active editor context, explicit user selection, or documented defaults.

## Secrets in Settings or Files

Do not store tokens in workspace settings or plaintext files. Use `context.secrets`.

## Webview Frontend Works in Browser but Fails in VS Code

Vite success does not prove VS Code success. VS Code adds CSP, URI rewriting, sandboxing, and message-boundary constraints.

## Version Drift

VS Code APIs, especially AI and activation behavior, evolve. Refresh generated docs before relying on memory for newer APIs.
