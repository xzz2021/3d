<script setup>
import Steps from "./views/Steps.vue"
import Table from "./views/Table.vue"
import Upload from "./components/Upload.vue"
</script>

<template>
  <div id="xzzapp">
    <el-card>
      <Steps />
      <Table />
      <div style="margin: 20px">
        <Upload />
        <el-card>0007777777</el-card>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
#xzzapp {
  padding: 0 20px;
  min-width: 600px;
  // margin: 0 auto;
}
.oo {
  .ii {
    color: aqua;
  }
}
</style>
