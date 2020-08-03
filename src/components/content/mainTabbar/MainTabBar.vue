<template>
  <div>
    <tar-bar>
      <tab-bar-item path="/home" >
        <img src="~assets/img/tabbar/home.svg"  slot="item-slot">
        <img src="~assets/img/tabbar/home_active.svg" slot="item-slot-a">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" >
        <img src="~assets/img/tabbar/category.svg"  slot="item-slot">
        <img src="~assets/img/tabbar/category_active.svg" slot="item-slot-a">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" >
        <img src="~assets/img/tabbar/shopcart.svg"  slot="item-slot">
        <img src="~assets/img/tabbar/shopcart_active.svg" slot="item-slot-a">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" >
        <img src="~assets/img/tabbar/profile.svg"  slot="item-slot">
        <img src="~assets/img/tabbar/profile_active.svg" slot="item-slot-a">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tar-bar>
  </div>
</template>

<script>

  import TarBar from "components/common/tabbar/TarBar";
  import TabBarItem from "components/common/tabbar/TabBarItem";

    export default {
        name: "MainTabBar",
        components:{
          TarBar ,TabBarItem
        }
    }
</script>

<style scoped>

</style>
