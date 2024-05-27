<template>
  <div id="faceBox">
    <div class="axis">
      <i @click="changeFace(camera2, 0)" class="icon1 iconfont icon-shitufushitu"></i>
      <i @click="changeFace(camera2, 1)" class="icon2 iconfont icon-shituyangshitu"></i>
      <i @click="changeFace(camera2, 4)" class="icon3 iconfont icon-shituzhushitu"></i>
      <i @click="changeFace(camera2, 5)" class="icon4 iconfont icon-shituhoushitu"></i>
      <i @click="changeFace(camera2, 2)" class="icon5 iconfont icon-shituzuoshitu"></i>
      <i @click="changeFace(camera2, 3)" class="icon6 iconfont icon-shituyoushitu"></i>
      <div class="line x-axis"></div>
      <div class="line y-axis"></div>
      <div class="arrow arrow-right"></div>
      <div class="arrow arrow-up"></div>
    </div>
  </div>
</template>
<script setup>
import { useThree } from "../hooks/useThree.js"

const props = defineProps({
  camera2: {
    type: undefined,
    required: true,
  },
})

let { changeFace } = useThree()
</script>

<style>
#faceBox {
  position: absolute;
  bottom: 10px;
  left: 10px;
  /* border: 1px solid black;
  width: 50px;
  height: 50px; */
}
.axis {
  position: relative;
  width: 90px;
  height: 90px;
}
.axis .line {
  position: absolute;
  background-color: white;
}
.axis .x-axis {
  bottom: 5%;
  left: 5%;
  width: 100%;
  height: 1px;
  transform: translateX(-5%);
}
.axis .y-axis {
  bottom: 5%;
  left: 5%;
  width: 1px;
  height: 100%;
  transform: translateY(5%);
}
.axis .arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}
.axis .arrow-right {
  bottom: 5%;
  right: 0px;
  border-width: 5px 0 5px 10px;
  border-color: transparent transparent transparent white;
  transform: translateY(50%);
}
.axis .arrow-up {
  top: 0px;
  left: 0%;
  border-width: 10px 5px 0 5px;
  border-color: white transparent transparent transparent;
  transform: translateX(-50%);
  transform: rotate(180deg);
}

.axis .icon1 {
  position: absolute;
  top: 5%;
  left: 8%;
}

.axis .icon2 {
  position: absolute;
  top: 35%;
  left: 8%;
}
.axis .icon3 {
  position: absolute;
  top: 65%;
  left: 8%;
}
.axis .icon4 {
  position: absolute;
  top: 65%;
  left: 35%;
}
.axis .icon5 {
  position: absolute;
  top: 65%;
  left: 65%;
}
.axis .icon6 {
  position: absolute;
  top: 65%;
  left: 95%;
}
</style>
