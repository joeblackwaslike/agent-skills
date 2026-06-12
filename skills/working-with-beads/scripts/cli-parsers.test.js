const { test } = require('node:test');
const assert = require('node:assert');
const {
  parsePinnedVersion, normalizeVersion, parseCommandTree, parseSubcommands, filenameForCommand,
} = require('./update_docs.js');

test('parsePinnedVersion parses key=value lines', () => {
  const pin = parsePinnedVersion('bd=1.0.5\nplugin=1.0.4\ntag=v1.0.5\n');
  assert.deepEqual(pin, { bd: '1.0.5', plugin: '1.0.4', tag: 'v1.0.5' });
});

test('normalizeVersion extracts semver from bd version output', () => {
  assert.equal(normalizeVersion('bd version 1.0.5 (Homebrew)'), '1.0.5');
  assert.equal(normalizeVersion('v1.0.5'), '1.0.5');
  assert.equal(normalizeVersion('nope'), null);
});

test('parseCommandTree extracts commands under section headers', () => {
  const help = [
    'Some preamble.',
    '',
    'Working With Issues:',
    '  assign          Assign an issue to someone',
    '  create-form     Create a new issue using an interactive form',
    '',
    'Views & Reports:',
    '  find-duplicates Find semantically similar issues',
    '',
    'Flags:',
    '  -h, --help      help for bd',
  ].join('\n');
  assert.deepEqual(parseCommandTree(help), ['assign', 'create-form', 'find-duplicates']);
});

test('parseSubcommands reads the Available Commands block only', () => {
  const help = [
    'Manage dependencies',
    '',
    'Usage:',
    '  bd dep [command]',
    '',
    'Available Commands:',
    '  add         Add a dependency',
    '  remove      Remove a dependency',
    '  help        Help about any command',
    '',
    'Flags:',
    '  -h, --help   help for dep',
  ].join('\n');
  assert.deepEqual(parseSubcommands(help), ['add', 'remove']);
});

test('filenameForCommand joins path with __ and .md', () => {
  assert.equal(filenameForCommand(['create']), 'create.md');
  assert.equal(filenameForCommand(['dep', 'add']), 'dep__add.md');
});
