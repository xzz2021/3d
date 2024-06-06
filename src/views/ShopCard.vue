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
        <p>当前选中产品: {{ productNum }}件, 数量: {{ sum }}个</p>
        <p>价格总计 : {{ totalPrice }}元</p>
        <div>
          <el-button color="#409eff" size="large">加入购物车</el-button>
          <el-button color="#d72242" size="large" style="width: 110px">去结算</el-button>
        </div>
        <p>预计发货时间: 2024-06-01 前发货</p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useShopStore } from "@/pinia/shopTable.js"
import { computed } from "vue"
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useShopStore()

const { totalPrice, sum, productNum } = storeToRefs(store)
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
