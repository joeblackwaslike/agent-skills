---
name: code-review
description: Run a final code review on a pull request
source: "https://raw.githubusercontent.com/openai/codex/main/.codex/skills/code-review/SKILL.md"
fetched_at: "2026-06-29T05:41:54.371Z"
sha256: "9446d3939a620b337685a393b4fdc3b456c5d330e920615cc530342355131e2a"
---

Use subagents to review code using all code-review-* skills other than this orchestrator. One subagent per skill. Pass full skill path to subagents. Use xhigh reasoning.

You must return every single issue from every subagent. You can return an unlimited number of findings.
Use raw Markdown to report findings.
Number findings for ease of reference.
Each finding must include a specific file path and line number.

If the GitHub user running the review is the owner of the pull request add a `code-reviewed` label.
Do not leave GitHub comments unless explicitly asked.
