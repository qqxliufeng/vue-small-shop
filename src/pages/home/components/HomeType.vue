<template>
    <div class="home-type-container">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(items, slideIndex) of slideItems" :key="slideIndex">
                <div class="h-t-type-container">
                    <div v-for="(item, index) of items" :key="index" class="h-t-type-wrapper" @click="homeTypeClick(index)">
                        <img :src="item.icon" class="h-t-type-icon">
                        <p class="h-t-type-title">{{item.name}}</p>
                    </div>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination" v-if="items.length > 8"></div>
        </swiper>
    </div>
</template>

<script>
import imgIcon from 'images/img_h_t_ticket.png'
export default {
  name: 'homeType',
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      items: [
        {
          icon: imgIcon,
          name: '景区门票'
        },
        {
          icon: imgIcon,
          name: '景区门票'
        },
        {
          icon: imgIcon,
          name: '景区门票'
        },
        {
          icon: imgIcon,
          name: '景区门票'
        },
        {
          icon: imgIcon,
          name: '景区门票'
        },
        {
          icon: imgIcon,
          name: '景区门票'
        },
        {
          icon: imgIcon,
          name: '景区门票'
        },
        {
          icon: imgIcon,
          name: '景区门票'
        },
        {
          icon: imgIcon,
          name: '景区门票'
        },
        {
          icon: imgIcon,
          name: '景区门票'
        }
      ]
    }
  },
  computed: {
    slideItems () {
      const pages = []
      this.items.forEach((element, index) => {
        let page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(element)
      })
      return pages
    }
  },
  methods: {
    homeTypeClick (index) {
      this.$router.push({name: 'scenicList'})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.home-type-container
    height 0
    width 100%
    padding-bottom 54%
    overflow hidden
    .swiper-container
        & >>> .swiper-pagination-bullets
            bottom 0px
        & >>> .swiper-pagination-bullet
            width 6px
            height 6px
        & >>> .swiper-pagination-bullet-active
            background-color $primary
        .h-t-type-container
            padding-bottom .2rem
            overflow hidden
            .h-t-type-wrapper
                text-align center
                float left
                width 25%
                margin-top rem(.3)
                .h-t-type-icon
                    width rem(1)
                    object-fit cover
                .h-t-type-title
                    normalTextStyle(#333, .2)
                    margin-top rem(.2)
</style>
