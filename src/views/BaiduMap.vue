<template>
  <div id="baiddd"></div>
</template>
<script setup>
import { onMounted } from "vue"

onMounted(() => {
  let Bmap = window.BMap
  const map = new Bmap.Map("baiddd", {
    coordsType: 5, // coordsType指定输入输出的坐标类型，3为gcj02坐标，5为bd0ll坐标，默认为5。
    // 指定完成后API将以指定的坐标类型处理您传入的坐标
  }) // 创建地图实例

  var point = new Bmap.Point(118.58, 24.93) // 创建点坐标
  map.centerAndZoom(point, 15) // 初始化地图，设置中心点坐标和地图级别
  const marker = new BMap.Marker(point) // 创建标注
  map.addOverlay(marker)
  map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
})
</script>
<style scoped lang="scss">
#baiddd {
  width: 600px;
  height: 500px;
  overflow: hidden;
  margin: 0;
  font-family: "微软雅黑";
}
</style>
