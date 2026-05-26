# README Copy Patterns

## Tagline Formula

Use:

```text
<verb/outcome> for <specific audience> who are tired of <specific pain>.
```

Examples:

- "Run VS Code extension tests like browser checks: build, launch, observe, repeat."
- "Turn messy agent transcripts into reusable memory without burying yourself in logs."
- "Ship a polished MCP server without hand-writing the same boilerplate again."

## Pain-Point Openers

Good:

```markdown
Most VS Code extensions fail in the gap between "TypeScript compiles" and "the Extension Host actually works." This skill closes that gap with a repeatable runtime feedback loop.
```

Weak:

```markdown
This project is a powerful and flexible toolkit for developers.
```

## CTA Patterns

Install CTA:

```markdown
```bash
pnpm add <package>
```
```

Marketplace CTA:

```markdown
Install from the [VS Code Marketplace](URL), then run **Command Name** from the Command Palette.
```

Plugin CTA:

```markdown
```bash
/plugin install <name>@<marketplace>
```
```

Template CTA:

```markdown
Click **Use this template**, then run:
```

## Three Value Bullets

Use three bullets with parallel shape:

```markdown
- **Diagnose faster** with Extension Host logs, fixture workspaces, and command smoke tests.
- **Convert cleaner** by separating browser UI from VS Code webview glue.
- **Publish with confidence** using package checks, badge verification, and install-proof docs.
```

## See-It-Work Block

For tools, put a compact example early:

```markdown
```bash
$ tool scan .
✓ Found 3 workspace issues
✓ Wrote .vscode/settings.json
✓ Extension Host smoke test passed
```
```

## Tone

Be specific, direct, and evidence-backed. Avoid:

- "revolutionary"
- "game-changing"
- "seamless" unless proven
- "easy" without showing the easy path
- "enterprise-grade" without enterprise proof

## Tightening a Visual README

When the README already looks good, rewrite copy to make each visual land harder:

- Replace generic captions with the takeaway.
- Move caveats below the install path unless they affect first use.
- Turn paragraph explanations into one-line claims plus a visual.
- Use section titles as claims, not labels.
- Cut repeated setup phrases.

Weak:

```markdown
## How it works

This section explains how the system works at a high level and describes the architecture.
```

Stronger:

```markdown
## Keep the raw data out of context.

The sandbox does the heavy lifting; Claude only sees the final answer.
```
