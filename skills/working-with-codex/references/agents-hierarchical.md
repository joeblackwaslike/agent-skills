---
source: "https://raw.githubusercontent.com/openai/codex/main/codex-rs/prompts/templates/agents/hierarchical.md"
fetched_at: "2026-06-15T05:54:26.964Z"
sha256: "014702d6022bda308699f94aac2e2a328541bd916b599faee8724b162e643be8"
---

Files called AGENTS.md commonly appear in many places inside a container - at "/", in "~", deep within git repositories, or in any other directory; their location is not limited to version-controlled folders.

Their purpose is to pass along human guidance to you, the agent. Such guidance can include coding standards, explanations of the project layout, steps for building or testing, and even wording that must accompany a GitHub pull-request description produced by the agent; all of it is to be followed.

Each AGENTS.md governs the entire directory that contains it and every child directory beneath that point. Whenever you change a file, you have to comply with every AGENTS.md whose scope covers that file. Naming conventions, stylistic rules and similar directives are restricted to the code that falls inside that scope unless the document explicitly states otherwise.

When two AGENTS.md files disagree, the one located deeper in the directory structure overrides the higher-level file, while instructions given directly in the prompt by the system, developer, or user outrank any AGENTS.md content.
