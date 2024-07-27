<script setup>
import Upload from "@views/Upload.vue"
import ShopCard from "@views/ShopCard.vue"
import NewTable from "@views/NewTable.vue"
import Table from "@views/Table.vue"
</script>

<template>
  <!-- <Table /> -->
  <div class="newApp_box">
    <div class="left_box">
      <NewTable />
      <Upload />
    </div>
    <div class="right_box">
      <ShopCard />
    </div>
  </div>
</template>

<style scoped lang="scss">
.newApp_box {
  display: flex;
  // height: 900px;
  .left_box {
    padding-right: 1px;
    flex: 2;
    margin-right: 90px;
    min-width: 530px;
    height: 900px;
    overflow-y: scroll;
    // background: darkblue;
    // border: 1px solid rgb(252, 57, 57);

    &::-webkit-scrollbar {
      width: 8px;
      height: 10px;
      /**/
    }
    &::-webkit-scrollbar-track {
      background: rgb(239, 239, 239);
      border-radius: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background: #e6e6e6;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #b3b3b3;
    }
    &::-webkit-scrollbar-corner {
      background: #179a16;
    }
  }
  .right_box {
    flex: 1.1;
    // border: 1px solid rgb(157, 255, 44);
    // background: rgb(19, 218, 52);
  }
}
</style>
