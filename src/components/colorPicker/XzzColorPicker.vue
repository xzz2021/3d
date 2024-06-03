<!--
 * new page
 * @author: xzz2021
 * @since: 2024-06-03
 * ColorPicker.vue
-->
<template>
  <div class="container">
    <el-popover :width="244" trigger="click">
      <template #reference>
        <div class="picker_box" :style="{ 'background-color': modelValue }"></div>
      </template>
      <template #default>
        <ColorPicker :color="modelValue" @changeColor="changeColor" :sucker-hide="true" />
      </template>
    </el-popover>
  </div>
</template>

<script setup>
import ColorPicker from "./color/ColorPicker.vue"

const props = defineProps({
  modelValue: {
    type: String,
    default: "#FD6FC2",
  },
})

const emit = defineEmits(["update:modelValue", "change"])

const changeColor = color => {
  // console.log("🚀 ~ file: XzzColorPicker.vue:33 ~ color:", color)
  // const { r, g, b, a } = color.rgba
  // const newColor = `rgba(${r}, ${g}, ${b}, ${a})`
  emit("update:modelValue", color.hex)
}

// const colorValue = ref(props.modelValue) // 简洁模式
</script>

<style lang="scss" scoped>
.picker_box {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
