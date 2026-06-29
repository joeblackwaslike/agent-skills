---
title: vercel agent
product: vercel
url: /docs/cli/agent
canonical_url: "https://vercel.com/docs/cli/agent"
last_updated: 2026-06-06
type: reference
prerequisites:
  - /docs/cli
related:
  []
summary: Generate an AGENTS.md file with Vercel deployment best practices using the vercel agent CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/agent.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "f547e7aeae3d0e7db9d5db09837620b2bee43daf98eb26f133e0a2f569fc255a"
---

# vercel agent

The `vercel agent` command writes a section related to Vercel deployment best practices in your project's agent guidance file so coding agents and assistants have context for how the project should build, deploy, and integrate with Vercel features. The section is wrapped in `<!-- VERCEL BEST PRACTICES START -->` and `<!-- VERCEL BEST PRACTICES END -->` markers so it can be re-applied non-destructively.

The target file is `AGENTS.md` by default; when run from Claude Code, the target is `CLAUDE.md`.

## Usage

```bash filename="terminal"
vercel agent init
```

*Using the \`vercel agent init\` command to include a section about Vercel best practices in
the agent guidance file of the current directory.*

The command checks whether the target file already exists and whether it already contains the section on Vercel best practices:

- If the file doesn't exist, the command creates it with just the marked section.
- If the file exists without the markers, the command appends a marked section to the end. Your existing content is preserved.
- If the file exists and already contains the markers, the command updates only the content between the markers, leaving the rest of the file untouched.

You're prompted to confirm the change before any write. The command never replaces an entire existing file.

## Examples

### Add Vercel best practices to the current project

```bash filename="terminal"
vercel agent init
```

*Run interactively to add or update the marked section in the target file.*

### Skip the confirmation prompt

```bash filename="terminal"
vercel agent init --yes
```

*Use \`--yes\` (shorthand \`-y\`) in CI or other non-interactive environments to
skip the confirmation prompt. Required in non-interactive shells.*

## Unique options

These are options that only apply to the `vercel agent` command.

### Yes

The `--yes` option, shorthand `-y`, skips the confirmation prompt. Required when running in a non-interactive shell.

```bash filename="terminal"
vercel agent init --yes
```

*Skip the confirmation prompt that asks before writing to the target file.*


---

[View full sitemap](/docs/sitemap)
