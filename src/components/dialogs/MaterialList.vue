<!--
 * new page
 * @author: xzz2021
 * @since: 2024-05-31
 * MaterialPanel.vue
-->
<template>
  <div class="container">
    <el-button
      v-for="(item, index) in props.list"
      :key="item.name"
      :type="index == currentIndex ? 'primary' : ''"
      @click="selectItem(item, index)"
    >
      {{ item.name }}
    </el-button>
  </div>
</template>

<script setup>
// import { onMounted, ref } from "vue"
import { useShopStore } from "@/pinia/shopTable.js"
import { storeToRefs } from "pinia"
const store = useShopStore()

const { tableData } = storeToRefs(store)
const { updatePrice } = store

const props = defineProps({
  list: {
    type: Array,
    default: [
      { name: "树脂1", price: 1 },
      { name: "树脂2", price: 2 },
      { name: "树脂3", price: 3 },
    ],
  },
  curlistIndex: {
    type: Number,
    default: 0,
  },
})

const currentIndex = ref(5)

const selectItem = (item, index) => {
  item.price = item.list_price / 1000
  currentIndex.value = index
  tableData.value[props.curlistIndex].material = item
  updatePrice()
}

// onMounted(() => {
//   tableData.value[props.curlistIndex].material =  props.list[0]
//   updatePrice()
// })
</script>

<style lang="scss" scoped></style>
