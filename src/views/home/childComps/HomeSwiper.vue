<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners"  :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
    import {Swiper,SwiperItem} from 'components/common/swiper'


    export default {
        name: "HomeSwiper",
      props:{
          banners:{
            type : Array,
            default(){
              return []
            }
          }
      },
      data(){
          return{
            isLoad : false
          }
      },
      components: {
          SwiperItem,
          Swiper
        },
      methods:{
          imageLoad(){
            if(!this.Load){
              this.isLoad = true
              this.$emit('swiperImgLoad')
            }
          }
      }
    }

</script>

<style scoped>

</style>
