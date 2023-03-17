import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";

const remoteUrl = 'http://localhost:8081'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "host",
      remotes: {
        app2: {
          external: `${remoteUrl}/remoteEntry.js`,
          format: "var",
          from: "webpack",
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "esnext",
  },
});
