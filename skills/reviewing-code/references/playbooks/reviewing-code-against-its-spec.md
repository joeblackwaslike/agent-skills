# Reviewing code against its spec

*Leans on: YAGNI and KISS (no more), Fail Fast (no less), Chesterton's Fence, least astonishment.*

The diff shows what was built; the spec, plan, ticket or design doc shows what was meant. A review without the spec can check that code is well written, but not that it is the right code. The standard is that what was specified is what was written: no more and no less.

**Use the spec to understand the code**

- **Read it before the diff.** The PR description should link the spec, ADR, design doc or ticket. If it doesn't, ask for it before reviewing in depth. Code with no stated intent can only be reviewed for style.
- **Learn the vocabulary.** Domain terms, states and rules in the spec should appear in the code as names, types and transitions. When the code uses different words for the same thing, that is a least-astonishment finding and often a sign of a misunderstanding.
- **Find the intended use.** The spec says who calls this, how often, with what data, and what matters most. That decides which review concerns dominate: an internal batch job and a public endpoint deserve different scrutiny.
- **Find what was deliberately left out.** Non-goals and out-of-scope sections matter as much as requirements. They tell you which missing features are not gaps.

**Check conformance: no less**

- **Trace each requirement.** Go through the spec's requirements or acceptance criteria and find, for each, the code that implements it and the test that proves it. The requirements table in the guide's PR description template makes this quick for both author and reviewer.
- **Edge cases and errors the spec names.** Specs often state behavior for invalid input, limits, permissions and failure. These are the easiest parts to skip in implementation.
- **Non-functional requirements.** Latency targets, data retention, audit logging, rate limits and access rules are requirements too.

**Check conformance: no more**

- **Everything in the diff traces to the spec.** Extra endpoints, fields, options, flags, configuration or abstractions not in the spec are YAGNI by definition, however reasonable they look. Either the spec should change to include them, or they come out.
- **Scope creep from the author's judgment.** "While I was in here" changes, a broader refactor, or a generalization for future features belong in a separate PR, or a spec update, with their own review.
- **No silent reinterpretation.** If the code does something different from the spec because the author found a better way, that may be right, but it must be stated, agreed and written back into the spec.

**Watch for drift**

Drift is when the spec and the code disagree and nobody decided they should. It accumulates quietly and makes the spec useless as a reference.

- **When code and spec disagree, decide which is right**, then fix the other in the same PR or with a linked follow-up. Don't leave both standing.
- **Specs are versioned with the code** where possible (ADRs and design docs in the repository), so a PR that changes behavior also shows the spec change in the same diff.
- **Check earlier decisions before reversing them.** Chesterton's Fence: if the code contradicts an ADR or a documented decision, find out whether the decision was superseded or the code is wrong.
- **Generated contracts help.** An OpenAPI schema, a database schema dump or a JSON schema checked into the repository turns some drift into a visible diff, and contract tests turn it into a failing build.
