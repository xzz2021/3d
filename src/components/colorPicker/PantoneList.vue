<!--
 * new page
 * @author: xzz2021
 * @since: 2024-06-03
 * PantoneList.vue
-->
<template>
  <div class="container">
    <div class="color_list_box">
      <div class="cBox">
        <div class="list_box">
          <div
            class="item_box"
            v-for="item in colorList.pantoneC"
            :key="item"
            @click="pushColor(item)"
            :style="{ 'background-color': item.hex }"
          >
            <p
              class="text"
              :style="{
                color: getHighContrastColor(item.rgb),
                fontSize: changeFontSize(item.pantone),
                lineHeight: changeLineHeight(item.pantone),
              }"
            >
              {{ item.pantone }}
            </p>
          </div>
        </div>
        <el-button type="primary">亮 光 C</el-button>
      </div>
      <div class="uBox">
        <div class="list_box">
          <div
            class="item_box"
            v-for="item in colorList.pantoneU"
            :key="item"
            @click="pushColor(item)"
            :style="{ 'background-color': item.hex }"
          >
            <p
              class="text"
              :style="{
                color: getHighContrastColor(item.rgb),
                fontSize: changeFontSize(item.pantone),
                lineHeight: changeLineHeight(item.pantone),
              }"
            >
              {{ item.pantone }}
            </p>
          </div>
        </div>
        <el-button class="titleBtn" type="primary" color="#1e22aa">哑 光 U</el-button>
      </div>
    </div>

    <div class="color_select_box">
      <p style="margin: 0 30px 0 5px">潘通色号:</p>
      <el-select
        v-model="selectValue"
        value-key="pantone"
        filterable
        placeholder="选择颜色"
        style="width: 200px"
        no-data-text="暂无数据"
        @change="selectColor"
        remote
        remote-show-suffix
        :remote-method="remoteMethod"
        :loading="loading"
        loading-text="正在搜索"
      >
        <el-option v-for="item in options" :key="item.pantone" :label="item.pantone" :value="item" />
      </el-select>
    </div>
  </div>
</template>

<script setup>
import { pantoneColors } from "../../utils/calculateColor"

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
  colorList: {
    type: Object,
    default: {
      pantoneC: [
        {
          hex: "#FF3EB5",
          rgb: [255, 62, 181],
          pantone: "806 C",
        },
        {
          hex: "#FF7276",
          rgb: [255, 114, 118],
          pantone: "805 C",
        },
        {
          hex: "#FFAA4D",
          rgb: [255, 170, 77],
          pantone: "804 C",
        },
        {
          hex: "#FFE900",
          rgb: [255, 233, 0],
          pantone: "803 C",
        },
        {
          hex: "#44D62C",
          rgb: [68, 214, 44],
          pantone: "802 C",
        },
      ],
      pantoneU: [
        {
          hex: "#FF48B0",
          rgb: [255, 72, 176],
          pantone: "806 U",
        },
        {
          hex: "#FF7477",
          rgb: [255, 116, 119],
          pantone: "805 U",
        },
        {
          hex: "#FFAA52",
          rgb: [255, 170, 82],
          pantone: "804 U",
        },
        {
          hex: "#FFE916",
          rgb: [255, 233, 22],
          pantone: "803 U",
        },
        {
          hex: "#3BD23D",
          rgb: [59, 210, 61],
          pantone: "802 U",
        },
        {
          hex: "#009CCD",
          rgb: [0, 156, 205],
          pantone: "801 U",
        },
        {
          hex: "#9D9994",
          rgb: [157, 153, 148],
          pantone: "Black 0961 U",
        },
        {
          hex: "#78E6D0",
          rgb: [120, 230, 208],
          pantone: "Green 0921 U",
        },
      ],
    },
  },
})

const emit = defineEmits(["changeColor2", "changeColor"])

const pushColor = color => {
  emit("changeColor2", color)
}

const selectColor = item => {
  selectValue.value = item

  // 选择颜色后 触发 列表更新
  // 此处颜色值需要转换
  const getRgb = item.rgb
  const r = getRgb[0]
  const g = getRgb[1]
  const b = getRgb[2]

  emit("changeColor", { rgb: { r, g, b } })
}

const options = ref([])
const selectValue = ref([])
const loading = ref(false)
// 将remoteMethod改造为支持防抖

let timer = null

const remoteMethod = query => {
  if (query) {
    loading.value = true
    // 做防抖处理
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      loading.value = false
      options.value = pantoneColors.filter(item => {
        return item.pantone.toLowerCase().includes(query.toLowerCase())
        // return item.pantone.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase())
      })
      console.log("🚀 ~ file: PantoneList.vue:125 ~ options.value:", options.value)
    }, 800)
  } else {
    options.value = []
  }
}

// const changeSelectColor = color => {
//   // console.log("🚀 ~ file: PantoneList.vue:178 ~ color:", color)
//   // selectValue.value = color
//   emit("changeColor2", color)
// }
// defineExpose({ changeSelectColor })
const getHighContrastColor = color => {
  const [R, G, B] = color.map(channel => {
    const proportion = channel / 255
    return proportion <= 0.03928 ? proportion / 12.92 : Math.pow((proportion + 0.055) / 1.055, 2.4)
  })
  const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B
  // console.log("🚀 ~ file: PantoneList.vue:197 ~ luminance:", luminance)
  return luminance > 0.5 ? "#000000" : "#FFFFFF"
  // if (luminance > 0.7 || luminance < 0.3) {
  //   return "#000000"
  // } else {
  //   return "#FFFFFF"
  // }
}

const changeFontSize = text => {
  return text.length > 9 ? "11px" : ""
}

const changeLineHeight = text => {
  // return text.length > 7 ? "11px" : ""
  return text.length > 10 ? "1" : ""
}
</script>

<style lang="scss" scoped>
.color_select_box {
  display: flex;
  align-items: center;
  margin-top: 8px;
  // justify-content: space-between;
}
.color_list_box {
  display: flex;
  align-items: center;

  .cBox,
  .uBox {
    text-align: center;
    button {
      width: 138px;
      margin: 5px 0;
    }
  }
  // width: 306px;
  .list_box {
    width: 150px;
    height: 260px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    // border: 1px solid black;
    // margin-top: 10px;
    margin-top: -5px;
    .item_box {
      // color: black;
      cursor: pointer;
      width: 60px;
      height: 40px;
      // line-height: 40px;
      margin: 5px;
      font-size: small;
      border: 1px solid #03a9f3;
      .text {
      }
    }
  }
}
:deep(.el-select__suffix) {
  display: none;
}
</style>
