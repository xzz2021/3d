import { onMounted, onBeforeUnmount, ref } from "vue"
import { baseUrl } from "@/utils/env"
import { useShopStore } from "@store/shopTable.js"
import { useMitt } from "@/hooks/mitt"

export const useTable = () => {
  const store = useShopStore()
  const { updatePrice, initialData } = store
  const { tableData, backendData } = storeToRefs(store)

  const { emitEvent, onEvent } = useMitt()
  const openPreview = () => {
    emitEvent("openLoading")
    emitEvent("openPreview")
  }
  //  更新交期按钮状态
  // const deliveryTimeArr = ref([{ name: "加急" }, { name: "标准" }, { name: "经济" }])
  const handleDelivery = (index, indey) => {
    tableData.value[index].deliveryTime = backendData.value.deliveryTimeArr[indey]
    tableData.value[index].deliveryTime.currentIndex = indey
    updatePrice()
  }

  onMounted(async () => {
    await initialData()
    updatePrice()

    // 页面 关闭  瞬间  执行
    // window.onbeforeunload = async () => {
    //   console.log("🚀 ~ xzz: useTable -> onUnmounted")
    //   const response = await fetch(`${baseUrl}/shop/cart/get_material`, {
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    //   })
    // }
  })
  return {
    // deliveryTimeArr,
    handleDelivery,
    openPreview,
  }
}
