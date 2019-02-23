<template>
    <div class="h-s-container">
        <swiper :options="swiperData">
            <swiper-slide v-for="(item,index) of imageList" :key="index">
                <div @click="startScenicDetail">
                  <img :src="item" class="h-s-img">
                </div>
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
      swiperOptionSlide: {
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      },
      swiperOptionNoSlide: {
        loop: false
      },
      imageList: [
        'http://pic36.photophoto.cn/20150812/0033033907240876_b.jpg'
      ]
    }
  },
  computed: {
    swiperData () {
      if (this.imageList.length > 1) {
        return this.swiperOptionSlide
      } else {
        return this.swiperOptionNoSlide
      }
    }
  },
  methods: {
    startScenicDetail () {
      console.log('2222222')
      this.$router.push({name: 'scenicDetail'})
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
