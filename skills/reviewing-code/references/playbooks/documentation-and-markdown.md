# Documentation and Markdown

*Leans on: least astonishment, KISS, Hyrum's Law, DRY (for knowledge).*

Documentation is reviewed like an interface: for whether a reader can act on it correctly. Wrong documentation is worse than none, because it is trusted.

- **Know the reader and the kind of doc.** A tutorial, a how-to, a reference and an explanation have different jobs. A README that mixes all four serves none well. Check the doc does the one job its reader needs.
- **Accurate against the code.** Commands run as written, code samples work against the current API, configuration keys exist, and defaults match. Where possible, examples are executed in CI (doctests or a docs build that runs snippets).
- **Updated in the same PR.** A change to behavior, an endpoint, a config key or a CLI flag updates the docs in the same diff. Missing doc changes are a finding, the same as missing tests.
- **One home for each fact.** The same setup steps in three READMEs will drift apart. Link to the authoritative place instead of copying.
- **Why, not only what.** Reference docs can be generated from code; the valuable hand-written parts are the reasons, constraints and trade-offs the code can't express.
- **Docstrings and comments.** Docstrings on public APIs describe the contract without repeating type hints. Comments explain why. Both are reviewed for accuracy whenever the code next to them changes.
- **Plain and short.** Specific, scannable, with examples. Remove filler and anything a reader can't act on.
- **Public docs are contracts.** Hyrum's Law: whatever the documentation promises, users depend on. Don't document behavior you don't intend to keep.

**Markdown files**

- **Renders where it's read.** GitHub, the docs site, or an agent's context: one H1, headings in order, fenced code blocks with a language, tables that actually render.
- **Links work.** Relative links to files that exist, anchors that exist, and a link checker in CI for docs sites.
- **Linted.** markdownlint, or the project's formatter, so style isn't reviewed by hand.
- **Front matter is valid.** Where files carry YAML front matter (docs sites, skills, subagents), it parses and has the expected fields.
- **Generated sections are regenerated.** Tables of contents and API references produced by a tool aren't edited by hand.
- **Executable Markdown gets its own playbook.** Skills, commands, rules files and prompts are instructions an agent follows; review them with the agent and AI tooling playbooks, not only as prose.
