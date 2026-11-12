# `architectures` skill — design

Spec home on approval: `docs/superpowers/specs/2026-11-11-architectures-skill-design.md` (first commit on the feature branch, worktree `.worktrees/architectures`).

## Context

`domain-driven-design` (DDD) grew into the repo's de facto architecture skill. Of its 2,333 lines, CQRS, event sourcing and application architecture (hexagonal/clean/onion) are 628 lines that are architecture, not domain modeling. Nothing in the repo covers distributed systems, microservices, sagas or event-driven architecture. ECC ships a standalone hexagonal-architecture skill (277-line SKILL.md, no references) that Joe wants pulled in.

Why now: DDD's description and routing table promise too much, `design-patterns` (in flight, PR 3) already catalogs outbox/circuit breaker/idempotency and needs an architecture skill to link to, and a second copy of hexagonal/CQRS would drift.

## Goals

- New skill `skills/architectures/` owning application architecture (hexagonal/clean/onion, CQRS), event-driven (event sourcing, event-driven architecture, sagas) and distributed architecture (microservices, service communication, distributed data).
- DDD shrinks to strategic + tactical design and links out for everything else.
- ECC hexagonal content merged in, deduplicated against DDD's `application-architecture.md`.
- Every inbound link to the moved files updated; no redirect stubs.
- Same conventions and verification gates as `design-patterns`.

## Non-goals

- Rewriting DDD's strategic or tactical content.
- Owning DI. `solid-principles` (dependency inversion) and `design-patterns` (`creational/dependency-injection.md`) keep it. `architectures` covers only the composition root and links out.
- Auto-update doc-fetching scripts. This is hand-authored, not a doc wrapper.
- Java/Kotlin/Go examples from ECC. TypeScript and Python only.

## Anti-goals (would be a failure even if it works)

- Two live copies of the same CQRS/hexagonal text.
- Microservices advocacy. The skill's default is "modular monolith until a real reason", mirroring how DDD opens with "do you even need it".
- Broken `[[domain-driven-design]]`-style links in `SKILLS.md`, `README.md`, `AGENTS.md`, `solid-principles`, `engineering-principles`, `senior-engineering-best-practices`, `authoring-agent-skills`.

## Approaches (Joe chose B)

- **A.** Move CQRS + hexagonal + application architecture; event sourcing stays in DDD. Rejected: `architectures` needs event sourcing for event-driven and sagas, which makes the dependency circular.
- **B (chosen).** Move CQRS, hexagonal, application architecture **and** event sourcing. DDD keeps strategic, tactical, anti-patterns; aggregates still emit domain events and `architectures` owns what happens next.

## Layout

```
skills/architectures/
  SKILL.md                      router: "do you need it" table, route table, red flags, completion criteria
  references/
    catalog.md                  every architecture/pattern; "full reference" vs "catalog-only" rows (design-patterns format)
    anti-patterns.md            MOVED DDD items 7, 8, 9 + new: chatty services, shared database, saga without compensation
    application/
      application-architecture.md   MOVED from DDD + ECC merge (layers, ports/adapters, composition root, migration playbook, test per boundary)
      cqrs.md                       MOVED from DDD
    event-driven/
      event-sourcing.md             MOVED from DDD
      event-driven-architecture.md  NEW: events vs commands, choreography vs orchestration, delivery semantics, idempotent consumers, schema evolution
      sagas.md                      NEW: orchestrated vs choreographed, compensation, Orders -> Payment -> Inventory -> Shipping
    distributed/
      monolith-vs-microservices.md  NEW: decision table, modular monolith first, boundaries from bounded contexts
      microservices.md              NEW: decomposition, data ownership, gateway/BFF, strangler-fig migration
      service-communication.md      NEW: sync vs async, timeouts/retries (links to design-patterns), contracts, versioning
      distributed-data.md           NEW: consistency models, eventual consistency, no distributed transactions -> sagas/outbox
```

Catalog-only rows (named, with "you probably want..." pointers): layered, microkernel, pipes-and-filters, serverless, space-based, CRDTs, two-phase commit.

## What moves out of DDD

- `git mv` (rename-detectable): `cqrs.md`, `event-sourcing.md`, `application-architecture.md`.
- Split `typescript-examples.md` / `python-examples.md`: the "read side (CQRS)" projection section and the "Event-sourced variant" section move into `cqrs.md` / `event-sourcing.md` as worked examples. "Wiring it together" in DDD loses the projection wiring.
- `anti-patterns.md`: items 7 (CQRS/ES cargo-cult), 8 (premature bounded contexts / distributed monolith) and 9 (read concerns polluting the write model) move to `architectures`. DDD keeps 1-6 and 10 plus a pointer.
- DDD `SKILL.md`: strip CQRS/ES/hexagonal from `description` and the route table, trim the "reads skip the aggregate" paragraph and the "Red flags"/"Completion criteria" CQRS/ES lines to pointers, add `Not for` routing to `architectures`, bump `metadata.last_updated`.

## Calls made by me (Joe can overrule)

1. Name is `architectures` (matches Joe's first message; `design-patterns` is plural-ish too).
2. Anti-patterns 7, 8, 9 move; 4 (multi-aggregate transaction) stays in DDD because it is an aggregate-design rule.
3. Only TS + Python examples, continuing the Orders & Fulfillment domain so DDD and `architectures` compose.
4. The ECC skill is merged into `application-architecture.md`, not kept as a separate `hexagonal.md`, to avoid two files on one topic.

## Sourcing (the new content is the risk)

Distributed and event-driven material must come from current authoritative sources, not memory: Richardson's microservices.io (saga, outbox, API gateway, strangler), Azure Architecture Center patterns, AWS Prescriptive Guidance, Fowler, Hohpe's Enterprise Integration Patterns, Kleppmann's *Designing Data-Intensive Applications* for consistency terms. Research agents (Sonnet) fetch and summarize with citations; authoring checks every claim against its source.

## Delivery

Per the size gate, stacked PRs; spec, plan and code stay on one branch lineage, spec is the first commit.

1. **PR 1a (pure move):** spec (first commit), plan, `git mv` of the three files plus anti-patterns extraction, example-section split, all inbound link updates. No new prose.
2. **PR 1b (content):** `architectures/SKILL.md`, `catalog.md`, ECC merge into `application-architecture.md`, DDD `SKILL.md` slim-down, `SKILLS.md`/`README.md`/`AGENTS.md` rows.
3. **PR 2:** `event-driven-architecture.md`, `sagas.md`.
4. **PR 3:** `distributed/` four files.

PRs are sequential: each branches from `main` after the previous one merges (same worktree, rebased). `wt-reap architectures` after PR 3 merges.

`design-patterns` PR 3 is still in flight and edits `SKILLS.md`; rebase on `main` before each PR. Open question for execution, not for Joe: whether `plugin.json` or other manifests enumerate skills (grep first).

## Reviewer questions, resolved (builder check)

- **ECC source and license:** `/Users/joe/github/joeblackwaslike/agent-harness-ecc/skills/ecc/hexagonal-architecture/SKILL.md`, MIT (Affaan Mustafa). Keep DDD's text as the base. Add from ECC only what DDD lacks: define-outbound-ports-first steps, migration playbook, testing per boundary, module layout. Credit ECC in the file and `metadata.origin: ECC`. Drop its Java/Kotlin/Go mapping.
- **Conventions to copy:** `.worktrees/design-patterns/docs/superpowers/specs/2026-11-11-design-patterns-skill-design.md` and its `references/catalog.md` row format. Re-read both at execution start in case they changed.
- **Code-block gate:** same as `design-patterns` PRs (extract blocks, run them, in-memory fakes only, no brokers or databases). Confirm the harness from that spec before PR 1a. After the examples split, DDD's remaining examples must still compile; the Orders types stay canonical in DDD and the moved sections link to them instead of duplicating.
- **Links to unwritten files:** PR 1 links only to files that exist. Catalog rows for later PRs say "planned" with no link; PR 2 and 3 turn them into links.
- **Descriptions:** `lint-descriptions` warns at 400 chars and fails at 1000. Cross-route with `Not for` lines: `architectures` owns microservice boundaries and service splitting; DDD owns finding bounded contexts.
- **Anti-patterns:** now an explicit `architectures/references/anti-patterns.md`.
- **License/size:** the pure-move PR is mostly renames, so it stays small; if it still goes over the size gate, split by file.

## Verification

- `make lint-descriptions` passes for `architectures` and the edited DDD description.
- Every TS/Python code block compiles/runs (same gate as `design-patterns` PRs).
- Relative-link check across `skills/architectures/` and `skills/domain-driven-design/`.
- `rg -l "domain-driven-design/references/(cqrs|event-sourcing|application-architecture)"` across the repo returns nothing.
- DDD `rg -i "cqrs|event sourc|hexagonal"` shows only pointers to `architectures`.
- After merge: grep the plugin cache `~/.claude/plugins/cache/<marketplace>/agent-skills/<sha>/skills/architectures/` to confirm the release landed (SHA-versioned plugin, per repo `AGENTS.md`).
- Self-review via `/self-review` before each PR.
