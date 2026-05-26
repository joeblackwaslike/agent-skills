# Webview Verification

Webviews are browser-like, but they are not normal web pages. Verify both the frontend bundle and the VS Code host integration.

## Split the Surface

1. Extract most UI logic into normal React/TypeScript modules that run in Vite, Vitest, or Playwright.
2. Keep VS Code-specific code thin: acquire API, message bridge, URI injection, CSP.
3. Define a typed message contract between the extension host and webview.

## Browser Harness

Use a standalone Vite route or minimal HTML harness for UI iteration. This gives the agent a page-like feedback loop with screenshots, snapshots, and console checks.

Verify:

- the page is not blank
- expected controls render
- user interactions update state
- no console errors
- long text and empty states fit

## VS Code Host Check

After browser verification, run in Extension Host to confirm:

- `webview.asWebviewUri` paths resolve
- CSP permits only intended scripts/styles/assets
- `acquireVsCodeApi` is only called once and is not leaked globally
- extension-to-webview messages arrive
- webview-to-extension messages are validated before acting

## Message Contract Pattern

Use explicit message names and correlation IDs for request/response flows.

```typescript
type HostToWebview =
  | { type: "hydrate"; state: unknown }
  | { type: "error"; message: string };

type WebviewToHost =
  | { type: "ready" }
  | { type: "save"; requestId: string; payload: unknown };
```

## Evidence

Good completion evidence includes:

- screenshot or snapshot from the browser harness
- Extension Host observation that the webview opened
- log or assertion proving a message crossed the boundary
