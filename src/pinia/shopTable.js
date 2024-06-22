import { defineStore } from "pinia"

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useShopStore = defineStore("shopStore", () => {
  // 其他配置...

  const tableData = ref([])

  const totalPrice = computed(() => {
    let price = 0
    tableData.value.forEach(item => {
      price += item.finalPrice
    })
    return price
  })

  const sum = computed(() => {
    let sum = 0
    tableData.value.forEach(item => {
      sum += item.count.val
    })
    return sum
  })
  const productNum = computed(() => {
    return tableData.value.length
  })

  const updateImgUrl = (index, url) => {
    tableData.value[index].imageUrl = url
  }

  const addItem = rawData => {
    tableData.value.push(JSON.parse(JSON.stringify(rawData)))
  }

  const IsExist = filePath => {
    // modelFileInfo.filePath
    return tableData.value.some(item => item.modelFileInfo.filePath === filePath)
  }

  const getFinalPrice = () => {
    tableData.value.map(item => {
      item.finalPrice =
        (item.rawPrice + item.grinding.price + item.braces.price + item.nuts.price + item.paint.price + item.deliveryTime.price) *
        item.count.val
    })
  }

  return {
    tableData,
    totalPrice,
    sum,
    productNum,
    updateImgUrl,
    addItem,
    IsExist,
    getFinalPrice,
  }
})
