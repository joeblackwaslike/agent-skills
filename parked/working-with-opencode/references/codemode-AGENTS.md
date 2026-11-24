---
source: "https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/codemode/AGENTS.md"
fetched_at: "2026-10-12T11:48:23.877Z"
sha256: "95763f9a5065d68dd435c7972381ab7fa4d734e1cd871d98c4140b7f5d9eadad"
---

# @opencode/codemode

- `interpreter-support.md` is a checklist, not a changelog: check off newly added support and add unchecked items for significant gaps. Leave it alone for fixes and refactors.
- Program values are `Value` (`src/interpreter/objects.ts`). Host values are `unknown` and enter only through `fromHost` and `fromJson`; do not widen program-facing signatures to `unknown`.
- Each built-in object kind is one `Obj` subclass (`Wrapper` or `Opaque`) that overrides the hooks it needs. Ask the object instead of adding `instanceof` ladders.
