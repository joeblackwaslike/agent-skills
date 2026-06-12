# Doc-fetching cookbook

How to write the auto-update script for a `working-with-X` skill. Three discovery patterns, then the shared scaffolding every script uses. All three live alongside real, working examples — copy from those.

## Choosing a pattern

| Pattern | Use when upstream publishes… | Model |
| --- | --- | --- |
| **A — llms.txt / docs-map** | an `llms.txt` (or docs-map `.md`) listing every doc URL, and pages are served as Markdown | [`working-with-claude-code/scripts/update_docs.js`](../../working-with-claude-code/scripts/update_docs.js) |
| **B — sitemap regex + slug** | a `sitemap.md` of relative links, pages served as Markdown by appending `.md`, basenames collide | [`working-with-vercel-ai-sdk/scripts/update_docs.js`](../../working-with-vercel-ai-sdk/scripts/update_docs.js) |
| **C — curated list + HTML→MD** | no machine index; only HTML pages you must hand-pick and convert | [`devcontainers/scripts/update.js`](../../devcontainers/scripts/update.js) |

Prefer A or B (they auto-discover the doc set). Reach for C only when there's no `llms.txt`/sitemap and you must convert HTML.

## Shared scaffolding (all patterns)

Every CommonJS script (`.js`) opens with the same shape:

```js
#!/usr/bin/env node
const https = require('https');
const fs = require('fs');
const path = require('path');

const REFERENCES_DIR = path.join(__dirname, '..', 'references');
const { withFrontmatter, setSkillLastUpdated } = require('../../../scripts/lib/doc-frontmatter.cjs');
const SKILL_MD = path.join(__dirname, '..', 'SKILL.md');
const RUN_NOW = new Date().toISOString();   // single timestamp for the whole run
let docsChanged = false;                    // did ANY fetched doc actually change?

// Minimal fetch helper (no deps). Resolves body string, rejects on non-2xx.
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(data);
        else reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
      });
    }).on('error', reject);
  });
}
```

The **require path is always `../../../scripts/lib/doc-frontmatter.cjs`** (skill → `scripts/` → up three to repo root). The ESM equivalent is `import { withFrontmatter, setSkillLastUpdated } from "../../../scripts/lib/doc-frontmatter.cjs";` (the helper is authored as flat CJS specifically so ESM can import it).

The **per-doc write loop** is identical across patterns — only the URL/filename differ:

```js
async function fetchAndSaveDoc(url) {
  const filename = /* pattern-specific: basename(url) or slugForPath(path) */;
  const filepath = path.join(REFERENCES_DIR, filename);
  try {
    const content = await fetchUrl(url);
    const wrapped = withFrontmatter({ filePath: filepath, body: content, source: url, now: RUN_NOW });
    fs.writeFileSync(filepath, wrapped.content, 'utf8');
    if (wrapped.changed) docsChanged = true;       // ← track change for last_updated stamp
    return { url, filename, success: true };
  } catch (error) {
    console.error(`  ❌ Failed to fetch ${filename}: ${error.message}`);
    return { url, filename, success: false, error: error.message };
  }
}
```

And the **closing stamp** — restamp `SKILL.md` only when something actually changed (this is what keeps weekly runs from churning timestamps):

```js
if (docsChanged) {
  setSkillLastUpdated(SKILL_MD, RUN_NOW.slice(0, 10));   // YYYY-MM-DD
  console.log('📅 Stamped SKILL.md last_updated');
}
```

Be polite to the upstream server: `await new Promise(r => setTimeout(r, 100));` between fetches.

## Pattern A — llms.txt / docs-map

Fetch the index, regex out every doc URL, fetch each. Basenames are unique, so `filename = path.basename(url)`.

```js
const LLMS_TXT_URL = 'https://code.claude.com/docs/llms.txt';
const URL_PATTERN = /https:\/\/code\.claude\.com\/docs\/en\/[^\s)]+\.md/g;

async function getDocUrls() {
  const content = await fetchUrl(LLMS_TXT_URL);
  const urls = new Set();
  for (const m of content.matchAll(URL_PATTERN)) urls.add(m[0]);
  return Array.from(urls).sort();
}
// fetchAndSaveDoc: const filename = path.basename(url);
```

## Pattern B — sitemap regex + slug-collision handling

Fetch `sitemap.md`, keep only in-scope sections, append `.md` to each path, and slugify the **full path** (`/` → `__`) so colliding basenames don't overwrite each other.

```js
const BASE_URL = 'https://ai-sdk.dev';
const SITEMAP_URL = `${BASE_URL}/sitemap.md`;
const SITEMAP_LINK_PATTERN = /\]\((\/(?:docs|providers|cookbook)\/[^)\s#?]+)\)/g;
const FAILURE_THRESHOLD = 0.25;   // fail the run only if >25% of pages fail

function slugForPath(docPath) {
  return docPath.replace(/^\//, '').replace(/\/+$/, '').replace(/\//g, '__') + '.md';
}

async function getDocPaths() {
  const content = await fetchUrl(SITEMAP_URL);
  const paths = new Set();
  for (const m of content.matchAll(SITEMAP_LINK_PATTERN)) paths.add(m[1]);
  return Array.from(paths).sort();
}
// fetchAndSaveDoc: const url = `${BASE_URL}${docPath}.md`; const filename = slugForPath(docPath);
```

Partial-failure tolerance — one dead sitemap link shouldn't fail the whole run, but a broken upstream should:

```js
const failureRatio = results.length ? failed / results.length : 1;
if (results.length === 0 || failureRatio > FAILURE_THRESHOLD) {
  console.error(`\n❌ Failure ratio ${(failureRatio * 100).toFixed(0)}% exceeds threshold`);
  process.exit(1);
}
```

## Pattern C — curated list + HTML→Markdown + manifest (ESM)

No machine index: hand-pick the pages, fetch HTML, extract the main content region, convert to Markdown, and write a `manifest.json` alongside the docs. This pattern is ESM and uses the global `fetch`.

```js
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { withFrontmatter, setSkillLastUpdated } from "../../../scripts/lib/doc-frontmatter.cjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "../references/generated");
const SKILL_MD = join(__dirname, "..", "SKILL.md");
const now = new Date().toISOString();
let docsChanged = false;

const DOCS = [
  { slug: "json-reference", title: "devcontainer.json reference", url: "https://containers.dev/implementors/json_reference/" },
  // ...one entry per page
];

for (const doc of DOCS) {
  let markdown;
  try {
    const html = await fetchPage(doc.url);     // fetch() wrapper, throws on !res.ok
    markdown = htmlToMarkdown(extractBody(html, doc.url));   // site-specific extractors
  } catch (err) { process.stderr.write(`  WARN: ${err.message} — skipping\n`); continue; }

  const filePath = join(OUT_DIR, `${doc.slug}.md`);
  const body = `# ${doc.title}\n\nSource: ${doc.url}\n\n` + markdown + "\n";
  const wrapped = withFrontmatter({ filePath, body, source: doc.url, title: doc.title, now });
  await writeFile(filePath, wrapped.content, "utf8");
  if (wrapped.changed) docsChanged = true;

  manifest.docs.push({ slug: doc.slug, title: doc.title, url: doc.url, file: `${doc.slug}.md`,
    fetched_at: wrapped.fetched_at, sha256: wrapped.sha256 });
}

if (docsChanged) setSkillLastUpdated(SKILL_MD, now.slice(0, 10));
```

The `extractBody`/`htmlToMarkdown`/`stripTags` helpers are site-specific (the dev-containers script special-cases VS Code's `docs-main-content` `<main>` and `containers.dev`'s `col-lg-10` column). Copy and adapt them from [`devcontainers/scripts/update.js`](../../devcontainers/scripts/update.js).

## Exit-behavior contract

- **Exit 0 on success, non-zero on failure** — the Makefile and CI rely on this.
- Catch per-doc fetch errors and keep going; only `process.exit(1)` when the run is genuinely broken (Pattern B's failure-ratio gate, or a thrown error in `main().catch(...)`).
- Wrap the entry point so unexpected errors exit non-zero:
  ```js
  if (require.main === module) {
    main().catch((error) => { console.error('❌ Error:', error.message); process.exit(1); });
  }
  ```
