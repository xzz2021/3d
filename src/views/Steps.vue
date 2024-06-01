<!--
 * new page
 * @author: zhaoyahui
 * @since: 2024-05-31
 * Steps.vue
-->
<template>
  <div class="step_container">
    <el-steps :active="2" align-center class="step_item">
      <el-step title="上传图纸" description="" />
      <el-step title="购物车结算" description="" />
      <el-step title="提交订单" description="" />
      <el-step title="支付" description="" />
    </el-steps>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.step_container {
  text-align: right;
  text-align: -webkit-right;
  .step_item {
    transform: scale(0.8); /* 缩小到80% */
    transform-origin: top right; /* 缩放的原点位置 */
    max-width: 700px;
  }
}

:deep(.el-upload-dragger) {
  background-color: aqua;
}
</style>
