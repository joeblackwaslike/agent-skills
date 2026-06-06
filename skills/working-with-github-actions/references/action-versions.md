# Action Versions

Latest release versions for commonly used GitHub Actions.
Auto-updated by `scripts/update_docs.js` — do not edit manually.
Last updated: 2026-06-06

## GitHub Official

| Action | Latest tag | Pin usage |
|--------|-----------|-----------|
| `actions/checkout` | `v6.0.3` | `uses: actions/checkout@v6.0.3` |
| `actions/setup-node` | `v6.4.0` | `uses: actions/setup-node@v6.4.0` |
| `actions/setup-python` | `v6.2.0` | `uses: actions/setup-python@v6.2.0` |
| `actions/setup-java` | `v5.2.0` | `uses: actions/setup-java@v5.2.0` |
| `actions/setup-go` | `v6.4.0` | `uses: actions/setup-go@v6.4.0` |
| `actions/cache` | `v5.0.5` | `uses: actions/cache@v5.0.5` |
| `actions/upload-artifact` | `v7.0.1` | `uses: actions/upload-artifact@v7.0.1` |
| `actions/download-artifact` | `v8.0.1` | `uses: actions/download-artifact@v8.0.1` |
| `actions/github-script` | `v9.0.0` | `uses: actions/github-script@v9.0.0` |
| `actions/labeler` | `v6.1.0` | `uses: actions/labeler@v6.1.0` |
| `actions/stale` | `v10.3.0` | `uses: actions/stale@v10.3.0` |
| `actions/dependency-review-action` | `v5.0.0` | `uses: actions/dependency-review-action@v5.0.0` |

## Package Managers

| Action | Latest tag | Pin usage |
|--------|-----------|-----------|
| `pnpm/action-setup` | `v6.0.8` | `uses: pnpm/action-setup@v6.0.8` |

## Docker

| Action | Latest tag | Pin usage |
|--------|-----------|-----------|
| `docker/login-action` | `v4.2.0` | `uses: docker/login-action@v4.2.0` |
| `docker/build-push-action` | `v7.2.0` | `uses: docker/build-push-action@v7.2.0` |
| `docker/metadata-action` | `v6.1.0` | `uses: docker/metadata-action@v6.1.0` |
| `docker/setup-buildx-action` | `v4.1.0` | `uses: docker/setup-buildx-action@v4.1.0` |
| `docker/setup-qemu-action` | `v4.1.0` | `uses: docker/setup-qemu-action@v4.1.0` |

## Cloud Deployments

| Action | Latest tag | Pin usage |
|--------|-----------|-----------|
| `aws-actions/configure-aws-credentials` | `v6.2.0` | `uses: aws-actions/configure-aws-credentials@v6.2.0` |
| `aws-actions/amazon-ecr-login` | `v2.1.5` | `uses: aws-actions/amazon-ecr-login@v2.1.5` |
| `google-github-actions/auth` | `v3` | `uses: google-github-actions/auth@v3` |
| `google-github-actions/setup-gcloud` | `v3.0.1` | `uses: google-github-actions/setup-gcloud@v3.0.1` |
| `azure/login` | `v3.0.0` | `uses: azure/login@v3.0.0` |

## Release & Publishing

| Action | Latest tag | Pin usage |
|--------|-----------|-----------|
| `googleapis/release-please-action` | `v5.0.0` | `uses: googleapis/release-please-action@v5.0.0` |
| `softprops/action-gh-release` | `v3.0.0` | `uses: softprops/action-gh-release@v3.0.0` |
| `peaceiris/actions-gh-pages` | `v4.1.0` | `uses: peaceiris/actions-gh-pages@v4.1.0` |

## Code Quality

| Action | Latest tag | Pin usage |
|--------|-----------|-----------|
| `codecov/codecov-action` | `v6.0.1` | `uses: codecov/codecov-action@v6.0.1` |
| `github/codeql-action/init` | `codeql-bundle-v2.25.6` | `uses: github/codeql-action/init@codeql-bundle-v2.25.6` |
| `dependabot/fetch-metadata` | `v3.1.0` | `uses: dependabot/fetch-metadata@v3.1.0` |

## Pinning to SHA (recommended for production)

For production workflows, pin to a full commit SHA rather than a tag to prevent
supply-chain attacks where a tag is moved:

```yaml
# Resolve the SHA for a tag:
#   gh api repos/actions/checkout/git/refs/tags/v4 --jq '.object.sha'
uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4.2.2
```

Tools like `dependabot` and `pinact` can automate SHA pinning across your workflows.
