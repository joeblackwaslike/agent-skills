#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { withFrontmatter, setSkillLastUpdated } from "../../../scripts/lib/doc-frontmatter.cjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(__dirname, "..");
const outputDir = path.join(skillRoot, "references", "generated");
const SKILL_MD = path.join(skillRoot, "SKILL.md");
const NOW = new Date().toISOString();
let docsChanged = false;

const DOCS = [
  {
    slug: "extension-anatomy",
    title: "Extension Anatomy",
    url: "https://code.visualstudio.com/api/get-started/extension-anatomy",
  },
  {
    slug: "activation-events",
    title: "Activation Events",
    url: "https://code.visualstudio.com/api/references/activation-events",
  },
  {
    slug: "extension-capabilities",
    title: "Extension Capabilities",
    url: "https://code.visualstudio.com/api/extension-capabilities/overview",
  },
  {
    slug: "extension-host",
    title: "Extension Host",
    url: "https://code.visualstudio.com/api/advanced-topics/extension-host",
  },
  {
    slug: "testing-extensions",
    title: "Testing Extensions",
    url: "https://code.visualstudio.com/api/working-with-extensions/testing-extension",
  },
  {
    slug: "bundling-extensions",
    title: "Bundling Extensions",
    url: "https://code.visualstudio.com/api/working-with-extensions/bundling-extension",
  },
  {
    slug: "publishing-extensions",
    title: "Publishing Extensions",
    url: "https://code.visualstudio.com/api/working-with-extensions/publishing-extension",
  },
  {
    slug: "webviews",
    title: "Webviews",
    url: "https://code.visualstudio.com/api/extension-guides/webview",
  },
  {
    slug: "webview-ux",
    title: "Webview UX Guidelines",
    url: "https://code.visualstudio.com/api/ux-guidelines/webviews",
  },
  {
    slug: "web-extensions",
    title: "Web Extensions",
    url: "https://code.visualstudio.com/api/extension-guides/web-extensions",
  },
  {
    slug: "language-model-api",
    title: "Language Model API",
    url: "https://code.visualstudio.com/api/extension-guides/language-model",
  },
  {
    slug: "language-model-tool-api",
    title: "Language Model Tool API",
    url: "https://code.visualstudio.com/api/extension-guides/tools",
  },
  {
    slug: "contribution-points",
    title: "Contribution Points",
    url: "https://code.visualstudio.com/api/references/contribution-points",
  },
  {
    slug: "vscode-api",
    title: "VS Code API",
    url: "https://code.visualstudio.com/api/references/vscode-api",
  },
];

function decodeEntities(value) {
  return value
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#39;", "'")
    .replaceAll("&#x27;", "'")
    .replaceAll("&#x2F;", "/");
}

function extractMain(html) {
  const docsMainMatch = html.match(/<main\s+class="docs-main-content body"[^>]*>[\s\S]*?<\/main>/i);
  if (docsMainMatch) return docsMainMatch[0];

  const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
  if (mainMatch) return mainMatch[0];

  const articleMatch = html.match(/<article[\s\S]*?<\/article>/i);
  if (articleMatch) return articleMatch[0];

  const bodyMatch = html.match(/<body[\s\S]*?<\/body>/i);
  return bodyMatch ? bodyMatch[0] : html;
}

function htmlToMarkdown(html, sourceUrl) {
  let markdown = extractMain(html);

  const codeBlocks = [];
  markdown = markdown.replace(/<pre[\s\S]*?<code(?: class="language-([^"]+)")?[^>]*>([\s\S]*?)<\/code>[\s\S]*?<\/pre>/gi, (_match, lang = "", code) => {
    const token = `@@CODE_BLOCK_${codeBlocks.length}@@`;
    codeBlocks.push(`\n\`\`\`${lang.replace(/^lang-/, "")}\n${decodeEntities(code.replace(/<[^>]+>/g, "")).trim()}\n\`\`\`\n`);
    return token;
  });

  markdown = markdown
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n# $1\n")
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n")
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n")
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "\n#### $1\n")
    .replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, "\n##### $1\n")
    .replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, "\n###### $1\n")
    .replace(/<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_match, href, text) => {
      const url = href.startsWith("http") ? href : new URL(href, sourceUrl).toString();
      return `[${text.replace(/<[^>]+>/g, "").trim()}](${url})`;
    })
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "\n- $1")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, "`$1`")
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**")
    .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**")
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "_$1_")
    .replace(/<[^>]+>/g, "")
    .replace(/\n[ \t]+\n/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n");

  for (const [index, block] of codeBlocks.entries()) {
    markdown = markdown.replace(`@@CODE_BLOCK_${index}@@`, block);
  }

  return decodeEntities(markdown).trim();
}

async function fetchDoc(doc) {
  const response = await fetch(doc.url, {
    headers: {
      "user-agent": "codex-vscode-extension-skill-doc-generator/1.0",
      accept: "text/html",
    },
  });

  if (!response.ok) {
    throw new Error(`${doc.url} returned ${response.status}`);
  }

  const html = await response.text();
  const body = htmlToMarkdown(html, doc.url);
  const normalizedBody = body.replace(new RegExp(`^#\\s+${doc.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+`, "i"), "");
  const filename = `${doc.slug}.md`;
  const filePath = path.join(outputDir, filename);
  const docBody = [`# ${doc.title}`, "", `Source: ${doc.url}`, "", normalizedBody, ""].join("\n");
  const wrapped = withFrontmatter({ filePath, body: docBody, source: doc.url, title: doc.title, now: NOW });
  await writeFile(filePath, wrapped.content, "utf8");
  if (wrapped.changed) docsChanged = true;

  return {
    slug: doc.slug,
    title: doc.title,
    url: doc.url,
    file: filename,
    fetched_at: wrapped.fetched_at,
    sha256: wrapped.sha256,
    bytes: Buffer.byteLength(wrapped.content),
  };
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const results = [];
  for (const doc of DOCS) {
    process.stderr.write(`Fetching ${doc.url}\n`);
    results.push(await fetchDoc(doc));
  }

  const manifest = {
    generated_at: new Date().toISOString(),
    source: "Official Visual Studio Code developer documentation",
    docs: results,
  };

  await writeFile(path.join(outputDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  await writeFile(
    path.join(outputDir, "README.md"),
    [
      "# Generated VS Code Docs",
      "",
      "This directory is generated by `scripts/update.js` from official Visual Studio Code developer documentation.",
      "",
      "Do not hand-edit generated files. Refresh them with:",
      "",
      "```bash",
      "node scripts/update.js",
      "```",
      "",
      ...results.map((doc) => `- [${doc.title}](${doc.file}) - ${doc.url}`),
      "",
    ].join("\n"),
    "utf8",
  );

  if (docsChanged) {
    setSkillLastUpdated(SKILL_MD, NOW.slice(0, 10));
    console.error("Stamped SKILL.md last_updated");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
