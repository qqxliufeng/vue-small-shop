<template>
    <div class="s-d-header-container" >
        <div :style="{ 'background-color': scrollTop == 0 ? '#000' : 'transparent'}" @click="back">
            <span class="iconfont" :style="{'color': scrollTop == 0 ? '#fff' : '#000'}">&#xe625;</span>
        </div>
        <div :style="{ 'background-color': scrollTop == 0 ? '#000' : 'transparent', 'display' : isShowCollection ? 'block' : 'none'}">
            <span
            :class="[ favorites ? 'el-icon-star-on' : 'el-icon-star-off' ]"
            :style="{'color': scrollTop == 0 ? '#fff' : '#000'}"
            @click="collection"
            v-if="isShowCollection"></span>
        </div>
        <div :style="opacityStyle"></div>
        <span class="header-title" :style="opacityStyle">{{scenicInfo.title}}</span>
    </div>
</template>

<script>
export default {
  name: 'scenicDetailHeader',
  props: {
    scenicInfo: Object,
    isFavorites: Number,
    isShowCollection: {
      type: Boolean,
      default: true
    },
    scrollTop: {
      type: Number,
      default: 0
    }
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
      return this.isFavorites === 1
    }
  },
  watch: {
    scrollTop (newVal) {
      if (newVal > 1) {
        let opacity = 10 / newVal
        opacity = Math.min(1, opacity)
        this.opacityStyle.opacity = 1 - opacity
      }
      if (newVal === 0) {
        this.opacityStyle.opacity = 0
      }
    }
  },
  methods: {
    collection () {
      this.$emit('collection')
    },
    back () {
      this.$emit('back')
    }
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
        background-color transparent
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
    .header-title
        position absolute
        top 0
        left 0
        right 0
        text-align center
        line-height $headerHeight
        color #333
        font-size rem(.3)
</style>
