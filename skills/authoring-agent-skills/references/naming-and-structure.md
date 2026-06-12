# Naming & structure

## The three archetypes

Pick the archetype that matches what the skill *does*. The archetype determines the name prefix, the directory layout, and whether you write a fetch script.

### 1. `working-with-X` — wraps external/official docs

**Job:** give an agent comprehensive, grep-able offline documentation for an external tool or library `X`, fetched verbatim from the upstream source.

- `X` is the tool/library/product: `working-with-claude-code`, `working-with-codex`, `working-with-vercel-ai-sdk`, `working-with-github-actions`, `working-with-pieces`, `working-with-cursor`, `working-with-gemini`, `working-with-opencode`.
- `references/` is **auto-fetched** by `scripts/update_docs.js` and carries per-doc freshness frontmatter (`source`/`fetched_at`/`sha256`).
- The SKILL.md body is mostly a **reference map** — it tells the agent to read `references/` first, how files are named, and how to fall back to live docs when something is stale or missing.

```
skills/working-with-<x>/
├── SKILL.md
├── scripts/
│   └── update_docs.js        # fetch + freshness; see doc-fetching-cookbook.md
└── references/               # auto-generated, committed (NOT gitignored)
    ├── <slug>.md             # each carries source/fetched_at/sha256 frontmatter
    └── ...                   # often 100s of files
```

### 2. `developing-X` — plugin/extension build workflow

**Job:** an actionable, phased workflow for *building plugins or extensions for* platform `X`.

- `developing-claude-code-plugins`, `developing-codex-plugins`, `developing-cursor-plugins`, `developing-gemini-plugins`, `developing-opencode-plugins`.
- `references/` is **hand-written** (`plugin-structure.md`, `common-patterns.md`, `troubleshooting.md`, etc.). No fetch script, no per-doc freshness frontmatter.
- The SKILL.md body is a **phased workflow** (Plan → Create → Add components → Test → Debug → Release) with a quick-reference table and a "Critical Rules" section.
- **Cross-references the matching `working-with-X`** for official docs ("For comprehensive official documentation, use the `working-with-X` skill").

```
skills/developing-<x>-plugins/
├── SKILL.md
├── references/               # hand-written guides
│   ├── plugin-structure.md
│   ├── common-patterns.md
│   └── troubleshooting.md
└── examples/                 # optional working examples
```

### 3. Topic / capability skills

**Job:** a capability or domain that isn't a single external tool: `agent-instructions`, `domain-driven-design`, `web-research`, `git-github-workflows`, `multi-provider-plugins`, `interactive-system-docs`.

- Name describes the capability (no fixed prefix). Hand-written `references/`. No fetch script.
- Use a verb-ish, descriptive kebab name. This very skill, `authoring-agent-skills`, is one of these.

```
skills/<topic>/
├── SKILL.md
└── references/               # hand-written
```

## SKILL.md frontmatter spec

```yaml
---
name: <kebab-case>            # MUST equal the directory name
description: Use when ...      # trigger-first, third-person; see below
metadata:
  last_updated: "YYYY-MM-DD"  # coarse "how fresh" signal; stamped by update scripts
---
```

- **`name`** — kebab-case, identical to the skill's directory name. (Outlier to **not** copy: `using-serena` stores metadata in lowercase `skill.md` — every other skill uses uppercase `SKILL.md`. Always use `SKILL.md`.)
- **`description`** — this is what decides whether the skill triggers. Write it **trigger-first** and in the **third person**, starting with "Use when…", and pack it with the concrete phrases, tool names, and tasks that should activate it. For `working-with-X`, list the major APIs/areas the docs cover (so it fires on those terms). Defer description *quality* tuning to `skill-creator` / `superpowers:writing-skills`, but match the voice of existing skills.
- **`metadata.last_updated`** — `YYYY-MM-DD`. For doc-wrappers it's restamped automatically by the update script when a fetched doc changes; for hand-written skills, set it to the creation date and bump it by hand on meaningful edits (or run `node scripts/backfill-last-updated.cjs` to derive it from git history). See [freshness-metadata.md](freshness-metadata.md).

## `references/` organization conventions

- **Fetched docs** carry per-doc frontmatter (`source`, `fetched_at`, `sha256`) — added automatically by `withFrontmatter`. **Hand-written** reference files get **no** such frontmatter (a hand-written file may carry its own `name`/`description` block, as in `working-with-pieces`).
- **Slug naming for fetched docs:** when upstream paths would collide on basename, slugify the **full path** with `/` → `__`, e.g. `/docs/ai-sdk-core/generating-text` → `references/docs__ai-sdk-core__generating-text.md`. When basenames are already unique (e.g. Claude Code's flat `*.md` list), `path.basename(url)` is fine.
- **Grouping:** keep the flat `references/` directory but group by path prefix in naming (`docs__*`, `providers__*`, `cookbook__*`) so an agent can `grep references/` by topic. Document the grouping in the SKILL.md "reference map".
- **Commit generated docs** — they are content, not build artifacts. Never gitignore `references/`.
