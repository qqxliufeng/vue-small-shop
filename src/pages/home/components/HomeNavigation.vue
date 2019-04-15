<template>
    <div>
      <transition name="slide-fade">
        <div class="h-n-navi-container" v-show="show">
          <span class="h-n-navi-item" @click="startLogin">{{loginTip}}</span>
          <div class="sperator-line">|</div>
          <span class="h-n-navi-item" @click="startMine">{{personCenterTip}}</span>
          <div class="sperator-line">|</div>
          <span class="h-n-navi-item" @click="startCustomService">联系客服</span>
        </div>
      </transition>
      <confirm-dialog content="是否要退出当前账号？" @dialogConfirm="confirmLogout" ref="homeConfirmDialog"></confirm-dialog>
    </div>
</template>

<script>
import ConfirmDialog from 'common/components/confirm-dialog'
export default {
  name: 'homeNavi',
  components: {
    ConfirmDialog
  },
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
    },
    personCenterTip () {
      return this.$root.userInfo.isLogin() ? '[' + this.$utils.common.hiddenMobile(this.$root.userInfo.state.phone) + ']' : '个人中心'
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
        this.$refs.homeConfirmDialog.showDialog()
      } else {
        this.$router.push({name: 'login'})
      }
    },
    startMine () {
      this.$router.push({name: 'personal', params: {backName: 'personal'}})
    },
    startCustomService () {
      this.$router.push({name: 'customService'})
    },
    confirmLogout () {
      this.$root.userInfo.clearInfoAction()
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
