<!--
 * new page
 * @author: xzz2021
 * @since: 2024-05-31
 * Table.vue
-->
<template>
  <div class="table_container">
    <el-table :data="tableData" height="300" style="width: 100%" stripe border>
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
              喷漆
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
              精打磨
              <span>{{ scope.row.grinding.status ? " 价格: " + scope.row.grinding.price + "元" : "" }}</span>
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
    <XzzColorPicker ref="colorPickerRef" />
    <BracesPanel ref="bracesPanelRef" @changeBraces="updateBraces" :list="backendData.braces" />
    <NutsPanel ref="nutsPanelRef" @changeNuts="updateNuts" :list="backendData.nuts" />
    <MaterialPanel ref="MaterialPanelRef" :materialList="backendData.materials" />
  </div>
</template>

<script setup>
import { Delete, CopyDocument, ShoppingCartFull, Picture as IconPicture } from "@element-plus/icons-vue"
// import { Picture as IconPicture } from "@element-plus/icons-vue"
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
// const { totalPrice } = storeToRefs(store)
// const tableData = ref([
//   {
//     imageUrl:
//       "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAKUApQDASIAAhEBAxEB/8QAHQABAAIDAQEBAQAAAAAAAAAAAAYHBAUIAwkCAf/EAE4QAAIBAwMCAwQGBgYHBgUFAAABAgMEEQUGIRIxB0FREyJhcQgUMoGRoRU2QnSxwSMzUmKz0RYXJCVy4fBDU2OCorI0c5LC4jVEV5OU/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APpgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADUa1r8NLuKFlClOVWunNz6Oq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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/9k=",
//     volume: 26960.83,
//     material: {
//       name: "8200树脂",
//       key: "material",
//       price: 0,
//     },
//     grinding: {
//       name: "精磨",
//       key: "grinding",
//       val: "",
//       status: false,
//       price: 0,
//     },
//     braces: {
//       name: "牙套",
//       key: "grinding",
//       status: false,
//       total: [],
//       price: 0,
//     },
//     nuts: {
//       name: "铜螺母",
//       key: "nuts",
//       status: false,
//       price: 0,
//       total: [],
//     },
//     paint: {
//       name: "喷漆",
//       key: "paint",
//       colorList: {
//         c: [],
//         u: [],
//       },
//       status: false,
//       price: 0,
//     },
//     count: {
//       name: "数量",
//       key: "count",
//       val: 1,
//     },
//     deliveryTime: {
//       name: "交期",
//       key: "deliveryTime",
//       price: 0,
//       val: "24小时",
//       currentIndex: 2,
//     },
//     finalPrice: 0,
//     model3d: {
//       width: 31.4,
//       height: 43.94,
//       depth: 50,
//     },
//     surfaceArea: 7230.4,
//     modelFileInfo: {
//       filePath: "blob:http://localhost:5173/3b59e977-bfcc-40be-8190-f064cb6fcbc2",
//       fileType: "stl",
//       resData: {
//         product_tmpl_id: 307,
//         product_id: 317,
//         file_url: "https://yun3d.com/filestore/odoo/cust_attachment/2024/07/02/招财猫 5_1_20240702023823834.stl",
//       },
//     },
//     product_tmpl_id: 307,
//     product_id: 317,
//     file_url: "https://yun3d.com/filestore/odoo/cust_attachment/2024/07/02/招财猫 5_1_20240702023823834.stl",
//   },
// ])

const { updatePrice } = store
const { emitEvent } = useMitt()
const { onEvent } = useMitt2("checkColor")

const deliveryTimeArr = ref([
  { name: "交期", key: "deliveryTime", price: 56, val: "加急" },
  { name: "交期", key: "deliveryTime", price: 23, val: "标准" },
  { name: "交期", key: "deliveryTime", price: 0, val: "经济" },
])

const handleChangeGrinding = (v, index) => {
  const { surfaceArea } = tableData.value[index]
  tableData.value[index].grinding.price = v ? Number((surfaceArea / 100).toFixed(2)) : 0
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
  const { surfaceArea } = tableData.value[index]
  tableData.value[index].grinding.price = v ? Number((surfaceArea / 100).toFixed(2)) : 0
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
