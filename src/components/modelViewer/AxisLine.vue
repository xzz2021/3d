<template>
  <div id="faceBox">
    <div class="axis">
      <i @click="changeFace(camera2, 0)" class="icon1 iconfont icon-shitufushitu"></i>
      <i @click="changeFace(camera2, 1)" class="icon2 iconfont icon-shituyangshitu"></i>
      <i @click="changeFace(camera2, 4)" class="icon3 iconfont icon-shituzhushitu"></i>
      <i @click="backCarmera2" class="icon11 iconfont icon-materializedView"></i>
      <i @click="changeFace(camera2, 5)" class="icon4 iconfont icon-shituhoushitu"></i>
      <i @click="changeFace(camera2, 2)" class="icon5 iconfont icon-shituzuoshitu"></i>
      <i @click="changeFace(camera2, 3)" class="icon6 iconfont icon-shituyoushitu"></i>
      <!-- <div class="line x-axis"></div>
      <div class="line y-axis"></div>
      <div class="arrow arrow-right"></div>
      <div class="arrow arrow-up"></div> -->
    </div>
    <div @click="totastMesh2">旋转</div>
  </div>
</template>
<script setup>
import { useThree } from "@/hooks/useThree.js"

const props = defineProps({
  camera2: {
    type: undefined,
    required: true,
  },
})

const emit = defineEmits(["backCarmera", "totastMesh"])
const backCarmera2 = () => {
  emit("backCarmera")
}
const totastMesh2 = () => {
  emit("totastMesh")
}
let { changeFace } = useThree()
</script>

<style>
@keyframes tada {
  from {
    transform: scale3d(1, 1, 1);
  }
  10%,
  20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }
  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }
  40%,
  60%,
  80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }
  to {
    transform: scale3d(1, 1, 1);
  }
}

#faceBox {
  /* position: absolute; */
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
.axis .iconfont {
  cursor: pointer;
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
  top: 65%;
  left: 0%;
}

.axis .icon2 {
  position: absolute;
  top: 65%;
  left: 25%;
}
.axis .icon3 {
  position: absolute;
  top: 65%;
  left: 50%;
}
.axis .icon11 {
  position: absolute;
  top: 65%;
  left: 75%;
}
.axis .icon4 {
  position: absolute;
  top: 65%;
  left: 100%;
}
.axis .icon5 {
  position: absolute;
  top: 65%;
  right: -45%;
}
.axis .icon6 {
  position: absolute;
  top: 65%;
  right: -70%;
}

.iconfont {
  animation: tada 1s;
}

.iconfont:active {
  animation: none;
}
</style>
