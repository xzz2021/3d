import { defineStore } from "pinia"
// import { aa } from "./default"
import { baseUrl } from "@/utils/env"

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useShopStore = defineStore("shopStore", () => {
  // 其他配置...

  const tableData = ref([])
  // const backendData = ref({})
  const modelFileInfo = ref({})

  const totalPrice00 = computed(() => {
    let price = 0
    tableData.value.forEach(item => {
      price += item.finalPrice
    })
    return roundUp(price, 2)
  })

  const totalPrice = computed(() => {
    const init = 0
    const totalPriceSum = tableData.value.reduce((preSum, curItem) => preSum + curItem.finalPrice, init)
    return roundUp(totalPriceSum, 2)
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
    if (!rawData.deliveryTime) {
      //  初始化赋值 交期数据
      // const deliveryTime = backendData.value.deliveryTime
      // rawData.deliveryTime = JSON.parse(JSON.stringify(backendData.value.deliveryTime))
      rawData.deliveryTime.currentIndex = 2
    }
    tableData.value.push(JSON.parse(JSON.stringify(rawData)))
  }

  const IsExist = () => {
    // modelFileInfo.filePath
    return tableData.value.some(item => item.modelFileInfo.filePath === modelFileInfo.value.filePath)
  }

  const roundUp = (num, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces)
    return Math.ceil(num * factor) / factor
  }

  const updatePrice000 = () => {
    const colorList = tableData.value[0].paint.colorList
    const { grinding, material, deliveryTime, count, surfaceArea, volume, nuts, braces } = tableData.value[0]
    const col = colorList.c.length + colorList.u.length
    const final =
      ((volume * material.price * (material.material_density || 1.4)) / 1000 +
        (surfaceArea * col) / 100 +
        braces.price +
        nuts.price +
        volume * deliveryTime.list_price +
        grinding.price) *
      count.val
    tableData.value[0].finalPrice = final == 0 ? 0 : roundUp(final, 2)
  }

  const getGrindingPrice = (v, curIndex) => {
    const { surfaceArea } = tableData.value[curIndex]
    tableData.value[curIndex].grinding.price = v ? surfaceArea / 100 : 0
  }

  const updatePrice = () => {
    tableData.value.map(item => {
      const { c, u } = item.paint.colorList
      const colorLength = c.length + u.length
      const { grinding, material, deliveryTime, quantity, model3d, nuts, braces } = item
      const { surfaceArea, volume } = model3d
      const rawPrice = Number((surfaceArea / 100).toFixed(2))
      grinding.rawPrice = rawPrice
      const deliveryTimePrice = deliveryTime?.list_price ? (volume / 1000) * (deliveryTime?.list_price - 1) : 0
      const final =
        ((((volume * material.list_price) / 1000) * (material.material_density || 1.4)) / 1000 +
          (Number(surfaceArea) * Number(colorLength)) / 100 +
          braces.price +
          nuts.price +
          deliveryTimePrice +
          grinding.price) *
        quantity
      item.finalPrice = final == 0 ? 0 : roundUp(final, 2)
    })
  }

  const orderInfo = ref(null)
  const addToCart = async item => {
    const params = {
      ...orderInfo.value,
      current_order_lines: {
        line_id,
        product_id,
        file_url,
        price: finalPrice,
        add_qty: count.val,
        set_qty: null,
        variant_info: restParams,
      },
    }
    const response = await fetch(`/api/shop/cart/add_cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        params,
      }),
    })
    if (response.ok) {
    }
  }

  const lastTableData = ref("")
  const autoUpdateCart = async () => {
    if (JSON.stringify(tableData.value) === lastTableData.value) return
    const response = await fetch(`/api/shop/cart/add_cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        params: {
          ...orderInfo.value,
          order_lines: [tableData.value],
        },
      }),
    })
    if (response.ok) {
      lastTableData.value = JSON.stringify(tableData.value)
    }
  }

  const initialCart = async (rawData = null) => {
    if (rawData) {
      //  获取初始化购物车的数据
      const { order_id, order_name, order_state, order_lines } = rawData
      tableData.value.length == 0 && (orderInfo.value = { order_id, order_name, order_state })
      tableData.value.push(order_lines)
    } else {
      const response = await fetch(`/api/shop/cart/get_initinfo`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      try {
        if (response.ok) {
          const res = await response.json()
          console.log("🚀 ~ xzz: initialCart -> res", res)
          const { order_id, order_name, order_state, order_lines } = res
          orderInfo.value = { order_id, order_name, order_state }
          order_lines.map(item => {
            // const curIndex = backendData.value.deliveryTimeArr.findIndex(v => v.name === item?.deliveryTime?.name)
            // item?.deliveryTime["currentIndex"] = curIndex || 2
            item.deliveryTime = { currentIndex: 2 }
            // item.modelFileInfo.filePath = item.drawing_filepath
          })
          tableData.value = JSON.parse(JSON.stringify(order_lines))
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const backendData = ref({}) //  获取初始化各项属性的数据
  const fetchData = async () => {
    const response = await fetch(`/api/shop/cart/get_material`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    if (response.ok) {
      const data = await response.json()
      console.log("🚀 ~ xzz: fetchData -> data", data)
      const { deliveryTime, grinding, paint } = data
      const materials = data.material
      const nutsAndBraces = data.nuts
      const nuts = []
      // const braces = []
      nutsAndBraces.map(item => {
        if (item.categ_material_name === "螺母") {
          item.num = 0
          nuts.push(item)
        }
        // else if (item.categ_material_name === "牙套") {
        //   item.num = 0
        //   braces.push(item)
        // }
      })
      // braces 牙套 M8(1D-3D)  M2.5(1D-3D)
      //  M2.5(1D-3D) 使用正则匹配出 2.5

      // const sortedData = braces.sort((a, b) => {
      //   const numA = parseFloat(a.default_code.match(/M(\d+(\.\d+)?)/)[1])
      //   const numB = parseFloat(b.default_code.match(/M(\d+(\.\d+)?)/)[1])
      //   return numA - numB
      // })
      //  螺母 M1.6*3
      const sortData2 = nuts.sort((a, b) => {
        const extractNumbers = str => {
          const match = str.match(/M(\d+(\.\d+)?)\*(\d+)/)
          return match ? [parseFloat(match[1]), parseFloat(match[3])] : [0, 0]
        }
        const [numA1, numA2] = extractNumbers(a.default_code)
        const [numB1, numB2] = extractNumbers(b.default_code)
        return numA1 - numB1 || numA2 - numB2
      })
      backendData.value = { nuts: sortData2, materials, deliveryTimeArr: deliveryTime, grinding, paint } // braces: sortedData,
    } else {
      console.error(response)
    }
  }

  const initialData = async () => {
    await fetchData()
    await initialCart()
  }

  return {
    tableData,
    totalPrice,
    sum,
    productNum,
    updateImgUrl,
    addItem,
    IsExist,
    updatePrice,
    getGrindingPrice,
    backendData,
    modelFileInfo,
    orderInfo,
    initialData,
    initialCart,
  }
})
