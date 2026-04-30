import { defineConfig } from 'vite';
import vituum from 'vituum';
import twig from '@vituum/vite-plugin-twig';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api', 'import']
      }
    }
  },
  plugins: [
    vituum({
      imports: {
        filenamePattern: {
          '+.css': [],
          '+.scss': [],
          '+.js': []
        }
      }
    }),
    twig({
      root: './src',
      namespaces: {
        components: './src/components',
        layouts: './src/layouts'
      }
    }),
    ViteImageOptimizer({
      jpg: {
        quality: 80,
        progressive: true
      },
      webp: {
        quality: 80,
        lossless: false
      }
    })
  ]
});
