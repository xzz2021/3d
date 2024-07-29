<template>
  <div class="newTable_box">
    <div class="header_box">
      <div class="fileInfo">文件信息</div>
      <div class="printInfo">打印信息</div>
      <div class="selectInfo">操作</div>
      <div class="countInfo">数量</div>
      <div class="priceInfo">价格</div>
    </div>
    <div class="item_box" v-for="(item, index) in tableData" :key="index">
      <div class="fileInfo">
        <el-image
          style="width: 130px; height: 130px; cursor: pointer"
          :src="item.imageUrl"
          fit="fill"
          @click="openPreview(item.modelFileInfo)"
        >
          <template #error>
            <div class="image-slot">
              <el-icon><icon-picture /></el-icon>
            </div>
          </template>
        </el-image>
        <div class="mathBox">
          <div class="filename">{{ item.modelFileInfo.fileName }}</div>
          <div class="size">{{ item.modelFileInfo.size }} mm</div>
          <!-- <div class="volume">体积: {{ item.modelFileInfo.volume }} mm³</div> -->
        </div>
      </div>
      <div class="printInfo">
        <div class="material">{{ item.material.name + item.material.default_code }}</div>
        <div class="paint">颜色: {{ displayPantone(item.paint) }}</div>
        <div class="paint" v-if="item.braces.total.length > 0">牙套: {{ displayBracesOrNuts(item.braces.total) }}</div>
        <div class="paint" v-if="item.nuts.total.length > 0">螺母: {{ displayBracesOrNuts(item.nuts.total) }}</div>
        <div class="grinding">{{ item.grinding.checkDisabled ? "精磨" : "" }}</div>
      </div>
      <div class="selectInfo">
        <el-button @click="openMaterialPanel(index)" type="danger" link>选择材料</el-button>
        <el-button @click="handleChangePicker(index)" type="primary" link>上色</el-button>
        <el-button @click="handleChangeBraces(index)" type="success" link>选择牙套</el-button>
        <el-button @click="handleChangeNuts(index)" type="warning" link>选择螺母</el-button>
        <el-switch
          v-model="item.grinding.checkDisabled"
          size="small"
          inline-prompt
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #898888"
          active-text="精打磨"
          inactive-text="普通打磨"
        />
        <div class="delivery_box">
          <el-button
            v-for="(iten, indey) in deliveryTimeArr"
            :key="indey"
            @click="handleDelivery(index, indey)"
            :type="item.deliveryTime.currentIndex == indey ? 'primary' : ''"
            size="small"
          >
            {{ iten.val }}
          </el-button>
        </div>
      </div>
      <div class="countInfo">
        <div v-if="showCount" class="count" @click="showCount = false">x {{ item.count.val }}</div>
        <el-input-number
          v-else
          @blur="showCount = true"
          v-model="item.count.val"
          :min="1"
          :max="10"
          @change="updatePrice"
          size="small"
        />
      </div>
      <div class="priceInfo">
        <span style="color: red">{{ item.finalPrice }}</span>
        元
      </div>
      <div class="operateBox">
        <el-tooltip class="box-item" effect="dark" content="复制产品" placement="top">
          <el-button @click="copyItem(item)" type="success" size="large" :icon="CopyDocument" text />
        </el-tooltip>
        <!-- <div style="background: #cfcfcf; width: 1px; height: 24px"></div> -->
        <el-tooltip class="box-item" effect="dark" content="删除产品" placement="top">
          <el-button @click="deleteItem(index)" type="danger" size="large" :icon="Delete" text />
        </el-tooltip>
      </div>
    </div>
  </div>
  <XzzColorPicker ref="colorPickerRef" />
  <BracesPanel ref="bracesPanelRef" @changeBraces="updateBraces" :list="backendData.braces" />
  <NutsPanel ref="nutsPanelRef" @changeNuts="updateNuts" :list="backendData.nuts" />
  <MaterialPanel ref="MaterialPanelRef" :materialList="backendData.materials" />
</template>

<script setup>
import { useShopStore } from "@store/shopTable.js"
import { useTable } from "@/hooks/useTable"
import { useMitt } from "@/hooks/mitt"
import { Delete, CopyDocument, Picture as IconPicture, MagicStick, Plus } from "@element-plus/icons-vue"

const { backendData } = useTable()
const store = useShopStore()
const { updatePrice } = store
const { tableData, totalPrice } = storeToRefs(store)
const { emitEvent, onEvent } = useMitt()

const openPreview = modelFileInfo => {
  emitEvent("openLoading")
  emitEvent("openPreview", modelFileInfo)
}

const displayPantone = item => {
  return "yanse"
  const { c, u } = item.colorList
  let str = ""
  item.pantone.map(item => {
    str += item.name
  })
  return str
}
const displayBracesOrNuts = total => {
  let str = ""
  total.map(item => {
    str += `${item.default_code}-${item.num}个`
  })
  return str
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

const copyItem = item => {
  const deepCopy = JSON.parse(JSON.stringify(item))
  tableData.value.push(deepCopy)
}

const deleteItem = index => {
  tableData.value.splice(index, 1)
}

//  材料选择面板
const MaterialPanelRef = ref(null)
const openMaterialPanel = index => {
  MaterialPanelRef.value && MaterialPanelRef.value.handleOpen(index)
}

//  颜色选择面板
const colorPickerRef = ref(null)
const handleChangePicker = index => {
  // tableData.value[index].paint.status = false
  // 打开面板 进行数据更改
  colorPickerRef.value && colorPickerRef.value.handleOpen(index)
}

const bracesPanelRef = ref(null)
const handleChangeBraces = index => {
  // // 拦截点击事件  不主动勾选
  // tableData.value[index].braces.status = false
  // 打开面板 进行数据更改
  bracesPanelRef.value && bracesPanelRef.value.handleOpen(index)
}

const nutsPanelRef = ref(null)
const handleChangeNuts = index => {
  // // 拦截点击事件  不主动勾选
  // tableData.value[index].nuts.status = false
  // 打开面板 进行数据更改
  nutsPanelRef.value && nutsPanelRef.value.handleOpen(index)
}

const deliveryTimeArr = ref([
  { name: "交期", key: "deliveryTime", price: 56, val: "加急" },
  { name: "交期", key: "deliveryTime", price: 23, val: "标准" },
  { name: "交期", key: "deliveryTime", price: 0, val: "经济" },
])
const handleDelivery = (index, indey) => {
  tableData.value[index].deliveryTime = deliveryTimeArr.value[indey]
  tableData.value[index].deliveryTime.currentIndex = indey
  updatePrice()
}

const showCount = ref(true)
</script>

<style scoped lang="scss">
.newTable_box {
  .header_box {
    display: flex;
    border: 1px solid #cfcfcf;
    border-bottom: none;
    height: 30px;
    color: #0000008f;
    line-height: 30px;
    text-align: center;
    > div {
      margin: 0 5px;
      flex: 1;
    }
    .fileInfo {
      flex: 2;
    }
    .printInfo {
      flex: 2;
    }
    // .selectInfo {
    //   flex: 1;
    // }
    // .countInfo {
    //   flex: 1;
    // }
    // .priceInfo {
    //   flex: 1;
    // }
  }
  .item_box {
    position: relative;
    border: 1px solid #cfcfcf;
    border-bottom: none;
    // margin-right: 40px;
    padding-top: 26px;
    height: 240px;
    // background: #f7f7f7;
    display: flex;
    > div {
      margin: 0 5px;
    }
    &:nth-last-child(1) {
      border-bottom: 1px solid grey;
      margin-bottom: 6px;
    }
    .fileInfo {
      // text-align: center;
      // border: 1px solid rgb(219, 24, 24);
      // padding: 10px;
      // display: flex;
      // /* align-items: center; */
      // justify-content: center;
      // flex-direction: column;
      flex: 2;
      .filename {
        font-weight: 600;
        margin: 10px 0;
      }
      .size,
      .volume {
        color: #0000008f;
        font-size: small;
        margin: 5px 0;
      }
    }
    .printInfo {
      flex: 2;
      // border: 1px solid rgb(219, 24, 24);
      // padding: 10px;
      color: #0000008f;
      font-size: 14px;
      > div {
        margin-bottom: 10px;
      }
    }
    .selectInfo {
      // border: 1px solid rgb(219, 24, 24);
      flex: 1;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      // padding: 20px;
      button {
        margin: 0 0 2px 0;
      }
    }
    .countInfo {
      flex: 1;
      // display: flex;
      // align-items: center;
      // padding: 10px;
      margin-top: 40px;
      margin-top: 40px;
      :deep(.el-input-number--small) {
        width: 80px;
      }
      .count {
        text-align: center;
      }
    }
    .priceInfo {
      // margin-top: 40px;
      // padding: 10px;
      margin-top: 180px;
      flex: 1;
    }
    .operateBox {
      // border: 1px solid #cfcfcf;
      position: absolute;
      top: 0px;
      right: -5px;
      display: flex;
      align-items: center;
      border-top: none;
      border-right: none;
      // padding: 2px;
      > button {
        margin: 0;
        padding: 8px 15px;
      }
    }
  }
}
</style>
