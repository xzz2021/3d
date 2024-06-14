import { RAWDATA } from "./constant"
import { useShopStore } from "@/pinia/shopTable"
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useShopStore()
const { addItem } = store

export const addNewItem = allInfo => {
  const newItem = { ...RAWDATA, ...allInfo }
  addItem(newItem)
}
