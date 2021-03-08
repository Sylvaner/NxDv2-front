import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://10.0.0.100:3000',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  }
})
