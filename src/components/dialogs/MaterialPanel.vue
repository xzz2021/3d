<!--
 * new page
 * @author: xzz2021
 * @since: 2024-05-31
 * MaterialPanel.vue
-->
<template>
  <div class="container">
    <el-dialog v-model="dialogVisible" width="780" draggable>
      <el-tabs type="border-card" class="demo-tabs" style="height: 500px" @tab-click="tabClick" v-model="activeTabName">
        <el-tab-pane v-for="(item, index) in listType" :key="index" :label="item" :name="item">
          <template #label>
            <span class="custom-tabs-label">{{ item }}</span>
          </template>
          <template #default>
            <div
              v-for="(item, index) in list"
              :key="item.name + index"
              :class="index == currentIndex ? 'itemBoxSelected' : ''"
              @click="selectItem(item, index)"
              class="itemBox"
            >
              <p>名称: {{ item.name }}</p>
              <p>型号: {{ item.default_code }}</p>
              <p>价格: {{ item.list_price / 1000 }}</p>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>

      <div class="sideBox">444</div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取消</el-button>
          <el-button type="primary" @click="confirm" size="small">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useShopStore } from "@/pinia/shopTable.js"
import { storeToRefs } from "pinia"
const store = useShopStore()
const { tableData } = storeToRefs(store)
const { updatePrice } = store

const props = defineProps({
  materialList: {
    type: Object,
    default: () => [],
  },
})

const currentIndex = ref(0)

const selectedItem = ref({
  id: 315,
  name: "光敏树脂",
  default_code: "C-UV 9400",
  list_price: 500,
  categ_big_name: "原材料",
  categ_material_name: "树脂",
  starting_price: 0,
  material_density: 1.4,
  material_density_uom: "cm²",
  price: 0,
})
const selectItem = (item, index) => {
  // item.price = item.list_price / 1000
  currentIndex.value = index
  selectedItem.value = item
  // tableData.value[curlistIndex.value].material = item
  // updatePrice()
}

const confirm = () => {
  dialogVisible.value = false
  tableData.value[curlistIndex.value].material = selectedItem.value
  updatePrice()
}

const listType = ["树脂", "尼龙", "金属", "自定义"]
const curlistIndex = ref(0)

const dialogVisible = ref(false)
const handleOpen = curIndex => {
  curlistIndex.value = curIndex
  // 打开面板时  根据已有的值 主动触发tab切换 高亮选中值
  autoSelect()
  dialogVisible.value = true
}

const activeTabName = ref("树脂")
const autoSelect = () => {
  const material = tableData.value[curlistIndex.value].material
  const tabName = material.categ_material_name
  activeTabName.value = tabName //  主动触发激活选择tab
  list.value = props.materialList.filter(item2 => item2.categ_material_name == tabName)
  list.value.map((item, index) => {
    if (item.default_code == material.default_code) {
      currentIndex.value = index
    }
  })
}

const list = ref([])

// tab切换时  触发
const tabClick = (pane, event) => {
  // 切换时 还原所有选择样式
  //  其实最好  是根据 选择信息去还原选中项
  currentIndex.value = -1

  // 通过获取tab页签  渲染相应列表
  const { index } = pane
  updateList(index)
}

//  更新 列表 内容
const updateList = i => {
  const curTab = listType[i]
  list.value = props.materialList.filter(item => item.categ_material_name == curTab)
}

defineExpose({
  handleOpen,
})
</script>

<style lang="scss" scoped>
:deep(.el-dialog__body) {
  display: flex;
}
:deep(.el-tabs) {
  flex: 4;
}
.sideBox {
  flex: 2;
}
:deep(.el-tab-pane) {
  display: flex;
  // justify-content: space-between;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow: auto;
  height: 426px;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
.itemBox {
  cursor: pointer;
  align-items: center;
  width: 116px;
  height: 116px;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #15f515;
  &:hover {
  }
}
.itemBoxSelected {
  border: 1px solid #f53715;
}
</style>
