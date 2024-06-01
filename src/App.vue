<script setup>
import Steps from "./views/Steps.vue"
import Table from "./views/Table.vue"
import Upload from "./components/Upload.vue"
import ShopCard from "./views/ShopCard.vue"
</script>

<template>
  <div id="xzzapp">
    <el-card>
      <Steps />
      <Table />
      <div class="upload_shop_box" style="margin: 20px">
        <Upload />
        <ShopCard />
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
.upload_shop_box {
  display: flex;
  justify-content: space-around;
}
</style>
