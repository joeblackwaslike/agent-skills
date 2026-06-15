---
name: code-review-context
description: Model visible context
source: "https://raw.githubusercontent.com/openai/codex/main/.codex/skills/code-review-context/SKILL.md"
fetched_at: "2026-06-15T05:54:26.964Z"
sha256: "0af80b6388ccd525f8e78a57bf878b117cb57e2f611186f017633d3141a445bb"
---

Codex maintains a context (history of messages) that is sent to the model in inference requests.

1. No history rewrite - the context must be built up incrementally.
2. Avoid frequent changes to context that cause cache misses.
3. No unbounded items - everything injected in the model context must have a bounded size and a hard cap. 
4. No items larger than 10K tokens.
5. Highlight new individual items that can cross >1k tokens as P0. These need an additional manual review.
6. All injected fragments must be defined as structs in `core/context` and implement ContextualUserFragment trait