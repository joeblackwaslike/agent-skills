---
description: Remove AI code slop
source: "https://raw.githubusercontent.com/anomalyco/opencode/dev/.opencode/command/rmslop.md"
fetched_at: "2026-10-12T11:48:23.877Z"
sha256: "5fd9332ca2f88d6f1ec90232f78cdd93978ba0841df4a377eb2827792c271c8b"
---

Check the diff against `origin/dev`, and remove all AI generated slop introduced in this branch.

This includes:

- Extra comments that a human wouldn't add or is inconsistent with the rest of the file
- Extra defensive checks or try/catch blocks that are abnormal for that area of the codebase (especially if called by trusted / validated codepaths)
- Casts to any to get around type issues
- Any other style that is inconsistent with the file
- Unnecessary emoji usage

Report at the end with only a 1-3 sentence summary of what you changed
