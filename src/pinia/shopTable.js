import { defineStore } from "pinia"
import { baseUrl } from "@/utils/env"

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useShopStore = defineStore("shopStore", () => {
  const tableData = ref([])
  // const backendData = ref({})
  // const modelFileInfo = ref({})

  const totalPrice = computed(() => {
    const init = 0
    const totalPriceSum = tableData.value.reduce((preSum, curItem) => preSum + (curItem?.finalPrice || 0), init)
    return totalPriceSum.toFixed(2)
  })

  const sum = computed(() => {
    let sum = 0
    tableData.value.forEach(item => {
      sum += item?.qty || 0
    })
    return sum
  })

  const productNum = computed(() => {
    return tableData.value.length
  })

  // const updateImgUrl = (index, url) => {
  //   tableData.value[index].imageUrl = url
  // }

  const addItem = rawData => {
    // rawData.paint = { colorList: { c: [], u: [] } }
    // rawData.deliveryTime.currentIndex = 2
    tableData.value.push(JSON.parse(JSON.stringify(rawData)))
  }

  const newItem = ref(null)
  const IsExist = () => {
    return tableData.value.some(item => item?.drawing_filepath === newItem.value.drawing_filepath)
  }

  const roundUp = (num, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces)
    return Math.ceil(num * factor) / factor
  }

  const updatePrice = () => {
    tableData.value.map(item => {
      const { c, u } = item.paint.colorList
      const colorLength = c.length + u.length
      const { grinding, material, deliveryTime, qty, nuts, modelFileInfo } = item
      console.log("🚀 ~ xzz: updatePrice -> material", material)
      const materialPrice = material?.list_price || 0.5
      console.log("🚀 ~ xzz: updatePrice -> modelFileInfo", modelFileInfo)
      const { part_surface_area, part_volume } = modelFileInfo
      const rawPrice = Number((part_surface_area / 100).toFixed(2))
      grinding.rawPrice = rawPrice
      const deliveryTimePrice = deliveryTime?.list_price ? (part_volume / 1000) * (deliveryTime?.list_price - 1) : 0
      const final =
        ((part_volume / 1000) * materialPrice) / 1000 +
        (Number(part_surface_area) * Number(colorLength)) / 100 +
        (nuts?.price || 0) +
        (deliveryTimePrice + grinding?.list_price * (part_volume / 1000))
      console.log("🚀 ~ xzz: updatePrice -> final", final)
      // item.unit_price = final == 0 ? 0 : roundUp(final, 2)
      item.unit_price = roundUp(final, 2)
      console.log("🚀 ~ xzz: updatePrice -> item.unit_price", item.unit_price)
      const finalPrice = final * item.qty
      item.finalPrice = finalPrice == 0 ? 0 : roundUp(finalPrice, 2)
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
    console.log("🚀 ~ xzz: autoUpdateCart 触发更新提交-> autoUpdateCart")
    if (JSON.stringify(tableData.value) === lastTableData.value) return

    const params = {
      ...orderInfo.value,
      product_list: tableData.value,
    }
    const response = await fetch(`/api/shop/cart/update_cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ params }),
    })
    if (response.ok) {
      const res = await response.json()
      console.log("🚀 ~ xzz: autoUpdateCart -> res", res)
      if (res?.error?.data?.debug) alert("错误信息:   " + res?.error?.data?.debug)
      // lastTableData.value = JSON.stringify(tableData.value)
    }
  }

  const initialCart = async (rawData = null) => {
    const response = await fetch(`/api/shop/cart/get_initinfo`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    try {
      if (response.ok) {
        const res = await response.json()
        console.log("🚀 ~ xzz: get_initinfo -> res", res)
        const { order_id, order_name, order_state, order_lines } = res
        orderInfo.value = { order_id, order_name, order_state }
        // order_lines.map(item => {
        //   // const curIndex = backendData.value.deliveryTimeArr.findIndex(v => v.name === item?.deliveryTime?.name)
        //   // item?.deliveryTime["currentIndex"] = curIndex || 2
        //   item.deliveryTime = { currentIndex: 2, ...item.deliveryTime }
        //   // item.modelFileInfo.filePath = item.drawing_filepath
        //   item.nuts = item?.nuts || { total: [] }
        //   item.paint = { colorList: { c: [], u: [] } }
        //   item.grinding = item?.grinding?.name || backendData.value.grinding[0]
        //   // item.grinding.checkDisabled = item.grinding
        //   item.material = item?.material || {
        //     id: 315,
        //     name: "光敏树脂",
        //     default_code: "C-UV 9400",
        //     list_price: 500,
        //     categ_big_name: "原材料",
        //     categ_material_name: "树脂",
        //     starting_price: 0,
        //     material_density: 1.4,
        //     material_density_uom: "cm²",
        //     price: 0,
        //   }
        // })
        tableData.value = JSON.parse(JSON.stringify(order_lines))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const orderInfo2 = ref(null)

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
      // console.log("🚀 ~ xzz: fetchData -> materials", materials)
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

  const deleteItem = async index => {
    console.log("🚀 ~ xzz: useShopStore -> index", index)
    console.log("🚀 ~ xzz: useShopStore -> tableData.value[index]", tableData.value[index])
    const response = await fetch("/api/shop/cart/remove_cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        params: { product_id: tableData.value[index].product_id, line_id: tableData.value[index].line_id },
      }),
    })
    const res = await response.json()
    await initialCart()
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
    addItem,
    IsExist,
    updatePrice,
    backendData,
    orderInfo,
    initialData,
    initialCart,
    autoUpdateCart,
    deleteItem,
    newItem,
  }
})
