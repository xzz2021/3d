import { onMounted, ref } from "vue"
import { baseUrl } from "@/utils/env"

export const useTable = () => {
  const backendData = ref({})
  const fetchData = async () => {
    const response = await fetch(`${baseUrl}/shop/cart/get_material`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    if (response.ok) {
      const data = await response.json()
      console.log("🚀 ~ file: useTable.js:13 ~ data:", data)
      const nuts = []
      const braces = []
      const materials = []
      data.map(item => {
        if (item.categ_material_name === "铜螺母") {
          item.num = 0
          nuts.push(item)
        } else if (item.categ_material_name === "牙套") {
          item.num = 0
          braces.push(item)
        } else if (item.categ_big_name === "原材料") {
          materials.push(item)
        }
      })
      // braces
      const sortedData = braces.sort((a, b) => {
        if (a.default_code === "M10(1D-3D)") return 1
        if (b.default_code === "M10(1D-3D)") return -1
        return 0
      })
      const sortData2 = nuts.sort((a, b) => {
        const extractNumbers = str => {
          const match = str.match(/M(\d+(\.\d+)?)\*(\d+)/)
          return match ? [parseFloat(match[1]), parseFloat(match[3])] : [0, 0]
        }

        const [numA1, numA2] = extractNumbers(a.default_code)
        const [numB1, numB2] = extractNumbers(b.default_code)

        return numA1 - numB1 || numA2 - numB2
      })
      backendData.value = { nuts: sortData2, braces: sortedData, materials }
    } else {
      console.error(response)
    }
  }
  onMounted(() => {
    fetchData()
  })

  return {
    backendData,
  }
}
