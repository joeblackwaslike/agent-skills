# Cookbook: Python Project

**For:** Project-level `CLAUDE.md` or `AGENTS.md`  
**Covers:** FastAPI, libraries, data pipelines, CLI tools, async workers  
**Target size:** 30–70 lines  

---

## Template

```markdown
# [Project Name]

[One-sentence description: what this project does and its primary tech.]

## Commands

\`\`\`bash
# Development
uv run [dev-server-command]   # or: make dev / python -m [module]

# Testing
uv run pytest                  # or: uv run pytest -x (fail fast)
uv run pytest -k [pattern]     # run subset

# Lint / format
ruff check . && ruff format .  # or: make lint

# Type checking (if used)
mypy [package-name]            # or: pyright
\`\`\`

## Project Structure

[Only if non-obvious — skip if it's a standard src layout or single module]
\`\`\`
src/
  [package]/
    api/        # FastAPI routers
    services/   # Business logic
    models/     # SQLAlchemy / Pydantic models
    workers/    # Background tasks
tests/
  unit/         # Fast, no I/O
  integration/  # Hits real DB / external services
\`\`\`

## Architecture

[1–3 sentences on the non-obvious design decisions. Examples:]
- Uses CQRS: reads go through `QueryBus`, writes through `CommandBus`
- Database access only through repository classes in `src/[package]/repositories/`
- All API responses are typed Pydantic models — no bare dicts returned from handlers

## Coding Conventions

- [Async stance: "Fully async — use `async def` throughout, including tests"]
- [Validation: "Runtime validation via Pydantic v2 models; no manual isinstance checks"]
- [Error handling: "Raise domain exceptions from `src/exceptions.py`; translate at API layer"]
- [Imports: "Absolute imports only — no relative imports"]
- [Add only non-obvious conventions]

## Testing

- [Integration vs. unit stance: "Integration tests hit a real database — never mock the DB"]
- [Test data: "Use factory_boy factories in `tests/factories/` for test objects"]
- [Fixtures: "Session-scoped DB fixture with rollback after each test"]

## Dependencies

[Only if there are surprising choices or constraints:]
- Uses [library X] instead of [standard Y] because [reason]
- [library Z] is vendored in `vendor/` — do not upgrade without testing [thing]
```

---

## Section Guide

**Commands** is the highest-value section for a Python project. Claude shouldn't have to
guess whether to use `pytest` or `uv run pytest`, or whether `make test` exists. Include the
exact invocations your team uses.

**Project Structure** — only include this if the layout would surprise a Python developer
who just cloned the repo. A standard `src/[package]` layout with `tests/` doesn't need
documentation.

**Architecture** is 1–3 sentences on decisions that shape what code Claude should write. If
there's a repository pattern, a CQRS setup, or a specific layer separation, say so. Without
this, Claude will write code in the wrong layer.

**Coding Conventions** — only non-obvious rules. "Use async/await" is worth stating.
"Write clean code" is not. For Python specifically, async stance and validation approach
tend to be the most consequential non-obvious conventions.

**Testing** — the most common mistake in Python projects is mocking what shouldn't be
mocked. If your tests hit real databases or services, say so. Claude will otherwise try to
add mocks.

**Dependencies** — mention surprising choices that Claude might try to replace with the
"standard" approach.

---

## Variants

**FastAPI service:**
Focus on: route organization, response models, dependency injection pattern, middleware.

**Python library (published package):**
Add: public API surface rules, backwards compatibility stance, versioning convention.

**Data pipeline / ETL:**
Add: data flow description, idempotency requirements, error handling for partial failures.

**CLI tool:**
Add: entry point, argument parsing library (argparse, click, typer), output format conventions.

**Background worker (Celery, ARQ, etc.):**
Add: task organization, retry policy, idempotency requirements, queue naming conventions.

---

## Common Pitfalls

- **Forgetting `uv run`:** In `uv`-managed projects, bare `pytest` uses the wrong
  interpreter. Always prefix with `uv run`.
- **Not stating the async stance:** "Mixed" async code in Python causes subtle bugs.
  If a project is async-first, say so.
- **Not mentioning integration test setup:** If tests need a running Postgres or Redis,
  note it. Otherwise Claude will try to mock those dependencies.
- **Overly prescribing style:** ruff handles formatting; mypy handles types. Don't
  duplicate their rules in the instruction file.
