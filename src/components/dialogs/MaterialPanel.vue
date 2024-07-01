<!--
 * new page
 * @author: xzz2021
 * @since: 2024-05-31
 * MaterialPanel.vue
-->
<template>
  <div class="container" >
  <el-dialog v-model="dialogVisible" width="780"  draggable :append-to-body="true">

    <el-tabs type="border-card" class="demo-tabs" style="height:500px;">
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <!-- <el-icon><calendar /></el-icon> -->
          <span>树脂</span>
        </span>
      </template>
      <MaterialList :curlistIndex="curlistIndex" :list="materialList.tree"/>
    </el-tab-pane>

    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <!-- <el-icon><calendar /></el-icon> -->
          <span>金属</span>
        </span>
      </template>
      <MaterialList :curlistIndex="curlistIndex"  :list="materialList.metal"/>
    </el-tab-pane>
    <!-- <el-tab-pane label="尼龙">尼龙</el-tab-pane>
    <el-tab-pane label="不锈钢">不锈钢</el-tab-pane>
    <el-tab-pane label="自定义">自定义</el-tab-pane> -->
  </el-tabs>

</el-dialog>
  </div>
</template>

<script setup>
 const props = defineProps({
  list: {
    type: Array,
    default: () =>{}
  },
  materialList: {
    type: Object,
    default: () =>{}
  }
})
const curlistIndex = ref(0)

const dialogVisible = ref(false)
const handleOpen = (curIndex) => {
  dialogVisible.value = true
  curlistIndex.value = curIndex
  
}

defineExpose({
  handleOpen
})

</script>

<style lang="scss" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>
