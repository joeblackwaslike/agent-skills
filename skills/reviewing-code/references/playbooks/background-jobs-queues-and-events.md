# Background jobs, queues and events

*Leans on: Fail Fast, Hyrum's Law, explicit over implicit, Gall's Law.*

Asynchronous work fails differently from a request. Nobody is waiting for the response, so failures are silent unless someone made them loud, and most queues deliver at least once, so every message may arrive twice, late or out of order.

- **Idempotent handlers.** Running the same message twice produces the same result. Use a deduplication key, an upsert, or a state check guarded by a unique constraint. A handler that charges, emails or increments on every delivery is a finding.
- **Retries and dead letters.** Retries have backoff and a maximum. A message that keeps failing goes to a dead-letter queue that someone is alerted about, instead of blocking the queue or vanishing.
- **Transient vs. permanent errors.** Retry timeouts and connection errors; don't retry validation errors or missing records forever.
- **Publishing with the transaction.** An event published before the database transaction commits can describe a write that rolled back; one published after can be lost if the process dies. Use a transactional outbox (write the event to a table in the same transaction, relay it afterward) when the event must match the data.
- **Payloads are contracts.** Event schemas are versioned like endpoints. Consumers tolerate unknown fields; adding a required field or changing a meaning is a breaking change. Prefer ids plus a small amount of data over whole serialized objects, which go stale and grow.
- **Ordering.** If the handler assumes messages arrive in order, check that the queue guarantees it for this key, or make the handler check a version or timestamp.
- **Time limits.** The job's maximum runtime is shorter than the queue's visibility or ack timeout, or the message is redelivered while still running. Long work is split into resumable batches with checkpoints.
- **Scheduled jobs.** A cron job that can overlap its previous run needs a lock. Schedules state their time zone, and a missed run is either caught up or deliberately skipped.
- **Observability.** Queue depth, age of the oldest message, processing time and failure rate are measured. A job that silently stops running is the most common failure, so alert on absence, not just on errors.
- **Tests.** Run the handler twice on the same message, fail it halfway through, and deliver an old payload version.
