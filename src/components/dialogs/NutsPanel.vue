<!--
 * new page
 * @author: xzz2021
 * @since: 2024-06-05
 * BracesPanel.vue
-->
<template>
  <div class="container">
    <el-dialog v-model="dialogVisible" width="780" draggable :show-close="false" top="5vh" :close-on-click-modal="false">
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
        <el-button @click="handleCancel" size="small">取消</el-button>
        <el-button type="primary" @click="confirm" size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { useShopStore } from "@/pinia/shopTable.js"
const store = useShopStore()
const { tableData } = storeToRefs(store)

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
const curIndex = ref(0)

const dialogVisible = ref(false)

const nutsType = computed(() => {
  const temp = []
  props.list.map(item => {
    const type = item.default_code
    const { 长度, 底孔直径, 工件外径 } = item.variants[0].attribute_values
    temp.push({ type, length: 长度, diameter: 底孔直径, outerDiameter: 工件外径 })
  })
  return temp
})

const emit = defineEmits(["changeNuts"])

const confirm = () => {
  const total = []
  let status = true
  props.list.map(item => {
    if (item.num != 0) total.push(JSON.parse(JSON.stringify(item)))
  })
  dialogVisible.value = false //  不需要关闭面板 本身就包含关闭事件
  // 发送事件 更新牙套数据
  // if (total.length == 0) status = false
  emit("changeNuts", { index: curIndex.value, total })
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
  emit("changeNuts", { index: curIndex.value, total: [] })
}

const handleOpen = index => {
  props.list.map(item => {
    item.num = 0
  })
  curIndex.value = index
  const total = tableData.value[index].nuts.total
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
