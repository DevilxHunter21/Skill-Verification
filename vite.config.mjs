import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 2000,
    sourcemap: false,
  },
  plugins: [react()],
  server: {
    port: 3001,
    host: "0.0.0.0",
    strictPort: true,
  },
  preview: {
    port: 4173,
    host: "0.0.0.0",
  }
});