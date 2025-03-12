import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import VitePluginBrowserSync from 'vite-plugin-browser-sync';
import tsconfigPaths from 'vite-tsconfig-paths';

import { BASE_PATH } from './src/AppConstants';



export default defineConfig(() => ({
  base: BASE_PATH,
  build: {
    sourcemap: 'inline' as const,
    outDir: 'docs',
    // manifest: true,
  },
  plugins: [
    tsconfigPaths(),
    TanStackRouterVite({ autoCodeSplitting: false }),
    viteReact({ include: /\.([tj]s|md|json)$/ }),
    VitePluginBrowserSync({ dev: { bs: { port: 4000 } } }),
  ],
  server: {
    allowedHosts: ['localhost', 'drydock.local'],
    port: 5173,
  }
}));