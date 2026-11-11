# Logging and error logging

> Use when the diff: Touches a hot or business-critical path, asynchronous work, or what gets logged

*Leans on: Fail Fast (failures are visible), least privilege (logs leak), KISS, explicit over implicit.*

Logs exist for the person debugging production at the worst possible moment. Review each log line by asking whether that person would want it, could find it, and could act on it, and whether it leaks something it shouldn't.

**General logging**

- **Structured, not interpolated.** Events with fields (`log.info("order_created", order_id=..., tenant_id=...)` with `structlog`), not prose built with f-strings. In Node, pino does the same. Fields are searchable; sentences aren't. With the stdlib logger, pass arguments rather than pre-formatting, so work is skipped when the level is off.
- **Stable event names.** A short, greppable event name per log site. Changing it breaks dashboards and alerts, which is Hyrum's Law applied to logs.
- **Correlation.** A request id or trace id bound once (contextvars, middleware) and present on every line, so one request can be followed across services.
- **Levels mean something.** `ERROR` means someone should look; `WARNING` is unexpected but handled; `INFO` is a business-level event; `DEBUG` is off in production. An `ERROR` that fires on normal traffic trains people to ignore alerts.
- **Volume on hot paths.** No per-item logging inside loops or per-request `INFO` noise on high-traffic endpoints. Sample, aggregate, or use a metric instead.
- **No sensitive data.** No passwords, tokens, API keys, full request or response bodies, payment details or unnecessary personal data. Log ids, not payloads. Prefer a redaction processor over relying on every call site to remember.
- **Metrics vs. logs.** Counts and rates belong in metrics. Watch label cardinality: user ids or URLs as metric labels will overwhelm the metrics backend.

**Error logging**

- **Log once, at the boundary that handles it.** Code that catches, logs and re-raises at every layer produces the same stack trace five times. Lower layers raise with context; the top-level handler or job runner logs.
- **Keep the traceback.** Inside `except`, use `log.exception(...)` (or `exc_info=True`) so the stack trace is recorded. `log.error(str(e))` throws away where it happened. In TypeScript, log the error object itself, not err.message, so the stack and cause survive.
- **Chain, don't replace.** `raise DomainError(...) from err` preserves the original cause for the log.
- **Context that helps.** The ids and parameters needed to reproduce the failure, not the whole object graph.
- **Expected vs. unexpected.** A user's invalid input is not an `ERROR`; it is a `4xx` and maybe an `INFO`. A failed payment-provider call after retries is. Classify deliberately, because error rate drives alerting.
- **No swallowing.** `except Exception: log.warning(...)` followed by carrying on is a silent failure with a paper trail. If the code can't proceed correctly, it should raise.
- **User-facing errors stay generic.** Details go to the log under a correlation id that is also returned to the client, so support can find the entry without exposing internals.
