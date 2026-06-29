---
title: vercel skills
product: vercel
url: /docs/cli/skills
canonical_url: "https://vercel.com/docs/cli/skills"
last_updated: 2026-06-06
type: reference
prerequisites:
  - /docs/cli
related:
  []
summary: Discover agent skills relevant to your project using the vercel skills CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/skills.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "a30c7e8e870e849a746a6fa7fcd7e974c4bf82e830e78a55b5fdeb3995b3c097"
---

# vercel skills

The `vercel skills` command surfaces agent skills relevant to your project. When run without arguments, it detects the project's framework (via `@vercel/fs-detectors`) and scans the `package.json` file for a curated set of notable dependencies (e.g. ORMs, auth libraries, payment SDKs, testing frameworks). It then recommends matching skills from the catalog. When given a search term, it searches the catalog for that keyword instead.

## Usage

```bash filename="terminal"
vercel skills [query]
```

*Using the \`vercel skills\` command to discover agent skills for the current
project or to search the catalog.*

## Examples

### Recommend skills based on the detected project

```bash filename="terminal"
vercel skills
```

*Run with no arguments to get recommendations tailored to your project.*

### Search for skills by keyword

```bash filename="terminal"
vercel skills nextjs
```

*Pass a keyword to search the skill catalog for matching skills.*

### Get JSON output

```bash filename="terminal"
vercel skills nextjs --json
```

*Use \`--json\` (or \`--format json\`) to emit machine-readable output for scripts
and agents.*

## Unique options

These are options that only apply to the `vercel skills` command.

### JSON

The `--json` option emits results as JSON instead of the default human-readable output. Equivalent to `--format json`.

```bash filename="terminal"
vercel skills --json
```

*Emit results as JSON.*

### Format

The `--format` option, value `json`, selects the output format explicitly.

```bash filename="terminal"
vercel skills --format json
```

*Select the JSON output format explicitly.*

### Yes

The `--yes` option, shorthand `-y`, skips confirmation prompts during interactive flows (for example, when installing a recommended skill).

```bash filename="terminal"
vercel skills --yes
```

*Skip the confirmation prompt in non-interactive environments.*


---

[View full sitemap](/docs/sitemap)
