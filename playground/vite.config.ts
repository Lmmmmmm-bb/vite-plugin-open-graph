import { defineConfig } from 'vite';

import ogPlugin from 'vite-plugin-open-graph';

export default defineConfig({
  plugins: [ogPlugin()],
});
