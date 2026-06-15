---
description: translate English to other languages
model: opencode/claude-opus-4-8
source: "https://raw.githubusercontent.com/anomalyco/opencode/dev/.opencode/command/translate.md"
fetched_at: "2026-06-15T05:56:15.706Z"
sha256: "4c255dcb040acecfc1453463e397ea09aa208faddab74988c04a6784049b9d8a"
---

run git diff and translate changed english doc and UI copy files to other international languages. Translate all languages in parallel to save time.

Requirements:

- Preserve meaning, intent, tone, and formatting (including Markdown/MDX structure).
- Preserve all technical terms and artifacts exactly: product/company names, API names, identifiers, code, commands/flags, file paths, URLs, versions, error messages, config keys/values, and anything inside inline code or code blocks.
- Also preserve every term listed in the Do-Not-Translate glossary below.
- Also apply locale-specific guidance from `.opencode/glossary/<locale>.md` when available (for example, `zh-cn.md`).
- Do not modify fenced code blocks.
