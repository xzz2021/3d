<!--
 * new page
 * @author: xzz2021
 * @since: 2024-06-05
 * BracesPanel.vue
-->
<template>
  <div class="container">
    <el-dialog v-model="dialogVisible" width="780" draggable :append-to-body="true" top="5vh">
      <div class="title">填写铜螺母数量</div>
      <div class="content_box">
        <div class="select_box">
          <!-- <div class="num_box" v-for="item in nutsType" :key="item">
            <div>{{ item.type }}</div> -->
            <div class="num_box" v-for="item in props.list" :key="item">
            <div>{{ item.default_code }}</div>

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
        <el-button @click.native="handleCancel" size="small">取消</el-button>
        <el-button type="primary" @click="confirm" size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
  list: {
    type: Array,
    default: () => []
  }
})

const dialogVisible = ref(false)

const nutsType = ref([
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
  
])

const emit = defineEmits(["changeNuts"])

const confirm = () => {
  const total = []
  let status = true
  props.list.map(item => {
    if (item.num != 0) total.push(item)
  })
  dialogVisible.value = false //  不需要关闭面板 本身就包含关闭事件
  // 发送事件 更新牙套数据
  if (total.length == 0) status = false
  emit("changeNuts", { index: props.index, total, status })
}

const handleClose = () => {
  // 取消时 关闭 面板  并置空数据
  dialogVisible.value = !true
}

const handleCancel = () => {
  // 取消 需要把数据全部 置空
  dialogVisible.value = false
  nutsType.value.map(item => {
    item.num = 0
  })
  props.list.map(item => {
    item.num = 0
  })
  emit("changeNuts", { index: props.index, total: [], status: false })
}
const handleOpen = () => {
  dialogVisible.value = true
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
