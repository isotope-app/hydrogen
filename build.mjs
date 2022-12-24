#!/usr/bin/yarn zx

import 'zx/globals';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import { build } from 'esbuild';

await $`rm -rf dist`;

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: false,
  sourcemap: true,
  plugins: [NodeModulesPolyfillPlugin()],
  outfile: 'dist/hydrogen.development.js',
});

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  plugins: [NodeModulesPolyfillPlugin()],
  outfile: 'dist/hydrogen.production.js',
});
