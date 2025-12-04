import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePWA({
    registerType: "autoUpdate",
    manifest: {
      name: "UrannyPlant",
      short_name: "UrannyPlant",
      // ✔ GitHub Pages 환경에서 반드시 필요
      start_url: "/urannyplant/",
      scope: "/urannyplant/",
      id: "/urannyplant/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#ffffff",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        }
      ],
    },
  })
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://apis.data.go.kr",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
