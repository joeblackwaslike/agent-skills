---
name: code-review-testing
description: Test authoring guidance
source: "https://raw.githubusercontent.com/openai/codex/main/.codex/skills/code-review-testing/SKILL.md"
fetched_at: "2026-06-15T05:54:26.964Z"
sha256: "7722784fda70d201203a99355cdde8c46e70920076bff55bd37c1360f5173055"
---

For agent changes prefer integration tests over unit tests. Integration tests are under `core/suite` and use `test_codex` to set up a test instance of codex.

Features that change the agent logic MUST add an integration test:
- Provide a list of major logic changes and user-facing behaviors that need to be tested.

If unit tests are needed, put them in a dedicated test file (*_tests.rs).
Avoid test-only functions in the main implementation.

Check whether there are existing helpers to make tests more streamlined and readable.
