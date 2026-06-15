---
name: code-breaking-changes
description: Breaking changes
source: "https://raw.githubusercontent.com/openai/codex/main/.codex/skills/code-review-breaking-changes/SKILL.md"
fetched_at: "2026-06-15T05:54:26.964Z"
sha256: "9981e74df2e84183905b6254154d06231b29f9394cb2ec47243e34a095f85031"
---

Search for breaking changes in external integration surfaces:
- app-server APIs
- CLI parameters
- configuration loading
- resuming sessions from existing rollouts

Do not stop after finding one issue; analyze all possible ways breaking changes can happen.
