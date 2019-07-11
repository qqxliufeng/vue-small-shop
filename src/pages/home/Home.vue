<template>
    <div>
       <section v-if="loadState">
        <home-header :scrollTop="mScrollTop" @changeCity="changeCity" @cityDiffrent="cityDiffrent"></home-header>
        <div ref="homeContent" class="h-content" id="home">
          <home-swiper :list="swiperList"></home-swiper>
          <home-notice v-if="notice.notice_title !== undefined && notice.notice_title" :title="notice.notice_title" :identity="identity" :storeId="storeId"></home-notice>
          <home-type :list="categoryList"></home-type>
          <div class="sperator-line-height"></div>
          <div class="h-h-title">人气推荐</div>
          <home-hot :list="hotList" @itemClick="startDetail"></home-hot>
          <div class="h-h-ad-wrapper" v-if="ad">
            <img :src="$utils.image.getImagePath(ad.image)" @click="adClick">
          </div>
          <div class="h-h-title">猜你喜欢</div>
          <home-like :likeList="guessList" @itemClick="startDetail"></home-like>
        </div>
          <!-- <home-navi :scrollTop="mScrollTop"></home-navi> -->
        </section>
        <section v-else>
          <load-fail @reload="reload"></load-fail>
        </section>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="90%">
          <span>{{dialogTipContent}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="changeDiffrentCity" size="mini">确 定</el-button>
          </span>
        </el-dialog>
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
import LoadFail from 'common/components/loading/load-fail'
export default {
  name: 'home',
  components: {
    HomeHeader,
    HomeSwiper,
    HomeType,
    HomeHot,
    HomeLike,
    HomeNavi,
    HomeNotice,
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
      dialogTipContent: '',
      diffrentCity: null
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
      this.$router.push({name: 'scenicDetail', query: {scenicId: item.s_id, identity: this.identity, storeId: this.storeId}})
    },
    reload () {
      this.getData()
    },
    changeDiffrentCity () {
      this.dialogVisible = false
      if (this.diffrentCity) {
        this.$root.state.changeCity({
          value: this.diffrentCity.city,
          code: '-1'
        })
        this.changeCity()
      }
    },
    changeCity () {
      this.getData()
    },
    cityDiffrent (city) {
      this.diffrentCity = city
      this.dialogVisible = true
      this.dialogTipContent = '当前城市为：' + city.city + '，是否切换'
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
        } else {
          this.loadState = false
        }
      }, (errorCode, error) => {
        this.$toast(error)
        this.loadState = false
      })
    }
  },
  created () {
    const tempIdentity = this.$route.params.identity
    const tempStoreId = this.$route.params.storeId
    if (tempIdentity && tempStoreId && tempIdentity !== 'null' && tempStoreId !== 'null') {
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
