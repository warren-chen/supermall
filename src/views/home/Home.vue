<template>
  <div id="home">
    <navbar class="home-nav"><template v-slot:center>购物车</template></navbar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadmore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
                   ref="tabControl2" ></tab-control>
      <goods-list :goodList="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
    import Navbar from "components/common/navbar/Navbar";
    import TabControl from "components/content/tabControl/TabControl";

    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";
    import GoodsList from "components/content/goods/GoodsList";
    import BackTop from "components/content/BackTop/BackTop";

    import {getHomeMultidata,getHomeGoods} from "../../network/home";
    import Scroll from "../../components/common/scroll/Scroll";
    import {deBounce} from "common/utils";

    export default {
        name: "Home",
      components :{
        BackTop,
        Scroll,
        GoodsList,
        TabControl,
        FeatureView,
        RecommendView,
        HomeSwiper,
          Navbar
      },
      data(){
          return{
            banners : [],
            recommends : [],
            goods : {
              'pop' :   {page : 0,list : []},
              'new' : {page : 0,list : []},
              'sell' : {page : 0,list : []},
            },
            currentType : 'pop',
            isShowBackTop : false,
            tabOffsetTop : 0,
            isTabFixed : false,
            saveY : 0
          }
      },
      created() {

          this.getHomeMultidata()

          this.getHomeGoods('pop')
          this.getHomeGoods('new')
          this.getHomeGoods('sell')


      },
      mounted() {

          const refresh = deBounce(this.$refs.scroll.refresh,400)
        //监听item中img的刷新
        this.$bus.$on('itemImageLoad',() =>{
          refresh()
        })

      },
      methods:{

          /*
          网络请求相关的方法
           */
          getHomeMultidata(){
            //请求多个数据
            getHomeMultidata().then(res =>{
              //console.log(res)
              this.banners = res.data.banner.list;
              this.recommends = res.data.recommend.list;

            })
          },

          getHomeGoods(type){
            const page = this.goods[type].page + 1
            getHomeGoods(type,page).then(res =>{
              this.goods[type].list.push(...res.data.list)
              this.goods[type].page += 1

              this.$refs.scroll.finishPullUp()
            })

          },

          /*
          事件监听相关的方法
           */
        tabClick(index){
          switch(index){
            case 0:
              this.currentType = 'pop'
                  break
            case 1:
              this.currentType = 'new'
                  break
            case 2:
              this.currentType = 'sell'
                  break
          }
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;
        },
        backClick() {
          this.$refs.scroll.scrollTo(0,0)
        },
        contentScroll(position){
          //position.y >1000,判断BackTop是否显示
          this.isShowBackTop = (-position.y) > 1000

          //决定tabControl是否吸顶(position : fixed)
          this.isTabFixed = (-position.y) > this.tabOffsetTop
        },
        loadmore(){
          this.getHomeGoods(this.currentType)
        },
        swiperImgLoad(){
          //获取tabControl的offsetTop
          //所有的组件都有一个属性$el:用于获取组件的元素
          console.log(this.$refs.tabControl2.$el.offsetTop)
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        }
      },
      computed:{
          showGoods(){
            return this.goods[this.currentType].list
          }

      },
      activated() {
        this.$refs.scroll.refresh()
          this.$refs.scroll.scrollTo(0,this.saveY,0)

      },
      deactivated() {
          this.saveY = this.$refs.scroll.getScrollY()
      }

    }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    /*padding-bottom: 1000px;*/
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /*在使用浏览器原生滚动时，为了使它不跟着滚动*/
    /*position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }

  /*.tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  }*/

  .content{
    /*height : calc(100vh - 93px);*/
   overflow: hidden;

    position: absolute;
    top : 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*.fixed{
    position: fixed;
    top : 44px;
    left: 0;
    right: 0;
  }*/

  .tab-control{
    position: relative;
    z-index: 9;
  }

</style>
