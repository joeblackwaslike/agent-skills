# Checklist


The short version, in the same four groups and in review order.

**Simplicity and scope** (KISS, YAGNI, DRY, Rule of Three, Gall's Law)

- [ ] I can state the intent in one sentence, and the change implements its spec: every requirement covered, nothing extra.
- [ ] CI is green, the change is small enough to review, and mechanical edits are in separate commits.
- [ ] Every abstraction, layer, option and hook has a current user.
- [ ] Related code lives together; nothing moved to `utils` or a constants file only for reuse.
- [ ] Deduplication targets shared knowledge, readable literals stay literal, and no shared helper carries mode flags.
- [ ] Any optimization comes with a measurement.

**Design and structure** (SOLID, separation of concerns, cohesion and coupling, Demeter, Tell Don't Ask, composition, CQS)

- [ ] Each layer handles one concern, and the model comes from the domain, not the schema.
- [ ] No missing model is hiding in an argument cluster, a dict, or a meaningful primitive.
- [ ] Objects are valid once constructed, with collaborators injected.
- [ ] Dependencies point the right way, with no cycles and no reach-through chains.
- [ ] Objects enforce their own invariants, and the public surface is minimal.
- [ ] Interfaces are narrow, owned by their consumers, and don't leak.
- [ ] Inheritance is a true is-a, and subclasses substitute cleanly.
- [ ] Branching on type or tag that crosses a boundary is an explicit contract.
- [ ] Each method is a command or a query, and signatures are narrow and typed.

**Correctness and safety** (Fail Fast, Parse Don't Validate, least privilege, explicit over implicit, Hyrum's Law)

- [ ] Input is parsed into typed models at the boundary and trusted inside.
- [ ] Edge cases, failure paths and partial failure are handled; exceptions are caught narrowly.
- [ ] Async code doesn't block, tasks are owned, outbound calls have timeouts, and retries are idempotent.
- [ ] Concurrent writes can't lose updates or create duplicates.
- [ ] Schema types and relationship shapes match the data and its dominant queries.
- [ ] Access is scoped, and no secrets reach code or logs.
- [ ] Changes to observable behavior are intended and backward compatible.

**Readability and review** (least astonishment, explicit over implicit, Chesterton's Fence, Boy Scout Rule)

- [ ] Names and behavior match, and a newcomer could use the API from its signatures.
- [ ] The code is idiomatic for its language, with constructs chosen to fit the intended use.
- [ ] The tests would fail if the behavior broke.
- [ ] Docs, config and migrations changed along with the code that needs them.
- [ ] I've used the matching playbook (see [playbooks/index.md](playbooks/index.md)) for each kind of change in the diff.
- [ ] I know why anything I'm suggesting to remove was there.
- [ ] Every comment is labeled, and I've said which ones block.

