# Badge Playbook

Use badges as compact proof. Badge rows should be accurate, maintained, and visually calm.

## Badge Order

Default order:

1. Package/marketplace version
2. Downloads/install count
3. CI/build
4. Tests/coverage if maintained
5. License
6. Runtime/platform compatibility
7. Docs
8. Security/audit when real

## Common Sources

GitHub Actions:

```markdown
[![CI](https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/ci.yml)
```

npm version:

```markdown
[![npm](https://img.shields.io/npm/v/PACKAGE.svg)](https://www.npmjs.com/package/PACKAGE)
```

npm downloads:

```markdown
[![downloads](https://img.shields.io/npm/dm/PACKAGE.svg)](https://www.npmjs.com/package/PACKAGE)
```

PyPI version:

```markdown
[![PyPI](https://img.shields.io/pypi/v/PACKAGE.svg)](https://pypi.org/project/PACKAGE/)
```

License:

```markdown
[![license](https://img.shields.io/github/license/OWNER/REPO.svg)](LICENSE)
```

VS Code Marketplace:

```markdown
[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/PUBLISHER.EXTENSION)](https://marketplace.visualstudio.com/items?itemName=PUBLISHER.EXTENSION)
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/PUBLISHER.EXTENSION)](https://marketplace.visualstudio.com/items?itemName=PUBLISHER.EXTENSION)
```

Open VSX:

```markdown
[![Open VSX Version](https://img.shields.io/open-vsx/v/PUBLISHER/EXTENSION)](https://open-vsx.org/extension/PUBLISHER/EXTENSION)
```

## Badge Anti-patterns

- broken workflow badges
- duplicated version badges for inactive package registries
- social badges before product proof
- twenty tiny badges that make the README look abandoned
- "awesome", "PRs welcome", or "made with love" badges unless they serve the repo's audience
- coverage badges when coverage is stale or misleading

## Verification

Open or fetch badge URLs when practical. At minimum, confirm owner, repo, package name, workflow filename, publisher, and extension ID are real.
