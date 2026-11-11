# Pull Request Description Template


Authors fill this in; reviewers use it as the map for the review. Delete the sections that don't apply. The requirements table is what makes reviewing against the spec quick.

```markdown
## What and why

One or two sentences: the problem, and how this change solves it.

Spec / ticket: <link>

## Requirements → implementation → tests

| Requirement (from the spec) | Where it's implemented | Test that proves it |
| --- | --- | --- |
| Support staff can refund up to the amount paid | `refunds/service.py::issue_refund` | `tests/refunds/test_service.py::test_refund_capped_at_paid` |

## Out of scope

What this PR deliberately doesn't do, and where that work is tracked.

## Public surface changes

New or changed endpoints, schemas, events, config keys and CLI flags.
Breaking change: no / yes (plan: ...)

## Data and migrations

Step: expand / backfill / read new / contract
Runtime and locks on production-sized data:
Rollback:

## Rollout

Feature flag, metrics to watch, and how to turn it off.

## How to review

Where to start, what I'm least sure about, and how to run it locally.

## Checklist

- [ ] Tests added or updated, and they fail without this change
- [ ] Docs and config updated
- [ ] New dependencies justified above, or none added
- [ ] Written with AI assistance: yes / no (I've reviewed every line)
```
