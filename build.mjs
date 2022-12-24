#!/usr/bin/yarn zx

import 'zx/globals';
import { build } from 'esbuild';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

console.log('Removing existing build...');
await $`rm -rf dist`;

console.log('Building...');
build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  plugins: [NodeModulesPolyfillPlugin()],
  outdir: 'dist',
  format: 'esm',
});

console.log('Generating type definitions...');
await $`tsc`;
