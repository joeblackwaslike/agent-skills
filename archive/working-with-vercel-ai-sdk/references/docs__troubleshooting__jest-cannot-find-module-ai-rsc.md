---
title: "Jest: cannot find module '@ai-sdk/rsc'"
description: "Troubleshooting AI SDK errors related to the Jest: cannot find module '@ai-sdk/rsc' error"
url: "https://ai-sdk.dev/docs/troubleshooting/jest-cannot-find-module-ai-rsc"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/troubleshooting/jest-cannot-find-module-ai-rsc.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "161895bf16f7ee7c1375281ff3c27a8f3856380ddf0af3ca6d3521790cedc0eb"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

## Issue

I am using AI SDK RSC and am writing tests for my RSC components with Jest.

I am getting the following error: `Cannot find module '@ai-sdk/rsc'`.

## Solution

Configure the module resolution via `jest config update` in `moduleNameMapper`:

```json title="jest.config.js"
"moduleNameMapper": {
  "^@ai-sdk/rsc$": "<rootDir>/node_modules/@ai-sdk/rsc/dist"
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)