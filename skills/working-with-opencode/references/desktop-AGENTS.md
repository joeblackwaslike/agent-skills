---
source: "https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/desktop/AGENTS.md"
fetched_at: "2026-06-15T05:56:15.706Z"
sha256: "de82030fe8460f2dc2fd16be8c058387c122e12ed3e94459ee55f6ac0fa767e7"
---

# Desktop package notes

- Renderer process should only call `window.api` from `src/preload`.
- Main process should register IPC handlers in `src/main/ipc.ts`.
