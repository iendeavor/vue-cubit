import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: /^@vue-cubit\/(.*)$/,
        replacement: path.resolve("../../packages/$1"),
      },
    ],
  },
  optimizeDeps: {
    exclude: ["vue-demi"],
  },
});
