<!--
 * new page
 * @author: xzz2021
 * @since: 2024-06-03
 * ColorPicker.vue
-->
<template>
  <div class="container">
    <!-- <el-dialog v-model="dialogVisible2" width="780" draggable :append-to-body="true" :show-close="false"> -->
    <el-dialog v-model="dialogVisible" width="800" draggable :show-close="false" :close-on-click-modal="false">
      <div class="pantone_picker_box">
        <ColorPicker @changeColor="updateColorBlock" :sucker-hide="true" />
        <PantoneList
          ref="pantoneListRef"
          @updateColorBlock="updateColorBlock"
          :colorList="colorList"
        />
        <div>
          <div class="tips_box">
            <p>温馨提示:</p>
            <p>1、常用颜色显示可能含有色差,请以潘通色号为准；</p>
            <p>2、一个模型最多支持喷五种颜色,如需更多颜色请联系在线客服；</p>
            <p>3、喷漆单色交货周期增加4天,第二种颜色起,每多一种颜色,交货周期增加一天。</p>
            <p>4、产品内部默认不喷漆,如有需求,请在喷漆附件中单独标注。</p>
          </div>
          <div style="text-align: end">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="handleClose">确定</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import PantoneList from "./PantoneList.vue"
import ColorPicker from "./color/ColorPicker.vue"
import { getPantoneUC } from "../../utils/calculateColor"
import defaultColor from "./defaultColor.js"

const dialogVisible = ref(false)

const colorList = ref(defaultColor)

//  更新供选择的  颜色块
const updateColorBlock = color => {
  const { r, g, b } = color.rgba || color.rgb
  const arr = getPantoneUC([r, g, b])
  colorList.value = arr
}


// 打开面板
const currentIndex = ref(0)
const handleOpen = index => {
  dialogVisible.value = true
  //  更新已有 列表颜色
  //  首次打开时 此面板还未挂载  故dom元素不存在
  currentIndex.value = index
  pantoneListRef.value && pantoneListRef.value.initPanel(currentIndex.value)
}

//  关闭面板   给颜色赋值  更新  面板勾选状态
const pantoneListRef = ref(null)
const handleClose = () => {
  pantoneListRef.value && pantoneListRef.value.updateDate(currentIndex.value)
  dialogVisible.value = false
}

defineExpose({ handleOpen })
</script>

<style lang="scss" scoped>
.picker_box {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.pantone_picker_box {
  display: flex;
  justify-content: space-between;
}
.tips_box{
  font-size: 12px;
}
</style>
