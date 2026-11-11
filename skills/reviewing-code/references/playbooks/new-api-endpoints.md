# New API endpoints

> Use when the diff: Adds or changes an endpoint, a request or response model, a validator, or anything touching identity and permissions

*Leans on: Hyrum's Law, least astonishment, separation of concerns, Parse Don't Validate, least privilege.*

An endpoint is a contract the moment a client calls it, so review it as an interface first and as code second. Start from the request and response schemas, not the handler body.

- **Resource and method.** The path names a resource, not an action (`POST /v1/orders/{id}/cancellations` or `POST /v1/orders/{id}:cancel`, consistently with the rest of the API, rather than `POST /cancelOrder`). `GET` is safe, `PUT` and `DELETE` are idempotent, `POST` is neither unless made so.
- **Status codes and errors.** Codes match outcomes: `201` with a `Location` header for creation, `204` for no body, `404` vs. `403` chosen deliberately, `409` for conflicts, `422` for valid JSON with invalid content. Errors use one shape across the API, ideally [RFC 9457 Problem Details](https://www.rfc-editor.org/rfc/rfc9457), and never leak stack traces or SQL.
- **Explicit input and output models.** Separate request and response models, never the ORM entity. The request model forbids unknown fields (`extra="forbid"`, or .strict() on a zod object) so clients can't mass-assign `is_admin` or `owner_id`. The response model lists exactly what is exposed, so a new column doesn't leak by default.
- **Thin handler.** The route parses input, checks authorization, calls one command or query, and maps the result to a response. Business rules in the handler are a separation-of-concerns finding.
- **Collections.** Every list endpoint is paginated with a maximum page size. Prefer keyset (cursor) pagination for large or growing tables, because `OFFSET` gets slower with every page. Filters and sort fields are allowlisted, never passed through to SQL.
- **Idempotency for writes.** A `POST` that creates or charges something accepts an idempotency key, or is otherwise safe to retry, because clients and proxies will retry it.
- **Authentication and authorization** on every route, including the ones "only the frontend calls" (see the auth playbook).
- **Limits.** Request body size, rate limits on expensive or sensitive operations, and timeouts on everything the handler calls.
- **Consistency with the rest of the API.** Field naming (`snake_case` vs. `camelCase`), timestamp format (ISO 8601 with offset), id format, envelope or no envelope. A new endpoint that is locally sensible but different from its neighbors is a least-astonishment finding.
- **Documentation and tests.** The generated OpenAPI schema reflects reality (response models declared, error responses listed). Tests cover the happy path, each error code, unauthenticated and unauthorized callers, and pagination edges.
