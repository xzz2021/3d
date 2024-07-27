<script setup>
import NewApp from "@views/NewApp.vue"
// import BaiduMap from "@/views/BaiduMap.vue"
</script>

<template>
  <div id="xzzapp">
    <!-- <el-card style="width: 1036px"> -->

      <NewApp />
  </div>
  <!-- <BaiduMap /> -->
</template>

<style scoped lang="scss">
#xzzapp {
  padding: 0 20px;
  min-width: 600px;
  max-width: 1130px;
  margin: 0 auto;
}
.upload_shop_box {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}
* {
  box-sizing: content-box;
}
</style>
