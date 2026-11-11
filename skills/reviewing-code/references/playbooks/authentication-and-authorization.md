# Authentication and authorization

*Leans on: least privilege, Fail Fast (fail closed), explicit over implicit, KISS.*

Authentication proves who the caller is; authorization decides what they may do with a specific resource. Most real incidents are authorization bugs, so review that half hardest.

**Authorization**

- **Deny by default.** A new route without an explicit permission requirement should fail a test or a lint, not quietly be public. Prefer a dependency or decorator that every router applies, with an explicit opt-out for public routes.
- **Object-level checks.** "Logged in" is not "allowed". Every access by id checks that the caller owns or may access *that* object. Broken object-level authorization is the most common API vulnerability (first on the [OWASP API Security Top 10](https://owasp.org/API-Security/editions/2023/en/0x11-t10/)). Scoping the query itself (`WHERE id = :id AND tenant_id = :tenant`) is safer than fetching and then checking.
- **Function-level checks.** Admin and internal operations check the role on the server, not by hiding a button.
- **Tenant isolation.** In multi-tenant code, the tenant filter is applied centrally (a repository base, a session-level filter, or row-level security), not remembered at each query.
- **One place for policy.** Permission logic lives in a policy module or service the handlers call, not scattered `if user.role == "admin"` checks.
- **Not found vs. forbidden.** Return `404` for objects the caller isn't allowed to know exist, so ids can't be enumerated.

**Authentication**

- **Don't roll your own.** Use the framework's or an established library's primitives for sessions, OAuth/OIDC and password hashing.
- **Tokens.** JWT verification pins the algorithm (never accepts `none`), checks signature, `exp`, `aud` and `iss`, and fetches keys from a trusted JWKS with caching. Tokens are short-lived, with refresh tokens rotated and revocable.
- **Passwords and secrets.** Hashed with Argon2id or bcrypt, never a plain or fast hash. Secret comparisons use `hmac.compare_digest` (crypto.timingSafeEqual in Node). Login, reset and verification endpoints are rate-limited and return the same response whether or not the account exists.
- **Sessions and cookies.** `HttpOnly`, `Secure`, `SameSite`; session id rotated on login and privilege change; CSRF protection for cookie-authenticated state changes.
- **Nothing sensitive in logs or URLs.** Tokens, passwords, reset links and session ids never appear in log lines or query strings.

**Tests.** Every protected endpoint has negative tests: unauthenticated, authenticated but wrong role, authenticated but another tenant's or user's object. These are the tests that catch real bugs and the ones most often missing.
