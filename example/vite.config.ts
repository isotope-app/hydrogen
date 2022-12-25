import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import nodePolyfills from 'vite-plugin-node-stdlib-browser';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), nodePolyfills()],
});
