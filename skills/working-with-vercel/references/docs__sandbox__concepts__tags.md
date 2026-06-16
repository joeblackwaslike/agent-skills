---
title: Tags
product: vercel
url: /docs/sandbox/concepts/tags
canonical_url: "https://vercel.com/docs/sandbox/concepts/tags"
last_updated: 2026-05-25
type: conceptual
prerequisites:
  - /docs/sandbox/concepts
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/sandbox/sdk-reference
  - /docs/sandbox/python-sdk-reference
  - /docs/sandbox/cli-reference
summary: Categorize sandboxes by environment, team, or any other criteria using key-value tags.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/concepts/tags.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "5b5bec23504a24c8e74c6401e824d924c83d97f57ca8cb7acf09534d635deb2a"
---

# Tags

Tags let you categorize sandboxes by environment, team, or any other criteria. Each sandbox supports up to five key-value tags that you can set during creation, update at any time, and filter on when listing sandboxes.

## SDK usage

Set, update, and filter on tags from the JS SDK using `Sandbox.create()`, `sandbox.update()`, and `Sandbox.list()`.

### Create a sandbox with tags

Pass the `tags` field when creating a sandbox. You can assign up to five key-value tags:

```ts filename="index.ts"  highlight={5}
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  name: 'my-sandbox',
  tags: { env: 'staging' },
});
```

### Update tags

Use `sandbox.update()` to change a sandbox's tags at any time. The provided object replaces the existing tag set, so pass every tag you want to keep:

```ts filename="index.ts"
await sandbox.update({
  tags: { env: 'production', team: 'infra' },
});
```

### Filter sandboxes by tag

Pass a `tags` object to `Sandbox.list()` to filter results. You can filter by one tag at a time:

```ts filename="index.ts"
const productionSandboxes = await Sandbox.list({
  tags: { env: 'production' },
});

for await (const sandbox of productionSandboxes) {
  console.log(sandbox.name);
}
```

## CLI usage

The `sandbox` CLI mirrors the SDK: use `--tag` on creation, `sandbox config tags` to update, and `--tag` on `sandbox list` to filter.

### Create a sandbox with tags

Use `--tag key=value` (repeatable) on `sandbox create` or `sandbox run`:

```bash filename="Terminal"
sandbox create --name my-sandbox --tag env=staging --tag team=infra
```

### Update tags on an existing sandbox

`sandbox config tags` replaces the full tag set in one call. Pass every tag you want to keep:

```bash filename="Terminal"
sandbox config tags my-sandbox --tag env=production --tag team=infra
```

Omit `--tag` to clear all tags.

### Filter sandboxes by tag

Pass `--tag key=value` to `sandbox list` to narrow the result set:

```bash filename="Terminal"
sandbox list --tag env=production
```

## Limitations

Tags have a few hard limits to keep in mind when designing your tagging scheme:

- Each sandbox supports a maximum of five tags.
- `Sandbox.list()` and `sandbox list` support filtering by one tag at a time.

## Next steps

- [Persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes): Learn how persistent sandboxes automatically save and restore state.
- [JS SDK Reference](/docs/sandbox/sdk-reference): Full API documentation for the JavaScript SDK.
- [Python SDK Reference](/docs/sandbox/python-sdk-reference): Full API documentation for the Python SDK.
- [CLI Reference](/docs/sandbox/cli-reference): Command reference for the CLI.


---

[View full sitemap](/docs/sitemap)
