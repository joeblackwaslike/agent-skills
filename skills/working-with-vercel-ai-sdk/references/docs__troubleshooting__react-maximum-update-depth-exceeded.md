---
title: "React error \"Maximum update depth exceeded\""
description: "Troubleshooting errors related to the \"Maximum update depth exceeded\" error."
url: "https://ai-sdk.dev/docs/troubleshooting/react-maximum-update-depth-exceeded"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/troubleshooting/react-maximum-update-depth-exceeded.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "8ce808780eeb8d84c74a789ecccd1dfa0e1d0bddb1933df396106c18e6b8e238"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

## Issue

I am using the AI SDK in a React project with the `useChat` or `useCompletion` hooks
and I get the following error when AI responses stream in: `Maximum update depth exceeded`.

## Background

By default, the UI is re-rendered on every chunk that arrives.
This can overload the rendering, especially on slower devices or when complex components
need updating (e.g. Markdown). Throttling can mitigate this.

## Solution

Use the `throttle` option to throttle the UI updates:

### `useChat`

```tsx title="page.tsx" {2-3}
const { messages } = useChat({
  // Throttle the messages and data updates to 50ms:
  throttle: 50,
});
```

### `useCompletion`

```tsx title="page.tsx" {2-3}
const { completion } = useCompletion({
  // Throttle the completion and data updates to 50ms:
  throttle: 50,
});
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)