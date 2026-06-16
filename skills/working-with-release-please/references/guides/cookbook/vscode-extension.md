# Cookbook: release a VS Code extension

Goal: every merge of a release PR cuts a version, updates `CHANGELOG.md`, creates the GitHub Release, and **publishes the extension** to the VS Code Marketplace **and** Open VSX.

There is **no `vscode` release-type** — a VS Code extension's manifest is `package.json`, so use **`release-type: node`**. release-please bumps `package.json` `version` and maintains `CHANGELOG.md`; you add a publish job that packages the `.vsix` and pushes it to both registries, gated on `release_created`.

> Pair this with the `vscode-extension-builder-lawvable` skill for building/packaging/testing the extension itself; this cookbook only covers the release automation.

---

## 1. Config

`release-type: node`. Simple mode is fine for a single extension — just set it in the workflow. Or manifest mode:

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
(Existing extension: seed the current `package.json` version — [../integration.md](../integration.md#track-b--existing-repo-already-has-versionstags).)

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
      tag_name: ${{ steps.release.outputs.tag_name }}
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
      contents: write          # to attach the .vsix to the GitHub Release
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build --if-present

      # Package once, reuse the .vsix for all targets
      - run: npx --yes @vscode/vsce package -o extension.vsix

      # VS Code Marketplace
      - run: npx --yes @vscode/vsce publish --packagePath extension.vsix
        env:
          VSCE_PAT: ${{ secrets.VSCE_PAT }}

      # Open VSX (for VSCodium / Cursor / Gitpod users)
      - run: npx --yes ovsx publish extension.vsix
        env:
          OVSX_PAT: ${{ secrets.OVSX_PAT }}

      # Attach the .vsix to the GitHub Release
      - env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: gh release upload ${{ needs.release-please.outputs.tag_name }} extension.vsix
```

---

## 3. Auth: the two PATs

- **`VSCE_PAT`** (VS Code Marketplace) — created in Azure DevOps. Steps: create a publisher at [marketplace.visualstudio.com/manage](https://marketplace.visualstudio.com/manage); in Azure DevOps (same Microsoft account) create a **Personal Access Token** with **Marketplace → Manage** scope, **All accessible organizations**. Store it as the `VSCE_PAT` secret. `vsce` reads `VSCE_PAT` from the env automatically.
- **`OVSX_PAT`** (Open VSX) — create a namespace and token at [open-vsx.org](https://open-vsx.org/) (user settings → Access Tokens). You must also have published/claimed your namespace. Store as `OVSX_PAT`.

Publishing to Open VSX is optional but recommended — it's the registry VSCodium, Cursor, Gitpod, and other non-Microsoft builds pull from.

---

## 4. Gotchas

- **`package.json` requirements for `vsce`:** a valid `publisher`, `name`, `version`, `engines.vscode`, and (for Marketplace) a `repository` field, a `LICENSE`, and a `README.md`. `vsce package` will refuse without them.
- **`vsce` needs the version already bumped** — that's exactly what release-please did in the release PR, so by the time the publish job runs, `package.json` is at the new version. Don't pass `vsce publish <version>` (which would bump again); package the current version.
- **First publish** must be done after the publisher exists and the namespace (Open VSX) is claimed.
- **Pre-release channel:** VS Code supports pre-release extensions via `vsce publish --pre-release`. Drive it from release-please's `prerelease`/`prerelease-type` config (see [../advanced.md](../advanced.md#prereleases--release-channels)) and add `--pre-release` to the publish commands when releasing a prerelease version. Note VS Code requires pre-release versions to use `major.minor.patch` with the pre-release using a higher minor/patch (it doesn't support SemVer `-beta` suffixes in the marketplace the way npm does).
- **Platform-specific builds** (extensions with native deps) need `vsce package --target <platform>` per target and a publish per `.vsix`; out of scope here — see the `vscode-extension-builder-lawvable` skill.
- **`@vscode/vsce`** is the current package name (`vsce` was the old one). `npx @vscode/vsce` always pulls the latest.
