---
title: "Model is not assignable to type \"LanguageModelV1\""
description: Troubleshooting errors related to incompatible models.
url: "https://ai-sdk.dev/docs/troubleshooting/model-is-not-assignable-to-type"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/troubleshooting/model-is-not-assignable-to-type.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "498199b00cb06a6168e52aac8111dc50ed2e3ccc6faeb6a5c0260d83cfab7457"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

## Issue

I have updated the AI SDK and now I get the following error: `Type 'SomeModel' is not assignable to type 'LanguageModelV1'.`

Similar errors can occur with

`EmbeddingModelV4`

as well.

## Background

Sometimes new features are being added to the model specification.
This can cause incompatibilities with older provider versions.

## Solution

Update your provider packages and the AI SDK to the latest version.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)