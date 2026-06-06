#!/usr/bin/env node
/**
 * Auto-update script for skills/working-with-pieces
 *
 * What this updates and from where:
 *
 *   resources.md              ← fully regenerated from pieces-app/awesome-pieces README
 *   mcp-server.md             ← tools catalog section replaced from pieces-app/pro_tips MCP README
 *   long-term-memory.md       ← tested prompts section replaced from pieces-app/pro_tips LTM section
 *   typescript-sdk.md         ← latest npm version for @pieces.app/pieces-os-client
 *   python-sdk.md             ← latest PyPI version for pieces_os_client
 *   cli.md                    ← latest PyPI version for pieces-cli
 *   pieces-os.md              ← WARN-ONLY if Pieces OS GitHub release version changed
 *   pieces-os-internals.md    ← WARN-ONLY if Pieces OS GitHub release version changed
 *
 * Not auto-updated (requires manual machine inspection):
 *   ide-plugins.md, browser-extension.md, obsidian-extension.md
 *
 * Cadence: Weekly via .github/workflows/update-docs.yml
 * Manual:  make update-working-with-pieces
 *
 * Exit codes: 0 = success (even if no changes), 1 = fetch error
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const REFS = path.join(__dirname, '..', 'references');

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fetch(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : require('http');
    client.get(url, { headers: { 'User-Agent': 'pieces-skill-updater/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        res.resume();
        return;
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function fetchJson(url) {
  return fetch(url).then(JSON.parse);
}

function readRef(name) {
  return fs.readFileSync(path.join(REFS, name), 'utf8');
}

function writeRef(name, content) {
  const current = fs.existsSync(path.join(REFS, name))
    ? fs.readFileSync(path.join(REFS, name), 'utf8')
    : null;
  if (content === current) {
    console.log(`  unchanged: ${name}`);
    return false;
  }
  fs.writeFileSync(path.join(REFS, name), content, 'utf8');
  console.log(`  updated:   ${name}`);
  return true;
}

/**
 * Replace the content between <!-- BEGIN:auto-updated:KEY --> and
 * <!-- END:auto-updated:KEY --> markers in a file.
 * Returns the updated string (does not write to disk).
 */
function replaceMarkedSection(fileContent, key, newSectionContent) {
  const beginTag = `<!-- BEGIN:auto-updated:${key} -->`;
  const endTag = `<!-- END:auto-updated:${key} -->`;
  const begin = fileContent.indexOf(beginTag);
  const end = fileContent.indexOf(endTag);
  if (begin === -1 || end === -1) {
    throw new Error(`Markers not found for key "${key}"`);
  }
  return (
    fileContent.slice(0, begin) +
    beginTag + '\n' +
    newSectionContent.trimEnd() + '\n' +
    fileContent.slice(end)
  );
}

// ─── Version updaters ─────────────────────────────────────────────────────────

async function updatePackageVersion(refName, pkgInfo) {
  const { name, latestVersion, pattern, replacement } = pkgInfo;
  console.log(`\nChecking ${name} version...`);
  let content = readRef(refName);
  const updated = content.replace(pattern, replacement(latestVersion));
  writeRef(refName, updated);
}

async function getNpmVersion(pkg) {
  const data = await fetchJson(`https://registry.npmjs.org/${encodeURIComponent(pkg)}/latest`);
  return data.version;
}

async function getPypiVersion(pkg) {
  const data = await fetchJson(`https://pypi.org/pypi/${pkg}/json`);
  return data.info.version;
}

// ─── resources.md ─────────────────────────────────────────────────────────────

async function updateResources() {
  console.log('\nFetching awesome-pieces README...');
  const readme = await fetch(
    'https://raw.githubusercontent.com/pieces-app/awesome-pieces/main/README.md'
  );

  // Extract SDK table, IDE plugin table, browser extension table, community links,
  // and releases from the README. We rebuild resources.md by parsing the README sections.
  // Strategy: pull key sections by heading, fall back to full README append if structure changes.

  const frontmatter = `---
name: resources
description: Comprehensive catalog of Pieces ecosystem resources — all SDKs, example projects, snippet collections, IDE plugins, MCP guides for 19 agents, community links
---

# Pieces Resources Catalog

`;

  // Always include the full awesome-pieces content as a secondary reference section
  // (trimmed to remove the HTML badges at the top which change with every build)
  const cleanedReadme = readme
    .replace(/^\s*<[^>]+>\s*$/gm, '')      // strip bare HTML tags
    .replace(/\[!\[.*?\]\(.*?\)\]\(.*?\)/g, '') // strip badge markdown
    .replace(/^\s*\n/gm, '\n')              // collapse blank lines
    .trim();

  const staticSection = `## Official Documentation

| Resource | URL |
|----------|-----|
| Main docs | https://docs.pieces.app |
| Developer / build docs | https://docs.pieces.app/build |
| Support portal | https://docs.pieces.app/support |
| Official blog | https://code.pieces.app/blog |

## GitHub Repositories

| Repo | Purpose |
|------|---------|
| \`pieces-app/pieces-os-client-openapi-spec\` | OpenAPI specification — source of truth for all REST endpoints |
| \`pieces-app/pieces-os-client-sdk-for-typescript\` | TypeScript SDK |
| \`pieces-app/pieces-os-client-sdk-for-python\` | Python SDK |
| \`pieces-app/pieces-os-client-sdk-for-dart\` | Dart SDK |
| \`pieces-app/pieces-os-client-sdk-for-kotlin\` | Kotlin SDK |
| \`pieces-app/example-typescript\` | React example app (full CRUD + Copilot chat) |
| \`pieces-app/pieces-copilot-vanilla-typescript-example\` | Vanilla TS Copilot example |
| \`pieces-app/cli-agent\` | CLI agent source |
| \`pieces-app/obsidian-pieces\` | Obsidian plugin source |
| \`pieces-app/pro_tips\` | MCP guides, LTM prompts, tested query patterns |
| \`pieces-app/awesome-pieces\` | Curated list of all Pieces resources |
| \`pieces-app/opensource\` | Open source projects index |

## MCP Setup Guides (19 Agents)

All guides live in \`pieces-app/pro_tips/guides/MCP/Agent Setups & Integrations/\`.

Covered: Cursor, Claude Desktop, Claude Code, Claude Cowork, VS Code, Windsurf, Goose, Cline, Continue.dev, JetBrains IDEs, Zed, GitHub Copilot, OpenAI Codex CLI, Google Gemini CLI, Amazon Q Developer, ChatGPT, Raycast, Rovo Dev CLI, OpenClaw.

## Pre-Built Snippet Collections

Import curated snippet sets directly into Pieces Drive:

| Language | URL |
|----------|-----|
| TypeScript | https://code.pieces.app/collections/typescript |
| Python | https://code.pieces.app/collections/python |
| JavaScript | https://code.pieces.app/collections/javascript |
| Node.js | https://code.pieces.app/collections/node-js |
| SQL | https://code.pieces.app/collections/sql |
| Dart | https://code.pieces.app/collections/dart |

## IDE Plugins

| Plugin | Install |
|--------|---------|
| VS Code | marketplace.visualstudio.com — \`MeshIntelligentTechnologiesInc.pieces-vscode\` |
| JetBrains (all IDEs) | plugins.jetbrains.com/plugin/17328 |
| JupyterLab | docs.pieces.app/extensions-plugins/jupyterlab |
| Azure Data Studio | docs.pieces.app/extensions-plugins/azuredatastudio |

## Browser Extensions

| Browser | Install |
|---------|---------|
| Chrome | chromewebstore.google.com/detail/pieces-for-developers-cop/igbgibhbfonhmjlechmeefimncpekepm |
| Firefox | addons.mozilla.org/en-US/firefox/addon/pieces-save-code-from-the-web/ |
| Edge | microsoftedge.microsoft.com/addons/detail/pieces-save-code-snippet/hglfimcdgonaeeobjckfdabcldfidmim |

## Productivity Integrations

| Integration | Notes |
|-------------|-------|
| Obsidian | Community Plugins — search "Pieces for Developers" |
| Microsoft Teams | docs.pieces.app/extensions-plugins/teams |

## Community

| Channel | URL |
|---------|-----|
| Discord | https://discord.gg/getpieces |
| YouTube | https://youtube.com/@getpieces |
| Twitter/X | https://twitter.com/getpieces |
| Dev.to | https://dev.to/get_pieces |
| Hashnode | https://pieces.hashnode.dev |

## Downloads

| Platform | URL |
|----------|-----|
| Desktop app (all OS) | https://docs.pieces.app/products/desktop/download |
| CLI (PyPI) | https://pypi.org/project/pieces-cli/ |
| SDK (npm) | https://www.npmjs.com/package/@pieces.app/pieces-os-client |

`;

  // Append the awesome-pieces raw README content as a reference appendix
  const output =
    frontmatter +
    staticSection +
    `## Awesome-Pieces Community Catalog\n\n` +
    `> Auto-fetched from https://github.com/pieces-app/awesome-pieces\n\n` +
    cleanedReadme + '\n';

  writeRef('resources.md', output);
}

// ─── pro_tips: MCP tools section ─────────────────────────────────────────────

async function updateMcpTools() {
  console.log('\nFetching pro_tips MCP README...');
  let readme;
  try {
    readme = await fetch(
      'https://raw.githubusercontent.com/pieces-app/pro_tips/main/guides/MCP/Agent%20Setups%20%26%20Integrations/README.md'
    );
  } catch {
    // fallback path
    readme = await fetch(
      'https://raw.githubusercontent.com/pieces-app/pro_tips/main/guides/MCP/README.md'
    );
  }

  // Extract the tools reference section — try several common heading patterns
  const toolsMatch =
    readme.match(/^#{1,3}\s+(?:All\s+\d+\s+)?(?:MCP\s+)?Tools?(?:\s+Reference)?\s*$([\s\S]+)/im) ||
    readme.match(/^#{1,3}\s+Complete\s+\d+\s+Tools?\s+Reference\s*$([\s\S]+)/im) ||
    readme.match(/^#{1,3}\s+Available\s+Tools?\s*$([\s\S]+)/im);

  if (!toolsMatch) {
    console.warn('  WARN: Could not extract tools section from pro_tips MCP README — skipping');
    console.warn('  Hint: check the heading used in pieces-app/pro_tips MCP README and update the regex in update.js');
    return;
  }

  const toolsContent = `## All MCP Tools\n\n> Auto-fetched from pieces-app/pro_tips\n\n` + toolsMatch[1].trim();

  let mcpContent = readRef('mcp-server.md');
  mcpContent = replaceMarkedSection(mcpContent, 'tools', toolsContent);
  writeRef('mcp-server.md', mcpContent);
}

// ─── pro_tips: LTM tested prompts ─────────────────────────────────────────────

async function updateLtmPrompts() {
  console.log('\nFetching pro_tips LTM content...');
  let readme;
  try {
    // Try the specific 24-48h prompts guide first
    readme = await fetch(
      'https://raw.githubusercontent.com/pieces-app/pro_tips/main/guides/LTM/10-tested-ltm-queries-for-24-48-hours/README.md'
    );
  } catch {
    try {
      readme = await fetch(
        'https://raw.githubusercontent.com/pieces-app/pro_tips/main/README.md'
      );
    } catch (e) {
      console.warn(`  WARN: Could not fetch pro_tips LTM content — skipping (${e.message})`);
      return;
    }
  }

  // Look for a section with tested queries/prompts
  const promptsMatch = readme.match(
    /^#{1,3}\s+.*(?:Tested|Queries|Prompts|Examples).*$([\s\S]+)/im
  );
  if (!promptsMatch) {
    console.warn('  WARN: Could not extract prompts section from pro_tips — skipping');
    return;
  }

  const promptsContent =
    `## Tested Query Prompts\n\n> Auto-fetched from pieces-app/pro_tips\n\n` +
    promptsMatch[1].trim();

  let ltmContent = readRef('long-term-memory.md');
  ltmContent = replaceMarkedSection(ltmContent, 'prompts', promptsContent);
  writeRef('long-term-memory.md', ltmContent);
}

// ─── Package versions ─────────────────────────────────────────────────────────

async function updateVersions() {
  // TypeScript SDK
  console.log('\nChecking @pieces.app/pieces-os-client version...');
  try {
    const tsVer = await getNpmVersion('@pieces.app/pieces-os-client');
    let content = readRef('typescript-sdk.md');
    content = content.replace(
      /npm install @pieces\.app\/pieces-os-client[^\n]*/,
      `npm install @pieces.app/pieces-os-client pieces-copilot-sdk  # SDK v${tsVer}`
    );
    writeRef('typescript-sdk.md', content);
  } catch (e) {
    console.warn(`  WARN: npm lookup failed — ${e.message}`);
  }

  // Python SDK
  console.log('Checking pieces_os_client version...');
  try {
    const pyVer = await getPypiVersion('pieces_os_client');
    let content = readRef('python-sdk.md');
    content = content.replace(
      /pip install pieces_os_client[^\n]*/,
      `pip install pieces_os_client  # v${pyVer}`
    );
    writeRef('python-sdk.md', content);
  } catch (e) {
    console.warn(`  WARN: PyPI lookup failed — ${e.message}`);
  }

  // CLI
  console.log('Checking pieces-cli version...');
  try {
    const cliVer = await getPypiVersion('pieces-cli');
    let content = readRef('cli.md');
    content = content.replace(
      /pieces version\n# → pieces-cli: [\d.]+[^\n]*/,
      `pieces version\n# → pieces-cli: ${cliVer}`
    );
    writeRef('cli.md', content);
  } catch (e) {
    console.warn(`  WARN: PyPI CLI lookup failed — ${e.message}`);
  }
}

// ─── Staleness check for manually-maintained files ───────────────────────────

async function checkInternalsStaleness() {
  console.log('\nChecking Pieces OS latest version...');
  try {
    // Use the npm package version as a proxy for the Pieces OS release version
    // (the SDK version tracks closely with the OS version)
    const pkg = await fetchJson('https://registry.npmjs.org/@pieces.app/pieces-os-client/latest');
    const sdkVersion = pkg.version || '(unknown)';

    // Check what Pieces OS version the internals doc was last written for
    const internals = readRef('pieces-os-internals.md');
    const versionMatch = internals.match(/Pieces OS ([\d.]+)/);
    const docOsVersion = versionMatch ? versionMatch[1] : '(unknown)';

    // SDK and OS use different version schemes — just report both so a human can judge
    console.log(`  npm SDK (@pieces.app/pieces-os-client): v${sdkVersion}`);
    console.log(`  pieces-os-internals.md last written for: Pieces OS ${docOsVersion}`);
    console.log(`  ⚠️  pieces-os-internals.md requires MANUAL update when Pieces OS has a major release.`);
    console.log(`     Check https://docs.pieces.app/changelog or the Pieces Desktop "What's New" pane.`);
  } catch (e) {
    console.warn(`  WARN: GitHub release check failed — ${e.message}`);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Updating working-with-pieces skill references...\n');
  const errors = [];

  for (const [label, fn] of [
    ['resources.md (awesome-pieces catalog)', updateResources],
    ['mcp-server.md tools section (pro_tips)', updateMcpTools],
    ['long-term-memory.md prompts section (pro_tips)', updateLtmPrompts],
    ['package versions (npm + PyPI)', updateVersions],
    ['internals staleness check', checkInternalsStaleness],
  ]) {
    try {
      await fn();
    } catch (e) {
      console.error(`\n  ERROR in ${label}: ${e.message}`);
      errors.push(label);
    }
  }

  console.log('\n─────────────────────────────────────────────────────');
  if (errors.length > 0) {
    console.error(`\nCompleted with ${errors.length} error(s):`);
    errors.forEach((e) => console.error(`  ✗ ${e}`));
    process.exit(1);
  } else {
    console.log('\nAll updates complete.');
    process.exit(0);
  }
}

main();
