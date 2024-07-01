<!--
 * new page
 * @author: xzz2021
 * @since: 2024-06-03
 * ColorPicker.vue
-->
<template>
  <div class="container" v-show="dialogVisible">
    <!-- <el-dialog v-model="dialogVisible2" width="780" draggable :append-to-body="true" :show-close="false"> -->
    <el-dialog v-model="dialogVisible2" width="780" draggable :show-close="false">
      <div class="pantone_picker_box">
        <ColorPicker @changeColor="updateColorBlock" :sucker-hide="true" />
        <PantoneList
          ref="pantoneListRef"
          @chooseColor="chooseColor"
          @updateColorBlock="updateColorBlock"
          :colorList="colorList"
        />
        <AddColor ref="AddColorRef" @closeDialog="closeDialog" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import PantoneList from "./PantoneList.vue"
import ColorPicker from "./color/ColorPicker.vue"
import AddColor from "./AddColor.vue"
import { getPantoneUC } from "../../utils/calculateColor"

const dialogVisible = ref(false)
const dialogVisible2 = ref(true)

const colorList = ref({
  pantoneC: [
    {
      hex: "#6638B6",
      rgb: [102, 56, 182],
      pantone: "2090 C",
    },
    {
      hex: "#FF8200",
      rgb: [255, 130, 0],
      pantone: "151 C",
    },
    {
      hex: "#05C3DE",
      rgb: [5, 195, 222],
      pantone: "311 C",
    },
    {
      hex: "#E10098",
      rgb: [225, 0, 152],
      pantone: "Rhodamine Red C",
    },

    {
      hex: "#F7EA48",
      rgb: [247, 234, 72],
      pantone: "101 C",
    },
    {
      hex: "#CB2C30",
      rgb: [203, 44, 48],
      pantone: "711 C",
    },

    {
      hex: "#753BBD",
      rgb: [117, 59, 189],
      pantone: "266 C",
    },
    {
      hex: "#FF5600",
      rgb: [255, 86, 0],
      pantone: "Orange 016 C",
    },
    {
      hex: "#00B2A9",
      rgb: [0, 178, 169],
      pantone: "326 C",
    },
    {
      hex: "#EB6FBD",
      rgb: [235, 111, 189],
      pantone: "224 C",
    },
  ],
  pantoneU: [
    {
      hex: "#755AB3",
      rgb: [117, 90, 179],
      pantone: "2090 U",
    },

    {
      hex: "#FF6C2F",
      rgb: [255, 108, 47],
      pantone: "Orange 021 U",
    },
    {
      hex: "#00B4E4",
      rgb: [0, 180, 228],
      pantone: "306 U",
    },
    {
      hex: "#D1428D",
      rgb: [209, 66, 141],
      pantone: "Pink U",
    },
    {
      hex: "#E44C9A",
      rgb: [228, 76, 154],
      pantone: "Rhodamine Red U",
    },
    {
      hex: "#1B5FAA",
      rgb: [27, 95, 170],
      pantone: "2935 U",
    },

    {
      hex: "#7758B3",
      rgb: [119, 88, 179],
      pantone: "Violet U",
    },
    {
      hex: "#FF6740",
      rgb: [255, 103, 64],
      pantone: "Orange 016 U",
    },
    {
      hex: "#179DAB",
      rgb: [23, 157, 171],
      pantone: "7711 U",
    },
    {
      hex: "#FF48B0",
      rgb: [255, 72, 176],
      pantone: "806 U",
    },
  ],
})

//  更新供选择的  颜色块
const updateColorBlock = color => {
  const { r, g, b } = color.rgba || color.rgb
  const arr = getPantoneUC([r, g, b])
  colorList.value = arr
}

const addList = ref({
  c: [],
  u: [],
})

const pantoneListRef = ref(null)
const AddColorRef = ref(null)
//  选择颜色  推送到右侧
const chooseColor = color => {
  if (color.pantone.lastIndexOf("C") == -1 && AddColorRef.value) {
    AddColorRef.value.addItem("u", color)
    addList.value.u.push(color)
  } else {
    AddColorRef.value.addItem("c", color)
  }
}

//  关闭面板
const closeDialog = () => {
  dialogVisible.value = false
}

// 打开面板
const handleOpen = index => {
  dialogVisible.value = true
  //  更新已有 列表颜色
  //  首次打开时 此面板还未挂载  故dom元素不存在
  AddColorRef.value && AddColorRef.value.initPanel(index)
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
</style>
