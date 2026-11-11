# New dependencies

*Leans on: YAGNI, KISS, least privilege.*

A new package is code you didn't write, running with your application's privileges, maintained on someone else's schedule. Each one should earn its place.

- **Is it needed?** Check whether the standard library or an existing dependency already does the job. A large package pulled in for one function is usually a finding; copying a small, well-understood function with attribution can be the better trade.
- **Is it healthy?** Recent releases, responsive maintainers, a real user base, more than one maintainer for anything critical, and a license compatible with how you ship.
- **Is it safe?** No known vulnerabilities (`pip-audit`, npm audit or pnpm audit, or the CI equivalent), a name you've verified against the real project to rule out typosquatting, and an understanding of what it pulls in transitively, including install scripts that run when it's installed.
- **Is it pinned?** Exact versions in the lockfile (`uv.lock`, pnpm-lock.yaml, package-lock.json or bun.lock) for applications; sensible lower bounds in `pyproject.toml` for libraries. The lockfile diff is reviewed, not skimmed: unexpected transitive changes are worth a question.
- **Is it typed?** Ships `py.typed` or has stubs (in TypeScript, bundled types or a maintained @types package), so `mypy --strict` keeps working without blanket ignores.
- **Is it contained?** A vendor SDK is wrapped behind a narrow interface at the boundary, so swapping it later touches one module. A utility library used throughout the codebase is fine unwrapped.
- **Removals count too.** Dropping a dependency is reviewed for anything that still imports it indirectly, including plugins, entry points and scripts.
