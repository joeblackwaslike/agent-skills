---
source: "https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/plugin/AGENTS.md"
fetched_at: "2026-10-12T11:48:23.877Z"
sha256: "b1f29aa8c7319f2b9aef3de53dc5da24ad38ec33f9db3dc94bfe48a72710eff2"
---

# Plugin Package Guide

- The plugin package has two versions: Effect and Promise.
- In the Effect version, every domain must extend the corresponding Effect API client interface from `@opencode/client/effect/api`.
- Do not redefine functions that already exist on the Effect API client interface.
- Plugin domains add only the additional functions that make sense in the plugin context.
