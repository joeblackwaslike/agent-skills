# CodeQL Security Scanning

Automated static analysis using GitHub's CodeQL engine. Runs on every push and
PR to main plus a weekly scheduled scan, so security regressions are caught
both in code review and via continuous background analysis.

---

## Workflow: `.github/workflows/codeql.yml`

```yaml
name: CodeQL

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '30 1 * * 1'

permissions:
  security-events: write
  actions: read
  contents: read

jobs:
  analyze:
    name: Analyze
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: github/codeql-action/init@v3
        with:
          languages: javascript-typescript

      - uses: github/codeql-action/autobuild@v3

      - uses: github/codeql-action/analyze@v3
        with:
          category: /language:javascript-typescript
```

---

## Design decisions

### Three triggers

**`push: branches: [main]`** catches anything merged to main. **`pull_request:
branches: [main]`** blocks a merge if CodeQL finds a new alert on the PR
branch. **`schedule`** runs the weekly scan independently of code changes—
useful because CodeQL's vulnerability database is updated continuously, so code
that was clean last month might flag today even with no commits.

### `cron: '30 1 * * 1'`

Monday at 01:30 UTC. Offset from the top of the hour (`:30`) and away from
midnight to avoid peak GitHub Actions queue times. Using a Monday run means
any newly published CVEs from the weekend are caught at the start of the work
week.

### Permissions block

`security-events: write` is required to upload SARIF results to the GitHub
Security tab. `actions: read` lets CodeQL read workflow metadata. `contents:
read` is the minimum to check out the repository. No write access to repo
contents is needed—results go to the security API, not the repo.

### Three-step `init → autobuild → analyze`

**`init`** creates the CodeQL database scaffold and configures language
extractors. **`autobuild`** infers the build system and compiles the project,
populating the database with extracted facts. **`analyze`** runs the query
suites against the database and uploads SARIF.

For interpreted languages like JavaScript/TypeScript, autobuild is essentially
a no-op (no compilation needed); CodeQL extracts directly from source. The
three-step pattern is still required because `init` must register the
extractor before `analyze` can run.

### `languages: javascript-typescript`

A single identifier covers both `.js`/`.mjs`/`.cjs` and `.ts`/`.tsx` files.
Do not list `javascript` and `typescript` separately—that is invalid in v3 and
will cause an error. Use `javascript-typescript` for any mixed JS/TS codebase.

For repos that also have Python or Go, add them as a comma-separated list:
`languages: javascript-typescript, python`. Each language gets its own
autobuild and can be parallelized with a matrix strategy if build time matters.

### `category: /language:javascript-typescript`

The `category` parameter namespaces SARIF uploads. When multiple languages are
analyzed in the same workflow (e.g., via matrix), each upload needs a distinct
category so they don't overwrite each other in the Security tab. For a
single-language workflow the value is cosmetic but it is good practice to
include it—it makes the SARIF artifact identifiable in the API.

### autobuild vs manual build steps

Use autobuild for TypeScript/JavaScript—it reliably handles pnpm, yarn, and
npm workspaces. Switch to manual steps only when:

- You need to pass environment variables (API keys, feature flags) to the
  build so CodeQL can analyze code paths that depend on them.
- The project uses a non-standard build tool (Bazel, Buck, Gradle for JS).
- autobuild fails because it misdetects the package manager.

Manual example:

```yaml
- uses: pnpm/action-setup@v4
  with:
    version: latest
- uses: actions/setup-node@v4
  with:
    node-version-file: .nvmrc
    cache: pnpm
- run: pnpm install --frozen-lockfile
- run: pnpm build
```

Replace the `autobuild` step with these; keep `init` before and `analyze`
after.

### When results appear

Results show up under `Security → Code scanning alerts` in the repo. On PRs,
CodeQL posts inline annotations for new alerts relative to the base branch.
Existing alerts on main are not surfaced as PR annotations (to avoid noise from
pre-existing issues blocking new PRs).

### Disabling for a specific alert

Use the `# codeql-suppress` inline comment or the "Dismiss alert" button in
the Security tab. Dismissals are stored in the GitHub database, not in the
repo, so they survive file renames.
