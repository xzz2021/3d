<template>
  <div class="container">
    <p>已选择的颜色: {{ colorSum }}</p>
    <div class="list_box">
      <p>亮光:</p>
      <el-scrollbar>
        <div class="containe_box">
          <div v-if="addList.c.length == 0" class="placeholder_container">
            <div class="placeholder_box"></div>
            <div class="placeholder_box"></div>
            <div class="placeholder_box"></div>
            <div class="placeholder_box"></div>
          </div>
          <div v-for="item in addList.c" :key="item">
            <el-tooltip class="box-item" :content="item.pantone" placement="top">
              <div class="item_box" :style="{ 'background-color': item.hex }">
                <div class="close_btn" @click="deleteItem('c', item)">&#10006;</div>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="list_box">
      <p>哑光:</p>
      <el-scrollbar>
        <div class="containe_box">
          <div v-if="addList.u.length == 0" class="placeholder_container">
            <div class="placeholder_box"></div>
            <div class="placeholder_box"></div>
            <div class="placeholder_box"></div>
            <div class="placeholder_box"></div>
          </div>
          <div v-for="item in addList.u" :key="item">
            <el-tooltip class="box-item" :content="item.pantone" placement="top">
              <div class="item_box" :style="{ 'background-color': item.hex }">
                <div class="close_btn" @click="deleteItem('u', item)">&#10006;</div>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="tips_box">
      <p>温馨提示:</p>
      <p>1、常用颜色显示可能含有色差,请以潘通色号为准；</p>
      <p>2、一个模型最多支持喷五种颜色,如需更多颜色请联系在线客服；</p>
      <p>3、喷漆单色交货周期增加4天,第二种颜色起,每多一种颜色,交货周期增加一天。</p>
      <p>4、产品内部默认不喷漆,如有需求,请在喷漆附件中单独标注。</p>
    </div>
    <div style="text-align: end">
      <el-button @click="closePopover" size="small">取消</el-button>
      <el-button type="primary" @click="closePopover" size="small">确定</el-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useShopStore } from "@/pinia/shopTable.js"
// import { useMitt } from "@/hooks/mitt.js"
// const { onEvent, emitEvent } = useMitt()
// onEvent("openModal", modelFileInfo => {
//   loadModel(modelFileInfo)
// })
// console.log("🚀 ~ file: Table.vue:168 ~ baseUrl:", baseUrl)
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useShopStore()
const { tableData } = storeToRefs(store)
const { updatePrice } = useShopStore()
const currentIndex = ref(0)

const colorSum = computed(() => {
  return addList.value.c.length + addList.value.u.length
})
const addList = ref({
  c: [],
  u: [],
})
const addItem = (type, item) => {
  // console.log("🚀 ~ file: AddColor.vue:114 ~ item:", item)
  // console.log("🚀 ~ file: AddColor.vue:76 ~ type:", type)
  const isExist = addList.value[type].find(i => i.hex === item.hex)
  if (isExist) return
  addList.value[type].push(item)
}

const emit = defineEmits(["closeDialog"])

const closePopover = () => {
  console.log("🚀 ~ file: AddColor.vue:98 ~ currentIndex.value:", currentIndex.value)
  tableData.value[currentIndex.value].paint.colorList = addList.value
  const bool = colorSum.value != 0
  tableData.value[currentIndex.value].paint.status = bool
  updatePrice()
  emit("closeDialog")
}

const openPopover = index => {
  currentIndex.value = index
  addList.value = tableData.value[index].paint.colorList
}

// 删除已选择的颜色
const deleteItem = (type, item) => {
  addList.value[type] = addList.value[type].filter(i => i !== item)
}
defineExpose({ addItem, colorSum, openPopover, closePopover })
</script>

<style lang="scss" scoped>
.container {
  width: 250px;
  .list_box {
    // width: 200px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    .containe_box {
      // overflow: auto;
      // width: 200px;
      display: flex;
      .placeholder_container {
        // width: 200px;
        display: flex;
        // justify-content: space-evenly;
        .placeholder_box {
          // width: 30px;
          // height: 30px;
          border: 1px solid #ccc;
          width: 28px;
          height: 28px;
          margin: 10px 5px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          border-radius: 4px;
          // position: relative;
        }
      }
      .item_box {
        cursor: pointer;
        width: 30px;
        height: 30px;
        margin: 10px 5px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        border-radius: 4px;
        position: relative;
        &:hover .close_btn {
          display: block;
          // background-color: rgb(16, 240, 146);
        }
        .text {
        }
        .close_btn {
          display: none;
          // cursor: pointer;
          position: absolute;
          right: 2px;
          top: -1px;
          text-align: center;
          font-size: 8px;
          color: white;
          // background-color: red;
          &:hover {
            // color: red;
          }
        }
      }
    }
  }
  .tips_box {
    font-size: 10px;
  }
}
</style>
