<template>
  <div>
      <div class='activity-ticket-detail-container' v-if="$isWeiXin">
          <section v-if="loadState && scenicInfo">
            <ticket-header :scenicInfo="scenicInfo" @back="back" @collection="collection" :isFavorites="this.goodsInfo.is_favorites" :isShowCollection="false"></ticket-header>
            <ticket-images :imageList="scenicInfo.imageList"></ticket-images>
            <activity-ticket-info :assist="assist" :time="time" :scenicInfo="scenicInfo" @countDownEnd="countDownEnd"></activity-ticket-info>
            <invitation-info :scenicInfo="scenicInfo" :assist="assist" @helper="helper" :inviteruser="inviterUser" @ativityRuleInfo="ativityRuleInfo"></invitation-info>
            <div class="t-d-detail-buy-info">
                <p class="t-d-detail-buy-info-title">购买须知</p>
                <ticket-notice-wrapper :goodsInfo="goodsInfo"></ticket-notice-wrapper>
                <div class="sperator-2"></div>
            </div>
            <div class="sperator-line-2"></div>
            <actviity-ticket-bottom :assist="assist" :isFavorites="this.goodsInfo.is_favorites" @collection="collection" @seeOtherGoods="seeOtherGoods" @invoteFriend="invoteFriend" :isShow="false"></actviity-ticket-bottom>
          </section>
          <section v-else-if="!loadState">
            <load-fail @reload="reload"></load-fail>
          </section>
      </div>
      <div v-else class="weixin-tip">
          请在微信中打开此页面
      </div>
      <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="90%"
          :show-close="false"
          :close-on-click-modal="false">
          <div class="share-content">
            感谢您的参与，您已经为好友助力成功~
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="completeHelper">完成助力</el-button>
            <el-button type="primary" size="mini" @click="completeHelper">我要参加</el-button>
          </span>
        </el-dialog>
  </div>
</template>

<script>
import TicketHeader from './components/ScenicDetailHeader'
import TicketImages from './components/ScenicDetailImages'
import TicketInfo from './components/ScenicDetailInfo'
import InvitationInfo from './components/InvitationInfo'
import TicketComment from './components/ScenicDetailComment'
import TicketNoticeWrapper from 'common/components/ticket-notice-wrapper'
import TicketRemark from 'common/components/ticket-remark'
import LoadFail from 'common/components/loading/load-fail'
import ActivityTicketInfo from './components/ActivityTicketInfo'
import ActviityTicketBottom from './components/ActivityTicketBottom'
import BottomFriendList from '@/pages/activity/comonents/BottomFriendList'
import ShareCodeImage from 'images/img_share_code.png'
import ShareWXImage from 'images/img_share_wx.png'
export default {
  name: 'activityTicketDetail',
  components: {
    TicketHeader,
    TicketImages,
    TicketInfo,
    InvitationInfo,
    TicketComment,
    TicketNoticeWrapper,
    TicketRemark,
    ActivityTicketInfo,
    ActviityTicketBottom,
    BottomFriendList,
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
      promotionId: null,
      uid: null,
      assist: null,
      inviterUser: null,
      time: null,
      dialogVisible: false,
      ShareCodeImage,
      ShareWXImage,
      countDown: false,
      showFriendList: true,
      canShareWX: false
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
      this.$router.replace({name: 'scenicDetail', query: {s: this.scenicId, i: this.$root.state.getSallerInfo().identity, t: this.$root.state.getSallerInfo().storeId}})
    },
    invoteFriend () {
      if (this.assist.join.status === 1) {
        if (!this.countDown) {
          this.$router.push({name: 'reseveDetail', query: { goods_id: this.goodsId, scenicId: this.scenicId }})
        } else {
          this.$toast('此活动已结束啦~')
        }
      } else {
        this.helper()
      }
    },
    helper () {
      if (this.countDown) {
        this.$toast('此活动已经结束啦~')
        return
      }
      if (this.$isWeiXin) {
        if (this.$root.userInfo.isLogin()) {
          this.$router.replace({name: 'activityTicketDetail',
            query:
            {
              p: this.promotionId,
              uid: this.$root.userInfo.state.id,
              i: this.identity,
              t: this.storeId,
              s: this.scenicId,
              g: this.goodsId
            }
          })
        } else {
          const token = this.$root.userInfo.state.token
          if (token) {
            this.$http(this.$urlPath.userInfo, {
              token: token
            }, '', (res) => {
              res.data.token = token
              this.$root.userInfo.setUserInfo(res.data)
              this.helperFriend()
            }, (errorCode, error) => {
              this.$root.state.setBackPage(this.$route)
              location.href = this.$urlPath.weixinAuthUrl
            })
          } else {
            this.$root.state.setBackPage(this.$route)
            location.href = this.$urlPath.weixinAuthUrl
          }
        }
      } else {
        this.$toast('此活动仅限于微信中参加')
      }
    },
    helperFriend () {
      if (this.countDown) {
        this.$toast('此活动已经结束啦~')
        return
      }
      this.$http(this.$urlPath.assistInvite, {
        assist_id: this.promotionId,
        invite_user_id: this.$root.userInfo.state.id, // 被邀请人的id
        user_id: this.uid
      }, '', (res) => {
        this.dialogVisible = true
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    completeHelper () {
      this.dialogVisible = false
      this.$router.replace({name: 'activityTicketDetail',
        query:
        {
          p: this.promotionId,
          uid: this.$root.userInfo.state.id,
          i: this.identity,
          t: this.storeId,
          s: this.scenicId,
          g: this.goodsId
        }
      })
    },
    countDownEnd () {
      this.countDown = true
    },
    getData () {
      this.$http(this.$urlPath.promotionDetailUrl, {
        s_id: this.scenicId,
        goods_id: this.goodsId,
        assist_id: this.promotionId,
        identity: this.identity,
        store_id: this.storeId,
        uid: this.uid
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
        this.scenicInfo.goodsTitle = data.data.goods.goods_title
        this.scenicInfo.totalStock = data.data.goods.totalStock
        this.scenicInfo.totalSales = data.data.goods.totalSales
        this.scenicInfo.minPrice = data.data.scenic.minPrice
        this.assist = data.data.assist
        this.inviterUser = data.data.inviter_user
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
    ativityRuleInfo () {
      this.$router.push({name: 'activityRuleInfo', query: {pid: this.promotionId}})
    },
    back () {
      if (this.from) {
        if (this.from.name) {
          this.$router.go(-1)
          if (this.$router.currentRoute.name === 'activityTicketDetail') {
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
    this.scenicId = this.$route.query.scenicId || this.$route.query.s
    this.goodsId = this.$route.query.goods_id || this.$route.query.g
    let tempIdentity = this.$route.query.identity || this.$route.query.i
    let tempStoreId = this.$route.query.storeId || this.$route.query.t
    this.promotionId = this.$route.query.p
    this.uid = this.$route.query.uid
    // 如果是直接从分享页面过来的，则要存一下identity 和 storeId
    if (tempIdentity && tempStoreId) {
      this.$root.state.saveSallerInfo(tempIdentity, tempStoreId)
      this.sellerInfo = this.$root.state.getSallerInfo()
    }
    this.identity = this.sellerInfo.identity
    this.storeId = this.sellerInfo.storeId
  },
  mounted () {
    if (this.$isWeiXin) {
      if (this.$root.userInfo.isLogin()) {
        this.helperFriend()
      }
      this.getData()
    }
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
    padding 0 0 rem(.3) 0
    borderBottom()
    .ticket-price
        float right
        .ticket-price-tip
            color #888
            font-size rem(.25)
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
.weixin-tip
    height 100vh
    display flex
    justify-content center
    align-items center
    textStyle(#888, .4)
</style>
