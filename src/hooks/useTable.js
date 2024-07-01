import { onMounted, ref } from "vue"
import { baseUrl } from "@/utils/env"

export const useTable = () => {
    const backendData = ref({})
    const fetchData = async () => {
        const response = await fetch(`${baseUrl}/shop/cart/get_material`, {
            method: "GET",
            headers: { "Content-Type": "application/json",
            }
        })
        if (response.ok) {
            const data = await response.json()
            console.log("🚀 ~ file: useTable.js:14 ~ fetchData ~ data:", data)
            const nuts = []
            const braces = []
            const materials = {
                tree:[],
                metal: []
            }
            data.map(item => {
                if(item.categ_material_name === "铜螺母"){
                    item.num = 0
                    nuts.push(item)
                }else if(item.categ_material_name === "牙套" ){
                    item.num = 0
                    braces.push(item)
                }else if(item.categ_big_name === "原材料"){
                    if(item.categ_material_name === "金属"){
                        materials.metal.push(item)
                    }else if(item.categ_material_name === "树脂"){
                        materials.tree.push(item)
                    }
                }
            })
            backendData.value = { nuts, braces, materials }
        }else{
            console.error(response)
        }
    }
    onMounted(() => {
        fetchData()
    })

  return {
    backendData
  }
}
