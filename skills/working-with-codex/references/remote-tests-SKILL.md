---
name: remote-tests
description: How to run tests using remote executor.
source: "https://raw.githubusercontent.com/openai/codex/main/.codex/skills/remote-tests/SKILL.md"
fetched_at: "2026-06-15T05:54:26.964Z"
sha256: "03891a22c1dfdda2c4d66690dfccb77ff1f27ee802af18ae81020943b03fb807"
---

Some codex integration tests support a running against a remote executor.
This means that when CODEX_TEST_REMOTE_ENV environment variable is set they will attempt to start an executor process in a docker container CODEX_TEST_REMOTE_ENV points to and use it in tests.

Docker container is built and initialized via ./scripts/test-remote-env.sh

Currently running remote tests is only supported on Linux, so you need to use a devbox to run them

You can list devboxes via `applied_devbox ls`, pick the one with `codex` in the name.
Connect to devbox via `ssh <devbox_name>`.
Reuse the same checkout of codex in `~/code/codex`. Reset files if needed. Multiple checkouts take longer to build and take up more space.
Check whether the SHA and modified files are in sync between remote and local.
