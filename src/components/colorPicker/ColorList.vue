<!--
 * new page
 * @author: xzz2021
 * @since: 2024-06-03
 * PantoneList.vue
-->
<template>
  <div class="containerListBox">
    <div class="color_list_box">
      <div class="cBox">
        <div class="list_box">
          <div
            class="item_box"
            v-for="item in defaultColor"
            :key="item"
            @click="pushColor(item)"
            :style="{ 'background-color': item.hex }"
          >
            <div
              class="text"
              :style="{
                color: getHighContrastColor(item.rgb),
                fontSize: changeFontSize(item.pantone),
                lineHeight: changeLineHeight(item.pantone),
              }"
            >
              {{ item.pantone }}
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  defaultColor: {
    type: Array,
    default: [],
  },
})

const emit = defineEmits(["chooseColor"])

const pushColor = color => {
  emit("chooseColor", color)
}

//    颜色块  内部的 文字颜色 动态变换  高对比度
const getHighContrastColor = color => {
  const [R, G, B] = color.map(channel => {
    const proportion = channel / 255
    return proportion <= 0.03928 ? proportion / 12.92 : Math.pow((proportion + 0.055) / 1.055, 2.4)
  })
  const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B
  return luminance > 0.5 ? "#000000" : "#FFFFFF"
}

const changeFontSize = text => {
  return text.length > 9 ? "11px" : ""
}

const changeLineHeight = text => {
  return text.length > 10 ? "1" : ""
}
</script>

<style lang="scss" scoped>
.color_list_box {
  display: flex;
  align-items: center;
  .cBox {
    text-align: center;
    button {
      width: 138px;
      margin: 5px 0;
    }
  }
  // width: 306px;
  .list_box {
    width: 360px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    .item_box {
      // color: black;
      cursor: pointer;
      width: 60px;
      height: 40px;
      // line-height: 40px;
      margin: 5px;
      font-size: small;
      border: 1px solid #03a9f3;
      box-sizing: content-box;
      display: flex;
      justify-content: center; /* 水平居中 */
      align-items: center;
      // .text{
      //   mix-blend-mode: difference;
      // }
    }
  }
}
</style>
