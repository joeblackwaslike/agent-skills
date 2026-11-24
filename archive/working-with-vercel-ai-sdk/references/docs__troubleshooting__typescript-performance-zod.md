---
title: TypeScript performance issues with Zod and AI SDK 5
description: Troubleshooting TypeScript server crashes and slow performance when using Zod with AI SDK 5
url: "https://ai-sdk.dev/docs/troubleshooting/typescript-performance-zod"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/troubleshooting/typescript-performance-zod.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "f7ed3ba70a7e94ab3633e56ca39c1ed79c6bca507dd6e444ba77c87c821f59e0"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

## Issue

When using the AI SDK 5 with Zod, you may experience:

- TypeScript server crashes or hangs
- Extremely slow type checking in files that import AI SDK functions
- Error messages like "Type instantiation is excessively deep and possibly infinite"
- IDE becoming unresponsive when working with AI SDK code

## Background

The AI SDK 5 has specific compatibility requirements with Zod versions. When importing Zod using the standard import path (`import { z } from 'zod'`), TypeScript's type inference can become excessively complex, leading to performance degradation or crashes.

## Solution

### Upgrade Zod to 4.1.8 or Later

The primary solution is to upgrade to Zod version 4.1.8 or later, which includes a fix for this module resolution issue:

```bash
pnpm add zod@^4.1.8
```

This version resolves the underlying problem where different module resolution settings were causing TypeScript to load the same Zod declarations twice, leading to expensive structural comparisons.

### Alternative: Update TypeScript Configuration

If upgrading Zod isn't possible, you can update your `tsconfig.json` to use `moduleResolution: "nodenext"`:

```json
{
  "compilerOptions": {
    "moduleResolution": "nodenext"
    // ... other options
  }
}
```

This resolves the TypeScript performance issues while allowing you to continue using the standard Zod import.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)