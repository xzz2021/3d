<!--
 * new page
 * @author: xzz2021
 * @since: 2024-06-03
 * PantoneList.vue
-->
<template>
  <div class="containerListBox">
    <div class="color_select_box">
      <div style="margin: 0 30px 0 5px">潘通色号:</div>

      <el-select
        v-model="selectValue"
        value-key="pantone"
        filterable
        placeholder="输入需要的潘通色号"
        style="width: 260px"
        no-data-text="正在搜索"
        no-match-text="当前色号不存在"
        @change="selectColor"
        remote
        remote-show-suffix
        :remote-method="remoteMethod"
        :loading="loading"
        loading-text="正在搜索"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
        <el-option v-for="item in options" :key="item.pantone" :label="item.pantone" :value="item" />
      </el-select>
    </div>

    <SelectedPanel colorType="c" :addList="addList.c" @deleteItem="deleteItemC" />
    <ColorList :defaultColor="colorList.pantoneC" @chooseColor="chooseColor" />
    <SelectedPanel colorType="u" :addList="addList.u" @deleteItem="deleteItemU" />
    <ColorList :defaultColor="colorList.pantoneU" @chooseColor="chooseColor" />
  </div>
</template>

<script setup>
import { pantoneColors } from "../../utils/calculateColor"
import { Search } from "@element-plus/icons-vue"
import { useShopStore } from "@/pinia/shopTable.js"
import { useMitt } from "@/hooks/mitt.js"
const { emitEvent } = useMitt()
const props = defineProps({
  colorList: {
    type: Object,
    default: [],
  },
})

const addList = ref({
  c: [],
  u: [],
})

const colorSum = computed(() => {
  return addList.value.c.length + addList.value.u.length
})

const addItem = (type, item) => {
  const isExist = addList.value[type].find(i => i.hex === item.hex)
  if (isExist) return
  addList.value[type].push(item)
}

// 删除已选择的颜色
const deleteItemC = item => {
  addList.value.c = addList.value.c.filter(i => i !== item)
}

const deleteItemU = item => {
  addList.value.u = addList.value.u.filter(i => i !== item)
}


// 更新颜色
const emit = defineEmits(["updateColorBlock"])
const selectValue = ref([])
const selectColor = item => {
  console.log("🚀 ~ selectColor ~ item:", item)
  selectValue.value = item
  // 选择颜色后 触发 列表更新
  // 此处颜色值需要转换
  const [r, g, b] = item.rgb
  emit("updateColorBlock", { rgb: { r, g, b } })
}


const store = useShopStore()
const { tableData } = storeToRefs(store)
//  关闭面板   给颜色赋值  更新  面板勾选状态
const updateDate = (index) => {
  tableData.value[index].paint.colorList = addList.value
  const bool = colorSum.value != 0
  tableData.value[index].paint.status = bool
 //  有喷漆 必有打磨 // 触发事件
 emitEvent("checkGrinding",{ v: bool, index })
 store.updatePrice()
}

//  开启面板 初始化已选择的颜色
const initPanel = index => {
  addList.value = tableData.value[index].paint.colorList
}

const options = ref([])
const loading = ref(false)
// 将remoteMethod改造为支持防抖
let timer = null
const remoteMethod = query => {
  if (query) {
    loading.value = true
    // 做防抖处理
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      loading.value = false
      options.value = pantoneColors.filter(item => {
        return item.pantone.toLowerCase().includes(query.toLowerCase())
      })
    }, 600)
  } else {
    options.value = []
  }
}


//  选择颜色  推送到右侧
const chooseColor = color => {
  if (color.pantone.lastIndexOf("C") == -1) {
    addItem("u", color)
  } else {
    addItem("c", color)
  }
}

defineExpose({
  initPanel,
  updateDate
})
</script>

<style lang="scss" scoped>
.oooo {
  background: #017eff;
  width: 139px;
  height: 33px;
  /* color: #017eff; */
  position: absolute;
  bottom: 66px;
  right: 402px;
  color: white;
  line-height: 33px;
}
.color_select_box {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  // justify-content: space-between;
}
.color_list_box {
  display: flex;
  align-items: center;
  .cBox,
  .uBox {
    text-align: center;
    button {
      width: 138px;
      margin: 5px 0;
    }
  }
  // width: 306px;
  .list_box {
    width: 150px;
    height: 260px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    // border: 1px solid black;
    // margin-top: 10px;
    margin-top: -5px;
    .item_box {
      // color: black;
      cursor: pointer;
      width: 60px;
      height: 40px;
      // line-height: 40px;
      margin: 5px;
      font-size: small;
      border: 1px solid #03a9f3;
      box-sizing: content-box;
      display: flex;
      justify-content: center; /* 水平居中 */
      align-items: center;
    }
  }
}
:deep(.el-select__suffix) {
  display: none;
}
</style>
