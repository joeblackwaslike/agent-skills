# Docusaurus Implementation

Check `references/generated/` for current official syntax before making version-sensitive changes.

## Files to Inspect

```text
docusaurus.config.ts
docusaurus.config.js
sidebars.ts
sidebars.js
docs/
src/pages/
src/components/
src/css/custom.css
static/img/
package.json
```

## Setup Defaults

- Use the classic preset unless requirements demand custom plugins.
- Prefer TypeScript config in TypeScript repos.
- Use MDX pages for custom landing pages and rich docs.
- Keep reusable visual components in `src/components/`.
- Keep static README/docs images in `static/img/` or existing convention.

## Theme and Branding

Set:

- navbar logo/title
- footer links
- docs sidebar behavior
- syntax highlighting theme
- metadata and Open Graph image
- custom CSS variables for brand colors

Avoid one-note palettes. Documentation should feel branded but calm enough for repeated use.

## Search

Use the repo's established search provider if present. Common options:

- Algolia DocSearch for public docs with indexing.
- Local search plugin for smaller/offline docs.

Do not add a search dependency without checking deployment target and indexing requirements.

## Sidebars

Use explicit sidebars for curated paths:

```ts
const sidebars = {
  docs: [
    "overview",
    {
      type: "category",
      label: "Getting started",
      items: ["getting-started/install", "getting-started/quickstart"],
    },
  ],
};

export default sidebars;
```

## Build and Verify

Run what the repo provides:

```bash
pnpm build
pnpm start
```

or direct:

```bash
pnpm docusaurus build
pnpm docusaurus start
```

Verify:

- build succeeds
- no broken internal links
- images load
- sidebars include new pages
- pages have title/description frontmatter
- code blocks render correctly
- mobile layout is usable
