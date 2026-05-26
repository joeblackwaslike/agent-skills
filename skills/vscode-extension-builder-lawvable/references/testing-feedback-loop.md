# VS Code Extension Development Feedback Loop

Use this before verifying meaningful VS Code extension behavior. The goal is the same kind of feedback loop agents get from browser testing web apps: edit, run the real surface, observe evidence, fix, repeat.

## Choose the Loop

| Change | Minimum loop |
| --- | --- |
| Pure parsing, transforms, helpers | `pnpm test` or Vitest for the unit surface |
| Command registration or command behavior | Build + Extension Host command invocation |
| `package.json` contributions, activation, menus, keybindings | Build + Extension Host smoke test |
| Tree views, custom editors, notebooks, tests, tasks | Build + fixture workspace + integration test or manual Extension Host observation |
| Webviews | Build + Extension Host/webview check + message contract check |
| Language Model API or tools | Build + mocked/guarded LM path + command/tool registration check |
| Publishing/package changes | Build + `vsce package` or equivalent dry package check |

## Compile Loop

Run what exists in the repo:

```bash
pnpm install
pnpm build
pnpm test
pnpm lint
```

If scripts are missing, use the closest direct checks:

```bash
pnpm exec tsc --noEmit
pnpm exec vsce package --no-dependencies
```

Evidence to report: command, pass/fail status, and any failing file or stack trace.

## Extension Host Loop

Use this when behavior depends on VS Code itself.

1. Start a watch build if available: `pnpm watch`.
2. Launch an Extension Development Host with a fixture workspace.
3. Invoke the command/view/editor path that changed.
4. Inspect evidence: Output channel, logs, Developer Tools console, visible UI state, generated files, workspace state.
5. Fix and repeat until the observed behavior matches the expected behavior.

Useful launch shape:

```bash
code --extensionDevelopmentPath="$PWD" --extensionTestsPath="$PWD/out/test/suite/index" ./test-fixtures/basic-workspace
```

For manual smoke checks, use VS Code's "Run Extension" launch config or:

```bash
code --extensionDevelopmentPath="$PWD" ./test-fixtures/basic-workspace
```

Evidence to report: command/view exercised, workspace used, visible or logged result.

## Automated Integration Loop

Prefer the current official `@vscode/test-cli` setup for new extensions, backed by `@vscode/test-electron` for desktop Extension Host execution. Read `references/generated/testing-extensions.md` before scaffolding this because the VS Code team updates the test runner guidance.

Expected shape:

```text
.vscode-test.mjs
test/
  suite/
    extension.test.ts
test-fixtures/
  basic-workspace/
```

Run:

```bash
pnpm test
```

or:

```bash
pnpm exec vscode-test
```

Good integration tests assert observable behavior:

- command is registered and runs
- files are created/updated through `vscode.workspace.fs`
- diagnostics appear
- tree provider returns expected items
- custom editor updates document state
- activation completes without errors

## Webview/UI Loop

Webviews need two checks:

1. Browser-side check for the frontend bundle or component harness.
2. VS Code-side check for URI rewriting, CSP, `acquireVsCodeApi`, and message passing.

For React/Vite webviews, test the UI independently with Playwright or a browser harness, then run an Extension Host smoke test for VS Code-specific behavior. See `webview-verification.md`.

Evidence to report: screenshot/snapshot or rendered state, plus the message sent/received across the extension-webview boundary.

## Packaging Loop

Before claiming the extension is installable or publishable:

```bash
pnpm build
pnpm exec vsce package
```

Then inspect the `.vsix` contents if packaging changed:

```bash
unzip -l ./*.vsix | sed -n '1,120p'
```

Evidence to report: generated `.vsix` name and any package warnings.

## If Automation Is Blocked

Do not pretend runtime behavior was verified. Report:

- what could run
- what could not run
- why it was blocked
- the exact next command to run in VS Code

Example:

```text
Build and integration tests pass. I could not open an Extension Development Host from this environment, so runtime UI behavior still needs this manual check: press F5, run "My Extension: Scan Workspace", and confirm the Output channel shows "Scan complete".
```
