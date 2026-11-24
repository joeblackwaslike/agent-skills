# Common Cursor Plugin Patterns

## Decision Matrix: Which Component to Use?

| Goal | Component | When |
|------|-----------|------|
| Persistent AI guidance in every session | Rule (`alwaysApply: true`) | Team conventions, project context, coding standards |
| Context injected when editing specific files | Rule (with `globs`) | Framework-specific guidance, file-type rules |
| Guidance AI discovers based on topic | Rule (Agent Requested) | Reference material, domain knowledge |
| Complex multi-step workflow | Skill | Deploy, audit, scaffold, generate reports |
| Discrete slash-command action | Command | Quick operations invoked by name |
| External system access | MCP Server | Databases, APIs, issue trackers, CI systems |
| Lifecycle automation | Hook | On session start, file save, pre-commit |
| Custom agent persona | Agent | Specialized subagent with distinct capabilities |

## Pattern 1: Rules-Only Plugin

**Use when**: You want to inject consistent AI context without any executable behavior. Lowest overhead, easiest to maintain.

```text
my-rules-plugin/
├── .cursor-plugin/
│   └── plugin.json
└── rules/
    ├── project-context.mdc    # alwaysApply: true — always load
    ├── typescript.mdc         # globs: ["**/*.ts"] — auto-attached
    └── api-design.mdc        # description only — agent requested
```

**Best for**: Coding standards, project onboarding, team conventions, framework guidance.

## Pattern 2: Rules + Skills

**Use when**: You need both persistent guidance AND reusable complex workflows.

```text
my-plugin/
├── .cursor-plugin/
│   └── plugin.json
├── rules/
│   └── project-context.mdc
└── skills/
    ├── deploy/
    │   └── SKILL.md
    └── security-audit/
        └── SKILL.md
```

**Best for**: Team developer experience packs — context injection plus reusable workflows.

## Pattern 3: MCP Integration Plugin

**Use when**: You need the agent to read/write external systems (databases, APIs, issue trackers).

```text
my-mcp-plugin/
├── .cursor-plugin/
│   └── plugin.json
├── rules/
│   └── mcp-usage-guide.mdc   # Teaches agent when/how to use the MCP tools
└── mcp/
    └── servers.json
```

**rules/mcp-usage-guide.mdc** should explain:
- What the MCP server can do
- When to use each tool
- Any constraints or rate limits

**Best for**: Database introspection, GitHub integration, Jira/Linear, Stripe, custom internal APIs.

## Pattern 4: Full-Featured Plugin

**Use when**: You're building a comprehensive developer experience pack or marketplace plugin.

```text
my-full-plugin/
├── .cursor-plugin/
│   └── plugin.json
├── rules/
│   ├── always-on.mdc
│   └── file-specific.mdc
├── skills/
│   └── complex-workflow/
│       └── SKILL.md
├── commands/
│   └── quick-action.md
├── agents/
│   └── specialist.md
├── hooks/
│   └── hooks.json
└── mcp/
    └── servers.json
```

**Best for**: Marketplace plugins, comprehensive team setups, products built on Cursor.

## Pattern 5: Team Marketplace Plugin

**Use when**: You're distributing internally across a team or organization.

Same structure as any plugin, distributed via:
1. Create GitHub repo with plugin structure
2. In Cursor team settings, add the repo as a team marketplace
3. Team members install via Cursor's plugin browser

**Key addition**: Include a clear README with what each rule/skill does and how to configure it.

## Rule Activation Mode Patterns

### Always On (project context)
```yaml
---
alwaysApply: true
---
This is a [Project Name] repository. Key facts:
- Stack: TypeScript, Next.js 15, Supabase
- Monorepo: apps/web, apps/api, packages/shared
- Testing: Vitest + Playwright
```
Keep under 200 words — loaded into every request.

### Auto-Attached (file-type guidance)
```yaml
---
globs: ["**/*.test.ts", "**/*.spec.ts"]
alwaysApply: false
---
When writing tests for this project:
- Use `describe`/`it` blocks
- Mock at the module level with `vi.mock`
- Prefer `toMatchInlineSnapshot` for small outputs
```

### Agent Requested (reference knowledge)
```yaml
---
description: API design patterns and REST conventions for this project's endpoints
alwaysApply: false
---
# API Design Reference
[detailed reference content...]
```
Write descriptions as search queries — the agent matches these to user intent.

### Manual Only (heavy reference)
```yaml
---
# No description, no globs, no alwaysApply
---
# Database Schema Reference
[full schema dump or heavy reference content]
```
User invokes with `@rule-name` in chat.

## Glob Pattern Reference

| Pattern | Matches |
|---------|---------|
| `**/*.ts` | All TypeScript files at any depth |
| `src/**/*.tsx` | `.tsx` files under `src/` at any depth |
| `src/*.tsx` | `.tsx` files directly in `src/` only |
| `**/*.{ts,tsx}` | Both `.ts` and `.tsx` |
| `**/test/**` | Any path containing `/test/` segment |
| `apps/web/**` | All files under `apps/web/` |

**Common pitfall**: `src/*.tsx` does NOT match `src/components/Button.tsx` — use `src/**/*.tsx` for recursive matching.
