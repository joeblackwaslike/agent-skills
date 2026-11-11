# Design specs and plans

*Leans on: Gall's Law, YAGNI, KISS, Conway's Law, Chesterton's Fence.*

Reviewing a spec before code exists is the cheapest review there is: a wrong boundary costs a comment instead of a rewrite. Apply the same four groups, one level up.

- **The problem before the solution.** Can you state the problem and who has it in one sentence? Are there measurable success criteria? A spec that opens with the solution often solves the wrong problem.
- **Goals and non-goals.** Explicit non-goals prevent scope creep in the implementation and give the code reviewer a way to say "no more" later.
- **Alternatives considered.** At least one simpler alternative, including "do nothing" or "use what we have", with a reason it was rejected. A spec that considers no alternatives hasn't been designed, just described.
- **Smallest working version.** Gall's Law: is there a thin vertical slice that delivers value first? Plans that need several new services, queues or databases before the first request works are a red flag.
- **Interfaces and data first.** The API contracts, data model and events are spelled out, since they are the expensive parts to change. Internal implementation detail can stay loose.
- **Failure and operations.** What happens when each dependency fails, how it is deployed and rolled back, how migrations are sequenced, what is monitored and who is paged.
- **Security and data.** Who can access what, what personal data is stored and for how long, and where trust boundaries are.
- **Ownership and boundaries.** Conway's Law: do the proposed service and module boundaries match the teams that will own them?
- **Earlier decisions.** Does it contradict an existing ADR or established pattern? If so, it should say so and why.
- **Testable requirements.** Each requirement can be checked by a test or a measurement. "Fast" and "scalable" aren't requirements; "p95 under 200 ms at 500 requests per second" is.
- **Open questions listed.** Unknowns are named with an owner, rather than hidden in confident prose.

Plans for a sequence of PRs get one more check: each step should leave the system working and deployable, as in expand and contract.
