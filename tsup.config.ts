import { defineConfig } from 'tsup';

export default defineConfig({
  dts: true,
  clean: true,
  splitting: true,
  entry: ['./src/index.ts'],
  format: ['cjs', 'esm'],
});
