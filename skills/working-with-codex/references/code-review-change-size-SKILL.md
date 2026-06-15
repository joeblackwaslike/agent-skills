---
name: code-review-change-size
description: Change size guidance (800 lines)
source: "https://raw.githubusercontent.com/openai/codex/main/.codex/skills/code-review-change-size/SKILL.md"
fetched_at: "2026-06-15T05:54:26.964Z"
sha256: "e8184218e0f0b0e906fe4bbe45c46518a8098f4192f2bb4b8a357d04c2fc9e1b"
---

Unless the change is mechanical the total number of changed lines should not exceed 800 lines.
For complex logic changes the size should be under 500 lines.

If the change is larger, explain whether it can be split into reviewable stages and identify the smallest coherent stage to land first.
Base the staging suggestion on the actual diff, dependencies, and affected call sites.

