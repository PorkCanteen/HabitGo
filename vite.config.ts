import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 9090,
    proxy: {
      "/api": {
        target: "http://47.109.155.8:9090/",
        changeOrigin: true,
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  define: {
    "process.env": {
      VITE_API_URL: "http://47.109.155.8:3000",
    },
  },
});
