<!--
 * new page
 * @author: xzz2021
 * @since: 2024-06-03
 * ColorPicker.vue
-->
<template>
  <div class="container">
    <el-dialog v-model="dialogVisible" width="780" draggable :append-to-body="true" @close="closeDialog">
      <div class="pantone_picker_box">
        <ColorPicker @changeColor="changeColor" :sucker-hide="true" />
        <!-- <ColorPicker :color="modelValue.hex" @changeColor="changeColor" :sucker-hide="true" /> -->
        <PantoneList ref="pantoneListRef" @changeColor2="changeColor2" @changeColor="changeColor" :colorList="colorList" />
        <!-- <PantoneList
            ref="pantoneListRef"
            :color="modelValue.hex"
            @changeColor2="changeColor2"
            @changeColor="changeColor"
            :colorList="colorList"
          /> -->
        <AddColor ref="AddColorRef" @closePopover="closePopover" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import PantoneList from "./PantoneList.vue"
import ColorPicker from "./color/ColorPicker.vue"
import AddColor from "./AddColor.vue"
import { getPantoneUC } from "../../utils/calculateColor"
// const props = defineProps({
//   modelValue: {
//     type: Object,
//     default: () => {
//       return {
//         hex: "#F4DA40",
//         pantone: "7404 C",
//         rgb: [244, 218, 64],
//       }
//     },
//   },
// })

const dialogVisible = ref(false)

// const emit = defineEmits(["update:modelValue"])

const colorList = ref([])
const changeColor = color => {
  const { r, g, b } = color.rgba || color.rgb
  const arr = getPantoneUC([r, g, b])
  colorList.value = arr
  // emit("update:modelValue", color)
}
const emit = defineEmits(["changePaint"])

const addList = ref({
  c: [],
  u: [],
})

const pantoneListRef = ref(null)
const AddColorRef = ref(null)
const changeColor2 = color => {
  if (color.pantone.lastIndexOf("C") == -1 && AddColorRef.value) {
    AddColorRef.value.addItem("u", color)
    addList.value.u.push(color)
  } else {
    AddColorRef.value.addItem("c", color)
  }
  // emit("update:modelValue", color)
}

const closePopover = () => {
  dialogVisible.value = false
}

const handleOpen = () => {
  dialogVisible.value = true
}
const closeDialog = () => {
  // 关闭时 根据颜色数量  确定是否 勾选
  // if (addList.value.c.length > 0 || addList.value.u.length > 0) {
  const bool = (AddColorRef.value && AddColorRef.value.colorSum > 0) || false
  console.log("🚀 ~ file: XzzColorPicker.vue:86 ~ bool:", bool)
  emit("changePaint", bool)
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
