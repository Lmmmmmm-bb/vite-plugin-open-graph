import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src/index.ts'],
  format: ['cjs', 'esm'],
  outputOptions: {
    exports: 'named',
  },
});
