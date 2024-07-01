<!--
 * new page
 * @author: xzz2021
 * @since: 2024-05-31
 * Table.vue
-->
<template>
  <div class="table_container">
    <el-table :data="tableData" height="300" style="width: 100%" stripe border @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column label="文件预览" width="180">
        <template #default="scope">
          <el-image
            style="width: 100px; height: 100px; cursor: pointer"
            :src="scope.row.imageUrl"
            fit="fill"
            @click="openPreview(scope.row.modelFileInfo)"
          >
            <template #error>
              <div class="image-slot">
                <el-icon><icon-picture /></el-icon>
              </div>
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="材料" width="180">
        <template #default="scope">
          <el-button type="primary" @click="openMaterialPanel(scope.$index)">选择材料</el-button>
          <MaterialPanel ref="MaterialPanelRef" :materialList="backendData.materials" />
        </template>
      </el-table-column>
      <el-table-column label="表面处理" min-width="100">
        <template #default="scope">
          <div class="process_box">
            <el-checkbox
              v-model="scope.row.paint.status"
              label="喷漆"
              size="small"
              @change="handleChangePicker($event, scope.$index)"
            >
              喷漆
              <XzzColorPicker ref="colorPickerRef" @changePaint="bool => updatePaint(bool, scope.$index)" />
            </el-checkbox>

            <el-checkbox
              v-model="scope.row.braces.status"
              label="牙套"
              size="small"
              @change="handleChangeBraces($event, scope.$index)"
            >
              牙套
              <BracesPanel ref="bracesPanelRef" :index="scope.$index" @changeBraces="updateBraces" :list="backendData.nuts" />
            </el-checkbox>
            <el-checkbox
              v-model="scope.row.nuts.status"
              label="铜螺母"
              size="small"
              @change="handleChangeNuts($event, scope.$index)"
            >
              铜螺母
              <NutsPanel ref="nutsPanelRef" :index="scope.$index" @changeNuts="updateNuts" :list="backendData.braces" />
            </el-checkbox>
            <el-checkbox v-model="scope.row.grinding.status" size="small" @change="handleChangeGrinding($event)">
              {{ scope.row.grinding.status ? "精打磨 价格: " + scope.row.grinding.price + "元" : "精打磨" }}
            </el-checkbox>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="数量" min-width="105">
        <template #default="scope">
          <el-input-number
            v-model="scope.row.count.val"
            :min="1"
            :max="10"
            @change="handleChange1($event, scope.$index)"
            size="small"
          />
        </template>
      </el-table-column>
      <el-table-column prop="deliveryTime" label="交期" width="120">
        <template #default="scope">
          <div>
            <el-button
              v-for="(item, index) in deliveryTimeArr"
              :key="index"
              @click="handleChange3(scope.$index, index)"
              :type="currentIndex == index ? 'primary' : ''"
              size="small"
            >
              {{ item.val }}
            </el-button>
          </div>

          <!-- <el-select
            v-model="scope.row.deliveryTime"
            placeholder="Select"
            @change="handleChange2($event, scope.$index)"
            style="width: 100px"
            value-key="val"
          >
            <el-option v-for="item in deliveryTimeArr" :key="item.val" :label="item.val" :value="item" />
          </el-select> -->
        </template>
      </el-table-column>
      <el-table-column label="价格">
        <template #default="scope">
          <div style="color: red">{{ scope.row.finalPrice }} 元</div>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作">
        <template #default="scope">
          <div class="operateBox">
            <!-- <el-badge :value="scope.row." class="item">
            </el-badge> -->
            <el-button type="primary" :icon="ShoppingCartFull" circle @click="addToCart(scope.row)"></el-button>
            <el-button type="success" style="margin-left: 0" :icon="CopyDocument" circle @click="copyItem(scope.row)"></el-button>
            <el-button type="danger" style="margin-left: 0" :icon="Delete" circle @click="deleteItem(scope.$index)"></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { Delete, CopyDocument, ShoppingCartFull } from "@element-plus/icons-vue"
import { Picture as IconPicture } from "@element-plus/icons-vue"
// import { ref, watch } from "vue"

import XzzColorPicker from "../components/colorPicker/XzzColorPicker.vue"

import { useMitt } from "../hooks/mitt"
import { useTable } from "../hooks/useTable"
// import BracesPanel from "../components/BracesPanel.vue"
// import PickColors from "vue-pick-colors"
import { useShopStore } from "@/pinia/shopTable.js"
import { baseUrl } from "@/utils/env"

const { backendData } = useTable()

// console.log("🚀 ~ file: Table.vue:168 ~ baseUrl:", baseUrl)
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useShopStore()

const { tableData } = storeToRefs(store)
const { updatePrice } = store
const currentIndex = ref(2)
const { onEvent, emitEvent } = useMitt()

const deliveryTimeArr = ref([
  { name: "交期", key: "deliveryTime", price: 56, val: "加急" },
  { name: "交期", key: "deliveryTime", price: 23, val: "标准" },
  { name: "交期", key: "deliveryTime", price: 0, val: "经济" },
])

const handleChange1 = (count, index) => {
  // tableData.value[index].finalPrice = (tableData.value[index].rawPrice + tableData.value[index].deliveryTime.price) * count
  updatePrice()
}

const handleChangeGrinding = v => {
  const { surfaceArea } = tableData.value[0]
  tableData.value[0].grinding.price = v ? surfaceArea / 100 : 0
  updatePrice()
}
// const handleChange2 = (val, index) => {
//   tableData.value[index].finalPrice = (tableData.value[index].rawPrice + val.price) * tableData.value[index].count.val
// }

const handleChange3 = (index, curIndex) => {
  tableData.value[index].deliveryTime = deliveryTimeArr.value[curIndex]
  currentIndex.value = curIndex
  updatePrice()
}

const handleSelectionChange = val => {
  // console.log("🚀 ~ file: Table.vue:115 ~ val:", val)
  //  此处可以获得真实选择的数据  用于发送给购物车
}

const MaterialPanelRef = ref(null)
const openMaterialPanel = index => {
  MaterialPanelRef.value && MaterialPanelRef.value.handleOpen(index)
}

const copyItem = item => {
  const deepCopy = JSON.parse(JSON.stringify(item))
  tableData.value.push(deepCopy)
}

const colorPickerRef = ref(null)

const handleChangePicker = (bool, index) => {
  // console.log("🚀 ~ file: Table.vue:227 ~ bool:", bool)
  tableData.value[index].paint.status = false
  // 打开面板 进行数据更改
  colorPickerRef.value && colorPickerRef.value.handleOpen(index)
}
const bracesPanelRef = ref(null)
const handleChangeBraces = (bool, index) => {
  // 拦截点击事件  不主动勾选
  tableData.value[index].braces.status = false
  // 打开面板 进行数据更改
  bracesPanelRef.value && bracesPanelRef.value.handleOpen()
}

const nutsPanelRef = ref(null)
const handleChangeNuts = (bool, index) => {
  // 拦截点击事件  不主动勾选
  tableData.value[index].nuts.status = false
  // 打开面板 进行数据更改
  nutsPanelRef.value && nutsPanelRef.value.handleOpen()
}
const deleteItem = index => {
  tableData.value.splice(index, 1)
}

const openPreview = modelFileInfo => {
  emitEvent("openPreview", modelFileInfo)
}

const calculatePrice = total => {
  let price = 0
  if (total.length == 0) return 0
  total.forEach(item => {
    price += item.num * item.list_price
  })
  return price
}
const updateBraces = msg => {
  const { index, total, status } = msg
  tableData.value[index].braces.total = total
  tableData.value[index].braces.price = calculatePrice(total)
  tableData.value[index].braces.status = status
  updatePrice()
}

const updateNuts = msg => {
  const { index, total, status } = msg
  tableData.value[index].nuts.total = total
  tableData.value[index].nuts.price = calculatePrice(total)
  tableData.value[index].nuts.status = status
  updatePrice()
}

const updatePaint = (bool, index) => {
  //切换选中状态
  tableData.value[index].paint.status = bool
}

const addToCart = async item => {
  // console.log("🚀 ~ file: Table.vue:244 ~ addToCart ~ item:", item)
  // return
  const {
    count,
    finalPrice,
    product_tmpl_id,
    product_id,
    file_url,
    volume,
    surfaceArea,
    imageUrl,
    modelFileInfo,
    ...restParams
  } = item
  // const variant_info = [{name: "表面积", val: surfaceArea}, {name: "体积", val: volume}]
  // Object.values(restParams).forEach(value => {
  //   if (value.status != false) {
  //     variant_info.push(value)
  //   }
  // })
  restParams.model3d = { ...restParams.model3d, volume, surfaceArea }

  const params = {
    // product_tmpl_id,
    product_id,
    product_list: [
      {
        product_tmpl_id,
        product_id,
        file_url,
        price: finalPrice,
        add_qty: count.val,
        set_qty: null,
        variant_info: restParams,
      },
    ],
  }
  // console.log("🚀 ~ file: Table.vue:273 ~ addToCart ~ params:", params)
  // return
  const response = await fetch(`${baseUrl}/shop/cart/update_json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      ...params,
    }),
  })
  if (response.ok) {
  }
}
</script>

<style lang="scss" scoped>
/* 隐藏 Radio 的圆点 */
:deep(.el-radio__input .el-radio__inner) {
  display: none;
}
:deep(.el-radio) {
  margin-bottom: 5px;
  margin-right: 0 !important; /* 移除默认 margin-right */
}
:deep(.el-radio-group) {
  display: flex;
  flex-direction: column; /* 使 Radio 垂直排列 */
  align-items: center;
}

:deep(.el-table__header .cell) {
  text-align: center;
}

:deep(.el-table__row .cell) {
  text-align: center;
}

/* 表格内容居中对齐 */
//  {
//   text-align: center;
// }

.process_box {
  display: flex;
  flex-direction: column; /* 使 Radio 垂直排列 */
  justify-content: center; /* 使 Radio 按钮垂直居中 */
  margin-left: 10px;
}
:deep(.el-checkbox) {
  // text-align: left;
  margin-right: 0 !important;
}

:deep(.el-button + .el-button) {
  margin-top: 3px;
  margin-left: 0 !important;
}
.operateBox {
  display: flex;
  flex-direction: column; /* 使 Radio 垂直排列 */
  align-items: center; /* 使 Radio 按钮垂直居中 */
  // :deep(.el-button) {
  //   margin-bottom: 2px;
  // }
}
:deep(.operateBox .el-icon) {
  font-size: 18px;
}
:deep(.el-input-number--small) {
  width: 79px;
}
.color_picker_box {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
  .image-slot .el-icon {
    font-size: 30px;
  }
}
</style>
