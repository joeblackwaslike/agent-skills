# Code that validates user input

*Leans on: Parse Don't Validate, Fail Fast, least privilege, KISS.*

Validation code should run once, at the boundary, and produce a type the rest of the code can trust. Review where it happens as much as what it checks.

- **Parse into a type, don't return a boolean.** `is_valid_email(s) -> bool` leaves every later caller holding an unchecked `str`. A Pydantic model, `EmailStr`, or a `NewType` built by a parsing function carries the proof with the value. In TypeScript, a zod schema and a branded type do the same.
- **Allowlist, don't denylist.** Accept known-good shapes (enums, `Literal`, constrained types) rather than rejecting known-bad ones. Denylists of characters or keywords are always incomplete.
- **Bound everything.** Maximum lengths on strings, maximum sizes on lists and request bodies, ranges on numbers, limits on nesting depth. Unbounded input is a denial-of-service vector.
- **Normalize, then validate.** Trim, Unicode-normalize (NFKC where appropriate) and case-fold before checking and storing, so two spellings of the same value can't bypass a uniqueness check.
- **Strictness.** Decide whether `"42"` should be accepted as `42`. Pydantic's lax mode coerces; strict mode at API boundaries avoids surprises. In zod, coercion is opt-in (z.coerce), which is the safer default.
- **Regexes.** Anchored (`fullmatch`, not `match` or `search`), and free of nested quantifiers that allow catastrophic backtracking (ReDoS). Prefer a parser or a library over a hand-written regex for emails, URLs and dates.
- **Cross-field rules.** "End date after start date" belongs in a model validator, so it is enforced wherever the model is built.
- **Context-specific encoding is separate.** Validation doesn't make data safe for SQL, HTML or shell. That is done at output: parameterized queries, template autoescaping, `subprocess` with a list of arguments.
- **Files and URLs.** Check uploaded files by content, not extension. Size-limit them and store them outside the web root under generated names. Fetching a user-supplied URL needs SSRF protection: an allowlist of schemes and hosts, and blocking private and metadata addresses after DNS resolution.
- **Error messages.** Say what was wrong with which field, without echoing back large or sensitive input.
- **Tests.** Each rule has a test at its boundary: the longest valid value and one longer, the empty value, wrong types, extra fields.
