import { onMounted, onBeforeUnmount, ref } from "vue"
import { baseUrl } from "@/utils/env"
import { useShopStore } from "@store/shopTable.js"
import { useMitt } from "@/hooks/mitt"

export const useTable = () => {
  const store = useShopStore()
  const { updatePrice, initialData, autoUpdateCart, initalSelect } = store
  const { tableData, backendData } = storeToRefs(store)

  const { emitEvent, onEvent } = useMitt()
  const openPreview = val => {
    emitEvent("openLoading")
    emitEvent("openPreview", val)
  }
  //  更新交期按钮状态
  // const deliveryTimeArr = ref([{ name: "加急" }, { name: "标准" }, { name: "经济" }])
  const handleDelivery = (index, indey) => {
    const { id, name } = backendData.value.deliveryTimeArr[indey]
    tableData.value[index].deliveryTime = { id, name }
    tableData.value[index].deliveryTime.currentIndex = indey
    updatePrice()
  }

  onMounted(async () => {
    await initialData()
    initalSelect()
    // updatePrice()

    // setInterval(async () => {
    //   await autoUpdateCart()
    // }, 10000)

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
