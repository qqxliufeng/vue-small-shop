<template>
    <div class="s-d-header-container" >
        <div :style="{ 'background-color': top == 0 ? '#000' : 'transparent'}" @click="back">
            <span class="iconfont" :style="{'color': top == 0 ? '#fff' : '#000'}">&#xe625;</span>
        </div>
        <div :style="{ 'background-color': top == 0 ? '#000' : 'transparent'}">
            <span
            :class="[ favorites ? 'el-icon-star-on' : 'el-icon-star-off' ]"
            :style="{'color': top == 0 ? '#fff' : '#000'}"
            @click="collection"></span>
        </div>
        <div :style="opacityStyle"></div>
    </div>
</template>

<script>
export default {
  name: 'scenicDetailHeader',
  props: {
    scenicInfo: Object
  },
  data () {
    return {
      opacityStyle: {
        opacity: 0
      },
      top: 0
    }
  },
  computed: {
    tempInfo () {
      return this.scenicInfo
    },
    favorites () {
      return this.tempInfo !== null && this.tempInfo.isFavorites === 1
    }
  },
  methods: {
    handlerScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.top = scrollTop
      if (scrollTop > 1) {
        let opacity = 43 / scrollTop
        opacity = Math.min(1, opacity)
        this.opacityStyle.opacity = 1 - opacity
      }
      if (scrollTop === 0) {
        this.opacityStyle.opacity = 0
      }
    },
    collection () {
      if (this.$root.userInfo.isLogin()) {
        this.$http(this.$urlPath.userUnFavoroteScenicUrl, {
          scenic_id: this.$parent.scenicId
        }, '', (data) => {
          if (this.favorites) {
            this.$toast('取消收藏成功')
            this.tempInfo.isFavorites = 0
          } else {
            this.$toast('收藏成功')
            this.tempInfo.isFavorites = 1
          }
        }, (errorCode, error) => {
          this.$toast(error)
        })
      } else {
        this.$router.push({name: 'login'})
      }
    },
    back () {
      this.$emit('back')
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handlerScroll, true)
  },
  unmounted () {
    window.removeEventListener('scroll', this.handlerScroll)
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-d-header-container
    position fixed
    top 0
    left 0
    right 0
    height $headerHeight
    overflow hidden
    z-index 999
    & div:nth-child(1)
        position absolute
        top 0
        left 0
        margin-left rem(.2)
        transform translateY(rem(.1))
        // background-color #000000
        opacity .5
        display inline-block
        background-color transparentify
        width rem(.66)
        height rem(.66)
        border-radius 50%
        text-align center
        z-index 998
        & span
            display inline-block
            color #ffffff
            padding-left rem(.13)
            margin-top rem(.13)
            font-size rem(.4)
    & div:nth-child(2)
        position absolute
        top 0
        right 0
        margin-right rem(.2)
        transform translateY(rem(.1))
        background-color #000000
        opacity .5
        display inline-block
        width rem(.66)
        height rem(.66)
        border-radius 50%
        text-align center
        z-index 998
        & span
            display inline-block
            color #ffffff
            margin-top rem(.13)
            font-size rem(.4)
    & div:nth-child(3)
        background-color #f5f5f5
        height 100%
</style>
