import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist/standalone",
    lib: {
      entry: path.resolve(__dirname, "client/src/standalone-builds/product-card-standalone.ts"),
      name: "ProductCardWebComponent",
      fileName: "product-card-standalone",
      formats: ["iife"],
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
    target: "es2015",
    minify: true,
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
