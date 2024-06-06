import { defineStore } from "pinia"

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useShopStore = defineStore("shopStore", () => {
  // 其他配置...
  const tableData = ref([
    {
      image: "https://img2.imgtp.com/2024/05/31/qBd2EEAr.png",
      volume: 26.47,
      material: {
        name: "8200树脂",
        img: "",
        advantages: "高精度,高韧性, 高稳定性",
        disAdvantages: "保存温度不宜超过60摄氏度",
        color: {
          hex: "#F4DA40",
          pantone: "7404 C",
        },
        deviation: "±200微米或±0.2%",
        price: 14.6,
      },
      processing: {
        a: true,
        b: false,
      },
      grinding: {
        status: true,
        price: "23",
      },
      braces: {
        status: false,
        total: [],
        price: "23",
      },
      nuts: {
        status: false,
        price: "23",
        total: [],
      },
      paint: {
        status: false,
        price: "23",
      },
      count: 1,
      deliveryTime: 0,
      rawPrice: 168,
      finalPrice: 168,
      operation: "",
    },
  ])

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
      sum += item.count
    })
    return sum
  })
  const productNum = computed(() => {
    return tableData.value.length
  })

  return {
    tableData,
    totalPrice,
    sum,
    productNum,
  }
})
