<!--
 * new page
 * @author: xzz2021
 * @since: 2024-05-31
 * Table.vue
-->
<template>
  <div class="table_container">
    <el-table :data="tableData" height="300" style="width: 100%" border>
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
          <div>{{ scope.row.material.name + scope.row.material.default_code }}</div>
          <el-button type="primary" @click="openMaterialPanel(scope.$index)" size="small">选择材料</el-button>
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
              <span>喷漆</span>

              <el-tooltip content="喷漆工艺必须进行精打磨" placement="top">
                <el-icon class="iconBox"><MagicStick /></el-icon>
              </el-tooltip>
            </el-checkbox>

            <el-checkbox
              v-model="scope.row.braces.status"
              label="牙套"
              size="small"
              @change="handleChangeBraces($event, scope.$index)"
            >
              牙套
            </el-checkbox>
            <el-checkbox
              v-model="scope.row.nuts.status"
              label="铜螺母"
              size="small"
              @change="handleChangeNuts($event, scope.$index)"
            >
              铜螺母
            </el-checkbox>
            <el-checkbox
              v-model="scope.row.grinding.status"
              size="small"
              :disabled="scope.row.grinding.checkDisabled"
              @change="handleChangeGrinding($event, scope.$index)"
            >
              <span>精打磨</span>
              <!-- html换行字符 
              -->
              <el-tooltip
                :content="`所有商品都会免费赠送普通打磨, 当前商品精打磨价格: ${scope.row.grinding.rawPrice}元`"
                placement="top"
              >
                <el-icon class="iconBox"><MagicStick /></el-icon>
              </el-tooltip>
              <!-- <span>{{ scope.row.grinding.status ? " 价格: " + scope.row.grinding.price + "元" : "" }}</span> -->
            </el-checkbox>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="数量" min-width="105">
        <template #default="scope">
          <el-input-number v-model="scope.row.count.val" :min="1" :max="10" @change="updatePrice" size="small" />
        </template>
      </el-table-column>
      <el-table-column prop="deliveryTime" label="交期" width="120">
        <template #default="scope">
          <div class="delivery_box">
            <el-button
              v-for="(item, index) in deliveryTimeArr"
              :key="index"
              @click="handleDelivery(scope.$index, index)"
              :type="scope.row.deliveryTime.currentIndex == index ? 'primary' : ''"
              size="small"
            >
              {{ item.val }}
            </el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="价格">
        <template #default="scope">
          <div style="color: red">{{ scope.row.finalPrice }} 元</div>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="150">
        <template #default="scope">
          <div class="operateBox">
            <!-- <el-badge :value="scope.row." class="item">
             <el-button type="primary" :icon="ShoppingCartFull" circle @click="addToCart(scope.row)"></el-button> -->
            <div class="btnBox">
              <el-text class="mx-1" type="primary">加购物车</el-text>
              <!-- <span>加入购物车</span> -->
              <el-button type="primary" :icon="Plus" circle @click="addToCart(scope.row)"></el-button>
            </div>
            <div class="btnBox">
              <el-text class="mx-1" type="success">复制产品</el-text>
              <el-button
                type="success"
                style="margin-left: 0"
                :icon="CopyDocument"
                circle
                @click="copyItem(scope.row)"
              ></el-button>
            </div>
            <div class="btnBox">
              <el-text class="mx-1" type="danger">删除产品</el-text>
              <el-button type="danger" style="margin-left: 0" :icon="Delete" circle @click="deleteItem(scope.$index)"></el-button>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <XzzColorPicker ref="colorPickerRef" />
    <BracesPanel ref="bracesPanelRef" @changeBraces="updateBraces" :list="backendData.braces" />
    <NutsPanel ref="nutsPanelRef" @changeNuts="updateNuts" :list="backendData.nuts" />
    <MaterialPanel ref="MaterialPanelRef" :materialList="backendData.materials" />
  </div>
</template>

<script setup>
import { Delete, CopyDocument, Picture as IconPicture, MagicStick, Plus } from "@element-plus/icons-vue"
import XzzColorPicker from "../components/colorPicker/XzzColorPicker.vue"
import { useMitt } from "../hooks/mitt"
import { useMitt2 } from "../hooks/mitt2"
import { useTable } from "../hooks/useTable"
import { useShopStore } from "@/pinia/shopTable.js"
import { baseUrl } from "@/utils/env"
import { onMounted } from "vue"

const { backendData } = useTable()

const store = useShopStore()

const { tableData, totalPrice } = storeToRefs(store)

const { updatePrice } = store
const { emitEvent } = useMitt()
const { onEvent } = useMitt2("checkColor")

const deliveryTimeArr = ref([
  { name: "交期", key: "deliveryTime", price: 56, val: "加急" },
  { name: "交期", key: "deliveryTime", price: 23, val: "标准" },
  { name: "交期", key: "deliveryTime", price: 0, val: "经济" },
])

const handleChangeGrinding = (v, index) => {
  const { grinding } = tableData.value[index]
  grinding.price = v ? grinding.rawPrice : 0
  updatePrice()
}

const handleDelivery = (index, curIndex) => {
  tableData.value[index].deliveryTime = deliveryTimeArr.value[curIndex]
  tableData.value[index].deliveryTime.currentIndex = curIndex
  updatePrice()
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
  tableData.value[index].paint.status = false
  // 打开面板 进行数据更改
  colorPickerRef.value && colorPickerRef.value.handleOpen(index)
}
const bracesPanelRef = ref(null)
const handleChangeBraces = (bool, index) => {
  // 拦截点击事件  不主动勾选
  tableData.value[index].braces.status = false
  // 打开面板 进行数据更改
  bracesPanelRef.value && bracesPanelRef.value.handleOpen(index)
}

const nutsPanelRef = ref(null)
const handleChangeNuts = (bool, index) => {
  // 拦截点击事件  不主动勾选
  tableData.value[index].nuts.status = false
  // 打开面板 进行数据更改
  nutsPanelRef.value && nutsPanelRef.value.handleOpen(index)
}
const deleteItem = index => {
  tableData.value.length > 1 && tableData.value.splice(index, 1)
}

const openPreview = modelFileInfo => {
  emitEvent("openLoading")

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

//  更新牙套 数据
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

// 检查是否选择颜色
const checkColor = msg => {
  const { index, v } = msg
  //  有选择  计算打磨价格  勾选打磨  且禁用按钮
  const { surfaceArea } = tableData.value[index].model3d
  tableData.value[index].grinding.price = v ? Number((Number(surfaceArea) / 100).toFixed(2)) : 0
  tableData.value[index].grinding.status = v
  tableData.value[index].grinding.checkDisabled = v
}

onMounted(() => {
  onEvent(checkColor)
})

const addToCart = async item => {
  if (totalPrice.value == 0) {
    return ElMessage.error("请选择材料后再添加购物车!")
  }
  const { count, finalPrice, imageUrl, modelFileInfo, ...restParams } = item
  const { product_tmpl_id, product_id, file_url } = modelFileInfo.resData

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
  const response = await fetch(`${baseUrl}/shop/cart/add_cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      params,
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

.iconBox {
  cursor: zoom-in;
  margin: 0 3px;
}
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

:deep(.delivery_box .el-button + .el-button) {
  margin-top: 3px;
  margin-left: 0 !important;
}
:deep(.operateBox .el-button + .el-button) {
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
  .btnBox {
    display: flex;
    align-items: center;
    width: 110px;
    justify-content: space-between;
    margin-bottom: 2px;
  }
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
