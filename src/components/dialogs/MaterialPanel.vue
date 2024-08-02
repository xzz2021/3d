<!--
 * new page
 * @author: xzz2021
 * @since: 2024-05-31
 * MaterialPanel.vue
-->
<template>
  <div class="containerMaterial">
    <!-- <img src="http://xzz2022.top:2222/rural/px.png" alt="" srcset="" style="width: 100px; height: 100px" /> -->
    <el-dialog v-model="dialogVisible" width="700" draggable top="5vh" title="选择材料">
      <el-tabs type="card" class="demo-tabs" @tab-click="tabClick" v-model="activeTabName">
        <el-tab-pane size="small" v-for="(item, index) in listType" :key="index" :label="item" :name="item">
          <template #label>
            <span class="custom-tabs-label">{{ item }}</span>
          </template>
          <template #default>
            <div class="material_container">
              <div class="infoBox">
                <div class="leftSide">
                  <el-image class="imgBox" :src="selectedItem?.imgUrl" fit="cover" crossorigin="anonymous" />
                  <div class="priceBox">￥{{ selectedItem.list_price / 1000 }}起</div>
                  <!-- <div class="nameBox">{{ selectedItem.default_code + selectedItem.name }}</div> -->
                </div>

                <div class="rightSide">
                  <div class="title">材料优点: {{ selectedItem.material_advantages }}</div>
                  <div class="title">材料缺点: {{ selectedItem.material_disadvantages }}</div>
                  <div class="title">颜色: {{ selectedItem.color }}</div>
                  <div class="title">误差及精度: {{ selectedItem.error_and_precision }}</div>
                  <div class="title">单台成型尺寸: {{ selectedItem.equipment_size }}</div>
                  <div class="title">
                    详细参数:
                    <el-link type="danger">PDF报告</el-link>
                  </div>
                </div>
              </div>

              <div class="selectBox">
                <div class="itemBox" v-for="(iten, indey) in list" :key="indey" @click="selectItem(iten, indey)">
                  <el-button :type="currentIndex == indey ? 'primary' : ''" size="small">
                    {{ iten.name + iten.default_code }}
                  </el-button>
                </div>
              </div>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>

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

// import { baseUrl } from "@/utils/env"

const store = useShopStore()
const { tableData } = storeToRefs(store)
const { updatePrice } = store

const props = defineProps({
  materialList: {
    type: Object,
    default: () => [],
  },
})

const selectedItem = ref()
const currentIndex = ref(-1)

const selectItem = (item, index) => {
  currentIndex.value = index
  selectedItem.value = item
}

const confirm = () => {
  dialogVisible.value = false
  selectedItem.value.material_id = selectedItem.value.id
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
const autoSelect = async () => {
  const curItem = tableData.value[curlistIndex.value]?.material
  selectedItem.value = curItem

  console.log("🚀 ~ xzz: autoSelect -> curItem", curItem)
  const tabName = curItem?.categ_material_name || "树脂"
  activeTabName.value = tabName //  主动触发激活选择tab
  await updateList(tabName)
  list.value.every((item, index) => {
    if (item.default_code == curItem?.default_code) {
      currentIndex.value = index
      return false // 提前退出
    }
    return true
  })
}

// tab切换时  触发
const tabClick = (pane, event) => {
  // 切换时 还原所有选择样式
  //  其实最好  是根据 选择信息去还原选中项
  currentIndex.value = -1
  // 通过获取tab页签  渲染相应列表
  updateList(pane.props.name)
}

//  更新 列表 内容
const list = ref([])
const updateList = async (tabName = "树脂") => {
  list.value = props.materialList.filter(item => item.categ_material_name == tabName)
  console.log("🚀 ~ xzz: updateList -> list.value", list.value)
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
.material_container {
  display: flex;
  flex-direction: column;

  .infoBox {
    display: flex;
    // width: 400px;
    border: 1px solid white;
    .leftSide {
      align-items: center;
      width: 130px;
      // height: 112px;
      // flex: 1;
      margin: 5px;
      // border-radius: 5px;
      // border: 1px solid #15f515;

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
        bottom: 4px;
        right: 0;
        color: red;
        font-size: 12px;
        background: #d7d7d7;
        width: 70%;
        text-align: center;
      }
    }
    .rightSide {
      // padding: 0 10px;
      padding: 2px;
      // flex: 2;
      > div {
        margin-bottom: 6px;
      }
      .title {
        // font-weight: bold;
        // margin: 5px;
        color: black;
      }
      .description {
        font-size: 11px;
        // margin: 5px 5px 18px 5px;
      }
    }
  }
  .selectBox {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 80%;
    margin-top: 20px;
    .itemBox {
      margin: 3px;
      > button {
        width: 160px;
      }
    }
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
