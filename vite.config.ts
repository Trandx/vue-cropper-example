import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const basePath = fileURLToPath(new URL("./src", import.meta.url));
  const config: UserConfig = {
    plugins: [vue()],
    resolve: {
      alias: {
        //"@": resolve(__dirname, "src"),
        // '@': path.resolve(__dirname, './src'),
        "@": basePath,
      },
    },
    build: {
      outDir: 'dist', // Ensure this matches what Vercel expects
    },
  }
  return config
})
