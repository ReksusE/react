import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [
    react(),
    // SVG-иконки как React-компоненты: import Icon from './x.svg?react'
    svgr({
      include: '**/*.svg?react',
      svgrOptions: {
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        svgoConfig: {
          plugins: [
            'preset-default',
            {
              // Убираем fill/stroke/размеры только у корневого <svg>,
              // чтобы цветом управлял компонент Icon (аналог cleanSymbols)
              name: 'removeAttrs',
              params: {
                attrs: ['svg:fill', 'svg:stroke', 'svg:width', 'svg:height'],
              },
            },
          ],
        },
      },
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        // Автоматически подключаем helpers во все SCSS-файлы
        additionalData: `@use '/src/styles/helpers' as *;`,
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
})
