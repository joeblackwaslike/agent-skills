# Property-based testing

When to state a rule that must hold for many inputs instead of listing a few examples. Property-based is a kind of test, alongside unit and integration (see [test-kinds.md](test-kinds.md)). Covers P14 for seeded randomness. Writing generators, shrinking, and tool use are in the [`testing-code` property-based runbook](../../testing-code/references/runbooks/property-based.md).

## What a property is

A property is a statement about behavior that should hold for every input in a described set. A framework generates many inputs, checks the statement for each, and when one fails, reduces it to a small failing case.

An example test says "for this input, expect this output". A property says "for any input of this shape, this relationship holds".

## When a property beats an example

- The input space is large and the rule is simple to state: parsing, formatting, encoding, sorting, arithmetic, normalization.
- The risk is in cases nobody would think to list: empty values, huge values, unusual characters, boundaries, duplicates.
- Two implementations or two directions of a transformation must agree.
- A rule must survive refactoring, and the implementation behind it may change completely.
- Example tests keep growing as bugs are found, and each new bug adds one more case.

## When an example is the better tool

- The behavior is a specific business rule with an exact, arbitrary answer, such as a tax rate for a named region. Write the example.
- You cannot state the rule without reimplementing the code. A property that mirrors the implementation checks nothing.
- The behavior is a documented scenario that readers should see spelled out.
- Setup is expensive, so running many generated inputs is impractical (P17).

Examples and properties work together. Keep the examples that document intent and add properties for the general rule.

## Property families

| Family | Statement | Typical fit |
|---|---|---|
| Round-trip | Decoding what was encoded returns the original | Serialization, parsing and printing, compression |
| Idempotence | Applying the operation twice equals applying it once | Normalization, deduplication, formatting, cleanup |
| Invariant | A fact stays true after any operation | Totals, sizes, ordering, balance never negative |
| Oracle or model comparison | The real implementation matches a simple, obviously correct one | Optimized code against a naive version, a data structure against a built-in |
| Metamorphic | A known change to the input produces a known change to the output | Search, scoring, geometry, where the exact answer is unknown but the relationship is not |
| Commutativity and associativity | Order or grouping of operands does not change the result | Merging, aggregation, set operations |
| No-crash | Any valid input completes without an unexpected failure | Parsers and handlers fed arbitrary data |
| Error contract | Invalid input fails in the documented way | Validation at boundaries |

- Metamorphic properties help when there is no oracle. Doubling every price should double the total even when the total itself is hard to predict.
- Oracle comparison needs a trustworthy reference. A slow, simple implementation kept only for tests is fine.
- Round-trip is often the cheapest property to write and finds real bugs.

## Writing properties that hold up

- State the property in domain terms, and name it after the rule it protects.
- Constrain generated inputs to the valid domain with the generator, not by discarding most of them afterwards.
- Seed per run and print or record the seed, so a failing case can be replayed (P14). A failure that cannot be reproduced is a flake (P15).
- Keep a found failure as a fixed example test, so the regression stays covered if generation changes.
- Keep the run count modest in the fast suite. Larger counts belong in a scheduled run (P17).
- Avoid properties with side effects on shared state, which break isolation (P13).

## Quick review checks

- Is the property a rule a stakeholder would recognize, or a restatement of the code?
- Would a plausible bug fail it? A property that any implementation passes is too weak, and a mutation run (see [mutation.md](mutation.md)) can show that.
- Are the generators producing the edge cases, or mostly ordinary values?
- Does a failure print the seed and the reduced input?
