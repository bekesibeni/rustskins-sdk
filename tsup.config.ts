import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  outDir: 'dist',
  platform: 'node',
  target: 'es2024',
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  treeshake: true,
  external: ['@benji/stdlib'],
});
