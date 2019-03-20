<template>
    <div class="h-s-container">
        <swiper :options="swiperData">
            <swiper-slide v-for="item of imageList" :key="item.id">
                <div @click="startScenicDetail">
                  <img v-lazy="getImagePath(item.image)" :src="item" class="h-s-img">
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
export default {
  name: 'homeSwiper',
  props: {
    list: Array
  },
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
      }
    }
  },
  computed: {
    swiperData () {
      if (this.imageList.length > 1) {
        return this.swiperOptionSlide
      } else {
        return this.swiperOptionNoSlide
      }
    },
    imageList () {
      return this.list
    }
  },
  methods: {
    startScenicDetail () {
      this.$router.push({name: 'scenicDetail'})
    },
    getImagePath (path) {
      return this.$utils.image.getImagePath(this, path)
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
