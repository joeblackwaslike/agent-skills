# Code on the critical path

*Leans on: premature optimization (measure), Fail Fast, KISS, Gall's Law.*

Critical-path code is anything that sits in every request, in checkout or login, or in a job the business depends on. The bar is higher: the change must not make the path slower, less available, or harder to roll back, and the reviewer should be able to say how they know.

- **What's new in the path.** List every added network call, query, lock, file read or third-party dependency. Each one is a new way for the path to be slow or down. Ask whether it can move off the path: precomputed, cached, or done asynchronously after the response.
- **Timeouts and budgets.** Every outbound call has a timeout well inside the path's latency budget. Retries have a cap and backoff, and the total retry time also fits the budget.
- **Failure of dependencies.** What happens when the new dependency is slow or down? Prefer degrading (a fallback value, a skipped enrichment, a circuit breaker) over failing the whole request, when the business allows it.
- **Work per request.** No queries in loops, no unbounded reads, no heavy serialization, regex compilation or object construction repeated per call. Async code doesn't block the event loop.
- **Caching.** A new cache key includes everything the value depends on (tenant, user, permissions, locale). Expiry is a deliberate TTL or an explicit invalidation rule. A hot key expiring shouldn't send every request to the database at once, and the path still works when the cache is empty or down. A cached value served across a permission boundary is a security bug.
- **Measured, not assumed.** A change claimed to be faster comes with a benchmark or a profile. A change that could be slower comes with a load test or a comparison of p95/p99 latency before and after.
- **Rollout.** Behind a feature flag or a percentage rollout, with a metric that would show a regression and a way to turn it off without a deploy.
- **Observability.** Latency, error rate and saturation for the path are measured, and the new code adds spans or metrics for the parts it introduces.
- **Simplicity matters more here.** Clever caching, custom concurrency and hand-rolled retry logic on the critical path need the strongest justification, because they fail in ways that are hard to see.
