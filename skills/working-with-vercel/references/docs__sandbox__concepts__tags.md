---
title: Tags
product: vercel
url: /docs/sandbox/concepts/tags
canonical_url: "https://vercel.com/docs/sandbox/concepts/tags"
last_updated: 2026-08-25
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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/concepts/tags.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "32c9998a316ec2b5a8cb5ebce772b0b0ec2b713518e5a03c43a4f564830c1ef8"
---

# Tags

Tags let you categorize sandboxes by environment, team, or any other criteria. Each sandbox supports up to five key-value tags that you can set during creation, update at any time, and filter on when listing sandboxes.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Custom tags available in beta on Vercel Sandbox](https://vercel.com/changelog/custom-tags-available-in-beta-on-vercel-sandbox)
- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/run-commands-in-sandbox) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Quickstart](https://vercel.com/docs/sandbox/quickstart) — Learn how to run your first code in a Vercel Sandbox.
- [Run isolated AI agents in one sandbox](https://vercel.com/docs/sandbox/concepts/multi-agent) — Give each AI agent an isolated Linux user in a Vercel Sandbox with the JS and Python SDKs, then share files between agen
- [Delete a sandbox](https://vercel.com/docs/rest-api/sandboxes/delete-a-sandbox) — DELETE /v2/sandboxes/{name} — Deletes a sandbox by name. If sandboxes are currently running, they will be stopped first.

Full cross-link map for this page: [/docs/sandbox/concepts/tags.graph.md](/docs/sandbox/concepts/tags.graph.md)
<!-- /docsgraph:related -->

## SDK usage

Set, update, and filter on tags from the SDKs.

### Create a sandbox with tags

Pass the `tags` field when creating a sandbox. You can assign up to five key-value tags:

**index.ts**

```ts filename="index.ts" highlight={5}
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  name: 'my-sandbox',
  tags: { env: 'staging' },
});
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    await sandbox.create_sandbox(
        name="my-sandbox",
        tags={"env": "staging"},
    )


asyncio.run(main())
```

### Update tags

Update a sandbox to change its tags at any time. The tags you provide replace the existing tag set, so pass every tag you want to keep:

**index.ts**

```ts filename="index.ts"
await sandbox.update({
  tags: { env: 'production', team: 'infra' },
});
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-sandbox")
    await box.update(tags={"env": "production", "team": "infra"})


asyncio.run(main())
```

### Filter sandboxes by tag

Filter the list of sandboxes by tag. You can filter by one tag at a time:

**index.ts**

```ts filename="index.ts"
const productionSandboxes = await Sandbox.list({
  tags: { env: 'production' },
});

for await (const sandbox of productionSandboxes) {
  console.log(sandbox.name);
}
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox
from vercel.sandbox import SandboxQueryByCreatedAt, TagFilter


async def main() -> None:
    query = SandboxQueryByCreatedAt(
        tag=TagFilter(key="env", value="production")
    )

    async for box in sandbox.query_sandboxes(query=query):
        print(box.name)


asyncio.run(main())
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
- Tag keys can contain only ASCII letters, numbers, hyphens, underscores, periods, and forward slashes, and can be up to 128 characters long.
- Tag values can be up to 256 characters long.
- `Sandbox.list()` and `sandbox list` support filtering by one tag at a time.

## Next steps

- [Persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes): Learn how persistent sandboxes automatically save and restore state.
- [JS SDK Reference](/docs/sandbox/sdk-reference): Full API documentation for the JavaScript SDK.
- [Python SDK Reference](/docs/sandbox/python-sdk-reference): Full API documentation for the Python SDK.
- [CLI Reference](/docs/sandbox/cli-reference): Command reference for the CLI.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
