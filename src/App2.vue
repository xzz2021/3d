<script setup>
import Upload from "@/views/Upload2.vue"
import Table from "@/views/Table.vue"

import { useMitt } from "@/hooks/mitt.js"

const showLogo = ref(true)

const { onEvent } = useMitt()
onEvent("showLogo", () => {
  showLogo.value = false
})
</script>

<template>
  <div id="xzzapp">
    <div v-if="showLogo" class="item">
      <div class="logo">
        <div>
          <img src="https://yun3d.com/filestore/assets/logo.png" style="width: 288px; height:100px "></img>
        </div>
      </div>
    </div>
    <Table v-else />
    <Upload />
  </div>
</template>

<style scoped lang="scss">
#xzzapp {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  width: 100%;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 630px);
    > div {
      margin-top: auto;
    }
    // .logo {
    //   width: 200px;
    //   height: 200px;
    //   // background-image: url("../assets/logo.png");
    //   background-size: 100% 100%;
    // }
  }
}
.upload_shop_box {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
// * {
//   box-sizing: content-box;
// }
</style>
