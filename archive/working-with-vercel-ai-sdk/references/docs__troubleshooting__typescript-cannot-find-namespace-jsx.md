---
title: "TypeScript error \"Cannot find namespace 'JSX'\""
description: Troubleshooting errors related to TypeScript and JSX.
url: "https://ai-sdk.dev/docs/troubleshooting/typescript-cannot-find-namespace-jsx"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/troubleshooting/typescript-cannot-find-namespace-jsx.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "3e6ecbe216313f9d885fa7cb39cdfd1b602327ad3a499f57eaf7bac616564efe"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

## Issue

I am using the AI SDK in a project without React, e.g. an Hono server, and I get the following error:
`error TS2503: Cannot find namespace 'JSX'.`

## Background

The AI SDK has a dependency on `@types/react` which defines the `JSX` namespace.
It will be removed in the next major version of the AI SDK.

## Solution

You can install the `@types/react` package as a dependency to fix the error.

```bash
npm install @types/react
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)