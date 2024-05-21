// 加载状态  hook
import { ref } from "vue"
import { ElLoading } from "element-plus"

export const useLoading = () => {
  const loading = ref(null)
  const openLoading = () => {
    loading.value = ElLoading.service({
      lock: true,
      text: "正在加载,请稍候...",
      background: "rgba(0, 0, 0, 0.7)",
    })
  }
  const closeLoading = () => {
    setTimeout(() => {
      loading.value.close()
    }, 500)
  }
  return {
    openLoading,
    closeLoading,
  }
}
