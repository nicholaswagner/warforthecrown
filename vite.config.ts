import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
// import VitePluginBrowserSync from 'vite-plugin-browser-sync';
// import tsconfigPaths from 'vite-tsconfig-paths';



export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: env.VITE_BASE_URL,
    build: {
      sourcemap: 'inline' as const,
      outDir: 'docs',
    },
    plugins: [
      // tsconfigPaths(),
      TanStackRouterVite({ autoCodeSplitting: false }),
      viteReact({ include: /\.([tj]s|md|json)$/ }),
      // VitePluginBrowserSync({ dev: { bs: { port: 4000 } } }),
    ],
    server: {
      allowedHosts: ['localhost', 'drydock.local'],
      port: 5173,
    }
  }
});