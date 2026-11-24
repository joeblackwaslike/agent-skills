#!/usr/bin/env node
/**
 * PreToolUse hook — supplements serena-hooks remind for file types it omits:
 * config, data, doc, and schema formats where Serena symbolic tools still help.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const EXTENSIONS = new Set([
  '.md', '.mdx',
  '.yaml', '.yml',
  '.json', '.jsonc',
  '.toml',
  '.xml',
  '.graphql', '.gql',
  '.proto',
  '.sql',
  '.tf', '.tfvars', '.hcl',
  '.rst',
]);

const READ_THRESHOLD = 5;
const MIN_DENY_INTERVAL_SECONDS = 120;

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

function stateDir(sessionId) {
  return join(homedir(), '.claude', 'hooks', 'hook-data', sessionId);
}

function loadState(sessionId) {
  try {
    return JSON.parse(readFileSync(join(stateDir(sessionId), 'ext-remind.json'), 'utf8'));
  } catch {
    return { nReads: 0, lastDenyAt: null };
  }
}

function saveState(sessionId, state) {
  const dir = stateDir(sessionId);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'ext-remind.json'), JSON.stringify(state));
}

function isHookActive(state, nowMs) {
  if (!state.lastDenyAt) return true;
  return (nowMs - state.lastDenyAt) / 1000 >= MIN_DENY_INTERVAL_SECONDS;
}

function emitDeny(ext) {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: `Too many consecutive reads of ${ext} files. Counter reset — you can continue reading.`,
      additionalContext:
        `You have been reading ${ext} files repeatedly with the Read tool. ` +
        `Prefer Serena's search_for_pattern for targeted lookup. ` +
        `If a language server supports this file type, get_symbols_overview or find_symbol ` +
        `may also apply. Counter reset — you can continue reading now.`,
    },
  }));
}

function getExt(filePath) {
  const dot = filePath.lastIndexOf('.');
  return dot >= 0 ? filePath.slice(dot).toLowerCase() : '';
}

const raw = await readStdin();
const input = JSON.parse(raw);

const toolName = String(input.tool_name ?? input.toolName ?? '').toLowerCase();
const toolInput = input.tool_input ?? input.toolInput ?? {};
const sessionId = String(input.session_id ?? input.sessionId ?? '');

if (!sessionId) process.exit(0);

// Serena tool call → reset counter (user is using the right tool), then allow.
if (toolName.startsWith('mcp__plugin_serena_serena__')) {
  const state = loadState(sessionId);
  if (state.nReads > 0 || state.lastDenyAt) {
    state.nReads = 0;
    state.lastDenyAt = null;
    saveState(sessionId, state);
  }
  process.exit(0);
}

if (toolName !== 'read') process.exit(0);

const filePath = String(toolInput.file_path ?? toolInput.filePath ?? '');
if (!filePath) process.exit(0);

const ext = getExt(filePath);
if (!EXTENSIONS.has(ext)) process.exit(0);

const nowMs = Date.now();
const state = loadState(sessionId);

if (!isHookActive(state, nowMs)) process.exit(0);

state.nReads = (state.nReads ?? 0) + 1;

if (state.nReads >= READ_THRESHOLD) {
  state.nReads = 0;
  state.lastDenyAt = nowMs;
  saveState(sessionId, state);
  emitDeny(ext);
  process.exit(0);
}

saveState(sessionId, state);
