<template>
    <div>
       <section v-if="loadState">
        <home-header :scrollTop="mScrollTop" @changeCity="changeCity" :citys="citys"></home-header>
        <div ref="homeContent" class="h-content" id="home">
          <home-swiper :list="swiperList"></home-swiper>
          <home-notice v-if="notice && notice.notice_title !== undefined && notice.notice_title" :title="notice.notice_title" :identity="identity" :storeId="storeId"></home-notice>
          <home-type :list="categoryList"></home-type>
          <home-activity v-if="assist && assist.length > 0 " :assist="assist" :time="time"></home-activity>
          <div class="h-h-title" v-if="hotList && hotList.length > 0">-&nbsp;人气推荐&nbsp;-</div>
          <home-hot v-if="hotList && hotList.length > 0" :list="hotList" @itemClick="startDetail"></home-hot>
          <div class="h-h-ad-wrapper" v-if="ad">
            <img :src="$utils.image.getImagePath(ad.image)" @click="adClick">
          </div>
          <div class="h-h-title">-&nbsp;为您推荐&nbsp;-</div>
          <home-like :likeList="guessList" @itemClick="startDetail" @seeMore="seeMore"></home-like>
          <technology-support></technology-support>
        </div>
        </section>
        <section v-else>
          <load-fail @reload="reload"></load-fail>
        </section>
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
import HomeActivity from './components/HomeActivity'
import TechnologySupport from 'common/components/technology-support'
import LoadFail from 'common/components/loading/load-fail'
export default {
  name: 'home',
  components: {
    HomeHeader,
    HomeSwiper,
    HomeType,
    HomeHot,
    HomeActivity,
    HomeLike,
    HomeNavi,
    HomeNotice,
    TechnologySupport,
    LoadFail
  },
  data () {
    return {
      mScrollTop: 0,
      isFirstLoad: true,
      guessList: [],
      swiperList: [],
      notice: {},
      hotList: [],
      ad: null,
      categoryList: [],
      loadState: true,
      sellerInfo: this.$root.state.getSallerInfo(),
      identity: null,
      storeId: null,
      dialogVisible: false,
      diffrentCity: null,
      assist: null,
      time: 0,
      citys: []
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
    startDetail (item) {
      this.$router.push({name: 'scenicDetail', query: {s: item.s_id, i: this.identity, t: this.storeId}})
    },
    reload () {
      this.getData()
    },
    changeCity () {
      this.getData()
    },
    getData () {
      this.$http(this.$urlPath.indexUrl, {
        identity: this.identity,
        district: this.$root.state.currentCity.value,
        store_id: this.storeId
      }, '', (data) => {
        if (data.data) {
          this.loadState = true
          this.guessList = data.data.guess_like_scenic
          this.notice = data.data.notice
          this.swiperList = data.data.swiper
          this.hotList = data.data.popularity_goods
          this.ad = data.data.ad
          this.categoryList = data.data.category
          this.assist = data.data.assist
          this.time = Number(data.time)
          this.citys = data.data.area
          this.citys.forEach(item => {
            item.isSelected = false
            item.isSelected = item.name === this.$root.state.currentCity.value
          })
          sessionStorage.setItem('scenicMenu', JSON.stringify(this.categoryList))
          if (data.data.store && data.data.store.store_name) {
            document.title = data.data.store.store_name + ' - 易行旅行'
          } else {
            document.title = '店铺'
          }
        } else {
          this.loadState = false
        }
      }, (errorCode, error) => {
        this.$toast(error)
        this.loadState = false
      })
    },
    seeMore () {
      if (this.categoryList && this.categoryList.length > 0) {
        this.$router.push({name: 'scenicList', query: {categoryId: this.categoryList[0].id}})
      }
    }
  },
  created () {
    const tempIdentity = this.$route.params.identity
    const tempStoreId = this.$route.params.storeId
    if (tempIdentity && tempStoreId && !isNaN(tempIdentity) && !isNaN(tempStoreId)) {
      this.identity = tempIdentity
      this.storeId = tempStoreId
      this.$root.state.saveSallerInfo(tempIdentity, tempStoreId)
      this.sellerInfo = this.$root.state.getSallerInfo()
    }
    // 如果没有这两个属性，则存默认的，这是防止用户直接访问根路径
    this.identity = this.sellerInfo.identity
    this.storeId = this.sellerInfo.storeId
    if (this.$route.query.code) {
      this.$router.push({name: 'auth', query: {code: this.$route.query.code}})
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
    this.$root.$emit('changeTab', {index: '1'})
    this.getData()
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'personal') {
      next(vm => {
        vm.$root.$emit('changeTab', {index: '1'})
        vm.getData()
      })
    } else {
      next(vm => {
        vm.$root.$emit('changeTab', {index: '1'})
      })
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll, true)
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
        text-align center
    .h-h-ad-wrapper
        height rem(2)
        border-bottom #f5f5f5 solid rem(.2)
        background #f5f5f5
        & img
            width 100%
            height 100%
            object-fit cover
</style>
