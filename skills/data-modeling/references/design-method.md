# Design method

Work through these steps in order. Each one fills a part of the spec section described in `SKILL.md`. The depth on keys, types and relationship shapes lives in the [data modeling playbook](../../reviewing-code/references/playbooks/data-modeling-tables-relationships-and-domain-objects.md), so this page says where each step uses it and does not repeat it.

## 1. Read what exists

Open the current schema, or the ORM models if there are no migrations, before proposing anything. Record two things in the spec's first part.

- The conventions to follow: table and column naming, id type, timestamp columns, how soft delete works, which column scopes a row to a tenant or owner.
- The gaps the feature exposes: a column the feature needs that the table lacks, a table the conventions say should have soft delete and does not.

If the schema is not available, or you infer something about it that you cannot confirm, say what you assumed and put it in the open questions.

## 2. Write the access patterns

List every read and write the feature makes before drawing any table. One row each, with the actor, the data touched, the filters and ordering, and the rough volume. A pattern the schema cannot answer with a join or an index is a design gap to fix now.

| Pattern | Actor | Reads or writes | Filter and order | Volume |
| --- | --- | --- | --- | --- |
| List labels on a task | Any user | Reads `labels` via the join table | By task | A few per task |
| Find tasks with a label | Any user | Reads the join table | By label | Hundreds per label |
| Create a label | Admin | Writes `labels` | Name unique per tenant | Rare |

## 3. Name entities and relationships

Take the nouns from the access patterns. For each pair, decide the cardinality and which side holds the foreign key. A link that carries its own data (a role, a quantity, a start date) is an entity with a name. The playbook's relationship shapes section covers one-to-many, one-to-one, many-to-many, polymorphic references and hierarchies.

## 4. Add keys and constraints

Express every invariant in the database: primary keys, unique constraints, foreign keys with a deliberate delete behavior, `NOT NULL`, and checks. If the existing schema scopes rows to a tenant, a new child row should not be able to point at a parent in another tenant. The playbook's tables section covers keys, constraints and soft-delete interactions.

## 5. Normalize, then justify any exception

Start normalized. A denormalized column needs a named access pattern from step 2 and a way to keep it in step. Without both, remove it.

## 6. Sketch the model in DBML

Write one DBML block for the new tables. Use `TablePartial` for columns every table shares, such as ids and timestamps. Two limits to know before relying on the sketch:

- Inline `ref:` cannot carry `delete:` or `update:` settings. Use a separate `Ref:` line when the delete behavior is part of the design.
- The documented index settings are `type`, `name`, `unique`, `pk` and `note`. A partial unique index, which soft delete often calls for, cannot be written. State it in the decisions part.

Write column types from DBML's plain set (`int`, `bigint`, `uuid`, `varchar`, `text`, `date`, `timestamp`) so the sketch stays engine-neutral, and state the time-zone handling in the decisions. Stub each existing table a new table references, as `tenants` and `tasks` are below, so the block parses on its own.

```dbml
Table tenants {
  id uuid [pk]
}

Table tasks {
  id bigint [pk]
  tenant_id uuid [not null]

  indexes {
    (tenant_id, id) [unique]
  }
}

Table labels {
  id bigint [pk, increment]
  tenant_id uuid [not null, ref: > tenants.id]
  name varchar(60) [not null]
  color varchar(7)
  created_at timestamp [not null, default: `now()`]

  indexes {
    (tenant_id, id) [unique]
    (tenant_id, name) [unique]
  }
}

Table task_labels {
  tenant_id uuid [not null]
  task_id bigint [not null]
  label_id bigint [not null]
  created_at timestamp [not null, default: `now()`]

  indexes {
    (task_id, label_id) [pk]
    label_id
  }
}

Ref: task_labels.(tenant_id, task_id) > tasks.(tenant_id, id) [delete: cascade]
Ref: task_labels.(tenant_id, label_id) > labels.(tenant_id, id) [delete: cascade]
```

See `dbml-syntax.md` for the full syntax and `dbml-cli.md` for converting DBML to SQL.

## 7. Check and trim

Run `model-review-checklist.md` against the draft. Then cut the section down to the six parts and one page. Anything that explains how to build the tables belongs in the plan.

## Worked section

The label feature above, written as a spec section.

**Existing schema.** Plural snake_case tables, `bigint` identity ids (`tenants` uses `uuid`), `created_at` on every table, `tenant_id` on tenant-scoped tables. `tasks` already has `tenant_id` and `project_id`.

**Access patterns.** The table in step 2.

**Model.** The DBML block in step 6.

**Decisions.**

- Labels belong to a tenant, not a project, so one label can span projects.
- The join table has a composite primary key and no surrogate id, since it carries no data of its own.
- Composite foreign keys on `(tenant_id, task_id)` and `(tenant_id, label_id)` stop a label from being attached to a task in another tenant. They need a unique `(tenant_id, id)` on `tasks` and on `labels`.
- Deleting a task or a label removes its join rows. Nothing else references them.
- `(tenant_id, name)` is unique with no soft-delete exemption because labels are hard-deleted.
- `created_at` is a UTC `timestamp`. The engine type, with or without a time zone, is chosen in the plan.

**Open questions.** Can a project restrict which labels its tasks use? If yes, the join table needs a project scope.

**Migration.** Additive: two new tables and a unique index on `tasks (tenant_id, id)`, no backfill.
