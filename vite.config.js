import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
//  自动按需引入  2.11M ----->   1.39M   ----css文件
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

// import postcssPresetEnv from "postcss-preset-env"

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    open: true,
  },
  // css: {
  //   postcss: {
  //     plugins: [postcssPresetEnv()],
  //   },
  // },
})
