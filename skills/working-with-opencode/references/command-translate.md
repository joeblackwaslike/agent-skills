---
description: translate English to other languages
model: opencode/gpt-6-sol
source: "https://raw.githubusercontent.com/anomalyco/opencode/dev/.opencode/command/translate.md"
fetched_at: "2026-10-05T11:19:21.899Z"
sha256: "7ecab0823ee3ae86b3bb731af3fd8d6c5625c16dd74020e015f5b6926c32886e"
---

run git diff and translate changed english doc and UI copy files to other international languages. Translate all languages in parallel to save time.

Requirements:

- Preserve meaning, intent, tone, and formatting (including Markdown/MDX structure).
- Preserve all technical terms and artifacts exactly: product/company names, API names, identifiers, code, commands/flags, file paths, URLs, versions, error messages, config keys/values, and anything inside inline code or code blocks.
- Also preserve every term listed in the Do-Not-Translate glossary below.
- Also apply locale-specific guidance from `.opencode/glossary/<locale>.md` when available (for example, `zh-cn.md`).
- Do not modify fenced code blocks.
