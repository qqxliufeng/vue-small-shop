<template>
    <div class="h-h-header-container">
      <div :style="opacityStyle" class="header-bg"></div>
      <div class="h-h-header-wrapper">
        <span class="h-h-header-title" :style="colorStyle">济南<i class="el-icon-arrow-down"></i></span>
        <span class="h-h-header-search" @click="startSearch"><i class="el-icon-search"></i>搜索景点、关键字</span>
        <span class="iconfont h-h-header-mine" :style="colorStyle">&#xe8a0;</span>
      </div>
    </div>
</template>
<script>
export default {
  name: 'homeHeader',
  props: {
    scrollTop: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  },
  computed: {
    opacityStyle () {
      let opacity = 0
      if (this.scrollTop > 0) {
        opacity = Math.min(1, this.scrollTop / 140)
      }
      return {
        opacity
      }
    },
    colorStyle () {
      return { color: this.scrollTop === 0 ? '#fff' : '#000' }
    }
  },
  methods: {
    startSearch () {
      this.$router.push({name: 'homeSearch'})
    },
    handleScroll (target) {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.mTop = scrollTop
      if (scrollTop > 0) {
        let opacity = scrollTop / 140
        opacity = Math.min(1, opacity)
        this.opacityStyle.opacity = opacity
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.h-h-header-container
    position fixed
    top 0
    left 0
    right 0
    z-index 999
    height rem($headerHeight)
    .h-h-header-wrapper
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        display flex
        padding .1rem .2rem
        align-items center
        overflow hidden
        z-index 998
        .h-h-header-title
            min-width rem(.5)
            ellipse()
            normalTextStyle(#333, .3)
            margin-right rem(.2)
            & i
                margin-left .1rem
        .h-h-header-search
            flex 1
            background-color #dddddd
            border-radius rem(.1)
            normalTextStyle(#888, .25)
            height rem(.6)
            line-height rem(.6)
            text-align center
            opacity .5
            & i
              font-size rem(.3)
              margin-right rem(.15)
        .h-h-header-mine
            normalTextStyle(#333, .45)
            margin-left rem(.2)
    .header-bg
        height 100%
        background-color #f5f5f5
</style>
