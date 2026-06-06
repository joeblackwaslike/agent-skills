---
name: browser-extension
description: Pieces browser extension — supported browsers, DOM events captured, data schema, permissions, LTM contributions
---

# Pieces Browser Extension

## Supported Browsers

| Browser | Source |
|---------|--------|
| **Chrome** | Chrome Web Store — ID: `igbgibhbfonhmjlechmeefimncpekepm` (v4.1.6) |
| **Firefox** | Mozilla Add-ons |
| **Microsoft Edge** | Edge Add-ons — ID: `hglfimcdgonaeeobjckfdabcldfidmim` |
| **Brave** | Chrome Web Store (Chromium compatible) |
| **Opera** | Chrome Web Store (Chromium compatible) |

**Prerequisite**: Pieces OS must be running locally. The extension communicates with Pieces OS via `localhost:1000`.

## Capture Triggers

| Trigger | What fires it |
|---------|--------------|
| **DOM code block detection** | Automatic — Pieces detects `<pre>` and `<code>` elements on every page load |
| **"Copy and Save" button** | Click the Pieces button that appears below detected code blocks |
| **Selection save** | Highlight any text → right-click → "Save to Pieces" (or keyboard shortcut) |
| **Clipboard monitoring** | System-level copy events — Pieces detects code patterns in the clipboard |
| **Page navigation** | URL + page title captured as context when navigating to new pages |

## Data Captured Per Event

```json
{
  "content": "<code_or_text_extracted_from_DOM>",
  "source_url": "<full_URL_of_page>",
  "page_title": "<browser_tab_title>",
  "language": "<auto_classified>",
  "timestamp": "<ISO8601>",
  "browser": "chrome|firefox|edge|brave|opera",
  "element": {
    "tag": "pre|code",
    "innerHTML": "<raw_HTML_of_code_block>"
  }
}
```

The source URL is automatically embedded as `related_links` metadata on the saved asset — making every snippet traceable back to its origin page.

## Required Browser Permissions

| Permission | Purpose |
|------------|---------|
| `activeTab` | Read current tab's DOM content |
| Content scripts | Inject Pieces UI buttons into web pages |
| `tabs` API | Access tab URLs and favicons |
| Clipboard access | Monitor copy events for code detection |
| Optional: `captureTab()` | Screenshot capability (if vision features enabled) |

## Features

- **Inline quick actions**: Save, copy, and share buttons appear directly below detected code blocks — no right-clicking required
- **"Discovered Snippets" panel**: Pieces sidebar tab shows all code blocks detected on the current page
- **Copilot integration**: Chat about any code block directly from the browser via the Pieces sidebar
- **Source enrichment**: Every saved snippet automatically includes the source URL, making it fully traceable
- **Multi-language detection**: Auto-classifies code across all languages using the same ML pipeline as the desktop app
- **LTM contributions**: Browser activity (URLs visited, page content) feeds into LTM passively when Pieces OS LTM is enabled

## LTM Integration

When LTM is enabled, Pieces OS captures browser activity through `runtime_native_browser.dylib`:

- URLs visited and page titles
- OCR text from visible page content (via `runtime_native_vision.dylib`)
- Code blocks you interact with
- Clipboard events from the browser

This data appears in LTM as `WORKSTREAM_EVENTS` with `context_type: "VISION"` (for OCR captures) or `context_type: "CLIPBOARD"` (for copy events). Query it via MCP:

```
workstream_events_full_text_search(
  query: "React hooks documentation",
  application: "Google Chrome"
)
```
