<template>
    <div>
       <home-header :scrollTop="mScrollTop"></home-header>
       <div ref="homeContent" class="h-content">
          <home-swiper></home-swiper>
          <home-notice></home-notice>
          <home-type></home-type>
          <div class="sperator-line-height"></div>
          <div class="h-h-title">人气推荐</div>
          <home-hot></home-hot>
          <div class="h-h-ad-wrapper">
            <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2079932039,2403444542&fm=27&gp=0.jpg" @click="adClick">
          </div>
          <div class="h-h-title">猜你喜欢</div>
          <home-like></home-like>
        </div>
        <home-navi :scrollTop="mScrollTop"></home-navi>
    </div>
</template>
<script>
import HomeHeader from './components/HomeHeader'
import HomeSwiper from './components/HomeSwiper'
import HomeType from './components/HomeType'
import HomeHot from './components/HomeHot'
import HomeLike from './components/HomeLike'
import HomeNavi from './components/HomeNavigation'
import HomeNotice from './components/HomeNotice'
export default {
  name: 'home',
  props: ['nameId'],
  components: {
    HomeHeader,
    HomeSwiper,
    HomeType,
    HomeHot,
    HomeLike,
    HomeNavi,
    HomeNotice
  },
  data () {
    return {
      mScrollTop: 0,
      isFirstLoad: true
    }
  },
  methods: {
    handleScroll (target) {
      this.mScrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (this.isFirstLoad) {
        document.body.scrollTop = 0
        this.isFirstLoad = false
      }
    },
    adClick () {
      // this.$router.push({name: 'adsDetail'})
      this.$loading('1223')
    },
    autoLogin () {
      if (!this.$root.userInfo.isLogin()) {
        let state = this.$root.state
        if (state.token) {
          this.$http(this.$urlPath.userInfoLoginUrl, null, null, (data) => {
            console.log(data)
          }, null)
        } else {
          console.log('不能登录')
        }
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
    // this.autoLogin()
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.h-content
    .sperator-line-height
        horizontalLine(#f5f5f5, .2)
    .h-h-title
        normalTextStyle(#333, .32)
        padding rem(.2) rem(.1)
        border-bottom #f5f5f5 solid rem(.02)
        margin 0 rem(.2)
    .h-h-ad-wrapper
        height rem(2)
        border-top #f5f5f5 solid rem(.2)
        border-bottom #f5f5f5 solid rem(.2)
        & img
            width 100%
            height 100%
            object-fit cover
</style>
