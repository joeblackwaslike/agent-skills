# AI-generated and AI-assisted code

*Leans on: KISS, YAGNI, reviewing code against its spec, Chesterton's Fence.*

Code written with an AI tool is held to exactly the same standard as any other code, and the author owns every line of it: they should be able to explain any part when asked. What changes is where to look, because generated code fails in characteristic ways and tends to arrive in larger diffs.

- **Scope beyond the spec.** Extra options, helpers, abstractions, fallback paths and features nobody asked for. Check the diff against the spec strictly: no more, no less.
- **Plausible but wrong APIs.** Function names, parameters and library features that look right but don't exist, are deprecated, or behave differently in the version you pin. Confirm unfamiliar calls against the docs, or Cmd+click through to the installed source.
- **Invented or unvetted packages.** A dependency name suggested by a model may not exist, or may be a malicious package registered under that name. Apply the dependencies playbook to every new import.
- **Defensive noise.** `try`/`except` around everything, redundant `None` checks, and silent fallbacks that turn failures into wrong results. Fail Fast applies.
- **Comments that narrate.** Comments restating each line, docstrings that repeat the types, and section-header comments. Ask for them to be removed.
- **Duplicates of existing code.** A new helper that reimplements something the codebase already has. Search before accepting it.
- **Inconsistency with the codebase.** Different error handling, logging, naming, typing style or async model from the surrounding code.
- **Tests bent to pass.** Weakened assertions, new `skip` or `xfail` markers, expected values copied from the output, or mocks of the code under test. Read test changes in an AI-assisted PR especially closely.
- **Unexplained removals.** Deleted guards, retries or edge-case handling with no reason given. Apply Chesterton's Fence.

An AI reviewer can be a useful first pass on any PR, catching mechanical issues before a person looks. Its findings are suggestions to weigh, and a human still owns the verdict.
