---
title: uploadSkill
description: API Reference for uploadSkill.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/upload-skill"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/upload-skill.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "48632f31d9785255284d2e8cdfde43b0a13ee491f7a2efe018f77538380e69f0"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Uploads a skill (a bundle of files) to a provider and returns a result whose `providerReference` (a `ProviderReference`) can be used in subsequent inference calls.

```ts
import { uploadSkill } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { readFileSync } from 'fs';

const { providerReference } = await uploadSkill({
  api: anthropic.skills(),
  files: [
    {
      path: 'my-skill/SKILL.md',
      content: readFileSync('./SKILL.md'),
    },
  ],
  displayTitle: 'My Skill',
});
```

## Import

```
import { uploadSkill } from "ai"
```

## API Signature

### Parameters

- `api` (`SkillsV4 | ProviderV4`): The skills API interface to use for uploading. Can be a \`SkillsV4\` instance (e.g. \`anthropic.skills()\`) or a provider instance directly (e.g. \`anthropic\`), in which case \`.skills()\` is called automatically.
- `files` (`SkillsV4File[]`): The files that make up the skill. Each file has a relative \`path\` and \`content\` (either a \`Uint8Array\` or a base64-encoded string).
- `displayTitle?` (`string`): Human-readable title for the skill.
- `providerOptions?` (`ProviderOptions`): Additional provider-specific options.

### Returns

- `providerReference` (`ProviderReference`): A \`Record\<string, string>\` mapping provider names to provider-specific skill identifiers. Pass this when referencing the skill in inference calls.
- `displayTitle?` (`string`): Human-readable title returned by the provider (if supported).
- `name?` (`string`): Skill name inferred by the provider from the uploaded files.
- `description?` (`string`): Skill description inferred by the provider from the uploaded files.
- `latestVersion?` (`string`): Latest version identifier assigned by the provider.
- `providerMetadata?` (`ProviderMetadata`): Additional provider-specific metadata returned from the upload.
- `warnings` (`Warning[]`): Warnings from the provider (e.g. unsupported settings).

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)