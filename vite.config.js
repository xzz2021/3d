import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
//  自动按需引入  2.11M ----->   1.39M   ----css文件
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import path from "path"
// import postcssPresetEnv from "postcss-preset-env"

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "pinia"],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    open: true,
    port: 666,
    proxy: {
      "/api": {
        target: "http://192.168.1.152:8069", // 后端服务器的局域网IP地址和端口
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ""),
      },
      // "/": {
      //   target: "http://192.168.1.152:8069", // 后端服务器的局域网IP地址和端口
      //   changeOrigin: true,
      //   rewrite: path => path.replace(/^\//, ""),
      // },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@views": path.resolve(__dirname, "src/views"),
      "@store": path.resolve(__dirname, "src/pinia"),
    },
  },
})
