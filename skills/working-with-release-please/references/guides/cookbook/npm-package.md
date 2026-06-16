# Cookbook: release an npm package

Goal: every merge of a release PR cuts a version, updates `CHANGELOG.md`, creates the GitHub Release, and **publishes to npm**.

`release-type: node`. release-please bumps `version` in `package.json` (and the lockfile via the `node-workspace` plugin if you're in a workspace) and maintains `CHANGELOG.md`. **You** add the publish job, gated on `release_created`.

---

## 1. Config

Simple (single root package) — nothing committed, just the workflow's `release-type: node`. Or manifest mode:

`release-please-config.json`:
```json
{
  "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",
  "packages": { ".": { "release-type": "node" } }
}
```
`.release-please-manifest.json`:
```json
{ ".": "0.0.0" }
```
(For an existing package, seed the real current version — see [../integration.md](../integration.md#track-b--existing-repo-already-has-versionstags).)

---

## 2. Workflow

`.github/workflows/release-please.yml`:

```yaml
on:
  push:
    branches: [main]

permissions:
  contents: write
  pull-requests: write

name: release-please

jobs:
  release-please:
    runs-on: ubuntu-latest
    outputs:
      release_created: ${{ steps.release.outputs.release_created }}
    steps:
      - uses: googleapis/release-please-action@v5
        id: release
        with:
          release-type: node

  publish:
    needs: release-please
    if: ${{ needs.release-please.outputs.release_created == 'true' }}
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write        # enables npm provenance (--provenance)
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm publish --provenance --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## 3. Auth: token vs. provenance

- **`NPM_TOKEN`** — create an **automation** token (npmjs.com → Access Tokens → Granular/Automation) so it bypasses 2FA in CI. Store as the `NPM_TOKEN` repo secret. `actions/setup-node` with `registry-url` wires `NODE_AUTH_TOKEN` into `.npmrc` automatically.
- **Provenance (`--provenance`)** — publishes a signed attestation linking the package to the building workflow/commit. Requires `id-token: write` permission and a public repo (or npm Pro/Teams). Highly recommended; shows the "Provenance" badge on npm. Drop the flag if your registry/plan doesn't support it.
- **`--access public`** — required the first time you publish a **scoped** package (`@scope/name`); otherwise npm defaults scoped packages to restricted.

---

## 4. Gotchas

- **First publish of a new package** must happen at least once with `--access public` (scoped) and the package name must be free on npm.
- **`prepublishOnly`/build steps** run during `npm publish` — make sure your `files`/`dist` are built. Add a `- run: npm run build` step before publish if needed.
- **Monorepo:** use `release-type: node` per package, the `node-workspace` plugin to bump inter-package ranges, and gate each publish on the path-prefixed output (`steps.release.outputs['packages/x--release_created']`). See [../advanced.md](../advanced.md#the-plugin-system).
- **Prerelease channel:** to ship `1.2.0-beta.1` to npm's `next` dist-tag, set `prerelease`/`prerelease-type` in config (see [../advanced.md](../advanced.md#prereleases--release-channels)) and publish with `npm publish --tag next`.
- **Same-workflow vs split:** the example uses a separate `publish` job in the same workflow, so the default `GITHUB_TOKEN` is fine. If you split publishing into a `release: published`-triggered workflow, you must give release-please a PAT/App token ([../github-actions.md](../github-actions.md#the-token-decision-important)).
