<template>
    <div>
       <home-header :scrollTop="mScrollTop"></home-header>
       <div ref="homeContent" class="h-content" id="#home">
          <home-swiper :list="swiperList"></home-swiper>
          <!-- <home-notice></home-notice> -->
          <home-type :list="categoryList"></home-type>
          <div class="sperator-line-height"></div>
          <div class="h-h-title">人气推荐</div>
          <home-hot :list="hotList"></home-hot>
          <div class="h-h-ad-wrapper" v-if="ad">
            <img :src="$utils.image.getImagePath(ad.image)" @click="adClick">
          </div>
          <div class="h-h-title">猜你喜欢</div>
          <home-like :likeList="guessList"></home-like>
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
  props: {
    identity: {
      type: String,
      default: '1'
    },
    storeId: {
      type: String,
      default: '1'
    }
  },
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
      isFirstLoad: true,
      guessList: [],
      swiperList: [],
      hotList: [],
      ad: null,
      categoryList: []
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
      this.$router.push({name: 'adsDetail', params: {path: this.ad.ad_url}})
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
    },
    getData () {
      this.$http(this.$urlPath.indexUrl, {
        identity: this.identity,
        district: '济南市',
        store_id: this.storeId
      }, '', (data) => {
        if (data.data) {
          this.guessList = data.data.guess_like_scenic
          this.swiperList = data.data.swiper
          this.hotList = data.data.hot_scenic
          this.ad = data.data.ad
          this.categoryList = data.data.category
        }
      }, (errorCode, error) => {
        console.log(error)
      })
    }
  },
  created () {
    this.$root.state.saveSallerInfo(this.identity, this.storeId)
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
    // this.autoLogin()
    this.getData()
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
        background #f5f5f5
        & img
            width 100%
            height 100%
            object-fit cover
</style>
