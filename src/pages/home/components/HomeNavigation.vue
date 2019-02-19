<template>
    <transition name="slide-fade">
      <div class="h-n-navi-container" v-show="show">
        <span class="h-n-navi-item">首页</span>
        <div class="sperator-line">|</div>
        <span class="h-n-navi-item">会员登录</span>
        <div class="sperator-line">|</div>
        <span class="h-n-navi-item">个人中心</span>
        <div class="sperator-line">|</div>
        <span class="h-n-navi-item">联系客服</span>
      </div>
    </transition>
</template>

<script>
export default {
  name: 'homeNavi',
  data () {
    return {
      i: 0,
      show: true
    }
  },
  methods: {
    handleScroll (target) {
      // 页面滚动距顶部距离
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let scroll = scrollTop - this.i
      this.i = scrollTop
      if (Math.abs(scroll) > 10) {
        if (scroll < 0) {
          // console.log('1up')
          if (!this.show) {
            this.show = true
            // console.log('2up')
          }
        } else {
          // console.log('1down')
          if (this.show) {
            this.show = false
            // console.log('2down')
          }
        }
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.slide-fade-enter-active, .slide-fade-leave-active
    transition all .3s
.slide-fade-enter, .slide-fade-leave-to
    transform translateY($headerHeight)
.h-n-navi-container
    position fixed
    left 0
    right 0
    bottom 0
    overflow hidden
    display flex
    height $headerHeight
    line-height $headerHeight
    background-color #ffffff
    border-top #f5f5f5 solid .02rem
    z-index 998
    .h-n-navi-item
        flex 1
        text-align center
        normalTextStyle($primary, .3)
        line-height $headerHeight
    .sperator-line
        color #333333
.test-click
  position fixed
  bottom 1rem
  left 0
  right 0
</style>
