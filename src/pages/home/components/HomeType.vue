<template>
    <div class="home-type-container">
        <swiper :options="swiperOption" v-if="list">
            <swiper-slide v-for="(items, slideIndex) of slideItems" :key="slideIndex">
                <div class="h-t-type-container">
                    <div v-for="item of items" :key="item.id" class="h-t-type-wrapper" @click="homeTypeClick(item)">
                        <img :src="$utils.image.getImagePath(item.image)" class="h-t-type-icon" :key="item.image">
                        <p class="h-t-type-title">{{item.name}}</p>
                    </div>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination" v-if="list.length > 8"></div>
        </swiper>
    </div>
</template>

<script>
export default {
  name: 'homeType',
  props: {
    list: Array
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  computed: {
    slideItems () {
      const pages = []
      this.list.forEach((element, index) => {
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
    homeTypeClick (item) {
      this.$router.push({name: 'scenicList', query: {categoryId: item.id}})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.home-type-container
    width 100%
    max-height 50vw
    overflow hidden
    border-top 1px solid #f5f5f5
    border-bottom #f5f5f5 solid rem(.2)
    .swiper-container
        & >>> .swiper-pagination-bullets
            bottom 1px
        & >>> .swiper-pagination-bullet
            width 6px
            height 6px
        & >>> .swiper-pagination-bullet-active
            background-color $primary
        .h-t-type-container
            overflow hidden
            .h-t-type-wrapper
                text-align center
                float left
                width 20%
                height 25vw
                padding-top rem(.25)
                box-sizing border-box
                .h-t-type-icon
                    width rem(.9)
                    height rem(.9)
                    background-color #f5f5f5
                    border-radius 50%
                    object-fit cover
                .h-t-type-title
                    normalTextStyle(#333, .25)
                    margin-top rem(.2)
                    ellipsis()
</style>
