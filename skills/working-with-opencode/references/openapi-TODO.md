---
source: "https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/codemode/src/openapi/TODO.md"
fetched_at: "2026-07-06T05:38:06.766Z"
sha256: "fd764b43f04fb0137b51ce7a5465408303bd4eeb007dacc8ced6fe0bfd4869fa"
---

# OpenAPI Follow-ups

The initial adapter intentionally skips operations it cannot execute correctly. Future work may add:

- Cookie parameters, authentication, and cookie-header merging.
- Matrix, label, space-delimited, pipe-delimited, `allowReserved`, and parameter `content` serialization.
- External references and complete nested `$defs` support.
- Relative or templated server URLs and server variables.
- Base URLs containing query strings or fragments.
- Runtime response-schema validation and full content negotiation.
- Binary response values and explicit byte-oriented return types.
- Request/response projection for `readOnly` and `writeOnly` properties.
- SSE, WebSocket, and other streaming transports.
- Recovery of responses rejected by a status-filtering `HttpClient`.
- Configurable request and response size limits.
- Adapter-enforced redirect policy independent of the supplied `HttpClient`.
- Strict UTF-8 and empty-body validation for JSON responses.
- Compile-time rejection of parameter schemas with nested values unsupported by their serialization style; runtime rejects them before auth resolution.
- Complete malformed-security-scheme validation and broader auth-combination coverage.
