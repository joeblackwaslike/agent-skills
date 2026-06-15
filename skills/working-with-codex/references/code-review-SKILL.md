---
name: code-review
description: Run a final code review on a pull request
source: "https://raw.githubusercontent.com/openai/codex/main/.codex/skills/code-review/SKILL.md"
fetched_at: "2026-06-15T05:54:26.964Z"
sha256: "430f6588651da6c95647ab33a00711ed5e323310220ebbea7689805051933f25"
---

Use subagents to review code using all code-review-* skills in this repository other than this orchestrator. One subagent per skill. Pass full skill path to subagents. Use xhigh reasoning.

You must return every single issue from every subagent. You can return an unlimited number of findings.
Use raw Markdown to report findings.
Number findings for ease of reference.
Each finding must include a specific file path and line number.

If the GitHub user running the review is the owner of the pull request add a `code-reviewed` label.
Do not leave GitHub comments unless explicitly asked.
