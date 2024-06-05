<!--
 * new page
 * @author: xzz2021
 * @since: 2024-06-03
 * ColorPicker.vue
-->
<template>
  <div class="container">
    <el-popover :width="850" :visible="popVisible">
      <template #reference>
        <div class="picker_box" :style="{ 'background-color': modelValue.hex }" @click="popVisible = true"></div>
      </template>
      <template #default>
        <div class="pantone_picker_box">
          <ColorPicker :color="modelValue.hex" @changeColor="changeColor" :sucker-hide="true" />
          <PantoneList ref="pantoneListRef" :color="modelValue.hex" @changeColor2="changeColor2" :colorList="colorList" />
          <AddColor :addList="addList" ref="AddColorRef" @closePopover="closePopover" />
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script setup>
import PantoneList from "./PantoneList.vue"
import ColorPicker from "./color/ColorPicker.vue"
import AddColor from "./AddColor.vue"
import { getPantoneUC } from "../../utils/calculateColor"
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return {
        hex: "#F4DA40",
        pantone: "7404 C",
        rgb: [244, 218, 64],
      }
    },
  },
})

const popVisible = ref(false)

const emit = defineEmits(["update:modelValue", "change"])

const colorList = ref([])
const changeColor = color => {
  const { r, g, b } = color.rgba || color.rgb
  const arr = getPantoneUC([r, g, b])
  colorList.value = arr
  emit("update:modelValue", color)
}

const addList = ref({
  c: [],
  u: [],
})

const pantoneListRef = ref(null)
const AddColorRef = ref(null)
const changeColor2 = color => {
  const { r, g, b } = color.rgba || color.rgb
  const arr = getPantoneUC([r, g, b])
  colorList.value = arr
  if (color.pantone.lastIndexOf("C") == -1 && AddColorRef.value) {
    AddColorRef.value.addItem("u", color)
    addList.value.u.push(color)
  } else {
    AddColorRef.value.addItem("c", color)
  }
  emit("update:modelValue", color)
}

const closePopover = () => {
  popVisible.value = false
}
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
