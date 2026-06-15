---
title: "Webview UX Guidelines"
source: "https://code.visualstudio.com/api/ux-guidelines/webviews"
fetched_at: "2026-06-15T05:52:52.261Z"
sha256: "cac81e2f80469f2561b27b59375d81b68a7e7e74a825e0686759502fad981f7a"
---

# Webview UX Guidelines

Source: https://code.visualstudio.com/api/ux-guidelines/webviews

# Webviews

If you need to display custom functionality that is beyond what the VS Code API supports, you can use [webviews](https://code.visualstudio.com/api/extension-guides/webview), which are fully customizable. It's important to understand that webviews should only be used if you absolutely need them.

**✔️ Do**

- Only use webviews when absolutely necessary

- Activate your extension only when contextually appropriate

- Open webviews only for the active window

- Ensure all elements in the view are themeable (see the [webview-view-sample](https://github.com/microsoft/vscode-extension-samples/blob/main/webview-view-sample/media/main.css) and [color tokens](https://code.visualstudio.com/api/references/theme-color) documentation)

- Ensure your views follow [accessibility guidance](https://code.visualstudio.com/docs/configure/accessibility/accessibility) (color contrast, ARIA labels, keyboard navigation)

- Use command actions in the toolbar and in the view

❌ Don't

- Use for promotions (upgrades, sponsors, etc.)

- Use for wizards

- Open on every window

- Open on extension updates (ask via a Notification instead)

- Add functionality that is unrelated to the editor or workspace

- Repeat existing functionality (Welcome page, Settings, configuration, etc.)

## Webview examples

**Simple Browser**

This extension opens a browser preview for the editor to the side.

_This example shows VS Code Web being developed right inside VS Code. A Webview panel is used to render a browser-like window._

**Pull Request**

This extension shows pull requests for the repository of the workspace in a custom tree view and then uses a webview for a detail view of the pull request.

## Webview views

You can also place webviews into any view container (sidebar or panel) and these elements are called [webview views](https://code.visualstudio.com/api/references/vscode-api#WebviewView). The same webview guidance applies to webview views.

_This webview view shows content for creating a pull request that uses dropdowns, inputs, and buttons._

## Links

- [Webview extension guide](https://code.visualstudio.com/api/extension-guides/webview)

- [Webview extension sample](https://github.com/Microsoft/vscode-extension-samples/tree/main/webview-sample)

- [Webview View extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/webview-view-sample)

 
 6/10/2026
