import { createApp } from "vue"
// import "./assets/style.css"
import "./assets/iconfont/iconfont.css"
import "element-plus/dist/index.css"

import ElementPlus from "element-plus"
import zhCn from "element-plus/es/locale/lang/zh-cn"
import { createPinia } from "pinia"
import App from "./App2.vue"
const app = createApp(App)

const pinia = createPinia()
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(pinia)
app.mount("#app")
