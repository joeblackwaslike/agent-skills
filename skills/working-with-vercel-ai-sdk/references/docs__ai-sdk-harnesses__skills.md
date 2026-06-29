---
source: "https://ai-sdk.dev/docs/ai-sdk-harnesses/skills.md"
fetched_at: "2026-06-29T05:45:09.899Z"
sha256: "f11e512dfe5384b22a78fa02e94978414eb2cc8e75be3fcb1e2f6ebe425f552d"
---

# Harness Skills

[Skills](https://agentskills.io/) are reusable instruction bundles that can
be useful for project conventions, workflow guidance, domain-specific procedures,
or any other instructions that should be discoverable by the underlying harness
runtime. You can make skills available to a `HarnessAgent` for the lifetime of a
session.

## Define Skills

Pass skills to `HarnessAgent` with the `skills` setting:

```ts
const agent = new HarnessAgent({
  harness: claudeCode,
  sandbox: createVercelSandbox({
    runtime: 'node24',
    ports: [4000],
  }),
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

## Related

- [HarnessAgent](/docs/ai-sdk-harnesses/harness-agent)
- [Harness tools](/docs/ai-sdk-harnesses/tools)
- [Harness adapters](/docs/ai-sdk-harnesses/harness-adapters)


## Navigation

- [Overview](/docs/ai-sdk-harnesses/overview)
- [HarnessAgent](/docs/ai-sdk-harnesses/harness-agent)
- [Tools](/docs/ai-sdk-harnesses/tools)
- [Skills](/docs/ai-sdk-harnesses/skills)
- [Harness Adapters](/docs/ai-sdk-harnesses/harness-adapters)
- [Workflow Utilities](/docs/ai-sdk-harnesses/workflow-utilities)
- [UI](/docs/ai-sdk-harnesses/ui)
- [Terminal UI](/docs/ai-sdk-harnesses/terminal-ui)


[Full Sitemap](/sitemap.md)
