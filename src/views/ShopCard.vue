<!--
 * new page
 * @author: xzz2021
 * @since: 2024-06-01
 * ShopCard.vue
-->
<template>
  <div class="shop_card">
    <el-card>
      <div class="shop_box">
        <p>
          当前选中产品:
          <span style="color: red; font-weight: 600">{{ productNum }}</span>
          件, 数量:
          <span style="color: red; font-weight: 600">{{ sum }}</span>
          个
        </p>
        <p>
          价格总计 :
          <span style="color: red; font-weight: 600">{{ totalPrice }}</span>
          元
        </p>
        <!-- <div> -->
        <el-button color="#409eff" size="large" :icon="Goods" style="color: aliceblue" @click="goToCheckout">去结算</el-button>
        <!-- <el-button color="#d72242" size="large" style="width: 110px">去结算</el-button> -->
        <!-- </div> -->
        <p>预计发货时间: 2024-06-01 前发货</p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useShopStore } from "@/pinia/shopTable.js"
import { Goods } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useShopStore()

const { totalPrice, sum, productNum } = storeToRefs(store)

const goToCheckout = () => {
  if (totalPrice.value == 0) {
    return ElMessage.error("当前购物车为空,请添加产品后再结算!")
  }
  window.location.href = window.location.origin + "/shop/cart"
}
</script>

<style lang="scss" scoped>
.shop_box {
  height: 232px;
  min-width: 234px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  p {
    font-size: 13px;
  }
}
</style>
