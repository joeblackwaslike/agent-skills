---
title: uploadSkill
description: API Reference for uploadSkill.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/upload-skill"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/upload-skill.md"
fetched_at: "2026-10-26T09:52:56.075Z"
sha256: "c7cd73714304a3bab01d548c8dddb42b1ce6c56dbd5dfef072063bed3a9e2210"
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
      data: readFileSync('./SKILL.md'),
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
- `files` (`UploadSkillFile[]`): The files that make up the skill. Each file must have a relative \`path\` and \`data\`. The \`data\` can be a string, a \`Uint8Array\`, or an object with \`type: 'text'\` and a string \`text\` value, or \`type: 'data'\` and a string \`data\` value.
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