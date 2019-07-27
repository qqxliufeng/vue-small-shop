<template>
  <div class='activity-ticket-detail-container'>
      <section v-if="loadState && scenicInfo">
        <ticket-header :scenicInfo="scenicInfo" @back="back" @collection="collection" :isFavorites="this.goodsInfo.is_favorites"></ticket-header>
        <ticket-images :imageList="scenicInfo.imageList"></ticket-images>
        <activity-ticket-info :assist="assist" :time="time"></activity-ticket-info>
        <ticket-info :scenicInfo="scenicInfo">
            <template slot="info" slot-scope="slotProps">
                <p class="t-d-intro-title">门票名称</p>
                <p class="t-d-intro-ticket-name">{{goodsInfo.goods_title}}</p>
                <p class="t-d-intro-title">景区须知</p>
                <p class="t-d-intro-content" @click="startScenicInfo">{{slotProps.scenicInfo.brief}}</p>
            </template>
        </ticket-info>
        <div class="t-d-detail-buy-info">
            <p class="t-d-detail-buy-info-title">购买须知</p>
            <ticket-notice-wrapper :goodsInfo="goodsInfo"></ticket-notice-wrapper>
            <div class="sperator-2"></div>
        </div>
        <div class="sperator-line-2"></div>
        <actviity-ticket-bottom :assist="assist" :isFavorites="this.goodsInfo.is_favorites" @collection="collection" @seeOtherGoods="seeOtherGoods" @invoteFriend="invoteFriend"></actviity-ticket-bottom>
      </section>
      <section v-else-if="!loadState">
        <load-fail @reload="reload"></load-fail>
      </section>
      <section>
        <el-dialog
          title="分享图片"
          :visible.sync="dialogVisible"
          width="90%">
          <div class="share-content">
            <div>
              <img :src="ShareWXImage" style="width: 1.5rem">
              <p>分享到微信</p>
            </div>
            <div>
              <img :src="ShareCodeImage">
              <p>保存图片</p>
            </div>
          </div>
        </el-dialog>
      </section>
  </div>
</template>

<script>
import TicketHeader from './components/ScenicDetailHeader'
import TicketImages from './components/ScenicDetailImages'
import TicketInfo from './components/ScenicDetailInfo'
import TicketComment from './components/ScenicDetailComment'
import TicketNoticeWrapper from 'common/components/ticket-notice-wrapper'
import TicketRemark from 'common/components/ticket-remark'
import LoadFail from 'common/components/loading/load-fail'
import ActivityTicketInfo from './components/ActivityTicketInfo'
import ActviityTicketBottom from './components/ActivityTicketBottom'
import ShareCodeImage from 'images/img_share_code.png'
import ShareWXImage from 'images/img_share_wx.png'
export default {
  name: 'TicketDetail',
  components: {
    TicketHeader,
    TicketImages,
    TicketInfo,
    TicketComment,
    TicketNoticeWrapper,
    TicketRemark,
    ActivityTicketInfo,
    ActviityTicketBottom,
    LoadFail
  },
  data () {
    return {
      loadState: true,
      bugInfoHeight: {
        maxHeight: '1.85rem'
      },
      isSeeMore: true,
      showBuyAction: true,
      scenicInfo: null,
      goodsInfo: {},
      remarks: [],
      from: null,
      identity: null,
      storeId: null,
      scenicId: null,
      goodsId: null,
      assist: null,
      time: null,
      dialogVisible: false,
      ShareCodeImage,
      ShareWXImage
    }
  },
  methods: {
    seeMore () {
      if (this.isSeeMore) {
        this.bugInfoHeight.maxHeight = '1000rem'
      } else {
        this.bugInfoHeight.maxHeight = '1.85rem'
      }
      this.isSeeMore = !this.isSeeMore
    },
    reseve () {
      this.$router.push({name: 'reseveDetail', query: { goods_id: this.goodsId, goods_source: this.$route.query.goods_source, scenicId: this.scenicId }})
    },
    reload () {
      this.getData()
    },
    startScenicInfo () {
      this.$router.push({name: 'scenicInfo', query: {id: this.scenicId}})
    },
    collection () {
      if (this.$root.userInfo.isLogin()) {
        this.$http(this.$urlPath.userUnFavoroteGoodsUrl, {
          goods_id: this.goodsId
        }, '正在操作…', (data) => {
          if (this.goodsInfo.is_favorites) {
            this.$toast('取消收藏成功')
            this.goodsInfo.is_favorites = 0
          } else {
            this.$toast('收藏成功')
            this.goodsInfo.is_favorites = 1
          }
        }, (errorCode, error) => {
          this.$toast(error)
        })
      } else {
        this.$router.push({name: 'loginContainer'})
      }
    },
    seeOtherGoods () {
      this.$router.push({name: 'scenicDetail', query: {s: this.scenicId, i: this.$root.state.getSallerInfo().identity, t: this.$root.state.getSallerInfo().storeId}})
    },
    invoteFriend () {
      if (this.assist.join.status === 1) {
        console.log('object')
      } else {
        this.dialogVisible = true
      }
    },
    getData () {
      this.$http(this.$urlPath.assistDetail, {
        s_id: this.scenicId,
        goods_id: this.goodsId,
        assist_id: this.$route.query.aid,
        identity: this.identity,
        store_id: this.storeId
      }, '', (data) => {
        this.loadState = true
        let info = {}
        info.title = data.data.scenic.s_title
        info.tel = data.data.scenic.tel
        info.totalSales = data.data.scenic.totalSales
        info.address = data.data.scenic.address
        info.city = data.data.scenic.city
        info.mark = data.data.scenic.mark
        info.open = data.data.scenic.open
        info.route = data.data.scenic.route
        info.tags = data.data.scenic.sceniclabel
        info.imageList = data.data.scenic.scenicimages
        info.brief = data.data.scenic.brief
        info.price = data.data.scenic.minPrice
        this.scenicInfo = info
        this.goodsInfo = data.data.goods
        this.assist = data.data.assist
        this.time = Number(data.time)
        for (let i in this.goodsInfo) {
          if (this.goodsInfo[i] instanceof Object) {
            this.remarks.push(this.goodsInfo[i])
          }
        }
      }, (errorCode, error) => {
        this.loadState = false
      })
    },
    back () {
      if (this.from) {
        if (this.from.name) {
          this.$router.go(-1)
          if (this.$router.currentRoute.name === 'ticketDetail') {
            this.$router.replace({path: '/index/' + this.identity + '/' + this.storeId})
          }
        } else {
          this.$router.replace({path: '/index/' + this.identity + '/' + this.storeId})
        }
      } else {
        this.$router.go(-1)
      }
    }
  },
  created () {
    this.scenicId = this.$route.query.scenicId
    this.goodsId = this.$route.query.goods_id
    let tempIdentity = this.$route.query.identity
    let tempStoreId = this.$route.query.storeId
    // 如果是直接从分享页面过来的，则要存一下identity 和 storeId
    if (tempIdentity && tempStoreId) {
      this.$root.state.saveSallerInfo(tempIdentity, tempStoreId)
      this.sellerInfo = this.$root.state.getSallerInfo()
    }
    this.identity = this.sellerInfo.identity
    this.storeId = this.sellerInfo.storeId
  },
  mounted () {
    this.getData()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.from = from
    })
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
.t-d-intro-title
    textStyle(#333, .32)
    margin-top rem(.2)
.t-d-intro-content
    margin-top rem(.2)
    normalTextStyle(#888, .25)
    muitlLineEllipsis(2)
.t-d-intro-ticket-name
    textStyle($orangeColor, .3)
    padding rem(.3) 0
    borderBottom()
.t-d-intro-back-money
    padding rem(.2)
    overflow hidden
    border-top #f5f5f5 solid 1px
    display flex
    justify-content space-between
    align-items center
    & span
        textStyle(#333, .28)
        & i
            color $orangeColor
    & button
        color #ffffff
        background-color $orangeColor
        border-radius rem(.1)
        padding rem(.1) rem(.2)
.sperator-line-2
    height $headerHeight
.t-d-detail-buy-info
    padding rem(.2)
    .t-d-detail-buy-info-title
        textStyle(#333, .35)
        padding rem(.2) 0
        borderBottom()
    .t-d-detail-buy-info-content
        overflow hidden
        normalTextStyle(#888, .3)
    .t-d-detail-buy-info-see-more
        textStyle(#aaa, .4)
        text-align center
    .sperator-1
        background-color #f5f5f5
        height 2px
        width 90%
        margin 0 auto
.t-d-detail-order-info-wrapper
    display flex
    position fixed
    bottom 0
    left 0
    right 0
    border-top #f5f5f5 solid 1px
    height $headerHeight
    & p
        flex 1
    .t-d-detail-order-info-price
        margin-left rem(.2)
        background-color #ffffff
        line-height $headerHeight
        textStyle(#333, .3)
        & span
            color $orangeColor
    .t-d-detail-order-info-action
        textStyle(#fff, .3)
        text-align center
        background-color $orangeColor
        line-height $headerHeight
.share-content
    display flex
    flex-direction row
    justify-content space-evenly
    & > div
        height rem(2)
        flex 1
        text-align center
        padding-top rem(.2)
        box-sizing border-box
        & > img
            width rem(1.2)
            height rem(1.2)
        & > p
            margin-top rem(.2)
            textStyle(#333, .3)
</style>
