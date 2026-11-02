# Fast CI for Agent Loops

An agent waits on CI after every push, so each second of CI is a second the agent idles.
Start from measurements, not from a list of tricks. Method adapted from Owen Gretzinger's
["How I made our CI 20x faster"](https://x.com/owengretzinger/status/2116291924219060319),
reworked after applying it to six public repos (CI went from 66s to 29s on one, 98s to 33s
on another).

## 1. Audit first

```bash
skills/working-with-github-actions/scripts/ci-audit.sh -n 15 -b main OWNER/REPO
```

The script prints, per job, the median queue, setup, and run time plus the slowest steps.
Then open the log of the single slowest step. Two repos looked like "slow tests" in the
summary. One was a docs build; the other was a test file opening a fresh on-disk database
per test. The step name did not show either cause.

Read the numbers before picking levers:

| Symptom | Lever |
|---|---|
| Queue is high (private repos, big runners) | Larger or faster runners |
| Queue about 2s (public repos on hosted runners) | Skip runners, they buy nothing |
| Setup is over half of job time | Per-job filtered install, cache fixes, drop unused setup actions |
| One serial job, run time dominates | Split into parallel jobs |
| One expensive job that most PRs don't affect | Skip it by path (section 3) |
| Slowest step is one test file | Fix that file before sharding |

## 2. Cheap wins, in order

1. **`concurrency` with `cancel-in-progress: ${{ github.ref != 'refs/heads/main' }}`.** Agents
   push often. Never cancel on `main`, and never on deploy or release workflows.
2. **Delete unused setup actions.** `setup-bun` in a pnpm/Node repo cost 2.5s per job.
3. **Per-job filtered installs.** `pnpm install --filter <pkg>...` per job. One repo spent
   31s of a 49s job installing 1,948 packages for a workspace the job barely used.
4. **`setup-node` with `cache: pnpm`.**
5. **Cache scoping.** A run restores caches saved on its own branch or on the base/default
   branch; sibling PRs can't see each other's caches. If `main` never saves the cache,
   a fresh PR starts cold. Make sure `main` runs the job that saves it.
6. **Split a serial job** into lint+typecheck, test, and build jobs when each is 10s or
   more. Each new job pays setup again, so stop splitting once setup is the larger part.

## 3. Skip unaffected jobs without breaking required checks

A workflow-level `on.pull_request.paths` filter leaves required checks pending forever
when the workflow doesn't run. Filter inside the job instead:

```yaml
jobs:
  changes:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: read
    outputs:
      docs: ${{ steps.f.outputs.docs }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # push events need history to compare against
      - id: f
        uses: dorny/paths-filter@v3
        with:
          filters: |
            docs:
              - 'website/**'
              - 'package.json'
              - 'pnpm-lock.yaml'
  docs:
    needs: changes
    if: needs.changes.outputs.docs == 'true' || github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps: [...]
```

A skipped job reports as success to branch protection. If `docs` is required but `changes`
is not, a failed `changes` job skips `docs` and still passes, so make `changes` required too. Include lockfiles and workspace
config in the filter, run everything on `main`, and test the skip logic: one PR that
touches the paths (job runs) and one that doesn't (job skipped, check green).

## 4. Pre-push hook, not an AGENTS.md line

"Run lint and typecheck before pushing" in AGENTS.md gets skipped. A `.husky/pre-push`
that runs the same checks is much harder to skip (`git push --no-verify` still bypasses
it, so keep CI as the backstop). Target under 10s (Biome or Oxlint, `tsc --noEmit`).

- Keep any existing `bd hooks run pre-push` delegation.
- Husky sets `core.hooksPath`, which every worktree of the repo shares.
- Verify with a deliberate type error: the push must fail.

## 5. TypeScript 7 and Oxlint

TypeScript 7 (the Go compiler) keeps the `tsc` binary and is about 5-10x faster
(1.09s to 0.16s on a small repo, 16.6s to 2.3s on a larger one). typescript-eslint cannot
load it because TS 7 has no JS API. So:

- **No typed ESLint rules:** move to TS 7 and drop TS 6.
- **Typed ESLint rules in use:** keep TS 6 as an aliased devDependency for ESLint and run
  `tsc` from TS 7 side by side.

Oxlint is 10-30x faster than ESLint, but do not assume it can replace a strict config.
Run a parity spike first; a hard rule is that no lint rule may be lost.

1. Inventory enabled rules with `eslint --print-config <file>`.
2. Classify each with `pnpm dlx @oxlint/migrate eslint.config.* --details`. Without
   `--details`, unmapped rules are dropped silently.
3. Write one seeded-violation fixture per rule, plus boundary pairs for configured options.
4. Diff ESLint and Oxlint output on the real tree and on historical commits with known
   failures, normalized to `rule file:line`.
5. Decide by rule: full Oxlint if everything has parity, otherwise keep ESLint.

Findings from the spikes:

- `jsPlugins` run with no type information. Typed sonarjs and unicorn rules silently do
  nothing there.
- Oxlint's `no-unused-vars` treats `_`-prefixed names differently from ESLint's default.
- Disable comments stop working for aliased plugins.
- Oxlint misses or under-reports a few core rules. A small custom plugin can call ESLint's
  own rule modules for those (no-octal, no-dupe-args, no-control-regex, no-useless-escape,
  no-redeclare). It keeps `eslint` as a devDependency but never runs ESLint itself.
- Check the config the tool actually loads. One spike checked a legacy `.eslintrc.cjs`
  while the repo ran a flat `eslint.config.js`.
- Strict typed configs (strictTypeChecked, unicorn, sonarjs, import-x cycles) needed 73-101
  rules with type info. A hybrid was only 1.3x faster and blocked TS 7, so those repos
  stayed on ESLint. ESLint `--cache` is unsafe with typed rules.

## 6. Not worth it on public hosted runners

Faster runners (queue is already about 2s), sharding and Vitest `isolate: false` (longest
test step was 23s), blobless clone (checkout 5s or less), `node_modules` caching (install
9s or less), Nx or Turbo on single-package repos. Re-audit after changes to confirm.

## Other traps

- Release-please PRs can sit at `action_required` because their checks need approval. They
  are not a CI speed problem.
- Re-enabling CodeQL on every PR adds about 40s. Run it on `main` and on a schedule.
- Hosted review bots can run out of credits; `ai-review watch --pr <number>` runs them locally.
