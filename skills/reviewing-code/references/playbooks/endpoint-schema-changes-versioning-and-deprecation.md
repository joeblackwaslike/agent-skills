# Endpoint schema changes, versioning and deprecation

> Use when the diff: Adds or changes an endpoint, a request or response model, a validator, or anything touching identity and permissions

*Leans on: Hyrum's Law above all, then least astonishment and Chesterton's Fence.*

The question for any change to an existing endpoint's request or response is: does every client that works today still work after deploy, without changing? Classify the change first, then review accordingly.

| Change | Usually safe? | Notes |
| --- | --- | --- |
| Add an optional request field | Yes | Must have a default that preserves old behavior |
| Add a response field | Mostly | Breaks clients that validate strictly or deserialize into closed types; Hyrum's Law says someone does |
| Add a new endpoint or a new enum value in a request | Yes |  |
| Add a new enum value in a response | No | Clients with exhaustive `match` or switch statements break; document enums as open from the start |
| Make an optional request field required | No | Breaking |
| Remove or rename a field, or change its type or format | No | Includes `int` to `str` ids, changing date formats, `null` vs. absent |
| Change a default, sort order, status code or error shape | No | Behavior change even if the schema is identical |
| Tighten validation (shorter max length, stricter regex) | No | Previously accepted requests now fail |
| Loosen validation | Usually | Check downstream consumers can handle the new values |

**Additive changes** need a check that the new field has a sensible default, that it appears in the response model and the OpenAPI schema, and that the database can supply it for existing rows.

**Breaking changes** need a plan in the PR description, not just code:

- **Prefer not to break.** Often the breaking change can be made additive: add `full_name` alongside `name`, populate both, and deprecate `name`.
- **Version deliberately.** A new path version (`/v2/...`) or a version header, following whatever the API already does. Don't version a single field change if expand-and-contract can avoid it; don't fork the whole API for one endpoint either.
- **Run both versions from one implementation.** The old version becomes an adapter over the new domain logic, not a copy of it, so fixes land once.
- **Announce and measure.** Mark the old endpoint or field deprecated in the OpenAPI schema and send `Deprecation` and `Sunset` response headers ([RFC 9745](https://www.rfc-editor.org/rfc/rfc9745), [RFC 8594](https://www.rfc-editor.org/rfc/rfc8594)). The `Sunset` date can't be earlier than the `Deprecation` date. Log or meter usage of the deprecated path per client, so removal is based on data, not on a date someone guessed.
- **Remove last.** Removal is its own PR, after usage has reached zero or the sunset date has passed with notice given.

For internal-only endpoints the same rules apply, with a shorter window: the frontend and the backend usually deploy separately, so for some minutes both versions of each are live at once.
