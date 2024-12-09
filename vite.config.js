import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/weatherbitapi': {
        target: 'https://cdn.weatherbit.io',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/weatherbitapi/, ''),
      },
      '/weathermapapi': {
        target: 'https://api.openweathermap.org',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/weathermapapi/, ''),
      }
    },
  },
})
