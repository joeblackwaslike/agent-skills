---
description: translate English to other languages
model: opencode/gpt-5.6-sol
source: "https://raw.githubusercontent.com/anomalyco/opencode/dev/.opencode/command/translate.md"
fetched_at: "2026-07-27T07:36:29.111Z"
sha256: "88cc12811fb4ae7ec8a69b7252e681d0367bbed3346e9b437fb66cb85a8277f2"
---

run git diff and translate changed english doc and UI copy files to other international languages. Translate all languages in parallel to save time.

Requirements:

- Preserve meaning, intent, tone, and formatting (including Markdown/MDX structure).
- Preserve all technical terms and artifacts exactly: product/company names, API names, identifiers, code, commands/flags, file paths, URLs, versions, error messages, config keys/values, and anything inside inline code or code blocks.
- Also preserve every term listed in the Do-Not-Translate glossary below.
- Also apply locale-specific guidance from `.opencode/glossary/<locale>.md` when available (for example, `zh-cn.md`).
- Do not modify fenced code blocks.
