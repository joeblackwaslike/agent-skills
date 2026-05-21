---
name: context7
description: >-
  Retrieves up-to-date documentation, API references, and code examples for any developer library or
  framework via the Context7 MCP server. Use for API syntax questions, configuration options, version
  migration, library-specific debugging, setup instructions, and CLI tool usage. Prefer over web search
  for library documentation. Even well-known libraries (React, Next.js, Prisma, Tailwind, Django) may
  have API changes not in training data.
---

# Context7 Documentation Lookup

Two-step process: resolve the library name to an ID, then query docs with that ID.

## Step 1: Resolve a Library

Call `mcp__context7__resolve-library-id` with `libraryName` and `query` (the user's full question).

Result fields: Library ID (`/org/project`), Name, Description, Code Snippets, Source Reputation, Benchmark Score, Versions.

**Selection order:** name similarity → description relevance → code snippet count → source reputation → benchmark score.

- For version-specific queries ("Next.js 15", "React 19"), prefer version-specific IDs (e.g., `/vercel/next.js/v14.3.0`)
- When multiple matches exist, prefer official/primary packages over community forks

## Step 2: Query Documentation

Call `mcp__context7__query-docs` with `libraryId` and `query`.

**Writing good queries:**
- Good: `"How to set up authentication with JWT in Express.js"`
- Bad: `"auth"`, `"hooks"` (too vague — returns generic results)

Use the user's full question as the query. Max 3 attempts per question.

## Fallback

If quota error ("Monthly quota reached"): tell the user, suggest setting `CONTEXT7_API_KEY`, do not silently fall back to training data.
