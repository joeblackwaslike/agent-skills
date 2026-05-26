#!/usr/bin/env node
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(__dirname, "..");
const outputDir = path.join(skillRoot, "references", "generated");

const DOCS = [
  ["installation", "Installation", "https://docusaurus.io/docs/installation"],
  ["configuration", "Configuration", "https://docusaurus.io/docs/configuration"],
  ["docs-introduction", "Docs Introduction", "https://docusaurus.io/docs/docs-introduction"],
  ["docs-create-doc", "Create Docs", "https://docusaurus.io/docs/create-doc"],
  ["docs-multi-instance", "Docs Multi-instance", "https://docusaurus.io/docs/docs-multi-instance"],
  ["sidebar", "Sidebar", "https://docusaurus.io/docs/sidebar"],
  ["versioning", "Versioning", "https://docusaurus.io/docs/versioning"],
  ["markdown-features", "Markdown Features", "https://docusaurus.io/docs/markdown-features"],
  ["markdown-front-matter", "Markdown Front Matter", "https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter"],
  ["markdown-links", "Markdown Links", "https://docusaurus.io/docs/markdown-features/links"],
  ["markdown-assets", "Markdown Assets", "https://docusaurus.io/docs/markdown-features/assets"],
  ["markdown-toc", "Markdown Table of Contents", "https://docusaurus.io/docs/markdown-features/toc"],
  ["markdown-code-blocks", "Markdown Code Blocks", "https://docusaurus.io/docs/markdown-features/code-blocks"],
  ["markdown-admonitions", "Markdown Admonitions", "https://docusaurus.io/docs/markdown-features/admonitions"],
  ["markdown-tabs", "Markdown Tabs", "https://docusaurus.io/docs/markdown-features/tabs"],
  ["markdown-diagrams", "Markdown Diagrams", "https://docusaurus.io/docs/markdown-features/diagrams"],
  ["mdx-plugins", "MDX Plugins", "https://docusaurus.io/docs/markdown-features/plugins"],
  ["styling-layout", "Styling and Layout", "https://docusaurus.io/docs/styling-layout"],
  ["swizzling", "Swizzling", "https://docusaurus.io/docs/swizzling"],
  ["theme-classic", "Classic Theme", "https://docusaurus.io/docs/api/themes/@docusaurus/theme-classic"],
  ["plugin-content-docs", "Docs Plugin", "https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs"],
  ["plugin-content-pages", "Pages Plugin", "https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-pages"],
  ["plugin-content-blog", "Blog Plugin", "https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog"],
  ["search", "Search", "https://docusaurus.io/docs/search"],
  ["seo", "SEO", "https://docusaurus.io/docs/seo"],
  ["i18n", "Internationalization", "https://docusaurus.io/docs/i18n/introduction"],
  ["deployment", "Deployment", "https://docusaurus.io/docs/deployment"],
];

function decodeEntities(value) {
  return value
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#39;", "'")
    .replaceAll("&#x27;", "'");
}

function extractArticle(html) {
  const article = html.match(/<article[\s\S]*?<\/article>/i);
  if (article) return article[0];
  const main = html.match(/<main[\s\S]*?<\/main>/i);
  if (main) return main[0];
  return html;
}

function htmlToMarkdown(html, sourceUrl) {
  let markdown = extractArticle(html);
  const codeBlocks = [];

  markdown = markdown.replace(/<pre[\s\S]*?<code[^>]*>([\s\S]*?)<\/code>[\s\S]*?<\/pre>/gi, (_match, code) => {
    const token = `@@CODE_${codeBlocks.length}@@`;
    codeBlocks.push(`\n\`\`\`\n${decodeEntities(code.replace(/<[^>]+>/g, "")).trim()}\n\`\`\`\n`);
    return token;
  });

  markdown = markdown
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n# $1\n")
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n")
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n")
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "\n#### $1\n")
    .replace(/<a\s+[^>]*href=\"([^\"]+)\"[^>]*>([\s\S]*?)<\/a>/gi, (_match, href, text) => {
      const url = href.startsWith("http") ? href : new URL(href, sourceUrl).toString();
      return `[${text.replace(/<[^>]+>/g, "").trim()}](${url})`;
    })
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "\n- $1")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, "`$1`")
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**")
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "_$1_")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n");

  for (const [index, block] of codeBlocks.entries()) {
    markdown = markdown.replace(`@@CODE_${index}@@`, block);
  }

  return decodeEntities(markdown).trim();
}

async function fetchDoc([slug, title, url]) {
  const response = await fetch(url, {
    headers: {
      accept: "text/html",
      "user-agent": "codex-docusaurus-docs-skill/1.0",
    },
  });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);

  const body = htmlToMarkdown(await response.text(), url);
  const fetchedAt = new Date().toISOString();
  const hash = createHash("sha256").update(body).digest("hex");
  const file = `${slug}.md`;

  await writeFile(
    path.join(outputDir, file),
    [
      "---",
      `title: "${title}"`,
      `source: "${url}"`,
      `fetched_at: "${fetchedAt}"`,
      `sha256: "${hash}"`,
      "---",
      "",
      `# ${title}`,
      "",
      `Source: ${url}`,
      "",
      body,
      "",
    ].join("\n"),
    "utf8",
  );

  return { slug, title, url, file, fetched_at: fetchedAt, sha256: hash };
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  const docs = [];
  for (const doc of DOCS) {
    process.stderr.write(`Fetching ${doc[2]}\n`);
    docs.push(await fetchDoc(doc));
  }

  await writeFile(
    path.join(outputDir, "manifest.json"),
    `${JSON.stringify({ generated_at: new Date().toISOString(), docs }, null, 2)}\n`,
    "utf8",
  );

  await writeFile(
    path.join(outputDir, "README.md"),
    [
      "# Generated Docusaurus Docs",
      "",
      "Generated by `scripts/update.js` from official Docusaurus documentation.",
      "",
      ...docs.map((doc) => `- [${doc.title}](${doc.file}) - ${doc.url}`),
      "",
    ].join("\n"),
    "utf8",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
