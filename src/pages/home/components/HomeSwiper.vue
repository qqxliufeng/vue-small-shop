<template>
    <div class="h-s-container">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(item,index) of imageList" :key="index">
                <img :src="item" class="h-s-img">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
export default {
  name: 'homeSwiper',
  data () {
    return {
      swiperOption: {
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      },
      imageList: [
        'http://pic36.photophoto.cn/20150812/0033033907240876_b.jpg',
        'http://img1.3lian.com/img013/v5/21/d/84.jpg',
        'http://pic2.16pic.com/00/05/01/16pic_501154_b.jpg',
        'http://img15.3lian.com/2015/f2/57/d/93.jpg'
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.h-s-container
    overflow hidden
    width 100%
    padding-bottom 40%
    height 0
    .h-s-img
        width 100%
        height 100%
        object-fit cover
</style>
