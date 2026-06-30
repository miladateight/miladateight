import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  optimizeDeps: {
    entries: ["index.html"]
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("/three/") || id.includes("@react-three") || id.includes("/three-stdlib") || id.includes("postprocessing")) return "three3d";
          if (id.includes("react")) return "vendor";
          return undefined;
        }
      }
    }
  }
});
