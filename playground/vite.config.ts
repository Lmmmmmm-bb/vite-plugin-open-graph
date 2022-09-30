import { defineConfig } from 'vite'

import ogPlugin from '../src'

export default defineConfig({
  plugins: [ogPlugin()],
})
