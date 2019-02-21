<template>
    <div class="s-d-images-container">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) of imageList" :key="index">
                <img :src="item" class="s-d-images-item">
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
export default {
  name: 'scenicDetailImages',
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
        'http://pic36.photophoto.cn/20150812/0033033907240876_b.jpg'
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.s-d-images-container
    height 0
    padding-bottom 50%
    overflow hidden
    .s-d-images-item
        width 100%
        height 100%
        object-fit cover
</style>
