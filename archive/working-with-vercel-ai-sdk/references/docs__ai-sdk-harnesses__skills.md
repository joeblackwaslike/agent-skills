---
title: Skills
description: Use skills with AI SDK harnesses.
url: "https://ai-sdk.dev/docs/ai-sdk-harnesses/skills"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/ai-sdk-harnesses/skills.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "29a1d2b7ab4d255b2feb55f5a2c5b751114618c5b734b2c139f1e9cd12d3ccb2"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

[Skills](https://agentskills.io/) are reusable instruction bundles that can
be useful for project conventions, workflow guidance, domain-specific procedures,
or any other instructions that should be discoverable by the underlying harness
runtime. You can configure skills for a `HarnessAgent` or replace them between
completed turns.

## Define Skills

Pass skills to `HarnessAgent` with the `skills` setting:

```ts
const agent = new HarnessAgent({
  harness: claudeCode,
  skills: [
    {
      name: 'careful-refactors',
      description: 'Make small, low-risk code changes.',
      content:
        'Prefer minimal diffs. Preserve public APIs. Before editing, read references/checklist.md and follow it.',
      files: [
        {
          path: 'references/checklist.md',
          content:
            '# Refactor checklist\n\n- Identify the smallest useful change.\n- Preserve public APIs.\n- Run the narrowest relevant test.',
        },
      ],
    },
  ],
});
```

Each skill has:

- `name`: stable identifier for the skill.
- `description`: short model-facing summary.
- `content`: full instruction content.
- `files`: optional additional text files bundled with the skill.

Additional files use skill-relative POSIX paths, for example
`reference.md`, `references/codes.md`, or `templates/config.json`. Reference
those paths from `content` when the agent should read them.

## When to Use Skills

Use skills for reusable instructions that should be available on demand, instead of
always being loaded into the agent's context like regular `instructions`.

Use `instructions` for broad agent behavior and current-session priorities.

Skills can be changed between completed turns using `callOptionsSchema` and
`prepareCall`. See [Change Settings Between Turns](/docs/ai-sdk-harnesses/harness-agent#change-settings-between-turns)
for details.

## Related

- [HarnessAgent](/docs/ai-sdk-harnesses/harness-agent)
- [Harness tools](/docs/ai-sdk-harnesses/tools)
- [Harness adapters](/docs/ai-sdk-harnesses/harness-adapters)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)