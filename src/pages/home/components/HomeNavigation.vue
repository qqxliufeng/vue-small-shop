<template>
    <transition name="slide-fade">
      <div class="h-n-navi-container" v-show="show">
        <span class="h-n-navi-item">首页</span>
        <div class="sperator-line">|</div>
        <span class="h-n-navi-item" @click="startLogin">{{loginTip}}</span>
        <div class="sperator-line">|</div>
        <span class="h-n-navi-item" @click="startMine">个人中心</span>
        <div class="sperator-line">|</div>
        <span class="h-n-navi-item" @click="startCustomService">联系客服</span>
      </div>
    </transition>
</template>

<script>
export default {
  name: 'homeNavi',
  props: {
    scrollTop: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      show: true,
      top: 0
    }
  },
  computed: {
    loginTip () {
      return this.$root.userInfo.isLogin() ? '退出' : '登录'
    }
  },
  watch: {
    scrollTop () {
      let scroll = this.scrollTop - this.top
      this.top = this.scrollTop
      if (Math.abs(scroll) > 10) {
        if (scroll < 0) {
          if (!this.show) {
            this.show = true
          }
        } else {
          if (this.show) {
            this.show = false
          }
        }
      }
      return this.show
    }
  },
  methods: {
    startLogin () {
      if (this.$root.userInfo.isLogin()) {
        let confirm = window.confirm('是否要退出登录？')
        if (confirm) {
          this.$root.userInfo.clearInfoAction()
        }
      } else {
        this.$router.push({name: 'login'})
      }
    },
    startMine () {
      this.$router.push({name: 'personal'})
    },
    startCustomService () {
      this.$router.push({name: 'customService'})
    }
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
