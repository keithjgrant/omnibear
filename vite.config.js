import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    rollupOptions: {
      input: {
        index: new URL('./index.html', import.meta.url).pathname,
        page: new URL('./src/page.js', import.meta.url).pathname,
        background: new URL('./src/background.js', import.meta.url).pathname,
        // index: 'index.html',
        // background: 'src/background.js',
      },
      // output: {
      //   'src/background.js': 'background.js',
      // },
      output: {
        entryFileNames: '[name].js',
        // entryFileNames: (info) => {
        //   return info.name === 'index' ? 'index.js' : 'background.js';
        //   console.log(info, info.name);
        //   return 'background.js';
        // },
        extend: true,
      },
    },
  },
});
