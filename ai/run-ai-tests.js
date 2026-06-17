#!/usr/bin/env node
const { spawnSync } = require('child_process');

function run(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.status !== 0) process.exit(result.status || 1);
}

run('node', ['ai/generate-tests.js']);
run('npx', ['playwright', 'test', process.env.AI_TEST_OUTPUT || 'tests/ai-generated.spec.js']);
