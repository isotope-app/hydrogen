#!/usr/bin/yarn zx

import 'zx/globals';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import { build } from 'esbuild';

console.log('Removing existing build...');
await $`rm -rf dist`;

console.log('Building...');
build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: false,
  sourcemap: true,
  plugins: [NodeModulesPolyfillPlugin()],
  outdir: 'dist',
});

console.log('Generating type definitions...');
await $`tsc`;
