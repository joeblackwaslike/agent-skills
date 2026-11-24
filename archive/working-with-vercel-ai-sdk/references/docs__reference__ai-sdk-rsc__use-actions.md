---
title: useActions
description: Reference for the useActions function from the AI SDK RSC
url: "https://ai-sdk.dev/docs/reference/ai-sdk-rsc/use-actions"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-rsc/use-actions.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "ce8f3a6f3462d30e6246d49db469fbc266c0831c9fa716c154b844e5e76866e7"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

AI SDK RSC is currently experimental. We recommend using [AI SDK
UI](/docs/ai-sdk-ui/overview) for production. For guidance on migrating from
RSC to UI, see our [migration guide](/docs/ai-sdk-rsc/migrating-to-ui).

It is a hook to help you access your Server Actions from the client. This is particularly useful for building interfaces that require user interactions with the server.

It is required to access these server actions via this hook because they are patched when passed through the context. Accessing them directly may result in a [Cannot find Client Component error](/docs/troubleshooting/server-actions-in-client-components).

## Import

```
import { useActions } from "@ai-sdk/rsc"
```

## API Signature

### Returns

`Record<string, Action>`, a dictionary of server actions.

## Examples

- [Learn to manage AI and UI states in Next.js](/examples/next-app/state-management/ai-ui-states)
- [Learn to route React components using a language model in Next.js](/examples/next-app/interface/route-components)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)