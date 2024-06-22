<!--
 * new page
 * @author: xzz2021
 * @since: 2024-06-05
 * BracesPanel.vue
-->
<template>
  <div class="container">
    {{ props.index }}
    <el-dialog v-model="dialogVisible" width="780" draggable :append-to-body="true" top="5vh">
      {{ props.index }}

      <div class="title">填写铜螺母数量</div>
      <div class="content_box">
        <div class="select_box">
          <div class="num_box" v-for="item in nutsType" :key="item">
            <div>{{ item.type }}</div>
            <div>
              个数:
              <el-input-number v-model="item.num" :min="0" :max="10" size="small" />
            </div>
          </div>
        </div>
        <div class="description">
          <p>铜螺母型号说明(单位:mm)</p>
          <div class="table_box">
            <el-table :data="nutsType" width="480" stripe border size="small">
              <el-table-column prop="type" label="型号" width="120"></el-table-column>
              <el-table-column prop="length" label="长度" width="130"></el-table-column>
              <el-table-column prop="diameter" label="底孔直径" width="100"></el-table-column>
              <el-table-column prop="outerDiameter" label="工件外径" width="90"></el-table-column>
            </el-table>
          </div>
          <div class="tips">
            说明: 1、铜螺母小于M6壁厚需要≧1.5mm; 2、铜螺母大于M6壁厚需要≧2mm; 3、如有特殊要求请提前联系工装师傅。
            注:铜螺母底孔壁厚不低于1.5mm,根据规格适当增加;底孔深度需超过铜螺母长度1.5mm。
          </div>
        </div>
      </div>
      <div class="summary_box">
        <p>说明</p>
        <p>
          关于价格,按铜螺母和牙套总计数量计算价格,10颗及10颗以内的部分,每颗￥8;10到200颗的部分,每颗￥3.5;200颗以上的部分,
          每颗￥2.5。比如一件产品需要30颗铜螺母,20件牙套,共计50颗,则总价为10x8+3.5x40=220元。
          关于交期,树脂的铜螺母和牙套合计数量不高于20个,不增加额外交期,合计数量每达到500颗,额外增加1天交期;尼龙的铜螺母和牙套合计数量不高于300个,增加1天交期,合计数量每达到300颗,额外增加1天交期。
        </p>
      </div>
      <div style="text-align: end">
        <el-button @click.native="handleCancel" size="small">清空</el-button>
        <el-button type="primary" @click="confirm" size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { useShopStore } from "@/pinia/shopTable.js"
const store = useShopStore()
const { tableData } = storeToRefs(store)
const dialogVisible = ref(false)

const props = defineProps({
  index: Number,
})
const rawData = [
  { type: "M1.6*3", length: "4.5", diameter: "2.2", outerDiameter: "5.2", num: 0 },
  { type: "M2*2", length: "3.5", diameter: "3.2", outerDiameter: "6.2", num: 0 },
  { type: "M2*3", length: "4.5", diameter: "3.2", outerDiameter: "6.2", num: 0 },
  { type: "M2*5", length: "6.5", diameter: "3.2", outerDiameter: "6.2", num: 0 },
  { type: "M2.5*3", length: "4.5", diameter: "3.9", outerDiameter: "6.2", num: 0 },
  { type: "M3*3", length: "4.5", diameter: "3.8", outerDiameter: "6.8", num: 0 },
  { type: "M3*5", length: "6.5", diameter: "3.8", outerDiameter: "6.8", num: 0 },
  { type: "M4*4", length: "5.5", diameter: "4.8", outerDiameter: "7.8", num: 0 },
  { type: "M4*8", length: "9.5", diameter: "4.8", outerDiameter: "7.8", num: 0 },
  { type: "M5*5", length: "6.5", diameter: "5.9", outerDiameter: "9.1", num: 0 },
  { type: "M6*5", length: "7.5", diameter: "7.9", outerDiameter: "11.9", num: 0 },
  { type: "M8*10", length: "11.5", diameter: "9.8", outerDiameter: "13.8", num: 0 },
]
const nutsType = ref([])

const emit = defineEmits(["changeNuts"])

const confirm = () => {
  // const total = []
  let sum = 0
  nutsType.value.map(item => {
    sum += item.num
  })
  dialogVisible.value = false //  不需要关闭面板 本身就包含关闭事件
  // 发送事件 更新牙套数据
  emit("changeNuts", { index: currentIndex.value, total: nutsType.value, status: sum > 0 })
}

const handleCancel = () => {
  // 取消 需要把数据全部 置空
  dialogVisible.value = false
  const rawObj = JSON.parse(JSON.stringify(rawData)) // 保留rawData
  nutsType.value = rawObj
  emit("changeNuts", { index: currentIndex.value, total: rawObj, status: false })
}

const currentIndex = ref(0)
const handleOpen = index => {
  currentIndex.value = index
  dialogVisible.value = true
  nutsType.value = tableData.value[index].nuts.total
}
defineExpose({ handleOpen })
</script>

<style lang="scss" scoped>
.content_box {
  display: flex;
  justify-content: space-between;
  .description {
    width: 440px;
  }
  .select_box {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    // height: 250px;
    .num_box {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      width: 270px;
    }
  }
}
</style>
