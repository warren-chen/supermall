<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goodList" :goods-item="item" :key="index"></goods-list-item>
  </div>
</template>

<script>
    import GoodsListItem from "./GoodsListItem";

    export default {
        name: "GoodsList",
      components: {GoodsListItem},
      props : {
          goodList : {
            type : Array,
            default(){
              return []
            }
          }
        }
    }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>
