<!--
 * new page
 * @author: xzz2021
 * @since: 2024-06-05
 * BracesPanel.vue
-->
<template>
  <div class="container">
    <el-dialog v-model="dialogVisible" width="780" draggable top="5vh" :show-close="false" :close-on-click-modal="false">
      <div class="title">填写牙套数量</div>
      <div class="content_box">
        <div class="select_box">
          <!-- <div class="num_box" v-for="item in bracesType" :key="item">
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
          <p>牙套型号说明(单位:mm)</p>
          <div class="table_box">
            <el-table :data="bracesType" width="480" stripe border size="small">
              <el-table-column prop="type" label="型号" width="120"></el-table-column>
              <el-table-column prop="depth" label="孔底深度" width="130"></el-table-column>
              <el-table-column prop="diameter" label="底孔直径" width="100"></el-table-column>
              <el-table-column prop="outerDiameter" label="工件外径" width="90"></el-table-column>
            </el-table>
          </div>
          <div class="tips">
            说明: 1、我场提供有1D, 1.5D, 2D, 2.5D,
            3D等多个型号的牙套(D代表深度),请在附件图纸中(购物车页)注明牙套规格和型号等信息,例如你选择牙套规格为M2,型号为1D,则代表加工M2的牙套,孔深为:3.5mm
            (2*1+1.5); 2、孔柱装配壁厚相对于牙套外径单边不小于1.5mm; 3、牙套螺纹为内螺纹,查看 示例图 。
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
        <el-button @click="handleCancel" size="small">取消</el-button>
        <el-button type="primary" @click="confirm" size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { useShopStore } from "@/pinia/shopTable.js"
import { computed } from "vue"
const store = useShopStore()
const { tableData } = storeToRefs(store)

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})

const dialogVisible = ref(false)
// const bracesType = ref([
//   { type: "M2(1D-3D)", depth: "2*1d-3d加1.5", diameter: "2.1", outerDiameter: "5.1", num: 0 },
//   { type: "M2.5(1D-3D)", depth: "2.5*1d-3d加1.5", diameter: "2.6", outerDiameter: "5.6", num: 0 },
//   { type: "M3(1D-3D)", depth: "3*1d-3d加1.5", diameter: "3.1", outerDiameter: "6.1", num: 0 },
//   { type: "M4(1D-3D)", depth: "4*1d-3d加1.5", diameter: "4.2", outerDiameter: "7.2", num: 0 },
//   { type: "M5(1D-3D)", depth: "5*1d-3d加1.5", diameter: "5.2", outerDiameter: "8.2", num: 0 },
//   { type: "M6(1D-3D)", depth: "6*1d-3d加1.5", diameter: "6.2", outerDiameter: "9.2", num: 0 },
//   { type: "M8(1D-3D)", depth: "8*1d-3d加1.5", diameter: "8.3", outerDiameter: "11.3", num: 0 },
//   { type: "M10(1D-3D)", depth: "10*1d-3d加1.5", diameter: "10.4", outerDiameter: "13.4", num: 0 },
// ])
const bracesType = computed(() => {
  const temp = []
  props.list.map(item => {
    const type = item.default_code
    const { 孔底深度, 底孔直径, 工件外径 } = item.variants[0].attribute_values
    temp.push({ type, depth: 孔底深度, diameter: 底孔直径, outerDiameter: 工件外径 })
  })
  return temp
})
const emit = defineEmits(["changeBraces"])

const curIndex = ref(0)
const confirm = () => {
  const total = []
  let status = true
  props.list.map(item => {
    if (item.num != 0) total.push(JSON.parse(JSON.stringify(item)))
  })
  console.log("🚀 ~ file: BracesPanel.vue:89 ~ props.list:", props.list)
  dialogVisible.value = false //  不需要关闭面板 本身就包含关闭事件
  // 发送事件 更新牙套数据
  if (total.length == 0) status = false
  emit("changeBraces", { index: curIndex.value, total, status })
}

//  打开面板
const handleOpen = index => {
  // 初始化勾选 项
  console.log("🚀 ~ file: BracesPanel.vue:101 ~ props.list:", props.list)
  props.list.map(item => {
    item.num = 0
  })
  curIndex.value = index
  const total = tableData.value[index].braces.total
  // 遍历  赋值  已有 数据
  if (total.length > 0) {
    props.list.map(item => {
      total.map(item2 => {
        if (item.default_code == item2.default_code) {
          item.num = item2.num
        }
      })
    })
  }
  dialogVisible.value = true
}

const handleCancel = () => {
  // 取消 需要把数据全部 置空
  dialogVisible.value = false
  props.list.map(item => {
    item.num = 0
  })
  emit("changeBraces", { index: curIndex.value, total: [], status: false })
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
