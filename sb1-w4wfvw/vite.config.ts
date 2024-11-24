import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'MyGlidePlugin',
      fileName: 'my-glide-plugin'
    },
    rollupOptions: {
      external: ['@glideapps/glide-data-grid'],
      output: {
        globals: {
          '@glideapps/glide-data-grid': 'GlideDataGrid'
        }
      }
    }
  }
});