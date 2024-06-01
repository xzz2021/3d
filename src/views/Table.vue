<!--
 * new page
 * @author: xzz2021
 * @since: 2024-05-31
 * Table.vue
-->
<template>
  <div class="table_container">
    <el-table :data="tableData" height="350" style="width: 100%" stripe border>
      <el-table-column label="文件预览" width="180">
        <template #default="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.image" fit="fill" />
        </template>
      </el-table-column>
      <el-table-column label="材料" width="180">
        <template #default="scope">
          <el-select v-model="scope.row.material.name" @visible-change="visibleChange">
            <template #empty>
              <el-card>reter</el-card>
            </template>
            <!-- <template #default>
              <el-option v-for="item in materialOptions" :key="item.name" :label="item.name" :value="item.name">
                <div class="custom-option">
                  <img :src="item.img" class="option-image" />
                  <div class="option-details">
                    <div class="option-title">{{ item.name }}</div>
                    <div class="option-price">{{ item.color }}</div>
                  </div>
                </div>
              </el-option>
            </template> -->
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="表面处理" min-width="100">
        <template #default="scope">
          <div class="process_box">
            <el-checkbox v-model="scope.row.processing.a" label="喷漆" size="small" />
            <el-checkbox v-model="scope.row.processing.b" label="牙套" size="small" />
            <el-checkbox v-model="scope.row.processing.c" label="铜螺母" size="small" />
            <el-checkbox v-model="scope.row.processing.d" label="精打磨" size="small" />
          </div>
        </template>
      </el-table-column>

      <el-table-column label="数量">
        <template #default="scope">
          <el-input-number v-model="scope.row.count" :min="1" :max="10" @change="handleChange" size="small" />
        </template>
      </el-table-column>
      <el-table-column prop="deliveryTime" label="交期">
        <template #default="scope">
          <el-radio-group v-model="scope.row.deliveryTime">
            <el-radio value="1" size="small" border>24小时</el-radio>
            <el-radio value="2" size="small" border>48小时</el-radio>
            <el-radio value="3" size="small" border>72小时</el-radio>
          </el-radio-group>
        </template>
      </el-table-column>
      <el-table-column label="价格">
        <template #default="scope">
          <div style="color: red">{{ scope.row.price }} 元</div>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作">
        <template #default="scope">
          <div class="operateBox">
            <el-button type="primary" :icon="ShoppingCartFull" circle></el-button>
            <el-button type="success" :icon="CopyDocument" circle @click="copyItem(scope.row)"></el-button>
            <el-button type="danger" :icon="Delete" circle @click="deleteItem(scope.$index)"></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { Delete, CopyDocument, ShoppingCartFull } from "@element-plus/icons-vue"
import { ref } from "vue"
const tableData = ref([
  {
    image: "https://img2.imgtp.com/2024/05/31/qBd2EEAr.png",
    material: {
      name: "8200树脂",
      img: "",
      advantages: "高精度,高韧性, 高稳定性",
      disAdvantages: "保存温度不宜超过60摄氏度",
      color: "白色",
      deviation: "±200微米或±0.2%",
    },
    processing: {
      a: true,
      b: false,
      c: true,
    },
    count: 1,
    deliveryTime: "2",
    price: "168.00",
    operation: "",
  },
])

const materialOptions = [
  {
    name: "8200树脂",
    img: "",
    advantages: "高精度,高韧性, 高稳定性",
    disAdvantages: "保存温度不宜超过60摄氏度",
    color: "白色",
    deviation: "±200微米或±0.2%",
  },
  {
    name: "r4600树脂",
    img: "",
    advantages: "高精度,高韧性, 高稳定性",
    disAdvantages: "保存温度不宜超过60摄氏度",
    color: "黑色",
    deviation: "±200微米或±0.2%",
  },
]

const handleChange = () => {}

const visibleChange = bool => {
  console.log("🚀 ~ file: Table.vue:95 ~ bool:", bool)
}

const copyItem = item => {
  // console.log("🚀 ~ file: Table.vue:129 ~ item:", item)
  const deepCopy = JSON.parse(JSON.stringify(item))
  tableData.value.push(deepCopy)
}

const deleteItem = index => {
  tableData.value.splice(index, 1)
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
  // justify-content: center; /* 使 Radio 按钮垂直居中 */
  align-items: center;
}
:deep(.el-radio:last-child) {
  // margin-right: 0;
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
.operateBox {
  display: flex;
  flex-direction: column; /* 使 Radio 垂直排列 */
  align-items: center; /* 使 Radio 按钮垂直居中 */
  :deep(.el-button) {
    margin-bottom: 5px;
  }
}
:deep(.operateBox .el-icon) {
  font-size: 18px;
}
</style>
