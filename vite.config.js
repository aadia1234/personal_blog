import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/aadia1234.github.io",
  server: {
    port: 5173,
    hot: true,
  },
});
