import { createApp } from "vue"
// import "./assets/style.css"
import "./assets/iconfont/iconfont.css"
import "element-plus/dist/index.css"

import { createPinia } from "pinia"

import App from "./App.vue"
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.mount("#app")
