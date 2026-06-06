# Cookbook: Minimal Project

**For:** Side projects, scripts, prototypes, small solo tools  
**Target size:** 10–25 lines  

A minimal instruction file is better than none, but the goal here is to include only what
would genuinely trip up an AI assistant on a cold start. Everything else can be inferred
from the code.

---

## Template

```markdown
# [Project Name]

[One sentence describing what this does.]

## Commands

\`\`\`bash
[primary run command]
[test command, if any]
\`\`\`

## Notes

- [One or two non-obvious conventions, if any]
- [Any surprising dependency choice or constraint]
```

That's it. If you can't fill in "Notes" with anything genuinely non-obvious, leave it out.

---

## Why So Short?

For a small solo project, most context can be derived from the code itself. The instruction
file's job is to answer the questions the code can't answer:

- **What command runs this?** — Claude can't always guess the entrypoint.
- **Is there anything obviously wrong with the standard approach?** — A one-liner.

Everything else — file structure, language patterns, common libraries — Claude already knows.

---

## When to Grow Beyond Minimal

Upgrade to a fuller template when:

- You're onboarding contributors (they need shared context)
- The project has non-obvious architecture or naming conventions
- There are commands or tooling choices that would surprise a developer
- Claude keeps making the same incorrect assumption about the project

---

## Examples

**A Python CLI script:**

```markdown
# invoice-parser

Parses PDF invoices and extracts line items to CSV.

## Commands

\`\`\`bash
uv run invoice_parser.py [pdf-path]
uv run pytest
\`\`\`

## Notes

- Uses `pdfplumber` for extraction — `pypdf` doesn't handle table layouts correctly
```

**A small TypeScript utility:**

```markdown
# slug-gen

CLI that generates URL slugs from arbitrary strings with custom separators.

## Commands

\`\`\`bash
pnpm build   # tsup → dist/
pnpm test    # vitest
\`\`\`
```

**A prototype with no tests:**

```markdown
# dashcam-sync

Syncs dashcam footage from SD card to NAS, deduplicating by hash.

## Commands

\`\`\`bash
python sync.py --source /Volumes/DASHCAM --dest /mnt/nas/footage
\`\`\`

## Notes

- Footage files are compared by SHA-256 of first 1MB only (full hash is too slow)
- Dry-run mode: add `--dry-run` — nothing is moved or deleted
```

---

## Common Pitfalls

- **Saying nothing:** Even a one-liner description + the run command is much better than
  no file at all. Claude has to guess the entrypoint without it.
- **Over-explaining:** A minimal project doesn't need architecture sections. Trust Claude
  to read the code.
- **Forgetting the surprising bits:** Even tiny projects often have one thing that
  deviates from the obvious approach (a non-default dependency, a quirky naming rule,
  a required environment variable). That's the most valuable content in the file.
