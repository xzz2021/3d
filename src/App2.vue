<script setup>
import Upload from "@/views/Upload2.vue"
import Table from "@/views/Table.vue"
import LogoViewer from "@/views/LogoViewer.vue"
import { useMitt } from "@/hooks/mitt.js"

const showLogo = ref(true)

const { onEvent } = useMitt()
onEvent("showLogo", () => {
  showLogo.value = false
})
</script>

<template>
  <div id="xzzapp">
    <!-- <div v-if="showLogo" class="item">
      <div class="logo">
        <div>
          <img src="https://yun3d.com/filestore/assets/logo.png" style="width: 288px; height:100px "></img>
        </div>
      </div>
    </div> -->
    <div  data-v-18ac34e8="" data-v-e16649ff="" class="logo_container" style="  display: flex; 
    width: 300px; flex-direction: row; font-size: 64px;font-weight: 600;">
      <span style=" color: #4285f4;">D</span>
      <span style="color: #ea4335;">a</span>
      <span style="color: #fbbc05;">y</span>
      <span style="color: #4285f4;">u</span>
      <span style="color: #34a853;">3</span>
      <span style="color: #ea4335;">D</span>
    </div>

    <LogoViewer  v-if="showLogo"/>

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
