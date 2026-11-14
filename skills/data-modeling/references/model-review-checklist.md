# Model review checklist

Run this against a draft model before handing the spec section over. Each line is a yes-or-no question. A no means fix the model or record why in the decisions part. The links go to the playbook that covers the check in depth.

Playbook paths: [data modeling](../../reviewing-code/references/playbooks/data-modeling-tables-relationships-and-domain-objects.md), [queries and indexes](../../reviewing-code/references/playbooks/queries-and-indexes.md), [migrations](../../reviewing-code/references/playbooks/migrations-and-deployment-sequencing.md).

## Access patterns

- Does every access pattern have a join or an index that answers it? ([queries and indexes](../../reviewing-code/references/playbooks/queries-and-indexes.md))
- Was the pattern list written before the tables, so the tables follow from it?

## Keys and constraints

- Does every table have a primary key, and does its id type match the existing schema? (data modeling, keys)
- Is each invariant a database constraint and not only a check in code? (data modeling, constraints)
- Does each foreign key have a deliberate `ON DELETE` choice and an index on the referencing column? (data modeling, foreign key behavior)
- Does the model prevent a child row from pointing at a parent that belongs to a different tenant or owner?

## Types and shape

- Are money, timestamps, ids and fixed value sets stored in types that fit them? (data modeling, column types)
- Does each relationship use the right shape: foreign key, one-to-one, join table, or a named entity for a link that carries data? (data modeling, relationship shapes)
- Does every denormalized column point to an access pattern and a way to keep it in step?

## Fit with the existing schema

- Do names, id types, timestamps and soft-delete handling match the conventions in part one?
- If rows are soft-deleted, does every unique constraint account for it, and is the DBML limit on partial indexes recorded in the decisions?

## Handover

- Does the migration line say whether the change is additive and whether it needs a backfill? Sequencing details go in the plan. ([migrations](../../reviewing-code/references/playbooks/migrations-and-deployment-sequencing.md))
- Does the section have exactly the six parts from `SKILL.md`, in order, on one page?
- Does the DBML block parse? `linting-tools.md` lists commands that check it. If no tool was available, say so when you hand the section over.
