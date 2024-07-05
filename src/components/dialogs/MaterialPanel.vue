<!--
 * new page
 * @author: xzz2021
 * @since: 2024-05-31
 * MaterialPanel.vue
-->
<template>
  <div class="container">
    <el-dialog v-model="dialogVisible" width="920" draggable title="选择材料">
      <el-tabs type="card" class="demo-tabs" style="height: 500px" @tab-click="tabClick" v-model="activeTabName">
        <el-tab-pane size="small" v-for="(item, index) in listType" :key="index" :label="item" :name="item">
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
              <el-image class="imgBox" :src="item.img" fit="cover" />
              <div class="priceBox">￥{{ item.list_price / 1000 }}起</div>
              <div class="nameBox">{{ item.default_code + item.name }}</div>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>

      <div class="sideBox">
        <div class="title">材料优点</div>
        <div class="description">{{ selectedItem.material_advantages }}</div>
        <div class="title">材料缺点</div>
        <div class="description">{{ selectedItem.material_disadvantages }}</div>
        <div class="title">颜色</div>
        <div class="description">{{ selectedItem.color }}</div>
        <div class="title">误差及精度</div>
        <div class="description">{{ selectedItem.error_and_precision }}</div>
        <div class="title">最大成型尺寸</div>
        <div class="description">{{ selectedItem.equipment_size }}</div>
        <!-- <div>材料详情</div> -->
      </div>

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
  material_group_id: "树脂",
  device_id: "联泰-600",
  color: "白色",
  material_advantages: "表面非常细腻, 耐温55℃ ,韧性好",
  material_disadvantages: "材料颜色淡黄",
  error_and_precision: "±200微米或±0.2%",
  material_shrinkage: false,
  fastest_delivery: "24小时",
  equipment_size: "800mm × 800mm × 550mm",
  experts_recommend: "C-UV 9400",
  variants: [
    {
      id: 325,
      name: "[C-UV 9400] 光敏树脂",
      default_code: "C-UV 9400",
      list_price: 500,
      attribute_values: {
        热变形温度: "58 ℃",
        吸水性: "0.26%",
        拉伸模量: "2600MPa",
        拉伸强度: "52.3MPa",
        断裂应变: "11%",
        屈服应变: "3.4%",
        悬臂梁冲击强度: "36KJ/m",
      },
    },
  ],
})
const selectItem = (item, index) => {
  currentIndex.value = index
  selectedItem.value = item
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
  padding: 0 10px;
  flex: 2;
  .title {
    font-weight: bold;
    margin: 5px;
    color: black;
  }
  .description {
    font-size: 11px;
    margin: 5px 5px 18px 5px;
  }
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
  width: 130px;
  // height: 112px;
  margin: 5px;
  // border-radius: 5px;
  // border: 1px solid #15f515;
  border: 1px solid white;

  box-sizing: content-box;
  position: relative;
  .imgBox {
    width: 130px;
    height: 130px;
  }
  .nameBox {
    font-size: 11px;
    margin: 3px 0;
  }
  .priceBox {
    position: absolute;
    bottom: 25px;
    right: 0;
    color: red;
    font-size: 12px;
    background: #d7d7d7;
    width: 70%;
    text-align: center;
  }
}
.itemBoxSelected {
  border: 1px solid #409eff;
  background: #78c0ffad;
  // .priceBox {
  //   bottom: 23px;
  // }
}
// 美化滚动条
:deep(.el-tab-pane) {
  &::-webkit-scrollbar {
    width: 8px;
    height: 10px;
    /**/
  }
  &::-webkit-scrollbar-track {
    background: rgb(239, 239, 239);
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background: #bfbfbf;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #808080;
  }
  &::-webkit-scrollbar-corner {
    background: #179a16;
  }
}
</style>
