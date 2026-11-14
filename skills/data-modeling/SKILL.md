---
name: data-modeling
description: >-
  Use when a feature, spec or architecture needs new persistent data in a relational database: new tables or columns, relationships between entities, or a schema sketch for review. Not for aggregates and bounded contexts (domain-driven-design), event sourcing or CQRS (code-architectures), or reviewing a finished diff (reviewing-code).
metadata:
  last_updated: "2026-11-14"
---

# Data Modeling

Use this skill while designing a feature that adds data to a relational database, before any migration or ORM code exists. It produces one short data-model section for the spec. A human reviewer reads that section to approve the design, so it has to be reviewable in a few minutes.

The queries a feature runs decide the model. Tables follow from them. Dialect-specific DDL and migration mechanics come later, in the plan.

## Do you need the full method?

| Situation | Do |
| --- | --- |
| One nullable column on an existing table, no new relationship | Add it, then run the checklist |
| One or more new tables, or a new relationship between entities | The full method |
| The domain has rich invariants and state transitions | `domain-driven-design` first, then come back for the persistence side |
| The data does not fit rows and joins (graph traversal, event streams) | Say so in the spec and stop. This skill assumes a relational database |

## The spec section

A data-model section has six parts, in this order, and fits on one page, about sixty lines of prose and tables plus one DBML block.

1. **Existing schema.** The conventions the new tables follow (naming, id type, timestamps, soft delete, tenancy) and the gaps the feature exposes, one line each.
2. **Access patterns.** A table with one row per query or write the feature makes: who runs it, what it reads or writes, the filters and ordering, and the expected volume.
3. **Model.** One DBML block covering every new table, relationship, key and constraint. Existing tables it references appear as id-only stubs so the block parses.
4. **Decisions.** One line each for the choices a reviewer could reasonably dispute, with the reason.
5. **Open questions.** Only the ones where the reviewer's answer changes the model.
6. **Migration.** One line saying whether the change is additive and whether it needs a backfill.

Write-path procedures, transaction steps, index-build commands and dialect syntax go in the plan. The spec states what the data is and why.

## Route first

| Task | Read |
| --- | --- |
| Working through the design, with one worked example | `references/design-method.md` |
| Checking a draft model before handing it over | `references/model-review-checklist.md` |
| Writing the model in DBML | `references/dbml-syntax.md`, `references/dbml-cli.md` |
| Linting a model with tools instead of by reading | `references/linting-tools.md` |
| Column types, keys, foreign key behavior, relationship shapes | [data modeling playbook](../reviewing-code/references/playbooks/data-modeling-tables-relationships-and-domain-objects.md) |
| Choosing indexes for the access patterns | [queries and indexes playbook](../reviewing-code/references/playbooks/queries-and-indexes.md) |
| Sequencing the migration against the deploy | [migrations playbook](../reviewing-code/references/playbooks/migrations-and-deployment-sequencing.md) |

## Related skills

- `domain-driven-design` owns aggregates, entities and bounded contexts. This skill takes the model it produces and designs the tables.
- `code-architectures` owns CQRS, event sourcing and distributed data.
- `joe-stack-preferences` owns the choice of database, ORM and migration tool.
- `reviewing-code` reviews a finished schema diff. The playbooks linked above are its checklists, and this skill reuses them for depth.
- `brainstorming` and `writing-plans` are where the spec section lives and where the implementation detail goes.

The reference pages on DBML are fetched snapshots. Refresh them from the repo root with `make update-data-modeling`.
