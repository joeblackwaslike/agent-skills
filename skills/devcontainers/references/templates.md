# Dev Container Templates

Templates are source-file packages that encode a complete dev environment — they stamp out a `.devcontainer/` directory in a target project.

## Table of Contents

- [Using Templates](#using-templates)
- [Authoring a Template](#authoring-a-template)
- [devcontainer-template.json Schema](#devcontainer-templatejson-schema)
- [Directory Structure](#directory-structure)
- [Publishing Templates](#publishing-templates)

---

## Using Templates

**Via CLI:**

```bash
# Apply a template to the current project
devcontainer templates apply \
  -t ghcr.io/devcontainers/templates/python:latest \
  -w /path/to/project

# Apply with template options
devcontainer templates apply \
  -t ghcr.io/devcontainers/templates/python:latest \
  -a '{"imageVariant": "3.12-bullseye"}' \
  -w .
```

**Via interactive installer (Joe's templates):**

```bash
# Install into a project directory interactively
bash <(curl -fsSL https://raw.githubusercontent.com/joeblackwaslike/devcontainer/main/scripts/install.sh)

# Or clone first and run locally
just init /path/to/my-project
```

**Browsing available templates:**
- Official: `generated/templates-index.md`
- Browse: https://containers.dev/templates
- Joe's: `ghcr.io/joeblackwaslike/claude-code`, `ghcr.io/joeblackwaslike/claude-code-extend`

---

## Authoring a Template

Bootstrap from: https://github.com/devcontainers/template-starter

A template is a directory containing:
- `devcontainer-template.json` — metadata
- `.devcontainer/devcontainer.json` — the config that gets stamped into projects
- Optional: `Dockerfile`, `docker-compose.yml`, `custom-setup.sh`, project boilerplate files

---

## devcontainer-template.json Schema

```json
{
  "id": "my-template",                 // must match directory name under src/
  "version": "1.0.0",                  // semver; bump to republish
  "name": "My Template",
  "description": "Python + FastAPI development environment",
  "documentationURL": "https://github.com/me/my-templates",
  "publisher": "myname",
  "keywords": ["python", "fastapi"],
  "platforms": ["linux", "macos", "windows"],

  "options": {
    "imageVariant": {
      "type": "string",
      "description": "Python version",
      "default": "3.12-bullseye",
      "proposals": ["3.12-bullseye", "3.11-bullseye", "3.10-bullseye"]
    }
  }
}
```

**Required fields:** `id`, `version`, `name`

Template options let users customize the generated devcontainer.json. The CLI substitutes `${templateOption:optionName}` placeholders in the template files.

---

## Directory Structure

```
my-template-repo/
├── src/
│   ├── python-fastapi/
│   │   ├── devcontainer-template.json
│   │   └── .devcontainer/
│   │       ├── devcontainer.json       # uses ${templateOption:imageVariant}
│   │       └── Dockerfile              # optional
│   └── node-react/
│       ├── devcontainer-template.json
│       └── .devcontainer/
│           └── devcontainer.json
├── test/
│   ├── python-fastapi/
│   │   └── test.sh
│   └── node-react/
│       └── test.sh
├── .github/workflows/
│   └── release.yml                     # auto-publish to GHCR
└── README.md
```

**Template placeholder syntax in devcontainer.json:**

```json
{
  "image": "mcr.microsoft.com/devcontainers/python:${templateOption:imageVariant}",
  "name": "${templateOption:containerName}"
}
```

---

## Publishing Templates

**Prerequisites:** GHCR login (`docker login ghcr.io -u <github-username>`) and a GitHub token with `write:packages` scope.

**Manual publish:**

```bash
# From repo root
devcontainer templates publish \
  -r ghcr.io \
  -n <github-owner> \
  ./src
```

This publishes all templates under `src/` to:
```
ghcr.io/<owner>/templates/<template-id>:<version>
ghcr.io/<owner>/templates/<template-id>:latest
```

**GitHub Actions (recommended):**

Use the [devcontainers/action](https://github.com/devcontainers/action) workflow from the template-starter. It automatically:
1. Detects version bumps in `devcontainer-template.json`
2. Packages templates as OCI artifacts
3. Publishes to GHCR with version tags

```yaml
# .github/workflows/release.yml
- uses: devcontainers/action@v1
  with:
    publish-templates: true
    base-path-to-templates: ./src
  env:
    PUSH_ARTIFACT: true
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**After publishing:** Navigate to the package on GitHub → Package settings → set visibility to **public**. Private packages are invisible to the feature/template discovery index.

**Submit to official index:** Open a PR to [devcontainers.github.io](https://github.com/devcontainers/devcontainers.github.io) editing `_data/collection-index.yml` to add your collection namespace. The index auto-discovers all templates within the namespace.
