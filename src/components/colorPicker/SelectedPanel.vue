<template>
  <div class="containerCheckBox">
    <div class="list_box">
      <!-- <p>{{ colorType == "c" ? "亮光" : "哑光" }}:</p> -->
      <el-badge :value="addList.length" class="item" :show-zero="false" style="margin: 0 24px 0 5px">
        <el-button class="titleBtn" type="primary">
          {{ colorType == "c" ? "亮 光 C" : "哑 光 U" }}
        </el-button>
      </el-badge>
      <el-scrollbar :always="true">
        <div class="containe_box">
          <div v-if="addList.length == 0" class="placeholder_container">
            <div class="placeholder_box" v-for="item in 6"></div>
          </div>
          <div v-for="item in addList" :key="item">
            <el-tooltip class="box-item" :content="item.pantone" placement="top">
              <div class="item_box" :style="{ 'background-color': item.hex }">
                <div class="close_btn" @click="deleteItem(item)">
                  <el-icon><Delete /></el-icon>
                </div>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup>
import { Delete } from "@element-plus/icons-vue"

const props = defineProps({
  colorType: {
    type: String,
    default: "c",
  },
  addList: {
    type: Array,
    default: [],
  },
})

const emit = defineEmits(["deleteItem"])

// // 删除已选择的颜色
const deleteItem = item => {
  // 调用父组件更新props数据
  emit("deleteItem", item)
}
</script>

<style lang="scss" scoped>
.containerCheckBox {
  width: 350px;
  .list_box {
    // width: 200px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    .containe_box {
      // overflow: auto;
      // width: 200px;
      display: flex;
      .placeholder_container {
        // width: 200px;
        display: flex;
        // justify-content: space-evenly;
        .placeholder_box {
          // width: 30px;
          // height: 30px;
          border: 1px solid #ccc;
          width: 28px;
          height: 28px;
          margin: 10px 5px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          border-radius: 4px;
          // position: relative;
        }
      }
      .item_box {
        cursor: pointer;
        width: 30px;
        height: 30px;
        margin: 10px 5px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        border-radius: 4px;
        position: relative;
        box-sizing: content-box;
        &:hover .close_btn {
          display: block;
          // background-color: rgb(16, 240, 146);
        }
        .text {
        }
        .close_btn {
          // position: absolute;
          // right: 2px;
          // top: -1px;
          // text-align: center;
          // font-size: 8px;
          // color: white;
          display: none;
          position: absolute;
          top: 0px;
          text-align: center;
          font-size: 16px;
          color: white;
          background: #4e64758a;
          padding: 5px 7px;
          border-radius: 4px;
          &:hover {
            // color: red;
          }
        }
      }
    }
  }
  .tips_box {
    font-size: 10px;
  }
}
</style>
