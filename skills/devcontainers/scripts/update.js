#!/usr/bin/env node
/**
 * Fetch official Dev Container documentation and save as markdown reference files.
 * Run: node skills/devcontainers/scripts/update.js
 */

import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "../references/generated");

const DOCS = [
  {
    slug: "json-reference",
    title: "devcontainer.json reference",
    url: "https://containers.dev/implementors/json_reference/",
  },
  {
    slug: "features-spec",
    title: "Features specification",
    url: "https://containers.dev/implementors/features/",
  },
  {
    slug: "templates-spec",
    title: "Templates specification",
    url: "https://containers.dev/implementors/templates/",
  },
  {
    slug: "features-distribution",
    title: "Features distribution",
    url: "https://containers.dev/implementors/features-distribution/",
  },
  {
    slug: "templates-distribution",
    title: "Templates distribution",
    url: "https://containers.dev/implementors/templates-distribution/",
  },
  {
    slug: "feature-authoring-guide",
    title: "Feature authoring guide",
    url: "https://containers.dev/guide/author-a-feature",
  },
  {
    slug: "feature-authoring-best-practices",
    title: "Feature authoring best practices",
    url: "https://containers.dev/guide/feature-authoring-best-practices",
  },
  {
    slug: "features-index",
    title: "Available features index",
    url: "https://containers.dev/features",
  },
  {
    slug: "templates-index",
    title: "Available templates index",
    url: "https://containers.dev/templates",
  },
  {
    slug: "vscode-containers",
    title: "VS Code Dev Containers guide",
    url: "https://code.visualstudio.com/docs/devcontainers/containers",
  },
  {
    slug: "vscode-create",
    title: "VS Code create dev container",
    url: "https://code.visualstudio.com/docs/devcontainers/create-dev-container",
  },
  {
    slug: "vscode-cli",
    title: "VS Code devcontainer CLI",
    url: "https://code.visualstudio.com/docs/devcontainers/devcontainer-cli",
  },
  {
    slug: "vscode-tips",
    title: "VS Code Dev Containers tips and tricks",
    url: "https://code.visualstudio.com/docs/devcontainers/tips-and-tricks",
  },
];

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      accept: "text/html,application/xhtml+xml",
      "user-agent": "agent-skills-devcontainers/1.0",
    },
  });
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  return res.text();
}

function extractBody(html, url) {
  // VS Code docs use a specific main content div
  if (url.includes("code.visualstudio.com")) {
    const m =
      html.match(/<main[^>]*class="[^"]*docs-main-content[^"]*"[^>]*>([\s\S]*?)<\/main>/i) ||
      html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    return m ? m[1] : html;
  }
  // containers.dev: main content column is col-md-12 col-lg-10
  const m =
    html.match(/<div[^>]*class="col-md-12 col-lg-10"[^>]*>([\s\S]*?)<\/div>\s*<div[^>]*class="col-lg-2/i) ||
    html.match(/<div[^>]*class="[^"]*col-md-12[^"]*col-lg-10[^"]*"[^>]*>([\s\S]*)/i) ||
    html.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ||
    html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  return m ? m[1] : html;
}

function htmlToMarkdown(html) {
  // Preserve code blocks — replace with tokens first
  const codeBlocks = [];
  let out = html.replace(/<pre[^>]*><code([^>]*)>([\s\S]*?)<\/code><\/pre>/gi, (_, attrs, code) => {
    const langMatch = attrs.match(/class="[^"]*language-([a-z0-9_+-]+)/i);
    const lang = langMatch ? langMatch[1] : "";
    const decoded = code
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
      .replaceAll("&amp;", "&")
      .replaceAll("&quot;", '"')
      .replaceAll("&#39;", "'")
      .replaceAll("&#x2F;", "/");
    const token = `\0CODE${codeBlocks.length}\0`;
    codeBlocks.push(`\`\`\`${lang}\n${decoded.trimEnd()}\n\`\`\``);
    return token;
  });

  // Inline code
  out = out.replace(/<code[^>]*>(.*?)<\/code>/gi, (_, c) => {
    const decoded = c.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&");
    return "`" + decoded + "`";
  });

  // Headings
  out = out
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, t) => `# ${stripTags(t).trim()}\n\n`)
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, t) => `## ${stripTags(t).trim()}\n\n`)
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, t) => `### ${stripTags(t).trim()}\n\n`)
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, t) => `#### ${stripTags(t).trim()}\n\n`)
    .replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, (_, t) => `##### ${stripTags(t).trim()}\n\n`)
    .replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, (_, t) => `###### ${stripTags(t).trim()}\n\n`);

  // Block elements
  out = out
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, t) => `${stripTags(t).trim()}\n\n`)
    .replace(
      /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi,
      (_, t) => stripTags(t).trim().split("\n").map((l) => `> ${l}`).join("\n") + "\n\n",
    );

  // Lists
  out = out
    .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, items) =>
      items.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (__, item) => `- ${stripTags(item).trim()}\n`) + "\n",
    )
    .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, items) => {
      let i = 1;
      return (
        items.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (__, item) => `${i++}. ${stripTags(item).trim()}\n`) + "\n"
      );
    });

  // Tables
  out = out.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (_, tbody) => {
    const rows = [];
    const trMatches = tbody.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);
    let isHeader = true;
    for (const [, row] of trMatches) {
      const cells = [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map(([, c]) =>
        stripTags(c).trim().replaceAll("|", String.raw`\|`),
      );
      rows.push("| " + cells.join(" | ") + " |");
      if (isHeader) {
        rows.push("| " + cells.map(() => "---").join(" | ") + " |");
        isHeader = false;
      }
    }
    return rows.join("\n") + "\n\n";
  });

  // Inline formatting
  out = out
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, (_, t) => `**${stripTags(t)}**`)
    .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, (_, t) => `**${stripTags(t)}**`)
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, (_, t) => `_${stripTags(t)}_`)
    .replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, (_, t) => `_${stripTags(t)}_`)
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => `[${stripTags(text).trim()}](${href})`)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<hr\s*\/?>/gi, "\n---\n");

  // Remove remaining tags
  out = stripTags(out);

  // Decode HTML entities
  out = out
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&#x2F;", "/")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));

  // Restore code blocks
  out = out.replace(/\0CODE(\d+)\0/g, (_, i) => codeBlocks[Number(i)]);

  // Clean up whitespace
  out = out.replace(/\n{4,}/g, "\n\n\n").trim();

  return out;
}

function stripTags(html) {
  return html.replaceAll(/<[^>]+>/g, "");
}

await mkdir(OUT_DIR, { recursive: true });

const now = new Date().toISOString();
const manifest = {
  generated_at: now,
  source: "Official Dev Containers specification (containers.dev) and VS Code documentation",
  docs: [],
};

for (const doc of DOCS) {
  process.stderr.write(`fetching ${doc.url} ...\n`);
  let markdown;
  try {
    const html = await fetchPage(doc.url);
    const body = extractBody(html, doc.url);
    markdown = htmlToMarkdown(body);
  } catch (err) {
    process.stderr.write(`  WARN: ${err.message} — skipping\n`);
    continue;
  }

  const fetchedAt = new Date().toISOString();
  const sha256 = createHash("sha256").update(markdown, "utf8").digest("hex");
  const header = `---\ntitle: "${doc.title}"\nsource: "${doc.url}"\nfetched_at: "${fetchedAt}"\nsha256: "${sha256}"\n---\n\n# ${doc.title}\n\nSource: ${doc.url}\n\n`;
  const fullContent = header + markdown + "\n";

  const filename = `${doc.slug}.md`;
  await writeFile(join(OUT_DIR, filename), fullContent, "utf8");
  process.stderr.write(`  wrote ${filename} (${Buffer.byteLength(fullContent, "utf8")} bytes)\n`);

  manifest.docs.push({
    slug: doc.slug,
    title: doc.title,
    url: doc.url,
    file: filename,
    fetched_at: fetchedAt,
    sha256,
    bytes: Buffer.byteLength(fullContent, "utf8"),
  });
}

await writeFile(join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n", "utf8");
process.stderr.write(`\nWrote ${manifest.docs.length} files + manifest.json to ${OUT_DIR}\n`);
