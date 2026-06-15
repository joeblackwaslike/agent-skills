---
description: Remove AI code slop
source: "https://raw.githubusercontent.com/anomalyco/opencode/dev/.opencode/command/rmslop.md"
fetched_at: "2026-06-15T05:56:15.706Z"
sha256: "066e981569517dc46dc34360e17bc40a02e4790ebbc75c4a360ce0745c377c64"
---

Check the diff against dev, and remove all AI generated slop introduced in this branch.

This includes:

- Extra comments that a human wouldn't add or is inconsistent with the rest of the file
- Extra defensive checks or try/catch blocks that are abnormal for that area of the codebase (especially if called by trusted / validated codepaths)
- Casts to any to get around type issues
- Any other style that is inconsistent with the file
- Unnecessary emoji usage

Report at the end with only a 1-3 sentence summary of what you changed
